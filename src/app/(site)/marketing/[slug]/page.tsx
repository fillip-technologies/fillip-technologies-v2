import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPage from "@/components/marketing/MarketingPage";
import PerformanceMarketingCmsPage from "@/components/marketing/PerformanceMarketingCmsPage";
import ServiceTemplateResolver from "@/components/service-landing/ServiceTemplateResolver";
import type { MarketingContent } from "@/data/marketing";
import { getMarketingBySlug } from "@/data/marketing";
import type { PerformanceMarketingCmsContent } from "@/data/performance-marketing-cms";
import { getServiceLandingPage } from "@/lib/service-content/repository";
import { buildLandingPageMetadata } from "@/lib/seo/metadata";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";

// Content is CMS-managed, so render fresh (mirrors the /services pages).
export const dynamic = "force-dynamic";

// The paid-ads pages under this column reuse the performance-marketing landing
// layout + content (src/data/services/performance-marketing/*), rather than the
// rich SEO "marketing" template used by the SEO pages.
const PERFORMANCE_ADS_SLUGS = new Set([
  "google-ads-management",
  "meta-ads-management",
  "youtube-ads-campaign",
]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (PERFORMANCE_ADS_SLUGS.has(slug)) {
    const landing = await getServiceLandingPage(slug);
    return landing ? buildLandingPageMetadata(landing) : {};
  }

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

  // Paid-ads pages: performance-marketing landing layout + content.
  if (PERFORMANCE_ADS_SLUGS.has(slug)) {
    const landing = await getServiceLandingPage(slug);
    if (!landing) notFound();
    return <ServiceTemplateResolver page={landing} />;
  }

  // DB-managed page wins; unknown slugs fall back to the static content (zero
  // regression for the seeded pages); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (page.template !== "marketing" && page.template !== "performance-marketing") {
      notFound(); // lives under another route
    }
    if (!page.published) notFound(); // drafts are visible only via /preview

    if (page.template === "performance-marketing") {
      const data = (await getServicePageData(
        slug,
        "performance-marketing"
      )) as PerformanceMarketingCmsContent;
      return <PerformanceMarketingCmsPage data={data} />;
    }

    const data = (await getServicePageData(slug, "marketing")) as MarketingContent;
    return <MarketingPage data={data} />;
  }

  const staticData = getMarketingBySlug(slug);
  if (!staticData) notFound();
  return <MarketingPage data={staticData} />;
}
