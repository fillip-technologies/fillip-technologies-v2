/**
 * CMS field registry for the Home page sections.
 *
 * Each section maps to one row in `site_content` (key = `home.<id>`). Sections
 * may have scalar `fields` and/or one repeatable `list`. The generic CMS editor
 * renders from this; public components read saved values (falling back to the
 * defaults defined here).
 *
 * To add an editable section: add an entry here, then read its data in the
 * matching component (see Hero/TrustedBy for the pattern).
 */

export type FieldType = "text" | "textarea" | "url";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  default: string;
  help?: string;
};

/** A field on each item within a list. */
export type ItemField = {
  name: string;
  label: string;
  type: "text" | "textarea";
};

export type ListDef = {
  name: string; // data key holding the array, e.g. "cards"
  label: string; // section heading for the list, e.g. "Service cards"
  itemNoun: string; // singular noun for buttons, e.g. "card"
  itemFields: ItemField[];
  default: Record<string, string>[];
};

export type Section = {
  id: string;
  label: string;
  description: string;
  ready: boolean;
  fields: Field[];
  list?: ListDef;
};

export const HOME_SECTIONS: Section[] = [
  {
    id: "hero",
    label: "Hero",
    description: "Top banner: eyebrow, headline, intro and the two call-to-action buttons.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "Human × Intelligence" },
      { name: "headingLine1", label: "Heading — line 1", type: "text", default: "Building Intelligent" },
      { name: "headingLine2", label: "Heading — line 2", type: "text", default: "Enterprises" },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "We design practical AI, cloud, and software systems for teams that need dependable results.",
      },
      { name: "primaryCtaLabel", label: "Primary button — label", type: "text", default: "Talk to Experts" },
      { name: "primaryCtaHref", label: "Primary button — link", type: "url", default: "#contact" },
      { name: "secondaryCtaLabel", label: "Secondary button — label", type: "text", default: "Explore Capabilities" },
      { name: "secondaryCtaHref", label: "Secondary button — link", type: "url", default: "#capabilities" },
    ],
  },
  {
    id: "trustedby",
    label: "Trusted By",
    description: "Headline + intro paragraph below the hero.",
    ready: true,
    fields: [
      { name: "headingLead", label: "Heading", type: "text", default: "The Future Isn't Human or AI." },
      { name: "headingHighlight", label: "Heading — highlighted part", type: "text", default: "It's Human + AI." },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "For 13+ years, we've helped businesses navigate technology change. Now, we're combining deep industry expertise with artificial intelligence to unlock the next generation of growth.",
      },
    ],
  },
  {
    id: "capabilities",
    label: "Capabilities",
    description: "“What we do” heading + the service cards grid.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "WHAT WE DO" },
      { name: "headingLine1", label: "Heading — line 1", type: "text", default: "End-to-End Digital Services" },
      { name: "headingLine2", label: "Heading — line 2", type: "text", default: "for Modern Organizations" },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "From software engineering and mobile applications to marketing, design, automation, and growth solutions, we help organizations build stronger digital foundations and unlock new opportunities.",
      },
    ],
    list: {
      name: "cards",
      label: "Service cards",
      itemNoun: "card",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image", label: "Image path", type: "text" },
      ],
      default: [
        { title: "Application Engineering", description: "Custom Website Development, E-Commerce Development, WordPress Development, and Enterprise Software Solutions built for scale.", image: "/images/SERVICES/APPLICATION.jpg" },
        { title: "Mobile App Development", description: "Enterprise Mobile Applications, E-Commerce Mobile Solutions, On-Demand Platforms, and Business Process Automation Apps.", image: "/images/SERVICES/MOBILE.jpg" },
        { title: "Search Visibility Engineering", description: "Local SEO, On-Page SEO, Off-Page SEO, Technical SEO, and CMS Optimization to improve search performance.", image: "/images/SERVICES/SEO.jpg" },
        { title: "Digital Growth Marketing", description: "Facebook Marketing, Instagram Marketing, YouTube Marketing, LinkedIn Marketing, and growth-focused campaigns.", image: "/images/SERVICES/SOCIAL.jpg" },
        { title: "Performance Marketing", description: "Facebook & Instagram Ads, Google Ads, YouTube Advertising, and conversion-focused paid acquisition strategies.", image: "/images/SERVICES/ADS.jpg" },
        { title: "Creative Experience Design", description: "Graphic Design, Logo Design, UI/UX Design, Video Editing, and brand experiences that drive engagement.", image: "/images/SERVICES/APPLICATION.jpg" },
      ],
    },
  },
  {
    id: "humanai",
    label: "Human + AI",
    description: "“How we work today” heading + the Before/Today comparison rows.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "HUMAN × INTELLIGENCE" },
      { name: "heading", label: "Heading", type: "text", default: "How We Work Today" },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "AI doesn't replace expertise. It removes repetitive work, accelerates execution, and helps teams make better decisions.",
      },
      { name: "beforeLabel", label: "Left column label", type: "text", default: "Before" },
      { name: "afterLabel", label: "Right column label", type: "text", default: "Today" },
      { name: "footer", label: "Footer line", type: "text", default: "The future isn't Human or AI. It's Human × Intelligence." },
    ],
    list: {
      name: "rows",
      label: "Comparison rows",
      itemNoun: "row",
      itemFields: [
        { name: "before", label: "Before", type: "text" },
        { name: "after", label: "Today", type: "text" },
      ],
      default: [
        { before: "Manual Processes", after: "Intelligent Automation" },
        { before: "Slow Decision Making", after: "Real-Time Insights" },
        { before: "Repetitive Tasks", after: "Faster Execution" },
        { before: "Disconnected Data", after: "Connected Intelligence" },
        { before: "Human Effort", after: "Human + AI Collaboration" },
      ],
    },
  },
  {
    id: "industries",
    label: "Industries Impact",
    description: "“Proven Impact” heading, CTA, side text, stats and the rotating industry cards.",
    ready: true,
    fields: [
      { name: "headingLead", label: "Heading — line 1", type: "text", default: "Proven Impact" },
      { name: "headingHighlight", label: "Heading — line 2 (highlighted)", type: "text", default: "Across Industries." },
      { name: "ctaLabel", label: "Button label", type: "text", default: "Get Started" },
      {
        name: "sideText",
        label: "Side paragraph",
        type: "textarea",
        default:
          "We build scalable AI, cloud, automation and enterprise technology solutions that help organizations grow faster.",
      },
      { name: "stat1Value", label: "Stat 1 — value", type: "text", default: "320M+" },
      { name: "stat1Label", label: "Stat 1 — label", type: "text", default: "Business Users" },
      { name: "stat2Value", label: "Stat 2 — value", type: "text", default: "590K+" },
      { name: "stat2Label", label: "Stat 2 — label", type: "text", default: "Happy Clients" },
      { name: "stat3Value", label: "Stat 3 — value", type: "text", default: "$438B+" },
      { name: "stat3Label", label: "Stat 3 — label", type: "text", default: "Revenue Impact" },
    ],
    list: {
      name: "items",
      label: "Industry cards",
      itemNoun: "industry",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "stat", label: "Stat", type: "text" },
        { name: "label", label: "Stat label", type: "text" },
        { name: "image", label: "Image path", type: "text" },
      ],
      default: [
        { title: "Healthcare Transformation", description: "Modern patient platforms, hospital automation, and AI-powered healthcare operations.", stat: "50+", label: "Healthcare Solutions", image: "/images/impact.jpg" },
        { title: "Financial Innovation", description: "Enterprise banking, fintech products, secure digital transactions and automation.", stat: "60+", label: "Financial Platforms", image: "/images/finance.jpg" },
        { title: "Retail Experience", description: "Omnichannel commerce, customer intelligence and scalable digital experiences.", stat: "40+", label: "Retail Solutions", image: "/images/retail.jpg" },
        { title: "Education Systems", description: "Learning platforms, student portals and large-scale education transformation.", stat: "50+", label: "Education Platforms", image: "/images/education.jpg" },
      ],
    },
  },
  {
    id: "clients",
    label: "Our Clients",
    description: "“Trusted by organizations” heading and the three stat chips (logos stay in code).",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "TRUSTED BY ORGANIZATIONS" },
      { name: "heading", label: "Heading", type: "text", default: "Organizations That Trust Fillip" },
      { name: "stat1", label: "Stat 1", type: "text", default: "13+ Years Experience" },
      { name: "stat2", label: "Stat 2", type: "text", default: "1000+ Projects Delivered" },
      { name: "stat3", label: "Stat 3", type: "text", default: "20+ Industries Served" },
    ],
  },
  {
    id: "technology",
    label: "Technology Ecosystem",
    description: "“Our tech stack” heading and intro (the tech icons stay in code).",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "OUR TECH STACK" },
      { name: "headingLead", label: "Heading — line 1", type: "text", default: "Technologies Behind Every" },
      { name: "headingHighlight", label: "Heading — highlighted part", type: "text", default: "Intelligent Solution." },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "From AI and cloud platforms to modern frameworks and enterprise tools, we leverage proven technologies to build scalable digital experiences.",
      },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "“Client testimonials” heading, the rating card and the featured review.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "CLIENT TESTIMONIALS" },
      { name: "headingLine1", label: "Heading — line 1", type: "text", default: "Real Reviews." },
      { name: "headingLine2", label: "Heading — line 2 (highlighted)", type: "text", default: "Real Business Outcomes." },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "Trusted by businesses, organizations, and institutions across industries. Every review reflects real-world impact and measurable results.",
      },
      { name: "rating", label: "Rating value", type: "text", default: "4.8" },
      { name: "ratingLabel", label: "Rating label", type: "text", default: "Google Rating" },
      { name: "reviewCount", label: "Review count", type: "text", default: "137+" },
      { name: "reviewCountLabel", label: "Review count label", type: "text", default: "Verified Reviews" },
      { name: "badge", label: "Badge", type: "text", default: "Google Business Profile" },
      { name: "reviewTitle", label: "Featured review — title", type: "text", default: "Highly Recommended!" },
      {
        name: "reviewQuote",
        label: "Featured review — quote",
        type: "textarea",
        default:
          "I had an amazing experience with Fillip Technologies. Their approach was professional, transparent, and result-driven. The team helped us establish a stronger digital presence and execute solutions faster than expected.",
      },
      { name: "reviewAuthor", label: "Featured review — author", type: "text", default: "Sameer Verma" },
      { name: "reviewAuthorLabel", label: "Featured review — author label", type: "text", default: "Google Review" },
    ],
  },
];

export function getSection(id: string): Section | undefined {
  return HOME_SECTIONS.find((s) => s.id === id);
}

/** Default data object for a section: scalar field defaults + list defaults. */
export function sectionDefaults(section: Section): Record<string, unknown> {
  const data: Record<string, unknown> = Object.fromEntries(
    section.fields.map((f) => [f.name, f.default])
  );
  if (section.list) data[section.list.name] = section.list.default;
  return data;
}
