/**
 * Content shapes for the (CMS-driven) SMS Communication solution page. The route
 * reads each section from `page.sms-communication.<id>` and passes the merged
 * data into these props. The interactive simulator, phone mock-up, routing
 * diagram and pricing slider stay in code.
 */

export type SmsHeroContent = {
  headingLine1: string;
  headingLine2: string;
  description: string;
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
};

export type SmsIncludedItem = { text: string };
export type SmsPricingContent = {
  headingLine1: string;
  headingLine2: string;
  description: string;
  includedTitle: string;
  included: SmsIncludedItem[];
  ctaLabel: string;
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
