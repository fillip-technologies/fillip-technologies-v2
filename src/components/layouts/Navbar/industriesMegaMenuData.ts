import type { MegaMenuItem } from "./types";

export const INDUSTRIES_MENU = [
  {
    label: "Healthcare",
    href: "/industries/healthcare-web-design",
  },
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Travel & Hospitality",
  "Real Estate",
  "Logistics",
] as const satisfies readonly (string | MegaMenuItem)[];
