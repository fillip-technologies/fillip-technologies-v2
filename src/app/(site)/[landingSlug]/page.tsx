import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceTemplateResolver from "@/components/service-landing/ServiceTemplateResolver";
import {
  getServiceLandingPage,
  getServiceLandingPageSlugs,
} from "@/lib/service-content/repository";
import { buildLandingPageMetadata } from "@/lib/seo/metadata";

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

  return buildLandingPageMetadata(page);
}

export default async function ServiceLandingPageRoute({
  params,
}: LandingPageProps) {
  const { landingSlug } = await params;
  const page = await getServiceLandingPage(landingSlug);

  if (!page) notFound();

  return <ServiceTemplateResolver page={page} />;
}
