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

/**
 * Lead lifecycle statuses — the admin advances a lead through these as they work
 * it. `value` is stored on the lead; `label` is shown in the UI.
 */
export const LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in-progress", label: "In Progress" },
  { value: "converted", label: "Converted" },
  { value: "disqualified", label: "Disqualified" },
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number]["value"];

/** Valid status values (for server-side validation). */
export const LEAD_STATUS_VALUES: readonly string[] = LEAD_STATUSES.map((s) => s.value);

export function labelForStatus(status: string): string {
  return LEAD_STATUSES.find((s) => s.value === status)?.label ?? status;
}
