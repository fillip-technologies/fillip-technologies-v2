import { absoluteUrl, isInternalUrl, normalizeCanonical, normalizePath } from "./urls";
import type { SeoIssue, SeoPageRecord } from "./types";

/**
 * Publish-gate validation. Returns the blocking ERRORs (and any WARNINGs) for a
 * single page. The admin publish action refuses to publish while any ERROR
 * exists. This enforces the product spec's blocking rules; the broader
 * `validateSeoRecords` in `./validation` stays as the audit-report validator.
 */

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const statuses = ["draft", "review", "published", "archived"];

export function validateForPublish(record: SeoPageRecord, allRecords: SeoPageRecord[]): SeoIssue[] {
  const issues: SeoIssue[] = [];
  const path = record.path;
  const err = (code: string, message: string) =>
    issues.push({ severity: "ERROR", code, message, path, source: record.source });
  const warn = (code: string, message: string) =>
    issues.push({ severity: "WARNING", code, message, path, source: record.source });

  // Slug
  if (!record.slug?.trim()) err("MISSING_SLUG", "Slug is required.");
  else if (!slugPattern.test(record.slug)) err("INVALID_SLUG", `Invalid slug "${record.slug}". Use lowercase letters, numbers and dashes.`);

  // Status
  if (!statuses.includes(record.status)) err("INVALID_STATUS", `Invalid status "${record.status}".`);

  // Meta
  if (!record.title?.trim()) err("MISSING_TITLE", "Meta title is required.");
  if (!record.description?.trim()) err("MISSING_DESCRIPTION", "Meta description is required.");

  // Canonical
  const canonical = record.canonical?.trim();
  if (!canonical) err("MISSING_CANONICAL", "Canonical URL is required.");
  else if (!isValidCanonical(canonical)) err("INVALID_CANONICAL", "Canonical URL is invalid.");

  // H1
  if (!record.h1?.trim()) err("MISSING_H1", "H1 is required.");

  // Open Graph image
  if (!record.openGraph?.image?.trim()) err("MISSING_OG_IMAGE", "Open Graph image is required.");

  // Service pages need a service name
  if (record.kind === "service" && !record.serviceName?.trim()) {
    err("MISSING_SERVICE_NAME", "Service name is required for service pages.");
  }

  // City is a soft signal only (warn, never blocks).
  if (record.city && !record.city.name?.trim()) {
    warn("MISSING_CITY", "City name is empty for a local page.");
  }

  // FAQ completeness — every listed FAQ needs both a question and an answer.
  for (const item of record.faq ?? []) {
    const q = item.question?.trim();
    const a = item.answer?.trim();
    if ((q && !a) || (!q && a)) {
      err("INCOMPLETE_FAQ", "Every FAQ must have both a question and an answer.");
      break;
    }
  }

  // Image alt text
  for (const image of record.imageAlts ?? []) {
    if (image.src && !image.decorative && !image.alt?.trim()) {
      err("MISSING_ALT_TEXT", `Image "${image.src}" is missing alt text.`);
      break;
    }
  }

  // Duplicate slug / canonical across the whole site.
  issues.push(...duplicateIssues(record, allRecords));

  return issues;
}

/** Convenience: only the blocking issues. */
export function publishBlockers(record: SeoPageRecord, allRecords: SeoPageRecord[]): SeoIssue[] {
  return validateForPublish(record, allRecords).filter((i) => i.severity === "ERROR");
}

function duplicateIssues(record: SeoPageRecord, allRecords: SeoPageRecord[]): SeoIssue[] {
  const issues: SeoIssue[] = [];
  const myPath = normalizePath(record.path);
  const myCanonical = canonicalId(record);
  const mySlugKey = record.slug ? `${record.kind}:${record.slug}` : null;

  let canonicalDup = false;
  let slugDup = false;

  for (const other of allRecords) {
    if (normalizePath(other.path) === myPath) continue;
    if (!canonicalDup && canonicalId(other) === myCanonical) {
      issues.push({
        severity: "ERROR",
        code: "DUPLICATE_CANONICAL",
        message: `Canonical URL already used by ${other.path}.`,
        path: record.path,
        source: record.source,
      });
      canonicalDup = true;
    }
    if (!slugDup && mySlugKey && other.slug && `${other.kind}:${other.slug}` === mySlugKey) {
      issues.push({
        severity: "ERROR",
        code: "DUPLICATE_SLUG",
        message: `Slug "${record.slug}" already used by ${other.path}.`,
        path: record.path,
        source: record.source,
      });
      slugDup = true;
    }
    if (canonicalDup && slugDup) break;
  }

  return issues;
}

function canonicalId(record: SeoPageRecord): string {
  const value = record.canonical || record.path;
  return isInternalUrl(value) ? normalizeCanonical(value) : absoluteUrl(value);
}

function isValidCanonical(value: string): boolean {
  try {
    if (/^https?:\/\//i.test(value)) {
      const url = new URL(value);
      return url.protocol === "https:" || url.hostname === "localhost";
    }
    return normalizePath(value).startsWith("/");
  } catch {
    return false;
  }
}
