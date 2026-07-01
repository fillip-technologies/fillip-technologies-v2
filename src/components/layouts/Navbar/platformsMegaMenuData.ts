import type { MegaMenuItem } from "./types";

export const PLATFORMS_MENU: readonly (string | MegaMenuItem)[] = [
  {
    label: "Ticket Booking Platform",
    href: "/ticket-booking",
  },
  "CRM Platform",
  {
    label: "SMS Platform",
    href: "/sms-communication",
  },
];
