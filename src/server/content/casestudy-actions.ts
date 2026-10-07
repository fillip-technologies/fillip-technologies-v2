"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { slugify } from "@/lib/slug";
import { getCaseStudySectionSpec } from "./casestudy-sections";
import {
  CASE_STUDY_MENU_CATEGORY,
  caseStudyMenuLink,
  getCaseStudy,
  insertCaseStudy,
  updateCaseStudySection,
  setCaseStudyPublished,
  deleteCaseStudy as deleteCaseStudyRow,
} from "./casestudy-registry";
import { removeCategoryMenuLink, setCategoryMenuLink } from "./whatwedo-registry";
import { revalidateMenus } from "./revalidate-menus";
import { whitelistSectionData } from "./section-utils";
import { UNAUTHORIZED } from "./types";
import type { SaveState } from "./types";

// Slugs reserved by other routes under /case-studies.
const RESERVED_SLUGS = new Set(["preview"]);

/**
 * Save one case-study section. Auth-checked; whitelists to the section's
 * registered fields + list, then unflattens into the nested shape stored on the
 * case-study document.
 */
export async function saveCaseStudySection(
  slug: string,
  sectionId: string,
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;

  const cs = await getCaseStudy(slug);
  const spec = getCaseStudySectionSpec(sectionId);
  if (!cs || !spec || !spec.section.ready) {
    return { ok: false, message: "Unknown or unavailable section." };
  }
  const section = spec.section;

  const clean = whitelistSectionData(section, data);

  try {
    await updateCaseStudySection(slug, section.id, spec.unflatten(clean));
    revalidatePath(`/case-studies/${slug}`);
    revalidatePath("/case-studies");
    return { ok: true, message: "Saved. Changes are live on the page." };
  } catch (err) {
    console.error("saveCaseStudySection failed:", err);
    return { ok: false, message: "Something went wrong while saving." };
  }
}

/**
 * Create a new (unpublished) case study. `title` is required; `slug` is optional
 * and derived from the title when blank. Returns the created slug.
 */
export async function createCaseStudy(
  title: string,
  industry?: string,
  slug?: string
): Promise<SaveState & { slug?: string }> {
  if (!(await getSession())) return UNAUTHORIZED;

  const cleanTitle = String(title ?? "").trim();
  if (!cleanTitle) {
    return { ok: false, message: "Enter a title for the case study." };
  }

  const cleanSlug = slugify(slug && slug.trim() ? slug : cleanTitle);
  if (!cleanSlug) {
    return { ok: false, message: "Enter a valid slug (letters, numbers, dashes)." };
  }
  if (RESERVED_SLUGS.has(cleanSlug)) {
    return { ok: false, message: `"${cleanSlug}" is reserved. Choose another slug.` };
  }
  if (await getCaseStudy(cleanSlug)) {
    return { ok: false, message: `A case study with slug "${cleanSlug}" already exists.` };
  }

  try {
    await insertCaseStudy(cleanSlug, cleanTitle, String(industry ?? "").trim());
    revalidatePath("/admin/cms/case-studies");
    return {
      ok: true,
      message: "Case study created. Edit its sections, then publish.",
      slug: cleanSlug,
    };
  } catch (err) {
    console.error("createCaseStudy failed:", err);
    return { ok: false, message: "Something went wrong while creating the case study." };
  }
}

/** Publish or unpublish a case study. */
export async function setCaseStudyPublishedAction(
  slug: string,
  published: boolean
): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;
  if (!(await getCaseStudy(slug))) {
    return { ok: false, message: "Unknown case study." };
  }

  try {
    await setCaseStudyPublished(slug, published);
    revalidatePath("/admin/cms/case-studies");
    revalidatePath(`/case-studies/${slug}`);
    revalidatePath("/case-studies");
    // A menu link to this case study shows only while it's published.
    revalidateMenus();
    return {
      ok: true,
      message: published
        ? "Published. The page is now live."
        : "Unpublished. The page is hidden from the public.",
    };
  } catch (err) {
    console.error("setCaseStudyPublishedAction failed:", err);
    return { ok: false, message: "Something went wrong." };
  }
}

/**
 * Show or hide a case study in the "Challenges We Solve" hover-menu column —
 * independent of publishing. Showing appends "<Industry> — <Title>" to the end
 * of the column; reorder/rename it in that column's Menu links editor. A link to
 * a draft stays hidden from the public until the case study is published.
 */
export async function setCaseStudyInMenu(slug: string, inMenu: boolean): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;
  const cs = await getCaseStudy(slug);
  if (!cs) {
    return { ok: false, message: "Unknown case study." };
  }

  try {
    await setCategoryMenuLink(CASE_STUDY_MENU_CATEGORY, caseStudyMenuLink(cs), inMenu);
    revalidatePath("/admin/cms/case-studies");
    revalidatePath(`/admin/cms/category/${CASE_STUDY_MENU_CATEGORY}`);
    revalidateMenus();
    return {
      ok: true,
      message: inMenu
        ? cs.published
          ? `“${cs.title}” now shows in the hover menu.`
          : `“${cs.title}” will show in the hover menu once published.`
        : `“${cs.title}” is hidden from the hover menu.`,
    };
  } catch (err) {
    console.error("setCaseStudyInMenu failed:", err);
    return { ok: false, message: "Something went wrong." };
  }
}

/** Permanently delete a case study. */
export async function deleteCaseStudy(slug: string): Promise<SaveState> {
  if (!(await getSession())) return UNAUTHORIZED;
  if (!(await getCaseStudy(slug))) {
    return { ok: false, message: "Unknown case study." };
  }

  try {
    await deleteCaseStudyRow(slug);
    // Purge its hover-menu link so the nav doesn't keep a dead entry.
    await removeCategoryMenuLink(CASE_STUDY_MENU_CATEGORY, `/case-studies/${slug}`);
    revalidatePath("/admin/cms/case-studies");
    revalidatePath("/case-studies");
    revalidateMenus();
    return { ok: true, message: "Case study deleted." };
  } catch (err) {
    console.error("deleteCaseStudy failed:", err);
    return { ok: false, message: "Something went wrong while deleting." };
  }
}
