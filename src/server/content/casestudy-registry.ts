import "server-only";

import { dbConnect } from "@/lib/db";
import { CaseStudyModel } from "@/server/db/models";
import { snapshotRead } from "./snapshot-cache";

/**
 * Data access for the self-contained `case_studies` collection. Unlike industries
 * (whose section content lives in `site_content`), each case study is one whole
 * document — every section is embedded. These helpers read/normalise those docs
 * and write a single section at a time. Reads go through `snapshotRead` so public
 * pages survive a DB outage on last-known-good content.
 */

/* ----------------------------------------------------------------- types -- */
export type CsLogo = { name: string; logo: string };
export type CsBullet = { text: string };
export type CsPhase = { period: string; title: string; description: string };
export type CsMetric = { value: string; label: string };

export type CaseStudyHero = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  cardImage: string;
  imageAlt: string;
  resultBadge: string;
};
export type CaseStudyResults = { heading: string; items: CsMetric[] };
export type CaseStudyBrands = { heading: string; description: string; logos: CsLogo[] };
export type CaseStudyBulletBlock = { heading: string; intro: string; items: CsBullet[] };
export type CaseStudyJourney = {
  heading: string;
  subheading: string;
  chartLabel: string;
  chartValues: number[];
  phases: CsPhase[];
};
export type CaseStudyOutcome = { heading: string; paragraphs: CsBullet[] };
export type CaseStudyCta = {
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  published: boolean;
  sortOrder: number;
  hero: CaseStudyHero;
  results: CaseStudyResults;
  brands: CaseStudyBrands;
  challenges: CaseStudyBulletBlock;
  strategy: CaseStudyBulletBlock;
  journey: CaseStudyJourney;
  outcome: CaseStudyOutcome;
  cta: CaseStudyCta;
};

/** Lighter shape for the /case-studies overview grid. */
export type CaseStudyCard = {
  slug: string;
  title: string;
  industry: string;
  href: string;
  image: string;
  excerpt: string;
  result: string;
};

/** All case-study section ids, in page order. */
export const CASE_STUDY_SECTION_IDS = [
  "hero",
  "results",
  "brands",
  "challenges",
  "strategy",
  "journey",
  "outcome",
  "cta",
] as const;

/* ------------------------------------------------------------ normalise -- */
/* eslint-disable @typescript-eslint/no-explicit-any */
const str = (v: any): string => (v == null ? "" : String(v));
const arr = <T>(v: any): T[] => (Array.isArray(v) ? v : []);

/** Coerce a raw (possibly-partial) lean doc into a fully-defaulted CaseStudy. */
export function normalizeCaseStudy(d: any): CaseStudy {
  const hero = d.hero ?? {};
  const results = d.results ?? {};
  const brands = d.brands ?? {};
  const challenges = d.challenges ?? {};
  const strategy = d.strategy ?? {};
  const journey = d.journey ?? {};
  const outcome = d.outcome ?? {};
  const cta = d.cta ?? {};
  const bulletBlock = (b: any): CaseStudyBulletBlock => ({
    heading: str(b.heading),
    intro: str(b.intro),
    items: arr<any>(b.items).map((i) => ({ text: str(i?.text) })),
  });
  return {
    slug: str(d.slug),
    title: str(d.title),
    industry: str(d.industry),
    published: Boolean(d.published),
    sortOrder: Number(d.sort_order ?? 0),
    hero: {
      eyebrow: str(hero.eyebrow) || "Case Study",
      title: str(hero.title),
      description: str(hero.description),
      heroImage: str(hero.heroImage),
      cardImage: str(hero.cardImage),
      imageAlt: str(hero.imageAlt),
      resultBadge: str(hero.resultBadge),
    },
    results: {
      heading: str(results.heading),
      items: arr<any>(results.items).map((i) => ({ value: str(i?.value), label: str(i?.label) })),
    },
    brands: {
      heading: str(brands.heading),
      description: str(brands.description),
      logos: arr<any>(brands.logos).map((i) => ({ name: str(i?.name), logo: str(i?.logo) })),
    },
    challenges: bulletBlock(challenges),
    strategy: bulletBlock(strategy),
    journey: {
      heading: str(journey.heading),
      subheading: str(journey.subheading),
      chartLabel: str(journey.chartLabel),
      chartValues: arr<any>(journey.chartValues)
        .map((n) => Number(n))
        .filter((n) => Number.isFinite(n)),
      phases: arr<any>(journey.phases).map((p) => ({
        period: str(p?.period),
        title: str(p?.title),
        description: str(p?.description),
      })),
    },
    outcome: {
      heading: str(outcome.heading),
      paragraphs: arr<any>(outcome.paragraphs).map((i) => ({ text: str(i?.text) })),
    },
    cta: {
      heading: str(cta.heading),
      description: str(cta.description),
      buttonLabel: str(cta.buttonLabel),
      buttonHref: str(cta.buttonHref),
    },
  };
}

/** Overview-card projection of a case study. */
export function toCard(cs: CaseStudy): CaseStudyCard {
  return {
    slug: cs.slug,
    title: cs.title || cs.hero.title,
    industry: cs.industry,
    href: `/case-studies/${cs.slug}`,
    image: cs.hero.cardImage || cs.hero.heroImage,
    excerpt: cs.hero.description,
    result: cs.hero.resultBadge,
  };
}

/* -------------------------------------------------------------- queries -- */
/** All case studies (published + drafts), ordered for the admin list. */
export async function listCaseStudies(): Promise<CaseStudy[]> {
  return snapshotRead(
    "case-studies:all",
    async () => {
      await dbConnect();
      const docs = await CaseStudyModel.find().sort({ sort_order: 1, slug: 1 }).lean();
      return docs.map(normalizeCaseStudy);
    },
    []
  );
}

/** Only published case studies — for the public overview grid. */
export async function listPublishedCaseStudies(): Promise<CaseStudy[]> {
  return snapshotRead(
    "case-studies:published",
    async () => {
      await dbConnect();
      const docs = await CaseStudyModel.find({ published: true })
        .sort({ sort_order: 1, slug: 1 })
        .lean();
      return docs.map(normalizeCaseStudy);
    },
    []
  );
}

/** One case study by slug (published or draft), or null. */
export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  return snapshotRead<CaseStudy | null>(
    `case-study:${slug}`,
    async () => {
      await dbConnect();
      const doc = await CaseStudyModel.findOne({ slug }).lean();
      return doc ? normalizeCaseStudy(doc) : null;
    },
    null
  );
}

/** Insert a new draft case study. Assumes slug/title are already validated. */
export async function insertCaseStudy(
  slug: string,
  title: string,
  industry: string
): Promise<void> {
  await dbConnect();
  const last = await CaseStudyModel.findOne().sort({ sort_order: -1 }).lean();
  const sortOrder = (last?.sort_order ?? 0) + 1;
  await CaseStudyModel.create({
    slug,
    title,
    industry,
    published: false,
    sort_order: sortOrder,
    hero: { title },
  });
}

/** Overwrite one embedded section of a case study. */
export async function updateCaseStudySection(
  slug: string,
  sectionId: string,
  data: Record<string, unknown>
): Promise<void> {
  await dbConnect();
  await CaseStudyModel.updateOne(
    { slug },
    { $set: { [sectionId]: data, updated_at: new Date() } }
  );
}

/** Toggle publish state. */
export async function setCaseStudyPublished(slug: string, published: boolean): Promise<void> {
  await dbConnect();
  await CaseStudyModel.updateOne({ slug }, { $set: { published, updated_at: new Date() } });
}

/** Delete a case study document. */
export async function deleteCaseStudy(slug: string): Promise<void> {
  await dbConnect();
  await CaseStudyModel.deleteOne({ slug });
}
