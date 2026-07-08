import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/services/ServicePage";
import { getServiceBySlug } from "@/data/website-development";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";

// Content is CMS-managed, so render fresh (mirrors industries / what-we-do).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (page) return { title: `${page.title} | Fillip Technologies` };
  return getServiceBySlug(slug) ? {} : {};
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DB-managed page wins. Unknown slugs fall back to the static data (zero
  // regression for any page not yet migrated); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (!page.published) notFound(); // drafts are visible only via /preview
    return <ServicePage data={await getServicePageData(slug)} />;
  }

  const staticData = getServiceBySlug(slug);
  if (!staticData) notFound();
  return <ServicePage data={staticData} />;
}
