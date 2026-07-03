import { NextResponse } from "next/server";
import { getNavMenu } from "@/server/nav/queries";
import { isNavMenuId } from "@/server/nav/menus";

// GET /api/nav/<menu> — public. Returns a CMS-managed nav dropdown's items,
// falling back to defaults. Always fresh so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ menu: string }> }) {
  const { menu } = await params;
  if (!isNavMenuId(menu)) {
    return NextResponse.json({ items: [] }, { status: 404 });
  }
  try {
    const items = await getNavMenu(menu);
    return NextResponse.json({ items });
  } catch (err) {
    console.error(`GET /api/nav/${menu} failed:`, err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
