/**
 * CMS SECTION SCHEMA for the "creative-experience" Service Pages template — the
 * /design/<slug> pages under the "Creative Experience Design" category. Renders
 * the same rich layout as the standalone /graphic-designing page (hero →
 * capabilities → process → portfolio → why-choose → deliverables), but each
 * page is independently CMS-editable (content stored at
 * `servicepage.<slug>.<id>`). Purely visual props (icons, colours) stay
 * code-derived by index in the components.
 */

import type { Section } from "./home-sections";
import type { SectionSpec } from "./servicepage-sections";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

/* --------------------------------------------------------- shared defaults -- */
// The generic (graphic-designing) content used as the starting point for every
// page. Hero is customised per slug below; the rest is shared until edited.
const DEFAULT_STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Design Awards" },
  { value: "13yrs", label: "Industry Experience" },
];

const DEFAULT_SERVICES = [
  { subtitle: "Brand Marks & Identity", title: "Logo Design", desc: "Iconic, scalable logos crafted from scratch — wordmarks, lettermarks, emblem logos, and abstract marks that define your brand's first impression.", features: "Wordmarks, Lettermarks, Emblem Logos, Icon Marks", tag: "Most Popular" },
  { subtitle: "Complete Visual Systems", title: "Brand Identity", desc: "End-to-end brand identity systems covering color palettes, typography hierarchy, brand voice, guidelines, and full brand books for consistent multi-channel presence.", features: "Color System, Typography, Brand Guidelines, Style Sheets", tag: "Enterprise" },
  { subtitle: "Product & Retail Packaging", title: "Packaging Design", desc: "Premium retail packaging, label designs, box layouts, and product wraps built on golden-ratio grids that make products fly off shelves.", features: "Product Labels, Box Design, Retail Packaging, Die-cut Layouts", tag: "3D Ready" },
  { subtitle: "Brochures, Posters & More", title: "Print & Collateral", desc: "High-resolution print assets including brochures, flyers, exhibition banners, magazine layouts, business cards, and stationery — press-ready at 300+ DPI.", features: "Brochures, Posters, Business Cards, Stationery", tag: "Print Ready" },
  { subtitle: "Animation & Visual Effects", title: "Motion Graphics", desc: "Captivating motion design for intros, logo animations, explainer videos, social media reels, and interactive UI micro-animations that bring brands to life.", features: "Logo Animation, Explainer Videos, Reel Covers, UI Motion", tag: "After Effects" },
  { subtitle: "Custom Art & Characters", title: "Illustration", desc: "Bespoke vector illustrations in flat, isometric, hand-drawn, or character art styles — purpose-built for websites, apps, marketing, and editorial content.", features: "Character Art, Isometric, Flat Design, Editorial", tag: "Custom" },
  { subtitle: "Interfaces & Digital Products", title: "UI/UX Design", desc: "Pixel-perfect Figma designs for web apps, dashboards, landing pages, and mobile interfaces with full design systems, component libraries, and dev handoffs.", features: "Figma Design, Component Libraries, Prototyping, Dev Handoff", tag: "Figma" },
  { subtitle: "Content & Ad Creatives", title: "Social Media Design", desc: "Scroll-stopping social media graphics, Instagram templates, Facebook/Google ad creatives, stories, thumbnails, and campaign kits that drive real engagement.", features: "Ad Creatives, Story Templates, Post Series, Campaign Kits", tag: "All Platforms" },
];

const DEFAULT_STEPS = [
  { num: "01", title: "Discovery Call", desc: "We learn your brand, audience, and design goals in detail." },
  { num: "02", title: "Concepts & Moodboards", desc: "Visual directions with color systems and typography pairings." },
  { num: "03", title: "High-Fidelity Design", desc: "Custom vectors, grids, and assets built from scratch." },
  { num: "04", title: "Revisions & Delivery", desc: "Unlimited revisions until perfect. Clean source files delivered." },
];

const DEFAULT_ITEMS = [
  { category: "Logo Design", title: "Logo & Brand Mark", tag: "LOGO + MARK", desc: "Custom geometric brand icon and typography layout.", image: "/images/portfolio/logo-design-v2.png" },
  { category: "Logo Design", title: "Wordmark & Logotype", tag: "WORDMARK", desc: "Clean, elegant custom letterforms and wordmark styling.", image: "/images/portfolio/wordmark-design-v2.png" },
  { category: "Brand Identity", title: "Visual Identity System", tag: "FULL BRAND", desc: "Comprehensive brand identity guidelines, style guide, and colors.", image: "/images/portfolio/identity-design-v2.png" },
  { category: "Print", title: "Exhibition Poster Design", tag: "POSTER SERIES", desc: "Swiss-style modernist posters designed on a structured typographic grid.", image: "/images/portfolio/poster-design-v2.png" },
  { category: "Packaging", title: "Product Packaging Design", tag: "PACKAGING", desc: "Custom die-cut packaging layout and premium label design.", image: "/images/portfolio/packaging-design-v2.png" },
  { category: "Social Media", title: "Social Media Campaign Kit", tag: "SOCIAL KIT", desc: "Scroll-stopping social media assets and digital marketing graphics.", image: "/images/portfolio/social-design-v2.png" },
  { category: "Illustration", title: "Custom Mascot Illustration", tag: "ILLUSTRATION", desc: "Bespoke digital character illustrations and branding assets.", image: "/images/portfolio/mascot-design-v2.png" },
  { category: "UI Design", title: "SaaS Dashboard UI Design", tag: "UI/UX DESIGN", desc: "High-fidelity app dashboard user interface and component library.", image: "/images/portfolio/dashboard-ui-v2.png" },
];

const DEFAULT_REASONS = [
  { title: "100% Custom, Zero Templates", desc: "Every pixel is hand-crafted from scratch. We never use pre-made templates or clip art. Your brand stays unique." },
  { title: "Fast Turnaround", desc: "First drafts within 48–72 hours. Full projects in days, not weeks. We match agile sprint timelines." },
  { title: "Unlimited Revisions", desc: "We iterate until you're 100% satisfied. No hidden revision costs, no cap on feedback rounds." },
  { title: "Full Ownership Rights", desc: "All delivered files belong 100% to you. Commercial-use rights, source files (AI/PSD/Figma), no licensing fees." },
  { title: "Deadline Guaranteed", desc: "We commit to realistic deadlines and always deliver on time. No excuses, no delays, no last-minute surprises." },
  { title: "Dedicated Design Partner", desc: "A senior designer is assigned to every project — not a rotating junior team. Direct communication, always." },
];

const DEFAULT_DELIVERABLES = [
  { text: "Source Files (AI, PSD, Figma)" },
  { text: "SVG & PNG Exports" },
  { text: "Brand Guidelines PDF" },
  { text: "Web-Optimized Assets" },
  { text: "Print-Ready Files (300 DPI)" },
  { text: "Unlimited File Formats" },
];

// Per-slug hero copy so each page reads as its own discipline out of the box.
type HeroSeed = { headingLine1: string; headingLine2: string; descriptionLead: string; descriptionHighlight: string };
const HERO_BY_SLUG: Record<string, HeroSeed> = {
  "ui-ux-designing": { headingLine1: "UI/UX", headingLine2: "Design", descriptionLead: "We design intuitive, conversion-focused interfaces and product experiences that make your product", descriptionHighlight: "effortless to use." },
  "product-design": { headingLine1: "Product", headingLine2: "Design", descriptionLead: "We shape end-to-end digital products — from research to polished interface — that feel", descriptionHighlight: "impossible to put down." },
  "logo-designing": { headingLine1: "Logo", headingLine2: "Designing", descriptionLead: "We craft distinctive, scalable logos and brand marks that make your business", descriptionHighlight: "instantly recognisable." },
  "brand-identity": { headingLine1: "Brand", headingLine2: "Identity", descriptionLead: "We build complete visual identity systems — colour, type and guidelines — that make your brand", descriptionHighlight: "impossible to ignore." },
  "motion-video-design": { headingLine1: "Motion & Video", headingLine2: "Design", descriptionLead: "We produce motion graphics, animations and video content that make your brand", descriptionHighlight: "come alive." },
};

/* -------------------------------------------------------------- specs ------ */
const hero: SectionSpec = {
  section: {
    id: "hero",
    label: "Hero",
    description: "Top banner: badge, heading, intro, buttons, main image and the stats row.",
    ready: true,
    fields: [
      { name: "badge", label: "Badge", type: "text", default: "Premium Design Studio" },
      { name: "headingLine1", label: "Heading — line 1", type: "text", default: "" },
      { name: "headingLine2", label: "Heading — line 2 (highlighted)", type: "text", default: "" },
      { name: "descriptionLead", label: "Description — lead", type: "textarea", default: "" },
      { name: "descriptionHighlight", label: "Description — highlighted tail", type: "text", default: "" },
      { name: "primaryCtaLabel", label: "Primary button — label", type: "text", default: "Start Your Project" },
      { name: "primaryCtaHref", label: "Primary button — link", type: "url", default: "#estimate" },
      { name: "secondaryCtaLabel", label: "Secondary button — label", type: "text", default: "View Our Work" },
      { name: "secondaryCtaHref", label: "Secondary button — link", type: "url", default: "#services" },
      { name: "image", label: "Main image", type: "image", default: "/images/graphic-image-2.png" },
      { name: "imageAlt", label: "Main image — alt text", type: "text", default: "Creative Experience Design" },
    ],
    list: {
      name: "stats",
      label: "Stats",
      itemNoun: "stat",
      itemFields: [
        { name: "value", label: "Value", type: "text" },
        { name: "label", label: "Label", type: "text" },
      ],
      default: DEFAULT_STATS,
    },
  },
  flatten: (d) => ({
    badge: d.badge ?? "",
    headingLine1: d.headingLine1 ?? "",
    headingLine2: d.headingLine2 ?? "",
    descriptionLead: d.descriptionLead ?? "",
    descriptionHighlight: d.descriptionHighlight ?? "",
    primaryCtaLabel: d.primaryCtaLabel ?? "",
    primaryCtaHref: d.primaryCtaHref ?? "",
    secondaryCtaLabel: d.secondaryCtaLabel ?? "",
    secondaryCtaHref: d.secondaryCtaHref ?? "",
    image: d.image ?? "",
    imageAlt: d.imageAlt ?? "",
    stats: (d.stats ?? []).map((s: AnyRec) => ({ value: s.value ?? "", label: s.label ?? "" })),
  }),
  unflatten: (f) => ({ ...f, stats: f.stats ?? [] }),
};

const capabilities: SectionSpec = {
  section: {
    id: "capabilities",
    label: "What We Design (services)",
    description: "Eyebrow, heading, intro, the two inline showcase images and the service cards.",
    ready: true,
    fields: [
      { name: "badge", label: "Eyebrow", type: "text", default: "✦ What We Design" },
      { name: "headingLead", label: "Heading — line 1", type: "text", default: "Every Design" },
      { name: "headingHighlight", label: "Heading — highlighted word", type: "text", default: "Category" },
      { name: "headingTail", label: "Heading — line 2", type: "text", default: "Covered." },
      { name: "description", label: "Description", type: "textarea", default: "From your first concept to a complete brand universe — we design everything your business needs." },
      { name: "image1", label: "Showcase image 1", type: "image", default: "/images/graphic-image-2.png" },
      { name: "image1Alt", label: "Showcase image 1 — alt", type: "text", default: "Creative Design Showcase" },
      { name: "image2", label: "Showcase image 2", type: "image", default: "/images/graphic-image-3.png" },
      { name: "image2Alt", label: "Showcase image 2 — alt", type: "text", default: "Creative Design Showcase" },
    ],
    list: {
      name: "services",
      label: "Service cards",
      itemNoun: "service",
      itemFields: [
        { name: "subtitle", label: "Subtitle", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
        { name: "features", label: "Feature pills (comma-separated)", type: "text" },
        { name: "tag", label: "Tag", type: "text" },
      ],
      default: DEFAULT_SERVICES,
    },
  },
  flatten: (d) => ({
    badge: d.badge ?? "",
    headingLead: d.headingLead ?? "",
    headingHighlight: d.headingHighlight ?? "",
    headingTail: d.headingTail ?? "",
    description: d.description ?? "",
    image1: d.image1 ?? "",
    image1Alt: d.image1Alt ?? "",
    image2: d.image2 ?? "",
    image2Alt: d.image2Alt ?? "",
    services: (d.services ?? []).map((s: AnyRec) => ({
      subtitle: s.subtitle ?? "",
      title: s.title ?? "",
      desc: s.desc ?? "",
      features: s.features ?? "",
      tag: s.tag ?? "",
    })),
  }),
  unflatten: (f) => ({ ...f, services: f.services ?? [] }),
};

const process: SectionSpec = {
  section: {
    id: "process",
    label: "Our Process",
    description: "Eyebrow, heading, intro and the process steps.",
    ready: true,
    fields: [
      { name: "badge", label: "Eyebrow", type: "text", default: "✦ Our Process" },
      { name: "headingLead", label: "Heading — line 1", type: "text", default: "How We Bring" },
      { name: "headingHighlight", label: "Heading — highlighted part", type: "text", default: "Ideas to Life" },
      { name: "description", label: "Description", type: "textarea", default: "A proven 4-step creative process ensures every project is delivered on time, on brand, and beyond expectations." },
    ],
    list: {
      name: "steps",
      label: "Process steps",
      itemNoun: "step",
      itemFields: [
        { name: "num", label: "Number", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
      ],
      default: DEFAULT_STEPS,
    },
  },
  flatten: (d) => ({
    badge: d.badge ?? "",
    headingLead: d.headingLead ?? "",
    headingHighlight: d.headingHighlight ?? "",
    description: d.description ?? "",
    steps: (d.steps ?? []).map((s: AnyRec) => ({ num: s.num ?? "", title: s.title ?? "", desc: s.desc ?? "" })),
  }),
  unflatten: (f) => ({ ...f, steps: f.steps ?? [] }),
};

const portfolio: SectionSpec = {
  section: {
    id: "portfolio",
    label: "Featured Portfolio",
    description: "Eyebrow, heading and the portfolio items (each with its own editable image).",
    ready: true,
    fields: [
      { name: "badge", label: "Eyebrow", type: "text", default: "✦ Our Work" },
      { name: "headingLead", label: "Heading — line 1", type: "text", default: "Featured" },
      { name: "headingHighlight", label: "Heading — highlighted word", type: "text", default: "Portfolio" },
    ],
    list: {
      name: "items",
      label: "Portfolio items",
      itemNoun: "item",
      itemFields: [
        { name: "category", label: "Category", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "tag", label: "Tag", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
        { name: "image", label: "Image", type: "image" },
      ],
      default: DEFAULT_ITEMS,
    },
  },
  flatten: (d) => ({
    badge: d.badge ?? "",
    headingLead: d.headingLead ?? "",
    headingHighlight: d.headingHighlight ?? "",
    items: (d.items ?? []).map((i: AnyRec) => ({
      category: i.category ?? "",
      title: i.title ?? "",
      tag: i.tag ?? "",
      desc: i.desc ?? "",
      image: i.image ?? "",
    })),
  }),
  unflatten: (f) => ({ ...f, items: f.items ?? [] }),
};

const whychoose: SectionSpec = {
  section: {
    id: "whychoose",
    label: "Why Choose Us (reasons)",
    description: "Eyebrow, heading, intro and the reason cards.",
    ready: true,
    fields: [
      { name: "badge", label: "Eyebrow", type: "text", default: "✦ Why Choose Us" },
      { name: "headingLead", label: "Heading — line 1", type: "text", default: "Design You Can" },
      { name: "headingHighlight", label: "Heading — highlighted word", type: "text", default: "Trust" },
      { name: "description", label: "Description", type: "textarea", default: "We don't just design — we build visual systems that perform, convert, and endure." },
    ],
    list: {
      name: "reasons",
      label: "Reason cards",
      itemNoun: "reason",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
      ],
      default: DEFAULT_REASONS,
    },
  },
  flatten: (d) => ({
    badge: d.badge ?? "",
    headingLead: d.headingLead ?? "",
    headingHighlight: d.headingHighlight ?? "",
    description: d.description ?? "",
    reasons: (d.reasons ?? []).map((r: AnyRec) => ({ title: r.title ?? "", desc: r.desc ?? "" })),
  }),
  unflatten: (f) => ({ ...f, reasons: f.reasons ?? [] }),
};

const deliverables: SectionSpec = {
  section: {
    id: "deliverables",
    label: "Deliverables & CTA",
    description: "The 'What you get' checklist and the closing call-to-action card.",
    ready: true,
    fields: [
      { name: "title", label: "Checklist title", type: "text", default: "What You Get With Every Project" },
      { name: "ctaEmoji", label: "CTA — emoji", type: "text", default: "🎨" },
      { name: "ctaHeading", label: "CTA — heading", type: "text", default: "Ready to Build Your Brand?" },
      { name: "ctaDescription", label: "CTA — description", type: "textarea", default: "Get a free consultation and custom quote within 24 hours. No commitment required." },
      { name: "ctaLabel", label: "CTA — button label", type: "text", default: "Get Free Quote" },
      { name: "ctaHref", label: "CTA — button link", type: "url", default: "#estimate" },
    ],
    list: {
      name: "deliverables",
      label: "Checklist items",
      itemNoun: "item",
      itemFields: [{ name: "text", label: "Item", type: "text" }],
      default: DEFAULT_DELIVERABLES,
    },
  },
  flatten: (d) => ({
    title: d.title ?? "",
    ctaEmoji: d.ctaEmoji ?? "",
    ctaHeading: d.ctaHeading ?? "",
    ctaDescription: d.ctaDescription ?? "",
    ctaLabel: d.ctaLabel ?? "",
    ctaHref: d.ctaHref ?? "",
    deliverables: (d.deliverables ?? []).map((i: AnyRec) => ({ text: i.text ?? "" })),
  }),
  unflatten: (f) => ({ ...f, deliverables: f.deliverables ?? [] }),
};

export const CREATIVEEXPERIENCE_SECTION_SPECS: Record<string, SectionSpec> = {
  hero,
  capabilities,
  process,
  portfolio,
  whychoose,
  deliverables,
};

export const CREATIVEEXPERIENCE_SECTION_IDS = [
  "hero",
  "capabilities",
  "process",
  "portfolio",
  "whychoose",
  "deliverables",
] as const;

export function getCreativeExperienceSectionSpec(sectionId: string): SectionSpec | undefined {
  return CREATIVEEXPERIENCE_SECTION_SPECS[sectionId];
}

// Full nested default per section (the source of truth for a page with no saved
// edits). Hero copy is tailored per slug; every other section starts from the
// shared defaults. flatten() normalises these into the stored/editable shape.
export function creativeexperienceDefault(slug: string, sectionId: string): AnyRec {
  const heroSeed = HERO_BY_SLUG[slug] ?? {
    headingLine1: "Creative",
    headingLine2: "Design",
    descriptionLead: "We craft visual identities, brand systems, and digital assets that make your brand",
    descriptionHighlight: "impossible to ignore.",
  };
  switch (sectionId) {
    case "hero":
      return {
        badge: "Premium Design Studio",
        ...heroSeed,
        primaryCtaLabel: "Start Your Project",
        primaryCtaHref: "#estimate",
        secondaryCtaLabel: "View Our Work",
        secondaryCtaHref: "#services",
        image: "/images/graphic-image-2.png",
        imageAlt: "Creative Experience Design",
        stats: DEFAULT_STATS,
      };
    case "capabilities":
      return {
        badge: "✦ What We Design",
        headingLead: "Every Design",
        headingHighlight: "Category",
        headingTail: "Covered.",
        description: "From your first concept to a complete brand universe — we design everything your business needs.",
        image1: "/images/graphic-image-2.png",
        image1Alt: "Creative Design Showcase",
        image2: "/images/graphic-image-3.png",
        image2Alt: "Creative Design Showcase",
        services: DEFAULT_SERVICES,
      };
    case "process":
      return {
        badge: "✦ Our Process",
        headingLead: "How We Bring",
        headingHighlight: "Ideas to Life",
        description: "A proven 4-step creative process ensures every project is delivered on time, on brand, and beyond expectations.",
        steps: DEFAULT_STEPS,
      };
    case "portfolio":
      return {
        badge: "✦ Our Work",
        headingLead: "Featured",
        headingHighlight: "Portfolio",
        items: DEFAULT_ITEMS,
      };
    case "whychoose":
      return {
        badge: "✦ Why Choose Us",
        headingLead: "Design You Can",
        headingHighlight: "Trust",
        description: "We don't just design — we build visual systems that perform, convert, and endure.",
        reasons: DEFAULT_REASONS,
      };
    case "deliverables":
      return {
        title: "What You Get With Every Project",
        ctaEmoji: "🎨",
        ctaHeading: "Ready to Build Your Brand?",
        ctaDescription: "Get a free consultation and custom quote within 24 hours. No commitment required.",
        ctaLabel: "Get Free Quote",
        ctaHref: "#estimate",
        deliverables: DEFAULT_DELIVERABLES,
      };
    default:
      return {};
  }
}
