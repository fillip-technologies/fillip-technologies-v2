import type { CaseStudyItem } from "@/data/home/defaults";

export type CaseStudyViewModel = CaseStudyItem & {
  slug: string;
  href: string;
  metricValue: string;
  metricLabel: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
};

export type CaseStudiesContent = Partial<{
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  description: string;
  backgroundImage: string;
  items: CaseStudyItem[];
}>;

export function slugifyCaseStudy(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCaseStudySlug(item: CaseStudyItem, index = 0) {
  const base = slugifyCaseStudy(`${item.industry}-${item.title}`);
  return base || `case-study-${index + 1}`;
}

function metricLabel(item: CaseStudyItem) {
  if (item.title.toLowerCase().includes("lead")) return "Lead impact";
  if (item.title.toLowerCase().includes("revenue")) return "Revenue impact";
  if (item.title.toLowerCase().includes("enrollment")) return "Enrollment impact";
  if (item.title.toLowerCase().includes("acquisition")) return "Acquisition impact";
  return "Business impact";
}

export function enrichCaseStudies(items: CaseStudyItem[]): CaseStudyViewModel[] {
  return items.map((item, index) => ({
    ...item,
    slug: getCaseStudySlug(item, index),
    href: `/case-studies/${getCaseStudySlug(item, index)}`,
    metricValue: item.result,
    metricLabel: metricLabel(item),
    challenge: `${item.industry} businesses need digital systems that convert attention into measurable growth. This project focused on removing friction, improving trust, and creating a cleaner path from discovery to action.`,
    approach: [
      "Clarified the customer journey and prioritized the highest-impact conversion points.",
      "Improved the digital experience with stronger messaging, structure, and performance.",
      "Connected acquisition, analytics, and follow-up so growth could be measured and improved.",
    ],
    outcomes: [
      item.description,
      "A cleaner digital funnel helped the client attract better-fit prospects and convert more of the demand they were already creating.",
      "The system gave the business a stronger foundation for repeatable digital growth.",
    ],
  }));
}

export function findCaseStudy(items: CaseStudyItem[], slug: string) {
  return enrichCaseStudies(items).find((item) => item.slug === slug);
}
