"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { getSection } from "./home-sections";
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
    // The client-logo carousel also appears on every service / creative-design
    // page, so its edits revalidate the whole site; other sections only "/".
    if (section.id === "clients") {
      revalidatePath("/", "layout");
      return { ok: true, message: "Saved. Changes are live across the site." };
    }
    revalidatePath("/"); // push edits live on the home page
    return { ok: true, message: "Saved. Changes are live on the home page." };
  } catch (err) {
    console.error("saveHomeSection failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
