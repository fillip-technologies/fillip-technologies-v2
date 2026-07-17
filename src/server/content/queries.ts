import { dbConnect } from "@/lib/db";
import { SiteContentModel } from "@/server/db/models";
import { primeMergeSnapshot, snapshotRead } from "./snapshot-cache";

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

/** Insert or update a content row's JSON payload. */
export async function upsertContent(
  key: string,
  data: Record<string, unknown>
): Promise<void> {
  await dbConnect();
  await SiteContentModel.updateOne(
    { key },
    { $set: { data, updated_at: new Date() } },
    { upsert: true }
  );
  // Reflect the freshly-saved content in the snapshot right away so a DB outage
  // immediately after a save still serves the newest data.
  primeMergeSnapshot(contentKey(key), data);
}
