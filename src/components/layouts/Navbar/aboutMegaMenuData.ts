export type AboutMenuItem = { label: string; href: string };

// Default items — used as the fallback when the CMS has no `nav.about` row yet.
export const ABOUT_MENU: AboutMenuItem[] = [
  { label: "Our Story", href: "/our-story" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Our Culture", href: "/our-culture" },
];
