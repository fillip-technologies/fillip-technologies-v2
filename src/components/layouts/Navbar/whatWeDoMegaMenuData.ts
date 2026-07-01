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
        },
        {
          label: "Website Redesign",
        },
        {
          label: "Website Maintenance",
        },
      ],
    },
    {
      title: "Mobile App Development",
      items: [
        {
          label: "Android App Development",
        },
        {
          label: "iOS App Development",
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
        },
        {
          label: "CRM Development",
        },
        {
          label: "ERP Solutions",
        },
        {
          label: "SaaS Product Development",
          href: "/services/saas-product-development",
        },

        {
          label: "API Integration",
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
        },
        {
          label: "Enterprise SEO",
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
