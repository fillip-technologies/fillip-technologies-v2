import { NextResponse } from "next/server";
import {
  listPublishedCategories,
  getPublicCategoryMenuLinks,
} from "@/server/content/whatwedo-registry";
import { getPublishedServiceHrefs } from "@/server/content/servicepage-registry";

// GET /api/whatwedo/categories — public. Returns the published What-We-Do
// category pages (with their mega-menu sub-links) for the nav. Always fresh so
// publish/content changes show without a rebuild.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [categories, publishedHrefs] = await Promise.all([
      listPublishedCategories("whatwedo"),
      getPublishedServiceHrefs(),
    ]);
    const items = await Promise.all(
      categories.map(async (c) => ({
        slug: c.slug,
        label: c.label,
        href: `/what-we-do/${c.slug}`,
        items: await getPublicCategoryMenuLinks(c.slug, publishedHrefs),
      }))
    );
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/whatwedo/categories failed:", err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
