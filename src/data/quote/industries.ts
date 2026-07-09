/**
 * Industry-specific quote presets for the "Custom" tab of the Get-a-Quote
 * section. Each industry ships a small set of tailored packages. Pricing is
 * indicative (mirrors the ballpark of the main pricing calculator) and always
 * negotiable — the pages make that clear.
 *
 * `icon` is a lucide icon *name*; the client nav/cards map it to a component
 * (with a safe fallback) so this stays a plain, client-safe data module.
 */

export type Billing = "one-time" | "monthly";

export type IndustryPackage = {
  id: string;
  name: string;
  price: number; // INR
  billing: Billing;
  timeline?: string;
  bestFor?: string;
  popular?: boolean;
  features: string[];
};

export type QuoteIndustry = {
  slug: string;
  name: string;
  icon: string; // lucide icon name
  tagline: string;
  description: string;
  highlights: string[];
  packages: IndustryPackage[];
};

export const QUOTE_INDUSTRIES: QuoteIndustry[] = [
  {
    slug: "hospital",
    name: "Hospital & Healthcare",
    icon: "Hospital",
    tagline: "Digital systems for multi-department hospitals",
    description:
      "Websites, patient portals, and hospital management systems that streamline appointments, records, and departments while staying compliant.",
    highlights: ["Appointment booking", "Patient records (EHR)", "Department dashboards", "HIPAA-aware builds"],
    packages: [
      {
        id: "hospital-starter",
        name: "Clinic Presence",
        price: 25000,
        billing: "one-time",
        timeline: "1–2 weeks",
        bestFor: "Single clinics establishing an online presence.",
        features: [
          "8–10 page responsive hospital website",
          "Online appointment request form",
          "Doctor & department listings",
          "Google Maps + click-to-call",
          "WhatsApp enquiry integration",
        ],
      },
      {
        id: "hospital-growth",
        name: "Hospital Growth",
        price: 60000,
        billing: "one-time",
        timeline: "3–5 weeks",
        bestFor: "Growing hospitals needing patient self-service.",
        popular: true,
        features: [
          "Everything in Clinic Presence",
          "Patient portal with login & history",
          "Online appointment scheduling + reminders",
          "Doctor availability calendar",
          "Blog / health-tips CMS",
          "Basic analytics dashboard",
        ],
      },
      {
        id: "hospital-enterprise",
        name: "Enterprise HMS",
        price: 150000,
        billing: "one-time",
        timeline: "8–12 weeks",
        bestFor: "Multi-specialty hospitals & chains.",
        features: [
          "Everything in Hospital Growth",
          "Full Hospital Management System (HMS)",
          "Electronic health records (EHR)",
          "Billing, pharmacy & lab modules",
          "Role-based staff dashboards",
          "Third-party & insurance API integrations",
        ],
      },
    ],
  },
  {
    slug: "doctor",
    name: "Doctors & Clinics",
    icon: "Stethoscope",
    tagline: "Personal-practice sites that book patients",
    description:
      "Conversion-focused websites and booking tools for individual practitioners and small clinics — built to fill your calendar.",
    highlights: ["Online booking", "Practice branding", "Reviews & credibility", "Reminders"],
    packages: [
      {
        id: "doctor-starter",
        name: "Personal Practice",
        price: 15000,
        billing: "one-time",
        timeline: "4–7 days",
        bestFor: "Individual doctors starting online.",
        features: [
          "5–7 page personal practice website",
          "About, services & credentials",
          "Appointment request form",
          "Patient reviews section",
          "WhatsApp & call integration",
        ],
      },
      {
        id: "doctor-pro",
        name: "Clinic Pro",
        price: 35000,
        billing: "one-time",
        timeline: "2–3 weeks",
        bestFor: "Established clinics wanting bookings online.",
        popular: true,
        features: [
          "Everything in Personal Practice",
          "Real-time online appointment booking",
          "Automated email/SMS reminders",
          "Blog for health content & SEO",
          "Google Business + local SEO setup",
        ],
      },
      {
        id: "doctor-suite",
        name: "Multi-Doctor Suite",
        price: 75000,
        billing: "one-time",
        timeline: "4–6 weeks",
        bestFor: "Clinics with multiple practitioners.",
        features: [
          "Everything in Clinic Pro",
          "Per-doctor profiles & calendars",
          "Patient login with visit history",
          "Payment collection for consultations",
          "Admin dashboard & reporting",
        ],
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: "Building2",
    tagline: "Property portals & lead machines",
    description:
      "Listing websites and property portals with search, enquiry capture, and CRM-ready lead flows for agents and agencies.",
    highlights: ["Property listings", "Advanced search", "Lead capture", "Virtual tours"],
    packages: [
      {
        id: "realestate-starter",
        name: "Agent Starter",
        price: 18000,
        billing: "one-time",
        timeline: "1 week",
        bestFor: "Individual agents & brokers.",
        features: [
          "6–8 page agent website",
          "Up to 25 property listings",
          "Enquiry & callback forms",
          "WhatsApp + call integration",
          "Google Maps property locations",
        ],
      },
      {
        id: "realestate-growth",
        name: "Agency Growth",
        price: 45000,
        billing: "one-time",
        timeline: "3–4 weeks",
        bestFor: "Agencies with active inventory.",
        popular: true,
        features: [
          "Everything in Agent Starter",
          "Unlimited listings with search & filters",
          "Property detail pages + galleries",
          "Lead capture with CRM export",
          "Featured / premium listing slots",
        ],
      },
      {
        id: "realestate-portal",
        name: "Property Portal",
        price: 120000,
        billing: "one-time",
        timeline: "8–10 weeks",
        bestFor: "Marketplaces & multi-agent portals.",
        features: [
          "Everything in Agency Growth",
          "Multi-agent / builder accounts",
          "Advanced map search & shortlists",
          "Virtual tours & video walkthroughs",
          "Admin moderation + analytics dashboard",
        ],
      },
    ],
  },
  {
    slug: "education",
    name: "Education & Institutes",
    icon: "GraduationCap",
    tagline: "Websites, admissions & learning platforms",
    description:
      "From institute websites to full learning management systems with admissions, courses, and student portals.",
    highlights: ["Online admissions", "Course catalog", "Student portal", "LMS"],
    packages: [
      {
        id: "education-starter",
        name: "Institute Starter",
        price: 20000,
        billing: "one-time",
        timeline: "1–2 weeks",
        bestFor: "Schools & coaching centres.",
        features: [
          "8–12 page institute website",
          "Course / program listings",
          "Admission enquiry form",
          "Faculty & gallery sections",
          "Notice board / announcements",
        ],
      },
      {
        id: "education-growth",
        name: "Campus Growth",
        price: 50000,
        billing: "one-time",
        timeline: "3–5 weeks",
        bestFor: "Institutes taking admissions online.",
        popular: true,
        features: [
          "Everything in Institute Starter",
          "Online admission & application flow",
          "Student & parent login portal",
          "Fee enquiry + payment gateway",
          "Events calendar & blog CMS",
        ],
      },
      {
        id: "education-lms",
        name: "LMS Enterprise",
        price: 130000,
        billing: "one-time",
        timeline: "8–12 weeks",
        bestFor: "EdTech & multi-campus institutions.",
        features: [
          "Everything in Campus Growth",
          "Full LMS: courses, lessons & quizzes",
          "Video lessons & progress tracking",
          "Batch / teacher management",
          "Certificates & reporting dashboards",
        ],
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-Commerce",
    icon: "ShoppingBag",
    tagline: "Online stores built to sell",
    description:
      "Conversion-optimised online stores and marketplaces with payments, inventory, and order management.",
    highlights: ["Product catalog", "Payments", "Inventory", "Order tracking"],
    packages: [
      {
        id: "ecommerce-starter",
        name: "Store Starter",
        price: 22000,
        billing: "one-time",
        timeline: "1–2 weeks",
        bestFor: "Small brands launching online.",
        features: [
          "Up to 50 products",
          "Payment gateway integration",
          "Cart & checkout flow",
          "Order & customer management",
          "WhatsApp order notifications",
        ],
      },
      {
        id: "ecommerce-growth",
        name: "Growth Store",
        price: 55000,
        billing: "one-time",
        timeline: "3–5 weeks",
        bestFor: "Scaling stores with more SKUs.",
        popular: true,
        features: [
          "Everything in Store Starter",
          "Unlimited products & categories",
          "Coupons, offers & wishlist",
          "Inventory & stock management",
          "Shipping & courier integration",
          "Sales analytics dashboard",
        ],
      },
      {
        id: "ecommerce-marketplace",
        name: "Marketplace",
        price: 140000,
        billing: "one-time",
        timeline: "8–12 weeks",
        bestFor: "Multi-vendor marketplaces.",
        features: [
          "Everything in Growth Store",
          "Multi-vendor seller accounts",
          "Vendor payouts & commissions",
          "Ratings, reviews & disputes",
          "Advanced search + admin dashboard",
        ],
      },
    ],
  },
  {
    slug: "restaurant",
    name: "Restaurant & Food",
    icon: "UtensilsCrossed",
    tagline: "Menus, reservations & online ordering",
    description:
      "Restaurant websites and ordering systems with digital menus, table reservations, and direct online orders.",
    highlights: ["Digital menu", "Online ordering", "Reservations", "Delivery"],
    packages: [
      {
        id: "restaurant-starter",
        name: "Cafe Starter",
        price: 16000,
        billing: "one-time",
        timeline: "4–7 days",
        bestFor: "Cafes & single outlets.",
        features: [
          "5–7 page restaurant website",
          "Digital menu with photos",
          "Table reservation form",
          "Google Maps + directions",
          "WhatsApp ordering link",
        ],
      },
      {
        id: "restaurant-growth",
        name: "Restaurant Growth",
        price: 40000,
        billing: "one-time",
        timeline: "2–4 weeks",
        bestFor: "Restaurants wanting direct orders.",
        popular: true,
        features: [
          "Everything in Cafe Starter",
          "Online ordering with payments",
          "Live table reservation system",
          "Offers, combos & loyalty coupons",
          "Order dashboard for staff",
        ],
      },
      {
        id: "restaurant-cloud",
        name: "Cloud Kitchen Suite",
        price: 90000,
        billing: "one-time",
        timeline: "6–9 weeks",
        bestFor: "Multi-outlet & cloud kitchens.",
        features: [
          "Everything in Restaurant Growth",
          "Multi-outlet menu management",
          "Delivery zones & rider assignment",
          "Kitchen order tickets (KOT)",
          "Sales & item analytics dashboard",
        ],
      },
    ],
  },
  {
    slug: "other",
    name: "Other / Not Listed",
    icon: "Boxes",
    tagline: "A custom build for any business",
    description:
      "Don't see your industry? We build custom websites, web apps, and software for businesses of every kind — start from a package below or share your exact requirement.",
    highlights: ["Custom website", "Web app", "Automation", "Integrations"],
    packages: [
      {
        id: "other-starter",
        name: "Starter",
        price: 15000,
        billing: "one-time",
        timeline: "4–7 days",
        bestFor: "Small businesses getting online.",
        features: [
          "5–8 page responsive website",
          "Modern, on-brand UI/UX",
          "Enquiry & contact forms",
          "WhatsApp + call integration",
          "Basic on-page SEO setup",
        ],
      },
      {
        id: "other-growth",
        name: "Growth",
        price: 45000,
        billing: "one-time",
        timeline: "2–4 weeks",
        bestFor: "Businesses needing custom features.",
        popular: true,
        features: [
          "Everything in Starter",
          "Custom features & integrations",
          "User login / dashboard (if needed)",
          "CMS to manage content",
          "Payment gateway (if needed)",
          "Analytics & basic automation",
        ],
      },
      {
        id: "other-enterprise",
        name: "Enterprise",
        price: 100000,
        billing: "one-time",
        timeline: "6–10 weeks",
        bestFor: "Complex, scalable systems.",
        features: [
          "Everything in Growth",
          "Custom software / web application",
          "Role-based dashboards & workflows",
          "Third-party API integrations",
          "Scalable cloud architecture",
        ],
      },
    ],
  },
];

export function listIndustries(): QuoteIndustry[] {
  return QUOTE_INDUSTRIES;
}

export function getIndustry(slug: string): QuoteIndustry | undefined {
  return QUOTE_INDUSTRIES.find((i) => i.slug === slug);
}
