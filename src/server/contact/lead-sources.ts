// Framework-neutral (no server-only) so both the mailer and the admin UI can
// import it. Maps a raw lead `source` string to a human category + label.

/** Human labels for known lead sources; anything else is a generic contact lead. */
export const SOURCE_LABELS: Record<string, string> = {
  "get-a-quote-requirement": "Quote Requirement",
  "get-a-quote-calculator": "Quote Estimate",
  "Consultation Form": "Consultation Request",
  "Contact Page": "Contact Message",
  "Careers Application": "Job Application",
};

export function labelForSource(source: string | null | undefined): string {
  return (source && SOURCE_LABELS[source]) || "Contact Lead";
}

/**
 * Broad categories used to group/filter leads in the admin dashboard. Several
 * raw sources collapse into one category (e.g. both quote flows → "Quotes").
 */
export type LeadCategory = "Quotes" | "Consultations" | "Contact" | "Careers" | "Other";

export function categoryForSource(source: string | null | undefined): LeadCategory {
  switch (source) {
    case "get-a-quote-requirement":
    case "get-a-quote-calculator":
      return "Quotes";
    case "Consultation Form":
      return "Consultations";
    case "Contact Page":
      return "Contact";
    case "Careers Application":
      return "Careers";
    default:
      return "Other";
  }
}

/** Display order for category filter buttons. */
export const LEAD_CATEGORIES: LeadCategory[] = [
  "Quotes",
  "Consultations",
  "Contact",
  "Careers",
  "Other",
];
