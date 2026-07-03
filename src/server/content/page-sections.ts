/**
 * CMS registry for the standalone "About" pages (Our Story, Portfolio, Our
 * Culture). Mirrors the Home page registry ([[home-sections]]) but grouped per
 * page. Each section maps to one `site_content` row keyed `page.<page>.<id>`.
 *
 * Reuses the Section/Field types + generic editor from home-sections. Section
 * text, images and repeatable card lists are editable; purely visual props
 * (icons, gradients, accent colours) stay code-derived by index.
 */

import type { Section } from "./home-sections";
import { sectionDefaults } from "./home-sections";

export type PageGroup = {
  id: string; // matches the route slug, e.g. "our-story"
  label: string;
  description: string;
  sections: Section[];
};

export const ABOUT_PAGES: PageGroup[] = [
  {
    id: "our-story",
    label: "Our Story",
    description: "The /our-story page.",
    sections: [
      {
        id: "hero",
        label: "Hero",
        description: "The cover title block at the top of the page.",
        ready: true,
        fields: [
          { name: "badge", label: "Badge", type: "text", default: "Volume 01: The Journey" },
          { name: "headingLead", label: "Heading — line 1", type: "text", default: "The Story of" },
          { name: "headingHighlight", label: "Heading — line 2 (highlighted)", type: "text", default: "Fillip Technologies" },
          {
            name: "subheadline",
            label: "Sub-headline",
            type: "textarea",
            default:
              "Explore the milestones, minds, and methodologies that built our agency from a three-person workspace into a powerhouse of digital transformation.",
          },
        ],
      },
      {
        id: "stats",
        label: "Stats bar",
        description: "The four metric figures below the hero.",
        ready: true,
        fields: [],
        list: {
          name: "stats",
          label: "Stats",
          itemNoun: "stat",
          itemFields: [
            { name: "value", label: "Value", type: "text" },
            { name: "label", label: "Label", type: "text" },
          ],
          default: [
            { value: "13+", label: "Years of Innovation" },
            { value: "1500+", label: "Projects Delivered" },
            { value: "50+", label: "Team Experts" },
            { value: "98%", label: "Client Satisfaction" },
          ],
        },
      },
      {
        id: "timeline",
        label: "Timeline (chapters)",
        description: "The flip-book chapters. Icons/colours are automatic.",
        ready: true,
        fields: [],
        list: {
          name: "chapters",
          label: "Chapters",
          itemNoun: "chapter",
          itemFields: [
            { name: "year", label: "Year", type: "text" },
            { name: "title", label: "Title", type: "text" },
            { name: "story", label: "Story", type: "textarea" },
            { name: "quote", label: "Quote", type: "textarea" },
            { name: "image", label: "Photo", type: "image" },
            { name: "stat1Label", label: "Ledger 1 — label", type: "text" },
            { name: "stat1Value", label: "Ledger 1 — value", type: "text" },
            { name: "stat2Label", label: "Ledger 2 — label", type: "text" },
            { name: "stat2Value", label: "Ledger 2 — value", type: "text" },
            { name: "stat3Label", label: "Ledger 3 — label", type: "text" },
            { name: "stat3Value", label: "Ledger 3 — value", type: "text" },
          ],
          default: [
            { year: "2018", title: "The Seed is Sown", story: "illip Technologies starts in a small incubation space with a core team of three digital visionaries and a goal to bridge the tech-marketing divide. We set up our first workflow systems and focused on building custom, client-centric web platforms.", quote: "We didn't have funding or fancy desks. We just had a vision that code and marketing must act as one.", image: "/images/saas-desk-setup.png", stat1Label: "Core Team", stat1Value: "3 Experts", stat2Label: "Primary Tech", stat2Value: "HTML5, PHP, CSS", stat3Label: "Projects", stat3Value: "12 Completed" },
            { year: "2020", title: "Transition to Digital", story: "s the world transitions, we support brick-and-mortar brands in shifting to robust e-commerce and secure, remote workflows. We designed custom payment integrations and secured databases to help companies withstand global disruption.", quote: "Disruption forced the world to adapt. We stood beside our clients to build resilience, remote systems, and e-commerce.", image: "/images/How-we-work.png", stat1Label: "Core Team", stat1Value: "15 Experts", stat2Label: "Primary Tech", stat2Value: "React, Node, PostgreSQL", stat3Label: "Projects", stat3Value: "45 Completed" },
            { year: "2022", title: "Growth & Scaling", story: "e expand our expertise to custom software development and advanced branding, growing our team to 40+ professionals and moving to a larger headquarters. We established rigorous automation standards to match the expectations of larger enterprise partners.", quote: "Growth is not just about size. It is about standardizing excellence, automating pipelines, and moving to our main office.", image: "/images/capabilities-background.png", stat1Label: "Core Team", stat1Value: "40+ Experts", stat2Label: "Primary Tech", stat2Value: "Next.js, Tailwind, NestJS", stat3Label: "Projects", stat3Value: "95+ Completed" },
            { year: "2024", title: "Global Operations", story: "stablishing partnerships with global brands across 5+ countries, establishing our presence in international digital consulting. We redesigned workflows, built scalable portals, and proved that a client-first agency can deliver elite code worldwide.", quote: "Borders are constructs. True engineering talent speaks a universal language of quality and speed.", image: "/images/research-mockup.png", stat1Label: "Core Team", stat1Value: "50+ Experts", stat2Label: "Primary Tech", stat2Value: "AWS, GCP, GraphQL, Python", stat3Label: "Projects", stat3Value: "140+ Completed" },
            { year: "2026 & Beyond", title: "Next Gen AI & SaaS", story: "ushing boundaries with custom AI integrations, chatbot agents, and automated SaaS products to lead the next generation of tech. We believe AI will define modern product scaling, and we are already delivering the pipelines that make it happen.", quote: "AI will not replace strategy; it will amplify it. We are building the automated pipelines of tomorrow, today.", image: "/images/team/team1.png", stat1Label: "Core Team", stat1Value: "55+ Experts", stat2Label: "Primary Tech", stat2Value: "LangChain, OpenAI API, SaaS", stat3Label: "Projects", stat3Value: "150+ Completed" },
          ],
        },
      },
      {
        id: "missionvision",
        label: "Mission / Vision (Afterword)",
        description: "The three columns (Mission, Vision, Creed) and closing signature.",
        ready: true,
        fields: [
          { name: "eyebrow", label: "Eyebrow", type: "text", default: "AFTERWORD" },
          { name: "heading", label: "Heading", type: "text", default: "The Next Chapter" },
          { name: "missionText", label: "Our Mission", type: "textarea", default: "To empower modern brands with high-performance custom engineering and search optimization, transforming complex operational workflows and marketing budgets into measurable business growth." },
          { name: "visionText", label: "Our Vision", type: "textarea", default: "To establish ourselves as a global benchmark for digital execution, proving that client transparency, clean scalable code, and creative engineering can consistently win on the international stage." },
          { name: "creedText", label: "Our Creed", type: "textarea", default: "We make commitments, not excuses. We work with absolute accountability, refuse code shortcuts, and measure our agency's reputation directly by the scalability and success of the products we launch." },
          { name: "signatureLead", label: "Signature line", type: "text", default: "Signed in code and character," },
          { name: "signatureName", label: "Signature name", type: "text", default: "The Fillip Team" },
        ],
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    description: "The /portfolio page.",
    sections: [
      {
        id: "hero",
        label: "Hero",
        description: "Heading + intro above the fanned project cards (cards stay in code).",
        ready: true,
        fields: [
          { name: "headingLead", label: "Heading — line 1", type: "text", default: "Ideas shaped into" },
          { name: "headingHighlight", label: "Heading — line 2 (highlighted)", type: "text", default: "digital experiences." },
          { name: "description", label: "Description", type: "textarea", default: "Explore digital products, platforms and growth experiences built by Fillip Technologies for ambitious businesses and public institutions." },
        ],
      },
      {
        id: "showcase",
        label: "Showcase (case studies)",
        description: "The horizontal case-study runway.",
        ready: true,
        fields: [
          { name: "eyebrow", label: "Eyebrow", type: "text", default: "✦ Selected Case Studies" },
          { name: "heading", label: "Heading", type: "text", default: "Our Portfolio" },
        ],
        list: {
          name: "projects",
          label: "Case studies",
          itemNoun: "case study",
          itemFields: [
            { name: "serial", label: "Serial", type: "text" },
            { name: "title", label: "Title", type: "text" },
            { name: "category", label: "Category", type: "text" },
            { name: "client", label: "Client", type: "text" },
            { name: "desc", label: "Description", type: "textarea" },
            { name: "tag", label: "Tag", type: "text" },
            { name: "image", label: "Image", type: "image" },
            { name: "url", label: "Display URL", type: "text" },
            { name: "link", label: "Link (or #)", type: "text" },
          ],
          default: [
            { serial: "01", title: "Litera Valley School", category: "Web Development", client: "Litera Valley Patna", desc: "A custom-engineered high-performance educational portal built for Patna's premier school, integrating student dashboards, admissions, and content systems.", tag: "EDUCATION PORTAL", image: "/images/portfolio/litera-mockup.png", url: "www.literavalleypatna.in", link: "https://www.literavalleypatna.in" },
            { serial: "02", title: "Sita Interior", category: "Web Development", client: "Sita Design Labs", desc: "A luxury portfolio catalog and high-end visualizer for luxury interior design, with dynamic rendering, modular filters, and gallery showcases.", tag: "INTERIOR ARCHITECTURE", image: "/images/portfolio/sita-mockup.png", url: "www.sitainterior.com", link: "#" },
            { serial: "03", title: "Domus Cure", category: "Mobile Apps", client: "Domus Health Group", desc: "A comprehensive telemedicine application connecting patients with healthcare professionals, integrating video calls, prescriptions, and diagnostics.", tag: "TELEHEALTH APP", image: "/images/portfolio/domus-mockup.png", url: "www.domuscure.org", link: "#" },
            { serial: "04", title: "Dr Abhijeet Jha", category: "Graphic Design & Branding", client: "Dr. Jha Dermacare", desc: "Complete dermatological clinic branding, print collaterals, and premium visual identity matching a minimalist medical aesthetic.", tag: "CLINICAL BRANDING", image: "/images/portfolio/abhijeet-mockup.png", url: "www.drabhijeetjha.com", link: "#" },
            { serial: "05", title: "Chappak Resort", category: "Graphic Design & Branding", client: "Chappak Hospitality", desc: "Experiential hospitality branding, resort wayfinding print collateral, maps, and premium stationary systems.", tag: "RESORT BRAND IDENTITY", image: "/images/portfolio/chaapak-mockup.png", url: "www.chappakresorts.com", link: "#" },
            { serial: "06", title: "Weddings72", category: "Graphic Design & Branding", client: "Weddings72 Planners", desc: "Bespoke high-end wedding planning stationery, invitation kits, and elegant luxury packaging designs.", tag: "EVENT STATIONERY", image: "/images/portfolio/wedding-mockups.png", url: "www.weddings72.com", link: "#" },
            { serial: "07", title: "Technosys Management", category: "Mobile Apps", client: "Technosys IT Group", desc: "Corporate management and CRM application built for field sales tracking, internal task pipelines, and lead pipelines.", tag: "ENTERPRISE CRM APP", image: "/images/portfolio/technosys-mockup.png", url: "crm.technosys.co.in", link: "#" },
            { serial: "08", title: "Patna Zoo Portal", category: "Web Development", client: "Bihar Forest Dept.", desc: "Ticketing platform, online booking system, and interactive map database serving millions of annual visitors for the Bihar Government.", tag: "GOVERNMENT PORTAL", image: "/images/patna-zoo-portal.png", url: "www.patnazoo.bihar.gov.in", link: "https://www.patnazoo.bihar.gov.in" },
          ],
        },
      },
      {
        id: "industries",
        label: "Industries",
        description: "The expandable industries accordion.",
        ready: true,
        fields: [
          { name: "eyebrow", label: "Eyebrow", type: "text", default: "✦ Industries We Serve" },
          { name: "heading", label: "Heading", type: "text", default: "Our Industries" },
          { name: "description", label: "Description", type: "textarea", default: "We design and engineer bespoke software applications, web platforms, and design systems across core industry sectors." },
        ],
        list: {
          name: "industries",
          label: "Industries",
          itemNoun: "industry",
          itemFields: [
            { name: "num", label: "Number", type: "text" },
            { name: "title", label: "Title", type: "text" },
            { name: "desc", label: "Description", type: "textarea" },
            { name: "image", label: "Image", type: "image" },
            { name: "caseStudy", label: "Featured project", type: "text" },
            { name: "svc1Title", label: "Service 1 — title", type: "text" },
            { name: "svc1Desc", label: "Service 1 — desc", type: "text" },
            { name: "svc2Title", label: "Service 2 — title", type: "text" },
            { name: "svc2Desc", label: "Service 2 — desc", type: "text" },
            { name: "svc3Title", label: "Service 3 — title", type: "text" },
            { name: "svc3Desc", label: "Service 3 — desc", type: "text" },
            { name: "svc4Title", label: "Service 4 — title", type: "text" },
            { name: "svc4Desc", label: "Service 4 — desc", type: "text" },
          ],
          default: [
            { num: "01", title: "Education & E-Learning", desc: "Interactive e-learning environments, student information pipelines, and custom administrative portals that streamline admissions and course management.", image: "/images/portfolio/litera-mockup.png", caseStudy: "Litera Valley School Portal", svc1Title: "LMS Integration", svc1Desc: "Custom courseware and grading dashboard systems.", svc2Title: "Student Dashboards", svc2Desc: "Interactive student portal interfaces.", svc3Title: "Admission Pipelines", svc3Desc: "Digital registration and fee collection portals.", svc4Title: "Responsive Web Apps", svc4Desc: "Mobile-first school content administration systems." },
            { num: "02", title: "Healthcare & Wellness", desc: "HIPAA-compliant telemedicine platforms, doctor appointment bookings, and virtual consultations connecting patients with specialists instantly.", image: "/images/portfolio/domus-mockup.png", caseStudy: "Domus Cure Telehealth App", svc1Title: "Telehealth Apps", svc1Desc: "Secure WebRTC-based remote consultation portals.", svc2Title: "Appointment Systems", svc2Desc: "Live scheduling locks and SMS reminders.", svc3Title: "Patient Records", svc3Desc: "Secure electronic health record integrations.", svc4Title: "Doctor Dashboards", svc4Desc: "Custom workflows and clinical notes dashboards." },
            { num: "03", title: "Real Estate & Architecture", desc: "Luxury visual catalogs, interactive site layout planners, and property search portals with high-definition rendering showcases.", image: "/images/portfolio/sita-mockup.png", caseStudy: "Sita Interior Showcase", svc1Title: "Visual Catalogs", svc1Desc: "Luxury furniture and blueprint display grids.", svc2Title: "Virtual Planners", svc2Desc: "Interactive room design layouts and search.", svc3Title: "Lead Pipelines", svc3Desc: "Custom contact and project briefing engines.", svc4Title: "Admin Inventories", svc4Desc: "Catalog databases and item control consoles." },
            { num: "04", title: "Hospitality & Events", desc: "Bespoke hotel booking engines, resort wayfinding guides, interactive maps, and elegant event planner branding systems.", image: "/images/portfolio/wedding-mockups.png", caseStudy: "Weddings72 Event Brand", svc1Title: "Booking Engines", svc1Desc: "Live booking calendars and reservation databases.", svc2Title: "Event Portals", svc2Desc: "Luxury stationary packaging and invitation systems.", svc3Title: "Wayfinding Guides", svc3Desc: "Interactive resort maps and visitor portals.", svc4Title: "Experiential Branding", svc4Desc: "Visual branding and collateral design files." },
          ],
        },
      },
      {
        id: "impact",
        label: "Impact — metrics",
        description: "Heading + the four metric cards.",
        ready: true,
        fields: [
          { name: "eyebrow", label: "Eyebrow", type: "text", default: "Proof in Performance" },
          { name: "headingLine1", label: "Heading — line 1", type: "text", default: "Real Projects." },
          { name: "headingLine2", label: "Heading — line 2 (highlighted)", type: "text", default: "Measurable Success." },
          { name: "description", label: "Description", type: "textarea", default: "We don't just build interfaces; we engineer digital products that drive engagement, scale operations, and deliver real return on investment." },
        ],
        list: {
          name: "metrics",
          label: "Metrics",
          itemNoun: "metric",
          itemFields: [
            { name: "value", label: "Value", type: "text" },
            { name: "label", label: "Label", type: "text" },
            { name: "desc", label: "Description", type: "textarea" },
            { name: "badgeText", label: "Badge", type: "text" },
          ],
          default: [
            { value: "45+", label: "Projects Delivered", desc: "High-performance custom web apps, mobile apps, and branding identities engineered to scale.", badgeText: "98% On-Time" },
            { value: "2.4M+", label: "Active Users Engaged", desc: "Millions of monthly interactions handled securely across client portals and public websites.", badgeText: "High-Throughput" },
            { value: "0.4s", label: "Average Page Load", desc: "Lightning fast speed optimized using next-gen asset delivery and strict core web vitals.", badgeText: "Grade-A Performance" },
            { value: "96%", label: "Client Retention", desc: "Long-term relationships built on collaborative planning, transparent scopes, and success.", badgeText: "Top Tier Support" },
          ],
        },
      },
      {
        id: "impactstories",
        label: "Impact — client stories",
        description: "The selectable client testimonial cases.",
        ready: true,
        fields: [],
        list: {
          name: "testimonials",
          label: "Client stories",
          itemNoun: "story",
          itemFields: [
            { name: "company", label: "Company", type: "text" },
            { name: "client", label: "Client", type: "text" },
            { name: "role", label: "Role", type: "text" },
            { name: "industry", label: "Industry", type: "text" },
            { name: "quote", label: "Quote", type: "textarea" },
            { name: "stat", label: "Stat", type: "text" },
            { name: "statLabel", label: "Stat label", type: "text" },
            { name: "projectUrl", label: "Project URL", type: "text" },
          ],
          default: [
            { company: "Litera Valley Patna", client: "Administration & IT Team", role: "Portal Overseers", industry: "Education Technology", quote: "Fillip Technologies built a high-performance educational portal that completely transformed our enrollment pipeline. The system handles thousands of concurrent student applications without a hitch, and the management dashboard is incredibly intuitive.", stat: "+140% Admissions", statLabel: "Increase in online applications year-over-year", projectUrl: "www.literavalleypatna.in" },
            { company: "Sita Interior", client: "S. K. Sinha", role: "Founder & Lead Architect", industry: "Architecture & Design", quote: "Our interactive digital showroom catalog changed the way we pitch to high-ticket corporate and residential clients. The modular catalog and search filters are exceptionally smooth, giving us a true edge.", stat: "3x Conversions", statLabel: "Improvement in qualified design leads", projectUrl: "www.sitainterior.com" },
            { company: "Domus Cure", client: "Dr. A. K. Sharma", role: "Director of Clinical Operations", industry: "Telehealth & Medicine", quote: "We needed a secure, HIPAA-compliant telehealth application. Fillip delivered an excellent WebRTC calling architecture that connects our emergency doctors and patients in less than three seconds. Highly recommended.", stat: "99.99% Uptime", statLabel: "Maintained for all remote video consultations", projectUrl: "www.domuscure.org" },
            { company: "Weddings72", client: "Creative Design Lead", role: "Executive Planner", industry: "Luxury Hospitality", quote: "Fillip's branding team completely nailed the high-end luxury aesthetic. From gold-foiled print assets to beautiful invitations, our new visual identity perfectly communicates the quality we provide.", stat: "100% Match", statLabel: "Consistency in digital and print branding assets", projectUrl: "www.weddings72.com" },
          ],
        },
      },
    ],
  },
  {
    id: "our-culture",
    label: "Our Culture",
    description: "The /our-culture page.",
    sections: [
      {
        id: "hero",
        label: "Hero",
        description: "Badge, heading and the four pillar cards.",
        ready: true,
        fields: [
          { name: "badge", label: "Badge", type: "text", default: "Our Culture" },
          { name: "headingLead", label: "Heading — line 1", type: "text", default: "Shaping ideas through" },
          { name: "headingHighlight", label: "Heading — line 2 (highlighted)", type: "text", default: "collaborative minds." },
        ],
        list: {
          name: "pillars",
          label: "Pillars",
          itemNoun: "pillar",
          itemFields: [
            { name: "title", label: "Title", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
          ],
          default: [
            { title: "Curiosity", description: "Always asking 'why', exploring new ideas, and seeking out better ways to solve complex challenges." },
            { title: "Creativity", description: "Thinking beyond conventional boundaries to craft solutions that are purposeful and visually stunning." },
            { title: "Ownership", description: "Taking deep pride in our work, acting with high accountability, and driving projects to success." },
            { title: "Innovation", description: "Challenging the status quo to transform forward-thinking concepts into real-world business value." },
          ],
        },
      },
      {
        id: "beliefs",
        label: "Beliefs",
        description: "The “We Believe In” grid and the quote banner.",
        ready: true,
        fields: [
          { name: "heading", label: "Heading", type: "text", default: "We Believe In" },
          { name: "description", label: "Description", type: "textarea", default: "Our core beliefs are not just slogans on a wall. They guide how we think, how we work, and how we interact with our clients and each other every single day." },
          { name: "quoteEyebrow", label: "Quote eyebrow", type: "text", default: "PEOPLE & PERFORMANCE" },
          { name: "quote", label: "Quote", type: "textarea", default: "Every one of us at Fillip Technologies works towards creating an environment that respects people as much as performance." },
          { name: "quoteCite", label: "Quote citation", type: "text", default: "As great performance starts with great people." },
        ],
        list: {
          name: "beliefs",
          label: "Belief cards",
          itemNoun: "belief",
          itemFields: [
            { name: "title", label: "Title", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
          ],
          default: [
            { title: "Thinking Beyond Boundaries", description: "We don't limit ourselves to conventional thinking. We push past predefined constraints to discover breakthrough ideas that shape markets." },
            { title: "Boundless Learning", description: "Growth is a lifelong pursuit. We foster a mindset of constant curiosity, continuous upskilling, and sharing knowledge across teams." },
            { title: "Purposeful Creativity", description: "Creativity without strategy is just art. We design and innovate with clear intent, ensuring every solution solves a real-world problem." },
            { title: "Respectful Collaboration", description: "The best ideas are born from collaboration among diverse minds. We communicate openly, respect every voice, and win as a single team." },
            { title: "Excellence in Execution", description: "Strategy is nothing without execution. We maintain high quality standards, work with precision, and deliver measurable business impact." },
            { title: "Empowering Partners", description: "We align our efforts with our clients' long-term business goals, measuring our success by the actual value and growth we help them achieve." },
          ],
        },
      },
      {
        id: "approach",
        label: "Approach (methodology)",
        description: "The 5-step methodology timeline.",
        ready: true,
        fields: [
          { name: "eyebrow", label: "Eyebrow", type: "text", default: "METHODOLOGY" },
          { name: "heading", label: "Heading", type: "text", default: "Our Approach: Simple Yet Powerful" },
          { name: "description", label: "Description", type: "textarea", default: "Being the best lead generation agency, we follow a step-by-step and collaborative process, ensuring every project is designed for success." },
        ],
        list: {
          name: "steps",
          label: "Steps",
          itemNoun: "step",
          itemFields: [
            { name: "phase", label: "Phase", type: "text" },
            { name: "title", label: "Title", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
          ],
          default: [
            { phase: "01", title: "Discover", description: "We are aware of your business objectives, target audience, and market competitiveness." },
            { phase: "02", title: "Strategize", description: "We plan a customized roadmap that aligns with your growth objectives." },
            { phase: "03", title: "Create", description: "We first design, develop, and market solutions that adhere to your brand identity." },
            { phase: "04", title: "Optimise", description: "Our persistent monitoring and improvement ensure optimised performance and results." },
            { phase: "05", title: "Grow", description: "We make sure that your business grows with our long-lasting business strategies." },
          ],
        },
      },
    ],
  },
];

export function getPageGroup(id: string): PageGroup | undefined {
  return ABOUT_PAGES.find((p) => p.id === id);
}

export function getPageSection(groupId: string, sectionId: string): Section | undefined {
  return getPageGroup(groupId)?.sections.find((s) => s.id === sectionId);
}

/** Default data for a page section (scalar defaults + any list defaults). */
export function pageSectionDefaults(section: Section): Record<string, unknown> {
  return sectionDefaults(section);
}
