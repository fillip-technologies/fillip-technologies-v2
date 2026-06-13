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
           href: "/mobile-app-development",
        },
        {
          label: "E-Commerce Mobile Solutions",
        },
        {
          label: "On-Demand Service Applications",
        },
        {
          label: "Business Process Automation Apps",
        },
      ],
    }


  ],
  [
    {
      title: "Search Visibility Engineering",
      items: [
        {
          label: "Local Business SEO",
        },

        {
          label: "On Page SEO",
        },
        {
          label: "Off Page SEO",
        },
        {
          label: "CMS SEO",
        },
      ],
    },

    {
      title: "Digital Growth Marketing",
      items: [
        {
          label: "Facebook Marketing",

        },
        {
          label: "Instagram Marketing",
        },
        {
          label: "YouTube Marketing",
        },
        {
          label: "LinkedIn Marketing",
        },
      ],
    },


  ],
  [
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
      ],
    },

    {
      title: "Creative Experience Design",
      items: [
        {
          label: "Graphic Designing",
        },
        {
          label: "Logo Designing",
        },
        {
          label: "UI/UX Designing",
        },
        {
          label: "Video Editing",
        },
      ],
    },

    {
      title: "Content Marketing",
    
    },

      
  ],
];
