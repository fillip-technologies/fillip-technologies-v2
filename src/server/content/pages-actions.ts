"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { getPageSection } from "./page-sections";
import { upsertContent } from "./queries";
import type { SaveState } from "./types";

/**
 * Save one About-page section's content. Keyed `page.<groupId>.<sectionId>`.
 * Auth-checked; whitelists to the section's registered fields + optional list.
 */
export async function savePageSection(
  groupId: string,
  sectionId: string,
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  const section = getPageSection(groupId, sectionId);
  if (!section || !section.ready) {
    return { ok: false, message: "Unknown or unavailable section." };
  }

  const clean: Record<string, unknown> = {};
  for (const field of section.fields) {
    clean[field.name] = String(data[field.name] ?? "").trim();
  }
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
    await upsertContent(`page.${groupId}.${section.id}`, clean);
    // Most About-page group ids match their route slug (/our-story, …); careers
    // lives at /others/carrer, so map it explicitly.
    revalidatePath(groupId === "careers" ? "/others/carrer" : `/${groupId}`);
    return { ok: true, message: "Saved. Changes are live on the page." };
  } catch (err) {
    console.error("savePageSection failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
