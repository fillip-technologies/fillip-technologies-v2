import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HardwareSolutionPage from "@/components/Hardware-solution/HardwareSolutionPage";
import {
  getHardwareSolutionBySlug,
  hardwareSolutionPages,
} from "@/data/hardware-solutions";

export function generateStaticParams() {
  return hardwareSolutionPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getHardwareSolutionBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: `/hardware-solutions/${page.slug}` },
  };
}

export default async function HardwareSolutionSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getHardwareSolutionBySlug(slug);

  if (!page) {
    notFound();
  }

  return <HardwareSolutionPage data={page} />;
}
