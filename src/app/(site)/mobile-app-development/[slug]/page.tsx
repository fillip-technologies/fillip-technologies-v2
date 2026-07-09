import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MobileAppDevelopmentPage from "@/components/mobile-app-development/MobileAppDevelopmentPage";
import type { MobileAppDevelopmentContent } from "@/data/mobile-app-development";
import { MOBILE_CONTENT } from "@/server/content/mobileapp-sections";
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

export default async function MobileAppSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DB-managed page wins; unknown slugs fall back to the static content (zero
  // regression for the originally-static pages); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (page.template !== "mobile-app") notFound(); // lives under another route
    if (!page.published) notFound(); // drafts are visible only via /preview
    const data = (await getServicePageData(slug, "mobile-app")) as MobileAppDevelopmentContent;
    return <MobileAppDevelopmentPage data={data} />;
  }

  const staticData = MOBILE_CONTENT[slug];
  if (!staticData) notFound();
  return <MobileAppDevelopmentPage data={staticData} />;
}
