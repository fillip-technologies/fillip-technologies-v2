"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { GLOBAL_POPUP_SECTION, GLOBAL_TESTIMONIALS_SECTION, POPUP_FREQUENCIES } from "./global-sections";
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

/**
 * Save the site-wide popup ad (image + link). It renders on every page, so the
 * whole layout tree is revalidated. The link is limited to site paths and
 * http(s) URLs so a `javascript:` URL can't be stored.
 */
export async function saveGlobalPopup(
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;

  const clean = whitelistSectionData(GLOBAL_POPUP_SECTION, data);
  const link = String(clean.link ?? "");
  if (link && !/^(\/|https?:\/\/)/i.test(link)) {
    return { ok: false, message: "Link must start with / or http(s)://" };
  }
  if (!POPUP_FREQUENCIES.some((f) => f.value === clean.frequency)) clean.frequency = "every";
  const delay = Number(clean.delay || 0);
  if (!Number.isFinite(delay) || delay < 0 || delay > 60) {
    return { ok: false, message: "Delay must be a number of seconds between 0 and 60." };
  }
  clean.delay = String(delay);

  try {
    await upsertContent("global.popup", clean);
    revalidatePath("/", "layout"); // the popup appears site-wide
    return {
      ok: true,
      message: clean.image ? "Saved. The popup is live across the site." : "Saved. The popup is turned off.",
    };
  } catch (err) {
    console.error("saveGlobalPopup failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
