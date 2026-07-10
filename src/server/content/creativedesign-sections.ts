/**
 * CMS SECTION SCHEMA for the "creative-design" Service Pages template — the
 * /design/<slug> detail pages under the "Creative Experience Design" category.
 * Shares the whole Service Pages CMS (registry/actions/admin) with the other
 * templates; it reuses the shared `Service` hero + whatWeBuild (surfaced as
 * "Capabilities") + process specs and adds three design-only sections:
 * portfolio, why-choose-us and FAQs.
 *
 * Content is stored FLAT (`servicepage.<slug>.<id>`) and unflattened into the
 * `CreativeDesignContent` shape on read.
 */

import type { SectionSpec } from "./servicepage-sections";
import { SERVICEPAGE_SECTION_SPECS } from "./servicepage-sections";
import { CREATIVE_DESIGN_CONTENT } from "@/data/creative-design";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

// "Capabilities" reuses the whatWeBuild fields + codecs, but under its own
// section id so it stores/reads at `servicepage.<slug>.capabilities`.
const capabilities: SectionSpec = {
  section: {
    ...SERVICEPAGE_SECTION_SPECS.whatWeBuild.section,
    id: "capabilities",
    label: "Capabilities",
    description: "Heading and the capability cards (each with an optional metric and tags).",
  },
  flatten: SERVICEPAGE_SECTION_SPECS.whatWeBuild.flatten,
  unflatten: SERVICEPAGE_SECTION_SPECS.whatWeBuild.unflatten,
};

const portfolio: SectionSpec = {
  section: {
    id: "portfolio",
    label: "Portfolio",
    description: "The showcase heading and the portfolio tiles (title, category, optional image).",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
    ],
    list: {
      name: "items",
      label: "Portfolio tiles",
      itemNoun: "tile",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "image", label: "Image (optional)", type: "image" },
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
      title: i.title ?? "",
      category: i.category ?? "",
      image: i.image ?? "",
    })),
  }),
  unflatten: (f) => ({
    eyebrow: f.eyebrow,
    title: f.title,
    highlightedTitle: f.highlightedTitle,
    description: f.description,
    items: (f.items ?? []).map((i: AnyRec) => {
      const tile: AnyRec = { title: i.title, category: i.category };
      if (i.image) tile.image = i.image;
      return tile;
    }),
  }),
};

const whyChooseUs: SectionSpec = {
  section: {
    id: "whyChooseUs",
    label: "Why Choose Us",
    description: "The “why choose us” heading and the reason cards.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
    ],
    list: {
      name: "items",
      label: "Reason cards",
      itemNoun: "reason",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
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
      title: i.title ?? "",
      description: i.description ?? "",
    })),
  }),
  unflatten: (f) => ({
    eyebrow: f.eyebrow,
    title: f.title,
    highlightedTitle: f.highlightedTitle,
    description: f.description,
    items: f.items ?? [],
  }),
};

const faq: SectionSpec = {
  section: {
    id: "faq",
    label: "FAQs",
    description: "The FAQ heading and the question/answer list.",
    ready: true,
    fields: [
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
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
    title: d.title ?? "",
    highlightedTitle: d.highlightedTitle ?? "",
    description: d.description ?? "",
    items: (d.items ?? []).map((q: AnyRec) => ({
      question: q.question ?? "",
      answer: q.answer ?? "",
    })),
  }),
  unflatten: (f) => ({
    title: f.title,
    highlightedTitle: f.highlightedTitle,
    description: f.description,
    items: f.items ?? [],
  }),
};

// Reuses the shared Service specs for hero + process; the design-specific
// sections are defined above.
export const CREATIVEDESIGN_SECTION_SPECS: Record<string, SectionSpec> = {
  hero: SERVICEPAGE_SECTION_SPECS.hero,
  capabilities,
  portfolio,
  process: SERVICEPAGE_SECTION_SPECS.process,
  whyChooseUs,
  faq,
};

// Section order shown on the page + in the admin.
export const CREATIVEDESIGN_SECTION_IDS = [
  "hero",
  "capabilities",
  "portfolio",
  "process",
  "whyChooseUs",
  "faq",
] as const;

export function getCreativeDesignSectionSpec(sectionId: string): SectionSpec | undefined {
  return CREATIVEDESIGN_SECTION_SPECS[sectionId];
}

/** Raw nested default for a section: the seeded creative content by slug, else `{}`. */
export function creativedesignDefault(slug: string, sectionId: string): AnyRec {
  return (CREATIVE_DESIGN_CONTENT[slug] as AnyRec)?.[sectionId] ?? {};
}
