"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { listServicePages } from "@/server/content/servicepage-registry";
import { getServiceLandingPageSlugs } from "@/lib/service-content/repository";
import {
  getLocationPage,
  findLocationPageByServiceAndCity,
  insertLocationPage,
  updateLocationPageContent,
  setLocationPageEnabled as setEnabledRow,
  deleteLocationPage as deleteLocationPageRow,
  type LocationPage,
} from "./registry";
import type { SaveState } from "@/server/content/types";


const PUBLIC_PREFIX = "";


const SITE_ORIGIN = "https://filliptechnologies.com";


const RESERVED_SLUGS = new Set([
  "case-studies",
  "compliance",
  "contact",
  "cookies",
  "design",
  "ecommerce-development",
  "get-a-quote",
  "graphic-designing",
  "hardware-solutions",
  "industries",
  "marketing",
  "messenger",
  "mobile-app-development",
  "others",
  "our-culture",
  "our-story",
  "performance-marketing",
  "portfolio",
  "privacy-policy",
  "security-surveillance",
  "services",
  "social-media-marketing",
  "software-development",
  "solutions",
  "terms",
  "website-development",
  "what-we-do",
  "wordpress-development",
  "admin",
  "api",
]);

// Turn a Mongoose ValidationError into a message naming the actual field(s)
// that failed, instead of a generic "something went wrong" that hides it.
function describeError(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "name" in err && err.name === "ValidationError") {
    const errors = (err as { errors?: Record<string, { message?: string }> }).errors ?? {};
    const fields = Object.keys(errors);
    if (fields.length) {
      return `Save failed — missing/invalid: ${fields.join(", ")}.`;
    }
  }
  return fallback;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fill every required field with sensible, editable placeholder copy derived
 * from the service + city, so the document is valid the instant it's created.
 * The admin is expected to refine this afterwards in the editor.
 */
function buildDefaultContent(
  serviceLabel: string,
  cityName: string,
  stateName: string,
  slug: string
) {
  const place = stateName ? `${cityName}, ${stateName}` : cityName;
  return {
    seo: {
      title: `${serviceLabel} in ${cityName} | Fillip Technologies`,
      description: `Looking for ${serviceLabel} in ${cityName}? Fillip Technologies delivers reliable, results-driven ${serviceLabel.toLowerCase()} for businesses across ${place}.`,
      canonical: `${SITE_ORIGIN}/${slug}`,
      openGraph: {
        title: `${serviceLabel} in ${cityName}`,
        description: `${serviceLabel} services for businesses in ${place}, by Fillip Technologies.`,
        // Required by the schema — placeholder until the admin uploads a real
        // one in the editor's Open Graph section.
        image: `${SITE_ORIGIN}/og-default.jpg`,
      },
      robots: { index: true, follow: true },
    },
    content: {
      hero: {
        title: `${serviceLabel} in`,
        highlightedTitle: cityName,
        description: `Partner with Fillip Technologies for ${serviceLabel.toLowerCase()} built for businesses in ${place}.`,
      },
      challenges: {
        badge: "Local challenges",
        title: `What businesses in ${cityName}`,
        highlightedTitle: "struggle with",
        lead: `Companies across ${place} often face the same roadblocks when it comes to ${serviceLabel.toLowerCase()}.`,
        support: "We've helped local businesses solve exactly this.",
        description: `From outdated systems to a lack of local expertise, growing businesses in ${cityName} need a partner who understands both the technology and the market.`,
      },
    },
    faq: {
      badge: "FAQs",
      title: `${serviceLabel} in ${cityName}`,
      description: `Common questions about our ${serviceLabel.toLowerCase()} work in ${place}.`,
      items: [] as { question: string; answer: string }[],
    },
  };
}

/**
 * Create a new (enabled) location page for a service + city pair. Content is
 * auto-filled with editable placeholder copy; edit it afterwards.
 */
export async function createLocationPage(
  serviceKey: string,
  cityName: string,
  stateName: string,
  countryName: string,
  slugOverride?: string
): Promise<SaveState & { slug?: string }> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  const cleanCity = String(cityName ?? "").trim();
  const cleanState = String(stateName ?? "").trim();
  const cleanCountry = String(countryName ?? "").trim() || "India";
  const cleanServiceKey = String(serviceKey ?? "").trim();

  if (!cleanServiceKey) {
    return { ok: false, message: "Choose a service." };
  }
  if (!cleanCity) {
    return { ok: false, message: "Enter a city name." };
  }
  if (!cleanState) {
    return { ok: false, message: "Enter a state." };
  }

  const services = await listServicePages();
  const service = services.find((s) => s.slug === cleanServiceKey);
  if (!service) {
    return { ok: false, message: "Unknown service. Refresh and try again." };
  }

  const cleanSlug = slugify(
    slugOverride && slugOverride.trim()
      ? slugOverride
      : `${cleanServiceKey}-company-in-${cleanCity}`
  );
  if (!cleanSlug) {
    return { ok: false, message: "Enter a valid slug (letters, numbers, dashes)." };
  }
  if (RESERVED_SLUGS.has(cleanSlug)) {
    return {
      ok: false,
      message: `"${cleanSlug}" is already a site route and can't be used as a location slug.`,
    };
  }
  const serviceLandingSlugs = await getServiceLandingPageSlugs();
  if (serviceLandingSlugs.includes(cleanSlug)) {
    return {
      ok: false,
      message: `"${cleanSlug}" is already used by a service landing page.`,
    };
  }

  if (await getLocationPage(cleanSlug)) {
    return { ok: false, message: `A page with slug "${cleanSlug}" already exists.` };
  }
  if (await findLocationPageByServiceAndCity(cleanServiceKey, cleanCity)) {
    return {
      ok: false,
      message: `A page for "${service.title}" in "${cleanCity}" already exists.`,
    };
  }

  try {
    const defaults = buildDefaultContent(service.title, cleanCity, cleanState, cleanSlug);
    await insertLocationPage({
      slug: cleanSlug,
      serviceKey: cleanServiceKey,
      city: { name: cleanCity, state: cleanState, country: cleanCountry },
      ...defaults,
    });
    revalidatePath("/admin/cms/locations");
    return {
      ok: true,
      message: "Location page created. Edit its content, then it's live immediately.",
      slug: cleanSlug,
    };
  } catch (err) {
    console.error("createLocationPage failed:", err);
    return { ok: false, message: describeError(err, "Something went wrong while creating the page.") };
  }
}

/** Save the full editable content (SEO, hero, challenges, FAQ) for a page. */
export async function saveLocationPage(
  slug: string,
  payload: Pick<LocationPage, "seo" | "content" | "faq">
): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  const page = await getLocationPage(slug);
  if (!page) {
    return { ok: false, message: "Unknown location page." };
  }

  const clean = {
    seo: {
      title: String(payload.seo.title ?? "").trim(),
      description: String(payload.seo.description ?? "").trim(),
      canonical: String(payload.seo.canonical ?? "").trim(),
      openGraph: {
        title: String(payload.seo.openGraph.title ?? "").trim(),
        description: String(payload.seo.openGraph.description ?? "").trim(),
        image: String(payload.seo.openGraph.image ?? "").trim(),
      },
      robots: {
        index: Boolean(payload.seo.robots.index),
        follow: Boolean(payload.seo.robots.follow),
      },
    },
    content: {
      hero: {
        title: String(payload.content.hero.title ?? "").trim(),
        highlightedTitle: String(payload.content.hero.highlightedTitle ?? "").trim(),
        description: String(payload.content.hero.description ?? "").trim(),
      },
      challenges: {
        badge: String(payload.content.challenges.badge ?? "").trim(),
        title: String(payload.content.challenges.title ?? "").trim(),
        highlightedTitle: String(payload.content.challenges.highlightedTitle ?? "").trim(),
        lead: String(payload.content.challenges.lead ?? "").trim(),
        support: String(payload.content.challenges.support ?? "").trim(),
        description: String(payload.content.challenges.description ?? "").trim(),
      },
    },
    faq: {
      badge: String(payload.faq.badge ?? "").trim(),
      title: String(payload.faq.title ?? "").trim(),
      description: String(payload.faq.description ?? "").trim(),
      items: (payload.faq.items ?? []).map((i) => ({
        question: String(i.question ?? "").trim(),
        answer: String(i.answer ?? "").trim(),
      })),
    },
  };

  // Required-field guard mirrors the Mongoose schema so we fail with a clear
  // message instead of a raw DB validation error.
  const requiredCheck: [string, string][] = [
    [clean.seo.title, "SEO title"],
    [clean.seo.description, "SEO description"],
    [clean.seo.canonical, "SEO canonical URL"],
    [clean.seo.openGraph.title, "Open Graph title"],
    [clean.seo.openGraph.description, "Open Graph description"],
    [clean.seo.openGraph.image, "Open Graph image"],
    [clean.content.hero.title, "Hero title"],
    [clean.content.hero.highlightedTitle, "Hero highlighted title"],
    [clean.content.hero.description, "Hero description"],
    [clean.content.challenges.badge, "Challenges badge"],
    [clean.content.challenges.title, "Challenges title"],
    [clean.content.challenges.highlightedTitle, "Challenges highlighted title"],
    [clean.content.challenges.lead, "Challenges lead"],
    [clean.content.challenges.support, "Challenges support"],
    [clean.content.challenges.description, "Challenges description"],
    [clean.faq.badge, "FAQ badge"],
    [clean.faq.title, "FAQ title"],
    [clean.faq.description, "FAQ description"],
  ];
  const missing = requiredCheck.find(([v]) => !v);
  if (missing) {
    return { ok: false, message: `${missing[1]} is required.` };
  }
  for (const item of clean.faq.items) {
    if (!item.question || !item.answer) {
      return { ok: false, message: "Every FAQ needs both a question and an answer." };
    }
  }

  try {
    await updateLocationPageContent(slug, clean);
    revalidatePath(`/admin/cms/locations/${slug}`);
    revalidatePath(`${PUBLIC_PREFIX}/${slug}`);
    return { ok: true, message: "Saved. Changes are live on the page." };
  } catch (err) {
    console.error("saveLocationPage failed:", err);
    return { ok: false, message: describeError(err, "Something went wrong while saving.") };
  }
}

/** Enable or disable a location page (disabled pages 404 / are hidden publicly). */
export async function setLocationPagePublished(slug: string, enabled: boolean): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  if (!(await getLocationPage(slug))) {
    return { ok: false, message: "Unknown location page." };
  }

  try {
    await setEnabledRow(slug, enabled);
    revalidatePath("/admin/cms/locations");
    revalidatePath(`${PUBLIC_PREFIX}/${slug}`);
    return {
      ok: true,
      message: enabled ? "Enabled. The page is now live." : "Disabled. The page is hidden from the public.",
    };
  } catch (err) {
    console.error("setLocationPagePublished failed:", err);
    return { ok: false, message: "Something went wrong." };
  }
}

/** Permanently delete a location page. */
export async function deleteLocationPage(slug: string): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }
  if (!(await getLocationPage(slug))) {
    return { ok: false, message: "Unknown location page." };
  }

  try {
    await deleteLocationPageRow(slug);
    revalidatePath("/admin/cms/locations");
    revalidatePath(`${PUBLIC_PREFIX}/${slug}`);
    return { ok: true, message: "Location page deleted." };
  } catch (err) {
    console.error("deleteLocationPage failed:", err);
    return { ok: false, message: "Something went wrong while deleting." };
  }
}