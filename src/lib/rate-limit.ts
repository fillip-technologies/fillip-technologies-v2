import "server-only";

/**
 * Minimal in-memory sliding-window rate limiter for API route handlers.
 *
 * Scope & caveats: state lives in this process's memory, so limits are
 * per-instance and reset on restart. That's intentionally simple — it's enough
 * to blunt brute-force/spam on a single-node `next start` deployment. If this
 * ever runs multi-instance (or serverless), swap the store for Redis/Upstash
 * and keep the same `rateLimit()` signature.
 */

type Hit = { count: number; resetAt: number };

const globalForRateLimit = globalThis as unknown as {
  _rateLimit?: Map<string, Hit>;
};

const store = globalForRateLimit._rateLimit ?? (globalForRateLimit._rateLimit = new Map());

export type RateLimitResult = {
  ok: boolean;
  /** Requests remaining in the current window. */
  remaining: number;
  /** Seconds until the window resets (for a Retry-After header). */
  retryAfter: number;
};

/**
 * Record a hit for `key` and report whether it's within `limit` per `windowMs`.
 * Call once per request; a blocked result means the caller exceeded the limit.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now >= existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter };
  }
  return { ok: true, remaining: limit - existing.count, retryAfter };
}

/** Best-effort client IP from proxy headers, falling back to a fixed bucket. */
export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Periodically drop expired entries so the map can't grow unbounded. */
function sweep(): void {
  const now = Date.now();
  for (const [key, hit] of store) {
    if (now >= hit.resetAt) store.delete(key);
  }
}

// One shared sweeper per process; unref so it never keeps Node alive.
const globalForSweeper = globalThis as unknown as { _rateLimitSweeper?: NodeJS.Timeout };
if (!globalForSweeper._rateLimitSweeper) {
  globalForSweeper._rateLimitSweeper = setInterval(sweep, 60_000);
  globalForSweeper._rateLimitSweeper.unref?.();
}
