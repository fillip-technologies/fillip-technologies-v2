import "server-only";

import { JsonServiceContentSource } from "./json-source";

const contentSource = new JsonServiceContentSource();

export function getServiceLandingPage(slug: string) {
  return contentSource.getBySlug(slug);
}

export function getServiceLandingPageSlugs() {
  return contentSource.getAllSlugs();
}

export { assembleLandingPage, getServiceFamily } from "./json-source";
export type { ServiceFamily } from "./json-source";
