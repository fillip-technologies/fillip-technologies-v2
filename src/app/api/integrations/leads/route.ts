import { NextResponse } from "next/server";
import { listLeadsPage } from "@/server/contact/queries";
import { LEAD_STATUS_VALUES } from "@/server/contact/lead-sources";
import { guardLeadsApi, NO_STORE } from "@/server/integrations/leads-api";

// GET /api/integrations/leads — machine-to-machine access for external platforms.
// Auth: LEADS_API_KEY as `Authorization: Bearer <key>` or `x-api-key` (see
// guardLeadsApi). Returns active (non-binned) leads, newest first, one page at a
// time: ?page=1&limit=100 (max 500). Optional filters: ?status=<lead status>,
// ?since=<ISO date> (created at or after). Keep requesting the next page while
// `has_more` is true to fetch every lead.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await guardLeadsApi(request, { allowPublic: true });
  if (denied) return denied;

  const params = new URL(request.url).searchParams;
  const limit = Math.min(Math.max(Math.trunc(Number(params.get("limit"))) || 100, 1), 500);
  const page = Math.max(Math.trunc(Number(params.get("page"))) || 1, 1);

  const status = params.get("status") || undefined;
  if (status && !LEAD_STATUS_VALUES.includes(status)) {
    return NextResponse.json(
      { error: `Unknown status. Use one of: ${LEAD_STATUS_VALUES.join(", ")}.` },
      { status: 400, headers: NO_STORE }
    );
  }

  const sinceParam = params.get("since");
  const since = sinceParam ? new Date(sinceParam) : undefined;
  if (since && Number.isNaN(since.getTime())) {
    return NextResponse.json(
      { error: "Invalid since. Use an ISO date, e.g. 2026-10-01 or 2026-10-01T00:00:00Z." },
      { status: 400, headers: NO_STORE }
    );
  }

  try {
    const { leads, total } = await listLeadsPage({ page, limit, status, since });
    return NextResponse.json(
      { ok: true, count: leads.length, total, page, limit, has_more: page * limit < total, leads },
      { headers: NO_STORE }
    );
  } catch (err) {
    console.error("GET /api/integrations/leads failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: NO_STORE });
  }
}
