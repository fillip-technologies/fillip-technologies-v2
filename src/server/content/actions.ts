"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { getSection } from "./home-sections";
import { getClientCategory, clientCategoryKey } from "./client-sections";
import { upsertContent } from "./queries";
import { whitelistSectionData } from "./section-utils";
import type { SaveState } from "./types";
import { UNAUTHORIZED } from "./types";

/**
 * Save one Home section's content. Called directly from the editor with a
 * structured data object (scalars + an optional list of items).
 */
export async function saveHomeSection(
  sectionId: string,
  data: Record<string, unknown>
): Promise<SaveState> {
  // Auth check inside the action (never trust the client).
  if (!(await getSession())) return UNAUTHORIZED;

  const section = getSection(sectionId);
  if (!section || !section.ready) {
    return { ok: false, message: "Unknown or unavailable section." };
  }

  const clean = whitelistSectionData(section, data);

  try {
    await upsertContent(`home.${section.id}`, clean);
    revalidatePath("/"); // push edits live on the home page
    return { ok: true, message: "Saved. Changes are live on the home page." };
  } catch (err) {
    console.error("saveHomeSection failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}

/**
 * Save one client-logo category (Govt / Healthcare / Education / Corporate).
 * The wall this feeds is shared across the home page and every service /
 * creative-design page, so we revalidate the whole site (all routes under the
 * root layout), not just "/".
 */
export async function saveClientCategory(
  categoryId: string,
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;

  const category = getClientCategory(categoryId);
  if (!category) {
    return { ok: false, message: "Unknown client category." };
  }

  // Whitelist each logo to { image, alt } and drop empty rows.
  const raw = Array.isArray(data.logos) ? (data.logos as unknown[]) : [];
  const logos = raw
    .map((item) => {
      const row = (item ?? {}) as Record<string, unknown>;
      return {
        image: String(row.image ?? "").trim(),
        alt: String(row.alt ?? "").trim(),
      };
    })
    .filter((l) => l.image);

  try {
    await upsertContent(clientCategoryKey(category.id), { logos });
    revalidatePath("/", "layout"); // the wall appears site-wide
    return { ok: true, message: "Saved. Changes are live across the site." };
  } catch (err) {
    console.error("saveClientCategory failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
