import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import { listLeads } from "@/server/contact/queries";

// GET /api/leads — protected: returns leads, newest first. Requires a session.
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limitParam = new URL(request.url).searchParams.get("limit");
  const limit = Math.min(Math.max(Number(limitParam) || 100, 1), 500);

  try {
    const leads = await listLeads(limit);
    return NextResponse.json({ ok: true, count: leads.length, leads });
  } catch (err) {
    console.error("GET /api/leads failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
