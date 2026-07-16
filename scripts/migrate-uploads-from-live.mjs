// Migrates legacy CMS uploads that have no local source file by fetching them
// from the live site, pushing them to Cloudinary, and rewriting the `site_content`
// references. These are the `/uploads/<timestamp>.jpg` paths admins uploaded via
// the old local-disk route (public/uploads is gitignored, so the files aren't here).
//
// Modes:
//   --probe     only HEAD/GET the first few live URLs and report status (no writes)
//   --dry-run   fetch nothing, just list what would be migrated
//   (default)   fetch -> upload to Cloudinary -> rewrite DB, incrementally
//
// Base URL: --base=https://... (defaults to the site config URL)
//
// Run: node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/migrate-uploads-from-live.mjs --probe
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import dns from "node:dns";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

const ROOT = process.cwd();
const MAP_FILE = path.join(ROOT, "cloudinary-map.json");
const FOLDER = "fillip";
const PROBE = process.argv.includes("--probe");
const DRY_RUN = process.argv.includes("--dry-run");
const baseArg = process.argv.find((a) => a.startsWith("--base="));
const BASE = (baseArg ? baseArg.slice("--base=".length) : "https://filliptechnologies.com").replace(/\/$/, "");

// Match only /uploads image paths (the legacy CMS uploads). We skip /images
// (static assets, already handled) and resumes.
const UPLOAD_RE = /\/uploads\/(?!resumes\/)[^"'`\\]+?\.(?:png|jpe?g|webp|gif|svg|avif)/gi;
const CONTENT_TYPE_EXT = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif", "image/svg+xml": "svg", "image/avif": "avif" };

if (process.env.DNS_SERVERS) dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const map = existsSync(MAP_FILE) ? JSON.parse(await readFile(MAP_FILE, "utf8")) : {};

async function collectRefs(col) {
  const all = await col.find({}).toArray();
  const refs = new Set();
  for (const doc of all) {
    for (const m of (JSON.stringify(doc.data ?? {}).match(UPLOAD_RE) || [])) refs.add(m);
  }
  return refs;
}

// Fetch a live URL and upload the bytes to Cloudinary. Returns the secure URL.
async function fetchAndUpload(ref) {
  if (map[ref]) return map[ref];
  const url = `${BASE}${encodeURI(ref)}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = (res.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  if (!CONTENT_TYPE_EXT[ct]) throw new Error(`not an image (content-type: ${ct || "none"})`);
  const buf = Buffer.from(await res.arrayBuffer());
  const public_id = `${FOLDER}${decodeURIComponent(ref).replace(/\.[^.]+$/, "")}`;
  const uploaded = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { public_id, folder: undefined, resource_type: "image", overwrite: false, unique_filename: false, use_filename: false },
      (err, r) => (err || !r ? reject(err ?? new Error("upload failed")) : resolve(r))
    );
    stream.end(buf);
  });
  map[ref] = uploaded.secure_url;
  await writeFile(MAP_FILE, JSON.stringify(map, null, 2));
  return uploaded.secure_url;
}

function rewriteValue(value, lookup, counter) {
  if (typeof value === "string") {
    if (lookup[value]) { counter.n++; return lookup[value]; }
    return value;
  }
  if (Array.isArray(value)) return value.map((v) => rewriteValue(v, lookup, counter));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = rewriteValue(v, lookup, counter);
    return out;
  }
  return value;
}

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set.");
  await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  const col = mongoose.connection.db.collection("site_content");
  const refs = [...await collectRefs(col)].sort();
  console.log(`Base URL: ${BASE}`);
  console.log(`Legacy /uploads refs in DB: ${refs.length} (already mapped: ${refs.filter((r) => map[r]).length})\n`);

  if (PROBE) {
    const sample = refs.filter((r) => !map[r]).slice(0, 6);
    for (const ref of sample) {
      const url = `${BASE}${encodeURI(ref)}`;
      try {
        const res = await fetch(url, { method: "GET", redirect: "follow" });
        const ct = res.headers.get("content-type") || "";
        const len = res.headers.get("content-length") || "?";
        console.log(`  ${res.status}  ${ct.split(";")[0]}  ${len}B  ${ref}`);
      } catch (e) {
        console.log(`  ERR  ${e.message}  ${ref}`);
      }
    }
    console.log("\nProbe done. If these are 200 + image/*, re-run without --probe to migrate.");
    await mongoose.disconnect();
    return;
  }

  let uploaded = 0, failed = 0;
  const failures = [];
  for (const ref of refs) {
    if (map[ref]) continue;
    if (DRY_RUN) { console.log(`  would fetch+upload ${ref}`); continue; }
    try {
      await fetchAndUpload(ref);
      uploaded++;
      if (uploaded % 10 === 0) console.log(`  ...${uploaded} uploaded`);
    } catch (e) {
      failed++;
      failures.push(`${ref}: ${e.message}`);
    }
  }
  console.log(`\nUploaded: ${uploaded}, failed: ${failed}`);
  if (failures.length) { console.log("Failures:"); failures.forEach((f) => console.log(`    - ${f}`)); }

  if (!DRY_RUN) {
    // Rewrite DB refs using the now-populated map.
    const docs = await col.find({}).toArray();
    let touched = 0, rewritten = 0;
    for (const doc of docs) {
      const s = JSON.stringify(doc.data ?? {});
      if (!UPLOAD_RE.test(s)) continue;
      UPLOAD_RE.lastIndex = 0;
      const counter = { n: 0 };
      const newData = rewriteValue(doc.data ?? {}, map, counter);
      if (counter.n === 0) continue;
      await col.updateOne({ _id: doc._id }, { $set: { data: newData, updated_at: new Date() } });
      touched++; rewritten += counter.n;
      console.log(`  [${doc.key}] ${counter.n} ref(s) rewritten`);
    }
    console.log(`\nDB docs updated: ${touched}, refs rewritten: ${rewritten}`);
  }
  await mongoose.disconnect();
}

main().catch(async (err) => { console.error(err); try { await mongoose.disconnect(); } catch {} process.exit(1); });
