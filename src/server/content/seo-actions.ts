"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { getBaseSeoRecordForPath, getSeoPageRecords } from "@/lib/seo/registry";
import { mergeSeoOverride, normalizePageSeoInput } from "@/lib/seo/page-seo";
import { validateForPublish } from "@/lib/seo/publish-validation";
import { normalizePath } from "@/lib/seo/urls";
import type { SeoIssue, SeoPageRecord } from "@/lib/seo/types";
import { upsertSeoOverride } from "./seo-overrides";
import { setPublished as setIndustryPublished } from "./industry-registry";
import { setServicePagePublished } from "./servicepage-registry";
import { setPublished as setCategoryPublished } from "./whatwedo-registry";
import type { SaveState } from "./types";

export type SeoSaveState = SaveState & { issues?: SeoIssue[] };

/**
 * Keep the CMS collection's `published` boolean in sync with the SEO status, so
 * the public route gate (`page.published`) and nav-link filtering keep working.
 * Draft/archived → unpublished (route 404s); published → live.
 */
async function syncCmsPublished(record: SeoPageRecord, published: boolean): Promise<void> {
  if (!record.slug) return;
  if (record.kind === "industry") await setIndustryPublished(record.slug, published);
  else if (record.kind === "service") await setServicePagePublished(record.slug, published);
  else if (record.kind === "category") await setCategoryPublished(record.slug, published);
}

/**
 * Save a page's SEO override. When the target status is "published" the publish
 * gate runs first and blocks (returning the issues) if any ERROR exists — the
 * same rules the audit uses. Draft/archived saves are always allowed.
 */
export async function savePageSeo(path: string, raw: unknown): Promise<SeoSaveState> {
  if (!(await getSession())) return { ok: false, message: "Not authorized." };

  const target = normalizePath(path);
  const base = await getBaseSeoRecordForPath(target);
  if (!base) return { ok: false, message: "Unknown page." };

  const input = normalizePageSeoInput(raw);
  const candidate = mergeSeoOverride(base, input);

  if (input.status === "published") {
    const all = await getSeoPageRecords();
    const errors = validateForPublish(candidate, all).filter((i) => i.severity === "ERROR");
    if (errors.length) {
      return { ok: false, message: "Fix the errors below before publishing.", issues: errors };
    }
  }

  try {
    await upsertSeoOverride(target, input);
    await syncCmsPublished(candidate, input.status === "published");
    revalidatePath(target);
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/cms/seo");
    return {
      ok: true,
      message:
        input.status === "published"
          ? "Saved and published. SEO is live."
          : `Saved as ${input.status}. It won't appear in the sitemap until published.`,
    };
  } catch (err) {
    console.error("savePageSeo failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
