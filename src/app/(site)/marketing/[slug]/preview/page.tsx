import { notFound } from "next/navigation";
import Link from "next/link";
import MarketingPage from "@/components/marketing/MarketingPage";
import type { MarketingContent } from "@/data/marketing";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";
import { getSession } from "@/server/auth/session";

export const dynamic = "force-dynamic";

/**
 * Draft preview of a marketing page — session-gated, works while unpublished.
 */
export default async function MarketingPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(await getSession())) notFound();
  const page = await getServicePage(slug);
  if (!page || page.template !== "marketing") notFound();

  const data = (await getServicePageData(slug, "marketing")) as MarketingContent;

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-black">
        <span>
          Draft preview — “{page.title}” is {page.published ? "published" : "not published yet"}.
        </span>
        <Link href={`/admin/cms/services/${slug}`} className="underline underline-offset-2">
          Back to editor
        </Link>
      </div>
      <MarketingPage data={data} />
    </>
  );
}
