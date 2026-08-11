/**
 * Admin editor SCHEMA for the case-study sections. Case studies store their
 * content nested inside their own `case_studies` document (see the CaseStudy type
 * in casestudy-registry.ts), but the generic `SectionEditor` works with FLAT
 * string values + one repeatable list. So each section here declares:
 *   - `section`  the field/list schema the editor renders,
 *   - `flatten`  nested section object  -> flat editor values,
 *   - `unflatten` flat editor values    -> nested section object (for $set).
 *
 * Mirrors the industries pattern, but writes to the case-study document instead
 * of `site_content`.
 */

import type { Section } from "./home-sections";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

type SectionSpec = {
  section: Section;
  flatten: (data: AnyRec) => AnyRec;
  unflatten: (flat: AnyRec) => AnyRec;
};

// Comma-separated number list <-> number[] (used for the growth-chart values).
const numsToCsv = (arr: unknown): string =>
  Array.isArray(arr) ? arr.map((n) => Number(n)).filter((n) => Number.isFinite(n)).join(", ") : "";
const csvToNums = (s: unknown): number[] =>
  String(s ?? "")
    .split(",")
    .map((x) => Number(x.trim()))
    .filter((n) => Number.isFinite(n));

// Bullet list <-> [{text}] (identity — the editor item already holds { text }).
const bulletBlockSpec = (id: string, label: string, description: string): SectionSpec => ({
  section: {
    id,
    label,
    description,
    ready: true,
    fields: [
      { name: "heading", label: "Heading", type: "text", default: "" },
      { name: "intro", label: "Intro paragraph", type: "textarea", default: "" },
    ],
    list: {
      name: "items",
      label: "Bullet points",
      itemNoun: "point",
      itemFields: [{ name: "text", label: "Text", type: "textarea" }],
      default: [],
    },
  },
  flatten: (d) => ({ heading: d.heading ?? "", intro: d.intro ?? "", items: d.items ?? [] }),
  unflatten: (f) => ({ heading: f.heading, intro: f.intro, items: f.items ?? [] }),
});

export const CASE_STUDY_SECTION_SPECS: Record<string, SectionSpec> = {
  hero: {
    section: {
      id: "hero",
      label: "Hero",
      description: "Top banner: eyebrow, title, intro paragraph, images and result badge.",
      ready: true,
      fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text", default: "Case Study" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "description", label: "Intro / overview paragraph", type: "textarea", default: "" },
        { name: "resultBadge", label: "Result badge (e.g. +180% organic traffic)", type: "text", default: "" },
        { name: "heroImage", label: "Hero image", type: "image", default: "" },
        { name: "cardImage", label: "Card image (used on the /case-studies grid)", type: "image", default: "" },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
      ],
    },
    flatten: (d) => ({
      eyebrow: d.eyebrow ?? "Case Study",
      title: d.title ?? "",
      description: d.description ?? "",
      resultBadge: d.resultBadge ?? "",
      heroImage: d.heroImage ?? "",
      cardImage: d.cardImage ?? "",
      imageAlt: d.imageAlt ?? "",
    }),
    unflatten: (f) => ({
      eyebrow: f.eyebrow,
      title: f.title,
      description: f.description,
      resultBadge: f.resultBadge,
      heroImage: f.heroImage,
      cardImage: f.cardImage,
      imageAlt: f.imageAlt,
    }),
  },

  results: {
    section: {
      id: "results",
      label: "Result Metrics",
      description: "The headline stat cards shown as a band under the hero.",
      ready: true,
      fields: [{ name: "heading", label: "Heading (optional)", type: "text", default: "" }],
      list: {
        name: "items",
        label: "Metric cards",
        itemNoun: "metric",
        itemFields: [
          { name: "value", label: "Value (e.g. 3x, +180%)", type: "text" },
          { name: "label", label: "Label", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({ heading: d.heading ?? "", items: d.items ?? [] }),
    unflatten: (f) => ({ heading: f.heading, items: f.items ?? [] }),
  },

  brands: {
    section: {
      id: "brands",
      label: "Brands / Clients",
      description: "“Brands we empowered” heading, blurb and the logo grid.",
      ready: true,
      fields: [
        { name: "heading", label: "Heading", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "logos",
        label: "Logos",
        itemNoun: "logo",
        itemFields: [
          { name: "name", label: "Brand name", type: "text" },
          { name: "logo", label: "Logo image", type: "image" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({ heading: d.heading ?? "", description: d.description ?? "", logos: d.logos ?? [] }),
    unflatten: (f) => ({ heading: f.heading, description: f.description, logos: f.logos ?? [] }),
  },

  challenges: bulletBlockSpec(
    "challenges",
    "Challenges",
    "“The digital roadblocks” heading, intro and the problem bullets."
  ),

  strategy: bulletBlockSpec(
    "strategy",
    "Strategy",
    "“How we solved it” heading, intro and the strategy bullets."
  ),

  journey: {
    section: {
      id: "journey",
      label: "Growth Journey",
      description: "The 12-month timeline: chart values plus the month-by-month phase cards.",
      ready: true,
      fields: [
        { name: "heading", label: "Heading", type: "text", default: "" },
        { name: "subheading", label: "Subheading", type: "textarea", default: "" },
        { name: "chartLabel", label: "Chart series label (e.g. Organic Traffic)", type: "text", default: "" },
        {
          name: "chartValues",
          label: "Chart values",
          type: "text",
          default: "",
          help: "Comma-separated numbers, one per month (e.g. 20, 45, 38, 60, …). Drives the growth chart.",
        },
      ],
      list: {
        name: "phases",
        label: "Phase cards",
        itemNoun: "phase",
        itemFields: [
          { name: "period", label: "Period (e.g. Months 1–2)", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      heading: d.heading ?? "",
      subheading: d.subheading ?? "",
      chartLabel: d.chartLabel ?? "",
      chartValues: numsToCsv(d.chartValues),
      phases: d.phases ?? [],
    }),
    unflatten: (f) => ({
      heading: f.heading,
      subheading: f.subheading,
      chartLabel: f.chartLabel,
      chartValues: csvToNums(f.chartValues),
      phases: f.phases ?? [],
    }),
  },

  outcome: {
    section: {
      id: "outcome",
      label: "Outcome",
      description: "“The Fillip difference” heading and the closing narrative paragraphs.",
      ready: true,
      fields: [{ name: "heading", label: "Heading", type: "text", default: "" }],
      list: {
        name: "paragraphs",
        label: "Paragraphs",
        itemNoun: "paragraph",
        itemFields: [{ name: "text", label: "Text", type: "textarea" }],
        default: [],
      },
    },
    flatten: (d) => ({ heading: d.heading ?? "", paragraphs: d.paragraphs ?? [] }),
    unflatten: (f) => ({ heading: f.heading, paragraphs: f.paragraphs ?? [] }),
  },

  cta: {
    section: {
      id: "cta",
      label: "Call to Action",
      description: "Closing conversion block with a button.",
      ready: true,
      fields: [
        { name: "heading", label: "Heading", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "buttonLabel", label: "Button label", type: "text", default: "" },
        { name: "buttonHref", label: "Button link", type: "url", default: "" },
      ],
    },
    flatten: (d) => ({
      heading: d.heading ?? "",
      description: d.description ?? "",
      buttonLabel: d.buttonLabel ?? "",
      buttonHref: d.buttonHref ?? "",
    }),
    unflatten: (f) => ({
      heading: f.heading,
      description: f.description,
      buttonLabel: f.buttonLabel,
      buttonHref: f.buttonHref,
    }),
  },
};

// Section order shown in the admin editor (page order lives in the template).
export const CASE_STUDY_EDITOR_SECTION_IDS = [
  "hero",
  "results",
  "brands",
  "challenges",
  "strategy",
  "journey",
  "outcome",
  "cta",
] as const;

export function getCaseStudySectionSpec(sectionId: string): SectionSpec | undefined {
  return CASE_STUDY_SECTION_SPECS[sectionId];
}
