"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { upsertContent } from "@/server/content/queries";
import type { AboutMenuItem } from "@/components/layouts/Navbar/aboutMegaMenuData";
import type { SaveState } from "@/server/content/types";
import { ABOUT_MENU_KEY } from "./queries";

/**
 * Save the admin-managed "About" nav dropdown items. Auth-checked; whitelists
 * each item to { label, href } and drops blanks.
 */
export async function saveAboutMenu(items: AboutMenuItem[]): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  const clean = (Array.isArray(items) ? items : [])
    .map((i) => ({
      label: String(i?.label ?? "").trim(),
      href: String(i?.href ?? "").trim(),
    }))
    .filter((i) => i.label && i.href);

  if (!clean.length) {
    return { ok: false, message: "Add at least one item with a label and URL." };
  }

  try {
    await upsertContent(ABOUT_MENU_KEY, { items: clean });
    revalidatePath("/", "layout"); // refresh the nav across the site
    return { ok: true, message: "Saved. The About menu is live." };
  } catch (err) {
    console.error("saveAboutMenu failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
