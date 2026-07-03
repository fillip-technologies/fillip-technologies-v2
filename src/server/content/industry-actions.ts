"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { getIndustrySectionSpec } from "./industry-sections";
import {
  getIndustry,
  insertIndustry,
  setPublished,
  deleteIndustry as deleteIndustryRow,
} from "./industry-registry";
import { upsertContent } from "./queries";
import type { SaveState } from "./types";

// Slugs already used by non-industry routes under /industries, or otherwise
// reserved. Keeps admins from shadowing a real page.
const RESERVED_SLUGS = new Set(["healthcare-web-design", "preview"]);

/** Normalise a free-text label into a URL-safe kebab-case slug. */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

  const industry = await getIndustry(slug);
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

/**
 * Create a new (unpublished) industry page. `label` is required; `slug` is
 * optional and derived from the label when blank. Returns the created slug so
 * the caller can navigate to its editor.
 */
export async function createIndustry(
  label: string,
  slug?: string
): Promise<SaveState & { slug?: string }> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  const cleanLabel = String(label ?? "").trim();
  if (!cleanLabel) {
    return { ok: false, message: "Enter a name for the industry." };
  }

  const cleanSlug = slugify(slug && slug.trim() ? slug : cleanLabel);
  if (!cleanSlug) {
    return { ok: false, message: "Enter a valid slug (letters, numbers, dashes)." };
  }
  if (RESERVED_SLUGS.has(cleanSlug)) {
    return { ok: false, message: `"${cleanSlug}" is reserved. Choose another slug.` };
  }
  if (await getIndustry(cleanSlug)) {
    return { ok: false, message: `An industry with slug "${cleanSlug}" already exists.` };
  }

  try {
    await insertIndustry(cleanSlug, cleanLabel);
    revalidatePath("/admin/cms/industries");
    return { ok: true, message: "Industry created. Edit its sections, then publish.", slug: cleanSlug };
  } catch (err) {
    console.error("createIndustry failed:", err);
    return { ok: false, message: "Something went wrong while creating the industry." };
  }
}

/** Publish or unpublish an industry page. */
export async function setIndustryPublished(slug: string, published: boolean): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  if (!(await getIndustry(slug))) {
    return { ok: false, message: "Unknown industry." };
  }

  try {
    await setPublished(slug, published);
    revalidatePath("/admin/cms/industries");
    revalidatePath(`/industries/${slug}`);
    return {
      ok: true,
      message: published ? "Published. The page is now live." : "Unpublished. The page is hidden from the public.",
    };
  } catch (err) {
    console.error("setIndustryPublished failed:", err);
    return { ok: false, message: "Something went wrong." };
  }
}

/** Permanently delete an industry page and its content. */
export async function deleteIndustry(slug: string): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  if (!(await getIndustry(slug))) {
    return { ok: false, message: "Unknown industry." };
  }

  try {
    await deleteIndustryRow(slug);
    revalidatePath("/admin/cms/industries");
    revalidatePath(`/industries/${slug}`);
    return { ok: true, message: "Industry deleted." };
  } catch (err) {
    console.error("deleteIndustry failed:", err);
    return { ok: false, message: "Something went wrong while deleting." };
  }
}
