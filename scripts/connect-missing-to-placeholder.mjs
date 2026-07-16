// The 155 legacy CMS uploads have no recoverable source files. To stop the site
// 404-ing on them AND keep every image slot "connected to Cloudinary", we upload
// a single neutral placeholder to Cloudinary and repoint every unresolved local
// /uploads reference in `site_content` at it. Admins can then replace each image
// via the panel's Upload button (which already targets Cloudinary).
//
// Idempotent: re-running only touches refs that still point to a local path.
//
// Run: node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/connect-missing-to-placeholder.mjs [--dry-run]
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import dns from "node:dns";
import sharp from "sharp";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

const ROOT = process.cwd();
const MAP_FILE = path.join(ROOT, "cloudinary-map.json");
const DRY_RUN = process.argv.includes("--dry-run");
const PLACEHOLDER_ID = "fillip/system/placeholder";
// Any local /uploads image path (not resumes) that still needs connecting.
const LOCAL_UPLOAD_RE = /^\/uploads\/(?!resumes\/).+\.(png|jpe?g|webp|gif|svg|avif)$/i;

if (process.env.DNS_SERVERS) dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const map = existsSync(MAP_FILE) ? JSON.parse(await readFile(MAP_FILE, "utf8")) : {};

// Build (once) and upload the placeholder; reuse the URL if already recorded.
async function ensurePlaceholder() {
  if (map.__placeholder__) return map.__placeholder__;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    <rect width="1200" height="800" fill="#e5e7eb"/>
    <rect x="1" y="1" width="1198" height="798" fill="none" stroke="#cbd5e1" stroke-width="2"/>
    <g fill="#94a3b8" text-anchor="middle" font-family="Arial, sans-serif">
      <circle cx="600" cy="340" r="70" fill="none" stroke="#94a3b8" stroke-width="8"/>
      <path d="M565 355 l25 -30 20 22 18 -14 27 32 z" fill="#94a3b8"/>
      <circle cx="580" cy="322" r="12" fill="#94a3b8"/>
      <text x="600" y="470" font-size="42" font-weight="700">Image not set</text>
      <text x="600" y="520" font-size="26">Upload a replacement from the admin panel</text>
    </g>
  </svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  if (DRY_RUN) return "«placeholder (dry run)»";
  const res = await cloudinary.uploader.upload(`data:image/png;base64,${buf.toString("base64")}`, {
    public_id: PLACEHOLDER_ID,
    overwrite: true,
    resource_type: "image",
    unique_filename: false,
    use_filename: false,
  });
  map.__placeholder__ = res.secure_url;
  await writeFile(MAP_FILE, JSON.stringify(map, null, 2));
  return res.secure_url;
}

function repoint(value, url, counter) {
  if (typeof value === "string") {
    if (LOCAL_UPLOAD_RE.test(value)) { counter.n++; return url; }
    return value;
  }
  if (Array.isArray(value)) return value.map((v) => repoint(v, url, counter));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = repoint(v, url, counter);
    return out;
  }
  return value;
}

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set.");
  const placeholder = await ensurePlaceholder();
  console.log(`Placeholder: ${placeholder}\n`);

  await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  const col = mongoose.connection.db.collection("site_content");
  const docs = await col.find({}).toArray();

  let touched = 0, refs = 0;
  for (const doc of docs) {
    const counter = { n: 0 };
    const newData = repoint(doc.data ?? {}, placeholder, counter);
    if (counter.n === 0) continue;
    touched++; refs += counter.n;
    console.log(`  [${doc.key}] ${counter.n} slot(s) -> placeholder`);
    if (!DRY_RUN) {
      await col.updateOne({ _id: doc._id }, { $set: { data: newData, updated_at: new Date() } });
    }
  }

  console.log(`\n${DRY_RUN ? "[dry run] " : ""}Docs updated: ${touched}, image slots connected: ${refs}`);
  await mongoose.disconnect();
}

main().catch(async (err) => { console.error(err); try { await mongoose.disconnect(); } catch {} process.exit(1); });
