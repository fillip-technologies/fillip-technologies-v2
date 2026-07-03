import { notFound } from "next/navigation";
import Link from "next/link";
import IndustryPageView from "@/components/industries/IndustryPageView";
import { getIndustry } from "@/server/content/industry-registry";
import { getSession } from "@/server/auth/session";

export const dynamic = "force-dynamic";

/**
 * Draft preview of an industry page — renders inside the public site chrome so
 * it looks exactly like the live page, but is gated to logged-in admins and
 * works even while the industry is unpublished.
 */
export default async function IndustryPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(await getSession())) notFound();
  const industry = await getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-black">
        <span>
          Draft preview — “{industry.label}” is {industry.published ? "published" : "not published yet"}.
        </span>
        <Link href={`/admin/cms/industries/${slug}`} className="underline underline-offset-2">
          Back to editor
        </Link>
      </div>
      <IndustryPageView slug={slug} />
    </>
  );
}
