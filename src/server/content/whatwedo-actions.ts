"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { getWhatWeDoSectionSpec } from "./whatwedo-sections";
import {
  getCategory,
  setPublished,
  menuLinksKey,
} from "./whatwedo-registry";
import { upsertContent } from "./queries";
import { whitelistSectionData } from "./section-utils";
import { UNAUTHORIZED } from "./types";
import type { SaveState } from "./types";
import type { MegaMenuItem } from "@/components/layouts/Navbar/whatWeDoMegaMenuData";

/**
 * Save one category-page section (stored FLAT under `whatwedo.<slug>.<id>`).
 * Auth-checked; whitelists to the section's registered fields + list.
 */
export async function saveWhatWeDoSection(
  slug: string,
  sectionId: string,
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;

  const category = await getCategory(slug);
  const spec = getWhatWeDoSectionSpec(sectionId);
  if (!category || !spec || !spec.section.ready) {
    return { ok: false, message: "Unknown or unavailable section." };
  }
  const section = spec.section;

  const clean = whitelistSectionData(section, data);

  try {
    await upsertContent(`whatwedo.${slug}.${section.id}`, clean);
    revalidatePath(`/what-we-do/${slug}`);
    return { ok: true, message: "Saved. Changes are live on the page." };
  } catch (err) {
    console.error("saveWhatWeDoSection failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}

/**
 * Save a category's mega-menu sub-links (stored under `whatwedo.<slug>.menuLinks`
 * as `{ items: [{ label, href? }] }`). Auth-checked; whitelists each item to
 * label + optional href and drops entries without a label. An href is optional —
 * a link with none renders as a non-clickable label in the menu.
 */
export async function saveCategoryMenuLinks(
  slug: string,
  items: MegaMenuItem[]
): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;
  if (!(await getCategory(slug))) {
    return { ok: false, message: "Unknown category." };
  }

  const clean = (Array.isArray(items) ? items : [])
    .map((i) => {
      const label = String(i?.label ?? "").trim();
      const href = String(i?.href ?? "").trim();
      return href ? { label, href } : { label };
    })
    .filter((i) => i.label);

  try {
    await upsertContent(menuLinksKey(slug), { items: clean });
    revalidatePath("/", "layout"); // refresh the nav across the site
    revalidatePath(`/what-we-do/${slug}`);
    return { ok: true, message: "Saved. The menu links are live." };
  } catch (err) {
    console.error("saveCategoryMenuLinks failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}

/** Publish or unpublish a category page. */
export async function setCategoryPublished(slug: string, published: boolean): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;
  if (!(await getCategory(slug))) {
    return { ok: false, message: "Unknown category." };
  }

  try {
    await setPublished(slug, published);
    revalidatePath("/admin/cms/whatwedo");
    revalidatePath(`/what-we-do/${slug}`);
    return {
      ok: true,
      message: published ? "Published. The page is now live." : "Unpublished. The page is hidden from the public.",
    };
  } catch (err) {
    console.error("setCategoryPublished failed:", err);
    return { ok: false, message: "Something went wrong." };
  }
}
