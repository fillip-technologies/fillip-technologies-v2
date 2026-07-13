import { notFound } from "next/navigation";
import Link from "next/link";
import MarketingPage from "@/components/marketing/MarketingPage";
import PerformanceMarketingCmsPage from "@/components/marketing/PerformanceMarketingCmsPage";
import ServiceTemplateResolver from "@/components/service-landing/ServiceTemplateResolver";
import type { MarketingContent } from "@/data/marketing";
import type { PerformanceMarketingCmsContent } from "@/data/performance-marketing-cms";
import { getServiceLandingPage } from "@/lib/service-content/repository";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";
import { getSession } from "@/server/auth/session";

export const dynamic = "force-dynamic";

// Paid-ads pages reuse the performance-marketing landing layout (see the public
// route). Their content is file-based, so preview mirrors the live render.
const PERFORMANCE_ADS_SLUGS = new Set([
  "google-ads-management",
  "meta-ads-management",
  "youtube-ads-campaign",
]);

/**
 * Draft preview of a marketing page — session-gated, works while unpublished.
 */
export default async function MarketingPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(await getSession())) notFound();

  if (PERFORMANCE_ADS_SLUGS.has(slug)) {
    const landing = await getServiceLandingPage(slug);
    if (!landing) notFound();
    return <ServiceTemplateResolver page={landing} />;
  }

  const page = await getServicePage(slug);
  if (!page || (page.template !== "marketing" && page.template !== "performance-marketing")) {
    notFound();
  }

  const body =
    page.template === "performance-marketing" ? (
      <PerformanceMarketingCmsPage
        data={
          (await getServicePageData(
            slug,
            "performance-marketing"
          )) as PerformanceMarketingCmsContent
        }
      />
    ) : (
      <MarketingPage
        data={(await getServicePageData(slug, "marketing")) as MarketingContent}
      />
    );

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-black">
        <span>
          Draft preview — “{page.title}” is {page.published ? "published" : "not published yet"}.
        </span>
        <Link href={`/admin/cms/services/${slug}`} className="underline underline-offset-2">
          Back to editor
        </Link>
      </div>
      {body}
    </>
  );
}
