import { getContentData } from "@/server/content/queries";
import { listPublishedIndustries } from "@/server/content/industry-registry";
import type { AboutMenuItem } from "@/components/layouts/Navbar/aboutMegaMenuData";
import { NAV_MENUS, type NavMenuId } from "./menus";

/**
 * The Industries dropdown is auto-generated from the published industry pages
 * (source of truth = the `industries` collection — label, slug and sort_order).
 * Publishing/unpublishing a page adds/removes it from the nav automatically.
 * Falls back to the static defaults if nothing is published yet.
 */
async function getIndustriesNav(): Promise<AboutMenuItem[]> {
  const industries = await listPublishedIndustries();
  const items = industries.map((i) => ({ label: i.label, href: `/industries/${i.slug}` }));
  return items.length ? items : NAV_MENUS.industries.defaults;
}

/**
 * The items for a nav dropdown. `industries` is derived from published pages;
 * other menus are admin-managed via the CMS, falling back to the hard-coded
 * defaults when nothing has been saved yet. Safe to call from Server
 * Components / Route Handlers.
 */
export async function getNavMenu(menuId: NavMenuId): Promise<AboutMenuItem[]> {
  if (menuId === "industries") return getIndustriesNav();

  const menu = NAV_MENUS[menuId];
  const data = await getContentData<{ items: AboutMenuItem[] }>(menu.key, { items: menu.defaults });
  const items = Array.isArray(data.items) ? data.items : menu.defaults;
  const clean = items.filter(
    (i) => i && typeof i.label === "string" && typeof i.href === "string" && i.label && i.href
  );
  return clean.length ? clean : menu.defaults;
}

// Back-compat helper.
export function getAboutMenu(): Promise<AboutMenuItem[]> {
  return getNavMenu("about");
}
