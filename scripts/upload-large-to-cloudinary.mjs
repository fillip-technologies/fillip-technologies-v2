// Companion to upload-to-cloudinary.mjs for referenced images that exceed the
// account's 10 MB per-image limit. These are very tall full-page mockups; we
// downscale/recompress a temp copy (originals in public/ are untouched) so they
// fit, then upload and record them in the same cloudinary-map.json.
//
// Run: node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/upload-large-to-cloudinary.mjs
import { readdir, readFile, writeFile, stat, mkdtemp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";

const ROOT = process.cwd();
const MAP_FILE = path.join(ROOT, "cloudinary-map.json");
const FOLDER = "fillip";
const LIMIT = 10 * 1024 * 1024;
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);
const REF_RE = /\/(?:images|uploads)\/[^\s"'`)\\]+/g;

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) await walk(f, out);
    else out.push(f);
  }
  return out;
}

async function collectRefs() {
  const refs = new Set();
  for (const file of await walk(path.join(ROOT, "src"))) {
    if (!/\.(ts|tsx|js|jsx|mjs|json)$/.test(file)) continue;
    const t = await readFile(file, "utf8");
    for (const m of t.matchAll(REF_RE)) {
      const r = m[0];
      if (r.includes("${") || r.includes("*")) continue;
      if (r.startsWith("/uploads/resumes")) continue;
      if (!IMAGE_EXT.has(path.extname(r).toLowerCase())) continue;
      refs.add(r);
    }
  }
  return refs;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const map = existsSync(MAP_FILE) ? JSON.parse(await readFile(MAP_FILE, "utf8")) : {};
const refs = await collectRefs();
const tmp = await mkdtemp(path.join(tmpdir(), "cld-"));

let done = 0;
for (const ref of refs) {
  if (map[ref]) continue;
  const rel = decodeURIComponent(ref).replace(/^\//, "");
  const fsPath = path.join(ROOT, "public", rel);
  if (!existsSync(fsPath)) continue;
  const size = (await stat(fsPath)).size;
  if (size <= LIMIT) continue; // small ones handled by the main script

  const public_id = `${FOLDER}${decodeURIComponent(ref).replace(/\.[^.]+$/, "")}`;
  const out = path.join(tmp, path.basename(rel).replace(/\.[^.]+$/, ".jpg"));

  // Cap width and re-encode as progressive JPEG; iterate quality until under limit.
  const meta = await sharp(fsPath).metadata();
  let width = Math.min(meta.width || 1600, 1600);
  let quality = 80;
  let buf;
  for (let attempt = 0; attempt < 8; attempt++) {
    buf = await sharp(fsPath)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, progressive: true, mozjpeg: true })
      .toBuffer();
    if (buf.length <= LIMIT) break;
    if (quality > 55) quality -= 10;
    else width = Math.round(width * 0.85);
  }
  await writeFile(out, buf);
  console.log(`  compressed ${ref}: ${(size / 1048576).toFixed(1)}MB -> ${(buf.length / 1048576).toFixed(1)}MB (w=${width}, q=${quality})`);

  const res = await cloudinary.uploader.upload(out, {
    public_id,
    overwrite: false,
    resource_type: "image",
    unique_filename: false,
    use_filename: false,
  });
  map[ref] = res.secure_url;
  await writeFile(MAP_FILE, JSON.stringify(map, null, 2));
  console.log(`  ✓ ${ref} -> ${res.secure_url}`);
  done++;
}

console.log(`\nDone. compressed+uploaded=${done}. Total mapped=${Object.keys(map).length}`);
