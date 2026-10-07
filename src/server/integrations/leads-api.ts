import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Shared gate for the leads integration API (/api/integrations/leads/**) —
 * machine-to-machine access for external platforms. Auth is a shared secret
 * (NOT the admin login/session): the caller sends LEADS_API_KEY as
 * `Authorization: Bearer <key>` or an `x-api-key` header. Keeping it separate
 * from the admin session gives integrations an independently-revocable
 * credential: change or unset LEADS_API_KEY and restart to revoke it.
 */

// Requests per minute per client IP, across the whole leads integration API.
const RATE_LIMIT = 120;
const WINDOW_MS = 60_000;

/** Lead data is personal data: never let a browser or proxy cache it. */
export const NO_STORE = { "Cache-Control": "no-store" };

const digest = (value: string) => createHash("sha256").update(value).digest();

/** The key the caller sent, from `Authorization: Bearer <key>` or `x-api-key`. */
function presentedKey(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice("Bearer ".length).trim() || null;
  const apiKey = request.headers.get("x-api-key");
  return apiKey ? apiKey.trim() || null : null;
}

/**
 * Rate-limit the caller, then require the API key. Returns the error response to
 * send, or null when the request may proceed. Fails closed: with no key
 * configured the API is disabled, so an unset env var can never be matched.
 *
 * `allowPublic` lets a read endpoint honour LEADS_API_PUBLIC="true" (serve leads
 * to ANY caller with no credential — exposes customer PII, enable deliberately).
 * Endpoints that change data never pass it, so they always need the key.
 */
export async function guardLeadsApi(
  request: Request,
  opts: { allowPublic?: boolean } = {}
): Promise<NextResponse | null> {
  const limit = await rateLimit(`leads-api:${clientIp(request)}`, RATE_LIMIT, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(limit.retryAfter) } }
    );
  }

  if (opts.allowPublic && process.env.LEADS_API_PUBLIC === "true") return null;

  const expected = process.env.LEADS_API_KEY;
  if (!expected) {
    return NextResponse.json(
      { error: "Leads API is not configured." },
      { status: 503, headers: NO_STORE }
    );
  }

  const provided = presentedKey(request);
  // Compare fixed-length digests in constant time, so neither the key nor its
  // length leaks through response timing.
  if (!provided || !timingSafeEqual(digest(provided), digest(expected))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });
  }
  return null;
}
