

export type Billing = "one-time" | "monthly";

export type Package = {
  id: string;
  name: string;
 
  tagline?: string;
  price: number; // INR
  billing: Billing;

  timeline?: string;
  bestFor?: string;
 
  featureGroups: { title: string; items: string[] }[];
};


export type AddOn = {
  id: string;
  name: string;
  description?: string;
  price: number; // INR — per unit when `unit` is set, otherwise a flat price
  billing: Billing;
  unit?: string; // e.g. "page"; presence makes the add-on quantity-based
  maxQuantity?: number; // cap for the quantity stepper (default 50)
};

export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  /** If true, the client picks exactly one package; if false, none required. */
  packages: Package[];
  addOns: AddOn[];
};

export const COMPANY = {
  name: "Fillip Technologies Pvt Ltd",
  tagline: "Human × Intelligence",
  email: "myselfgovind116@gmail.com",
  phone: "",
  website: "fillip-technologies",
  /** Shown in the PDF footer. */
  highlights: [
    "13 Years of Technical Industry Experience",
    "Strategic partners to 500+ colleges and high-level government projects",
    "Real-time reporting and dedicated account managers for every project",
  ],
} as const;

/** Indian GST. Set rate to 0 to hide the GST line entirely. */
export const GST_RATE = 0.18;

export const QUOTE_NOTE =
  "This is an indicative estimate generated from your selections. Final pricing is negotiable when you visit our office or speak with us over a call.";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "website",
    name: "Website Development",
    description: "High-performance, scalable web solutions designed for conversion.",
    packages: [
      {
        id: "website-basic",
        name: "Basic Package",
        tagline: "The Starter",
        price: 10000,
        billing: "one-time",
        timeline: "3 days",
        bestFor: "Individuals, Startups, and Small Businesses.",
        featureGroups: [
          {
            title: "Design & Development",
            items: [
              "5–7 Custom Designed Pages",
              "100% Mobile Responsive (Mobile, Tablet, Desktop)",
              "Modern UI/UX focused on user engagement",
              "Professional Image Slider/Banner",
            ],
          },
          {
            title: "Features",
            items: [
              "Functional Contact Form with Email Notifications",
              "Social Media Icon Integration",
              "WhatsApp Chat Integration for instant queries",
            ],
          },
          {
            title: "Optimization",
            items: ["Basic On-Page SEO (Meta tags and titles)", "Fast Loading Speed optimization"],
          },
        ],
      },
      {
        id: "website-standard",
        name: "Standard Package",
        tagline: "The Professional",
        price: 25000,
        billing: "one-time",
        timeline: "7 days",
        bestFor: "Established businesses looking for a dynamic presence.",
        featureGroups: [
          {
            title: "Core Deliverables",
            items: [
              "10–15 Premium Pages",
              "Dynamic CMS: Admin Panel to update content without coding",
              "Advanced Custom UI/UX tailored to your brand identity",
            ],
          },
          {
            title: "Marketing & SEO",
            items: [
              "Full SEO Infrastructure Setup",
              "Google Maps Integration",
              "Blog Section Setup for content marketing",
            ],
          },
          {
            title: "Technical",
            items: [
              "Enhanced Security Protocols",
              "Google Analytics and Search Console integration",
              "Lead Generation pop-ups",
            ],
          },
        ],
      },
      {
        id: "website-premium",
        name: "Premium Package",
        tagline: "The Enterprise",
        price: 75000,
        billing: "one-time",
        timeline: "15 days",
        bestFor: "E-commerce stores and high-scale corporate portals.",
        featureGroups: [
          {
            title: "Advanced Functionality",
            items: [
              "Full E-commerce Setup (Unlimited Product Listing)",
              "Secure Payment Gateway (Razorpay/Paytm/Stripe)",
              "Inventory and Order Management System",
            ],
          },
          {
            title: "Automation",
            items: [
              "CRM Integration for lead tracking",
              "Automated Invoice Generation",
              "Advanced Product Filtering and Search",
            ],
          },
          {
            title: "Support",
            items: ["Premium Technical Support (6 Months)", "Advanced Speed Optimization"],
          },
        ],
      },
    ],
    // TODO(client): replace with your real website add-ons + prices.
    addOns: [
      { id: "website-extra-pages", name: "Extra Page", price: 1000, billing: "one-time", unit: "page", maxQuantity: 50 },
      { id: "website-logo", name: "Logo Design", price: 3000, billing: "one-time" },
      { id: "website-multilingual", name: "Multilingual Support", price: 8000, billing: "one-time" },
      { id: "website-payment-gateway", name: "Payment Gateway Integration", price: 6000, billing: "one-time" },
      { id: "website-amc", name: "Annual Maintenance (AMC)", price: 2000, billing: "monthly" },
      { id: "website-hosting", name: "Hosting & Domain Setup", price: 4000, billing: "one-time" },
    ],
  },
  {
    id: "seo",
    name: "Search Engine Optimization (SEO)",
    description: "Climb the rankings with data-backed organic strategies. Billed per month.",
    packages: [
      {
        id: "seo-basic",
        name: "Basic SEO",
        price: 8000,
        billing: "monthly",
        timeline: "Per month",
        bestFor: "10–15 Target Keywords.",
        featureGroups: [
          {
            title: "Activities",
            items: [
              "Initial Website Audit & Error Removal",
              "Competitor Analysis (Top 3 competitors)",
              "Meta Tags & Header Tags Optimization",
              "4 Quality Blog Posts (500–700 words)",
              "10 High-Authority Backlinks per month",
            ],
          },
        ],
      },
      {
        id: "seo-advanced",
        name: "Advanced SEO",
        price: 18000,
        billing: "monthly",
        timeline: "Per month",
        bestFor: "20–30 Target Keywords.",
        featureGroups: [
          {
            title: "Activities",
            items: [
              "Deep Technical SEO (Schema, Sitemap, Robots.txt)",
              "Local SEO: Google Business Profile Optimization",
              "4 Quality Blog Posts & Article Submissions",
              "20+ Premium Quality Backlinks",
              "Weekly Performance and Ranking Audits",
            ],
          },
        ],
      },
    ],
    // TODO(client): replace with your real SEO add-ons + prices.
    addOns: [
      { id: "seo-extra-blogs", name: "Extra Blog Posts (per 4)", price: 3000, billing: "monthly" },
      { id: "seo-extra-keywords", name: "Extra Keywords (per 10)", price: 2500, billing: "monthly" },
    ],
  },
  {
    id: "smm",
    name: "Social Media Management",
    description: "Building social trust and brand awareness. Billed per month.",
    packages: [
      {
        id: "smm-growth",
        name: "Growth Package",
        price: 10000,
        billing: "monthly",
        timeline: "Per month",
        bestFor: "Facebook & Instagram.",
        featureGroups: [
          {
            title: "Content & Management",
            items: [
              "15–20 Custom Graphic Posts + 6 Reels",
              "Hashtag Research & Trending Topic analysis",
              "Page Optimization (Bio, CTA, Cover)",
              "Community Engagement (comments/DM)",
            ],
          },
        ],
      },
      {
        id: "smm-dominance",
        name: "Dominance Package",
        price: 16000,
        billing: "monthly",
        timeline: "Per month",
        bestFor: "Facebook, Instagram, and LinkedIn/Twitter.",
        featureGroups: [
          {
            title: "Content & Management",
            items: [
              "Daily Posting (30 Posts/Mo) + 10 High-Quality Reels",
              "Full Story Strategy (Daily Stories)",
              "LinkedIn Industry-Specific Posting",
              "Monthly Competitor Social Audit",
            ],
          },
        ],
      },
    ],
    // TODO(client): replace with your real SMM add-ons + prices.
    addOns: [
      { id: "smm-extra-reels", name: "Extra Reels (per 4)", price: 4000, billing: "monthly" },
      { id: "smm-influencer", name: "Influencer Outreach", price: 6000, billing: "monthly" },
    ],
  },
  {
    id: "performance",
    name: "Performance Marketing (Paid Ads)",
    description: "Targeted campaigns for instant lead generation. Billed per month (ad spend excluded).",
    packages: [
      {
        id: "performance-pro",
        name: "Professional Ads Management",
        price: 16000,
        billing: "monthly",
        timeline: "Per month",
        bestFor: "Google Ads (Search/Display) + Meta Ads.",
        featureGroups: [
          {
            title: "Services",
            items: [
              "Pixel & Conversion API Installation",
              "A/B Testing for Ad Creatives",
              "Remarketing Campaigns (past visitors)",
              "Monthly ROI & Conversion Analysis",
            ],
          },
        ],
      },
    ],
    addOns: [],
  },
  {
    id: "software",
    name: "Software & App Solutions",
    description: "Building the backbone of your digital infrastructure. Timeline: 20–25 days.",
    packages: [
      {
        id: "software-erp",
        name: "Custom ERP/CRM",
        price: 120000,
        billing: "one-time",
        timeline: "20–25 days",
        bestFor: "Businesses needing automated internal workflows.",
        featureGroups: [
          {
            title: "Includes",
            items: [
              "Automated workflows",
              "Employee/Lead management",
              "Specialized API integrations",
            ],
          },
        ],
      },
      {
        id: "software-mobile-app",
        name: "Mobile Applications",
        price: 275000,
        billing: "one-time",
        timeline: "20–25 days",
        bestFor: "Native Android and iOS products.",
        featureGroups: [
          {
            title: "Includes",
            items: [
              "Native Android and iOS development",
              "Robust backend",
              "High-load performance and security focus",
            ],
          },
        ],
      },
    ],
    // TODO(client): replace with your real software/app add-ons + prices.
    addOns: [
      { id: "software-admin-dashboard", name: "Admin Dashboard", price: 30000, billing: "one-time" },
      { id: "software-app-maintenance", name: "App Maintenance & Support", price: 8000, billing: "monthly" },
    ],
  },
];

/** Lookup helpers used by the calculator and the server. */
export function findCategory(id: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((c) => c.id === id);
}

export function findPackage(categoryId: string, packageId: string): Package | undefined {
  return findCategory(categoryId)?.packages.find((p) => p.id === packageId);
}

export function findAddOn(categoryId: string, addOnId: string): AddOn | undefined {
  return findCategory(categoryId)?.addOns.find((a) => a.id === addOnId);
}
