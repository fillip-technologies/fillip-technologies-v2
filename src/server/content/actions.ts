"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { getSection } from "./home-sections";
import { upsertContent } from "./queries";
import type { SaveState } from "./types";

/**
 * Save one Home section's content. Called directly from the editor with a
 * structured data object (scalars + an optional list of items).
 */
export async function saveHomeSection(
  sectionId: string,
  data: Record<string, unknown>
): Promise<SaveState> {
  // Auth check inside the action (never trust the client).
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  const section = getSection(sectionId);
  if (!section || !section.ready) {
    return { ok: false, message: "Unknown or unavailable section." };
  }

  // Whitelist scalar fields.
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
    await upsertContent(`home.${section.id}`, clean);
    revalidatePath("/"); // push edits live on the home page
    return { ok: true, message: "Saved. Changes are live on the home page." };
  } catch (err) {
    console.error("saveHomeSection failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
