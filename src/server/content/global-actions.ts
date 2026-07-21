"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { GLOBAL_TESTIMONIALS_SECTION } from "./global-sections";
import { upsertContent } from "./queries";
import type { SaveState } from "./types";

/**
 * Save the site-wide testimonials list. Because this content renders on every
 * page, we revalidate the whole layout tree (not just "/") so the change shows
 * up everywhere — same pattern used by servicepage/whatwedo actions.
 */
export async function saveGlobalTestimonials(
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  const section = GLOBAL_TESTIMONIALS_SECTION;

  // Whitelist scalar fields (none today, but kept generic).
  const clean: Record<string, unknown> = {};
  for (const field of section.fields) {
    clean[field.name] = String(data[field.name] ?? "").trim();
  }

  // Whitelist list items to the section's item fields.
  if (section.list) {
    const raw = Array.isArray(data[section.list.name]) ? (data[section.list.name] as unknown[]) : [];
    clean[section.list.name] = raw.map((item) => {
      const row = (item ?? {}) as Record<string, unknown>;
      const out: Record<string, string> = {};
      for (const f of section.list!.itemFields) out[f.name] = String(row[f.name] ?? "").trim();
      return out;
    });
  }

  try {
    await upsertContent("global.testimonials", clean);
    revalidatePath("/", "layout"); // testimonials appear site-wide
    return { ok: true, message: "Saved. Testimonials updated across the site." };
  } catch (err) {
    console.error("saveGlobalTestimonials failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
