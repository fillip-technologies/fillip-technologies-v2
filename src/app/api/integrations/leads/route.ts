import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { listLeads } from "@/server/contact/queries";

// GET /api/integrations/leads — machine-to-machine access for external platforms.
//
// Auth is a shared secret (NOT the admin login/session): the caller sends the
// key as `Authorization: Bearer <key>` or an `x-api-key` header, and it must
// equal LEADS_API_KEY from the environment. This keeps the session-protected
// admin route (/api/leads) untouched while giving integrations a separate,
// independently-revocable credential.
export const runtime = "nodejs";

/** Constant-time string compare (avoids leaking the key via response timing). */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function presentedKey(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice("Bearer ".length).trim();
  const apiKey = request.headers.get("x-api-key");
  return apiKey ? apiKey.trim() : null;
}

export async function GET(request: Request) {
  // Opt-in fully-public mode: when LEADS_API_PUBLIC="true" the endpoint serves
  // leads to ANY caller with no credential. This exposes customer PII to anyone
  // who can reach the URL — enable deliberately and revoke by unsetting the flag.
  const isPublic = process.env.LEADS_API_PUBLIC === "true";

  if (!isPublic) {
    const expected = process.env.LEADS_API_KEY;
    // Fail closed: with no key configured (and not public) the endpoint is
    // disabled, so an unset env var can never be matched by an empty credential.
    if (!expected) {
      return NextResponse.json(
        { error: "Leads API is not configured." },
        { status: 503 }
      );
    }

    const provided = presentedKey(request);
    if (!provided || !safeEqual(provided, expected)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const limitParam = new URL(request.url).searchParams.get("limit");
  const limit = Math.min(Math.max(Number(limitParam) || 100, 1), 500);

  try {
    const leads = await listLeads(limit);
    return NextResponse.json({ ok: true, count: leads.length, leads });
  } catch (err) {
    console.error("GET /api/integrations/leads failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
