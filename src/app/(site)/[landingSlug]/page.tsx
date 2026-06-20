import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceTemplateResolver from "@/components/service-landing/ServiceTemplateResolver";
import {
  getServiceLandingPage,
  getServiceLandingPageSlugs,
} from "@/lib/service-content/repository";

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

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: page.seo.canonical,
    },
    openGraph: {
      title: page.seo.openGraph.title,
      description: page.seo.openGraph.description,
      url: page.seo.canonical,
      images: [{ url: page.seo.openGraph.image }],
    },
    robots: page.seo.robots,
  };
}

export default async function ServiceLandingPageRoute({
  params,
}: LandingPageProps) {
  const { landingSlug } = await params;
  const page = await getServiceLandingPage(landingSlug);

  if (!page) notFound();

  return <ServiceTemplateResolver page={page} />;
}
