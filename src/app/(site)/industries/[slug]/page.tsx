import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPageView from "@/components/industries/IndustryPageView";
import { getIndustry } from "@/server/content/industry-registry";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) return {};
  return { title: `${industry.label} — Fillip Technologies` };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  // Unknown slugs and unpublished drafts 404 for the public. Admins can view
  // drafts via /industries/<slug>/preview (session-gated).
  if (!industry || !industry.published) notFound();

  return <IndustryPageView slug={slug} />;
}
