"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { upsertContent } from "@/server/content/queries";
import type { AboutMenuItem } from "@/components/layouts/Navbar/aboutMegaMenuData";
import type { SaveState } from "@/server/content/types";
import { NAV_MENUS, isNavMenuId, type NavMenuId } from "./menus";

/**
 * Save a nav dropdown's items. Auth-checked; whitelists each item to
 * { label, href } and drops blanks.
 */
export async function saveNavMenu(menuId: NavMenuId, items: AboutMenuItem[]): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  if (!isNavMenuId(menuId)) {
    return { ok: false, message: "Unknown menu." };
  }

  const clean = (Array.isArray(items) ? items : [])
    .map((i) => ({ label: String(i?.label ?? "").trim(), href: String(i?.href ?? "").trim() }))
    .filter((i) => i.label && i.href);

  if (!clean.length) {
    return { ok: false, message: "Add at least one item with a label and URL." };
  }

  try {
    await upsertContent(NAV_MENUS[menuId].key, { items: clean });
    revalidatePath("/", "layout"); // refresh the nav across the site
    return { ok: true, message: `Saved. The ${NAV_MENUS[menuId].label} menu is live.` };
  } catch (err) {
    console.error("saveNavMenu failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
