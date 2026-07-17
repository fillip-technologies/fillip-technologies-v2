import { dbConnect } from "@/lib/db";
import { SiteContentModel } from "@/server/db/models";
import { primeMergeSnapshot, snapshotRead, snapshotReadMany } from "./snapshot-cache";
import { cleanupReplacedUploads } from "./upload-cleanup";

/** Snapshot cache key for a site_content row. */
const contentKey = (key: string) => `content:${key}`;

/**
 * Read a content row's JSON data, merged over the provided defaults so missing
 * keys always have a value. Safe to call from Server Components.
 *
 * Wrapped in `snapshotRead`: when the DB is reachable it returns fresh data and
 * records it; when the DB is down it returns the last-known-good content (or the
 * defaults) instead of throwing.
 */
export async function getContentData<T extends Record<string, unknown>>(
  key: string,
  defaults: T
): Promise<T> {
  return snapshotRead<T>(
    contentKey(key),
    async () => {
      await dbConnect();
      const row = await SiteContentModel.findOne({ key }).lean();
      return { ...defaults, ...((row?.data as Record<string, unknown>) ?? {}) };
    },
    defaults
  );
}

/**
 * Batched form of {@link getContentData}: fetch many content rows in a single
 * `find({ key: { $in } })` instead of one round trip per key. Returns a record
 * keyed by the original `key`, each merged over its defaults. Use this when a
 * page needs several sections at once (e.g. the Home page's 13 sections) so it
 * pays one DB round trip instead of N.
 */
export async function getContentDataMany(
  specs: Array<{ key: string; defaults: Record<string, unknown> }>
): Promise<Record<string, Record<string, unknown>>> {
  const entries = specs.map((s) => ({ cacheKey: contentKey(s.key), fallback: s.defaults }));

  const map = await snapshotReadMany<Record<string, unknown>>(entries, async () => {
    await dbConnect();
    const rows = await SiteContentModel.find({ key: { $in: specs.map((s) => s.key) } }).lean();
    const byKey = new Map(rows.map((r) => [r.key, (r.data as Record<string, unknown>) ?? {}]));
    const out = new Map<string, Record<string, unknown>>();
    for (const { key, defaults } of specs) {
      out.set(contentKey(key), { ...defaults, ...(byKey.get(key) ?? {}) });
    }
    return out;
  });

  const result: Record<string, Record<string, unknown>> = {};
  for (const { key } of specs) result[key] = map.get(contentKey(key))!;
  return result;
}

/** Insert or update a content row's JSON payload. */
export async function upsertContent(
  key: string,
  data: Record<string, unknown>
): Promise<void> {
  await dbConnect();
  // Capture the previous payload before overwriting so we can detect image
  // uploads that this save replaces (and free them from Cloudinary below).
  const prev = await SiteContentModel.findOne({ key }, { data: 1 }).lean();
  await SiteContentModel.updateOne(
    { key },
    { $set: { data, updated_at: new Date() } },
    { upsert: true }
  );
  // Reflect the freshly-saved content in the snapshot right away so a DB outage
  // immediately after a save still serves the newest data.
  primeMergeSnapshot(contentKey(key), data);
  // Best-effort: delete any CMS upload this save orphaned. Runs after the write
  // so the reference scan reflects the new state; never throws.
  await cleanupReplacedUploads(prev?.data);
}
