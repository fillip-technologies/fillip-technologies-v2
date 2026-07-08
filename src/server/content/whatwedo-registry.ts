import "server-only";

import { dbConnect } from "@/lib/db";
import { ServiceCategoryModel, SiteContentModel } from "@/server/db/models";
import { WHAT_WE_DO_ITEMS_BY_SLUG } from "@/components/layouts/Navbar/whatWeDoMegaMenuData";
import type { MegaMenuItem } from "@/components/layouts/Navbar/whatWeDoMegaMenuData";

/**
 * Data access for the `service_categories` collection — the source of truth for
 * *which* /what-we-do/<slug> category pages exist, their label, publish state
 * and order. Section content lives in site_content (`whatwedo.<slug>.<id>`).
 * Mirrors industry-registry.ts.
 */

export type Category = {
  slug: string;
  label: string;
  published: boolean;
  sortOrder: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toCategory = (d: any): Category => ({
  slug: d.slug,
  label: d.label,
  published: d.published,
  sortOrder: d.sort_order,
});

/** All categories (published + drafts), ordered for the admin list. */
export async function listCategories(): Promise<Category[]> {
  await dbConnect();
  const docs = await ServiceCategoryModel.find().sort({ sort_order: 1, slug: 1 }).lean();
  return docs.map(toCategory);
}

/** Only published categories — for public nav/listing. */
export async function listPublishedCategories(): Promise<Category[]> {
  await dbConnect();
  const docs = await ServiceCategoryModel.find({ published: true })
    .sort({ sort_order: 1, slug: 1 })
    .lean();
  return docs.map(toCategory);
}

/** One category by slug, or null if it doesn't exist. */
export async function getCategory(slug: string): Promise<Category | null> {
  await dbConnect();
  const doc = await ServiceCategoryModel.findOne({ slug }).lean();
  return doc ? toCategory(doc) : null;
}

/** site_content key holding a category's mega-menu sub-links. */
export const menuLinksKey = (slug: string) => `whatwedo.${slug}.menuLinks`;

/**
 * The mega-menu sub-links shown under a category's header. Admin-saved links win;
 * otherwise fall back to the curated static defaults for the originally-seeded
 * slugs (so the 6 seeded categories keep their links until edited). New
 * admin-created categories with nothing saved return `[]`.
 */
export async function getCategoryMenuLinks(slug: string): Promise<MegaMenuItem[]> {
  await dbConnect();
  const row = await SiteContentModel.findOne({ key: menuLinksKey(slug) }).lean();
  const saved = (row?.data as { items?: unknown } | undefined)?.items;
  if (Array.isArray(saved)) {
    return saved
      .map((i) => {
        const it = (i ?? {}) as Record<string, unknown>;
        const label = String(it.label ?? "").trim();
        const href = String(it.href ?? "").trim();
        return href ? { label, href } : { label };
      })
      .filter((i) => i.label);
  }
  return WHAT_WE_DO_ITEMS_BY_SLUG[slug] ?? [];
}

/** Toggle publish state. */
export async function setPublished(slug: string, published: boolean): Promise<void> {
  await dbConnect();
  await ServiceCategoryModel.updateOne(
    { slug },
    { $set: { published, updated_at: new Date() } }
  );
}

