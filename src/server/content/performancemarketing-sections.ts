/**
 * CMS SECTION SCHEMA for the "performance-marketing" Service Pages template —
 * admin-created /marketing/<slug> pages that use the Performance Marketing (ads)
 * layout (hero + philosophy + how-it-works + results + testimonials + faq).
 *
 * Content is stored FLAT (`servicepage.<slug>.<id>`) and unflattened into the
 * `PerformanceMarketingCmsContent` shape on read. New pages have no per-slug
 * seed, so every section falls back to the generic starter content.
 */

import type { SectionSpec } from "./servicepage-sections";
import { PERFORMANCE_MARKETING_STARTER } from "@/data/performance-marketing-cms";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

export const PERFORMANCEMARKETING_SECTION_SPECS: Record<string, SectionSpec> = {
  hero: {
    section: {
      id: "hero",
      label: "Hero",
      description: "Top banner: headline (title + highlighted + suffix), intro, CTA, a metric badge and the central logo image.",
      ready: true,
      fields: [
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "suffix", label: "Suffix", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "cta", label: "CTA label", type: "text", default: "" },
        { name: "metricValue", label: "Metric value", type: "text", default: "" },
        { name: "metricLabel", label: "Metric label", type: "textarea", default: "" },
        { name: "imageSrc", label: "Central image", type: "image", default: "" },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
      ],
    },
    flatten: (d) => ({
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      suffix: d.suffix ?? "",
      description: d.description ?? "",
      cta: d.cta ?? "",
      metricValue: d.metricValue ?? "",
      metricLabel: d.metricLabel ?? "",
      imageSrc: d.image?.src ?? "",
      imageAlt: d.image?.alt ?? "",
    }),
    unflatten: (f) => ({
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      suffix: f.suffix,
      description: f.description,
      cta: f.cta,
      metricValue: f.metricValue,
      metricLabel: f.metricLabel,
      image: { src: f.imageSrc ?? "", alt: f.imageAlt ?? "" },
    }),
  },

  philosophy: {
    section: {
      id: "philosophy",
      label: "Philosophy",
      description: "The “our philosophy” heading, the lead/support/description copy, the caption and the two floating metric cards.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "lead", label: "Lead line", type: "textarea", default: "" },
        { name: "support", label: "Support line", type: "textarea", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "caption", label: "Image caption", type: "text", default: "" },
      ],
      list: {
        name: "metrics",
        label: "Metric cards",
        itemNoun: "metric",
        itemFields: [
          { name: "label", label: "Label", type: "text" },
          { name: "value", label: "Value", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      lead: d.lead ?? "",
      support: d.support ?? "",
      description: d.description ?? "",
      caption: d.caption ?? "",
      metrics: (d.metrics ?? []).map((m: AnyRec) => ({ label: m.label ?? "", value: m.value ?? "" })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      lead: f.lead,
      support: f.support,
      description: f.description,
      caption: f.caption,
      metrics: f.metrics ?? [],
    }),
  },

  workflow: {
    section: {
      id: "workflow",
      label: "How It Works",
      description: "The “how it works” heading and the workflow step cards (each with an image and optional button).",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "steps",
        label: "Steps",
        itemNoun: "step",
        itemFields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image", type: "image" },
          { name: "alt", label: "Image alt text", type: "text" },
          { name: "cta", label: "Button label (optional)", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      description: d.description ?? "",
      steps: (d.steps ?? []).map((s: AnyRec) => ({
        title: s.title ?? "",
        description: s.description ?? "",
        image: s.image ?? "",
        alt: s.alt ?? "",
        cta: s.cta ?? "",
      })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      steps: (f.steps ?? []).map((s: AnyRec) => {
        const step: AnyRec = {
          title: s.title,
          description: s.description,
          image: s.image ?? "",
          alt: s.alt ?? "",
        };
        if (s.cta) step.cta = s.cta;
        return step;
      }),
    }),
  },

  results: {
    section: {
      id: "results",
      label: "Results",
      description: "The results heading, the dashboard image and the metric cards.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "imageSrc", label: "Dashboard image", type: "image", default: "" },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
      ],
      list: {
        name: "metrics",
        label: "Metric cards",
        itemNoun: "metric",
        itemFields: [
          { name: "value", label: "Value", type: "text" },
          { name: "label", label: "Label", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: d.badge ?? "",
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      description: d.description ?? "",
      imageSrc: d.image?.src ?? "",
      imageAlt: d.image?.alt ?? "",
      metrics: (d.metrics ?? []).map((m: AnyRec) => ({ value: m.value ?? "", label: m.label ?? "" })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      image: { src: f.imageSrc ?? "", alt: f.imageAlt ?? "" },
      metrics: f.metrics ?? [],
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
export const PERFORMANCEMARKETING_SECTION_IDS = [
  "hero",
  "philosophy",
  "workflow",
  "results",
  "testimonials",
  "faq",
] as const;

export function getPerformanceMarketingSectionSpec(sectionId: string): SectionSpec | undefined {
  return PERFORMANCEMARKETING_SECTION_SPECS[sectionId];
}

/** Raw nested default for a section: the generic starter content (slug-agnostic). */
export function performanceMarketingDefault(_slug: string, sectionId: string): AnyRec {
  return (PERFORMANCE_MARKETING_STARTER as AnyRec)[sectionId] ?? {};
}
