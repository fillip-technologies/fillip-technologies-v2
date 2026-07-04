import type { MegaMenuItem } from "./types";

export const INDUSTRIES_MENU = [
  {
    label: "Healthcare Industries",
    href: "/industries/healthcare",
  },
  {
    label: "Finance Industries",
    href: "/industries/finance",
  },
  {
    label: "Retail Industries",
    href: "/industries/retail",
  },
  {
    label: "Education Industries",
    href: "/industries/education",
  },
  {
    label: "Real Estate Industries",
    href: "/industries/real-estate",
  },
  {
    label: "Logistics Industries",
    href: "/industries/logistics",
  },
] as const satisfies readonly (string | MegaMenuItem)[];
