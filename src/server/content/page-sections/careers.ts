import type { Section } from "../home-sections";

const sections: Section[] = [
  {
    id: "hero",
    label: "Hero",
    description: "The cover block at the top of the careers page.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "Careers at Fillip Technologies" },
      { name: "headingLead", label: "Heading — line 1", type: "text", default: "Do meaningful work with" },
      { name: "headingHighlight", label: "Heading — line 2 (highlighted)", type: "text", default: "good people." },
      { name: "subheadline", label: "Sub-headline", type: "textarea", default: "Join a team building digital products, intelligent systems and growth experiences for ambitious businesses." },
      { name: "ctaLabel", label: "Button label", type: "text", default: "View open roles" },
    ],
  },
  {
    id: "team",
    label: "People behind the work",
    description: "The intro section with stats and the two team photos.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "People behind the work" },
      { name: "heading", label: "Heading", type: "text", default: "A team that learns, builds and grows together." },
      { name: "description", label: "Description", type: "textarea", default: "At Fillip Technologies, thoughtful collaboration matters as much as technical skill. We give people room to ask better questions, own their work and create solutions with visible business impact." },
      { name: "stat1Value", label: "Stat 1 — value", type: "text", default: "10+" },
      { name: "stat1Label", label: "Stat 1 — label", type: "text", default: "Disciplines" },
      { name: "stat2Value", label: "Stat 2 — value", type: "text", default: "Real" },
      { name: "stat2Label", label: "Stat 2 — label", type: "text", default: "Ownership" },
      { name: "stat3Value", label: "Stat 3 — value", type: "text", default: "One" },
      { name: "stat3Label", label: "Stat 3 — label", type: "text", default: "Team" },
      { name: "image1", label: "Photo 1", type: "image", default: "/images/team/team1.png" },
      { name: "image2", label: "Photo 2", type: "image", default: "/images/team/team2.png" },
    ],
  },
  {
    id: "values",
    label: "How we work (values)",
    description: "The culture heading and value cards. Icons are automatic by position.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "How we work" },
      { name: "heading", label: "Heading", type: "text", default: "A culture built for thoughtful progress." },
    ],
    list: {
      name: "values",
      label: "Value cards",
      itemNoun: "value",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [
        { title: "Think with purpose", description: "Good ideas begin with curiosity and become valuable through clear execution." },
        { title: "Build together", description: "Designers, developers and strategists solve stronger problems as one team." },
        { title: "Keep improving", description: "We learn continuously, share feedback openly and raise the quality of our work." },
        { title: "Care about outcomes", description: "We take ownership of the experience we create for clients and their customers." },
      ],
    },
  },
  {
    id: "roles",
    label: "Open positions",
    description: "The open roles heading and the job openings list. These roles also populate the application form dropdown.",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "Open positions" },
      { name: "heading", label: "Heading", type: "text", default: "Find your next role." },
      { name: "description", label: "Description", type: "textarea", default: "We look for curious people who care about craft, communication and meaningful outcomes." },
      { name: "note", label: "No-role note", type: "textarea", default: "Do not see the perfect role? Select General application below and tell us how you can contribute." },
    ],
    list: {
      name: "roles",
      label: "Roles",
      itemNoun: "role",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "type", label: "Type", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [
        { title: "Frontend Developer", type: "Full time", location: "Patna / Hybrid", description: "Build responsive, accessible interfaces using React, Next.js and modern frontend practices." },
        { title: "Backend Developer", type: "Full time", location: "Patna / Hybrid", description: "Design reliable APIs, integrations and business systems that support scalable digital products." },
        { title: "UI/UX Designer", type: "Full time", location: "Patna / Hybrid", description: "Turn research and product requirements into clear, useful and polished customer experiences." },
        { title: "SEO Specialist", type: "Full time", location: "Patna / Hybrid", description: "Improve technical foundations, content visibility and measurable organic search performance." },
        { title: "Digital Marketing Executive", type: "Full time", location: "Patna / Hybrid", description: "Plan, launch and optimize campaigns across paid, social and performance marketing channels." },
        { title: "Business Development Executive", type: "Full time", location: "Patna / Hybrid", description: "Understand client goals, shape the right solution and build trusted business relationships." },
      ],
    },
  },
];

export const careersGroup = { id: "careers", label: "Careers", description: "The /others/carrer careers page.", sections };
