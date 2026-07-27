import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CreativeDesignPage from "@/components/creative-design/CreativeDesignPage";
import CreativeExperiencePage from "@/components/creative-design/CreativeExperiencePage";
import type { CreativeDesignContent } from "@/data/creative-design";
import { getCreativeDesignBySlug } from "@/data/creative-design";
import type { GraphicDesigningContent } from "@/components/graphic-desigining/content";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";

// Content is CMS-managed, so render fresh (mirrors the /services pages).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (page) return pageMetadata(`/design/${slug}`, { title: `${page.title} | Fillip Technologies` });
  return {};
}

export default async function CreativeDesignSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DB-managed page wins; unknown slugs fall back to the static content (zero
  // regression for the seeded pages); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (page.template !== "creative-design" && page.template !== "creative-experience") {
      notFound(); // lives under another route
    }
    if (!page.published) notFound(); // drafts are visible only via /preview
    const jsonLd = await pageJsonLd(`/design/${slug}`);
    const schema = jsonLd.length ? <JsonLdScript data={jsonLd} /> : null;
    if (page.template === "creative-experience") {
      const data = (await getServicePageData(slug, "creative-experience")) as unknown as GraphicDesigningContent;
      return (
        <>
          {schema}
          <CreativeExperiencePage data={data} />
        </>
      );
    }
    const data = (await getServicePageData(slug, "creative-design")) as CreativeDesignContent;
    return (
      <>
        {schema}
        <CreativeDesignPage data={data} />
      </>
    );
  }

  const staticData = getCreativeDesignBySlug(slug);
  if (!staticData) notFound();
  return <CreativeDesignPage data={staticData} />;
}
