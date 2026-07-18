/**
 * CMS SECTION SCHEMA for the `hardware-solution` template — the
 * /hardware-solutions/<slug> detail pages. ALL hardware pages now render through
 * the bespoke `SecuritySurveillance` component (SecurityHero/Priority/Services/
 * Support/Benefits + shared Testimonials/FAQ), so this schema's `unflatten`
 * output matches `SecuritySurveillanceContent`
 * (src/components/Hardware-solution/content.ts).
 *
 * Content is stored FLAT (`servicepage.<slug>.<id>`) and, for these sections,
 * the flat and nested shapes are identical (scalar fields + one simple list), so
 * flatten/unflatten are symmetric. Mirrors solution-sections.ts / the fields
 * previously defined in the `security-surveillance` group of page-sections.ts.
 */

import type { SectionSpec } from "./servicepage-sections";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

const list = (arr: unknown, map: (i: AnyRec) => AnyRec): AnyRec[] =>
  (Array.isArray(arr) ? arr : []).map((i) => map((i ?? {}) as AnyRec));

const hero: SectionSpec = {
  section: {
    id: "hero",
    label: "Hero",
    description: "Top banner: background image, badge, heading, intro, buttons and the status card.",
    ready: true,
    fields: [
      { name: "backgroundImage", label: "Background image", type: "image", default: "/images/new-hero-hard.png" },
      { name: "badge", label: "Badge", type: "text", default: "" },
      { name: "heading", label: "Heading (line breaks allowed)", type: "textarea", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
      { name: "primaryCtaLabel", label: "Primary button", type: "text", default: "Explore Solutions" },
      { name: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Watch Video" },
      { name: "statusLabel", label: "Status card — label", type: "text", default: "System Status" },
      { name: "statusValue", label: "Status card — value", type: "text", default: "Site Coverage Ready" },
      { name: "statusItem1", label: "Status card — item 1", type: "text", default: "Deployment Ready" },
      { name: "statusItem2", label: "Status card — item 2", type: "text", default: "Multi-Site Coverage" },
    ],
  },
  flatten: (d) => ({
    backgroundImage: d.backgroundImage ?? "/images/new-hero-hard.png",
    badge: d.badge ?? "",
    heading: d.heading ?? "",
    description: d.description ?? "",
    primaryCtaLabel: d.primaryCtaLabel ?? "Explore Solutions",
    secondaryCtaLabel: d.secondaryCtaLabel ?? "Watch Video",
    statusLabel: d.statusLabel ?? "System Status",
    statusValue: d.statusValue ?? "Site Coverage Ready",
    statusItem1: d.statusItem1 ?? "Deployment Ready",
    statusItem2: d.statusItem2 ?? "Multi-Site Coverage",
  }),
  unflatten: (f) => ({
    backgroundImage: f.backgroundImage || "/images/new-hero-hard.png",
    badge: f.badge ?? "",
    heading: f.heading ?? "",
    description: f.description ?? "",
    primaryCtaLabel: f.primaryCtaLabel ?? "",
    secondaryCtaLabel: f.secondaryCtaLabel ?? "",
    statusLabel: f.statusLabel ?? "",
    statusValue: f.statusValue ?? "",
    statusItem1: f.statusItem1 ?? "",
    statusItem2: f.statusItem2 ?? "",
  }),
};

const priority: SectionSpec = {
  section: {
    id: "priority",
    label: "Protecting What Matters (cards)",
    description: "Heading, intro, button and the rotating solution cards.",
    ready: true,
    fields: [
      { name: "heading", label: "Heading (line breaks allowed)", type: "textarea", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
      { name: "ctaLabel", label: "Button label", type: "text", default: "Contact Us" },
    ],
    list: {
      name: "cards",
      label: "Cards",
      itemNoun: "card",
      itemFields: [
        { name: "image", label: "Image", type: "image" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [],
    },
  },
  flatten: (d) => ({
    heading: d.heading ?? "",
    description: d.description ?? "",
    ctaLabel: d.ctaLabel ?? "Contact Us",
    cards: list(d.cards, (c) => ({ image: c.image ?? "", title: c.title ?? "", description: c.description ?? "" })),
  }),
  unflatten: (f) => ({
    heading: f.heading ?? "",
    description: f.description ?? "",
    ctaLabel: f.ctaLabel ?? "",
    cards: list(f.cards, (c) => ({ image: c.image ?? "", title: c.title ?? "", description: c.description ?? "" })),
  }),
};

const services: SectionSpec = {
  section: {
    id: "services",
    label: "Our Promise (features)",
    description: "Eyebrow, heading, intro, preview image and the feature rows.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "/ Our Promise" },
      { name: "heading", label: "Heading (line breaks allowed)", type: "textarea", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
      { name: "image", label: "Preview image", type: "image", default: "/images/hardware/security_lens_bg.png" },
      { name: "videoTitle", label: "Video caption", type: "text", default: "" },
      { name: "watchLabel", label: "Watch link label", type: "text", default: "Watch Video" },
    ],
    list: {
      name: "features",
      label: "Feature rows",
      itemNoun: "feature",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [],
    },
  },
  flatten: (d) => ({
    eyebrow: d.eyebrow ?? "/ Our Promise",
    heading: d.heading ?? "",
    description: d.description ?? "",
    image: d.image ?? "/images/hardware/security_lens_bg.png",
    videoTitle: d.videoTitle ?? "",
    watchLabel: d.watchLabel ?? "Watch Video",
    features: list(d.features, (c) => ({ title: c.title ?? "", description: c.description ?? "" })),
  }),
  unflatten: (f) => ({
    eyebrow: f.eyebrow ?? "",
    heading: f.heading ?? "",
    description: f.description ?? "",
    image: f.image || "/images/hardware/security_lens_bg.png",
    videoTitle: f.videoTitle ?? "",
    watchLabel: f.watchLabel ?? "",
    features: list(f.features, (c) => ({ title: c.title ?? "", description: c.description ?? "" })),
  }),
};

const support: SectionSpec = {
  section: {
    id: "support",
    label: "Solutions We Offer",
    description: "Heading, intro and the solution cards.",
    ready: true,
    fields: [
      { name: "heading", label: "Heading (line breaks allowed)", type: "textarea", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
      { name: "ctaLabel", label: "Card link label", type: "text", default: "Explore Solution" },
    ],
    list: {
      name: "solutions",
      label: "Solution cards",
      itemNoun: "solution",
      itemFields: [
        { name: "image", label: "Image", type: "image" },
        { name: "imageAlt", label: "Image alt text", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [],
    },
  },
  flatten: (d) => ({
    heading: d.heading ?? "",
    description: d.description ?? "",
    ctaLabel: d.ctaLabel ?? "Explore Solution",
    solutions: list(d.solutions, (c) => ({
      image: c.image ?? "",
      imageAlt: c.imageAlt ?? "",
      title: c.title ?? "",
      description: c.description ?? "",
    })),
  }),
  unflatten: (f) => ({
    heading: f.heading ?? "",
    description: f.description ?? "",
    ctaLabel: f.ctaLabel ?? "",
    solutions: list(f.solutions, (c) => ({
      image: c.image ?? "",
      imageAlt: c.imageAlt ?? "",
      title: c.title ?? "",
      description: c.description ?? "",
    })),
  }),
};

const benefits: SectionSpec = {
  section: {
    id: "benefits",
    label: "Why Choose Us (benefits)",
    description: "Eyebrow, heading and the benefit cards (each with its own description).",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "/ Why Choose Us" },
      { name: "heading", label: "Heading (line breaks allowed)", type: "textarea", default: "" },
    ],
    list: {
      name: "benefits",
      label: "Benefit cards",
      itemNoun: "benefit",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [],
    },
  },
  flatten: (d) => ({
    eyebrow: d.eyebrow ?? "/ Why Choose Us",
    heading: d.heading ?? "",
    benefits: list(d.benefits, (c) => ({ title: c.title ?? "", description: c.description ?? "" })),
  }),
  unflatten: (f) => ({
    eyebrow: f.eyebrow ?? "",
    heading: f.heading ?? "",
    benefits: list(f.benefits, (c) => ({ title: c.title ?? "", description: c.description ?? "" })),
  }),
};

const testimonials: SectionSpec = {
  section: {
    id: "testimonials",
    label: "Testimonials",
    description: "Badge, heading, intro and customer stories.",
    ready: true,
    fields: [
      { name: "badge", label: "Badge", type: "text", default: "Customer Stories" },
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
    ],
    list: {
      name: "testimonials",
      label: "Testimonials",
      itemNoun: "testimonial",
      itemFields: [
        { name: "name", label: "Name", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "review", label: "Review", type: "textarea" },
        { name: "image", label: "Photo", type: "image" },
      ],
      default: [],
    },
  },
  flatten: (d) => ({
    badge: d.badge ?? "Customer Stories",
    title: d.title ?? "",
    description: d.description ?? "",
    testimonials: list(d.testimonials, (c) => ({
      name: c.name ?? "",
      role: c.role ?? "",
      review: c.review ?? "",
      image: c.image ?? "",
    })),
  }),
  unflatten: (f) => ({
    badge: f.badge ?? "",
    title: f.title ?? "",
    description: f.description ?? "",
    testimonials: list(f.testimonials, (c) => ({
      name: c.name ?? "",
      role: c.role ?? "",
      review: c.review ?? "",
      image: c.image ?? "",
    })),
  }),
};

const faqs: SectionSpec = {
  section: {
    id: "faqs",
    label: "FAQs",
    description: "Badge, heading, intro and the question/answer list.",
    ready: true,
    fields: [
      { name: "badge", label: "Badge", type: "text", default: "FAQs" },
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
    ],
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
    badge: d.badge ?? "FAQs",
    title: d.title ?? "",
    description: d.description ?? "",
    faqs: list(d.faqs, (c) => ({ question: c.question ?? "", answer: c.answer ?? "" })),
  }),
  unflatten: (f) => ({
    badge: f.badge ?? "",
    title: f.title ?? "",
    description: f.description ?? "",
    faqs: list(f.faqs, (c) => ({ question: c.question ?? "", answer: c.answer ?? "" })),
  }),
};

export const HARDWARESOLUTION_SECTION_SPECS: Record<string, SectionSpec> = {
  hero,
  priority,
  services,
  support,
  benefits,
  testimonials,
  faqs,
};

// Section order shown on the page + in the admin editor.
export const HARDWARESOLUTION_SECTION_IDS = [
  "hero",
  "priority",
  "services",
  "support",
  "benefits",
  "testimonials",
  "faqs",
] as const;

export function getHardwareSolutionSectionSpec(sectionId: string): SectionSpec | undefined {
  return HARDWARESOLUTION_SECTION_SPECS[sectionId];
}

/**
 * Raw nested default for a section (fed into `flatten`). Real content lives in
 * `servicepage.<slug>.*` (seeded by the migration); this is only the fallback
 * for a brand-new hardware page, so it returns an empty object and each spec's
 * own field defaults fill in the safe scalars (images, CTA labels).
 */
export function hardwareSolutionDefault(): AnyRec {
  return {};
}
