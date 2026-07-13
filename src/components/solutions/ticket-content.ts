/**
 * Content shapes for the (CMS-driven) Ticket Booking solution page. The route
 * reads each section from `page.ticket-booking.<id>` and passes the merged data
 * (registry defaults + saved edits) into these props. Dashboard mock-ups, icons
 * and per-capability point chips stay in code (by position).
 */

export type TicketStat = { k: string; v: string };
export type TicketHeroContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  stats: TicketStat[];
};

export type TicketOfferCard = { title: string; body: string };
export type TicketOfferContent = {
  eyebrow: string;
  title: string;
  description: string;
  panelTitle: string;
  panelSubtitle: string;
  solutions: TicketOfferCard[];
};

export type TicketCapabilityBlock = { title: string; lead: string; body: string };
export type TicketCapabilitiesContent = {
  eyebrow: string;
  title: string;
  description: string;
  blocks: TicketCapabilityBlock[];
};

export type TicketStep = { t: string; d: string };
export type TicketHowItWorksContent = {
  eyebrow: string;
  title: string;
  description: string;
  steps: TicketStep[];
};

export type TicketLabel = { t: string };
export type TicketIndustriesContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: TicketLabel[];
};

export type TicketPillar = { t: string; d: string };
export type TicketWhyChooseContent = {
  eyebrow: string;
  title: string;
  description: string;
  pillars: TicketPillar[];
};

export type TicketDashboardContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: TicketLabel[];
};

export type TicketFaq = { q: string; a: string };
export type TicketFaqContent = {
  eyebrow: string;
  title: string;
  faqs: TicketFaq[];
};

export type TicketBookingContent = {
  hero: TicketHeroContent;
  offer: TicketOfferContent;
  capabilities: TicketCapabilitiesContent;
  howitworks: TicketHowItWorksContent;
  industries: TicketIndustriesContent;
  whychoose: TicketWhyChooseContent;
  dashboard: TicketDashboardContent;
  faq: TicketFaqContent;
};
