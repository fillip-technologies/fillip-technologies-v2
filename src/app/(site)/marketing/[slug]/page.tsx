import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPage from "@/components/marketing/MarketingPage";
import type { MarketingContent } from "@/data/marketing";
import { getMarketingBySlug } from "@/data/marketing";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";

// Content is CMS-managed, so render fresh (mirrors the /services pages).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (page) return { title: `${page.title} | Fillip Technologies` };
  return {};
}

export default async function MarketingSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DB-managed page wins; unknown slugs fall back to the static content (zero
  // regression for the seeded pages); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (page.template !== "marketing") notFound(); // lives under another route
    if (!page.published) notFound(); // drafts are visible only via /preview
    const data = (await getServicePageData(slug, "marketing")) as MarketingContent;
    return <MarketingPage data={data} />;
  }

  const staticData = getMarketingBySlug(slug);
  if (!staticData) notFound();
  return <MarketingPage data={staticData} />;
}
