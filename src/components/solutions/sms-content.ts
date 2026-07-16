/**
 * Content shapes for the (CMS-driven) SMS Communication solution page. The route
 * reads each section from `page.sms-communication.<id>` and passes the merged
 * data into these props. All labels for the simulator, phone mock-up, routing
 * diagram and pricing tiers are CMS-managed; only the live behaviour (clock,
 * slider position, char counter, tier thresholds) stays in code.
 */

export type SmsHeroContent = {
  headingLine1: string;
  headingLine2: string;
  description: string;
  consoleTitle: string;
  consoleNote: string;
  senderLabel: string;
  destLabel: string;
  destValue: string;
  bodyLabel: string;
  sendLabel: string;
  sendingLabel: string;
  messagePlaceholder: string;
  senderIdDefault: string;
  messageDefault: string;
  phoneDate: string;
  notifNow: string;
  deliveredNote: string;
};

export type SmsFeatureItem = { title: string; desc: string };
export type SmsFeaturesContent = {
  headingLine1: string;
  headingLine2: string;
  description: string;
  items: SmsFeatureItem[];
};

export type SmsApiItem = { title: string; desc: string };
export type SmsApiContent = {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  leftTitle: string;
  leftDescription: string;
  items: SmsApiItem[];
  // Routing flow diagram (fixed 3-step visual).
  flowTitle: string;
  flowSubtitle: string;
  stepLabel: string;
  flow1Title: string;
  flow1Desc: string;
  flow2Title: string;
  flow2Desc: string;
  flow3Title: string;
  flow3Desc: string;
  footerLeft: string;
  footerRight: string;
};

export type SmsIncludedItem = { text: string };
export type SmsPricingContent = {
  headingLine1: string;
  headingLine2: string;
  description: string;
  includedTitle: string;
  included: SmsIncludedItem[];
  ctaLabel: string;
  estimateLabel: string;
  smsUnit: string;
  routeTypeLabel: string;
  setupTimeLabel: string;
  supportLabel: string;
  featuresBadge: string;
  mark1: string;
  mark2: string;
  mark3: string;
  mark4: string;
  legend1: string;
  legend2: string;
  legend3: string;
  legend4: string;
  tier1RouteType: string;
  tier1SetupTime: string;
  tier1Support: string;
  tier1Badge: string;
  tier2RouteType: string;
  tier2SetupTime: string;
  tier2Support: string;
  tier2Badge: string;
  tier3RouteType: string;
  tier3SetupTime: string;
  tier3Support: string;
  tier3Badge: string;
  tier4RouteType: string;
  tier4SetupTime: string;
  tier4Support: string;
  tier4Badge: string;
};

export type SmsFaqItem = { q: string; a: string };
export type SmsFaqContent = {
  badge: string;
  heading: string;
  faqs: SmsFaqItem[];
};

export type SmsCommunicationContent = {
  hero: SmsHeroContent;
  features: SmsFeaturesContent;
  api: SmsApiContent;
  pricing: SmsPricingContent;
  faq: SmsFaqContent;
};
