import { siteConfig } from "@/config/site";

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
  return new URL(pathOrUrl).origin === new URL(siteConfig.url).origin;
}

function normalizeAbsoluteUrl(value: string): string {
  const url = new URL(value);
  url.pathname = normalizePathname(url.pathname);
  url.hash = "";
  return url.toString();
}

function normalizePathname(pathname: string): string {
  const [pathOnly, query = ""] = pathname.split("?");
  const cleanPath = pathOnly.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";
  return query ? `${cleanPath}?${query}` : cleanPath;
}
