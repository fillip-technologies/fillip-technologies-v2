import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HardwareSolutionPage from "@/components/Hardware-solution/HardwareSolutionPage";
import type { HardwareSolutionPage as HardwareSolutionPageData } from "@/data/hardware-solutions";
import { getBusinessSolutionBySlug } from "@/data/solutions";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";

// Content is CMS-managed, so render fresh (mirrors the other CMS pages).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (page) {
    return { title: `${page.title} | Fillip Technologies`, alternates: { canonical: `/solutions/${slug}` } };
  }
  const staticPage = getBusinessSolutionBySlug(slug);
  if (staticPage) {
    return {
      title: staticPage.seo.title,
      description: staticPage.seo.description,
      alternates: { canonical: `/solutions/${slug}` },
    };
  }
  return {};
}

export default async function BusinessSolutionSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DB-managed page wins; unknown slugs fall back to the static content (zero
  // regression for the seeded pages); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (page.template !== "business-solution") notFound(); // lives under another route
    if (!page.published) notFound(); // drafts are visible only via /preview
    const data = (await getServicePageData(slug, "business-solution")) as HardwareSolutionPageData;
    return <HardwareSolutionPage data={{ ...data, label: page.title }} />;
  }

  const staticData = getBusinessSolutionBySlug(slug);
  if (!staticData) notFound();
  return <HardwareSolutionPage data={staticData} />;
}
