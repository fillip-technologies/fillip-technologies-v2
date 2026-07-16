/**
 * Shared default content for the Home page sections.
 *
 * Plain data only (no "use client", no server-only) so BOTH the CMS field
 * registry (`src/server/content/home-sections.ts`, server) and the Home page
 * components (client) can import the exact same defaults. This keeps the admin
 * editor's initial values in sync with what the components fall back to.
 *
 * Every value here mirrors what used to be hardcoded inside the components, so
 * with an empty CMS the site renders identically.
 */

/* --------------------------------------------------------------- services -- */
export type ServiceItem = {
  category: string;
  title: string;
  description: string;
  icon: string; // key into the component's lucide icon map
  image: string;
};

export const HOME_SERVICE_CATEGORIES = [
  "Web Development",
  "Mobile App Development",
  "Software & Enterprise",
  "SEO & Performance Marketing",
  "Creative Experience Design",
];

export const HOME_SERVICES_BG = "/images/capabilities-background.png";

export const HOME_SERVICES: ServiceItem[] = [
  { category: "Web Development", title: "Custom Website Development", description: "Conversion-focused websites built for performance, trust, speed, and long-term growth.", icon: "Globe", image: "/images/FT-web-1.png" },
  { category: "Web Development", title: "E-Commerce Development", description: "Modern online stores with smooth product journeys, secure checkout, and scalable systems.", icon: "Box", image: "/images/FT-web-2.png" },
  { category: "Web Development", title: "WordPress Development", description: "Premium WordPress websites with easy content control, SEO structure, and fast performance.", icon: "LayoutPanelTop", image: "/images/SERVICES/wordpress.jpg" },
  { category: "Web Development", title: "Web Application Development", description: "Custom web apps designed to simplify operations, manage users, and support business workflows.", icon: "Code2", image: "/images/SERVICES/APPLICATION.jpg" },
  { category: "Web Development", title: "Website Redesign", description: "Transform outdated websites into cleaner, faster, and more conversion-ready digital experiences.", icon: "RefreshCw", image: "/images/SERVICES/custom-website.jpg" },
  { category: "Web Development", title: "Website Maintenance", description: "Reliable support for updates, fixes, security, backups, speed, and long-term website stability.", icon: "Wrench", image: "/images/SERVICES/wordpress.jpg" },
  { category: "Mobile App Development", title: "Android App Development", description: "Reliable Android apps with intuitive UI, strong backend systems, and smooth user experience.", icon: "Smartphone", image: "/images/SERVICES/app-development.jpg" },
  { category: "Mobile App Development", title: "iOS App Development", description: "Premium iOS applications crafted for performance, security, usability, and modern design.", icon: "BadgeCheck", image: "/images/SERVICES/ios-app.jpg" },
  { category: "Mobile App Development", title: "Cross-Platform Apps", description: "Cost-efficient apps for Android and iOS with consistent design and shared development logic.", icon: "Layers3", image: "/images/SERVICES/custom-app.jpg" },
  { category: "Mobile App Development", title: "Enterprise Mobile Applications", description: "Business-grade mobile solutions for teams, workflows, dashboards, and customer operations.", icon: "Building2", image: "/images/SERVICES/MOBILE.jpg" },
  { category: "Mobile App Development", title: "On-Demand Service Apps", description: "Custom platforms for booking, delivery, tracking, service requests, and customer support.", icon: "Zap", image: "/images/SERVICES/app-development.jpg" },
  { category: "Mobile App Development", title: "App UI/UX Design", description: "Clean mobile interfaces designed for usability, engagement, retention, and conversions.", icon: "Palette", image: "/images/SERVICES/ui-ux.jpg" },
  { category: "Software & Enterprise", title: "Custom Software Development", description: "Tailored business software that automates operations, centralizes data, and improves productivity.", icon: "Database", image: "/images/SERVICES/SOCIAL.jpg" },
  { category: "Software & Enterprise", title: "CRM Development", description: "Custom CRM systems to manage leads, clients, follow-ups, sales pipelines, and customer data.", icon: "Users", image: "/images/SERVICES/crm-development.jpg" },
  { category: "Software & Enterprise", title: "ERP Solutions", description: "Integrated ERP systems for inventory, finance, HR, operations, reporting, and workflows.", icon: "ServerCog", image: "/images/SERVICES/erp.jpg" },
  { category: "Software & Enterprise", title: "SaaS Product Development", description: "End-to-end SaaS product engineering from MVP planning to scalable product launch.", icon: "GitBranch", image: "/images/SERVICES/enterprise.jpg" },
  { category: "Software & Enterprise", title: "Business Dashboard", description: "Insightful dashboards that convert business data into reports, visibility, and faster decisions.", icon: "BarChart3", image: "/images/SERVICES/enterprise.jpg" },
  { category: "Software & Enterprise", title: "API Integration", description: "Connect CRMs, payment systems, marketing tools, dashboards, and third-party platforms securely.", icon: "Code2", image: "/images/SERVICES/crm-development.jpg" },
  { category: "SEO & Performance Marketing", title: "Technical SEO", description: "Improve crawlability, indexing, speed, structure, and search visibility with technical precision.", icon: "Search", image: "/images/SERVICES/technical-seo.jpg" },
  { category: "SEO & Performance Marketing", title: "Local SEO", description: "Strengthen Google Business visibility, map rankings, local searches, and location-based leads.", icon: "MapPin", image: "/images/SERVICES/local-seo.jpg" },
  { category: "SEO & Performance Marketing", title: "Enterprise SEO", description: "Scalable SEO systems for large websites, service pages, content hubs, and organic growth.", icon: "TrendingUp", image: "/images/SERVICES/enterprise.jpg" },
  { category: "SEO & Performance Marketing", title: "Google Ads Management", description: "Conversion-focused Google Ads campaigns built for calls, leads, WhatsApp, and ROI.", icon: "Megaphone", image: "/images/SERVICES/ADS.jpg" },
  { category: "SEO & Performance Marketing", title: "Meta Ads Management", description: "Performance-driven Facebook and Instagram campaigns for leads, retargeting, and awareness.", icon: "Megaphone", image: "/images/SERVICES/SOCIAL.jpg" },
  { category: "SEO & Performance Marketing", title: "Lead Generation Campaigns", description: "Full-funnel marketing systems built to attract, qualify, and convert high-intent prospects.", icon: "Target", image: "/images/SERVICES/SEO.jpg" },
  { category: "Creative Experience Design", title: "UI/UX Design", description: "Clean, intuitive, conversion-focused interfaces for websites, apps, dashboards, and products.", icon: "PenTool", image: "/images/SERVICES/ui-ux.jpg" },
  { category: "Creative Experience Design", title: "Product Design", description: "Strategic product experiences that align user needs, business goals, and usability.", icon: "LayoutPanelTop", image: "/images/SERVICES/brand.jpg" },
  { category: "Creative Experience Design", title: "Graphic Design", description: "Premium visual assets for campaigns, digital creatives, brand communication, and marketing.", icon: "Brush", image: "/images/SERVICES/graphic-design.jpg" },
  { category: "Creative Experience Design", title: "Logo Design", description: "Professional logo concepts built around brand clarity, memorability, and strong identity.", icon: "BadgeCheck", image: "/images/SERVICES/brand.jpg" },
  { category: "Creative Experience Design", title: "Brand Identity", description: "Complete brand systems including colors, typography, visual language, and brand guidelines.", icon: "Palette", image: "/images/SERVICES/graphic-design.jpg" },
  { category: "Creative Experience Design", title: "Motion & Video Design", description: "Modern motion graphics and videos that improve storytelling, engagement, and brand recall.", icon: "Zap", image: "/images/SERVICES/graphic-design.jpg" },
];

/* ------------------------------------------------------------- industries -- */
export const INDUSTRIES_IMPACT_IMAGE = "/images/impact.jpg";

export type IndustryItem = {
  title: string;
  href: string;
  image: string;
  description: string;
  services: string; // newline-separated in CMS; split in the component
};

export const HOME_INDUSTRIES: IndustryItem[] = [
  { title: "Healthcare", href: "/industries/healthcare", image: INDUSTRIES_IMPACT_IMAGE, description: "Empowering hospitals and healthcare providers with AI-driven software, patient portals, hospital ERP, cloud infrastructure and digital transformation.", services: "Hospital Management\nPatient Portal\nAI Automation\nCloud Solutions" },
  { title: "Finance", href: "/industries/finance", image: "/images/industries-1.png", description: "Secure fintech platforms, banking software, analytics dashboards and intelligent automation for modern financial institutions.", services: "Banking Software\nFraud Detection\nFinTech Apps\nData Analytics" },
  { title: "Retail", href: "/industries/retail", image: "/images/industries-3.png", description: "Omnichannel commerce solutions, inventory automation and customer engagement platforms.", services: "E-Commerce\nPOS System\nInventory\nCRM" },
  { title: "Education", href: "/industries/education", image: "/images/industries-2.png", description: "Interactive LMS platforms, student portals, AI learning assistants and digital education ecosystems.", services: "Learning Platform\nStudent ERP\nAI Tutor\nAssessment System" },
  { title: "Real Estate", href: "/industries/real-estate", image: "/images/industries-3.png", description: "Property portals, CRM workflows, lead management and digital experiences for real estate businesses.", services: "Property Portals\nLead CRM\nVirtual Tours\nListings" },
  { title: "Logistics", href: "/industries/logistics", image: "/images/industries-4.png", description: "Fleet visibility, shipment workflows, route planning and operations dashboards for logistics teams.", services: "Fleet Tracking\nRoute Planning\nShipment Flow\nDashboards" },
];

/* ---------------------------------------------------------------- humanai -- */
export const HOME_HUMANAI_BG1 = "/images/AI-BACK.png";
export const HOME_HUMANAI_BG2 = "/images/ai.png";

/* ------------------------------------------------------------ case studies -- */
export const HOME_CASESTUDIES_BG = "/images/capabilities-background.png";

export type CaseStudyItem = {
  industry: string;
  result: string;
  title: string;
  description: string;
  image: string;
};

export const HOME_CASE_STUDIES: CaseStudyItem[] = [
  { industry: "Healthcare", result: "+250%", title: "Increase in Patient Leads", description: "SEO, website redesign, and performance campaigns generated a 250% increase in qualified patient inquiries.", image: "/images/case-bg.jpg" },
  { industry: "E-Commerce", result: "3.8X", title: "Revenue Growth", description: "Conversion optimization and paid acquisition strategies delivered 3.8X growth in online revenue.", image: "/images/case-1.jpg" },
  { industry: "Real Estate", result: "500+", title: "Qualified Leads", description: "Landing pages and lead funnels generated over 500 qualified prospects within months.", image: "/images/case-3.jpg" },
  { industry: "Education", result: "+180%", title: "Enrollment Growth", description: "Digital marketing campaigns significantly increased admissions and student engagement.", image: "/images/case-4.jpg" },
  { industry: "FinTech", result: "+70%", title: "Faster Customer Acquisition", description: "Customer journey optimization reduced acquisition time while improving conversion rates.", image: "/images/case-5.jpg" },
  { industry: "Manufacturing", result: "Global", title: "Market Expansion", description: "A scalable digital platform enabled expansion into new international markets.", image: "/images/case-6..jpg" },
];

/* ------------------------------------------------------------- why choose -- */
export type WhyChooseItem = {
  icon: string; // key into the component's lucide icon map
  title: string;
  description: string;
  image: string;
};

export const HOME_WHY_CHOOSE: WhyChooseItem[] = [
  { icon: "Briefcase", title: "Strategy- First Thinking", description: "We work with you from strategy to execution, knowing your business challenges and goals to develop scalable digital solutions.", image: "/images/whychoose-strategy.png" },
  { icon: "Rocket", title: "End-to-End Delivery", description: "Whether it’s consultation, implementation, or ongoing maintenance, we’ve got you covered.", image: "/images/whychoose-delivery.png" },
  { icon: "Users", title: "Experts Across Disciplines", description: "Working with expert strategists, designers, developers, and marketers specifically for you to generate real and meaningful outcomes.", image: "/images/whychoose-experts-v2.png" },
  { icon: "Brain", title: "Human + AI Innovation", description: "We combine creativity, industry expertise, and AI-powered workflows to provide quicker, smarter, and scalable digital solutions.", image: "/images/whychoose-ai.png" },
];

/* ----------------------------------------------------------- testimonials -- */
export type TestimonialItem = {
  name: string;
  role: string;
  image: string;
  content: string;
};

export const HOME_TESTIMONIALS: TestimonialItem[] = [
  { name: "Sameer Verma", role: "Business Owner", image: "/images/background.png", content: "Highly Recommended! I had an amazing experience with Fillip Technologies, the best digital marketing agency I've worked with. I gave them my business number to list on Google My Business, and they made it live within a few days. Their team is professional, responsive, and truly understands how to deliver results. If you're looking for reliable GMB listing services, SEO, or any kind of digital marketing solutions, this is the right place. Thank you so much, Fillip Technologies, for helping my business grow online. I loved working with this team so much. If you are looking for a good website designing company in Patna, then stop what you are doing and look no further. They truly heard us out about our brand and designed an absolutely beautiful, responsive website that we were blown away by. They're also a veteran digital marketing company in Patna and assisted us to reach the correct online audience. Their SEO experts are very professional, our search engine visits were boosting within weeks. Their work as a social media marketing company in Patna provided our brand with a new, lively voice and an expanding community. Generation of leads was never a cakewalk for us, but with them as a lead generation agency in Patna, we started receiving proper, quality leads on a regular basis. They also assisted us in developing a customized application. Fillip Technologies delivers creative digital solutions to establish businesses in Patna online. From website designing, digital marketing, SEO, social media marketing, lead generation, and software development, they assure quality, functionality, and performance. For anyone in Patna seeking a top-notch Website Designing Company, I wholeheartedly recommend Fillip Technologies. Their expertise and dedication are unmatched." },
  { name: "Priya Sharma", role: "Marketing Director", image: "/images/background.png", content: "Fillip Technologies transformed our digital presence completely. The team delivered a modern website and strategic guidance that improved engagement and lead generation." },
  { name: "Rahul Singh", role: "Business Owner", image: "/images/background.png", content: "Professional, responsive, and highly skilled. The project was delivered on time and exceeded our expectations." },
  { name: "Anjali Gupta", role: "Operations Head", image: "/images/background.png", content: "Their combination of design expertise and technical execution helped us launch faster and scale with confidence." },
  { name: "Amit Kumar", role: "Startup Founder", image: "/images/background.png", content: "From strategy to deployment, every stage was handled with clarity and professionalism." },
  { name: "Neha Agarwal", role: "CEO", image: "/images/background.png", content: "One of the most reliable technology partners we've worked with. Great communication and measurable outcomes." },
];

/* ------------------------------------------------------------- technology -- */
export const HOME_TECHNOLOGY_BG = "/images/TECH-BG.png";

/* ----------------------------------------------------------------- units -- */
export type UnitItem = {
  title: string;
  subtitle: string;
  description: string;
  logo: string;
  link: string;
  badge: string;
};

export const HOME_UNITS: UnitItem[] = [
  { title: "Engineers Clinic", subtitle: "Technical Mentorship & Internship OS", description: "A practical learning operating system that bridges the gap between academic theory and real-world software engineering through live projects and industry internships.", logo: "/images/Engineers-clinic-logo-black.png", link: "https://engineersclinic.com", badge: "Technical Division" },
  { title: "Fillip Skill Academy", subtitle: "IT & Digital Skill Development Hub", description: "A premier academy offering comprehensive courses in Web Development, Digital Marketing, Graphic Design, and Business Administration to build industry-ready professionals.", logo: "/images/FSA_logo_SVG-removebg-preview.png", link: "https://fillipskillacademy.com", badge: "Educational Division" },
];

/* --------------------------------------------------------------- clients -- */
// Logo wall. Categories are derived from the filename (same rules the component
// used) so the CMS default reproduces the existing wall exactly. Admins can then
// edit/add/remove logos and their category tags freely.
export type ClientLogoItem = {
  image: string;
  alt: string;
  categories: string; // comma-separated tags (all, priority, govt, healthcare, education, corporate)
};

const LOGO_DIR = "/images/NEW%20CLIENTS%20LOGO";

const PRIORITY_FILES = [
  "Patna Park.png", "BMC NEW LOGO-011.png", "THAKUR GANJ NAGAR PANCHAYAT.png", "Zoo Safari logo copy.jpg",
  "Ruban@logo-with-NABH-2-ovg23ovg0xx8ocfhzbaqtv86rfyyms5d4as9irornm.png", "Medica Emergency logo.png",
  "Patna Dental Final Logo.png", "arvind foundation logo copy.png", "darsh news logo.png",
  "New era high school LOGO copy.png", "SHEODENI SAO COLLEGE LOGO-01.png", "Tax Protect Logo - 09-June-2022.png",
  "technosys-logo (1).png", "rapid_logo.png", "Advance Line Logo Final.png", "Domus-logo png.png",
  "Map sketch logo.png", "venu-van.png",
];

const CLIENT_FILES = [
  "abhayanand_logo-170x115.png", "Advance Line Logo Final.png", "ADVANCED NEURO HOSPITAL.png",
  "Advante Logo Final - 25-07-2022 - Copy.png", "Ahl-logo-copy-300x76.png", "ARCS.png",
  "arvind foundation logo copy.png", "bcit_logo.webp", "BMC NEW LOGO 222-01.jpg", "BMC NEW LOGO-011.png",
  "cropped-Capture_Atithi_prev_ui.png", "cropped-Screenshot-2024-09-10-184114-300x300.png", "darsh logo copy (1).png",
  "darsh news logo.png", "DHPL logo 1 copy.png", "Diagno-lab-PNG.png", "Domus-logo png.png", "Edify Logo.jpg",
  "gadgethubpatna logo 900.png", "golden apple logo.png", "Green and Beige Groceries Business Logo.png",
  "Hotel Sidh Vedantha logo.webp", "Inception logo.png", "jamui logo.png", "Janya-Hospital-Logo-PNG copy.png",
  "K.P Sinha Logo.png", "kanika spa logo.jpg", "kashlaya reahb logo.png", "kiayra-removebg-preview.webp",
  "Krrish Fabricators Logo - Copy.png", "LANDMARK LOGO.png", "logo (1) - Copy.jpg", "logo (1).png", "logo (10).png",
  "logo (11).png", "logo (13).png", "logo (14).png", "logo (15).png", "logo (16) - Copy.png", "logo (17).png",
  "logo (18).png", "logo (19).png", "Logo (2).png", "logo (20).png", "logo (21).png", "logo (22).png", "logo (23).png",
  "logo (24).png", "logo (25) - Copy.png", "logo (26).png", "logo (27).png", "logo (28).png", "logo (29).png",
  "logo (3) - Copy.png", "logo (30).png", "logo (4) - Copy.png", "logo (5).png", "logo (6).png", "logo (7).png",
  "logo (8).png", "logo (9).png", "logo - Copy (2).png", "logo - Copy - Copy.png", "logo - Copy.jpg", "Logo Black.png",
  "logo-01-removebg-preview-768x257.png", "Logo-1 - Copy.png", "logo-2 - Copy.png", "logo-fotter-300x69.png",
  "logo-green-new.png", "logo-lg.png", "logo-name.png", "logo-partyt patna zone.png", "logo-removebg-preview - Copy.png",
  "logo-rng.png", "logo-shubh momentz.png", "logo.jpg", "logo.png", "logo1 (2).png", "logo1 - Copy.png",
  "logo1-1536x359.png", "Logo2-01 - Copy.png", "Logo2-01.png", "logo2.png", "logo4.png", "logonew2.png",
  "logo_old - Copy.png", "logo_old.png", "LVS_logo.webp", "Maa.jpg", "Map sketch logo.png", "Medica Emergency logo.png",
  "Medica Logo for Social Media.png", "MIA logo.png", "NATURAL SPA.png", "Nature Safari logo copy.png",
  "New era high school LOGO copy.png", "NEW ERA HIGH SCHOOL LOGO.png", "Nirmal Inn logo2.png", "Parkomiko.png",
  "Patna Dental Final Logo.png", "Patna Park.png", "Rakshit Logo.PNG", "RAMRATAN LOGO.png", "rapid_logo.png",
  "rkch-logo.png", "Ruban@logo-with-NABH-2-ovg23ovg0xx8ocfhzbaqtv86rfyyms5d4as9irornm.png", "SAI CARE CLININC.png",
  "Saicare logo.png", "Sanjivani medicine logo copy.png", "Satyadev Urology Logo.jpg", "Savij LOGO-01 (1) - Copy.png",
  "SCORE HIGH LOGO.jpg", "SHEODENI SAO COLLEGE LOGO-01.png", "SITA-ARCH-LOGO-DKPorKRm.webp", "Sri millets logo copy.jpg",
  "Startup Logo.png", "tanush ent fnail logo.png", "Tax Protect Logo - 09-June-2022.png", "technosys-logo (1).png",
  "THAKUR GANJ NAGAR PANCHAYAT.png", "tqpl logo red white.JPG", "TRIVEDI DESIGN.webp", "Unicare logo.png",
  "vedantalogo.png", "WEDDINGS72 LOGO.png", "WhatsApp Image 2022-03-28 at 11.38.44 AM.jpeg", "Zoo Safari logo copy.jpg",
  "venu-van.png",
];

const GOVERNMENT_FILES = [
  "rajgir-zoo.png", "Nature Safari logo copy.png", "venu-van.png", "logo-large-converted-from-svg.png",
  "BMC NEW LOGO-011.png", "Patna Park.png", "logo - Copy - Copy.png", "BMC NEW LOGO 222-01.jpg",
];

function altFromFile(file: string): string {
  return file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function categoriesFor(file: string): string[] {
  const categories: string[] = ["all"];
  if (PRIORITY_FILES.includes(file)) categories.push("priority");
  const f = file.toLowerCase();
  if (f.includes("park") || f.includes("safari") || f.includes("bmc") || f.includes("jamui") || f.includes("nagar") || f.includes("panchayat") || f.includes("municipal") || f.includes("council") || f.includes("zoo") || f.includes("sita-arch") || f.includes("patna") || f.includes("zone")) categories.push("govt");
  if (f.includes("hospital") || f.includes("diagno") || f.includes("clinic") || f.includes("medicine") || f.includes("urology") || f.includes("rehab") || f.includes("reahb") || f.includes("medica") || f.includes("dental") || f.includes("care") || f.includes("ent") || f.includes("ruban") || f.includes("physio")) categories.push("healthcare");
  if (f.includes("school") || f.includes("college") || f.includes("edify") || f.includes("score high") || f.includes("lvs") || f.includes("bcit") || f.includes("academy") || f.includes("learning") || f.includes("education")) categories.push("education");
  if (!categories.includes("govt") && !categories.includes("healthcare") && !categories.includes("education")) categories.push("corporate");
  return categories;
}

const wallItems: ClientLogoItem[] = Array.from(new Set(CLIENT_FILES)).map((file) => ({
  image: `${LOGO_DIR}/${encodeURIComponent(file)}`,
  alt: altFromFile(file),
  categories: categoriesFor(file).join(","),
}));

// The government tab historically used a distinct set from /images/goverment.
// Fold them into the same list tagged "govt" so everything lives in one editor.
const govtItems: ClientLogoItem[] = GOVERNMENT_FILES.map((file) => ({
  image: `/images/goverment/${encodeURIComponent(file)}`,
  alt: altFromFile(file),
  categories: "govt",
}));

export const HOME_CLIENT_LOGOS: ClientLogoItem[] = [...wallItems, ...govtItems];
