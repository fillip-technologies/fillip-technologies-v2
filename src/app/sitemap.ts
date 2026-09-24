import type { MetadataRoute } from "next";
import { getSeoPageRecords, isIndexable } from "@/lib/seo/registry";
import { absoluteUrl, normalizePath } from "@/lib/seo/urls";

/**
 * The sitemap lists canonical, indexable, live URLs only.
 *
 * Two filters do that work:
 *
 *  - a record whose `canonical` points at a *different* path is an alias route
 *    (e.g. /messenger -> /solutions/whatsapp-business). The canonical target has
 *    its own record, so listing the alias would submit a non-canonical URL.
 *  - the same canonical reached from two records (a slug typo, a duplicated
 *    content file) is emitted once, keeping the higher-priority entry.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const records = await getSeoPageRecords();
  const byUrl = new Map<string, MetadataRoute.Sitemap[number] & { priority: number }>();

  for (const record of records) {
    if (!isIndexable(record)) continue;

    const canonical = normalizePath(record.canonical || record.path);
    // Alias route: the canonical URL is a different page, which supplies its own
    // sitemap entry. Skip so the sitemap never advertises a non-canonical URL.
    if (canonical !== normalizePath(record.path)) continue;

    const url = absoluteUrl(canonical);
    const priority = record.priority ?? 0.5;
    const existing = byUrl.get(url);
    if (existing && existing.priority >= priority) continue;

    byUrl.set(url, {
      url,
      lastModified: record.lastModified ?? new Date(),
      changeFrequency: record.changeFrequency ?? "monthly",
      priority,
      alternates: record.alternates,
    });
  }

  return [...byUrl.values()].sort((a, b) => a.url.localeCompare(b.url));
}
