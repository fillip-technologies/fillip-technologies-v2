import type { Section } from "../home-sections";

const sections: Section[] = [
  {
    id: "hero",
    label: "Hero",
    description: "Top banner: badge, heading, intro, buttons and the status card.",
    ready: true,
    fields: [
      { name: "backgroundImage", label: "Background image", type: "image", default: "/images/new-hero-hard.png" },
      { name: "badge", label: "Badge", type: "text", default: "Tender Grade CCTV Surveillance" },
      { name: "heading", label: "Heading (line breaks allowed)", type: "textarea", default: "Large scale\nsurveillance for\ncritical sites." },
      { name: "description", label: "Description", type: "textarea", default: "We execute CCTV surveillance projects for government tenders, public infrastructure, institutions, industrial sites, campuses, and large commercial premises with professional planning, installation, and support." },
      { name: "primaryCtaLabel", label: "Primary button", type: "text", default: "Explore Solutions" },
      { name: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Watch Video" },
      { name: "statusLabel", label: "Status card — label", type: "text", default: "System Status" },
      { name: "statusValue", label: "Status card — value", type: "text", default: "Site Coverage Ready" },
      { name: "statusItem1", label: "Status card — item 1", type: "text", default: "Control Room Ready" },
      { name: "statusItem2", label: "Status card — item 2", type: "text", default: "Multi-Site Coverage" },
    ],
  },
  {
    id: "priority",
    label: "Protecting What Matters (cards)",
    description: "Heading, intro, button and the rotating solution cards.",
    ready: true,
    fields: [
      { name: "heading", label: "Heading (line breaks allowed)", type: "textarea", default: "Securing Large\nPublic & Private Sites" },
      { name: "description", label: "Description", type: "textarea", default: "We design and deploy surveillance infrastructure for large locations where coverage, reliability, documentation, and long-term support matter." },
      { name: "ctaLabel", label: "Button label", type: "text", default: "Contact Us" },
    ],
    list: {
      name: "cards",
      label: "Cards",
      itemNoun: "card",
      itemFields: [
        { name: "image", label: "Image", type: "image" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [
        { image: "/images/hardware/card_house.png", title: "Government Projects", description: "Tender-ready CCTV planning, installation, and documentation for public offices, municipal sites, and civic infrastructure." },
        { image: "/images/hardware/card_office.png", title: "Institutions & Campuses", description: "Scalable surveillance for schools, colleges, hospitals, parks, transport hubs, and high-footfall premises." },
        { image: "/images/hardware/card_garage.png", title: "Industrial & Warehouse Sites", description: "Wide-area monitoring for production zones, yards, stores, loading areas, and restricted operational spaces." },
        { image: "/images/hardware/card_apartment.png", title: "Control Room Projects", description: "Integrated camera networks, recording systems, displays, and operator-ready monitoring setups for large sites." },
      ],
    },
  },
  {
    id: "services",
    label: "Our Promise (features)",
    description: "Eyebrow, heading, intro, preview image and the three feature rows (icons stay in code).",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "/ Our Promise" },
      { name: "heading", label: "Heading (line breaks allowed)", type: "textarea", default: "Structured planning.\nReliable surveillance." },
      { name: "description", label: "Description", type: "textarea", default: "We combine site surveys, camera placement planning, network design, recording systems, and professional installation for dependable large-scale surveillance." },
      { name: "image", label: "Preview image", type: "image", default: "/images/hardware/security_lens_bg.png" },
      { name: "videoTitle", label: "Video caption", type: "text", default: "See how Fillip Technologies secures large premises" },
      { name: "watchLabel", label: "Watch link label", type: "text", default: "Watch Video" },
    ],
    list: {
      name: "features",
      label: "Feature rows",
      itemNoun: "feature",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [
        { title: "Site Survey & Planning", description: "Camera points, coverage zones, cable routes, NVR capacity, and network requirements planned before deployment." },
        { title: "Night & Outdoor Coverage", description: "Weather-ready cameras, low-light visibility, and placement strategy for gates, yards, roads, corridors, and open areas." },
        { title: "Central Recording & Monitoring", description: "NVR/DVR, storage, network access, display, and control-room-ready monitoring for large facilities." },
      ],
    },
  },
  {
    id: "support",
    label: "CCTV Solutions We Offer",
    description: "Heading, intro and the solution cards.",
    ready: true,
    fields: [
      { name: "heading", label: "Heading (line breaks allowed)", type: "textarea", default: "CCTV Project\nSolutions We Offer" },
      { name: "description", label: "Description", type: "textarea", default: "From tender-based CCTV execution to enterprise surveillance infrastructure, we provide large-site camera installation, monitoring, recording, networking, and support for government, institutional, industrial, and commercial projects." },
      { name: "ctaLabel", label: "Card link label", type: "text", default: "Explore Solution" },
    ],
    list: {
      name: "solutions",
      label: "Solution cards",
      itemNoun: "solution",
      itemFields: [
        { name: "image", label: "Image", type: "image" },
        { name: "imageAlt", label: "Image alt text", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [
        { image: "/images/hardware/security_hero.png", imageAlt: "Outdoor bullet CCTV camera", title: "IP & HD CCTV Camera Networks", description: "HD, 4K, dome, bullet, PTZ, and outdoor camera networks planned for entrances, perimeters, public areas, corridors, yards, and operational zones." },
        { image: "/images/hardware/service_monitoring.png", imageAlt: "Central CCTV monitoring room", title: "Control Room & Recording Setup", description: "NVR/DVR configuration, storage planning, video walls, monitoring displays, network access, and operator-ready control room deployment." },
        { image: "/images/hardware/service_security_system.png", imageAlt: "Access control and biometric security device", title: "Integrated Security Systems", description: "CCTV integration with access control, attendance, gate security, alarms, and site-level monitoring workflows for large premises." },
      ],
    },
  },
  {
    id: "benefits",
    label: "Why Choose Us (benefits)",
    description: "Eyebrow, heading and the four benefit cards (icons stay in code).",
    ready: true,
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", default: "/ Why Choose Us" },
      { name: "heading", label: "Heading (line breaks allowed)", type: "textarea", default: "Security you can trust.\nService you can count on." },
    ],
    list: {
      name: "benefits",
      label: "Benefit cards",
      itemNoun: "benefit",
      itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      default: [
        { title: "Tender-Ready Execution", description: "Project documentation, BOQ understanding, technical planning, and professional deployment for government and institutional requirements." },
        { title: "Large-Site Installation", description: "Structured cabling, camera mounting, network setup, storage configuration, and clean handover for big premises." },
        { title: "Centralized Monitoring", description: "Live feeds, recording access, multi-camera viewing, and control room support for security teams and operators." },
        { title: "Reliable Support", description: "Post-installation support, troubleshooting, maintenance, and system health checks for long-term performance." },
      ],
    },
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Badge, heading, intro and customer stories.",
    ready: true,
    fields: [
      { name: "badge", label: "Badge", type: "text", default: "Customer Stories" },
      { name: "title", label: "Title", type: "text", default: "Trusted Large-Scale Surveillance Projects" },
      { name: "description", label: "Description", type: "textarea", default: "Government departments, institutions, industrial sites, and large commercial premises rely on Fillip Technologies for dependable CCTV planning, installation, and support." },
    ],
    list: {
      name: "testimonials",
      label: "Testimonials",
      itemNoun: "testimonial",
      itemFields: [
        { name: "name", label: "Name", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "review", label: "Review", type: "textarea" },
        { name: "image", label: "Photo", type: "image" },
      ],
      default: [
        { name: "Amit Kumar", role: "Project Coordinator", review: "Fillip Technologies handled our CCTV deployment with proper planning, clean installation, and clear documentation. The team understood the scale of the site very well.", image: "" },
        { name: "Priya Sharma", role: "Institution Administrator", review: "We needed camera coverage across gates, corridors, and shared public areas. Their team planned the points professionally and delivered a stable monitoring setup.", image: "" },
        { name: "Rahul Verma", role: "Warehouse Operations Head", review: "Their team planned the right camera points for our warehouse, yard, and loading area. The system is stable, clear, and useful for both security and operations.", image: "" },
        { name: "Neha Singh", role: "Facility Manager", review: "The installation was organized and professional. Our security team now has better visibility across the premises and a more dependable recording setup.", image: "" },
      ],
    },
  },
  {
    id: "faqs",
    label: "FAQs",
    description: "Badge, heading, intro and the question/answer list.",
    ready: true,
    fields: [
      { name: "badge", label: "Badge", type: "text", default: "Security FAQs" },
      { name: "title", label: "Title", type: "text", default: "CCTV Questions, Answered" },
      { name: "description", label: "Description", type: "textarea", default: "Everything you need to know about tender-based CCTV projects, large-site installation, camera planning, control room setup, access control integration, and support." },
    ],
    list: {
      name: "faqs",
      label: "Questions",
      itemNoun: "question",
      itemFields: [
        { name: "question", label: "Question", type: "text" },
        { name: "answer", label: "Answer", type: "textarea" },
      ],
      default: [
        { question: "Do you provide CCTV work for government tenders and large projects?", answer: "Yes. Fillip Technologies executes CCTV surveillance projects for government tenders, public infrastructure, institutions, industrial sites, warehouses, campuses, hospitals, parks, and large commercial premises." },
        { question: "Do you help with site survey and camera point planning?", answer: "Yes. We assess the site layout, entry points, blind spots, cable routes, network requirements, storage needs, and monitoring workflow before finalizing the CCTV plan." },
        { question: "Can you set up a control room for CCTV monitoring?", answer: "Yes. We can configure NVR/DVR systems, storage, monitoring displays, video walls, network access, and operator-ready control room setups for large sites." },
        { question: "Can CCTV be integrated with access control and other security systems?", answer: "Yes. We can integrate CCTV with biometric access control, RFID systems, gate security, attendance systems, alarms, and site-level monitoring workflows." },
        { question: "Do you provide maintenance and support after installation?", answer: "Yes. Our team supports camera health checks, troubleshooting, recording setup, network checks, storage review, and ongoing maintenance for reliable long-term performance." },
      ],
    },
  },
];

export const securitySurveillanceGroup = {
  id: "security-surveillance",
  label: "Security Surveillance (Solution)",
  description: "The /hardware-solutions/security-surveillance page.",
  sections,
};
