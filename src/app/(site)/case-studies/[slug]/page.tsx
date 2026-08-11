import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCaseStudy,
  listPublishedCaseStudies,
  toCard,
} from "@/server/content/casestudy-registry";
import CaseStudyPageView from "@/components/case-studies/CaseStudyPageView";

export const dynamic = "force-dynamic";

type CaseStudyPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;

  const cs = await getCaseStudy(slug);
  if (cs && cs.published) {
    return {
      title: `${cs.title} Case Study | Fillip Technologies`,
      description: cs.hero.description || undefined,
    };
  }

  return {};
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  const cs = await getCaseStudy(slug);
  if (!cs || !cs.published) notFound();

  const related = (await listPublishedCaseStudies())
    .filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => {
      const c = toCard(s);
      return { slug: c.slug, title: c.title, industry: c.industry, href: c.href, image: c.image, result: c.result };
    });

  return <CaseStudyPageView data={cs} related={related} />;
}
