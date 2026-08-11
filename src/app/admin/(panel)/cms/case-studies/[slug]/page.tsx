import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  getCaseStudySectionSpec,
  CASE_STUDY_EDITOR_SECTION_IDS,
} from "@/server/content/casestudy-sections";
import { getCaseStudy } from "@/server/content/casestudy-registry";
import StatusBar from "./StatusBar";

export default async function CaseStudySectionsList({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/case-studies" className="hover:text-heading">
          Case Studies
        </Link>{" "}
        / {cs.title || cs.slug}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">{cs.title || cs.slug} — sections</h1>
      <p className="mb-6 text-sm text-muted-foreground">Choose a section to edit.</p>

      <StatusBar slug={slug} published={cs.published} />

      <Link
        href={`/admin/cms/seo/edit?path=${encodeURIComponent(`/case-studies/${slug}`)}`}
        className="mb-6 inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm text-body transition-colors hover:border-primary hover:text-primary"
      >
        Edit SEO &amp; metadata →
      </Link>

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {CASE_STUDY_EDITOR_SECTION_IDS.map((id) => {
          const section = getCaseStudySectionSpec(id)!.section;
          return (
            <li key={id}>
              <Link
                href={`/admin/cms/case-studies/${slug}/${id}`}
                className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-card"
              >
                <div>
                  <p className="font-medium text-heading">{section.label}</p>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
