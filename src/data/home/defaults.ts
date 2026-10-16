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
  { title: "Fillip Skill Academy", subtitle: "IT & Digital Skill Development Hub", description: "A premier academy offering comprehensive courses in Web Development, Digital Marketing, Graphic Design, and Business Administration to build industry-ready professionals.", logo: "/images/FSA_logo_SVG-removebg-preview.png", link: "https://fillipskillacademy.com", badge: "Educational Division" },
];

/* --------------------------------------------------------------- clients -- */
// Client-logo carousel ("Trusted By Organizations"). One flat list, edited under
// Content → Home Page → Our Clients; this is only the fallback used until the
// `home.clients` row is saved.
export type ClientLogoItem = {
  image: string;
  alt: string;
};

export const HOME_CLIENT_LOGOS: ClientLogoItem[] = [
  { image: "https://res.cloudinary.com/jhosc75n/image/upload/v1786518057/fillip/uploads/qldqajyj2tu1ei5hzhqc.webp", alt: "BMC NEW LOGO 011" },
  { image: "https://res.cloudinary.com/jhosc75n/image/upload/v1786518066/fillip/uploads/unfiyek3moyujecdlefg.webp", alt: "Zoo Safari logo copy" },
  { image: "https://res.cloudinary.com/jhosc75n/image/upload/v1786518208/fillip/uploads/vv7dcqvjwd5v3x6e2b0m.png", alt: "logo large converted from svg" },
  { image: "https://res.cloudinary.com/jhosc75n/image/upload/v1786518837/fillip/uploads/z3zxair3l2a3cpbdvyca.png", alt: "" },
  { image: "/images/NEW%20CLIENTS%20LOGO/ADVANCED%20NEURO%20HOSPITAL.png", alt: "ADVANCED NEURO HOSPITAL" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Diagno-lab-PNG.png", alt: "Diagno lab PNG" },
  { image: "https://res.cloudinary.com/jhosc75n/image/upload/v1786518977/fillip/uploads/lbulsxpa2olwgzzmyodd.png", alt: "Janya Hospital Logo PNG copy" },
  { image: "https://res.cloudinary.com/jhosc75n/image/upload/v1786519070/fillip/uploads/luadqb3u290clcx21ceg.webp", alt: "kashlaya reahb logo" },
  { image: "https://res.cloudinary.com/jhosc75n/image/upload/v1786519077/fillip/uploads/uf9eevgavkee3jlmizci.webp", alt: "logo shubh momentz" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Medica%20Emergency%20logo.png", alt: "Medica Emergency logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Patna%20Dental%20Final%20Logo.png", alt: "Patna Dental Final Logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/SAI%20CARE%20CLININC.png", alt: "SAI CARE CLININC" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Saicare%20logo.png", alt: "Saicare logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Sanjivani%20medicine%20logo%20copy.png", alt: "Sanjivani medicine logo copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Satyadev%20Urology%20Logo.jpg", alt: "Satyadev Urology Logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/tanush%20ent%20fnail%20logo.png", alt: "tanush ent fnail logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Unicare%20logo.png", alt: "Unicare logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/bcit_logo.webp", alt: "bcit logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Edify%20Logo.jpg", alt: "Edify Logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/LVS_logo.webp", alt: "LVS logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/New%20era%20high%20school%20LOGO%20copy.png", alt: "New era high school LOGO copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/NEW%20ERA%20HIGH%20SCHOOL%20LOGO.png", alt: "NEW ERA HIGH SCHOOL LOGO" },
  { image: "/images/NEW%20CLIENTS%20LOGO/SCORE%20HIGH%20LOGO.jpg", alt: "SCORE HIGH LOGO" },
  { image: "/images/NEW%20CLIENTS%20LOGO/SHEODENI%20SAO%20COLLEGE%20LOGO-01.png", alt: "SHEODENI SAO COLLEGE LOGO 01" },
  { image: "/images/NEW%20CLIENTS%20LOGO/abhayanand_logo-170x115.png", alt: "abhayanand logo 170x115" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Advance%20Line%20Logo%20Final.png", alt: "Advance Line Logo Final" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Advante%20Logo%20Final%20-%2025-07-2022%20-%20Copy.png", alt: "Advante Logo Final 25 07 2022 Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Ahl-logo-copy-300x76.png", alt: "Ahl logo copy 300x76" },
  { image: "/images/NEW%20CLIENTS%20LOGO/ARCS.png", alt: "ARCS" },
  { image: "/images/NEW%20CLIENTS%20LOGO/arvind%20foundation%20logo%20copy.png", alt: "arvind foundation logo copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/cropped-Capture_Atithi_prev_ui.png", alt: "cropped Capture Atithi prev ui" },
  { image: "/images/NEW%20CLIENTS%20LOGO/cropped-Screenshot-2024-09-10-184114-300x300.png", alt: "cropped Screenshot 2024 09 10 184114 300x300" },
  { image: "/images/NEW%20CLIENTS%20LOGO/darsh%20logo%20copy%20(1).png", alt: "darsh logo copy (1)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/darsh%20news%20logo.png", alt: "darsh news logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/DHPL%20logo%201%20copy.png", alt: "DHPL logo 1 copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Domus-logo%20png.png", alt: "Domus logo png" },
  { image: "/images/NEW%20CLIENTS%20LOGO/golden%20apple%20logo.png", alt: "golden apple logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Green%20and%20Beige%20Groceries%20Business%20Logo.png", alt: "Green and Beige Groceries Business Logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Hotel%20Sidh%20Vedantha%20logo.webp", alt: "Hotel Sidh Vedantha logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Inception%20logo.png", alt: "Inception logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/K.P%20Sinha%20Logo.png", alt: "K.P Sinha Logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/kanika%20spa%20logo.jpg", alt: "kanika spa logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/kiayra-removebg-preview.webp", alt: "kiayra removebg preview" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Krrish%20Fabricators%20Logo%20-%20Copy.png", alt: "Krrish Fabricators Logo Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/LANDMARK%20LOGO.png", alt: "LANDMARK LOGO" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(1)%20-%20Copy.jpg", alt: "logo (1) Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(1).png", alt: "logo (1)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(10).png", alt: "logo (10)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(11).png", alt: "logo (11)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(13).png", alt: "logo (13)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(14).png", alt: "logo (14)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(15).png", alt: "logo (15)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(16)%20-%20Copy.png", alt: "logo (16) Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(17).png", alt: "logo (17)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(18).png", alt: "logo (18)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(19).png", alt: "logo (19)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Logo%20(2).png", alt: "Logo (2)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(20).png", alt: "logo (20)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(21).png", alt: "logo (21)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(22).png", alt: "logo (22)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(23).png", alt: "logo (23)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(24).png", alt: "logo (24)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(25)%20-%20Copy.png", alt: "logo (25) Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(26).png", alt: "logo (26)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(27).png", alt: "logo (27)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(28).png", alt: "logo (28)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(29).png", alt: "logo (29)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(3)%20-%20Copy.png", alt: "logo (3) Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(30).png", alt: "logo (30)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(4)%20-%20Copy.png", alt: "logo (4) Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(5).png", alt: "logo (5)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(6).png", alt: "logo (6)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(7).png", alt: "logo (7)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(8).png", alt: "logo (8)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20(9).png", alt: "logo (9)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20-%20Copy%20(2).png", alt: "logo Copy (2)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo%20-%20Copy%20-%20Copy.png", alt: "logo Copy Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Logo%20Black.png", alt: "Logo Black" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo-01-removebg-preview-768x257.png", alt: "logo 01 removebg preview 768x257" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Logo-1%20-%20Copy.png", alt: "Logo 1 Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo-2%20-%20Copy.png", alt: "logo 2 Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo-fotter-300x69.png", alt: "logo fotter 300x69" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo-green-new.png", alt: "logo green new" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo-lg.png", alt: "logo lg" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo-name.png", alt: "logo name" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo-removebg-preview%20-%20Copy.png", alt: "logo removebg preview Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo-rng.png", alt: "logo rng" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo.jpg", alt: "logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo.png", alt: "logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo1%20(2).png", alt: "logo1 (2)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo1%20-%20Copy.png", alt: "logo1 Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo1-1536x359.png", alt: "logo1 1536x359" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Logo2-01.png", alt: "Logo2 01" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo2.png", alt: "logo2" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo4.png", alt: "logo4" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logonew2.png", alt: "logonew2" },
  { image: "/images/NEW%20CLIENTS%20LOGO/logo_old.png", alt: "logo old" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Maa.jpg", alt: "Maa" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Map%20sketch%20logo.png", alt: "Map sketch logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/MIA%20logo.png", alt: "MIA logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/NATURAL%20SPA.png", alt: "NATURAL SPA" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Nirmal%20Inn%20logo2.png", alt: "Nirmal Inn logo2" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Rakshit%20Logo.PNG", alt: "Rakshit Logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/RAMRATAN%20LOGO.png", alt: "RAMRATAN LOGO" },
  { image: "/images/NEW%20CLIENTS%20LOGO/rapid_logo.png", alt: "rapid logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/rkch-logo.png", alt: "rkch logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Savij%20LOGO-01%20(1)%20-%20Copy.png", alt: "Savij LOGO 01 (1) Copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Sri%20millets%20logo%20copy.jpg", alt: "Sri millets logo copy" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Startup%20Logo.png", alt: "Startup Logo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/Tax%20Protect%20Logo%20-%2009-June-2022.png", alt: "Tax Protect Logo 09 June 2022" },
  { image: "/images/NEW%20CLIENTS%20LOGO/technosys-logo%20(1).png", alt: "technosys logo (1)" },
  { image: "/images/NEW%20CLIENTS%20LOGO/tqpl%20logo%20red%20white.JPG", alt: "tqpl logo red white" },
  { image: "/images/NEW%20CLIENTS%20LOGO/TRIVEDI%20DESIGN.webp", alt: "TRIVEDI DESIGN" },
  { image: "/images/NEW%20CLIENTS%20LOGO/vedantalogo.png", alt: "vedantalogo" },
  { image: "/images/NEW%20CLIENTS%20LOGO/WEDDINGS72%20LOGO.png", alt: "WEDDINGS72 LOGO" },
  { image: "/images/NEW%20CLIENTS%20LOGO/WhatsApp%20Image%202022-03-28%20at%2011.38.44%20AM.jpeg", alt: "WhatsApp Image 2022 03 28 at 11.38.44 AM" },
  { image: "/images/NEW%20CLIENTS%20LOGO/venu-van.png", alt: "venu van" },
];

/* --------------------------------------------------------------------- faq -- */
export type FaqItem = {
  question: string;
  answer: string;
};

export const HOME_FAQS: FaqItem[] = [
  {
    question: "What is Fillip Technologies?",
    answer:
      "Fillip Technologies is a leading IT and business growth partner, offering web, software, AI, and marketing solutions. We are recognized as a Best Digital Marketing Company focused on measurable business growth.",
  },
  {
    question: "Why is Fillip Technologies the Best Digital Marketing Company?",
    answer:
      "We combine data-driven marketing, innovative technology, and creative strategies to deliver measurable business results. Our integrated approach helps brands grow faster and smarter.",
  },
  {
    question: "What services does Fillip Technologies provide?",
    answer:
      "We offer Website Development, SEO, Digital Marketing, AI Solutions, Software Development, Mobile Apps, Hardware Solutions, and Business Automation under one roof.",
  },
  {
    question: "Does Fillip Technologies build custom websites?",
    answer:
      "Yes. We design and develop custom, SEO-friendly, and scalable websites tailored to your business goals and customer expectations.",
  },
  {
    question: "Can Fillip Technologies improve my online visibility?",
    answer:
      "Absolutely. As a Best Digital Marketing Company, we help businesses improve search rankings, website traffic, and lead generation through strategic digital marketing.",
  },
  {
    question: "Does Fillip Technologies offer AI-powered business solutions?",
    answer:
      "Yes. We provide AI Chatbots, AI Agents, GPT Integration, AI Consulting, and Workflow Automation to improve productivity and customer experiences.",
  },
  {
    question: "Which industries does Fillip Technologies serve?",
    answer:
      "We work with healthcare, education, retail, hospitality, manufacturing, finance, startups, and enterprises through customized digital solutions.",
  },
  {
    question: "Why should I choose Fillip Technologies?",
    answer:
      "Fillip Technologies combines technology, creativity, and business strategy to build scalable digital solutions that drive long-term business success.",
  },
  {
    question: "Can Fillip Technologies manage all my digital business needs?",
    answer:
      "Absolutely. As the Best Digital Marketing Company, we offer everything from branding and websites to AI solutions, software development, and business automation.",
  },
  {
    question: "Can Fillip Technologies develop custom software?",
    answer:
      "Yes. We build CRM systems, ERP software, web applications, enterprise solutions, and business automation platforms tailored to your needs.",
  },
  {
    question: "How does Fillip Technologies help businesses grow?",
    answer:
      "As the Best Digital Marketing Company, we combine digital marketing, AI, and custom technology solutions to generate leads, improve efficiency, and increase revenue.",
  },
  {
    question: "Do you provide mobile app development services?",
    answer:
      "Yes. We develop secure, scalable Android, iOS, and cross-platform mobile applications for businesses of all sizes.",
  },
  {
    question: "Does Fillip Technologies provide ongoing support?",
    answer:
      "Yes. We offer continuous maintenance, security monitoring, technical support, and performance optimization for all digital solutions.",
  },
  {
    question: "Is Fillip Technologies suitable for startups and enterprises?",
    answer:
      "Absolutely. Our scalable solutions support startups, SMEs, and large enterprises at every stage of their digital transformation journey.",
  },
  {
    question: "How can I get started with Fillip Technologies?",
    answer:
      "Simply contact our team for a free consultation, and we'll recommend the best digital, AI, or technology solution for your business goals.",
  },
];

