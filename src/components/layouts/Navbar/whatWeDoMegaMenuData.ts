export type MegaMenuItem = {
  label: string;
  href?: string;
};

export type MegaMenuGroup = {
  title: string;
  items?: MegaMenuItem[];
};

// A menu group that can link its own title (used for the dynamic, DB-driven
// category groups whose header points at the /what-we-do/<slug> landing page).
export type LinkableMegaMenuGroup = {
  title: string;
  href?: string;
  items?: MegaMenuItem[];
};

export type WhatWeDoCategory = {
  slug: string;
  label: string;
  href: string;
  // Sub-links under the category header. Admin-managed (from the API); may be
  // absent on older payloads, in which case the static defaults are used.
  items?: MegaMenuItem[];
};

export const WHAT_WE_DO_MENU: MegaMenuGroup[][] = [
  [
    {
      title: "Web Development",
      items: [
        {
          label: "Custom Website Development",
          href: "/services/website-development",
        },
        {
          label: "E-Commerce Development",
          href: "/services/ecommerce-development",
        },
        {
          label: "WordPress Development",
          href: "/services/wordpress-development",
        },
        {
          label: "Web Application Development",
          href: "/services/web-application-development",
        },
        {
          label: "Website Redesign",
          href: "/services/website-redesign",
        },
        {
          label: "Website Maintenance",
          href: "/services/website-maintenance",
        },
      ],
    },
    {
      title: "Mobile App Development",
      items: [
        {
          label: "Android App Development",
          href: "/mobile-app-development/android",
        },
        {
          label: "iOS App Development",
          href: "/mobile-app-development/ios",
        },
        
        {
          label: "Enterprise Mobile Applications",
          href: "/mobile-app-development/enterprise",
        },
        {
          label: "E-Commerce Mobile Solutions",
          href: "/mobile-app-development/ecommerce",
        },
       
        {
          label: "Business Process Automation Apps",
          href: "/mobile-app-development/business-automation",
        },
        {
          label: "App UI/UX Design",
          href: "/mobile-app-development/app-ui-ux-design",
        },
      ],
    },
  ],
  [
    {
      title: "Software & Enterprise",
      items: [
        {
          label: "Software Development",
          href: "/services/software-development",
        },
        {
          label: "Custom Software Development",
          href: "/software-development/custom-software-development",
        },
        {
          label: "CRM Development",
          href: "/software-development/crm-development",
        },
        {
          label: "ERP Solutions",
          href: "/software-development/erp-solutions",
        },
        {
          label: "SaaS Product Development",
          href: "/services/saas-product-development",
        },

        {
          label: "API Integration",
          href: "/software-development/api-integration",
        },
      ],
    },
    {
      title: "Creative Experience Design",
      items: [
        {
          label: "UI/UX Designing",
        },
        {
          label: "Product Design",
        },
        {
          label: "Graphics Designing",
          href: "/graphic-designing",
        },
        {
          label: "Logo Designing",
        },
        {
          label: "Brand Identity",
        },
        {
          label: "Motion & Video Design",
        },
      ],
    },
  ],
  [
    {
      title: "SEO & Performance Marketing",
      items: [
        {
          label: "Technical SEO",
          href: "/technical-seo",
        },
        {
          label: "Local SEO",
          href: "/local-seo",
        },
        {
          label: "Enterprise SEO",
          href: "/enterprise-seo",
        },

        {
          label: "Google Ads Management",
          href: "/google-ads-management",
        },
        {
          label: "Fb & Ig Ads Management",
          href: "/performance-marketing",
        },

        {
          label: "Youtube Ads Campaign",
          href: "/youtube-ads-campaign",
        },
        {
          label: "WhatsApp Ads Campaign",
          href: "/whatsapp-ads-campaign",
        },
        {
          label: "Lead Generation Campaigns",
          href: "/lead-generation-campaigns",
        },
      ],
    },

    {
  title: "Challenges We Solve",
  items: [
    {
      label: "My Website Doesn't Generate Leads",
    },
    {
      label: "I Struggle to Generate Quality Leads",
    },
    {
      label: "My Business Isn't Ranking on Google",
    },
    {
      label: "I Have Low Organic Traffic",
    },
   


  ],
}

  ],
];

// Maps each seeded category slug to the curated sub-items shown under its group
// header in the mega menu. New admin-created categories that aren't listed here
// simply render as a header-only linked group.
const TITLE_TO_SLUG: Record<string, string> = {
  "Web Development": "web-development",
  "Mobile App Development": "mobile-app-development",
  "Software & Enterprise": "software-enterprise",
  "Creative Experience Design": "creative-experience-design",
  "SEO & Performance Marketing": "seo-performance-marketing",
  "Challenges We Solve": "challenges-we-solve",
};

export const WHAT_WE_DO_ITEMS_BY_SLUG: Record<string, MegaMenuItem[]> = Object.fromEntries(
  WHAT_WE_DO_MENU.flat()
    .filter((g) => TITLE_TO_SLUG[g.title])
    .map((g) => [TITLE_TO_SLUG[g.title], g.items ?? []])
);

/**
 * Build the mega-menu columns from the published categories (DB-driven). Each
 * category becomes a group whose header links to its landing page, keeping the
 * curated sub-items for known slugs. Distributed round-robin across `columnCount`
 * columns for a balanced layout.
 */
export function buildWhatWeDoColumns(
  categories: WhatWeDoCategory[],
  columnCount = 3
): LinkableMegaMenuGroup[][] {
  const groups: LinkableMegaMenuGroup[] = categories.map((c) => ({
    title: c.label,
    href: c.href,
    // Admin-managed sub-links win; fall back to the curated static defaults for
    // the seeded slugs when the API sends none.
    items: c.items ?? WHAT_WE_DO_ITEMS_BY_SLUG[c.slug] ?? [],
  }));
  const cols: LinkableMegaMenuGroup[][] = Array.from({ length: columnCount }, () => []);
  groups.forEach((g, i) => cols[i % columnCount].push(g));
  return cols;
}
