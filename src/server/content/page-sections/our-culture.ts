import type { Section } from "../home-sections";

const sections: Section[] = [
  {
    id: "hero",
    label: "Hero",
    description: "Badge, heading, intro paragraph, the collage images and the four pillar cards.",
    ready: true,
    fields: [
      { name: "badge", label: "Badge", type: "text", default: "Our Culture", group: "Heading" },
      { name: "headingLead", label: "Heading — line 1", type: "text", default: "Shaping ideas through", group: "Heading" },
      { name: "headingHighlight", label: "Heading — line 2 (highlighted)", type: "text", default: "collaborative minds.", group: "Heading" },
      { name: "intro", label: "Intro paragraph", type: "textarea", default: "Culture at Fillip Technologies revolves around the concepts of curiosity, creativity, ownership, and innovation. We think that ideas come out of collaboration among brilliant people who are willing to question the status quo.", group: "Heading", help: "Shown under the heading. The words below are auto-highlighted; \"Fillip Technologies\" is auto-styled." },
      { name: "introHighlights", label: "Highlighted words", type: "text", default: "curiosity, creativity, ownership, innovation", group: "Heading", help: "Comma-separated words from the paragraph to show in blue." },
      { name: "cardLabel", label: "Lightbulb card label", type: "text", default: "Think Big", group: "Collage images" },
      { name: "image1", label: "Collage image 1 — workspace", type: "image", default: "/images/our-cult-1.jpg", group: "Collage images" },
      { name: "image2", label: "Collage image 2 — team", type: "image", default: "/images/our-cult-2.jpg", group: "Collage images" },
      { name: "image3", label: "Collage image 3 — research", type: "image", default: "/images/our-cult-3.jpg", group: "Collage images" },
      { name: "image4", label: "Collage image 4 — process", type: "image", default: "/images/How-we-work.png", group: "Collage images" },
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
    description: "The \"We Believe In\" grid and the quote banner.",
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
];

export const ourCultureGroup = { id: "our-culture", label: "Our Culture", description: "The /our-culture page.", sections };
