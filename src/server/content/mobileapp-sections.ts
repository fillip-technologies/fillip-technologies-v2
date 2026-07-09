/**
 * CMS SECTION SCHEMA for the "mobile-app" Service Pages template — the
 * /mobile-app-development/<slug> detail pages. Shares the whole Service Pages
 * CMS (registry/actions/admin) with the "service" template; only the section
 * shapes + renderer differ. Content is stored FLAT (`servicepage.<slug>.<id>`)
 * and unflattened into the `MobileAppDevelopmentContent` shape on read.
 *
 * Only the sections the page actually RENDERS are exposed (whyChooseUs exists in
 * the type but MobileAppDevelopmentPage doesn't render it, so it's omitted).
 */

import type { Section } from "./home-sections";
import type { SectionSpec } from "./servicepage-sections";
import {
  androidMobileAppContent,
  appUiUxMobileAppContent,
  businessAutomationMobileAppContent,
  ecommerceMobileAppContent,
  enterpriseMobileAppContent,
  iosMobileAppContent,
  onDemandMobileAppContent,
  type MobileAppDevelopmentContent,
} from "@/data/mobile-app-development";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

// Static content for the originally-static pages, keyed by slug. Drives both the
// CMS defaults (fallback until edited) and the public route's static fallback.
export const MOBILE_CONTENT: Record<string, MobileAppDevelopmentContent> = {
  android: androidMobileAppContent,
  ios: iosMobileAppContent,
  enterprise: enterpriseMobileAppContent,
  ecommerce: ecommerceMobileAppContent,
  "business-automation": businessAutomationMobileAppContent,
  "app-ui-ux-design": appUiUxMobileAppContent,
  "on-demand": onDemandMobileAppContent,
};

const str = (v: unknown) => (v == null ? "" : String(v));

export const MOBILEAPP_SECTION_SPECS: Record<string, SectionSpec> = {
  hero: {
    section: {
      id: "hero",
      label: "Hero",
      description: "Top banner: headline, intro, the two floating cards and the image.",
      ready: true,
      fields: [
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "leftCardTitle", label: "Left card — title", type: "text", default: "" },
        { name: "leftCardDescription", label: "Left card — description", type: "textarea", default: "" },
        { name: "rightCardValue", label: "Right card — value", type: "text", default: "" },
        { name: "rightCardLabel", label: "Right card — label", type: "text", default: "" },
        { name: "imageSrc", label: "Image", type: "image", default: "" },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
      ],
    },
    flatten: (d) => ({
      title: str(d.title),
      highlightedTitle: str(d.highlightedTitle),
      description: str(d.description),
      leftCardTitle: str(d.leftCard?.title),
      leftCardDescription: str(d.leftCard?.description),
      rightCardValue: str(d.rightCard?.value),
      rightCardLabel: str(d.rightCard?.label),
      imageSrc: str(d.image?.src),
      imageAlt: str(d.image?.alt),
    }),
    unflatten: (f) => ({
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      leftCard: { title: f.leftCardTitle, description: f.leftCardDescription },
      rightCard: { value: f.rightCardValue, label: f.rightCardLabel },
      image: { src: f.imageSrc, alt: f.imageAlt },
    }),
  },

  challenges: {
    section: {
      id: "challenges",
      label: "Challenges",
      description: "Heading, supporting copy, the checklist items and the image.",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "lead", label: "Lead", type: "textarea", default: "" },
        { name: "support", label: "Support", type: "textarea", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "imageSrc", label: "Image", type: "image", default: "" },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
      ],
      list: {
        name: "items",
        label: "Checklist items",
        itemNoun: "item",
        itemFields: [{ name: "text", label: "Item", type: "text" }],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: str(d.badge),
      title: str(d.title),
      highlightedTitle: str(d.highlightedTitle),
      lead: str(d.lead),
      support: str(d.support),
      description: str(d.description),
      imageSrc: str(d.image?.src),
      imageAlt: str(d.image?.alt),
      items: (d.items ?? []).map((t: string) => ({ text: str(t) })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      lead: f.lead,
      support: f.support,
      description: f.description,
      image: { src: f.imageSrc, alt: f.imageAlt },
      items: (f.items ?? []).map((i: AnyRec) => str(i.text)).filter(Boolean),
    }),
  },

  solutions: {
    section: {
      id: "solutions",
      label: "Solutions",
      description: "Heading and the solution cards (each with an icon + colours).",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
      ],
      list: {
        name: "items",
        label: "Solution cards",
        itemNoun: "card",
        itemFields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "icon", label: "Icon (lucide name)", type: "text" },
          { name: "iconColor", label: "Icon colour (class)", type: "text" },
          { name: "iconBg", label: "Icon background (class)", type: "text" },
          { name: "footerLabel", label: "Footer label", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: str(d.badge),
      title: str(d.title),
      highlightedTitle: str(d.highlightedTitle),
      description: str(d.description),
      items: (d.items ?? []).map((i: AnyRec) => ({
        title: str(i.title),
        description: str(i.description),
        icon: str(i.icon),
        iconColor: str(i.iconColor),
        iconBg: str(i.iconBg),
        footerLabel: str(i.footerLabel),
      })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      items: f.items ?? [],
    }),
  },

  features: {
    section: {
      id: "features",
      label: "Features",
      description: "Heading, image and the feature cards (each with an icon).",
      ready: true,
      fields: [
        { name: "badge", label: "Badge", type: "text", default: "" },
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
        { name: "description", label: "Description", type: "textarea", default: "" },
        { name: "imageSrc", label: "Image", type: "image", default: "" },
        { name: "imageAlt", label: "Image alt text", type: "text", default: "" },
      ],
      list: {
        name: "items",
        label: "Feature cards",
        itemNoun: "feature",
        itemFields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "icon", label: "Icon (lucide name)", type: "text" },
        ],
        default: [],
      },
    },
    flatten: (d) => ({
      badge: str(d.badge),
      title: str(d.title),
      highlightedTitle: str(d.highlightedTitle),
      description: str(d.description),
      imageSrc: str(d.image?.src),
      imageAlt: str(d.image?.alt),
      items: (d.items ?? []).map((i: AnyRec) => ({
        title: str(i.title),
        description: str(i.description),
        icon: str(i.icon),
      })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      highlightedTitle: f.highlightedTitle,
      description: f.description,
      image: { src: f.imageSrc, alt: f.imageAlt },
      items: f.items ?? [],
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
        name: "testimonials",
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
    flatten: (d) => ({
      badge: str(d.badge),
      title: str(d.title),
      description: str(d.description),
      testimonials: (d.testimonials ?? []).map((t: AnyRec) => ({
        name: str(t.name),
        role: str(t.role),
        image: str(t.image),
        review: str(t.review),
      })),
    }),
    unflatten: (f) => ({
      badge: f.badge,
      title: f.title,
      description: f.description,
      testimonials: f.testimonials ?? [],
    }),
  },

  faq: {
    section: {
      id: "faq",
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
      title: str(d.title),
      description: str(d.description),
      ctaTitle: str(d.ctaTitle),
      ctaDescription: str(d.ctaDescription),
      ctaButtonText: str(d.ctaButtonText),
      faqs: (d.faqs ?? []).map((q: AnyRec) => ({ question: str(q.question), answer: str(q.answer) })),
    }),
    unflatten: (f) => ({
      title: f.title,
      description: f.description,
      ctaTitle: f.ctaTitle,
      ctaDescription: f.ctaDescription,
      ctaButtonText: f.ctaButtonText,
      faqs: f.faqs ?? [],
    }),
  },

  guidance: {
    section: {
      id: "guidance",
      label: "Guidance CTA",
      description: "The closing “need guidance?” banner — heading and button label.",
      ready: true,
      fields: [
        { name: "title", label: "Title", type: "text", default: "" },
        { name: "buttonText", label: "Button text", type: "text", default: "" },
      ],
    },
    flatten: (d) => ({ title: str(d.title), buttonText: str(d.buttonText) }),
    unflatten: (f) => ({ title: f.title, buttonText: f.buttonText }),
  },
};

export const MOBILEAPP_SECTION_IDS = [
  "hero",
  "challenges",
  "solutions",
  "features",
  "testimonials",
  "faq",
  "guidance",
] as const;

export function getMobileAppSectionSpec(sectionId: string): SectionSpec | undefined {
  return MOBILEAPP_SECTION_SPECS[sectionId];
}

/** Raw nested default for a section: the static content by slug, else `{}`. */
export function mobileappDefault(slug: string, sectionId: string): AnyRec {
  return (MOBILE_CONTENT[slug] as AnyRec)?.[sectionId] ?? {};
}
