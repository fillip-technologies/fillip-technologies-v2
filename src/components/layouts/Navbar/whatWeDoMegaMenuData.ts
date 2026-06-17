export type MegaMenuItem = {
  label: string;
  href?: string;
};

export type MegaMenuGroup = {
  title: string;
  items?: MegaMenuItem[];
};

export const WHAT_WE_DO_MENU: MegaMenuGroup[][] = [
  [

    {
      title: "Application Engineering",
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
          label: "Software Development",
          href: "/services/software-development",
        },
      ],
    },

    {
      title: "Mobile App Development",
      items: [
        {
          label: "Enterprise Mobile Applications",
          href: "/mobile-app-development/enterprise",
        },
        {
          label: "E-Commerce Mobile Solutions",
          href: "/mobile-app-development/ecommerce",
        },
        {
          label: "On-Demand Service Applications",
          href: "/mobile-app-development/on-demand",
        },
        {
          label: "Business Process Automation Apps",
          href: "/mobile-app-development/business-automation",
        },
      ],
    }


  ],
  [
    {
      title: "Search Visibility Engineering",
      items: [
        {
          label: "Technical SEO",
          href: "/technical-seo",
        },

        {
          label: "Local SEO",
        },
        {
          label: "Enterprise SEO",
        },
        {
          label: "AI Search Optimization",
        },
      ],
    },

    {
      title: "Performance Marketing",
      items: [
        {
          label: "Fb & Ig Ads Management",
          href: "/performance-marketing",
        },
        {
          label: "Google Ads Management",
        },
        {
          label: "Youtube Ads Campaign",
        },
        {
          label: "WhatsApp Ads Campaign",
        },
      ],
    },



  ],
  [

    {
      title: "Creative Experience Design",
      items: [
        {
          label: "Marketing Creatives",
        },
        {
          label: "Brand Identity",
        },
        {
          label: "UI/UX Designing",
        },
        {
          label: "Motion & Video Design",
        },
      ],
    },

    {
      title: "Content Marketing",

    },


  ],
];
