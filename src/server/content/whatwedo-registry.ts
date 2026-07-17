import "server-only";

import { dbConnect } from "@/lib/db";
import { ServiceCategoryModel, SiteContentModel } from "@/server/db/models";
import { WHAT_WE_DO_ITEMS_BY_SLUG } from "@/components/layouts/Navbar/whatWeDoMegaMenuData";
import type { MegaMenuItem } from "@/components/layouts/Navbar/whatWeDoMegaMenuData";
import { snapshotRead } from "./snapshot-cache";
import { SERVICE_TEMPLATES } from "./servicepage-templates";

// URL prefixes owned by the Service Pages CMS. A sub-link under one of these is
// a "managed" link whose visibility must follow its page's publish state.
const MANAGED_PREFIXES = [...new Set(SERVICE_TEMPLATES.map((t) => t.urlPrefix))];

/** An href points at a specific CMS-managed service page (prefix + a slug). */
function isManagedServiceHref(href: string): boolean {
  return MANAGED_PREFIXES.some((p) => href.startsWith(`${p}/`));
}

/**
 * Data access for the `service_categories` collection — the source of truth for
 * *which* /what-we-do/<slug> category pages exist, their label, publish state
 * and order. Section content lives in site_content (`whatwedo.<slug>.<id>`).
 * Mirrors industry-registry.ts.
 */

export type Category = {
  slug: string;
  label: string;
  group: string;
  description: string;
  published: boolean;
  sortOrder: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toCategory = (d: any): Category => ({
  slug: d.slug,
  label: d.label,
  group: d.group ?? "whatwedo",
  description: d.description ?? "",
  published: d.published,
  sortOrder: d.sort_order,
});

/**
 * Mongo filter for a category group. Missing `group` counts as "whatwedo" so the
 * originally-seeded categories keep showing without a data migration.
 */
function groupFilter(group?: string): Record<string, unknown> {
  if (!group) return {};
  if (group === "whatwedo") return { group: { $ne: "solutions" } };
  return { group };
}

/** All categories (published + drafts), ordered for the admin list. */
export async function listCategories(group?: string): Promise<Category[]> {
  return snapshotRead(
    `categories:all:${group ?? "*"}`,
    async () => {
      await dbConnect();
      const docs = await ServiceCategoryModel.find(groupFilter(group))
        .sort({ sort_order: 1, slug: 1 })
        .lean();
      return docs.map(toCategory);
    },
    []
  );
}

/** Only published categories — for public nav/listing. */
export async function listPublishedCategories(group?: string): Promise<Category[]> {
  return snapshotRead(
    `categories:published:${group ?? "*"}`,
    async () => {
      await dbConnect();
      const docs = await ServiceCategoryModel.find({ published: true, ...groupFilter(group) })
        .sort({ sort_order: 1, slug: 1 })
        .lean();
      return docs.map(toCategory);
    },
    []
  );
}

/** One category by slug, or null if it doesn't exist. */
export async function getCategory(slug: string): Promise<Category | null> {
  return snapshotRead<Category | null>(
    `category:${slug}`,
    async () => {
      await dbConnect();
      const doc = await ServiceCategoryModel.findOne({ slug }).lean();
      return doc ? toCategory(doc) : null;
    },
    null
  );
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
  const staticDefault = WHAT_WE_DO_ITEMS_BY_SLUG[slug] ?? [];
  return snapshotRead(
    `menulinks:${slug}`,
    async () => {
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
      return staticDefault;
    },
    staticDefault
  );
}

/**
 * Public mega-menu sub-links for a category: the saved links minus any that
 * point at a service page that is unpublished or no longer exists. Non-managed
 * links (category pages, industries, external URLs, label-only headers) always
 * pass through. Pass `publishedHrefs` (from getPublishedServiceHrefs) so the
 * caller can compute it once for all categories.
 */
export async function getPublicCategoryMenuLinks(
  slug: string,
  publishedHrefs: Set<string>
): Promise<MegaMenuItem[]> {
  const items = await getCategoryMenuLinks(slug);
  return items.filter(
    (i) => !i.href || !isManagedServiceHref(i.href) || publishedHrefs.has(i.href)
  );
}

/**
 * Remove a saved mega-menu sub-link (matched by href) from a category. Called
 * when the page it points to is permanently deleted, so the nav doesn't keep a
 * dead link. No-op if the category has no saved links or the href isn't present.
 */
export async function removeCategoryMenuLink(categorySlug: string, href: string): Promise<void> {
  await dbConnect();
  const row = await SiteContentModel.findOne({ key: menuLinksKey(categorySlug) }).lean();
  const saved = (row?.data as { items?: unknown } | undefined)?.items;
  if (!Array.isArray(saved)) return; // nothing saved → still on static defaults
  const next = saved.filter((i) => (i as { href?: string })?.href !== href);
  if (next.length === saved.length) return; // href wasn't there
  await SiteContentModel.updateOne(
    { key: menuLinksKey(categorySlug) },
    { $set: { data: { items: next }, updated_at: new Date() } }
  );
}

/** Toggle publish state. */
export async function setPublished(slug: string, published: boolean): Promise<void> {
  await dbConnect();
  await ServiceCategoryModel.updateOne(
    { slug },
    { $set: { published, updated_at: new Date() } }
  );
}

