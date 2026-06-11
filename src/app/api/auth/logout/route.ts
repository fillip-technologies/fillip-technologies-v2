import { NextResponse } from "next/server";
import { destroySession } from "@/server/auth/session";

// POST /api/auth/logout — clears the admin_session cookie.
export async function POST() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
