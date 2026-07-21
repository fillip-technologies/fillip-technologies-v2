import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SecuritySurveillance from "@/components/Hardware-solution/SecuritySurveillance";
import type { SecuritySurveillanceContent } from "@/components/Hardware-solution/content";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";
import { getGlobalTestimonials } from "@/server/content/global-testimonials";

// Content is CMS-managed, so render fresh (mirrors the other CMS pages).
export const dynamic = "force-dynamic";

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
  return {};
}

export default async function HardwareSolutionSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Every hardware-solution page renders through the shared Security-Surveillance
  // layout, driven by its CMS content (servicepage.<slug>.*).
  const page = await getServicePage(slug);
  if (!page || page.template !== "hardware-solution") notFound();
  if (!page.published) notFound(); // drafts are visible only via /preview

  const content = (await getServicePageData(
    slug,
    "hardware-solution"
  )) as unknown as SecuritySurveillanceContent;
  const testimonialItems = await getGlobalTestimonials();

  return (
    <main className="overflow-hidden bg-background text-heading">
      <SecuritySurveillance content={content} testimonialItems={testimonialItems} />
    </main>
  );
}
