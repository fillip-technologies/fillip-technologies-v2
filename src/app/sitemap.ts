import type { MetadataRoute } from "next";
import { getSeoPageRecords, isIndexable } from "@/lib/seo/registry";
import { absoluteUrl } from "@/lib/seo/urls";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const records = await getSeoPageRecords();

  return records
    .filter(isIndexable)
    .map((record) => ({
      url: absoluteUrl(record.canonical || record.path),
      lastModified: record.lastModified ?? new Date(),
      changeFrequency: record.changeFrequency ?? "monthly",
      priority: record.priority ?? 0.5,
      alternates: record.alternates,
    }));
}
