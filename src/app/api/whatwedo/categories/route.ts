import { NextResponse } from "next/server";
import {
  listPublishedCategories,
  getPublicCategoryMenuLinksBatch,
} from "@/server/content/whatwedo-registry";
import { getPublishedServiceHrefs } from "@/server/content/servicepage-registry";

// GET /api/whatwedo/categories — public. Returns the published What-We-Do
// category pages (with their mega-menu sub-links) for the nav. Cached briefly so
// the nav doesn't re-query the DB on every page load; publish/content changes
// show within the revalidate window (or immediately after an admin save).
export const revalidate = 300;

export async function GET() {
  try {
    const [categories, publishedHrefs] = await Promise.all([
      listPublishedCategories("whatwedo"),
      getPublishedServiceHrefs(),
    ]);
    // One batched query for all columns' sub-links instead of one per category.
    const linksBySlug = await getPublicCategoryMenuLinksBatch(
      categories.map((c) => c.slug),
      publishedHrefs
    );
    const items = categories.map((c) => ({
      slug: c.slug,
      label: c.label,
      href: `/what-we-do/${c.slug}`,
      items: linksBySlug.get(c.slug) ?? [],
    }));
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/whatwedo/categories failed:", err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
