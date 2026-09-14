/**
 * CMS registry for standalone pages. Each group maps to one /admin/cms/pages
 * entry and a set of site_content rows keyed `page.<id>.<sectionId>`.
 *
 * Page data lives in per-page files under ./page-sections/. This barrel
 * re-exports the aggregated array and the lookup helpers so all existing
 * callers continue to import from "@/server/content/page-sections" unchanged.
 */

import type { Section } from "./home-sections";
import { sectionDefaults } from "./home-sections";
import { ourStoryGroup } from "./page-sections/our-story";
import { portfolioGroup } from "./page-sections/portfolio";
import { ourCultureGroup } from "./page-sections/our-culture";
import { careersGroup } from "./page-sections/careers";
import { securitySurveillanceGroup } from "./page-sections/security-surveillance";
import { whatsappBusinessGroup } from "./page-sections/whatsapp-business";
import { ticketBookingGroup } from "./page-sections/ticket-booking";
import { smsCommunicationGroup } from "./page-sections/sms-communication";
import { graphicDesigningGroup } from "./page-sections/graphic-designing";

export type PageGroup = {
  id: string;
  label: string;
  description: string;
  sections: Section[];
};

export const ABOUT_PAGES: PageGroup[] = [
  ourStoryGroup,
  portfolioGroup,
  ourCultureGroup,
  careersGroup,
  securitySurveillanceGroup,
  whatsappBusinessGroup,
  ticketBookingGroup,
  smsCommunicationGroup,
  graphicDesigningGroup,
];

export function getPageGroup(id: string): PageGroup | undefined {
  return ABOUT_PAGES.find((p) => p.id === id);
}

export function getPageSection(groupId: string, sectionId: string): Section | undefined {
  return getPageGroup(groupId)?.sections.find((s) => s.id === sectionId);
}

export function pageSectionDefaults(section: Section): Record<string, unknown> {
  return sectionDefaults(section);
}
