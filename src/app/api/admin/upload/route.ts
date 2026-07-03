import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getSession } from "@/server/auth/session";

// Where uploaded files land. Served statically by Next from /uploads/<name>.
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED = new Map<string, string>([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/svg+xml", "svg"],
  ["image/avif", "avif"],
]);

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

// POST /api/admin/upload — protected. Accepts a multipart form with a `file`
// field, stores it under public/uploads, and returns its public path.
export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return NextResponse.json(
      { error: "Unsupported file type. Use PNG, JPG, WEBP, GIF, SVG or AVIF." },
      { status: 415 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 5 MB)." }, { status: 413 });
  }

  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, name), bytes);
    return NextResponse.json({ ok: true, url: `/uploads/${name}` });
  } catch (err) {
    console.error("POST /api/admin/upload failed:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
