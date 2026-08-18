import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema, parseClientLocation } from "@/server/contact/schema";
import { insertLead } from "@/server/contact/queries";
import { resolveLeadLocation } from "@/server/contact/geo";
import { sendLeadNotification } from "@/server/contact/notify";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// IP geolocation needs the Node runtime (outbound fetch + request headers).
export const runtime = "nodejs";

// Spam guard: each submission writes a lead + fires an email + a geo-IP lookup,
// so cap per-IP submissions to a handful per window.
const MAX_SUBMISSIONS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// POST /api/contact  — public: create a lead from the contact form.
export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientIp(request)}`, MAX_SUBMISSIONS, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 422 }
    );
  }

  try {
    const location = await resolveLeadLocation(
      parseClientLocation((body as { location?: unknown })?.location),
      request
    );
    const lead = await insertLead({ ...parsed.data, location });

    // Notify the team by email. Best-effort: the lead is already saved, so a
    // mail failure must not fail the request.
    try {
      await sendLeadNotification(lead);
    } catch (mailErr) {
      console.error("Lead notification email failed:", mailErr);
    }

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/contact failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
