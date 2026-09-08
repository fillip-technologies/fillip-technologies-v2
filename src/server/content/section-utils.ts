import type { Section } from "./home-sections";

/**
 * Whitelist incoming CMS form data against a section's registered fields and
 * optional list definition. Returns a clean record safe to store in site_content.
 * Called by every save-section server action.
 */
export function whitelistSectionData(
  section: Section,
  data: Record<string, unknown>
): Record<string, unknown> {
  const clean: Record<string, unknown> = {};

  for (const field of section.fields) {
    clean[field.name] = String(data[field.name] ?? "").trim();
  }

  if (section.list) {
    const raw = Array.isArray(data[section.list.name])
      ? (data[section.list.name] as unknown[])
      : [];
    clean[section.list.name] = raw.map((item) => {
      const row = (item ?? {}) as Record<string, unknown>;
      const out: Record<string, string> = {};
      for (const f of section.list!.itemFields) {
        out[f.name] = String(row[f.name] ?? "").trim();
      }
      return out;
    });
  }

  return clean;
}
