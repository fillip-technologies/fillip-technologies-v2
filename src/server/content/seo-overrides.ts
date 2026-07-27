import "server-only";

import { dbConnect } from "@/lib/db";
import { SiteContentModel } from "@/server/db/models";
import { normalizePath } from "@/lib/seo/urls";
import { normalizePageSeoInput, type PageSeoInput } from "@/lib/seo/page-seo";
import { primeMergeSnapshot, snapshotRead } from "./snapshot-cache";

/**
 * Per-page SEO overrides live in `site_content` keyed `seo:<path>` (e.g.
 * `seo:/industries/healthcare`). They override the hardcoded/synthesized SEO the
 * registry builds for each page — see `@/lib/seo/registry`. Reads are wrapped in
 * `snapshotRead` so a Mongo outage still serves last-known-good data.
 */

const KEY_PREFIX = "seo:";
const overrideKey = (path: string) => `${KEY_PREFIX}${normalizePath(path)}`;
const cacheKey = (path: string) => `seo-override:${normalizePath(path)}`;
const ALL_CACHE_KEY = "seo-overrides:all";

/** All overrides, keyed by normalized page path. One DB round trip. */
export async function getAllSeoOverrides(): Promise<Map<string, PageSeoInput>> {
  const rows = await snapshotRead<Array<{ path: string; data: unknown }>>(
    ALL_CACHE_KEY,
    async () => {
      await dbConnect();
      const docs = await SiteContentModel.find({ key: { $regex: "^seo:/" } }).lean();
      return docs.map((d) => ({ path: d.key.slice(KEY_PREFIX.length), data: d.data }));
    },
    []
  );

  const map = new Map<string, PageSeoInput>();
  for (const row of rows) map.set(normalizePath(row.path), normalizePageSeoInput(row.data));
  return map;
}

/** One page's override, or null if none saved. */
export async function getSeoOverride(path: string): Promise<PageSeoInput | null> {
  const data = await snapshotRead<unknown>(
    cacheKey(path),
    async () => {
      await dbConnect();
      const row = await SiteContentModel.findOne({ key: overrideKey(path) }).lean();
      return row?.data ?? null;
    },
    null
  );
  return data ? normalizePageSeoInput(data) : null;
}

/** Insert or update a page's SEO override. */
export async function upsertSeoOverride(path: string, input: PageSeoInput): Promise<void> {
  await dbConnect();
  const key = overrideKey(path);
  await SiteContentModel.updateOne(
    { key },
    { $set: { data: input, updated_at: new Date() } },
    { upsert: true }
  );
  // Keep the snapshot warm so a DB outage right after a save still serves it.
  primeMergeSnapshot(cacheKey(path), input as unknown as Record<string, unknown>);
}
