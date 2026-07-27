import "server-only";

import { cache } from "react";
import type { Metadata } from "next";
import { getResolvedSeoRecord } from "./registry";
import { buildSeoMetadata } from "./metadata";
import { buildJsonLdForPage } from "./schema";

/**
 * Per-request memoised lookup of a page's resolved SEO record (fallback +
 * override). `generateMetadata` and the page body both call this for the same
 * path, so `cache` collapses it to a single build per request.
 */
export const resolvePageSeo = cache((path: string) => getResolvedSeoRecord(path));

/** Build `<head>` metadata for a path from its resolved SEO record. */
export async function pageMetadata(path: string, fallback: Metadata = {}): Promise<Metadata> {
  const record = await resolvePageSeo(path);
  return record ? buildSeoMetadata(record) : fallback;
}

/** Build the JSON-LD graph for a path (empty when the page isn't known). */
export async function pageJsonLd(path: string) {
  const record = await resolvePageSeo(path);
  return record ? buildJsonLdForPage(record) : [];
}
