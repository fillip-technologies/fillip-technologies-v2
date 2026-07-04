"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { getWhatWeDoSectionSpec } from "./whatwedo-sections";
import {
  getCategory,
  insertCategory,
  setPublished,
  deleteCategory as deleteCategoryRow,
} from "./whatwedo-registry";
import { upsertContent } from "./queries";
import type { SaveState } from "./types";

// Slugs reserved by non-category routes under /what-we-do or otherwise unusable.
const RESERVED_SLUGS = new Set(["preview"]);

/** Normalise a free-text label into a URL-safe kebab-case slug. */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Save one category-page section (stored FLAT under `whatwedo.<slug>.<id>`).
 * Auth-checked; whitelists to the section's registered fields + list.
 */
export async function saveWhatWeDoSection(
  slug: string,
  sectionId: string,
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  const category = await getCategory(slug);
  const spec = getWhatWeDoSectionSpec(sectionId);
  if (!category || !spec || !spec.section.ready) {
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
    await upsertContent(`whatwedo.${slug}.${section.id}`, clean);
    revalidatePath(`/what-we-do/${slug}`);
    return { ok: true, message: "Saved. Changes are live on the page." };
  } catch (err) {
    console.error("saveWhatWeDoSection failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}

/**
 * Create a new (unpublished) category page. `label` is required; `slug` is
 * optional and derived from the label when blank.
 */
export async function createCategory(
  label: string,
  slug?: string
): Promise<SaveState & { slug?: string }> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  const cleanLabel = String(label ?? "").trim();
  if (!cleanLabel) {
    return { ok: false, message: "Enter a name for the category." };
  }

  const cleanSlug = slugify(slug && slug.trim() ? slug : cleanLabel);
  if (!cleanSlug) {
    return { ok: false, message: "Enter a valid slug (letters, numbers, dashes)." };
  }
  if (RESERVED_SLUGS.has(cleanSlug)) {
    return { ok: false, message: `"${cleanSlug}" is reserved. Choose another slug.` };
  }
  if (await getCategory(cleanSlug)) {
    return { ok: false, message: `A category with slug "${cleanSlug}" already exists.` };
  }

  try {
    await insertCategory(cleanSlug, cleanLabel);
    revalidatePath("/admin/cms/whatwedo");
    return { ok: true, message: "Category created. Edit its sections, then publish.", slug: cleanSlug };
  } catch (err) {
    console.error("createCategory failed:", err);
    return { ok: false, message: "Something went wrong while creating the category." };
  }
}

/** Publish or unpublish a category page. */
export async function setCategoryPublished(slug: string, published: boolean): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
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

/** Permanently delete a category page and its content. */
export async function deleteCategory(slug: string): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  if (!(await getCategory(slug))) {
    return { ok: false, message: "Unknown category." };
  }

  try {
    await deleteCategoryRow(slug);
    revalidatePath("/admin/cms/whatwedo");
    revalidatePath(`/what-we-do/${slug}`);
    return { ok: true, message: "Category deleted." };
  } catch (err) {
    console.error("deleteCategory failed:", err);
    return { ok: false, message: "Something went wrong while deleting." };
  }
}
