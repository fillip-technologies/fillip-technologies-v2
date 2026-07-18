import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CategoryPageView from "@/components/whatwedo/CategoryPageView";
import { getCategory } from "@/server/content/whatwedo-registry";

export const dynamic = "force-dynamic";

// "Challenges We Solve" is presented through case studies, not a dedicated
// category landing page. Send any visit to the case studies overview.
const REDIRECT_TO_CASE_STUDIES = "challenges-we-solve";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return { title: `${category.label} — Fillip Technologies` };
}

export default async function WhatWeDoCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === REDIRECT_TO_CASE_STUDIES) redirect("/case-studies");

  const category = await getCategory(slug);
  // Unknown slugs and unpublished drafts 404 for the public. Admins can view
  // drafts via /what-we-do/<slug>/preview (session-gated).
  if (!category || !category.published) notFound();

  return <CategoryPageView slug={slug} />;
}
