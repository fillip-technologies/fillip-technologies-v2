export type ServiceChallenge = {
  title: string;
  description: string;
};

export type ServiceBuildCard = {
  eyebrow?: string;
  title: string;
  description: string;
  metric?: string;
  tags?: string[];
};

export type ServiceTechStack = {
  title: string;
  description: string;
  technologies: string[];
};

export type ServiceProcessStep = {
  title: string;
  items: string[];
};

export type ServiceOutcomeStat = {
  value: string;
  label: string;
};

export type Service = {
  slug: string;
  hero: {
    title: string;
    prefixText?: string;
    highlightedTitle: string;
    suffixText?: string;
    description: string;
  };
  challenges: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    secondaryDescription: string;
    cta: string;
    items: ServiceChallenge[];
  };
  whatWeBuild: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    cards: ServiceBuildCard[];
  };
  technologyStack: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    stacks: Record<string, ServiceTechStack>;
    whyTitle: string;
    whyDescription: string;
  };
  process: {
    title: string;
    highlightedTitle: string;
    description: string;
    steps: ServiceProcessStep[];
  };
  outcomes: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    stats: ServiceOutcomeStat[];
    leftPill: string;
    rightPill: string;
  };
};
