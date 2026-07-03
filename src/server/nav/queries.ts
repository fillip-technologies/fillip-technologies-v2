import { getContentData } from "@/server/content/queries";
import { ABOUT_MENU, type AboutMenuItem } from "@/components/layouts/Navbar/aboutMegaMenuData";

export const ABOUT_MENU_KEY = "nav.about";

/**
 * The admin-managed "About" dropdown items. Falls back to the hard-coded
 * defaults (ABOUT_MENU) when nothing has been saved in the CMS yet. Safe to
 * call from Server Components / Route Handlers.
 */
export async function getAboutMenu(): Promise<AboutMenuItem[]> {
  const data = await getContentData<{ items: AboutMenuItem[] }>(ABOUT_MENU_KEY, {
    items: ABOUT_MENU,
  });
  const items = Array.isArray(data.items) ? data.items : ABOUT_MENU;
  // Keep only well-formed entries; fall back if the row is empty/corrupt.
  const clean = items.filter((i) => i && typeof i.label === "string" && typeof i.href === "string" && i.label && i.href);
  return clean.length ? clean : ABOUT_MENU;
}
