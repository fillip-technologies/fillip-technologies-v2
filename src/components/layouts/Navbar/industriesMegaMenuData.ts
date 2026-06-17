import type { MegaMenuItem } from "./types";

export const INDUSTRIES_MENU = [
  {
    label: "Healthcare",
    href: "/industries/healthcare",
  },
  {
    label: "Finance",
    href: "/industries/finance",
  },
  {
    label: "Retail",
    href: "/industries/retail",
  },
  {
    label: "Education",
    href: "/industries/education",
  },
  {
    label: "Real Estate",
    href: "/industries/real-estate",
  },
  {
    label: "Logistics",
    href: "/industries/logistics",
  },
] as const satisfies readonly (string | MegaMenuItem)[];
