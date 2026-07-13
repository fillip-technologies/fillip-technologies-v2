/**
 * CMS SECTION SCHEMA for the "marketing" Service Pages template — the
 * /marketing/<slug> detail pages under the "SEO & Performance Marketing"
 * category. These render the rich SEO layout (hero + challenges + services +
 * issues + industries + tools + testimonials + faq) that used to be hardcoded
 * on the static /technical-seo page.
 *
 * Content is stored FLAT (`servicepage.<slug>.<id>`) and unflattened into the
 * `MarketingContent` shape on read.
 */

import type { SectionSpec } from "./servicepage-sections";
import { MARKETING_CONTENT } from "@/data/marketing";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

const csv = (arr: unknown): string => (Array.isArray(arr) ? arr.join(", ") : "");
const uncsv = (s: unknown): string[] =>
  String(s ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

// Valid icon keys (see src/components/Seo/TechnicalSeo/icons.ts): search,
// search-x, gauge, bot, shield, activity, code, network, link, database, globe,
// file, chart, triangle-alert, check, zap, target, trending, click, megaphone,
// users, location. Unknown values fall back to a default icon.

export const MARKETING_SECTION_SPECS: Record<string, SectionSpec> = {
  hero: {
    section: {
      id: "hero",
      label: "Hero",
      description: "Top SEO banner: badge, headline (with a highlighted part), intro, search pill, CTAs and image.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "searchText", label: "Search pill text", type: "text", default: "" },
        { name: "primaryCta", label: "Primary CTA", type: "text", default: "" },
        { name: "secondaryCta", label: "Secondary CTA", type: "text", default: "" },
        { name: "imageSrc", label: "Image", type: "image", default: "" },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
      ],
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      description: d.description ?? "",
      searchText: d.searchText ?? "",
      primaryCta: d.primaryCta ?? "",
      secondaryCta: d.secondaryCta ?? "",
      imageSrc: d.image?.src ?? "",
      imageAlt: d.image?.alt ?? "",
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      searchText: f.searchText,
      primaryCta: f.primaryCta,
      secondaryCta: f.secondaryCta,
      image: { src: f.imageSrc ?? "", alt: f.imageAlt ?? "" },
    }),
  },

  challenges: {
    section: {
      id: "challenges",
      label: "Challenges",
      description: "The “why your website isn’t ranking” heading, two paragraphs, CTA line and the challenge cards.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "para1", label: "Paragraph 1", type: "textarea", default: "" },
        { name: "para2", label: "Paragraph 2", type: "textarea", default: "" },
        { name: "ctaText", label: "CTA line", type: "text", default: "" },
      ],
      list: {
        name: "items",
        label: "Challenge cards",
        itemNoun: "card",
        itemFields: [
          { name: "icon", label: "Icon (e.g. bot, gauge, search-x)", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      para1: d.para1 ?? "",
      para2: d.para2 ?? "",
      ctaText: d.ctaText ?? "",
      items: (d.items ?? []).map((i: AnyRec) => ({
        icon: i.icon ?? "",
        title: i.title ?? "",
        description: i.description ?? "",
      })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      para1: f.para1,
      para2: f.para2,
      ctaText: f.ctaText,
      items: f.items ?? [],
    }),
  },

  services: {
    section: {
      id: "services",
      label: "Services",
      description: "The scroll-through service cards (each with a number, icon and metric) plus the section heading.",
      ready: true,
      fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "items",
        label: "Service cards",
        itemNoun: "card",
        itemFields: [
          { name: "number", label: "Number (e.g. 01)", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "metric", label: "Metric label", type: "text" },
          { name: "icon", label: "Icon (e.g. search, gauge, code)", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      eyebrow: d.eyebrow ?? "",
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      description: d.description ?? "",
      items: (d.items ?? []).map((i: AnyRec) => ({
        number: i.number ?? "",
        title: i.title ?? "",
        description: i.description ?? "",
        metric: i.metric ?? "",
        icon: i.icon ?? "",
      })),
    }),
    unflatten: (f) => ({
      eyebrow: f.eyebrow,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      items: f.items ?? [],
    }),
  },

  issues: {
    section: {
      id: "issues",
      label: "Issues We Fix",
      description: "The “hidden technical issues we fix” heading and the numbered issue cards (each with an impact line).",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "items",
        label: "Issue cards",
        itemNoun: "card",
        itemFields: [
          { name: "number", label: "Number (e.g. 01)", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "impact", label: "Impact line", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      description: d.description ?? "",
      items: (d.items ?? []).map((i: AnyRec) => ({
        number: i.number ?? "",
        title: i.title ?? "",
        description: i.description ?? "",
        impact: i.impact ?? "",
      })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      items: f.items ?? [],
    }),
  },

  industries: {
    section: {
      id: "industries",
      label: "Industries",
      description: "The “industries we serve” heading and the industry cards (each with a label, blurb and bullet points).",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
      ],
      list: {
        name: "items",
        label: "Industry cards",
        itemNoun: "industry",
        itemFields: [
          { name: "name", label: "Name", type: "text" },
          { name: "label", label: "Corner label", type: "text" },
          { name: "blurb", label: "Blurb", type: "textarea" },
          { name: "points", label: "Bullet points (comma separated)", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      items: (d.items ?? []).map((i: AnyRec) => ({
        name: i.name ?? "",
        label: i.label ?? "",
        blurb: i.blurb ?? "",
        points: csv(i.points),
      })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      items: (f.items ?? []).map((i: AnyRec) => ({
        name: i.name,
        label: i.label,
        blurb: i.blurb,
        points: uncsv(i.points),
      })),
    }),
  },

  tools: {
    section: {
      id: "tools",
      label: "Tools",
      description: "The “tools & technologies” heading and the tool chips (each with a name and icon). Shown in rotating rows of 6.",
      ready: true,
      fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "items",
        label: "Tools",
        itemNoun: "tool",
        itemFields: [
          { name: "name", label: "Name", type: "text" },
          { name: "icon", label: "Icon (e.g. search, chart, shield)", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      eyebrow: d.eyebrow ?? "",
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      description: d.description ?? "",
      items: (d.items ?? []).map((i: AnyRec) => ({
        name: i.name ?? "",
        icon: i.icon ?? "",
      })),
    }),
    unflatten: (f) => ({
      eyebrow: f.eyebrow,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      items: f.items ?? [],
    }),
  },

  testimonials: {
    section: {
      id: "testimonials",
      label: "Testimonials",
      description: "The testimonials heading and the client review cards.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "items",
        label: "Reviews",
        itemNoun: "review",
        itemFields: [
          { name: "name", label: "Name", type: "text" },
          { name: "role", label: "Role", type: "text" },
          { name: "image", label: "Avatar image", type: "image" },
          { name: "review", label: "Review", type: "textarea" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      description: d.description ?? "",
      items: (d.items ?? []).map((i: AnyRec) => ({
        name: i.name ?? "",
        role: i.role ?? "",
        image: i.image ?? "",
        review: i.review ?? "",
      })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      description: f.description,
      items: f.items ?? [],
    }),
  },

  faq: {
    section: {
      id: "faq",
      label: "FAQs",
      description: "The FAQ heading and the question/answer list.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "items",
        label: "Questions",
        itemNoun: "question",
        itemFields: [
          { name: "question", label: "Question", type: "text" },
          { name: "answer", label: "Answer", type: "textarea" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      description: d.description ?? "",
      items: (d.items ?? []).map((q: AnyRec) => ({
        question: q.question ?? "",
        answer: q.answer ?? "",
      })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      description: f.description,
      items: f.items ?? [],
    }),
  },
};

// Section order shown on the page + in the admin.
export const MARKETING_SECTION_IDS = [
  "hero",
  "challenges",
  "services",
  "issues",
  "industries",
  "tools",
  "testimonials",
  "faq",
] as const;

export function getMarketingSectionSpec(sectionId: string): SectionSpec | undefined {
  return MARKETING_SECTION_SPECS[sectionId];
}

/** Raw nested default for a section: the seeded marketing content by slug, else `{}`. */
export function marketingDefault(slug: string, sectionId: string): AnyRec {
  return (MARKETING_CONTENT[slug] as AnyRec)?.[sectionId] ?? {};
}
