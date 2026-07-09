/**
 * CMS SECTION SCHEMA for the admin-managed /services/<slug> detail pages (the
 * "service" template). Every service page shares one component template
 * (ServicePage), so one section schema is reused for all of them — only the
 * default *values* differ. Section data is stored FLAT (`servicepage.<slug>.<id>`);
 * the public page unflattens it back into the nested `Service` shape the
 * components take.
 *
 * The list of pages themselves (which slugs exist, title, category, publish
 * state) lives in the `service_pages` collection — see `servicepage-registry.ts`.
 * The 7 originally-static pages fall back to `services` defaults via slug; new
 * admin-created pages start blank.
 */

import type { Section } from "./home-sections";
import { services, type Service } from "@/data/website-development";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

const csv = (arr: unknown): string => (Array.isArray(arr) ? arr.join(", ") : "");
const uncsv = (s: unknown): string[] =>
  String(s ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export type SectionSpec = {
  section: Section;
  flatten: (data: AnyRec) => AnyRec;
  unflatten: (flat: AnyRec) => AnyRec;
};

export const SERVICEPAGE_SECTION_SPECS: Record<string, SectionSpec> = {
  hero: {
    section: {
      id: "hero",
      label: "Hero",
      description: "Top banner: headline (with a highlighted middle) and intro paragraph.",
      ready: true,
      fields: [
        { name: "title", label: "Title — line 1", type: "text", default: "" },
        { name: "prefixText", label: "Line 2 — prefix (optional)", type: "text", default: "" },
        { name: "highlightedTitle", label: "Line 2 — highlighted", type: "text", default: "" },
        { name: "suffixText", label: "Line 2 — suffix (optional)", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        {
          name: "imageSrc",
          label: "Image (optional)",
          type: "image",
          default: "",
          help: "Shown in the hero mockup. Leave blank to use the default preview gallery.",
        },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
      ],
    },
    flatten: (d) => ({
      title: d.title ?? "",
      prefixText: d.prefixText ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      suffixText: d.suffixText ?? "",
      description: d.description ?? "",
      imageSrc: d.image?.src ?? "",
      imageAlt: d.image?.alt ?? "",
    }),
    unflatten: (f) => ({
      title: f.title,
      prefixText: f.prefixText || undefined,
      highlightedTitle: f.highlightedTitle,
      suffixText: f.suffixText || undefined,
      description: f.description,
      image: f.imageSrc ? { src: f.imageSrc, alt: f.imageAlt ?? "" } : undefined,
    }),
  },

  challenges: {
    section: {
      id: "challenges",
      label: "Challenges",
      description: "The “challenges we solve” heading, copy, CTA line and the problem cards.",
      ready: true,
      fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "secondaryDescription", label: "Secondary description", type: "textarea", default: "" },
        { name: "cta", label: "CTA line", type: "text", default: "" },
      ],
      list: {
        name: "items",
        label: "Challenge cards",
        itemNoun: "card",
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
      secondaryDescription: d.secondaryDescription ?? "",
      cta: d.cta ?? "",
      items: (d.items ?? []).map((i: AnyRec) => ({ title: i.title ?? "", description: i.description ?? "" })),
    }),
    unflatten: (f) => ({
      eyebrow: f.eyebrow,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      secondaryDescription: f.secondaryDescription,
      cta: f.cta,
      items: f.items ?? [],
    }),
  },

  whatWeBuild: {
    section: {
      id: "whatWeBuild",
      label: "What We Build",
      description: "Heading and the capability cards (each with an optional metric and tags).",
      ready: true,
      fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "cards",
        label: "Capability cards",
        itemNoun: "card",
        itemFields: [
          { name: "eyebrow", label: "Eyebrow (optional)", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "metric", label: "Metric (optional)", type: "text" },
          { name: "tags", label: "Tags (comma separated)", type: "text" },
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
      cards: (d.cards ?? []).map((c: AnyRec) => ({
        eyebrow: c.eyebrow ?? "",
        title: c.title ?? "",
        description: c.description ?? "",
        metric: c.metric ?? "",
        tags: csv(c.tags),
        image: c.image ?? "",
      })),
    }),
    unflatten: (f) => ({
      eyebrow: f.eyebrow,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      cards: (f.cards ?? []).map((c: AnyRec) => {
        const card: AnyRec = { title: c.title, description: c.description };
        if (c.eyebrow) card.eyebrow = c.eyebrow;
        if (c.metric) card.metric = c.metric;
        if (c.image) card.image = c.image;
        const tags = uncsv(c.tags);
        if (tags.length) card.tags = tags;
        return card;
      }),
    }),
  },

  technologyStack: {
    section: {
      id: "technologyStack",
      label: "Technology Stack",
      description: "Heading, the “why this stack” note and the stack columns (each a list of technologies).",
      ready: true,
      fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "whyTitle", label: "“Why this stack” — title", type: "text", default: "" },
        { name: "whyDescription", label: "“Why this stack” — description", type: "textarea", default: "" },
      ],
      list: {
        name: "stacks",
        label: "Stack columns",
        itemNoun: "column",
        itemFields: [
          { name: "key", label: "Key (frontend, backend…)", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "technologies", label: "Technologies (comma separated)", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => {
      const stacks = (d.stacks ?? {}) as Record<string, AnyRec>;
      return {
        eyebrow: d.eyebrow ?? "",
        title: d.title ?? "",
        highlightedTitle: d.highlightedTitle ?? "",
        description: d.description ?? "",
        whyTitle: d.whyTitle ?? "",
        whyDescription: d.whyDescription ?? "",
        stacks: Object.entries(stacks).map(([key, s]) => ({
          key,
          title: s.title ?? "",
          description: s.description ?? "",
          technologies: csv(s.technologies),
        })),
      };
    },
    unflatten: (f) => {
      const stacks: Record<string, AnyRec> = {};
      (f.stacks ?? []).forEach((s: AnyRec, i: number) => {
        const key = String(s.key ?? "").trim() || `stack${i + 1}`;
        stacks[key] = {
          title: s.title,
          description: s.description,
          technologies: uncsv(s.technologies),
        };
      });
      return {
        eyebrow: f.eyebrow,
        title: f.title,
        highlightedTitle: f.highlightedTitle,
        description: f.description,
        whyTitle: f.whyTitle,
        whyDescription: f.whyDescription,
        stacks,
      };
    },
  },

  process: {
    section: {
      id: "process",
      label: "Process",
      description: "The delivery-phases heading and the phase steps (each a list of bullet items).",
      ready: true,
      fields: [
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "steps",
        label: "Phases",
        itemNoun: "phase",
        itemFields: [
          { name: "title", label: "Title", type: "text" },
          { name: "items", label: "Bullet items (comma separated)", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      description: d.description ?? "",
      steps: (d.steps ?? []).map((s: AnyRec) => ({ title: s.title ?? "", items: csv(s.items) })),
    }),
    unflatten: (f) => ({
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      steps: (f.steps ?? []).map((s: AnyRec) => ({ title: s.title, items: uncsv(s.items) })),
    }),
  },

  outcomes: {
    section: {
      id: "outcomes",
      label: "Outcomes",
      description: "The results heading, the metric stats and the two floating pill labels.",
      ready: true,
      fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "leftPill", label: "Left pill", type: "text", default: "" },
        { name: "rightPill", label: "Right pill", type: "text", default: "" },
      ],
      list: {
        name: "stats",
        label: "Stats",
        itemNoun: "stat",
        itemFields: [
          { name: "value", label: "Value", type: "text" },
          { name: "label", label: "Label", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      eyebrow: d.eyebrow ?? "",
      title: d.title ?? "",
      highlightedTitle: d.highlightedTitle ?? "",
      description: d.description ?? "",
      leftPill: d.leftPill ?? "",
      rightPill: d.rightPill ?? "",
      stats: (d.stats ?? []).map((s: AnyRec) => ({ value: s.value ?? "", label: s.label ?? "" })),
    }),
    unflatten: (f) => ({
      eyebrow: f.eyebrow,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      leftPill: f.leftPill,
      rightPill: f.rightPill,
      stats: f.stats ?? [],
    }),
  },
};

// Section order shown on the page + in the admin.
export const SERVICEPAGE_SECTION_IDS = [
  "hero",
  "challenges",
  "whatWeBuild",
  "technologyStack",
  "process",
  "outcomes",
] as const;

export function getServicePageSectionSpec(sectionId: string): SectionSpec | undefined {
  return SERVICEPAGE_SECTION_SPECS[sectionId];
}

/**
 * Raw nested default for a section. The 7 originally-static service pages pull
 * from `services` (by slug); admin-created pages have no seed and return `{}`.
 */
export function serviceDefault(slug: string, sectionId: string): AnyRec {
  const seed = services.find((s) => s.slug === slug) as Service | undefined;
  return (seed as AnyRec)?.[sectionId] ?? {};
}
