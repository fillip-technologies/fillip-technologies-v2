/**
 * Content shapes for the (CMS-driven) WhatsApp Business solution page. The
 * public route reads each section from `page.whatsapp-business.<id>` and passes
 * the merged data (registry defaults + saved edits) into these props. All text,
 * chat mock-ups and comparison columns are CMS-managed; only the lucide icons
 * and accent gradients stay in code (applied by position).
 */

export type WaLabelItem = { label: string };
/** A comparison / signal row tagged with the column it belongs to. */
export type WaSideItem = { label: string; side: string };

export type WaHeroContent = {
  badge: string;
  headingLead: string;
  headingHighlight: string;
  headingTail: string;
  subheading: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  pill1: string;
  pill2: string;
  pill3: string;
  chatName: string;
  chatStatus: string;
  chatIncoming: string;
  chatIncomingTime: string;
  chatReply: string;
  chatReplyTime: string;
  chatRoutedTitle: string;
  chatRoutedSubtitle: string;
  chatRoutedBadge: string;
  chatInputPlaceholder: string;
  floatLabel1: string;
  floatLabel2: string;
  floatLabel3: string;
  floatLabel4: string;
};

export type WaProblemContent = {
  eyebrow: string;
  heading: string;
  description: string;
  statusEarly: string;
  statusLate: string;
  steps: WaLabelItem[];
};

export type WaSolutionContent = {
  eyebrow: string;
  heading: string;
  description: string;
  subFirst: string;
  subMiddle: string;
  subLast: string;
  steps: WaLabelItem[];
};

export type WaUseCaseItem = {
  number: string;
  title: string;
  copy: string;
  msg1: string;
  msg2: string;
};
export type WaUsecasesContent = {
  eyebrow: string;
  heading: string;
  tag: string;
  activeLabel: string;
  deliveredLabel: string;
  chip1: string;
  chip2: string;
  chip3: string;
  items: WaUseCaseItem[];
};

export type WaDifferenceContent = {
  eyebrow: string;
  heading: string;
  description: string;
  leftTitle: string;
  leftHeading: string;
  rightTitle: string;
  rightHeading: string;
  items: WaSideItem[];
};

export type WaShowcaseContent = {
  eyebrow: string;
  heading: string;
  engineTitle: string;
  engineSubtitle: string;
  signals: WaSideItem[];
};

export type WaIndustriesContent = {
  eyebrow: string;
  heading: string;
  industries: WaLabelItem[];
};

export type WaReasonItem = { number: string; title: string; copy: string };
export type WaWhyusContent = {
  eyebrow: string;
  heading: string;
  description: string;
  items: WaReasonItem[];
};

export type WaMetric = { value: string; suffix: string; label: string };
export type WaResultsContent = {
  eyebrow: string;
  heading: string;
  description: string;
  metrics: WaMetric[];
};

export type WaCtaContent = {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export type WhatsAppBusinessContent = {
  hero: WaHeroContent;
  problem: WaProblemContent;
  solution: WaSolutionContent;
  usecases: WaUsecasesContent;
  difference: WaDifferenceContent;
  showcase: WaShowcaseContent;
  industries: WaIndustriesContent;
  whyus: WaWhyusContent;
  results: WaResultsContent;
  cta: WaCtaContent;
};
