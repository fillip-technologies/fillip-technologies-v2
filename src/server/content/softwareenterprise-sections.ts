/**
 * CMS SECTION SCHEMA for the "software-enterprise" Service Pages template — the
 * SaaS-style /software-development/<slug> pages under the "Software & Enterprise"
 * category. Shares the whole Service Pages CMS (registry/actions/admin) with the
 * other templates. The layout has four editable sections: hero, capabilities
 * (bento widgets), scaleTiers and faq. The interactive demo widgets keep fixed
 * mechanics — only the surrounding copy is CMS-editable.
 *
 * Content is stored FLAT (`servicepage.<slug>.<id>`) and unflattened into the
 * `SoftwareEnterpriseContent` shape on read. Nested arrays that can't be a
 * nested list in the admin editor are stored as one-per-line text
 * ("Label | Value") and parsed here.
 */

import type { SectionSpec } from "./servicepage-sections";
import { SOFTWARE_ENTERPRISE_CONTENT } from "@/data/software-enterprise";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

/** "Label | Value" lines → [{ label, value }]. */
const linesToPairs = (s: unknown): { label: string; value: string }[] =>
  String(s ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [label, ...rest] = l.split("|");
      return { label: (label ?? "").trim(), value: rest.join("|").trim() };
    });

const pairsToLines = (arr: unknown): string =>
  Array.isArray(arr) ? arr.map((p: AnyRec) => `${p.label ?? ""} | ${p.value ?? ""}`).join("\n") : "";

/** "Label | iconKey" lines → [{ label, icon }] (icon optional). */
const linesToNodes = (s: unknown): { label: string; icon: string }[] =>
  String(s ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [label, ...rest] = l.split("|");
      return { label: (label ?? "").trim(), icon: rest.join("|").trim() || "server" };
    });

const nodesToLines = (arr: unknown): string =>
  Array.isArray(arr) ? arr.map((n: AnyRec) => `${n.label ?? ""} | ${n.icon ?? ""}`).join("\n") : "";

const slugify = (s: string, fallback: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || fallback;

const hero: SectionSpec = {
  section: {
    id: "hero",
    label: "Hero",
    description: "Top banner: badge, heading (with a gradient-highlighted end), intro, feature bullets and the two CTAs.",
    ready: true,
    fields: [
      { name: "badge", label: "Badge", type: "text", default: "" },
      { name: "title", label: "Heading (before highlight)", type: "text", default: "" },
      { name: "highlightedTitle", label: "Heading — highlighted end", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
      { name: "primaryCtaLabel", label: "Primary button — label", type: "text", default: "" },
      { name: "primaryCtaHref", label: "Primary button — link", type: "text", default: "" },
      { name: "secondaryCtaLabel", label: "Secondary button — label", type: "text", default: "" },
      { name: "secondaryCtaHref", label: "Secondary button — link", type: "text", default: "" },
    ],
    list: {
      name: "bullets",
      label: "Feature bullets",
      itemNoun: "bullet",
      itemFields: [
        { name: "icon", label: "Icon (database, shield, layers, check, server, globe, refresh, cpu, cloud, lock, zap, activity)", type: "text" },
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
    primaryCtaLabel: d.primaryCta?.label ?? "",
    primaryCtaHref: d.primaryCta?.href ?? "",
    secondaryCtaLabel: d.secondaryCta?.label ?? "",
    secondaryCtaHref: d.secondaryCta?.href ?? "",
    bullets: (d.bullets ?? []).map((b: AnyRec) => ({ icon: b.icon ?? "layers", label: b.label ?? "" })),
  }),
  unflatten: (f) => ({
    badge: f.badge,
    title: f.title,
    highlightedTitle: f.highlightedTitle,
    description: f.description,
    primaryCta: { label: f.primaryCtaLabel, href: f.primaryCtaHref || "/contact" },
    secondaryCta: { label: f.secondaryCtaLabel, href: f.secondaryCtaHref || "/portfolio" },
    bullets: (f.bullets ?? []).map((b: AnyRec) => ({ icon: b.icon || "layers", label: b.label })),
  }),
};

const capabilities: SectionSpec = {
  section: {
    id: "capabilities",
    label: "Capabilities (Bento)",
    description: "The bento grid heading and its four cards. Each card hosts a fixed interactive demo widget in order (1: data routing, 2: billing, 3: analytics, 4: deploy pipeline).",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "highlightedTitle", label: "Highlighted title", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
    ],
    list: {
      name: "cards",
      label: "Cards (keep 4, in widget order)",
      itemNoun: "card",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "caption", label: "Widget caption", type: "text" },
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
      title: c.title ?? "",
      description: c.description ?? "",
      caption: c.caption ?? "",
    })),
  }),
  unflatten: (f) => ({
    eyebrow: f.eyebrow,
    title: f.title,
    highlightedTitle: f.highlightedTitle,
    description: f.description,
    cards: (f.cards ?? []).map((c: AnyRec) => ({
      title: c.title ?? "",
      description: c.description ?? "",
      caption: c.caption ?? "",
    })),
  }),
};

const scaleTiers: SectionSpec = {
  section: {
    id: "scaleTiers",
    label: "Scale Tiers",
    description: "The scaling-tiers heading and the tier tabs. Metrics use one “Label | Value” per line; architecture nodes use one “Label | icon” per line.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "" },
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "description", label: "Description", type: "textarea", default: "" },
    ],
    list: {
      name: "tiers",
      label: "Tiers",
      itemNoun: "tier",
      itemFields: [
        { name: "label", label: "Tab label", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "metrics", label: "Metrics — one “Label | Value” per line", type: "textarea" },
        { name: "architectureTitle", label: "Architecture — title", type: "text" },
        { name: "architectureDesc", label: "Architecture — description", type: "textarea" },
        { name: "architectureNodes", label: "Architecture nodes — one “Label | icon” per line", type: "textarea" },
      ],
      default: [],
    },
  },
  flatten: (d) => ({
    eyebrow: d.eyebrow ?? "",
    title: d.title ?? "",
    description: d.description ?? "",
    tiers: (d.tiers ?? []).map((t: AnyRec) => ({
      label: t.label ?? "",
      title: t.title ?? "",
      description: t.description ?? "",
      metrics: pairsToLines(t.metrics),
      architectureTitle: t.architecture?.title ?? "",
      architectureDesc: t.architecture?.desc ?? "",
      architectureNodes: nodesToLines(t.architecture?.nodes),
    })),
  }),
  unflatten: (f) => ({
    eyebrow: f.eyebrow,
    title: f.title,
    description: f.description,
    tiers: (f.tiers ?? []).map((t: AnyRec, i: number) => ({
      id: slugify(String(t.label ?? ""), `tier-${i + 1}`),
      label: t.label,
      title: t.title,
      description: t.description,
      metrics: linesToPairs(t.metrics),
      architecture: {
        title: t.architectureTitle ?? "",
        desc: t.architectureDesc ?? "",
        nodes: linesToNodes(t.architectureNodes),
      },
    })),
  }),
};

const faq: SectionSpec = {
  section: {
    id: "faq",
    label: "FAQs",
    description: "The FAQ heading and the question list. The category tabs are built automatically from each question's category.",
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
        { name: "category", label: "Category", type: "text" },
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
      category: q.category ?? "",
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

export const SOFTWAREENTERPRISE_SECTION_SPECS: Record<string, SectionSpec> = {
  hero,
  capabilities,
  scaleTiers,
  faq,
};

// Section order shown on the page + in the admin.
export const SOFTWAREENTERPRISE_SECTION_IDS = ["hero", "capabilities", "scaleTiers", "faq"] as const;

export function getSoftwareEnterpriseSectionSpec(sectionId: string): SectionSpec | undefined {
  return SOFTWAREENTERPRISE_SECTION_SPECS[sectionId];
}

/** Raw nested default for a section: the seeded SE content by slug, else `{}`. */
export function softwareenterpriseDefault(slug: string, sectionId: string): AnyRec {
  return (SOFTWARE_ENTERPRISE_CONTENT[slug] as AnyRec)?.[sectionId] ?? {};
}
