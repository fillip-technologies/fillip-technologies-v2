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
];

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
