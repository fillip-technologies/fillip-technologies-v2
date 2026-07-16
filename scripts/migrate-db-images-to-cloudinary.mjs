// Rewrites image references stored in the CMS (Mongo `site_content` collection —
// the JSON edited through the admin panel) from local `/images/...` and
// `/uploads/...` paths to their Cloudinary URLs.
//
// For each local path found in the content JSON:
//   - if it's already in cloudinary-map.json  -> swap to the mapped URL
//   - else if the file exists in public/       -> upload it, add to the map, swap
//   - else (dangling)                          -> leave as-is and warn
//
// Run: node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/migrate-db-images-to-cloudinary.mjs [--dry-run]
import { readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import dns from "node:dns";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

const ROOT = process.cwd();
const MAP_FILE = path.join(ROOT, "cloudinary-map.json");
const FOLDER = "fillip";
const DRY_RUN = process.argv.includes("--dry-run");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);
// A string value that is a local image path we should migrate.
const LOCAL_IMG_RE = /^\/(?:images|uploads)\/.+\.(png|jpe?g|webp|gif|svg|avif)$/i;

if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}

const map = existsSync(MAP_FILE) ? JSON.parse(await readFile(MAP_FILE, "utf8")) : {};
let mapDirty = false;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const missing = new Set();
let uploads = 0;
let replaced = 0; // count of image refs actually swapped to a Cloudinary URL

// Resolve a local image path to a Cloudinary URL, uploading on demand.
async function resolve(ref) {
  if (map[ref]) return map[ref];
  const rel = decodeURIComponent(ref).replace(/^\//, "");
  const fsPath = path.join(ROOT, "public", rel);
  if (!existsSync(fsPath)) {
    missing.add(ref);
    return null;
  }
  if (DRY_RUN) return `«would upload» ${ref}`;
  const public_id = `${FOLDER}${decodeURIComponent(ref).replace(/\.[^.]+$/, "")}`;
  const size = (await stat(fsPath)).size;
  let res;
  if (size > 10 * 1024 * 1024) {
    // Chunk very large files (matches the main migration's handling).
    res = await cloudinary.uploader.upload_large(fsPath, {
      public_id, overwrite: false, resource_type: "image",
      unique_filename: false, use_filename: false, chunk_size: 6 * 1024 * 1024,
    });
    if (!res?.secure_url) res = await cloudinary.api.resource(public_id);
  } else {
    res = await cloudinary.uploader.upload(fsPath, {
      public_id, overwrite: false, resource_type: "image",
      unique_filename: false, use_filename: false,
    });
  }
  map[ref] = res.secure_url;
  mapDirty = true;
  uploads++;
  console.log(`    ↑ uploaded ${ref} -> ${res.secure_url}`);
  return res.secure_url;
}

// Deep-walk any JSON value, rewriting matching string paths. Returns
// { value, changed } so callers know whether to persist.
async function rewrite(value) {
  if (typeof value === "string") {
    if (LOCAL_IMG_RE.test(value)) {
      const url = await resolve(value);
      if (url && !url.startsWith("«")) {
        replaced++;
        return { value: url, changed: true };
      }
    }
    return { value, changed: false };
  }
  if (Array.isArray(value)) {
    let changed = false;
    const out = [];
    for (const item of value) {
      const r = await rewrite(item);
      out.push(r.value);
      changed = changed || r.changed;
    }
    return { value: out, changed };
  }
  if (value && typeof value === "object") {
    let changed = false;
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const r = await rewrite(v);
      out[k] = r.value;
      changed = changed || r.changed;
    }
    return { value: out, changed };
  }
  return { value, changed: false };
}

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set.");
  if (!process.env.CLOUDINARY_CLOUD_NAME) throw new Error("CLOUDINARY_* env vars missing.");

  await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  const col = mongoose.connection.db.collection("site_content");
  const docs = await col.find({}).toArray();

  let touchedDocs = 0;
  let refsChanged = 0;

  for (const doc of docs) {
    // Count local paths present before rewrite (for reporting).
    const before = JSON.stringify(doc.data ?? {});
    const localCount = (before.match(/\/(?:images|uploads)\/[^"'\\]+?\.(?:png|jpe?g|webp|gif|svg|avif)/gi) || []).length;
    if (!localCount) continue;

    const before2 = replaced;
    const { value: newData, changed } = await rewrite(doc.data ?? {});
    if (!changed) continue;

    touchedDocs++;
    const inDoc = replaced - before2;
    refsChanged += inDoc;
    const left = localCount - inDoc;
    console.log(`  [${doc.key}] ${inDoc}/${localCount} image ref(s) -> Cloudinary${left ? ` (${left} unresolved)` : ""}`);

    if (!DRY_RUN) {
      await col.updateOne({ _id: doc._id }, { $set: { data: newData, updated_at: new Date() } });
    }
  }

  if (mapDirty) await writeFile(MAP_FILE, JSON.stringify(map, null, 2));

  console.log(`\n${DRY_RUN ? "[dry run] " : ""}Content docs updated: ${touchedDocs}, refs rewritten: ${refsChanged}, new uploads: ${uploads}`);
  if (missing.size) {
    console.log(`Dangling (left as-is, file not in public/): ${missing.size}`);
    [...missing].forEach((m) => console.log(`    - ${m}`));
  }
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
