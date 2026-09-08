import "server-only";

import { getRedisClient } from "@/lib/redis";

/**
 * Sliding-window rate limiter.
 *
 * Primary store: Redis INCR + EXPIRE — atomic, shared across all instances and
 * process restarts. Falls back to an in-process Map when Redis is unavailable
 * (same behaviour as before Redis was added) so a Redis outage never takes down
 * contact forms or the login page.
 */

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfter: number; // seconds until the window resets (for Retry-After header)
};

/* -------------------------------------------------------- in-process fallback -- */

type Hit = { count: number; resetAt: number };

const globalForRateLimit = globalThis as unknown as {
  _rateLimit?: Map<string, Hit>;
  _rateLimitSweeper?: NodeJS.Timeout;
};

const localStore: Map<string, Hit> =
  globalForRateLimit._rateLimit ?? (globalForRateLimit._rateLimit = new Map());

function rateLimitLocal(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = localStore.get(key);

  if (!existing || now >= existing.resetAt) {
    localStore.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter };
  }
  return { ok: true, remaining: limit - existing.count, retryAfter };
}

function sweep(): void {
  const now = Date.now();
  for (const [key, hit] of localStore) {
    if (now >= hit.resetAt) localStore.delete(key);
  }
}

if (!globalForRateLimit._rateLimitSweeper) {
  globalForRateLimit._rateLimitSweeper = setInterval(sweep, 60_000);
  globalForRateLimit._rateLimitSweeper.unref?.();
}

/* ---------------------------------------------------------- Redis primary path -- */

const REDIS_PREFIX = "fillip:rl:";

async function rateLimitRedis(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const client = getRedisClient()!;
  const redisKey = `${REDIS_PREFIX}${key}`;
  const windowSec = Math.ceil(windowMs / 1000);

  // INCR is atomic — safe under concurrent requests.
  const count = await client.incr(redisKey);
  if (count === 1) {
    // First hit in this window: set the expiry.
    await client.expire(redisKey, windowSec);
  }

  if (count > limit) {
    const ttl = await client.ttl(redisKey);
    return { ok: false, remaining: 0, retryAfter: Math.max(ttl, 0) };
  }

  return { ok: true, remaining: limit - count, retryAfter: 0 };
}

/* ------------------------------------------------------------------ public API -- */

/**
 * Record a hit for `key` and report whether it is within `limit` per `windowMs`.
 *
 * The key should encode both the endpoint and the client identity so that limits
 * are scoped correctly, e.g. `login-ip:1.2.3.4` or `contact:1.2.3.4`.
 *
 * Call once per request; a blocked result means the caller exceeded the limit.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const client = getRedisClient();
  if (client) {
    try {
      return await rateLimitRedis(key, limit, windowMs);
    } catch {
      // Redis error — fail open with the local store so the endpoint stays up.
    }
  }
  return rateLimitLocal(key, limit, windowMs);
}

/** Best-effort client IP from proxy headers, falling back to a fixed bucket. */
export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
