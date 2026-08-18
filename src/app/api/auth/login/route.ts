import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminByEmail } from "@/server/auth/queries";
import { verifyPassword } from "@/server/auth/password";
import { createSession } from "@/server/auth/session";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

// Brute-force guard: cap login attempts per IP. Deliberately generous so a
// forgetful admin isn't locked out, but tight enough to make credential
// stuffing impractical.
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// POST /api/auth/login — sets the admin_session cookie on success.
export async function POST(request: Request) {
  const limit = rateLimit(`login:${clientIp(request)}`, MAX_ATTEMPTS, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

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

  await createSession({ userId: admin.id, email: admin.email, sessionVersion: admin.session_version });
  return NextResponse.json({ ok: true, email: admin.email });
}
