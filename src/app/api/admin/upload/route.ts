import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import { isCloudinaryConfigured, uploadBuffer } from "@/server/cloudinary";

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
// field, uploads it to Cloudinary, and returns the hosted (secure) URL.
export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isCloudinaryConfigured) {
    return NextResponse.json(
      { error: "Image hosting is not configured." },
      { status: 500 }
    );
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
    const bytes = Buffer.from(await file.arrayBuffer());
    const { secure_url } = await uploadBuffer(bytes, { folder: "fillip/uploads" });
    return NextResponse.json({ ok: true, url: secure_url });
  } catch (err) {
    console.error("POST /api/admin/upload failed:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
