import "server-only";

import { getContentData } from "./queries";
import { getPageGroup, getPageSection, pageSectionDefaults } from "./page-sections";
import type { SecuritySurveillanceContent } from "@/components/Hardware-solution/content";
import type { WhatsAppBusinessContent } from "@/components/solutions/content";
import type { TicketBookingContent } from "@/components/solutions/ticket-content";
import type { SmsCommunicationContent } from "@/components/solutions/sms-content";

/**
 * Assemble the full, typed content object for a CMS-driven solution page by
 * reading every registered section (merged: registry defaults + saved edits).
 * Used by the /solutions, /hardware-solutions and standalone routes.
 */
async function buildPageContent(groupId: string): Promise<Record<string, unknown>> {
  const group = getPageGroup(groupId);
  if (!group) return {};
  const entries = await Promise.all(
    group.sections.map(async (section) => {
      const data = await getContentData(
        `page.${groupId}.${section.id}`,
        pageSectionDefaults(getPageSection(groupId, section.id)!)
      );
      return [section.id, data] as const;
    })
  );
  return Object.fromEntries(entries);
}

export async function getSecuritySurveillanceContent(): Promise<SecuritySurveillanceContent> {
  const content = await buildPageContent("security-surveillance");
  return content as unknown as SecuritySurveillanceContent;
}

export async function getWhatsAppBusinessContent(): Promise<WhatsAppBusinessContent> {
  const content = await buildPageContent("whatsapp-business");
  return content as unknown as WhatsAppBusinessContent;
}

export async function getTicketBookingContent(): Promise<TicketBookingContent> {
  const content = await buildPageContent("ticket-booking");
  return content as unknown as TicketBookingContent;
}

export async function getSmsCommunicationContent(): Promise<SmsCommunicationContent> {
  const content = await buildPageContent("sms-communication");
  return content as unknown as SmsCommunicationContent;
}
