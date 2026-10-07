import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";
import shared from "./shared.json";
import links from "./links.json";
import ai from "./ai.json";
import dedicated from "./dedicated.json";
import fullStack from "./full-stack.json";
import python from "./python.json";
import react from "./react.json";
import nodejs from "./nodejs.json";
import nextjs from "./nextjs.json";
import flutter from "./flutter.json";
import reactNative from "./react-native.json";
import laravel from "./laravel.json";
import php from "./php.json";
import wordpress from "./wordpress.json";
import shopify from "./shopify.json";
import type { HireDeveloperLink, HireImage, HireImageSlots, HireRoleContent, HireRoleFile } from "./types";

const ROLE_FILES: Record<string, HireRoleFile> = {
  ai: ai as HireRoleFile,
  dedicated: dedicated as HireRoleFile,
  "full-stack": fullStack as HireRoleFile,
  python: python as HireRoleFile,
  react: react as HireRoleFile,
  nodejs: nodejs as HireRoleFile,
  nextjs: nextjs as HireRoleFile,
  flutter: flutter as HireRoleFile,
  "react-native": reactNative as HireRoleFile,
  laravel: laravel as HireRoleFile,
  php: php as HireRoleFile,
  wordpress: wordpress as HireRoleFile,
  shopify: shopify as HireRoleFile,
};

export const hireDeveloperLinks = links as HireDeveloperLink[];

// Sections where a role file is merged over the shared defaults (shallow,
// per section: a role can override just `title`, or the whole section).
const MERGED_SECTIONS = [
  "hero",
  "capabilities",
  "techStack",
  "specialists",
  "useCases",
  "whyFillip",
  "engagementModels",
  "hiringProcess",
  "collaboration",
  "caseStudies",
  "security",
  "cost",
  "faq",
  "finalCta",
] as const;

function fillTokens<T>(value: T, role: HireRoleContent["role"]): T {
  if (typeof value === "string") {
    return value
      .replaceAll("{roles}", role.plural)
      .replaceAll("{role}", role.singular)
      .replaceAll("{Plural}", role.Plural)
      .replaceAll("{Singular}", role.Singular)
      .replaceAll("{short}", role.short)
      .replaceAll("{Short}", role.Short)
      .replace(/\s{2,}/g, " ")
      .trim() as T;
  }
  if (Array.isArray(value)) return value.map((v) => fillTokens(v, role)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, fillTokens(v, role)]),
    ) as T;
  }
  return value;
}

// An image slot whose file is not in /public yet renders the section's
// designed fallback instead — drop the file in and it appears.
function existingImage(img: HireImage | null | undefined): HireImage | null {
  if (!img?.src) return null;
  if (/^https?:\/\//.test(img.src)) return img;
  return existsSync(path.join(process.cwd(), "public", img.src)) ? img : null;
}

function resolveImages(images: HireImageSlots): HireImageSlots {
  return Object.fromEntries(
    Object.entries(images).map(([slot, img]) => [slot, existingImage(img)]),
  ) as HireImageSlots;
}

export function getHireRoleContent(slug: string): HireRoleContent | null {
  const file = ROLE_FILES[slug];
  if (!file) return null;

  const base = shared as unknown as Record<string, Record<string, unknown>>;
  const roleFile = file as unknown as Record<string, Record<string, unknown> | undefined>;

  const merged: Record<string, unknown> = {
    slug: file.slug,
    path: file.path,
    role: file.role,
    seo: file.seo,
    images: resolveImages(file.images),
    sections: { ...base.sections, ...file.sections },
  };
  for (const key of MERGED_SECTIONS) {
    merged[key] = { ...(base[key] ?? {}), ...(roleFile[key] ?? {}) };
  }

  const content = merged as unknown as HireRoleContent;

  // Role-specific technology examples for the cost section.
  if (file.costTechnologyItems?.length) {
    content.cost = {
      ...content.cost,
      factors: content.cost.factors.map((f) =>
        f.scale.kind === "options" && f.scale.items.length === 0
          ? { ...f, scale: { kind: "options", items: file.costTechnologyItems! } }
          : f,
      ),
    };
  }
  // Role-specific FAQs first, then the shared hiring FAQs.
  if (file.faqItems?.length) {
    content.faq = { ...content.faq, items: [...file.faqItems, ...content.faq.items] };
  }

  return fillTokens(content, file.role);
}

export function getHireRoleSlugs(): string[] {
  return Object.keys(ROLE_FILES);
}
