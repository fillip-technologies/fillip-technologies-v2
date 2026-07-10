/**
 * Shared CMS section specs reused across multiple Service Pages templates
 * (marketing, challenges, ...). Keeping them here avoids re-defining the same
 * "Why Choose Us" + "FAQs" schemas in every template's sections file.
 *
 * Content is stored FLAT (`servicepage.<slug>.<id>`) and unflattened on read.
 */

import type { SectionSpec } from "./servicepage-sections";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

export const whyChooseUsSpec: SectionSpec = {
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

export const faqSpec: SectionSpec = {
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

/** Build a section spec that reuses another's fields/codecs under a new id/label. */
export function aliasSpec(
  base: SectionSpec,
  id: string,
  label: string,
  description?: string
): SectionSpec {
  return {
    section: {
      ...base.section,
      id,
      label,
      description: description ?? base.section.description,
    },
    flatten: base.flatten,
    unflatten: base.unflatten,
  };
}
