"use client";

import { useEffect, useState } from "react";
import { ABOUT_MENU, type AboutMenuItem } from "./aboutMegaMenuData";

/**
 * Reads a CMS-managed nav dropdown's items from /api/nav/<menu>, starting from
 * the provided defaults so the menu renders instantly and updates once the
 * saved items load.
 */
export function useNavMenu(menuId: string, fallback: AboutMenuItem[]): AboutMenuItem[] {
  const [items, setItems] = useState<AboutMenuItem[]>(fallback);

  useEffect(() => {
    let alive = true;
    fetch(`/api/nav/${menuId}`)
      .then((r) => r.json())
      .then((data) => {
        if (alive && Array.isArray(data?.items) && data.items.length) {
          setItems(data.items as AboutMenuItem[]);
        }
      })
      .catch(() => {
        /* keep defaults on failure */
      });
    return () => {
      alive = false;
    };
  }, [menuId]);

  return items;
}

/** Convenience wrapper for the About dropdown. */
export function useAboutMenu(): AboutMenuItem[] {
  return useNavMenu("about", ABOUT_MENU);
}
