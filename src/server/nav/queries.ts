import { getContentData } from "@/server/content/queries";
import type { AboutMenuItem } from "@/components/layouts/Navbar/aboutMegaMenuData";
import { NAV_MENUS, type NavMenuId } from "./menus";

/**
 * The admin-managed items for a nav dropdown. Falls back to the hard-coded
 * defaults when nothing has been saved in the CMS yet. Safe to call from
 * Server Components / Route Handlers.
 */
export async function getNavMenu(menuId: NavMenuId): Promise<AboutMenuItem[]> {
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
