"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { GLOBAL_TESTIMONIALS_SECTION } from "./global-sections";
import { upsertContent } from "./queries";
import { whitelistSectionData } from "./section-utils";
import { UNAUTHORIZED } from "./types";
import type { SaveState } from "./types";

/**
 * Save the site-wide testimonials list. Because this content renders on every
 * page, we revalidate the whole layout tree (not just "/") so the change shows
 * up everywhere — same pattern used by servicepage/whatwedo actions.
 */
export async function saveGlobalTestimonials(
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;

  const section = GLOBAL_TESTIMONIALS_SECTION;

  const clean = whitelistSectionData(section, data);

  try {
    await upsertContent("global.testimonials", clean);
    revalidatePath("/", "layout"); // testimonials appear site-wide
    return { ok: true, message: "Saved. Testimonials updated across the site." };
  } catch (err) {
    console.error("saveGlobalTestimonials failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
