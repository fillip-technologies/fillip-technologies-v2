import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getLeadById, updateLeadStatus } from "@/server/contact/queries";
import { LEAD_STATUS_VALUES } from "@/server/contact/lead-sources";
import { guardLeadsApi, NO_STORE } from "@/server/integrations/leads-api";

// /api/integrations/leads/<id> — one lead, for external platforms. Same API key
// as the list endpoint (see guardLeadsApi).
//   GET   → the lead.
//   PATCH → change its status. Body: { "status": "<lead status>" }. Always needs
//           the key: LEADS_API_PUBLIC never opens up writes.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const notFound = () =>
  NextResponse.json({ error: "Lead not found." }, { status: 404, headers: NO_STORE });

export async function GET(request: Request, { params }: Ctx) {
  const denied = await guardLeadsApi(request, { allowPublic: true });
  if (denied) return denied;
  const { id } = await params;

  try {
    const lead = await getLeadById(id);
    if (!lead) return notFound();
    return NextResponse.json({ ok: true, lead }, { headers: NO_STORE });
  } catch (err) {
    console.error("GET /api/integrations/leads/[id] failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: NO_STORE });
  }
}

export async function PATCH(request: Request, { params }: Ctx) {
  const denied = await guardLeadsApi(request);
  if (denied) return denied;
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Send a JSON body, e.g. {"status": "contacted"}.' },
      { status: 400, headers: NO_STORE }
    );
  }
  const status = (body as { status?: unknown } | null)?.status;
  if (typeof status !== "string" || !LEAD_STATUS_VALUES.includes(status)) {
    return NextResponse.json(
      { error: `Invalid status. Use one of: ${LEAD_STATUS_VALUES.join(", ")}.` },
      { status: 400, headers: NO_STORE }
    );
  }

  try {
    // getLeadById also rejects malformed ids, so updateLeadStatus never sees one.
    if (!(await getLeadById(id))) return notFound();
    await updateLeadStatus(id, status);
    // Same admin pages the admin's own status change refreshes.
    for (const path of ["/admin", "/admin/careers", "/admin/bin"]) revalidatePath(path);
    return NextResponse.json({ ok: true, lead: await getLeadById(id) }, { headers: NO_STORE });
  } catch (err) {
    console.error("PATCH /api/integrations/leads/[id] failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: NO_STORE });
  }
}
