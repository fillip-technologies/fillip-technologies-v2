import "server-only";

import { enterpriseMobileAppContent } from "@/data/mobile-app-development";
import { websiteDevelopmentContent } from "@/data/website-development";
import { assembleLandingPage, getServiceFamily } from "@/lib/service-content/repository";
import type { ServiceDefinitionInput, ServicePageInput } from "@/lib/service-content/schema";
import type { ServiceLandingPage, ServiceTemplateKey } from "@/lib/service-content/types";
import { getServicePage } from "@/server/content/servicepage-registry";
import type { LocationPage } from "./registry";

/**
 * Renders an admin-managed location page ("<service> in <city>") in its parent
 * service's landing template, the same layout the service's own landing pages
 * use (see ServiceTemplateResolver).
 *
 * The template is derived from `service_key` at render time, so every page,
 * existing or future, follows its parent without any stored template choice:
 *   1. a JSON service family (`src/data/services/<key>/service.json`), which
 *      covers every page seeded from the old city JSON files;
 *   2. a CMS service page (`service_pages` slug), which covers pages created in
 *      Admin → Content → Locations, mapped by that page's CMS template;
 *   3. otherwise null, and the caller keeps the plain location layout.
 *
 * The admin-edited hero/challenges/FAQ are laid over the template content;
 * everything else comes from the page's `templateContent` (per-city sections
 * restored from the old JSON) or the template's own defaults.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

const CMS_TEMPLATE_TO_LANDING: Record<string, ServiceTemplateKey> = {
  service: "website-design",
  "software-enterprise": "website-design",
  "mobile-app": "mobile-app-development",
  marketing: "technical-seo",
  "performance-marketing": "performance-marketing",
};

type ResolvedTemplate = { definition: ServiceDefinitionInput; defaults: unknown };

export async function resolveLocationTemplate(page: LocationPage): Promise<ResolvedTemplate | null> {
  const family = await getServiceFamily(page.serviceKey);
  if (family) return family;

  const parent = await getServicePage(page.serviceKey);
  const templateKey = parent ? CMS_TEMPLATE_TO_LANDING[parent.template] : undefined;
  if (!parent || !templateKey) return null;

  return {
    definition: {
      serviceKey: page.serviceKey,
      name: parent.title,
      templateKey,
      enabled: true,
    },
    defaults: undefined,
  };
}

const SEED_SUPPORT = "We've helped local businesses solve exactly this.";

/**
 * True while the challenges are still the placeholder copy generated when the
 * page was created (scripts/seed-location-pages.mjs or createLocationPage), i.e.
 * the admin hasn't written any. The template's own section copy shows instead.
 */
export function isPlaceholderChallenges(page: LocationPage): boolean {
  const c = page.content.challenges;
  const city = page.city.name;
  const key = page.serviceKey;
  if (
    c.title !== `What businesses in ${city}` ||
    c.highlightedTitle !== "struggle with" ||
    c.support !== SEED_SUPPORT
  ) {
    return false;
  }

  const fromSeed =
    c.badge === `${key} Challenges` &&
    c.lead === `Companies in ${city} face common challenges with ${key} services.` &&
    c.description === `Fillip Technologies provides expert ${key} solutions tailored for businesses in ${city}.`;
  const fromCreate =
    c.badge === "Local challenges" &&
    c.description ===
      `From outdated systems to a lack of local expertise, growing businesses in ${city} need a partner who understands both the technology and the market.`;
  return fromSeed || fromCreate;
}

/** Drop empty strings so an override never blanks out a template default. */
function filled(fields: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(fields).filter(([, v]) => v.trim() !== ""));
}

function asRecord(value: unknown): Record<string, any> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, any>) : {};
}

/** Template-shaped content: stored per-city sections + the admin-edited copy. */
function buildContent(templateKey: ServiceTemplateKey, page: LocationPage): Record<string, any> {
  const base = asRecord(page.templateContent);
  const content: Record<string, any> = { ...base };
  const { hero, challenges: ch } = page.content;

  content.hero = {
    ...asRecord(base.hero),
    ...filled({ title: hero.title, highlightedTitle: hero.highlightedTitle, description: hero.description }),
  };

  if (isPlaceholderChallenges(page)) return content;

  switch (templateKey) {
    case "website-design":
      content.challenges = {
        ...(base.challenges ? asRecord(base.challenges) : websiteDevelopmentContent.challenges),
        ...filled({
          eyebrow: ch.badge,
          title: ch.title,
          highlightedTitle: ch.highlightedTitle,
          description: ch.description,
          secondaryDescription: ch.support,
        }),
      };
      break;
    case "mobile-app-development":
      content.challenges = {
        ...asRecord(base.challenges),
        ...filled({
          badge: ch.badge,
          title: ch.title,
          highlightedTitle: ch.highlightedTitle,
          lead: ch.lead,
          support: ch.support,
          description: ch.description,
        }),
      };
      break;
    case "technical-seo":
      content.challenges = {
        ...asRecord(base.challenges),
        ...filled({
          badge: ch.badge,
          title: ch.title,
          highlightedTitle: ch.highlightedTitle,
          para1: ch.lead,
          para2: ch.support,
        }),
      };
      break;
    case "performance-marketing":
      content.philosophy = {
        ...asRecord(base.philosophy),
        ...filled({
          badge: ch.badge,
          title: ch.title,
          highlightedTitle: ch.highlightedTitle,
          lead: ch.lead,
          support: ch.support,
          description: ch.description,
        }),
      };
      break;
    case "ai-automation":
      content.problem = {
        ...asRecord(base.problem),
        ...filled({
          badge: ch.badge,
          title: `${ch.title} ${ch.highlightedTitle}`.trim(),
          description: ch.description,
        }),
      };
      break;
  }

  return content;
}

/**
 * The location page as a render-ready service landing page, or null when its
 * service has no landing template (or building it fails). Callers fall back
 * to the plain location layout on null, so this never takes a page down.
 */
export async function buildLocationLandingPage(page: LocationPage): Promise<ServiceLandingPage | null> {
  try {
    const resolved = await resolveLocationTemplate(page);
    if (!resolved) return null;

    const { definition, defaults } = resolved;
    const input = {
      slug: page.slug,
      serviceKey: page.serviceKey,
      enabled: true,
      city: page.city,
      seo: page.seo,
      faq: page.faq,
      content: buildContent(definition.templateKey, page),
    } as unknown as ServicePageInput;

    const landing = assembleLandingPage(definition, input, defaults);

    if (landing.templateKey === "website-design") {
      // The default website content carries its own FAQ; the template already
      // renders the page's FAQ after it, so drop the default to avoid two.
      landing.content = { ...landing.content, faq: undefined };
    }
    if (landing.templateKey === "mobile-app-development" && page.faq.items.length === 0) {
      // No FAQs written yet: keep the template's FAQ rather than an empty one.
      landing.content = { ...landing.content, faq: enterpriseMobileAppContent.faq };
    }

    return landing;
  } catch (err) {
    console.error(`buildLocationLandingPage failed for "${page.slug}":`, err);
    return null;
  }
}
