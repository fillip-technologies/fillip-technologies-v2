import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/services/ServicePage";
import { getServiceBySlug, type Service } from "@/data/website-development";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";

// Content is CMS-managed, so render fresh (mirrors industries / what-we-do).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (page) return pageMetadata(`/services/${slug}`, { title: `${page.title} | Fillip Technologies` });
  return {};
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
    if (page.template !== "service") notFound(); // lives under another route
    if (!page.published) notFound(); // drafts are visible only via /preview
    const jsonLd = await pageJsonLd(`/services/${slug}`);
    return (
      <>
        {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
        <ServicePage data={(await getServicePageData(slug, "service")) as Service} />
      </>
    );
  }

  const staticData = getServiceBySlug(slug);
  if (!staticData) notFound();
  return <ServicePage data={staticData} />;
}
