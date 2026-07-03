import { dbConnect } from "@/lib/db";
import { SiteContentModel } from "@/server/db/models";

/**
 * Read a content row's JSON data, merged over the provided defaults so missing
 * keys always have a value. Safe to call from Server Components.
 */
export async function getContentData<T extends Record<string, unknown>>(
  key: string,
  defaults: T
): Promise<T> {
  await dbConnect();
  const row = await SiteContentModel.findOne({ key }).lean();
  return { ...defaults, ...((row?.data as Record<string, unknown>) ?? {}) };
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
}
