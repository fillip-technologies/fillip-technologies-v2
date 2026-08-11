import { notFound } from "next/navigation";
import Link from "next/link";
import CaseStudyPageView from "@/components/case-studies/CaseStudyPageView";
import {
  getCaseStudy,
  listCaseStudies,
  toCard,
} from "@/server/content/casestudy-registry";
import { getSession } from "@/server/auth/session";

export const dynamic = "force-dynamic";

/**
 * Draft preview of a case-study page — renders inside the public site chrome so
 * it looks exactly like the live page, but is gated to logged-in admins and
 * works even while the case study is unpublished.
 */
export default async function CaseStudyPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(await getSession())) notFound();
  const cs = await getCaseStudy(slug);
  if (!cs) notFound();

  const related = (await listCaseStudies())
    .filter((s) => s.slug !== slug && s.published)
    .slice(0, 3)
    .map((s) => {
      const c = toCard(s);
      return { slug: c.slug, title: c.title, industry: c.industry, href: c.href, image: c.image, result: c.result };
    });

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-black">
        <span>
          Draft preview — “{cs.title || cs.slug}” is {cs.published ? "published" : "not published yet"}.
        </span>
        <Link href={`/admin/cms/case-studies/${slug}`} className="underline underline-offset-2">
          Back to editor
        </Link>
      </div>
      <CaseStudyPageView data={cs} related={related} />
    </>
  );
}
