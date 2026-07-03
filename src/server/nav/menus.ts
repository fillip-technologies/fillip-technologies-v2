import { ABOUT_MENU, type AboutMenuItem } from "@/components/layouts/Navbar/aboutMegaMenuData";
import { INDUSTRIES_MENU } from "@/components/layouts/Navbar/industriesMegaMenuData";

// A nav "menu" is a CMS-managed list of {label, href} items backed by one
// site_content row. Add a menu here + point its dropdown at useNavMenu().
export type NavMenuId = "about" | "industries";
export type NavMenuItem = AboutMenuItem;

export const NAV_MENUS: Record<NavMenuId, { label: string; key: string; defaults: NavMenuItem[] }> = {
  about: { label: "About", key: "nav.about", defaults: ABOUT_MENU },
  industries: {
    label: "Industries",
    key: "nav.industries",
    defaults: INDUSTRIES_MENU.map((i) => ({ label: i.label, href: i.href })),
  },
};

export function isNavMenuId(x: string): x is NavMenuId {
  return x === "about" || x === "industries";
}
