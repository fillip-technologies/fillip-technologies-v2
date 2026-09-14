"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { slugify } from "@/lib/slug";
import { getTemplateSchema } from "./servicepage-schema";
import { templateUrlPrefix, isTemplateId } from "./servicepage-templates";
import {
  getServicePage,
  insertServicePage,
  setServicePagePublished,
  deleteServicePage as deleteServicePageRow,
} from "./servicepage-registry";
import {
  getCategory,
  getCategoryMenuLinks,
  menuLinksKey,
  removeCategoryMenuLink,
} from "./whatwedo-registry";
import { upsertContent } from "./queries";
import { whitelistSectionData } from "./section-utils";
import { UNAUTHORIZED } from "./types";
import type { SaveState } from "./types";

// Slugs that are their own static routes (would shadow the dynamic [slug]),
// plus reserved words. Keeps admins from creating dead pages.
const RESERVED_SLUGS = new Set(["preview"]);

/**
 * Save one service-page section (stored FLAT under `servicepage.<slug>.<id>`).
 * Auth-checked; whitelists to the section's registered fields + list.
 */
export async function saveServicePageSection(
  slug: string,
  sectionId: string,
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;

  const page = await getServicePage(slug);
  if (!page) {
    return { ok: false, message: "Unknown page." };
  }
  const spec = getTemplateSchema(page.template).getSpec(sectionId);
  if (!spec || !spec.section.ready) {
    return { ok: false, message: "Unknown or unavailable section." };
  }
  const section = spec.section;

  const clean = whitelistSectionData(section, data);

  try {
    await upsertContent(`servicepage.${slug}.${section.id}`, clean);
    revalidatePath(`${page.urlPrefix}/${slug}`);
    return { ok: true, message: "Saved. Changes are live on the page." };
  } catch (err) {
    console.error("saveServicePageSection failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}

/**
 * Create a new (unpublished) service page. `title` is required; `slug` is
 * optional (derived from the title). Picks a template + a What-We-Do category;
 * the page's link is appended to that category's mega-menu sub-links so it shows
 * in the nav once published. Returns the created slug for navigation.
 */
export async function createServicePage(
  title: string,
  categorySlug: string,
  template = "service",
  slug?: string
): Promise<SaveState & { slug?: string }> {
  if (!(await getSession())) return UNAUTHORIZED;

  const cleanTitle = String(title ?? "").trim();
  if (!cleanTitle) {
    return { ok: false, message: "Enter a name for the page." };
  }
  if (!isTemplateId(template)) {
    return { ok: false, message: "Unknown template." };
  }

  const cleanSlug = slugify(slug && slug.trim() ? slug : cleanTitle);
  if (!cleanSlug) {
    return { ok: false, message: "Enter a valid slug (letters, numbers, dashes)." };
  }
  if (RESERVED_SLUGS.has(cleanSlug)) {
    return { ok: false, message: `"${cleanSlug}" is reserved. Choose another slug.` };
  }
  if (await getServicePage(cleanSlug)) {
    return { ok: false, message: `A page with slug "${cleanSlug}" already exists.` };
  }

  const category = await getCategory(categorySlug);
  if (!category) {
    return { ok: false, message: "Pick a What We Do category for this page." };
  }

  try {
    await insertServicePage(cleanSlug, cleanTitle, template, categorySlug);

    // Append the new page to its category's mega-menu sub-links (dedupe by href).
    const href = `${templateUrlPrefix(template)}/${cleanSlug}`;
    const existing = await getCategoryMenuLinks(categorySlug);
    if (!existing.some((i) => i.href === href)) {
      await upsertContent(menuLinksKey(categorySlug), {
        items: [...existing, { label: cleanTitle, href }],
      });
    }

    revalidatePath("/admin/cms/services");
    revalidatePath("/", "layout");
    return { ok: true, message: "Page created. Edit its sections, then publish.", slug: cleanSlug };
  } catch (err) {
    console.error("createServicePage failed:", err);
    return { ok: false, message: "Something went wrong while creating the page." };
  }
}

/** Publish or unpublish a service page. */
export async function setServicePagePublishedAction(
  slug: string,
  published: boolean
): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;
  const page = await getServicePage(slug);
  if (!page) {
    return { ok: false, message: "Unknown page." };
  }

  try {
    await setServicePagePublished(slug, published);
    revalidatePath("/admin/cms/services");
    revalidatePath(`${page.urlPrefix}/${slug}`);
    revalidatePath("/", "layout");
    return {
      ok: true,
      message: published ? "Published. The page is now live." : "Unpublished. The page is hidden from the public.",
    };
  } catch (err) {
    console.error("setServicePagePublishedAction failed:", err);
    return { ok: false, message: "Something went wrong." };
  }
}

/** Permanently delete a service page and its content. */
export async function deleteServicePage(slug: string): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;
  const page = await getServicePage(slug);
  if (!page) {
    return { ok: false, message: "Unknown page." };
  }

  try {
    await deleteServicePageRow(slug);
    // Purge the page's mega-menu sub-link so the nav doesn't keep a dead entry.
    if (page.categorySlug) {
      await removeCategoryMenuLink(page.categorySlug, `${page.urlPrefix}/${slug}`);
    }
    revalidatePath("/admin/cms/services");
    revalidatePath(`${page.urlPrefix}/${slug}`);
    revalidatePath("/", "layout");
    return { ok: true, message: "Page deleted." };
  } catch (err) {
    console.error("deleteServicePage failed:", err);
    return { ok: false, message: "Something went wrong while deleting." };
  }
}
