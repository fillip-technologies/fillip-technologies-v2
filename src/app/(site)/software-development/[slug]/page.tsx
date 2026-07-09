import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SoftwareEnterprisePage from "@/components/software-enterprise/SoftwareEnterprisePage";
import type { SoftwareEnterpriseContent } from "@/data/software-enterprise";
import { getSoftwareEnterpriseBySlug } from "@/data/software-enterprise";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";

// Content is CMS-managed, so render fresh (mirrors the /services pages).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (page) return { title: `${page.title} | Fillip Technologies` };
  return {};
}

export default async function SoftwareEnterpriseSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DB-managed page wins; unknown slugs fall back to the static content (zero
  // regression for the seeded pages); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (page.template !== "software-enterprise") notFound(); // lives under another route
    if (!page.published) notFound(); // drafts are visible only via /preview
    const data = (await getServicePageData(slug, "software-enterprise")) as SoftwareEnterpriseContent;
    return <SoftwareEnterprisePage data={data} />;
  }

  const staticData = getSoftwareEnterpriseBySlug(slug);
  if (!staticData) notFound();
  return <SoftwareEnterprisePage data={staticData} />;
}
