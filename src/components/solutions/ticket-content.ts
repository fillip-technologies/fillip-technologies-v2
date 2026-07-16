/**
 * Content shapes for the (CMS-driven) Ticket Booking solution page. The route
 * reads each section from `page.ticket-booking.<id>` and passes the merged data
 * (registry defaults + saved edits) into these props. Icons and the three
 * capability product-illustrations stay in code (by position); all readable
 * text, the hero dashboard mock and images are CMS-managed.
 */

export type TicketStat = { k: string; v: string };
export type TicketHeroContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  stats: TicketStat[];
  // Hero dashboard mock (illustrative booking + counter + analytics preview).
  mockUrl: string;
  mockBookingTag: string;
  mockBookingTitle: string;
  mockDateLabel: string;
  mockDateValue: string;
  mockGuestsLabel: string;
  mockGuestsValue: string;
  mockCategoryLabel: string;
  mockCategoryValue: string;
  mockSlotLabel: string;
  mockSlotValue: string;
  mockTotalLabel: string;
  mockTotalValue: string;
  mockPayLabel: string;
  mockTicketLabel: string;
  mockTicketCode: string;
  mockTicketNote: string;
  mockPosTag: string;
  mockPosTitle: string;
  mockPosBadge: string;
  mockPosRow1Label: string;
  mockPosRow1Value: string;
  mockPosRow2Label: string;
  mockPosRow2Value: string;
  mockPosRow3Label: string;
  mockPosRow3Value: string;
  mockPosIssueLabel: string;
  mockPosIssueValue: string;
  mockVisitorsLabel: string;
  mockVisitorsValue: string;
  mockVisitorsDelta: string;
  mockVisitorsNote: string;
  mockBadge1: string;
  mockBadge2: string;
};

export type TicketOfferCard = { title: string; body: string };
export type TicketOfferContent = {
  eyebrow: string;
  title: string;
  description: string;
  panelTitle: string;
  panelSubtitle: string;
  decorImage: string;
  panelItem1: string;
  panelItem2: string;
  panelItem3: string;
  panelItem4: string;
  panelItem5: string;
  solutions: TicketOfferCard[];
};

export type TicketCapabilityBlock = { title: string; lead: string; body: string; points: string };
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
  decorImage: string;
  steps: TicketStep[];
};

export type TicketLabel = { t: string };
export type TicketIndustriesContent = {
  eyebrow: string;
  title: string;
  description: string;
  itemCaption: string;
  items: TicketLabel[];
};

export type TicketPillar = { t: string; d: string };
export type TicketWhyChooseContent = {
  eyebrow: string;
  title: string;
  description: string;
  decorImage: string;
  pillars: TicketPillar[];
};

export type TicketDashboardContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
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
