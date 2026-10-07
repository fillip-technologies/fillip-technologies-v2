import "server-only";

import { dbConnect } from "@/lib/db";
import { ServiceCategoryModel, SiteContentModel } from "@/server/db/models";
import { WHAT_WE_DO_ITEMS_BY_SLUG } from "@/components/layouts/Navbar/whatWeDoMegaMenuData";
import type { MegaMenuItem } from "@/components/layouts/Navbar/whatWeDoMegaMenuData";
import {
  invalidateSnapshot,
  invalidateSnapshotMany,
  snapshotRead,
  snapshotReadMany,
} from "./snapshot-cache";
import { upsertContent } from "./queries";
import { getPublishedServiceHrefs } from "./servicepage-registry";
import { listPublishedCaseStudies } from "./casestudy-registry";

// All group variants used as cache-key suffixes (wildcard * + named groups).
const CAT_GROUPS = ["*", "whatwedo", "solutions"];
const catListKeys = CAT_GROUPS.flatMap((g) => [`categories:all:${g}`, `categories:published:${g}`]);
const catKeys = (slug: string) => [...catListKeys, `category:${slug}`, `menulinks:${slug}`];
import { SERVICE_TEMPLATES } from "./servicepage-templates";

// Case-study detail pages — the "Challenges We Solve" column links to these.
const CASE_STUDY_PREFIX = "/case-studies";

// URL prefixes owned by the CMS (service pages + case studies). A sub-link under
// one of these is a "managed" link whose visibility must follow its page's
// publish state.
const MANAGED_PREFIXES = [
  ...new Set([...SERVICE_TEMPLATES.map((t) => t.urlPrefix), CASE_STUDY_PREFIX]),
];

/** An href points at a specific CMS-managed page (prefix + a slug). */
function isManagedHref(href: string): boolean {
  return MANAGED_PREFIXES.some((p) => href.startsWith(`${p}/`));
}

/**
 * Public hrefs of every *published* CMS page a menu link can point at — service
 * pages plus case studies. Links to any other managed href (a draft or deleted
 * page) are dropped from the public menu, since they'd 404 on click.
 */
export async function getPublishedMenuTargetHrefs(): Promise<Set<string>> {
  const [serviceHrefs, caseStudies] = await Promise.all([
    getPublishedServiceHrefs(),
    listPublishedCaseStudies(),
  ]);
  const hrefs = new Set(serviceHrefs);
  for (const cs of caseStudies) hrefs.add(`${CASE_STUDY_PREFIX}/${cs.slug}`);
  return hrefs;
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
/** Snapshot cache key for a category's menu links. */
const menuLinksCacheKey = (slug: string) => `menulinks:${slug}`;

/** Normalise a saved `items` array from site_content into MegaMenuItems. */
function parseSavedItems(saved: unknown): MegaMenuItem[] {
  if (!Array.isArray(saved)) return [];
  return saved
    .map((i) => {
      const it = (i ?? {}) as Record<string, unknown>;
      const label = String(it.label ?? "").trim();
      const href = String(it.href ?? "").trim();
      return href ? { label, href } : { label };
    })
    .filter((i) => i.label);
}

/** Saved links for a slug, or the curated static default when nothing is saved. */
function menuLinksFromRow(slug: string, rowData: unknown): MegaMenuItem[] {
  const saved = (rowData as { items?: unknown } | undefined)?.items;
  if (Array.isArray(saved)) return parseSavedItems(saved);
  return WHAT_WE_DO_ITEMS_BY_SLUG[slug] ?? [];
}

/** Drop sub-links pointing at an unpublished/deleted CMS page. */
function filterPublicLinks(items: MegaMenuItem[], publishedHrefs: Set<string>): MegaMenuItem[] {
  return items.filter((i) => !i.href || !isManagedHref(i.href) || publishedHrefs.has(i.href));
}

/**
 * The mega-menu sub-links shown under a category's header. Admin-saved links win;
 * otherwise fall back to the curated static defaults for the originally-seeded
 * slugs (so the 6 seeded categories keep their links until edited). New
 * admin-created categories with nothing saved return `[]`.
 */
export async function getCategoryMenuLinks(slug: string): Promise<MegaMenuItem[]> {
  const staticDefault = WHAT_WE_DO_ITEMS_BY_SLUG[slug] ?? [];
  return snapshotRead(
    menuLinksCacheKey(slug),
    async () => {
      await dbConnect();
      const row = await SiteContentModel.findOne({ key: menuLinksKey(slug) }).lean();
      return menuLinksFromRow(slug, row?.data);
    },
    staticDefault
  );
}

/**
 * Batched form of {@link getCategoryMenuLinks}: fetch the menu links for many
 * categories in a single `find({ key: { $in } })` instead of one query per
 * category. Returns a Map keyed by slug. Used by the nav API routes so opening a
 * mega-menu costs one round trip, not one per column.
 */
export async function getCategoryMenuLinksBatch(
  slugs: string[]
): Promise<Map<string, MegaMenuItem[]>> {
  const entries = slugs.map((slug) => ({
    cacheKey: menuLinksCacheKey(slug),
    fallback: WHAT_WE_DO_ITEMS_BY_SLUG[slug] ?? [],
  }));

  const cached = await snapshotReadMany<MegaMenuItem[]>(entries, async () => {
    await dbConnect();
    const rows = await SiteContentModel.find({
      key: { $in: slugs.map(menuLinksKey) },
    }).lean();
    const byKey = new Map(rows.map((r) => [r.key, r.data]));
    const out = new Map<string, MegaMenuItem[]>();
    for (const slug of slugs) {
      out.set(menuLinksCacheKey(slug), menuLinksFromRow(slug, byKey.get(menuLinksKey(slug))));
    }
    return out;
  });

  return new Map(slugs.map((slug) => [slug, cached.get(menuLinksCacheKey(slug)) ?? []]));
}

/**
 * Public mega-menu sub-links for a category: the saved links minus any that
 * point at a CMS page (service page or case study) that is unpublished or no
 * longer exists. Non-managed links (category pages, standalone pages, external
 * URLs, label-only headers) always pass through.
 */
export async function getPublicCategoryMenuLinks(slug: string): Promise<MegaMenuItem[]> {
  return (await getPublicCategoryMenuLinksBatch([slug])).get(slug) ?? [];
}

/**
 * Batched public menu links for several categories at once — one DB round trip
 * for all of them. Returns a Map keyed by slug. Resolves the published targets
 * itself so no caller can filter against an incomplete set.
 */
export async function getPublicCategoryMenuLinksBatch(
  slugs: string[]
): Promise<Map<string, MegaMenuItem[]>> {
  const [raw, publishedHrefs] = await Promise.all([
    getCategoryMenuLinksBatch(slugs),
    getPublishedMenuTargetHrefs(),
  ]);
  return new Map(slugs.map((slug) => [slug, filterPublicLinks(raw.get(slug) ?? [], publishedHrefs)]));
}

/**
 * The hrefs currently listed in each category's menu (saved list, or the static
 * default when nothing is saved) — what the admin "In menu" badges read. Unlike
 * the public links, drafts are included. Returns a Map keyed by slug.
 */
export async function getMenuHrefsByCategory(
  slugs: string[]
): Promise<Map<string, Set<string>>> {
  const raw = await getCategoryMenuLinksBatch(slugs);
  return new Map(
    slugs.map((slug) => [
      slug,
      new Set((raw.get(slug) ?? []).flatMap((i) => (i.href ? [i.href] : []))),
    ])
  );
}

/** A page's place in its column's menu, for the admin lists. */
export type MenuState = { inMenu: boolean; menuNote: string | null };

/**
 * Whether `href` is listed in a column's menu `links` and, when it isn't, a note
 * if the column already has a same-named link pointing elsewhere (e.g. "Technical
 * SEO" → a standalone landing page), so an admin doesn't add a duplicate.
 */
export function menuStateFor(links: MegaMenuItem[], href: string, title: string): MenuState {
  if (links.some((i) => i.href === href)) return { inMenu: true, menuNote: null };
  const name = title.trim().toLowerCase();
  const twin = links.find((i) => i.label.trim().toLowerCase() === name);
  return {
    inMenu: false,
    menuNote: twin
      ? `The menu already has “${twin.label}”${twin.href ? ` → ${twin.href}` : ""}.`
      : null,
  };
}

/**
 * Annotate service pages with their menu state (one batched read for all their
 * columns). Pages without a category are never in a menu.
 */
export async function withMenuState<
  T extends { slug: string; title: string; categorySlug: string | null; urlPrefix: string },
>(pages: T[]): Promise<(T & MenuState)[]> {
  const slugs = [...new Set(pages.flatMap((p) => (p.categorySlug ? [p.categorySlug] : [])))];
  const links = await getCategoryMenuLinksBatch(slugs);
  return pages.map((p) => ({
    ...p,
    ...(p.categorySlug
      ? menuStateFor(links.get(p.categorySlug) ?? [], `${p.urlPrefix}/${p.slug}`, p.title)
      : { inMenu: false, menuNote: null }),
  }));
}

/**
 * Persist a category's mega-menu sub-links and evict the cached copy, so the nav
 * shows the change on the next request instead of after the cache TTL. Every
 * write to a `menuLinks` row goes through here.
 */
export async function writeCategoryMenuLinks(slug: string, items: MegaMenuItem[]): Promise<void> {
  await upsertContent(menuLinksKey(slug), { items });
  await invalidateSnapshot(menuLinksCacheKey(slug));
}

/**
 * Add (`include`) or remove one sub-link, matched by href, in a category's menu.
 * An added link goes to the end of the list. Reads the saved list straight from
 * the DB (never the cache) so a stale copy is never written back; a category
 * with nothing saved yet starts from its static default list, so its existing
 * links are kept. Adding a link that's already there (or removing one that
 * isn't) is a no-op.
 */
export async function setCategoryMenuLink(
  categorySlug: string,
  item: { label: string; href: string },
  include: boolean
): Promise<void> {
  await dbConnect();
  const row = await SiteContentModel.findOne({ key: menuLinksKey(categorySlug) }).lean();
  const current = menuLinksFromRow(categorySlug, row?.data);
  if (current.some((i) => i.href === item.href) === include) return;
  const next = include
    ? [...current, { label: item.label, href: item.href }]
    : current.filter((i) => i.href !== item.href);
  await writeCategoryMenuLinks(categorySlug, next);
}

/**
 * Remove a mega-menu sub-link (matched by href) from a category. Called when the
 * page it points to is permanently deleted, so the nav doesn't keep a dead link.
 */
export async function removeCategoryMenuLink(categorySlug: string, href: string): Promise<void> {
  await setCategoryMenuLink(categorySlug, { label: "", href }, false);
}

/** Toggle publish state. */
export async function setPublished(slug: string, published: boolean): Promise<void> {
  await dbConnect();
  await ServiceCategoryModel.updateOne(
    { slug },
    { $set: { published, updated_at: new Date() } }
  );
  await invalidateSnapshotMany(catKeys(slug));
}

