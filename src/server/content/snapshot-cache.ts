import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import seedRaw from "@/data/content-snapshot.json";
import { getRedisClient } from "@/lib/redis";

/**
 * Read-through cache + last-known-good fallback for public content reads.
 *
 * `snapshotRead` checks four tiers in order, newest first:
 *
 *   1. in-process memory  — instant; warm after first request in this process;
 *                           reloaded in the background once stale (L1_TTL_MS).
 *   2. Redis              — shared across instances/restarts; populated on every
 *                           DB read; invalidated explicitly on CMS saves.
 *   3. runtime disk       — `.content-snapshot/` written best-effort; survives a
 *                           process restart on a writable host.
 *   4. build seed         — `src/data/content-snapshot.json`, bundled at build
 *                           time; always present even when DB + Redis are down.
 *   5. code default       — the caller's `fallback` value; last resort.
 *
 * Only *reads* use this. Writes must still fail loudly when the DB is down.
 *
 * Stored values are always the JSON-safe `serialize(value)` form. `opts.serialize`
 * / `opts.deserialize` handle non-JSON values (e.g. a `Set` cached as an array).
 */

export type SnapshotOptions<T> = {
  /** Convert the live value to a JSON-safe form for caching. Default: identity. */
  serialize?: (value: T) => unknown;
  /** Rebuild the live value from its cached JSON-safe form. Default: identity. */
  deserialize?: (raw: unknown) => T;
};

const SNAPSHOT_DIR = path.join(process.cwd(), ".content-snapshot");
const REDIS_PREFIX = "fillip:snapshot:";
const seed = seedRaw as Record<string, unknown>;

// Caches survive Next's dev hot-reload module clearing by living on globalThis.
const globalForSnapshot = globalThis as unknown as {
  _contentSnapshot?: {
    memory: Map<string, unknown>;
    /** Epoch ms until which a `memory` entry may be served as an L1 hit. */
    freshUntil: Map<string, number>;
    writtenJson: Map<string, string>;
    lastLogged: Map<string, number>;
  };
};

const store =
  globalForSnapshot._contentSnapshot ??
  (globalForSnapshot._contentSnapshot = {
    memory: new Map(),
    freshUntil: new Map(),
    writtenJson: new Map(),
    lastLogged: new Map(),
  });
// A store created by an older module version (dev hot-reload) lacks this map.
store.freshUntil ??= new Map();

/**
 * How long an in-process (L1) entry counts as fresh.
 *
 * CMS writes only evict L1 in the process that performed them. Other processes
 * — e.g. production, when content is edited from a local admin against the same
 * DB — would otherwise serve their copy until restart. A stale entry is still
 * served instantly but triggers one background reload from the DB
 * (stale-while-revalidate), so renders never wait on the refresh.
 */
const L1_TTL_MS = 60_000;

function setL1(cacheKey: string, raw: unknown): void {
  store.memory.set(cacheKey, raw);
  store.freshUntil.set(cacheKey, Date.now() + L1_TTL_MS);
}

function isL1Stale(cacheKey: string): boolean {
  return (store.freshUntil.get(cacheKey) ?? 0) <= Date.now();
}

/* ------------------------------------------------------------------ TTLs -- */

/** Redis TTL (seconds) by cache-key prefix. */
function cacheTtl(key: string): number {
  if (key.startsWith("content:")) return 900;       // 15 min — CMS sections
  if (key.startsWith("blogs:")) return 300;          // 5 min  — blog lists
  if (key.startsWith("blog-admin:")) return 120;     // 2 min  — admin editor reads
  if (key.startsWith("blog:")) return 600;           // 10 min — public blog posts
  if (key.startsWith("case-studies:")) return 900;   // 15 min
  if (key.startsWith("case-study:")) return 900;     // 15 min
  if (key.startsWith("industries:")) return 900;     // 15 min
  if (key.startsWith("industry:")) return 900;       // 15 min
  if (key.startsWith("categories:")) return 900;     // 15 min
  if (key.startsWith("category:")) return 900;       // 15 min
  if (key.startsWith("menulinks:")) return 900;      // 15 min
  if (key.startsWith("servicepages:")) return 900;   // 15 min
  if (key.startsWith("servicepage:")) return 900;    // 15 min
  return 600;                                         // 10 min — default
}

/* --------------------------------------------------------------- Redis I/O -- */

async function redisGet(key: string): Promise<unknown | undefined> {
  try {
    const client = getRedisClient();
    if (!client) return undefined;
    const raw = await client.get(`${REDIS_PREFIX}${key}`);
    if (raw === null) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined; // Redis down → fall through to DB
  }
}

/** Fetch multiple keys in one MGET. Returns null when Redis is unavailable. */
async function redisMGet(keys: string[]): Promise<(unknown | null)[] | null> {
  try {
    const client = getRedisClient();
    if (!client) return null;
    const results = await client.mget(keys.map((k) => `${REDIS_PREFIX}${k}`));
    return results.map((r) => {
      if (r === null) return null;
      try {
        return JSON.parse(r);
      } catch {
        return null;
      }
    });
  } catch {
    return null;
  }
}

async function redisSetRaw(key: string, json: string, ttlSec: number): Promise<void> {
  try {
    const client = getRedisClient();
    if (!client) return;
    await client.set(`${REDIS_PREFIX}${key}`, json, "EX", ttlSec);
  } catch {
    // Redis down → no-op; DB is still the source of truth
  }
}

async function redisDelKeys(keys: string[]): Promise<void> {
  try {
    const client = getRedisClient();
    if (!client || keys.length === 0) return;
    await client.del(keys.map((k) => `${REDIS_PREFIX}${k}`));
  } catch {
    // no-op
  }
}

/* ------------------------------------------------------------ disk helpers -- */

function snapshotFile(cacheKey: string): string {
  const safe = cacheKey.replace(/[^a-zA-Z0-9._-]/g, "_");
  return path.join(SNAPSHOT_DIR, `${safe}.json`);
}

async function writeToDisk(cacheKey: string, json: string): Promise<void> {
  try {
    await fs.mkdir(SNAPSHOT_DIR, { recursive: true });
    await fs.writeFile(snapshotFile(cacheKey), json, "utf8");
  } catch {
    // Read-only FS or IO error — silently give up.
  }
}

async function readFromDisk(cacheKey: string): Promise<unknown | undefined> {
  try {
    const raw = await fs.readFile(snapshotFile(cacheKey), "utf8");
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

/* ------------------------------------------------------ tier fallback read -- */

async function readTiers(cacheKey: string): Promise<{ hit: boolean; raw?: unknown }> {
  if (store.memory.has(cacheKey)) return { hit: true, raw: store.memory.get(cacheKey) };
  const fromDisk = await readFromDisk(cacheKey);
  if (fromDisk !== undefined) {
    store.memory.set(cacheKey, fromDisk);
    return { hit: true, raw: fromDisk };
  }
  if (Object.prototype.hasOwnProperty.call(seed, cacheKey)) {
    return { hit: true, raw: seed[cacheKey] };
  }
  return { hit: false };
}

/* ------------------------------------------------------------ logging utils -- */

function logFallbackOnce(cacheKey: string, err: unknown): void {
  const now = Date.now();
  const last = store.lastLogged.get(cacheKey) ?? 0;
  if (now - last < 60_000) return;
  store.lastLogged.set(cacheKey, now);
  const msg = err instanceof Error ? err.message : String(err);
  console.warn(
    `[content-snapshot] DB read failed for "${cacheKey}"; serving last-known-good content. (${msg})`
  );
}

/* ------------------------------------------------------------------ record -- */

/** Persist a JSON-safe value to memory + disk + Redis (all best-effort). */
function record(cacheKey: string, stored: unknown): void {
  setL1(cacheKey, stored);
  const json = JSON.stringify(stored);
  if (store.writtenJson.get(cacheKey) !== json) {
    store.writtenJson.set(cacheKey, json);
    void writeToDisk(cacheKey, json);
    void redisSetRaw(cacheKey, json, cacheTtl(cacheKey));
  }
}

/**
 * Reload stale L1 entries without blocking the caller. `load` resolves to the
 * JSON-safe value per key. It goes straight to the DB rather than Redis: the DB
 * is the one tier every process shares, while Redis may still hold the
 * pre-write value. `record` then refreshes Redis + disk if the value changed.
 */
function refreshInBackground(
  cacheKeys: string[],
  load: () => Promise<Map<string, unknown>>
): void {
  // Marking fresh up front dedupes concurrent requests and, while the DB is
  // down, retries once per TTL instead of once per request.
  const before = new Map<string, unknown>();
  for (const key of cacheKeys) {
    before.set(key, store.memory.get(key));
    store.freshUntil.set(key, Date.now() + L1_TTL_MS);
  }
  void Promise.resolve()
    .then(load)
    .then((values) => {
      for (const [key, stored] of values) {
        // Skip keys rewritten or evicted mid-reload (e.g. by a CMS save in this
        // process): this read may predate that write.
        if (store.memory.has(key) && store.memory.get(key) === before.get(key)) {
          record(key, stored);
        }
      }
    })
    .catch((err) => logFallbackOnce(cacheKeys[0], err));
}

/* ================================================================ public API == */

/**
 * Read one cached value.
 *
 * Tier order: L1 memory → L2 Redis → L3 MongoDB → L4 disk → L5 seed → default.
 * On a warm process reads never wait on Redis or the DB; stale L1 entries are
 * reloaded in the background.
 */
export async function snapshotRead<T>(
  cacheKey: string,
  loader: () => Promise<T>,
  fallback: T,
  opts?: SnapshotOptions<T>
): Promise<T> {
  const serialize = opts?.serialize ?? ((v: T) => v as unknown);
  const deserialize = opts?.deserialize ?? ((r: unknown) => r as T);

  // L1: in-process memory (served even when stale; see L1_TTL_MS)
  if (store.memory.has(cacheKey)) {
    if (isL1Stale(cacheKey)) {
      refreshInBackground([cacheKey], async () => new Map([[cacheKey, serialize(await loader())]]));
    }
    return deserialize(store.memory.get(cacheKey));
  }

  // L2: Redis
  const redisCached = await redisGet(cacheKey);
  if (redisCached !== undefined) {
    setL1(cacheKey, redisCached); // warm L1 for next in-process request
    return deserialize(redisCached);
  }

  // L3: MongoDB
  try {
    const value = await loader();
    record(cacheKey, serialize(value)); // → L1 + disk + Redis
    return value;
  } catch (err) {
    logFallbackOnce(cacheKey, err);
    const tier = await readTiers(cacheKey); // → disk → seed
    return tier.hit ? deserialize(tier.raw) : fallback;
  }
}

/**
 * Batch variant of {@link snapshotRead}. Collapses N keys into:
 *   - one L1 check  (all-or-nothing; any miss drops to L2)
 *   - one Redis MGET (all-or-nothing; any miss drops to DB)
 *   - one batched DB query via `loader`
 *
 * On failure every key falls back independently through its own disk/seed tiers.
 */
export async function snapshotReadMany<T>(
  entries: Array<{ cacheKey: string; fallback: T }>,
  loader: () => Promise<Map<string, T>>,
  opts?: SnapshotOptions<T>
): Promise<Map<string, T>> {
  const serialize = opts?.serialize ?? ((v: T) => v as unknown);
  const deserialize = opts?.deserialize ?? ((r: unknown) => r as T);

  // L1: all keys in memory? (served even when stale; see L1_TTL_MS)
  if (entries.every(({ cacheKey }) => store.memory.has(cacheKey))) {
    const keys = entries.map((e) => e.cacheKey);
    if (keys.some(isL1Stale)) {
      refreshInBackground(keys, async () => {
        const values = await loader();
        const fresh = new Map<string, unknown>();
        for (const { cacheKey, fallback } of entries) {
          fresh.set(cacheKey, serialize(values.has(cacheKey) ? (values.get(cacheKey) as T) : fallback));
        }
        return fresh;
      });
    }
    const out = new Map<string, T>();
    for (const { cacheKey, fallback } of entries) {
      const raw = store.memory.get(cacheKey);
      out.set(cacheKey, raw !== undefined ? deserialize(raw) : fallback);
    }
    return out;
  }

  // L2: all keys in Redis? (single MGET)
  const redisResults = await redisMGet(entries.map((e) => e.cacheKey));
  if (redisResults !== null && redisResults.every((r) => r !== null)) {
    const out = new Map<string, T>();
    for (let i = 0; i < entries.length; i++) {
      const { cacheKey, fallback } = entries[i];
      const raw = redisResults[i];
      if (raw !== null) {
        setL1(cacheKey, raw); // warm L1
        out.set(cacheKey, deserialize(raw));
      } else {
        out.set(cacheKey, fallback);
      }
    }
    return out;
  }

  // L3: MongoDB — single batched query
  try {
    const values = await loader();
    const out = new Map<string, T>();
    for (const { cacheKey, fallback } of entries) {
      const value = values.has(cacheKey) ? (values.get(cacheKey) as T) : fallback;
      record(cacheKey, serialize(value)); // → L1 + disk + Redis
      out.set(cacheKey, value);
    }
    return out;
  } catch (err) {
    logFallbackOnce(entries[0]?.cacheKey ?? "batch", err);
    const out = new Map<string, T>();
    for (const { cacheKey, fallback } of entries) {
      const tier = await readTiers(cacheKey);
      out.set(cacheKey, tier.hit ? deserialize(tier.raw) : fallback);
    }
    return out;
  }
}

/**
 * Merge freshly-saved content into the cache without a DB read. Called after a
 * successful write so a DB outage immediately afterwards still serves the newest
 * data. Also updates Redis so other instances see the fresh value right away.
 */
export function primeMergeSnapshot(
  cacheKey: string,
  partial: Record<string, unknown>
): void {
  const existing = store.memory.get(cacheKey);
  const base =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? (existing as Record<string, unknown>)
      : {};
  record(cacheKey, { ...base, ...partial }); // → L1 + disk + Redis
}

/**
 * Evict one key from every cache tier so the next read fetches fresh from DB.
 * Call this after any write that changes a key's meaning (delete, publish toggle).
 */
export async function invalidateSnapshot(cacheKey: string): Promise<void> {
  store.memory.delete(cacheKey);
  store.freshUntil.delete(cacheKey);
  store.writtenJson.delete(cacheKey);
  await redisDelKeys([cacheKey]);
}

/**
 * Evict multiple keys at once (single Redis DEL command).
 */
export async function invalidateSnapshotMany(cacheKeys: string[]): Promise<void> {
  for (const key of cacheKeys) {
    store.memory.delete(key);
    store.freshUntil.delete(key);
    store.writtenJson.delete(key);
  }
  await redisDelKeys(cacheKeys);
}
