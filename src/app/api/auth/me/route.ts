import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";

// GET /api/auth/me — returns the current admin session, or 401 if none.
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: session });
}
