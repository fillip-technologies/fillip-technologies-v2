import { NextResponse } from "next/server";
import {
  listPublishedCategories,
  getCategoryMenuLinks,
} from "@/server/content/whatwedo-registry";

// GET /api/solutions/categories — public. Returns the published Solutions
// categories (with their mega-menu sub-links + description) for the nav. Always
// fresh so publish/content changes show without a rebuild.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await listPublishedCategories("solutions");
    const items = await Promise.all(
      categories.map(async (c) => ({
        slug: c.slug,
        label: c.label,
        description: c.description,
        items: await getCategoryMenuLinks(c.slug),
      }))
    );
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/solutions/categories failed:", err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
