import { absoluteUrl, isInternalUrl, normalizeCanonical, normalizePath } from "./urls";
import type { SeoIssue, SeoPageRecord, SeoPageStatus } from "./types";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const statuses: SeoPageStatus[] = ["draft", "review", "published", "archived"];

export function validateSeoRecords(records: SeoPageRecord[]): SeoIssue[] {
  const issues: SeoIssue[] = [];
  const canonicalMap = new Map<string, SeoPageRecord[]>();
  const slugMap = new Map<string, SeoPageRecord[]>();
  const titleMap = new Map<string, SeoPageRecord[]>();
  const descriptionMap = new Map<string, SeoPageRecord[]>();

  for (const record of records) {
    issues.push(...validateSeoRecord(record));
    add(canonicalMap, normalizeCanonical(record.canonical || ""), record);
    if (record.slug) add(slugMap, `${record.kind}:${record.slug}`, record);
    add(titleMap, record.title.trim().toLowerCase(), record);
    add(descriptionMap, record.description.trim().toLowerCase(), record);
  }

  pushDuplicates(issues, canonicalMap, "ERROR", "DUPLICATE_CANONICAL", "Duplicate canonical URL");
  pushDuplicates(issues, slugMap, "ERROR", "DUPLICATE_SLUG", "Duplicate slug in route namespace");
  pushDuplicates(issues, titleMap, "WARNING", "DUPLICATE_TITLE", "Duplicate meta title");
  pushDuplicates(issues, descriptionMap, "WARNING", "DUPLICATE_DESCRIPTION", "Duplicate meta description");

  return issues;
}

export function validateSeoRecord(record: SeoPageRecord): SeoIssue[] {
  const issues: SeoIssue[] = [];
  const path = record.path;
  if (!record.title?.trim()) error(issues, "MISSING_TITLE", "Missing title", path, record.source);
  if (!record.description?.trim()) error(issues, "MISSING_DESCRIPTION", "Missing description", path, record.source);
  if (!record.canonical?.trim()) error(issues, "MISSING_CANONICAL", "Missing canonical", path, record.source);
  if (record.canonical && !isValidCanonical(record.canonical)) {
    error(issues, "INVALID_CANONICAL", "Invalid canonical URL", path, record.source);
  }
  if (record.slug && !slugPattern.test(record.slug)) {
    error(issues, "INVALID_SLUG", "Invalid slug", path, record.source);
  }
  if (!statuses.includes(record.status)) {
    error(issues, "INVALID_STATUS", "Invalid status", path, record.source);
  }
  if (record.kind !== "static" && record.kind !== "home" && !record.h1?.trim()) {
    error(issues, "MISSING_H1", "Missing H1 signal", path, record.source);
  }
  if (!record.openGraph?.image) {
    warning(issues, "MISSING_OG_IMAGE", "Missing Open Graph image", path, record.source);
  }
  if (!record.twitter?.image && !record.openGraph?.image) {
    warning(issues, "MISSING_TWITTER_IMAGE", "Missing Twitter image", path, record.source);
  }
  if ((record.kind === "landing" || record.kind === "service") && !record.faq?.length) {
    warning(issues, "MISSING_FAQ", "Missing FAQ data", path, record.source);
  }
  if (!record.schema?.breadcrumb && !record.breadcrumbs?.length) {
    warning(issues, "MISSING_BREADCRUMB_SCHEMA", "Missing Breadcrumb schema input", path, record.source);
  }
  if (record.city && !record.schema?.localBusiness) {
    warning(issues, "MISSING_LOCALBUSINESS_SCHEMA", "Missing LocalBusiness schema input", path, record.source);
  }
  for (const image of record.imageAlts ?? []) {
    if (!image.decorative && !image.alt?.trim()) {
      warning(issues, "MISSING_ALT_TEXT", `Missing alt text for ${image.src}`, path, record.source);
    }
  }
  if ((record.internalLinks?.length ?? 0) < 2) {
    info(issues, "LOW_INTERNAL_LINKS", "Low internal link signal", path, record.source);
  }
  if (!record.relatedContent?.length && record.kind === "blog") {
    info(issues, "MISSING_RELATED_CONTENT", "Missing related content signal", path, record.source);
  }
  if (!record.h1 || !record.title.toLowerCase().includes(firstMeaningfulWord(record.h1))) {
    info(issues, "WEAK_HEADING_HIERARCHY", "Title and H1 signals may be weakly aligned", path, record.source);
  }
  return issues;
}

export function groupIssuesBySeverity(issues: SeoIssue[]) {
  return {
    ERROR: issues.filter((issue) => issue.severity === "ERROR"),
    WARNING: issues.filter((issue) => issue.severity === "WARNING"),
    INFO: issues.filter((issue) => issue.severity === "INFO"),
  };
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

function add(map: Map<string, SeoPageRecord[]>, key: string, record: SeoPageRecord) {
  if (!key) return;
  const normalized = isInternalUrl(key) ? normalizeCanonical(key) : absoluteUrl(key);
  map.set(normalized, [...(map.get(normalized) ?? []), record]);
}

function pushDuplicates(
  issues: SeoIssue[],
  map: Map<string, SeoPageRecord[]>,
  severity: SeoIssue["severity"],
  code: string,
  message: string
) {
  for (const [key, records] of map) {
    if (records.length < 2) continue;
    for (const record of records) {
      issues.push({
        severity,
        code,
        message: `${message}: ${key}`,
        path: record.path,
        source: record.source,
      });
    }
  }
}

function error(issues: SeoIssue[], code: string, message: string, path?: string, source?: string) {
  issues.push({ severity: "ERROR", code, message, path, source });
}

function warning(issues: SeoIssue[], code: string, message: string, path?: string, source?: string) {
  issues.push({ severity: "WARNING", code, message, path, source });
}

function info(issues: SeoIssue[], code: string, message: string, path?: string, source?: string) {
  issues.push({ severity: "INFO", code, message, path, source });
}

function firstMeaningfulWord(value: string): string {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .find((word) => word.length > 3) ?? "";
}

