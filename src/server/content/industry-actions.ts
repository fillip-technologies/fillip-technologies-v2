"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { getIndustry, getIndustrySectionSpec } from "./industry-sections";
import { upsertContent } from "./queries";
import type { SaveState } from "./types";

/**
 * Save one industry-page section (stored FLAT under `industry.<slug>.<id>`).
 * Auth-checked; whitelists to the section's registered fields + list.
 */
export async function saveIndustrySection(
  slug: string,
  sectionId: string,
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  const industry = getIndustry(slug);
  const spec = getIndustrySectionSpec(sectionId);
  if (!industry || !spec || !spec.section.ready) {
    return { ok: false, message: "Unknown or unavailable section." };
  }
  const section = spec.section;

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
    await upsertContent(`industry.${slug}.${section.id}`, clean);
    revalidatePath(`/industries/${slug}`);
    return { ok: true, message: "Saved. Changes are live on the page." };
  } catch (err) {
    console.error("saveIndustrySection failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}
