/**
 * CMS SECTION SCHEMA for the Solutions templates — the /hardware-solutions/<slug>
 * (template "hardware-solution") and /solutions/<slug> (template
 * "business-solution") detail pages. Both templates share this one schema +
 * renderer (HardwareSolutionPage); only the URL prefix + category differ.
 *
 * The renderer's data shape (HardwareSolutionPage) is: hero{badge,title,
 * highlightedTitle,description,image}, solutions[]{title,description,image},
 * benefits: string[], faqs[]{question,answer}. Content is stored FLAT
 * (`servicepage.<slug>.<id>`). `getServicePageData` assigns each section's
 * `unflatten(flat)` straight onto that id, so list sections return the bare
 * array (and hero returns the bare object).
 */

import type { SectionSpec } from "./servicepage-sections";
import { SOLUTION_CONTENT } from "@/data/solutions";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

const hero: SectionSpec = {
  section: {
    id: "hero",
    label: "Hero",
    description: "Top banner: badge, headline (with a highlighted line), intro and background image.",
    ready: true,
    fields: [
      { name: "badge", label: "Badge", type: "text", default: "" },
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
      { name: "image", label: "Background image", type: "image", default: "" },
    ],
  },
  flatten: (d) => ({
    badge: d.badge ?? "",
    title: d.title ?? "",
    highlightedTitle: d.highlightedTitle ?? "",
    description: d.description ?? "",
    image: d.image ?? "",
  }),
  unflatten: (f) => ({
    badge: f.badge,
    title: f.title,
    highlightedTitle: f.highlightedTitle,
    description: f.description,
    image: f.image,
  }),
};

const solutions: SectionSpec = {
  section: {
    id: "solutions",
    label: "Solutions",
    description: "The solution cards (each with a title, description and image).",
    ready: true,
    fields: [],
    list: {
      name: "solutions",
      label: "Solution cards",
      itemNoun: "solution",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image", label: "Image", type: "image" },
      ],
      default: [],
    },
  },
  flatten: (d) => ({
    solutions: (d.solutions ?? []).map((s: AnyRec) => ({
      title: s.title ?? "",
      description: s.description ?? "",
      image: s.image ?? "",
    })),
  }),
  // Returns the bare array — data.solutions must be the array the renderer maps.
  unflatten: (f) =>
    (f.solutions ?? []).map((s: AnyRec) => ({
      title: s.title ?? "",
      description: s.description ?? "",
      image: s.image ?? "",
    })),
};

const benefits: SectionSpec = {
  section: {
    id: "benefits",
    label: "Benefits",
    description: "The “why choose us” benefit headings.",
    ready: true,
    fields: [],
    list: {
      name: "benefits",
      label: "Benefits",
      itemNoun: "benefit",
      itemFields: [{ name: "text", label: "Benefit", type: "text" }],
      default: [],
    },
  },
  // Raw default `benefits` is a string[]; surface it as { text } rows.
  flatten: (d) => ({
    benefits: (d.benefits ?? []).map((b: unknown) =>
      typeof b === "string" ? { text: b } : { text: (b as AnyRec)?.text ?? "" }
    ),
  }),
  // Returns the bare string[] the renderer maps over.
  unflatten: (f) =>
    (f.benefits ?? [])
      .map((b: AnyRec) => String(b?.text ?? "").trim())
      .filter(Boolean),
};

const faqs: SectionSpec = {
  section: {
    id: "faqs",
    label: "FAQs",
    description: "The question/answer list shown at the bottom of the page.",
    ready: true,
    fields: [],
    list: {
      name: "faqs",
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
    faqs: (d.faqs ?? []).map((q: AnyRec) => ({
      question: q.question ?? "",
      answer: q.answer ?? "",
    })),
  }),
  // Returns the bare array the renderer maps over.
  unflatten: (f) =>
    (f.faqs ?? []).map((q: AnyRec) => ({
      question: q.question ?? "",
      answer: q.answer ?? "",
    })),
};

export const SOLUTION_SECTION_SPECS: Record<string, SectionSpec> = {
  hero,
  solutions,
  benefits,
  faqs,
};

// Section order shown on the page + in the admin.
export const SOLUTION_SECTION_IDS = ["hero", "solutions", "benefits", "faqs"] as const;

export function getSolutionSectionSpec(sectionId: string): SectionSpec | undefined {
  return SOLUTION_SECTION_SPECS[sectionId];
}

/**
 * Raw nested default for a section: shaped to match each section's `flatten`
 * input. hero → the hero object; the list sections → `{ <id>: array }`.
 */
export function solutionDefault(slug: string, sectionId: string): AnyRec {
  const page = SOLUTION_CONTENT[slug] as AnyRec | undefined;
  if (!page) return {};
  if (sectionId === "hero") return page.hero ?? {};
  if (sectionId === "solutions") return { solutions: page.solutions ?? [] };
  if (sectionId === "benefits") return { benefits: page.benefits ?? [] };
  if (sectionId === "faqs") return { faqs: page.faqs ?? [] };
  return {};
}
