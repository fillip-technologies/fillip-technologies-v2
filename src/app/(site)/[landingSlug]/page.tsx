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
import LocationPageView from "@/components/location-pages/LocationPageView.tsx";
import {
  getLocationPage,
  listEnabledLocationPages,
} from "@/server/location-pages/registry";

type LandingPageProps = {
  params: Promise<{ landingSlug: string }>;
};

export async function generateStaticParams() {
  const [serviceSlugs, locations] = await Promise.all([
    getServiceLandingPageSlugs(),
    listEnabledLocationPages(),
  ]);
  const locationSlugs = locations.map((l) => l.slug);
  // Dedupe defensively in case an admin ever reuses a slug that also exists
  // as a service landing page — service landing pages win at build time,
  // and the request-time lookup below also checks location pages first.
  const all = new Set([...serviceSlugs, ...locationSlugs]);
  return Array.from(all).map((landingSlug) => ({ landingSlug }));
}

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const { landingSlug } = await params;

  // Admin-managed location pages ("<service> in <city>") take priority —
  // check these first since they're managed outside the service-landing repo.
  const location = await getLocationPage(landingSlug);
  if (location && location.enabled) {
    return pageMetadata(`/${landingSlug}`, {
      title: location.seo.title,
      description: location.seo.description,
      openGraph: {
        title: location.seo.openGraph.title || location.seo.title,
        description: location.seo.openGraph.description || location.seo.description,
        images: location.seo.openGraph.image ? [location.seo.openGraph.image] : undefined,
      },
      robots: {
        index: location.seo.robots.index,
        follow: location.seo.robots.follow,
      },
    });
  }

  const page = await getServiceLandingPage(landingSlug);

  if (!page) notFound();

  return pageMetadata(page.seo.canonical, buildLandingPageMetadata(page));
}

export default async function ServiceLandingPageRoute({
  params,
}: LandingPageProps) {
  const { landingSlug } = await params;

  // Admin-managed location pages take priority (see generateMetadata above).
  // Disabled location pages 404 for the public just like unpublished
  // industries/service pages do elsewhere in this codebase.
  const location = await getLocationPage(landingSlug);
  if (location) {
    if (!location.enabled) notFound();
    const jsonLd = await pageJsonLd(`/${landingSlug}`);
    return (
      <>
        {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
        <LocationPageView slug={landingSlug} />
      </>
    );
  }

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
