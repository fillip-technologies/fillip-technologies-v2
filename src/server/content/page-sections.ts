/**
 * CMS registry for the standalone "About" pages (Our Story, Portfolio, Our
 * Culture). Mirrors the Home page registry ([[home-sections]]) but grouped per
 * page. Each section maps to one `site_content` row keyed `page.<page>.<id>`.
 *
 * Reuses the Section/Field types + generic editor from home-sections. Only
 * section-level text/images are editable here; decorative card lists (timeline
 * chapters, portfolio projects, culture pillars) stay in code.
 */

import type { Section } from "./home-sections";
import { sectionDefaults } from "./home-sections";

export type PageGroup = {
  id: string; // matches the route slug, e.g. "our-story"
  label: string;
  description: string;
  sections: Section[];
};

export const ABOUT_PAGES: PageGroup[] = [
  {
    id: "our-story",
    label: "Our Story",
    description: "The /our-story page.",
    sections: [
      {
        id: "hero",
        label: "Hero",
        description: "The cover title block at the top of the page.",
        ready: true,
        fields: [
          { name: "badge", label: "Badge", type: "text", default: "Volume 01: The Journey" },
          { name: "headingLead", label: "Heading — line 1", type: "text", default: "The Story of" },
          { name: "headingHighlight", label: "Heading — line 2 (highlighted)", type: "text", default: "Fillip Technologies" },
          {
            name: "subheadline",
            label: "Sub-headline",
            type: "textarea",
            default:
              "Explore the milestones, minds, and methodologies that built our agency from a three-person workspace into a powerhouse of digital transformation.",
          },
        ],
      },
      {
        id: "missionvision",
        label: "Mission / Vision (Afterword)",
        description: "The three columns (Mission, Vision, Creed) and closing signature.",
        ready: true,
        fields: [
          { name: "eyebrow", label: "Eyebrow", type: "text", default: "AFTERWORD" },
          { name: "heading", label: "Heading", type: "text", default: "The Next Chapter" },
          {
            name: "missionText",
            label: "Our Mission",
            type: "textarea",
            default:
              "To empower modern brands with high-performance custom engineering and search optimization, transforming complex operational workflows and marketing budgets into measurable business growth.",
          },
          {
            name: "visionText",
            label: "Our Vision",
            type: "textarea",
            default:
              "To establish ourselves as a global benchmark for digital execution, proving that client transparency, clean scalable code, and creative engineering can consistently win on the international stage.",
          },
          {
            name: "creedText",
            label: "Our Creed",
            type: "textarea",
            default:
              "We make commitments, not excuses. We work with absolute accountability, refuse code shortcuts, and measure our agency's reputation directly by the scalability and success of the products we launch.",
          },
          { name: "signatureLead", label: "Signature line", type: "text", default: "Signed in code and character," },
          { name: "signatureName", label: "Signature name", type: "text", default: "The Fillip Team" },
        ],
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    description: "The /portfolio page.",
    sections: [
      {
        id: "hero",
        label: "Hero",
        description: "Heading + intro above the project card fan (the projects stay in code).",
        ready: true,
        fields: [
          { name: "headingLead", label: "Heading — line 1", type: "text", default: "Ideas shaped into" },
          { name: "headingHighlight", label: "Heading — line 2 (highlighted)", type: "text", default: "digital experiences." },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            default:
              "Explore digital products, platforms and growth experiences built by Fillip Technologies for ambitious businesses and public institutions.",
          },
        ],
      },
    ],
  },
  {
    id: "our-culture",
    label: "Our Culture",
    description: "The /our-culture page.",
    sections: [
      {
        id: "hero",
        label: "Hero",
        description: "Badge + heading of the culture hero (the pillar cards stay in code).",
        ready: true,
        fields: [
          { name: "badge", label: "Badge", type: "text", default: "Our Culture" },
          { name: "headingLead", label: "Heading — line 1", type: "text", default: "Shaping ideas through" },
          { name: "headingHighlight", label: "Heading — line 2 (highlighted)", type: "text", default: "collaborative minds." },
        ],
      },
    ],
  },
];

export function getPageGroup(id: string): PageGroup | undefined {
  return ABOUT_PAGES.find((p) => p.id === id);
}

export function getPageSection(groupId: string, sectionId: string): Section | undefined {
  return getPageGroup(groupId)?.sections.find((s) => s.id === sectionId);
}

/** Default data for a page section (scalar defaults + any list defaults). */
export function pageSectionDefaults(section: Section): Record<string, unknown> {
  return sectionDefaults(section);
}
