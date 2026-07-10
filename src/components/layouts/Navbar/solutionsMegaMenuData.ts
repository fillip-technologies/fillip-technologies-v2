export type SolutionMenuItem = {
  label: string;
  href?: string;
};

export type SolutionMenuColumn = {
  label: string;
  title: string;
  description: string;
  children: SolutionMenuItem[];
};

// A published Solutions category from /api/solutions/categories (DB-driven).
export type SolutionCategory = {
  slug: string;
  label: string;
  description: string;
  items?: SolutionMenuItem[];
};

export const SOLUTIONS_MENU: SolutionMenuColumn[] = [
  {
    label: "Business Solutions",
    title: "Business Solutions",
    description: "Digital products, automation, and enterprise software for growth.",
    children: [
      {
        label: "Ticket Booking Solution",
        href: "/solutions/ticket-booking",
      },
      {
        label: "SMS Communication Solution",
        href: "/solutions/sms-communication",
      },
      {
        label: "WhatsApp Business Solution",
        href: "/solutions/whatsapp-business",
      },
    ],
  },
  {
    label: "Hardware Solutions",
    title: "Hardware Solutions",
    description: "Secure infrastructure, devices, and workplace technology systems.",
    children: [
      {
        label: "Security Surveillance",
        href: "/hardware-solutions/security-surveillance",
      },
      {
        label: "Fiber Optic Connectivity",
        href: "/hardware-solutions/fiber-optic-connectivity",
      },
      {
        label: "Local Area Network",
        href: "/hardware-solutions/local-area-network",
      },
      {
        label: "Control Room",
        href: "/hardware-solutions/control-room",
      },
      {
        label: "Networking",
        href: "/hardware-solutions/networking",
      },
      {
        label: "Server Solutions",
        href: "/hardware-solutions/server-solutions",
      },
      {
        label: "Wide Area Network",
        href: "/hardware-solutions/wide-area-network",
      },
      {
        label: "System Integration",
        href: "/hardware-solutions/system-integration",
      },
      {
        label: "IT Infrastructure",
        href: "/hardware-solutions/it-infrastructure",
      },
      {
        label: "GPS Solution",
        href: "/hardware-solutions/gps-solution",
      },
    ],
  },
];

/**
 * Build the Solutions mega-menu columns from the published categories
 * (DB-driven). Falls back to the curated static items for a category when the
 * API sends none. Mirrors buildWhatWeDoColumns.
 */
export function buildSolutionsColumns(
  categories: SolutionCategory[]
): SolutionMenuColumn[] {
  const staticBySlug: Record<string, SolutionMenuColumn> = Object.fromEntries(
    SOLUTIONS_MENU.map((c) => [slugifyColumn(c.title), c])
  );
  return categories.map((c) => ({
    label: c.label,
    title: c.label,
    description: c.description || staticBySlug[c.slug]?.description || "",
    children: c.items && c.items.length ? c.items : staticBySlug[c.slug]?.children ?? [],
  }));
}

/** Kebab-case a column title to match its seeded category slug. */
function slugifyColumn(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
