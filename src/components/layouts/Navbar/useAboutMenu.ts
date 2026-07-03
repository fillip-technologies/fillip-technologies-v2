"use client";

import { useEffect, useState } from "react";
import { ABOUT_MENU, type AboutMenuItem } from "./aboutMegaMenuData";

/**
 * Reads the CMS-managed "About" dropdown items from /api/nav/about, starting
 * from the static defaults so the menu renders instantly and updates once the
 * saved items load.
 */
export function useAboutMenu(): AboutMenuItem[] {
  const [items, setItems] = useState<AboutMenuItem[]>(ABOUT_MENU);

  useEffect(() => {
    let alive = true;
    fetch("/api/nav/about")
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
  }, []);

  return items;
}
