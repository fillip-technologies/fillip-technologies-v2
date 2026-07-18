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
import { SOLUTION_CONTENT, getSolutionBySlug } from "@/data/solutions";

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
      { name: "ctaLabel", label: "Button label", type: "text", default: "" },
      { name: "image", label: "Background image", type: "image", default: "" },
    ],
  },
  flatten: (d) => ({
    badge: d.badge ?? "",
    title: d.title ?? "",
    highlightedTitle: d.highlightedTitle ?? "",
    description: d.description ?? "",
    ctaLabel: d.ctaLabel ?? "",
    image: d.image ?? "",
  }),
  unflatten: (f) => ({
    badge: f.badge,
    title: f.title,
    highlightedTitle: f.highlightedTitle,
    description: f.description,
    ctaLabel: f.ctaLabel,
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
    description: "The “why choose us” benefit cards — each with its own heading and description.",
    ready: true,
    fields: [],
    list: {
      name: "benefits",
      label: "Benefits",
      itemNoun: "benefit",
      itemFields: [
        { name: "text", label: "Heading", type: "text" },
        {
          name: "description",
          label: "Description",
          type: "textarea",
        },
      ],
      default: [],
    },
  },
  // Raw default `benefits` may be a string[] (legacy static JSON) or { text,
  // description } rows; surface both as editable { text, description } rows.
  flatten: (d) => ({
    benefits: (d.benefits ?? []).map((b: unknown) =>
      typeof b === "string"
        ? { text: b, description: "" }
        : { text: (b as AnyRec)?.text ?? "", description: (b as AnyRec)?.description ?? "" }
    ),
  }),
  // Returns { text, description } objects for the renderer. Rows without a
  // heading are dropped; a blank description lets the renderer fall back to the
  // section's shared supporting line.
  unflatten: (f) =>
    (f.benefits ?? [])
      .map((b: AnyRec) => ({
        text: String(b?.text ?? "").trim(),
        description: String(b?.description ?? "").trim(),
      }))
      .filter((b: AnyRec) => b.text),
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

/* -------------------------------------------------------------------------- */
/* Copy blocks that used to be hardcoded in HardwareSolutionPage. Making them   */
/* editable is what turns the Solutions templates into FULLY CMS-managed pages. */
/* Each of these returns a nested object (data.about, data.promise, …) that the */
/* renderer reads with a built-in fallback.                                     */
/* -------------------------------------------------------------------------- */

// Built-in defaults — identical to the renderer's original hardcoded copy so an
// unedited page looks unchanged until an admin touches it.
const ABOUT_DEFAULT = {
  heading: "Protecting What\nMatters Most",
  description:
    "We deliver intelligent hardware solutions that adapt to your needs and keep your infrastructure dependable every day.",
  ctaLabel: "Contact Us",
  cardCtaLabel: "Contact Us",
};

const PROMISE_DEFAULT = {
  eyebrow: "/ Our Promise",
  heading: "Smart technology.\nStronger systems.",
  description:
    "We combine careful planning, quality hardware, and professional installation to deliver dependable infrastructure for your site.",
  features: [
    { title: "Real-time Alerts", description: "Stay informed with timely notifications and updates." },
    { title: "Mobile Access", description: "Monitor and manage essential systems from anywhere." },
    { title: "Centralized Access", description: "Keep information, devices, and monitoring easier to manage." },
  ],
};

const WHY_DEFAULT = {
  eyebrow: "/ Why Choose Us",
  heading: "Security you can trust.\nService you can count on.",
  benefitDescription:
    "Practical planning, clean installation, and dependable support for long-term hardware performance.",
};

const TESTIMONIALS_DESCRIPTION =
  "Homes, offices, institutions, and businesses rely on Fillip Technologies for dependable hardware planning, installation, and support.";

/** The renderer's original four seeded testimonials (review text keyed to label). */
function defaultTestimonials(label: string): AnyRec[] {
  const lower = label.toLowerCase();
  return [
    {
      name: "Amit Kumar",
      role: "Business Owner",
      review: `Fillip Technologies planned and installed our ${lower} setup professionally. The system is reliable, clean, and easy for our team to manage.`,
      image: "",
    },
    {
      name: "Priya Sharma",
      role: "Operations Manager",
      review: `Their team understood our site requirements and delivered a practical ${lower} solution with clear handover and support.`,
      image: "",
    },
    {
      name: "Rahul Verma",
      role: "Facility Head",
      review:
        "The installation quality, documentation, and post-installation support were excellent. We now have much better visibility and control.",
      image: "",
    },
    {
      name: "Neha Singh",
      role: "Administrator",
      review:
        "The project was completed smoothly and the team explained everything in simple terms. It has made our daily operations easier.",
      image: "",
    },
  ];
}

const about: SectionSpec = {
  section: {
    id: "about",
    label: "Intro block",
    description:
      "The band under the hero: a heading, short paragraph and CTA label (shown beside the first two solution cards).",
    ready: true,
    fields: [
      { name: "heading", label: "Heading", type: "textarea", default: "", help: "Line breaks are preserved." },
      { name: "description", label: "Description", type: "textarea", default: "" },
      { name: "ctaLabel", label: "Button label", type: "text", default: "" },
      { name: "cardCtaLabel", label: "Solution card link label", type: "text", default: "", help: "Shown on the two solution cards beside this block." },
    ],
  },
  flatten: (d) => ({
    heading: d.heading ?? "",
    description: d.description ?? "",
    ctaLabel: d.ctaLabel ?? "",
    cardCtaLabel: d.cardCtaLabel ?? "",
  }),
  unflatten: (f) => ({
    heading: f.heading ?? "",
    description: f.description ?? "",
    ctaLabel: f.ctaLabel ?? "",
    cardCtaLabel: f.cardCtaLabel ?? "",
  }),
};

const promise: SectionSpec = {
  section: {
    id: "promise",
    label: "Our Promise",
    description: "The “Our Promise” band: eyebrow, heading, intro and the three feature cards.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
      { name: "heading", label: "Heading", type: "textarea", default: "", help: "Line breaks are preserved." },
      { name: "description", label: "Description", type: "textarea", default: "" },
    ],
    list: {
      name: "features",
      label: "Feature cards",
      itemNoun: "feature",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [],
    },
  },
  flatten: (d) => ({
    eyebrow: d.eyebrow ?? "",
    heading: d.heading ?? "",
    description: d.description ?? "",
    features: (d.features ?? []).map((c: AnyRec) => ({
      title: c.title ?? "",
      description: c.description ?? "",
    })),
  }),
  unflatten: (f) => ({
    eyebrow: f.eyebrow ?? "",
    heading: f.heading ?? "",
    description: f.description ?? "",
    features: (f.features ?? []).map((c: AnyRec) => ({
      title: c.title ?? "",
      description: c.description ?? "",
    })),
  }),
};

const solutionsHeading: SectionSpec = {
  section: {
    id: "solutionsHeading",
    label: "Solutions heading",
    description: "Eyebrow, heading and intro shown above the full grid of solution cards.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
      { name: "heading", label: "Heading", type: "textarea", default: "", help: "Line breaks are preserved." },
      { name: "description", label: "Description", type: "textarea", default: "" },
      { name: "cardCtaLabel", label: "Solution card link label", type: "text", default: "", help: "Shown on each card in the solutions grid." },
    ],
  },
  flatten: (d) => ({
    eyebrow: d.eyebrow ?? "",
    heading: d.heading ?? "",
    description: d.description ?? "",
    cardCtaLabel: d.cardCtaLabel ?? "",
  }),
  unflatten: (f) => ({
    eyebrow: f.eyebrow ?? "",
    heading: f.heading ?? "",
    description: f.description ?? "",
    cardCtaLabel: f.cardCtaLabel ?? "",
  }),
};

const whyChoose: SectionSpec = {
  section: {
    id: "whyChoose",
    label: "Why Choose Us heading",
    description:
      "Eyebrow and heading for the benefits band, plus the supporting line shown under each benefit.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
      { name: "heading", label: "Heading", type: "textarea", default: "", help: "Line breaks are preserved." },
      {
        name: "benefitDescription",
        label: "Benefit supporting line",
        type: "textarea",
        default: "",
        help: "Shown under every benefit heading.",
      },
    ],
  },
  flatten: (d) => ({
    eyebrow: d.eyebrow ?? "",
    heading: d.heading ?? "",
    benefitDescription: d.benefitDescription ?? "",
  }),
  unflatten: (f) => ({
    eyebrow: f.eyebrow ?? "",
    heading: f.heading ?? "",
    benefitDescription: f.benefitDescription ?? "",
  }),
};

const testimonials: SectionSpec = {
  section: {
    id: "testimonials",
    label: "Testimonials",
    description: "The customer-stories band: badge, title, description and the testimonial cards.",
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
        { name: "review", label: "Review", type: "textarea" },
        { name: "image", label: "Photo (optional)", type: "image" },
      ],
      default: [],
    },
  },
  flatten: (d) => ({
    badge: d.badge ?? "",
    title: d.title ?? "",
    description: d.description ?? "",
    items: (d.items ?? []).map((t: AnyRec) => ({
      name: t.name ?? "",
      role: t.role ?? "",
      review: t.review ?? "",
      image: t.image ?? "",
    })),
  }),
  unflatten: (f) => ({
    badge: f.badge ?? "",
    title: f.title ?? "",
    description: f.description ?? "",
    items: (f.items ?? []).map((t: AnyRec) => ({
      name: t.name ?? "",
      role: t.role ?? "",
      review: t.review ?? "",
      image: t.image ?? "",
    })),
  }),
};

const faqHeading: SectionSpec = {
  section: {
    id: "faqHeading",
    label: "FAQ heading",
    description: "Badge, title and intro shown above the FAQ list.",
    ready: true,
    fields: [
      { name: "badge", label: "Badge", type: "text", default: "" },
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
    ],
  },
  flatten: (d) => ({
    badge: d.badge ?? "",
    title: d.title ?? "",
    description: d.description ?? "",
  }),
  unflatten: (f) => ({
    badge: f.badge ?? "",
    title: f.title ?? "",
    description: f.description ?? "",
  }),
};

export const SOLUTION_SECTION_SPECS: Record<string, SectionSpec> = {
  hero,
  about,
  solutions,
  promise,
  solutionsHeading,
  whyChoose,
  benefits,
  testimonials,
  faqHeading,
  faqs,
};

// Section order shown on the page + in the admin (mirrors the page's flow).
export const SOLUTION_SECTION_IDS = [
  "hero",
  "about",
  "solutions",
  "promise",
  "solutionsHeading",
  "whyChoose",
  "benefits",
  "testimonials",
  "faqHeading",
  "faqs",
] as const;

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
  if (sectionId === "hero") return { ...(page.hero ?? {}), ctaLabel: page.hero?.ctaLabel ?? "Get Free Consultation" };
  if (sectionId === "solutions") return { solutions: page.solutions ?? [] };
  if (sectionId === "benefits") return { benefits: page.benefits ?? [] };
  if (sectionId === "faqs") return { faqs: page.faqs ?? [] };

  // The copy blocks that used to be hardcoded in the renderer. Seed each with
  // its built-in default so unedited pages are unchanged; the label-dependent
  // ones fill in the page's own label.
  const label = getSolutionBySlug(slug)?.label ?? "";
  if (sectionId === "about") return { ...ABOUT_DEFAULT };
  if (sectionId === "promise") {
    return { ...PROMISE_DEFAULT, features: PROMISE_DEFAULT.features.map((f) => ({ ...f })) };
  }
  if (sectionId === "solutionsHeading") {
    return {
      eyebrow: "/ Solutions",
      heading: `${label}\nSolutions We Offer`,
      description:
        "Explore practical, scalable hardware solutions designed around your site, users, operations, and security requirements.",
      cardCtaLabel: "Explore Solution",
    };
  }
  if (sectionId === "whyChoose") return { ...WHY_DEFAULT };
  if (sectionId === "testimonials") {
    return {
      badge: "Customer Stories",
      title: `Trusted ${label} Projects`,
      description: TESTIMONIALS_DESCRIPTION,
      items: defaultTestimonials(label),
    };
  }
  if (sectionId === "faqHeading") {
    return {
      badge: `${label} FAQs`,
      title: "Everything You Need To Know",
      description: `Common questions about ${label.toLowerCase()} planning, installation, and support.`,
    };
  }
  return {};
}
