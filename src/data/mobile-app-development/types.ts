export type MobileAppIconName =
  | "BarChart3"
  | "Boxes"
  | "BriefcaseBusiness"
  | "CheckCircle2"
  | "Clock3"
  | "Cloud"
  | "CreditCard"
  | "KeyRound"
  | "Layers3"
  | "Lock"
  | "Package"
  | "RefreshCw"
  | "ShieldCheck"
  | "ShoppingCart"
  | "Smartphone"
  | "Store"
  | "TrendingUp"
  | "Truck"
  | "UserRound"
  | "Users"
  | "Wallet"
  | "Workflow";

export type MobileAppHeroContent = {
  title: string;
  highlightedTitle: string;
  description: string;
  leftCard: {
    title: string;
    description: string;
  };
  rightCard: {
    value: string;
    label: string;
  };
  image: {
    src: string;
    alt: string;
  };
};

export type MobileAppSolution = {
  title: string;
  description: string;
  icon: MobileAppIconName;
  iconColor: string;
  iconBg: string;
  footerLabel: string;
};

export type MobileAppSolutionsContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  items: MobileAppSolution[];
};

export type MobileAppChallengesContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  lead: string;
  support: string;
  description: string;
  items: string[];
  image: {
    src: string;
    alt: string;
  };
};

export type MobileAppFeature = {
  title: string;
  description: string;
  icon: MobileAppIconName;
};

export type MobileAppFeaturesContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  items: MobileAppFeature[];
};

export type MobileAppWhyChooseUsContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  reasons: MobileAppFeature[];
  quote: string;
  quoteDescription: string;
};

export type MobileAppTestimonialsContent = {
  badge: string;
  title: string;
  description: string;
  testimonials: {
    name: string;
    role: string;
    image: string;
    review: string;
  }[];
};

export type MobileAppFAQContent = {
  title: string;
  description: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
};

export type MobileAppDevelopmentContent = {
  hero: MobileAppHeroContent;
  challenges: MobileAppChallengesContent;
  solutions: MobileAppSolutionsContent;
  features: MobileAppFeaturesContent;
  whyChooseUs: MobileAppWhyChooseUsContent;
  testimonials: MobileAppTestimonialsContent;
  faq: MobileAppFAQContent;
  guidance: {
    title: string;
    buttonText: string;
  };
};
