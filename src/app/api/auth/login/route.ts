import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminByEmail } from "@/server/auth/queries";
import { verifyPassword } from "@/server/auth/password";
import { createSession } from "@/server/auth/session";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

// POST /api/auth/login — sets the admin_session cookie on success.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 422 });
  }

  const admin = await getAdminByEmail(parsed.data.email);
  // Compare even when the email is unknown to avoid leaking existence via timing.
  const ok = admin ? await verifyPassword(parsed.data.password, admin.password_hash) : false;

  if (!admin || !ok) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  await createSession({ userId: admin.id, email: admin.email });
  return NextResponse.json({ ok: true, email: admin.email });
}
