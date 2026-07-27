import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceTemplateResolver from "@/components/service-landing/ServiceTemplateResolver";
import {
  getServiceLandingPage,
  getServiceLandingPageSlugs,
} from "@/lib/service-content/repository";
import { buildLandingPageMetadata, serviceLandingToSeoRecord } from "@/lib/seo/metadata";
import { buildJsonLdForPage, JsonLdScript } from "@/lib/seo/schema";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";

type LandingPageProps = {
  params: Promise<{ landingSlug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getServiceLandingPageSlugs();
  return slugs.map((landingSlug) => ({ landingSlug }));
}

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const { landingSlug } = await params;
  const page = await getServiceLandingPage(landingSlug);

  if (!page) notFound();

  return pageMetadata(page.seo.canonical, buildLandingPageMetadata(page));
}

export default async function ServiceLandingPageRoute({
  params,
}: LandingPageProps) {
  const { landingSlug } = await params;
  const page = await getServiceLandingPage(landingSlug);

  if (!page) notFound();

  const resolved = await pageJsonLd(page.seo.canonical);
  const jsonLd = resolved.length ? resolved : buildJsonLdForPage(serviceLandingToSeoRecord(page));

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <ServiceTemplateResolver page={page} />
    </>
  );
}
