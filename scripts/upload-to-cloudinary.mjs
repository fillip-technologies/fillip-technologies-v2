// Uploads the images actually referenced by the site to Cloudinary and writes
// a mapping of `/public path` -> `Cloudinary secure URL` to cloudinary-map.json.
//
// Discovery is deliberately conservative: we only take image paths that appear
// as string literals in the source (src/**), so we upload what the current site
// actually uses — not every file sitting in public/.
//
// Run:  node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/upload-to-cloudinary.mjs [--dry-run]
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const PUBLIC_DIR = path.join(ROOT, "public");
const MAP_FILE = path.join(ROOT, "cloudinary-map.json");
const FOLDER = "fillip";
const DRY_RUN = process.argv.includes("--dry-run");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);
// Matches /images/... and /uploads/... string literals up to a quote/paren/whitespace.
const REF_RE = /\/(?:images|uploads)\/[^\s"'`)\\]+/g;

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

async function collectReferences() {
  const files = await walk(SRC_DIR);
  const refs = new Set();
  for (const file of files) {
    if (!/\.(ts|tsx|js|jsx|mjs|json)$/.test(file)) continue;
    const text = await readFile(file, "utf8");
    for (const m of text.matchAll(REF_RE)) {
      let ref = m[0];
      // Skip dynamic/interpolated or wildcard references.
      if (ref.includes("${") || ref.includes("*")) continue;
      // Resumes are PDFs, not site imagery.
      if (ref.startsWith("/uploads/resumes")) continue;
      const ext = path.extname(ref).toLowerCase();
      if (!IMAGE_EXT.has(ext)) continue;
      refs.add(ref);
    }
  }
  return [...refs].sort();
}

function toPublicId(ref) {
  // /images/foo/Bar Baz.png -> fillip/images/foo/Bar Baz  (decoded, no extension)
  const decoded = decodeURIComponent(ref);
  const noExt = decoded.replace(/\.[^.]+$/, "");
  return `${FOLDER}${noExt}`; // ref begins with a leading slash
}

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing CLOUDINARY_* env vars. Run with --env-file-if-exists=.env");
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const refs = await collectReferences();

  const found = [];
  const missing = [];
  for (const ref of refs) {
    const rel = decodeURIComponent(ref).replace(/^\//, "");
    const fsPath = path.join(PUBLIC_DIR, rel);
    if (existsSync(fsPath)) found.push({ ref, fsPath });
    else missing.push(ref);
  }

  console.log(`Referenced image paths: ${refs.length}`);
  console.log(`  Present in public/:   ${found.length}`);
  console.log(`  Missing (skipped):    ${missing.length}`);
  if (missing.length) missing.forEach((m) => console.log(`    - MISSING ${m}`));

  // Reuse an existing map so re-runs are incremental.
  const map = existsSync(MAP_FILE) ? JSON.parse(await readFile(MAP_FILE, "utf8")) : {};

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const { ref, fsPath } of found) {
    if (map[ref]) {
      skipped++;
      continue;
    }
    const public_id = toPublicId(ref);
    if (DRY_RUN) {
      console.log(`  would upload ${ref}  ->  ${public_id}`);
      continue;
    }
    try {
      const opts = {
        public_id,
        overwrite: false,
        resource_type: "image",
        unique_filename: false,
        use_filename: false,
      };
      // Files above the single-request limit (10 MB) must be chunked.
      const big = (await stat(fsPath)).size > 10 * 1024 * 1024;
      const res = big
        ? await cloudinary.uploader.upload_large(fsPath, { ...opts, chunk_size: 6 * 1024 * 1024 })
        : await cloudinary.uploader.upload(fsPath, opts);
      map[ref] = res.secure_url;
      uploaded++;
      console.log(`  ✓ ${ref}  ->  ${res.secure_url}`);
      await writeFile(MAP_FILE, JSON.stringify(map, null, 2));
    } catch (err) {
      failed++;
      console.error(`  ✗ ${ref}: ${err?.message || err}`);
    }
  }

  console.log(
    `\nDone. uploaded=${uploaded} already-mapped=${skipped} failed=${failed}` +
      (DRY_RUN ? " (dry run — nothing uploaded)" : `\nMapping written to ${path.relative(ROOT, MAP_FILE)}`)
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
