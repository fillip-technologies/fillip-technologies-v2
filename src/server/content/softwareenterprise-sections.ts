/**
 * CMS SECTION SCHEMA for the "software-enterprise" Service Pages template — the
 * /software-development/<slug> detail pages under the "Software & Enterprise"
 * category. Shares the whole Service Pages CMS (registry/actions/admin) with the
 * "service" template; it reuses the shared `Service` section specs (hero,
 * challenges, whatWeBuild, technologyStack, process, outcomes) and adds two
 * SE-only sections: engagement models + FAQs.
 *
 * Content is stored FLAT (`servicepage.<slug>.<id>`) and unflattened into the
 * `SoftwareEnterpriseContent` shape on read.
 */

import type { SectionSpec } from "./servicepage-sections";
import { SERVICEPAGE_SECTION_SPECS } from "./servicepage-sections";
import { SOFTWARE_ENTERPRISE_CONTENT } from "@/data/software-enterprise";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

const csv = (arr: unknown): string => (Array.isArray(arr) ? arr.join(", ") : "");
const uncsv = (s: unknown): string[] =>
  String(s ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

const engagementModels: SectionSpec = {
  section: {
    id: "engagementModels",
    label: "Engagement Models",
    description: "The “how we work together” heading and the engagement-model cards.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
    ],
    list: {
      name: "models",
      label: "Engagement models",
      itemNoun: "model",
      itemFields: [
        { name: "badge", label: "Badge (optional)", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "points", label: "Points (comma separated)", type: "text" },
      ],
      default: [],
    },
  },
  flatten: (d) => ({
    eyebrow: d.eyebrow ?? "",
    title: d.title ?? "",
    highlightedTitle: d.highlightedTitle ?? "",
    description: d.description ?? "",
    models: (d.models ?? []).map((m: AnyRec) => ({
      badge: m.badge ?? "",
      title: m.title ?? "",
      description: m.description ?? "",
      points: csv(m.points),
    })),
  }),
  unflatten: (f) => ({
    eyebrow: f.eyebrow,
    title: f.title,
    highlightedTitle: f.highlightedTitle,
    description: f.description,
    models: (f.models ?? []).map((m: AnyRec) => {
      const model: AnyRec = { title: m.title, description: m.description, points: uncsv(m.points) };
      if (m.badge) model.badge = m.badge;
      return model;
    }),
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

// Reuses the shared Service specs for the common sections; the two SE-only
// sections are defined above.
export const SOFTWAREENTERPRISE_SECTION_SPECS: Record<string, SectionSpec> = {
  hero: SERVICEPAGE_SECTION_SPECS.hero,
  challenges: SERVICEPAGE_SECTION_SPECS.challenges,
  whatWeBuild: SERVICEPAGE_SECTION_SPECS.whatWeBuild,
  technologyStack: SERVICEPAGE_SECTION_SPECS.technologyStack,
  process: SERVICEPAGE_SECTION_SPECS.process,
  engagementModels,
  outcomes: SERVICEPAGE_SECTION_SPECS.outcomes,
  faq,
};

// Section order shown on the page + in the admin.
export const SOFTWAREENTERPRISE_SECTION_IDS = [
  "hero",
  "challenges",
  "whatWeBuild",
  "technologyStack",
  "process",
  "engagementModels",
  "outcomes",
  "faq",
] as const;

export function getSoftwareEnterpriseSectionSpec(sectionId: string): SectionSpec | undefined {
  return SOFTWAREENTERPRISE_SECTION_SPECS[sectionId];
}

/** Raw nested default for a section: the seeded SE content by slug, else `{}`. */
export function softwareenterpriseDefault(slug: string, sectionId: string): AnyRec {
  return (SOFTWARE_ENTERPRISE_CONTENT[slug] as AnyRec)?.[sectionId] ?? {};
}
