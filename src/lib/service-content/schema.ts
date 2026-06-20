import { z } from "zod";

const nonEmptyString = z.string().min(1);
const imageSchema = z.object({
  src: nonEmptyString.optional(),
  alt: nonEmptyString.optional(),
});

const seoSchema = z.object({
  title: nonEmptyString,
  description: nonEmptyString,
  canonical: z.string().refine(
    (value) => value.startsWith("/") || /^https?:\/\//.test(value),
    "Canonical must be a relative path or an absolute HTTP URL",
  ),
  openGraph: z.object({
    title: nonEmptyString,
    description: nonEmptyString,
    image: z.string().startsWith("/"),
  }),
  robots: z.object({
    index: z.boolean(),
    follow: z.boolean(),
  }),
});

const faqSectionSchema = z.object({
  badge: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString,
  items: z.array(
    z.object({
      question: nonEmptyString,
      answer: nonEmptyString,
    }),
  ).min(1),
});

const pageBaseShape = {
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  serviceKey: nonEmptyString,
  enabled: z.boolean(),
  city: z.object({
    name: nonEmptyString,
    state: nonEmptyString.optional(),
    country: nonEmptyString,
  }).optional(),
  seo: seoSchema,
  faq: faqSectionSchema,
};

const websiteHeroSchema = z.object({
  title: nonEmptyString,
  prefixText: z.string().optional(),
  highlightedTitle: nonEmptyString,
  suffixText: z.string().optional(),
  description: nonEmptyString,
});

const websiteChallengesSchema = z.object({
  eyebrow: nonEmptyString,
  title: nonEmptyString,
  highlightedTitle: nonEmptyString,
  description: nonEmptyString,
  secondaryDescription: nonEmptyString,
  cta: nonEmptyString,
  items: z.array(z.object({
    title: nonEmptyString,
    description: nonEmptyString,
  })).min(1),
});

const websiteProcessSchema = z.object({
  title: nonEmptyString,
  highlightedTitle: nonEmptyString,
  description: nonEmptyString,
  steps: z.array(z.object({
    title: nonEmptyString,
    items: z.array(nonEmptyString).min(1),
  })).min(1),
});

export const websiteServicePageSchema = z.object({
  ...pageBaseShape,
  content: z.object({
    hero: websiteHeroSchema.optional(),
    challenges: websiteChallengesSchema.optional(),
    process: websiteProcessSchema.optional(),
  }),
});

const mobileIconSchema = z.enum([
  "BarChart3",
  "Boxes",
  "BriefcaseBusiness",
  "CheckCircle2",
  "Clock3",
  "Cloud",
  "CreditCard",
  "KeyRound",
  "Layers3",
  "Lock",
  "Package",
  "RefreshCw",
  "ShieldCheck",
  "ShoppingCart",
  "Smartphone",
  "Store",
  "TrendingUp",
  "Truck",
  "UserRound",
  "Users",
  "Wallet",
  "Workflow",
]);

const mobileFeatureSchema = z.object({
  title: nonEmptyString,
  description: nonEmptyString,
  icon: mobileIconSchema,
});

const mobileContentOverrideSchema = z.object({
  hero: z.object({
    title: nonEmptyString.optional(),
    highlightedTitle: nonEmptyString.optional(),
    description: nonEmptyString.optional(),
    leftCard: z.object({
      title: nonEmptyString.optional(),
      description: nonEmptyString.optional(),
    }).optional(),
    rightCard: z.object({
      value: nonEmptyString.optional(),
      label: nonEmptyString.optional(),
    }).optional(),
    image: imageSchema.optional(),
  }).optional(),
  challenges: z.object({
    badge: nonEmptyString.optional(),
    title: nonEmptyString.optional(),
    highlightedTitle: nonEmptyString.optional(),
    lead: nonEmptyString.optional(),
    support: nonEmptyString.optional(),
    description: nonEmptyString.optional(),
    items: z.array(nonEmptyString).min(1).optional(),
    image: imageSchema.optional(),
  }).optional(),
  solutions: z.object({
    badge: nonEmptyString.optional(),
    title: nonEmptyString.optional(),
    highlightedTitle: nonEmptyString.optional(),
    description: nonEmptyString.optional(),
    items: z.array(z.object({
      title: nonEmptyString,
      description: nonEmptyString,
      icon: mobileIconSchema,
      iconColor: nonEmptyString,
      iconBg: nonEmptyString,
      footerLabel: nonEmptyString,
    })).min(1).optional(),
  }).optional(),
  features: z.object({
    badge: nonEmptyString.optional(),
    title: nonEmptyString.optional(),
    highlightedTitle: nonEmptyString.optional(),
    description: nonEmptyString.optional(),
    image: imageSchema.optional(),
    items: z.array(mobileFeatureSchema).min(1).optional(),
  }).optional(),
  whyChooseUs: z.object({
    badge: nonEmptyString.optional(),
    title: nonEmptyString.optional(),
    highlightedTitle: nonEmptyString.optional(),
    description: nonEmptyString.optional(),
    image: imageSchema.optional(),
    reasons: z.array(mobileFeatureSchema).min(1).optional(),
    quote: nonEmptyString.optional(),
    quoteDescription: nonEmptyString.optional(),
  }).optional(),
  testimonials: z.object({
    badge: nonEmptyString.optional(),
    title: nonEmptyString.optional(),
    description: nonEmptyString.optional(),
    testimonials: z.array(z.object({
      name: nonEmptyString,
      role: nonEmptyString,
      image: nonEmptyString,
      review: nonEmptyString,
    })).min(1).optional(),
  }).optional(),
  guidance: z.object({
    title: nonEmptyString.optional(),
    buttonText: nonEmptyString.optional(),
  }).optional(),
});

export const mobileAppServicePageSchema = z.object({
  ...pageBaseShape,
  content: mobileContentOverrideSchema,
});

export const technicalSeoServicePageSchema = z.object({
  ...pageBaseShape,
  content: z.object({
    hero: z.object({
      badge: nonEmptyString,
      title: nonEmptyString,
      highlightedTitle: nonEmptyString,
      description: nonEmptyString,
      searchText: nonEmptyString,
      primaryCta: nonEmptyString,
      secondaryCta: nonEmptyString,
      image: z.object({
        src: z.string().startsWith("/"),
        alt: nonEmptyString,
      }),
    }),
  }),
});

export const performanceMarketingServicePageSchema = z.object({
  ...pageBaseShape,
  content: z.object({
    hero: z.object({
      title: nonEmptyString,
      highlightedTitle: nonEmptyString,
      suffix: nonEmptyString,
      description: nonEmptyString,
      cta: nonEmptyString,
      metricValue: nonEmptyString,
      metricLabel: nonEmptyString,
      image: z.object({
        src: z.string().startsWith("/"),
        alt: nonEmptyString,
      }),
    }),
    philosophy: z.object({
      badge: nonEmptyString,
      title: nonEmptyString,
      highlightedTitle: nonEmptyString,
      lead: nonEmptyString,
      support: nonEmptyString,
      description: nonEmptyString,
      caption: nonEmptyString,
      metrics: z.array(z.object({ label: nonEmptyString, value: nonEmptyString })).length(2),
    }),
    workflow: z.object({
      badge: nonEmptyString,
      title: nonEmptyString,
      highlightedTitle: nonEmptyString,
      description: nonEmptyString,
      steps: z.array(z.object({
        title: nonEmptyString,
        description: nonEmptyString,
        image: z.string().startsWith("/"),
        alt: nonEmptyString,
        cta: nonEmptyString.optional(),
      })).length(3),
    }),
    results: z.object({
      badge: nonEmptyString,
      title: nonEmptyString,
      highlightedTitle: nonEmptyString,
      description: nonEmptyString,
      image: z.object({ src: z.string().startsWith("/"), alt: nonEmptyString }),
      metrics: z.array(z.object({ label: nonEmptyString, value: nonEmptyString })).length(4),
    }),
  }),
});

const aiMetricSchema = z.object({ value: nonEmptyString, label: nonEmptyString });

export const aiAutomationContentSchema = z.object({
  hero: z.object({ badge: nonEmptyString, title: nonEmptyString, highlightedTitle: nonEmptyString, description: nonEmptyString, primaryCta: nonEmptyString, secondaryCta: nonEmptyString, trustItems: z.array(nonEmptyString).min(1), assistantName: nonEmptyString }),
  problem: z.object({ badge: nonEmptyString, title: nonEmptyString, description: nonEmptyString, items: z.array(z.object({ title: nonEmptyString, description: nonEmptyString })).min(1) }),
  workflow: z.object({ badge: nonEmptyString, title: nonEmptyString, highlightedTitle: nonEmptyString, description: nonEmptyString, steps: z.array(nonEmptyString).min(1) }),
  capabilities: z.object({ badge: nonEmptyString, title: nonEmptyString, highlightedTitle: nonEmptyString, description: nonEmptyString, integrationTitle: nonEmptyString, integrationDescription: nonEmptyString, items: z.array(nonEmptyString).min(1) }),
  showcase: z.object({ badge: nonEmptyString, title: nonEmptyString, highlightedTitle: nonEmptyString, scenarios: z.array(z.object({ name: nonEmptyString, eyebrow: nonEmptyString, messages: z.array(z.object({ ai: z.boolean(), text: nonEmptyString })).min(1), result: nonEmptyString })).min(1) }),
  industries: z.object({ badge: nonEmptyString, title: nonEmptyString, description: nonEmptyString, items: z.array(nonEmptyString).min(1) }),
  why: z.object({ badge: nonEmptyString, title: nonEmptyString, description: nonEmptyString, cta: nonEmptyString, items: z.array(z.object({ title: nonEmptyString, description: nonEmptyString })).min(1) }),
  results: z.object({ badge: nonEmptyString, metrics: z.array(aiMetricSchema).min(1) }),
  cta: z.object({ title: nonEmptyString, description: nonEmptyString, primaryCta: nonEmptyString, secondaryCta: nonEmptyString, emailSubject: nonEmptyString }),
});

export const aiAutomationServicePageSchema = z.object({
  ...pageBaseShape,
  content: z.record(z.string(), z.unknown()),
});

export const serviceDefinitionSchema = z.object({
  serviceKey: nonEmptyString,
  name: nonEmptyString,
  templateKey: z.enum([
    "website-design",
    "mobile-app-development",
    "technical-seo",
    "performance-marketing",
    "ai-automation",
  ]),
  defaultsFile: nonEmptyString.optional(),
  enabled: z.boolean(),
});

export const servicePageSchemas = {
  "website-design": websiteServicePageSchema,
  "mobile-app-development": mobileAppServicePageSchema,
  "technical-seo": technicalSeoServicePageSchema,
  "performance-marketing": performanceMarketingServicePageSchema,
  "ai-automation": aiAutomationServicePageSchema,
} as const;

export type ServiceDefinitionInput = z.infer<typeof serviceDefinitionSchema>;
export type WebsiteServicePageInput = z.infer<typeof websiteServicePageSchema>;
export type MobileAppServicePageInput = z.infer<typeof mobileAppServicePageSchema>;
export type TechnicalSeoServicePageInput = z.infer<typeof technicalSeoServicePageSchema>;
export type PerformanceMarketingServicePageInput = z.infer<typeof performanceMarketingServicePageSchema>;
export type AIAutomationServicePageInput = z.infer<typeof aiAutomationServicePageSchema>;
export type ServicePageInput =
  | WebsiteServicePageInput
  | MobileAppServicePageInput
  | TechnicalSeoServicePageInput
  | PerformanceMarketingServicePageInput
  | AIAutomationServicePageInput;
