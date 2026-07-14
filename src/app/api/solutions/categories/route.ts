import { NextResponse } from "next/server";
import {
  listPublishedCategories,
  getPublicCategoryMenuLinks,
} from "@/server/content/whatwedo-registry";
import { getPublishedServiceHrefs } from "@/server/content/servicepage-registry";

// GET /api/solutions/categories — public. Returns the published Solutions
// categories (with their mega-menu sub-links + description) for the nav. Always
// fresh so publish/content changes show without a rebuild.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [categories, publishedHrefs] = await Promise.all([
      listPublishedCategories("solutions"),
      getPublishedServiceHrefs(),
    ]);
    const items = await Promise.all(
      categories.map(async (c) => ({
        slug: c.slug,
        label: c.label,
        description: c.description,
        items: await getPublicCategoryMenuLinks(c.slug, publishedHrefs),
      }))
    );
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/solutions/categories failed:", err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
