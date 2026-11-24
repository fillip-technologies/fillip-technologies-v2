"use client";

import { ABOUT_MENU, type AboutMenuItem } from "./aboutMegaMenuData";
import { useSharedItems } from "./sharedItems";

/**
 * Reads a CMS-managed nav dropdown's items from /api/nav/<menu>, starting from
 * the provided defaults so the menu renders instantly and updates once the
 * saved items load. Pass `enabled: false` to skip the request (defaults only).
 */
export function useNavMenu(
  menuId: string,
  fallback: AboutMenuItem[],
  enabled = true
): AboutMenuItem[] {
  const items = useSharedItems<AboutMenuItem>(enabled ? `/api/nav/${menuId}` : null);
  return items && items.length ? items : fallback;
}

/** Convenience wrapper for the About dropdown. */
export function useAboutMenu(): AboutMenuItem[] {
  return useNavMenu("about", ABOUT_MENU);
}
