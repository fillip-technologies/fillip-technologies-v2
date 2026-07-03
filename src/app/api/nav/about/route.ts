import { NextResponse } from "next/server";
import { getAboutMenu } from "@/server/nav/queries";

// GET /api/nav/about — public. Returns the (CMS-managed) About dropdown items,
// falling back to defaults. Always fresh so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await getAboutMenu();
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/nav/about failed:", err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
