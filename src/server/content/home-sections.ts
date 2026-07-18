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

import {
  HOME_SERVICES, HOME_SERVICES_BG,
  HOME_INDUSTRIES,
  HOME_HUMANAI_BG1, HOME_HUMANAI_BG2,
  HOME_CLIENT_LOGOS,
  HOME_TECHNOLOGY_BG,
  HOME_TESTIMONIALS,
  HOME_WHY_CHOOSE,
  HOME_CASE_STUDIES, HOME_CASESTUDIES_BG,
  HOME_UNITS,
} from "@/data/home/defaults";

export type FieldType = "text" | "textarea" | "url" | "image";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  default: string;
  help?: string;
  // Optional subsection heading. Consecutive fields sharing a `group` are shown
  // together under this heading in the admin editor, so long forms read clearly.
  group?: string;
};

/** A field on each item within a list. */
export type ItemField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "image";
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
      { name: "heroImage", label: "Hero image", type: "image", default: "/images/hand.png" },
    ],
  },
  {
    id: "trustedby",
    label: "Trusted By",
    description: "Headline, intro paragraph and the four stat blocks below the hero.",
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
      { name: "stat1Value", label: "Stat 1 — value", type: "text", default: "3K+" },
      { name: "stat1Label", label: "Stat 1 — label", type: "text", default: "Clients Worldwide" },
      { name: "stat2Value", label: "Stat 2 — value", type: "text", default: "5K+" },
      { name: "stat2Label", label: "Stat 2 — label", type: "text", default: "Customer Satisfaction" },
      { name: "stat3Value", label: "Stat 3 — value", type: "text", default: "13+" },
      { name: "stat3Label", label: "Stat 3 — label", type: "text", default: "Years Experience" },
      { name: "ratingValue", label: "Rating — value", type: "text", default: "4.9/5" },
      { name: "ratingLabel", label: "Rating — label", type: "text", default: "Average Rating" },
      { name: "trustedLabel", label: "Bottom label", type: "text", default: "Trusted By Businesses Across Industries" },
    ],
  },
  {
    id: "capabilities",
    label: "Services",
    description: "Heading, intro, background image and the full service catalog (tabs + cards).",
    ready: true,
    fields: [
      { name: "headingLine1", label: "Heading — line 1", type: "text", default: "End-to-End Digital Services" },
      { name: "headingLine2", label: "Heading — line 2 (highlighted)", type: "text", default: "for Modern Organizations" },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "From websites and apps to enterprise software, performance marketing, and creative design, Fillip Technologies builds digital systems that help businesses launch, automate, and scale.",
      },
      { name: "backgroundImage", label: "Background image", type: "image", default: HOME_SERVICES_BG },
    ],
    list: {
      name: "services",
      label: "Service cards",
      itemNoun: "service",
      itemFields: [
        { name: "category", label: "Category (must match a tab)", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "icon", label: "Icon key", type: "text" },
        { name: "image", label: "Image", type: "image" },
      ],
      default: HOME_SERVICES as Record<string, string>[],
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
      { name: "backgroundImage1", label: "Background image (top-left)", type: "image", default: HOME_HUMANAI_BG1 },
      { name: "backgroundImage2", label: "Background image (bottom-right)", type: "image", default: HOME_HUMANAI_BG2 },
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
    label: "Industries",
    description: "Eyebrow, heading, intro and the industry accordion cards.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "Industries" },
      { name: "heading", label: "Heading", type: "text", default: "Industries We Empower" },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "We partner with businesses across diverse industries to build scalable digital products, AI-powered platforms and cloud-first solutions.",
      },
    ],
    list: {
      name: "cards",
      label: "Industry cards",
      itemNoun: "industry",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "href", label: "Link", type: "text" },
        { name: "image", label: "Image", type: "image" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "services", label: "Services (one per line)", type: "textarea" },
      ],
      default: HOME_INDUSTRIES as Record<string, string>[],
    },
  },
  {
    id: "clients",
    label: "Our Clients",
    description: "“Trusted by organizations” heading, the three stat chips and the client logo wall.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "TRUSTED BY ORGANIZATIONS" },
      { name: "heading", label: "Heading", type: "text", default: "Organizations That Trust Fillip" },
      { name: "stat1", label: "Stat 1", type: "text", default: "13+ Years Experience" },
      { name: "stat2", label: "Stat 2", type: "text", default: "1000+ Projects Delivered" },
      { name: "stat3", label: "Stat 3", type: "text", default: "20+ Industries Served" },
    ],
    list: {
      name: "logos",
      label: "Client logos",
      itemNoun: "logo",
      itemFields: [
        { name: "image", label: "Logo", type: "image" },
        { name: "alt", label: "Name / alt text", type: "text" },
        { name: "categories", label: "Tags (comma-separated: all, govt, healthcare, education, corporate, priority)", type: "text" },
      ],
      default: HOME_CLIENT_LOGOS as Record<string, string>[],
    },
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
      { name: "backgroundImage", label: "Background image", type: "image", default: HOME_TECHNOLOGY_BG },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Heading, rating summary and the testimonial cards.",
    ready: true,
    fields: [
      { name: "heading", label: "Heading", type: "text", default: "What our customers are saying" },
      { name: "rating", label: "Rating value", type: "text", default: "4.8/5" },
      { name: "reviewsLabel", label: "Reviews label", type: "text", default: "Based on 5,210+ reviews" },
    ],
    list: {
      name: "items",
      label: "Testimonials",
      itemNoun: "testimonial",
      itemFields: [
        { name: "name", label: "Name", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "image", label: "Photo", type: "image" },
        { name: "content", label: "Review", type: "textarea" },
      ],
      default: HOME_TESTIMONIALS as Record<string, string>[],
    },
  },
  {
    id: "needguidance",
    label: "Need Guidance CTA",
    description: "The “Not sure what solution fits” consultation prompt (with image).",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "Need Expert Advice?" },
      { name: "title", label: "Title", type: "text", default: "Not Sure What Solution Fits Your Business?" },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "Every business has different goals. Whether you need a website, mobile app, digital marketing, SEO, automation, or AI solutions, our experts will help you choose the right strategy.",
      },
      { name: "buttonText", label: "Button text", type: "text", default: "Talk To Our Experts →" },
      { name: "image", label: "Image", type: "image", default: "/images/ai-assistant.png" },
    ],
  },
  {
    id: "clientlistcta",
    label: "Client List CTA",
    description: "The “Can we add your business to our client list” banner (with image).",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "Your Next Step" },
      { name: "heading", label: "Heading", type: "text", default: "Can We Add Your Business To Our Client List Next?" },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "Join startups, growing businesses, and enterprises that trust Fillip Technologies to build, scale, and innovate with confidence. The next business we help grow could be yours.",
      },
      { name: "buttonText", label: "Button text", type: "text", default: "Let's Build Together →" },
      { name: "image", label: "Image", type: "image", default: "/images/ai-assistant.png" },
    ],
  },
  {
    id: "whychooseus",
    label: "Why Choose Us",
    description: "Heading + intro above the four feature cards (the cards stay in code).",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "Why Businesses Choose Fillip" },
      { name: "headingLine1", label: "Heading — line 1", type: "text", default: "Built For Growth." },
      { name: "headingLine2", label: "Heading — line 2", type: "text", default: "Designed For Results." },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "We combine strategy, technology, design, and AI expertise to help businesses build, scale, and grow with confidence in a rapidly evolving digital world.",
      },
      { name: "ctaLabel", label: "Button label", type: "text", default: "Learn More" },
    ],
    list: {
      name: "cards",
      label: "Feature cards",
      itemNoun: "card",
      itemFields: [
        { name: "icon", label: "Icon key", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image", label: "Background image", type: "image" },
      ],
      default: HOME_WHY_CHOOSE as Record<string, string>[],
    },
  },
  {
    id: "casestudies",
    label: "Case Studies",
    description: "Eyebrow, heading, intro, background image and the case-study carousel cards.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "CASE STUDIES" },
      { name: "headingLine1", label: "Heading — line 1", type: "text", default: "Results" },
      { name: "headingLine2", label: "Heading — line 2", type: "text", default: "That Speak" },
      { name: "headingLine3", label: "Heading — line 3", type: "text", default: "For Themselves" },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "Discover how strategy, technology, and execution helped our clients generate more leads, increase revenue, and scale faster.",
      },
      { name: "backgroundImage", label: "Background image", type: "image", default: HOME_CASESTUDIES_BG },
    ],
    list: {
      name: "items",
      label: "Case study cards",
      itemNoun: "case study",
      itemFields: [
        { name: "industry", label: "Industry", type: "text" },
        { name: "result", label: "Result badge", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image", label: "Image", type: "image" },
      ],
      default: HOME_CASE_STUDIES as Record<string, string>[],
    },
  },
  {
    id: "unitof",
    label: "A Unit Of",
    description: "The “A Unit Of” group section: heading, intro and the division cards with logos.",
    ready: true,
    fields: [
      { name: "headingLead", label: "Heading — lead", type: "text", default: "A Unit" },
      { name: "headingHighlight", label: "Heading — highlighted", type: "text", default: "Of" },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        default:
          "Fillip Technologies operates as a core digital development and execution wing under our group organizations, driving synergy across technical mentorship and advanced professional skill development.",
      },
    ],
    list: {
      name: "items",
      label: "Division cards",
      itemNoun: "division",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "subtitle", label: "Subtitle", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "logo", label: "Logo", type: "image" },
        { name: "link", label: "Website link", type: "text" },
        { name: "badge", label: "Badge", type: "text" },
      ],
      default: HOME_UNITS as Record<string, string>[],
    },
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
