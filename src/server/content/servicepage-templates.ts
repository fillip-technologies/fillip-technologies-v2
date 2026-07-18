/**
 * Lightweight, client-safe metadata for the Service Pages CMS templates. Kept
 * free of the (heavy, server-side) section schemas so client components can
 * import just the id/label/urlPrefix. The section schemas + codecs are resolved
 * separately in `servicepage-schema.ts` (server only).
 */

export type ServiceTemplateMeta = {
  id: string;
  label: string;
  urlPrefix: string; // where the public page lives, e.g. "/services"
};

export const SERVICE_TEMPLATES: ServiceTemplateMeta[] = [
  { id: "service", label: "Service page", urlPrefix: "/services" },
  { id: "mobile-app", label: "Mobile app page", urlPrefix: "/mobile-app-development" },
  { id: "software-enterprise", label: "Software & Enterprise page", urlPrefix: "/software-development" },
  { id: "creative-design", label: "Creative / Design page", urlPrefix: "/design" },
  { id: "creative-experience", label: "Creative Experience (Graphic-style) page", urlPrefix: "/design" },
  { id: "marketing", label: "SEO / Marketing page", urlPrefix: "/marketing" },
  { id: "performance-marketing", label: "Performance Marketing (Ads) page", urlPrefix: "/marketing" },
  { id: "hardware-solution", label: "Hardware Solution page", urlPrefix: "/hardware-solutions" },
  { id: "business-solution", label: "Business Solution page", urlPrefix: "/solutions" },
];

// Templates that back the Solutions mega menu — managed under the separate
// "Soln" CMS area, not the general "Service Pages" list.
export const SOLUTION_TEMPLATE_IDS = ["hardware-solution", "business-solution"] as const;

export function isSolutionTemplate(id: string): boolean {
  return (SOLUTION_TEMPLATE_IDS as readonly string[]).includes(id);
}

const DEFAULT_TEMPLATE = SERVICE_TEMPLATES[0];

export function getTemplateMeta(id: string): ServiceTemplateMeta {
  return SERVICE_TEMPLATES.find((t) => t.id === id) ?? DEFAULT_TEMPLATE;
}

/** Public URL prefix for a template, e.g. "service" → "/services". */
export function templateUrlPrefix(id: string): string {
  return getTemplateMeta(id).urlPrefix;
}

export function isTemplateId(id: string): boolean {
  return SERVICE_TEMPLATES.some((t) => t.id === id);
}
