import { NextResponse } from "next/server";
import { listPublishedCategories } from "@/server/content/whatwedo-registry";

// GET /api/whatwedo/categories — public. Returns the published What-We-Do
// category pages for the mega menu. Always fresh so publish changes show
// without a rebuild.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await listPublishedCategories();
    const items = categories.map((c) => ({
      slug: c.slug,
      label: c.label,
      href: `/what-we-do/${c.slug}`,
    }));
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/whatwedo/categories failed:", err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
