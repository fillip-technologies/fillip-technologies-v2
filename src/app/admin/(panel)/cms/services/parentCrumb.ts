import "server-only";

import { isSolutionTemplate } from "@/server/content/servicepage-templates";
import { getCategory } from "@/server/content/whatwedo-registry";

export type Crumb = { label: string; href: string };

/**
 * Where a service page's editor breadcrumb should point back to: its Solutions
 * area, its What-We-Do column (`/admin/cms/category/<slug>`), or the generic
 * Service Pages list as a fallback. Mirrors how the CMS hub is grouped.
 */
export async function servicePageParentCrumb(page: {
  template: string;
  categorySlug: string | null;
}): Promise<Crumb> {
  if (isSolutionTemplate(page.template)) {
    return { label: "Solutions", href: "/admin/cms/solutions" };
  }
  if (page.categorySlug) {
    const category = await getCategory(page.categorySlug);
    if (category && category.group !== "solutions") {
      return { label: category.label, href: `/admin/cms/category/${category.slug}` };
    }
  }
  return { label: "Service Pages", href: "/admin/cms/services" };
}
