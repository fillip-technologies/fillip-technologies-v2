import { getContentData } from "@/server/content/queries";
import { listPublishedIndustries } from "@/server/content/industry-registry";
import type { AboutMenuItem } from "@/components/layouts/Navbar/aboutMegaMenuData";
import { NAV_MENUS, type NavMenuId } from "./menus";

/**
 * The Industries dropdown is generated from the published industry pages that
 * are marked "Show in menu" (source of truth = the `industries` collection —
 * label, slug, sort_order, show_in_menu). A page can be live without being in
 * the dropdown. Falls back to the static defaults only if nothing is published.
 */
async function getIndustriesNav(): Promise<AboutMenuItem[]> {
  const industries = await listPublishedIndustries();
  if (!industries.length) return NAV_MENUS.industries.defaults;
  return industries
    .filter((i) => i.showInMenu !== false)
    .map((i) => ({ label: i.label, href: `/industries/${i.slug}` }));
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
