/**
 * Cloudinary orphaned-image audit + cleanup.
 *
 * Lists every IMAGE asset under the `fillip/` folder, cross-references it against
 * every Cloudinary URL referenced in the database (site_content + leads) and the
 * committed content snapshot, and reports the orphans — assets nothing points at.
 *
 * SAFETY:
 *   - Dry-run by default. Pass `--delete` to actually destroy the orphans.
 *   - `fillip/resumes/**` is a protected prefix (raw job-application resumes
 *     linked from leads) and is never listed or deleted.
 *   - Matching is done on the URL path after `/upload/`, with the version segment
 *     stripped, so extension/version quirks can't cause a false "orphan".
 *
 * Usage:
 *   node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/cloudinary-audit.mjs
 *   node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/cloudinary-audit.mjs --delete
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { MongoClient } from "mongodb";
import { v2 as cloudinary } from "cloudinary";

const DO_DELETE = process.argv.includes("--delete");
const ROOT_FOLDER = "fillip";
const PROTECTED_PREFIXES = ["fillip/resumes"]; // never touch (raw resumes)

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_PATH = path.join(__dirname, "..", "src", "data", "content-snapshot.json");

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env var: ${name}. Add it to .env / .env.local.`);
    process.exit(1);
  }
  return v;
}

cloudinary.config({
  cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
  api_key: requireEnv("CLOUDINARY_API_KEY"),
  api_secret: requireEnv("CLOUDINARY_API_SECRET"),
  secure: true,
});

const MONGODB_URI = requireEnv("MONGODB_URI");

/**
 * Normalise any Cloudinary URL (or a raw public_id path) to a comparable key:
 * the path after `/upload/`, minus a leading `v<digits>/` version and any file
 * extension. e.g. ".../upload/v123/fillip/uploads/abc.png" -> "fillip/uploads/abc".
 */
function refKey(urlOrPublicId) {
  let s = String(urlOrPublicId);
  const marker = "/upload/";
  const i = s.indexOf(marker);
  if (i !== -1) s = s.slice(i + marker.length);
  s = s.replace(/^v\d+\//, ""); // strip version
  s = s.replace(/\.[a-z0-9]+$/i, ""); // strip extension
  return s;
}

const CLOUD_URL_RE = /https?:\/\/res\.cloudinary\.com\/[^\s"'\\)]+/gi;

function collectUrlsFromValue(value, out) {
  if (value == null) return;
  if (typeof value === "string") {
    const matches = value.match(CLOUD_URL_RE);
    if (matches) for (const m of matches) out.add(m);
    return;
  }
  if (typeof value === "object") {
    // Also stringify to catch URLs embedded inside larger strings/objects.
    const matches = JSON.stringify(value).match(CLOUD_URL_RE);
    if (matches) for (const m of matches) out.add(m);
  }
}

async function main() {
  console.log(`\nCloudinary audit — mode: ${DO_DELETE ? "DELETE" : "DRY-RUN"}\n`);

  // -------- 1. Gather referenced URLs from the database + snapshot --------
  const referenced = new Set();

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db();

  const siteContent = await db.collection("site_content").find({}).toArray();
  for (const doc of siteContent) collectUrlsFromValue(doc.data, referenced);
  console.log(`site_content docs scanned:   ${siteContent.length}`);

  const leads = await db.collection("leads").find({}).project({ message: 1 }).toArray();
  for (const lead of leads) collectUrlsFromValue(lead.message, referenced);
  console.log(`leads scanned:               ${leads.length}`);

  await client.close();

  try {
    const snapRaw = await readFile(SNAPSHOT_PATH, "utf8");
    const snapMatches = snapRaw.match(CLOUD_URL_RE);
    if (snapMatches) for (const m of snapMatches) referenced.add(m);
    console.log(`content-snapshot URLs:       ${snapMatches ? snapMatches.length : 0}`);
  } catch {
    console.log("content-snapshot.json:       (not found, skipped)");
  }

  const referencedKeys = new Set([...referenced].map(refKey));
  console.log(`unique referenced assets:    ${referencedKeys.size}\n`);

  // -------- 2. List all image assets under fillip/ --------
  const assets = [];
  let nextCursor;
  do {
    const res = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix: `${ROOT_FOLDER}/`,
      max_results: 500,
      next_cursor: nextCursor,
    });
    for (const r of res.resources) {
      if (PROTECTED_PREFIXES.some((p) => r.public_id.startsWith(p))) continue;
      assets.push(r);
    }
    nextCursor = res.next_cursor;
  } while (nextCursor);

  console.log(`Cloudinary image assets:     ${assets.length} (under ${ROOT_FOLDER}/, excluding resumes)`);

  // -------- 3. Compute orphans --------
  const orphans = assets.filter((a) => !referencedKeys.has(refKey(a.secure_url)));
  const inUse = assets.length - orphans.length;

  // Break the orphans down by sub-folder for a readable summary.
  const byFolder = {};
  let orphanBytes = 0;
  for (const a of orphans) {
    const folder = a.public_id.split("/").slice(0, -1).join("/") || "(root)";
    byFolder[folder] = (byFolder[folder] || 0) + 1;
    orphanBytes += a.bytes || 0;
  }

  console.log(`In use:                      ${inUse}`);
  console.log(`Orphaned (not referenced):   ${orphans.length}`);
  console.log(`Reclaimable size:            ${(orphanBytes / (1024 * 1024)).toFixed(2)} MB\n`);

  console.log("Orphans by folder:");
  for (const [folder, count] of Object.entries(byFolder).sort()) {
    console.log(`  ${folder}: ${count}`);
  }

  console.log("\nOrphan public_ids:");
  for (const a of orphans) console.log(`  ${a.public_id}`);

  // -------- 4. Delete (only with --delete) --------
  if (!DO_DELETE) {
    console.log(`\nDry-run only. Re-run with --delete to remove the ${orphans.length} orphan(s).`);
    return;
  }
  if (orphans.length === 0) {
    console.log("\nNothing to delete.");
    return;
  }

  console.log(`\nDeleting ${orphans.length} orphan(s)...`);
  let ok = 0;
  let failed = 0;
  // Batch destroy (100 per call limit for delete_resources).
  for (let i = 0; i < orphans.length; i += 100) {
    const batch = orphans.slice(i, i + 100).map((a) => a.public_id);
    try {
      const res = await cloudinary.api.delete_resources(batch, {
        resource_type: "image",
        type: "upload",
      });
      for (const id of batch) {
        if (res.deleted?.[id] === "deleted") ok++;
        else {
          failed++;
          console.warn(`  not deleted: ${id} -> ${res.deleted?.[id]}`);
        }
      }
    } catch (err) {
      failed += batch.length;
      console.error(`  batch failed:`, err.message);
    }
  }
  console.log(`\nDone. Deleted ${ok}, failed ${failed}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
