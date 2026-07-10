import type { HardwareSolutionPage } from "@/data/hardware-solutions";
import { hardwareSolutionPages } from "@/data/hardware-solutions";
import { ticketBookingContent } from "./ticketBooking";
import { smsCommunicationContent } from "./smsCommunication";
import { whatsappBusinessContent } from "./whatsappBusiness";

export type SolutionPageContent = HardwareSolutionPage;

/** The Business Solutions pages (shared "solution" page shape). */
export const BUSINESS_SOLUTION_CONTENT: Record<string, SolutionPageContent> = {
  "ticket-booking": ticketBookingContent,
  "sms-communication": smsCommunicationContent,
  "whatsapp-business": whatsappBusinessContent,
};

/**
 * All seeded Solution pages (hardware + business), keyed by slug. Drives the CMS
 * defaults (fallback until edited) and the public routes' static fallback.
 */
export const SOLUTION_CONTENT: Record<string, SolutionPageContent> = {
  ...Object.fromEntries(hardwareSolutionPages.map((p) => [p.slug, p])),
  ...BUSINESS_SOLUTION_CONTENT,
};

/** Look up seeded solution content by slug (hardware or business). */
export function getSolutionBySlug(slug: string): SolutionPageContent | undefined {
  return SOLUTION_CONTENT[slug];
}

/** Look up a Business Solution page by slug. */
export function getBusinessSolutionBySlug(slug: string): SolutionPageContent | undefined {
  return BUSINESS_SOLUTION_CONTENT[slug];
}
