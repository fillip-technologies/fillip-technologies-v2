import { notFound } from "next/navigation";
import Link from "next/link";
import CreativeDesignPage from "@/components/creative-design/CreativeDesignPage";
import CreativeExperiencePage from "@/components/creative-design/CreativeExperiencePage";
import type { CreativeDesignContent } from "@/data/creative-design";
import type { GraphicDesigningContent } from "@/components/graphic-desigining/content";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";
import { getSession } from "@/server/auth/session";

export const dynamic = "force-dynamic";

/**
 * Draft preview of a creative-design page — session-gated, works while
 * unpublished.
 */
export default async function CreativeDesignPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(await getSession())) notFound();
  const page = await getServicePage(slug);
  if (!page || (page.template !== "creative-design" && page.template !== "creative-experience")) {
    notFound();
  }

  const banner = (
    <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-black">
      <span>
        Draft preview — “{page.title}” is {page.published ? "published" : "not published yet"}.
      </span>
      <Link href={`/admin/cms/services/${slug}`} className="underline underline-offset-2">
        Back to editor
      </Link>
    </div>
  );

  if (page.template === "creative-experience") {
    const data = (await getServicePageData(slug, "creative-experience")) as unknown as GraphicDesigningContent;
    return (
      <>
        {banner}
        <CreativeExperiencePage data={data} />
      </>
    );
  }

  const data = (await getServicePageData(slug, "creative-design")) as CreativeDesignContent;
  return (
    <>
      {banner}
      <CreativeDesignPage data={data} />
    </>
  );
}
