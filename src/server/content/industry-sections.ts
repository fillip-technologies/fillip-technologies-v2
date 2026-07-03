/**
 * CMS SECTION SCHEMA for the /industries/<slug> pages. Every industry shares one
 * component template, so one section schema is reused for all of them — only the
 * default *values* differ. Section data is stored FLAT (`industry.<slug>.<section>`);
 * the public page unflattens it back into the nested shape the components take.
 *
 * The list of industries themselves (which slugs exist, labels, publish state)
 * lives in the `industries` DB table — see `industry-registry.ts`. Admin-created
 * industries start blank; the original 6 fall back to `industriesData` defaults
 * via the SEED_DATA_KEYS map below.
 */

import type { Section } from "./home-sections";
import { industriesData } from "@/data/industriesData";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

// The original 6 industries ship with hardcoded default content. New industries
// created from the admin have no seed data and start blank.
const SEED_DATA_KEYS: Record<string, keyof typeof industriesData> = {
  healthcare: "healthcare",
  finance: "finance",
  retail: "retail",
  education: "education",
  "real-estate": "realEstate",
  logistics: "logistics",
};

// --- Section schema + flat<->nested codecs, one entry per section id ---
type SectionSpec = {
  section: Section;
  flatten: (data: AnyRec) => AnyRec;
  unflatten: (flat: AnyRec) => AnyRec;
};

const csv = (arr: unknown): string => (Array.isArray(arr) ? arr.join(", ") : "");
const uncsv = (s: unknown): string[] =>
  String(s ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export const INDUSTRY_SECTION_SPECS: Record<string, SectionSpec> = {
  hero: {
    section: {
      id: "hero",
      label: "Hero",
      description: "Top banner: eyebrow, title, description, CTAs, trust items and image.",
      ready: true,
      fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
        { name: "titleLine1", label: "Title — line 1", type: "text", default: "" },
        { name: "titleLine2", label: "Title — line 2", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "primaryCtaLabel", label: "Primary button — label", type: "text", default: "" },
        { name: "primaryCtaHref", label: "Primary button — link", type: "url", default: "" },
        { name: "secondaryCtaLabel", label: "Secondary button — label", type: "text", default: "" },
        { name: "secondaryCtaHref", label: "Secondary button — link", type: "url", default: "" },
        { name: "imageSrc", label: "Image", type: "image", default: "" },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
      ],
      list: {
        name: "trustItems",
        label: "Trust items",
        itemNoun: "item",
        itemFields: [{ name: "label", label: "Label", type: "text" }],
        default: [],
      },
    },
    flatten: (d) => ({
      eyebrow: d.eyebrow ?? "",
      titleLine1: d.titleLines?.[0] ?? "",
      titleLine2: d.titleLines?.[1] ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      description: d.description ?? "",
      primaryCtaLabel: d.primaryCta?.label ?? "",
      primaryCtaHref: d.primaryCta?.href ?? "",
      secondaryCtaLabel: d.secondaryCta?.label ?? "",
      secondaryCtaHref: d.secondaryCta?.href ?? "",
      imageSrc: d.image?.src ?? "",
      imageAlt: d.image?.alt ?? "",
      trustItems: (d.trustItems ?? []).map((t: string) => ({ label: t })),
    }),
    unflatten: (f) => ({
      eyebrow: f.eyebrow,
      titleLines: [f.titleLine1, f.titleLine2].filter(Boolean),
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      primaryCta: { label: f.primaryCtaLabel, href: f.primaryCtaHref },
      secondaryCta: { label: f.secondaryCtaLabel, href: f.secondaryCtaHref },
      trustItems: (f.trustItems ?? []).map((i: AnyRec) => i.label).filter(Boolean),
      image: { src: f.imageSrc, alt: f.imageAlt },
    }),
  },

  challenges: {
    section: {
      id: "challenges",
      label: "Challenges",
      description: "“Challenges we solve” heading and the problem cards.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "flowerImage", label: "Decorative image", type: "image", default: "" },
      ],
      list: {
        name: "items",
        label: "Challenge cards",
        itemNoun: "card",
        itemFields: [
          { name: "badge", label: "Badge", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "impact", label: "Impact", type: "text" },
          { name: "image", label: "Image", type: "image" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      description: d.description ?? "",
      flowerImage: d.flowerImage ?? "",
      items: d.items ?? [],
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      description: f.description,
      flowerImage: f.flowerImage,
      items: f.items ?? [],
    }),
  },

  growthEngine: {
    section: {
      id: "growthEngine",
      label: "Growth Engine",
      description: "The growth-ecosystem heading, image and the four channel cards.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "imageSrc", label: "Image", type: "image", default: "" },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
      ],
      list: {
        name: "cards",
        label: "Channel cards",
        itemNoun: "card",
        itemFields: [
          { name: "side", label: "Side (left/right)", type: "text" },
          { name: "icon", label: "Icon (lucide name)", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      description: d.description ?? "",
      imageSrc: d.image?.src ?? "",
      imageAlt: d.image?.alt ?? "",
      cards: [
        ...(d.leftCards ?? []).map((c: AnyRec) => ({ side: "left", ...c })),
        ...(d.rightCards ?? []).map((c: AnyRec) => ({ side: "right", ...c })),
      ],
    }),
    unflatten: (f) => {
      const cards = (f.cards ?? []) as AnyRec[];
      const pick = (side: string) =>
        cards.filter((c) => (c.side || "left").toLowerCase().startsWith(side)).map(({ icon, title, description }) => ({ icon, title, description }));
      return {
        badge: f.badge,
        title: f.title,
        description: f.description,
        image: { src: f.imageSrc, alt: f.imageAlt },
        leftCards: pick("l"),
        rightCards: pick("r"),
      };
    },
  },

  timeline: {
    section: {
      id: "timeline",
      label: "Process Timeline",
      description: "The “how it works” flow — headings, tags, stage labels and steps.",
      ready: true,
      fields: [
        { name: "headingPrimary", label: "Heading — primary", type: "text", default: "" },
        { name: "headingSecondary", label: "Heading — secondary", type: "text", default: "" },
        { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
        { name: "tags", label: "Tags (comma separated)", type: "text", default: "" },
        { name: "labels", label: "Stage labels (comma separated)", type: "text", default: "" },
      ],
      list: {
        name: "steps",
        label: "Steps",
        itemNoun: "step",
        itemFields: [
          { name: "step", label: "Number", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "icon", label: "Icon (lucide name)", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      headingPrimary: d.headingPrimary ?? "",
      headingSecondary: d.headingSecondary ?? "",
      eyebrow: d.eyebrow ?? "",
      tags: csv(d.tags),
      labels: csv(d.labels),
      // `active` is preserved for unedited pages (the generic editor doesn't
      // expose it, so it's dropped once a timeline is saved — acceptable).
      steps: (d.steps ?? []).map((s: AnyRec) => ({ step: s.step, title: s.title, description: s.description, icon: s.icon, ...(s.active ? { active: true } : {}) })),
    }),
    unflatten: (f) => ({
      headingPrimary: f.headingPrimary,
      headingSecondary: f.headingSecondary,
      eyebrow: f.eyebrow,
      tags: uncsv(f.tags),
      labels: uncsv(f.labels),
      steps: f.steps ?? [],
    }),
  },

  whyChooseUs: {
    section: {
      id: "whyChooseUs",
      label: "Why Choose Us",
      description: "Heading, image, reason cards and the closing quote.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "imageSrc", label: "Image", type: "image", default: "" },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
        { name: "titlePrefix", label: "Title — prefix", type: "text", default: "" },
        { name: "titleHighlight", label: "Title — highlight", type: "text", default: "" },
        { name: "titleSuffix", label: "Title — suffix", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "quoteTitle", label: "Quote", type: "textarea", default: "" },
        { name: "quoteDescription", label: "Quote sub-line", type: "text", default: "" },
      ],
      list: {
        name: "reasons",
        label: "Reasons",
        itemNoun: "reason",
        itemFields: [
          { name: "icon", label: "Icon (lucide name)", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      imageSrc: d.image?.src ?? "",
      imageAlt: d.image?.alt ?? "",
      titlePrefix: d.titlePrefix ?? "",
      titleHighlight: d.titleHighlight ?? "",
      titleSuffix: d.titleSuffix ?? "",
      description: d.description ?? "",
      quoteTitle: d.quoteTitle ?? "",
      quoteDescription: d.quoteDescription ?? "",
      reasons: d.reasons ?? [],
    }),
    unflatten: (f) => ({
      badge: f.badge,
      image: { src: f.imageSrc, alt: f.imageAlt },
      titlePrefix: f.titlePrefix,
      titleHighlight: f.titleHighlight,
      titleSuffix: f.titleSuffix,
      description: f.description,
      quoteTitle: f.quoteTitle,
      quoteDescription: f.quoteDescription,
      reasons: f.reasons ?? [],
    }),
  },

  testimonials: {
    section: {
      id: "testimonials",
      label: "Testimonials",
      description: "Heading and the testimonial cards.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "items",
        label: "Testimonials",
        itemNoun: "testimonial",
        itemFields: [
          { name: "name", label: "Name", type: "text" },
          { name: "role", label: "Role", type: "text" },
          { name: "image", label: "Photo", type: "image" },
          { name: "review", label: "Review", type: "textarea" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({ badge: d.badge ?? "", title: d.title ?? "", description: d.description ?? "", items: d.items ?? [] }),
    unflatten: (f) => ({ badge: f.badge, title: f.title, description: f.description, items: f.items ?? [] }),
  },

  faqs: {
    section: {
      id: "faqs",
      label: "FAQs",
      description: "Heading, the Q&A list and the closing CTA.",
      ready: true,
      fields: [
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "ctaTitle", label: "CTA — title", type: "text", default: "" },
        { name: "ctaDescription", label: "CTA — description", type: "textarea", default: "" },
        { name: "ctaButtonText", label: "CTA — button text", type: "text", default: "" },
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
      title: d.title ?? "",
      description: d.description ?? "",
      ctaTitle: d.ctaTitle ?? "",
      ctaDescription: d.ctaDescription ?? "",
      ctaButtonText: d.ctaButtonText ?? "",
      items: d.items ?? [],
    }),
    unflatten: (f) => ({
      title: f.title,
      description: f.description,
      ctaTitle: f.ctaTitle,
      ctaDescription: f.ctaDescription,
      ctaButtonText: f.ctaButtonText,
      items: f.items ?? [],
    }),
  },
};

// Section order shown on the page + in the admin.
export const INDUSTRY_SECTION_IDS = ["hero", "challenges", "growthEngine", "timeline", "whyChooseUs", "testimonials", "faqs"] as const;

export function getIndustrySectionSpec(sectionId: string): SectionSpec | undefined {
  return INDUSTRY_SECTION_SPECS[sectionId];
}

/**
 * Raw nested default for a section. The original 6 industries pull from
 * industriesData; admin-created industries have no seed and return `{}` (blank).
 */
export function industryDefault(slug: string, sectionId: string): AnyRec {
  const dataKey = SEED_DATA_KEYS[slug];
  if (!dataKey) return {};
  return (industriesData[dataKey] as AnyRec)?.[sectionId] ?? {};
}
