import { siteConfig } from "@/config/site";

const SITE_URL = new URL(siteConfig.url);
// The site answers on both the bare and the www host (nginx 301s to siteConfig.url).
// Absolute URLs stored in content with either host are rebased onto the canonical one.
const SITE_HOSTS = new Set([
  SITE_URL.hostname.replace(/^www\./, ""),
  `www.${SITE_URL.hostname.replace(/^www\./, "")}`,
]);

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return normalizeAbsoluteUrl(pathOrUrl);
  return new URL(normalizePath(pathOrUrl), siteConfig.url).toString();
}

export function normalizePath(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    const url = new URL(pathOrUrl);
    return normalizePathname(url.pathname || "/");
  }

  return normalizePathname(pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`);
}

export function normalizeCanonical(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return normalizeAbsoluteUrl(pathOrUrl);
  return normalizePath(pathOrUrl);
}

export function imageUrl(pathOrUrl?: string): string {
  return absoluteUrl(pathOrUrl || siteConfig.defaultOpenGraphImage);
}

export function isInternalUrl(pathOrUrl: string): boolean {
  if (!/^https?:\/\//i.test(pathOrUrl)) return true;
  return SITE_HOSTS.has(new URL(pathOrUrl).hostname);
}

function normalizeAbsoluteUrl(value: string): string {
  const url = new URL(value);
  if (SITE_HOSTS.has(url.hostname)) {
    url.protocol = SITE_URL.protocol;
    url.host = SITE_URL.host;
  }
  url.pathname = normalizePathname(url.pathname);
  url.hash = "";
  return url.toString();
}

function normalizePathname(pathname: string): string {
  const [pathOnly, query = ""] = pathname.split("?");
  const cleanPath = pathOnly.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";
  return query ? `${cleanPath}?${query}` : cleanPath;
}
