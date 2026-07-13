import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HardwareSolutionPage from "@/components/Hardware-solution/HardwareSolutionPage";
import SecuritySurveillance from "@/components/Hardware-solution/SecuritySurveillance";
import type { HardwareSolutionPage as HardwareSolutionPageData } from "@/data/hardware-solutions";
import { getHardwareSolutionBySlug } from "@/data/hardware-solutions";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";
import { getSecuritySurveillanceContent } from "@/server/content/solution-page-content";

// Content is CMS-managed, so render fresh (mirrors the other CMS pages).
export const dynamic = "force-dynamic";

// Slugs with a bespoke, hand-built layout that replaces the generic renderer.
// Their content is managed under CMS group `page.<slug>.*`.
const CUSTOM_LAYOUT_SLUGS = new Set(["security-surveillance"]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "security-surveillance") {
    return {
      title: "Security & Surveillance Solutions | Fillip Technologies",
      description: "Secure your business, office, or home with high-performance security systems, HD CCTV cameras, keyless access controls, and 24/7 central monitoring services.",
      alternates: { canonical: `/hardware-solutions/${slug}` },
    };
  }
  const page = await getServicePage(slug);
  if (page) {
    return { title: `${page.title} | Fillip Technologies`, alternates: { canonical: `/hardware-solutions/${slug}` } };
  }
  const staticPage = getHardwareSolutionBySlug(slug);
  if (staticPage) {
    return {
      title: staticPage.seo.title,
      description: staticPage.seo.description,
      alternates: { canonical: `/hardware-solutions/${slug}` },
    };
  }
  return {};
}

export default async function HardwareSolutionSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Bespoke layout slugs render their own CMS-driven component.
  if (CUSTOM_LAYOUT_SLUGS.has(slug)) {
    const content = await getSecuritySurveillanceContent();
    return (
      <main className="overflow-hidden bg-background text-heading">
        <SecuritySurveillance content={content} />
      </main>
    );
  }

  // DB-managed page wins; unknown slugs fall back to the static JSON (zero
  // regression for the seeded pages); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (page.template !== "hardware-solution") notFound(); // lives under another route
    if (!page.published) notFound(); // drafts are visible only via /preview
    const data = (await getServicePageData(slug, "hardware-solution")) as HardwareSolutionPageData;
    return <HardwareSolutionPage data={{ ...data, label: page.title }} />;
  }

  const staticData = getHardwareSolutionBySlug(slug);
  if (!staticData) notFound();
  return <HardwareSolutionPage data={staticData} />;
}
