import { NextResponse } from "next/server";
import {
  listPublishedCategories,
  getPublicCategoryMenuLinksBatch,
} from "@/server/content/whatwedo-registry";
import { getPublishedServiceHrefs } from "@/server/content/servicepage-registry";

// GET /api/solutions/categories — public. Returns the published Solutions
// categories (with their mega-menu sub-links + description) for the nav. Cached
// briefly so the nav doesn't re-query the DB on every page load; publish/content
// changes show within the revalidate window (or immediately after an admin save).
export const revalidate = 300;

export async function GET() {
  try {
    const [categories, publishedHrefs] = await Promise.all([
      listPublishedCategories("solutions"),
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
      description: c.description,
      items: linksBySlug.get(c.slug) ?? [],
    }));
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/solutions/categories failed:", err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
