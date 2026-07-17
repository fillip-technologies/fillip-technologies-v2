import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import seedRaw from "@/data/content-snapshot.json";

/**
 * Read-through "last-known-good" cache for public content reads.
 *
 * `snapshotRead` wraps a DB read (`loader`). While the DB is reachable it just
 * returns fresh data and quietly records it. When the DB is unreachable it
 * returns the newest value it can find instead of throwing, so public pages keep
 * rendering the content that was last saved in the database. Fallback tiers,
 * newest first:
 *
 *   1. in-memory   — refreshed on every successful read; survives across
 *                    requests in a warm process (Vercel warm instance / Node).
 *   2. runtime disk — `.content-snapshot/` written best-effort; survives a
 *                     restart on a writable host, silently skipped on read-only
 *                     serverless filesystems.
 *   3. build seed  — `src/data/content-snapshot.json`, bundled at build time;
 *                    present even on a cold serverless start with the DB down.
 *   4. fallback    — the caller's code default (`sectionDefaults` / [] / null).
 *
 * Only *reads* use this. Writes (upsert/insert/delete) must still fail loudly
 * when the DB is down.
 *
 * Stored values are always the JSON-safe `serialize(value)` form. For plain
 * objects/arrays that is the value itself; `opts.serialize`/`opts.deserialize`
 * handle non-JSON values (e.g. a `Set` cached as an array).
 */

export type SnapshotOptions<T> = {
  /** Convert the live value to a JSON-safe form for caching. Default: identity. */
  serialize?: (value: T) => unknown;
  /** Rebuild the live value from its cached JSON-safe form. Default: identity. */
  deserialize?: (raw: unknown) => T;
};

const SNAPSHOT_DIR = path.join(process.cwd(), ".content-snapshot");
const seed = seedRaw as Record<string, unknown>;

// Caches survive Next's dev hot-reload module clearing by living on globalThis.
const globalForSnapshot = globalThis as unknown as {
  _contentSnapshot?: {
    /** key -> latest JSON-safe value read from the DB. */
    memory: Map<string, unknown>;
    /** key -> JSON string last written to disk (skips redundant writes). */
    writtenJson: Map<string, string>;
    /** key -> last time we logged a DB-down fallback (throttles noise). */
    lastLogged: Map<string, number>;
  };
};

const store =
  globalForSnapshot._contentSnapshot ??
  (globalForSnapshot._contentSnapshot = {
    memory: new Map(),
    writtenJson: new Map(),
    lastLogged: new Map(),
  });

/** `content:home.hero` -> `content_home.hero.json` (safe, readable filename). */
function snapshotFile(cacheKey: string): string {
  const safe = cacheKey.replace(/[^a-zA-Z0-9._-]/g, "_");
  return path.join(SNAPSHOT_DIR, `${safe}.json`);
}

/** Persist a value to the runtime snapshot dir. Best-effort — never throws. */
async function writeToDisk(cacheKey: string, json: string): Promise<void> {
  try {
    await fs.mkdir(SNAPSHOT_DIR, { recursive: true });
    await fs.writeFile(snapshotFile(cacheKey), json, "utf8");
  } catch {
    // Read-only FS (serverless) or any IO error: the in-memory tier and build
    // seed still cover us, so silently give up.
  }
}

/** Read a previously persisted value from the runtime snapshot dir, or undefined. */
async function readFromDisk(cacheKey: string): Promise<unknown | undefined> {
  try {
    const raw = await fs.readFile(snapshotFile(cacheKey), "utf8");
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

/**
 * Read a cached value through the fallback tiers (memory -> runtime disk ->
 * build seed). Returns `{ hit: false }` when no tier has the key.
 */
async function readTiers(cacheKey: string): Promise<{ hit: boolean; raw?: unknown }> {
  if (store.memory.has(cacheKey)) return { hit: true, raw: store.memory.get(cacheKey) };
  const fromDisk = await readFromDisk(cacheKey);
  if (fromDisk !== undefined) {
    store.memory.set(cacheKey, fromDisk); // warm memory for next time
    return { hit: true, raw: fromDisk };
  }
  if (Object.prototype.hasOwnProperty.call(seed, cacheKey)) {
    return { hit: true, raw: seed[cacheKey] };
  }
  return { hit: false };
}

/** Log a DB-down fallback at most once per minute per key. */
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

export async function snapshotRead<T>(
  cacheKey: string,
  loader: () => Promise<T>,
  fallback: T,
  opts?: SnapshotOptions<T>
): Promise<T> {
  const serialize = opts?.serialize ?? ((v: T) => v as unknown);
  const deserialize = opts?.deserialize ?? ((r: unknown) => r as T);

  try {
    const value = await loader();
    // `record` only touches the disk when the content actually changed, to
    // avoid churning a file on every request.
    record(cacheKey, serialize(value));
    return value;
  } catch (err) {
    logFallbackOnce(cacheKey, err);
    const tier = await readTiers(cacheKey);
    return tier.hit ? deserialize(tier.raw) : fallback;
  }
}

/**
 * Batch variant of {@link snapshotRead}. `loader` runs the DB read for *all*
 * keys at once (e.g. a single `find({ key: { $in } })`) and returns a Map keyed
 * by `cacheKey`. Each key is recorded individually so per-key fallback still
 * works. On a DB failure every key falls back through its own snapshot tiers.
 *
 * This collapses a fan-out of N per-item queries into one round trip while
 * keeping the same resilience as N separate `snapshotRead` calls.
 */
export async function snapshotReadMany<T>(
  entries: Array<{ cacheKey: string; fallback: T }>,
  loader: () => Promise<Map<string, T>>,
  opts?: SnapshotOptions<T>
): Promise<Map<string, T>> {
  const serialize = opts?.serialize ?? ((v: T) => v as unknown);
  const deserialize = opts?.deserialize ?? ((r: unknown) => r as T);

  try {
    const values = await loader();
    const out = new Map<string, T>();
    for (const { cacheKey, fallback } of entries) {
      const value = values.has(cacheKey) ? (values.get(cacheKey) as T) : fallback;
      record(cacheKey, serialize(value));
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

/** Record a JSON-safe value under `cacheKey` (memory + best-effort disk). */
function record(cacheKey: string, stored: unknown): void {
  store.memory.set(cacheKey, stored);
  const json = JSON.stringify(stored);
  if (store.writtenJson.get(cacheKey) !== json) {
    store.writtenJson.set(cacheKey, json);
    void writeToDisk(cacheKey, json);
  }
}

/**
 * Merge freshly-saved object content into the snapshot without a DB read. Called
 * after a successful write so a DB outage immediately afterwards still serves the
 * newest data. Merges over the existing cached entry so keys the writer didn't
 * include (e.g. code defaults previously merged in by a read) are preserved.
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
  record(cacheKey, { ...base, ...partial });
}
