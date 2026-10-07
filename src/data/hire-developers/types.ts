// Content model for the Hire Developers master page.
//
// shared.json holds content that is genuinely the same for every role
// (engagement models, hiring process, security, etc.). Each <role>.json holds
// the role-specific content and may override any shared section.
// Strings in shared.json can use {role}, {roles}, {Role}, {Roles} tokens,
// which are filled from the role's `role` names.

export type IconKey = string;

export type HireImage = { src: string; alt: string };

export type TitleParts = { before?: string; highlight: string; after?: string };

export type SectionHeading = {
  eyebrow: string;
  title: TitleParts;
  description?: string;
};

export type Cta = { label: string; href: string };

export type HireImageSlots = {
  heroImage?: HireImage | null;
  capabilitiesImage?: HireImage | null;
  stackImage?: HireImage | null;
  specialistImage?: HireImage | null;
  solutionsImage?: HireImage | null;
  whyFillipImage?: HireImage | null;
  engagementImage?: HireImage | null;
  hiringImage?: HireImage | null;
  collaborationImage?: HireImage | null;
  caseStudyImage?: HireImage | null;
  securityImage?: HireImage | null;
  finalCtaImage?: HireImage | null;
};

export type SectionVisibility = {
  showCapabilities?: boolean;
  showTechnologyStack?: boolean;
  showSpecialistTypes?: boolean;
  showUseCases?: boolean;
  showWhyFillip?: boolean;
  showEngagementModels?: boolean;
  showHiringProcess?: boolean;
  showCollaboration?: boolean;
  showCaseStudies?: boolean;
  showSecuritySection?: boolean;
  showCostSection?: boolean;
  showFaq?: boolean;
  showFinalCta?: boolean;
};

export type HeroContent = {
  eyebrow: string;
  title: TitleParts;
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  trustPoints: { label: string; icon: IconKey }[];
  stats: { value: string; label: [string, string] }[];
  floatingCards: {
    left: { title: string; subtitle: string; icon: IconKey };
    right: { title: string; subtitle: string; badges: string[] };
  };
};

export type IconItem = { title: string; description: string; icon: IconKey };

export type TechItem = {
  name: string;
  // false = not found in Fillip's existing site content; confirm before launch.
  verified: boolean;
};

export type TechCategory = {
  title: string;
  description: string;
  icon: IconKey;
  items: TechItem[];
};

export type UseCase = {
  title: string;
  icon: IconKey;
  problem: string;
  solution: string;
  applications: string[];
};

export type TeamMember = { name: string; role: string; image: string };

export type EngagementModel = {
  title: string;
  icon: IconKey;
  summary: string;
  purpose: string;
  bestFor: string[];
  facts: { label: string; value: string }[];
};

export type Project = {
  category: string;
  label?: string;
  title: string;
  description: string;
  challenge?: string;
  solution?: string;
  technology: string[];
  delivered?: string[];
  outcomes?: string[];
  image?: (HireImage & { width: number; height: number }) | null;
  href?: string;
  tryLive?: boolean;
};

export type CostFactor = {
  title: string;
  description: string;
  influences: number[];
  scale: { kind: "range"; from: string; to: string; stops?: string[] } | { kind: "options"; items: string[] };
};

export type FaqItem = { question: string; answer: string };

export type HireRoleContent = {
  slug: string;
  path: string;
  // Names used to fill {role}/{roles}/{Role}/{Roles}/{short}/{Short} tokens.
  role: { singular: string; plural: string; Singular: string; Plural: string; short: string; Short: string };
  seo: { title: string; metaTitle: string; metaDescription: string; keywords?: string[] };
  sections: SectionVisibility;
  images: HireImageSlots;
  hero: HeroContent;
  capabilities: SectionHeading & { items: IconItem[] };
  techStack: SectionHeading & { categories: TechCategory[] };
  specialists: SectionHeading & { caption: { title: string; subtitle: string }; items: { title: string; description: string }[] };
  useCases: SectionHeading & { items: UseCase[] };
  whyFillip: SectionHeading & { badge: string; tile: string; benefits: IconItem[]; team: TeamMember[][]; ctas: [Cta, Cta] };
  engagementModels: SectionHeading & { models: EngagementModel[] };
  hiringProcess: SectionHeading & {
    steps: IconItem[];
    brief: { role: string; experience: string; engagement: string; skills: string[] };
    profiles: TeamMember[];
    interviewer: TeamMember;
    team: TeamMember[];
    teamRoles: string[];
  };
  collaboration: SectionHeading & {
    centre: { title: string; subtitle: string; icon: IconKey };
    roles: { title: string; detail: string; icon: IconKey; x: number; y: number }[];
    workflow: { title: string; icon: IconKey }[];
    toolsHeading: string;
    toolGroups: { title: string; icon: IconKey; tools: TechItem[] }[];
  };
  caseStudies: SectionHeading & { featured: Project | null; secondary: Project[]; projectTypes: string[] };
  security: SectionHeading & {
    points: IconItem[];
    strip: { label: string; icon: IconKey }[];
    cta: { text: string; button: Cta };
  };
  cost: SectionHeading & { factors: CostFactor[]; flow: string[]; cta: { title: string; subtitle: string; button: Cta } };
  faq: SectionHeading & { items: FaqItem[] };
  finalCta: { eyebrow: string; title: TitleParts; description: string; primaryCta: Cta; secondaryCta: Cta };
};

// What a role file may contain: everything role-specific, plus optional
// overrides for any shared section.
export type HireRoleFile = Pick<HireRoleContent, "slug" | "path" | "role" | "seo" | "images"> &
  Partial<Omit<HireRoleContent, "slug" | "path" | "role" | "seo" | "images">> & {
    sections?: SectionVisibility;
    // Role-specific items added to the technology cost factor.
    costTechnologyItems?: string[];
    // Role-specific FAQs, placed before the shared FAQs.
    faqItems?: FaqItem[];
  };

export type HireDeveloperLink = { slug: string; label: string; href: string };
