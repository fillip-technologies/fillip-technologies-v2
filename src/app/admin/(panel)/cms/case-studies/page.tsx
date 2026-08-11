import Link from "next/link";
import { listCaseStudies } from "@/server/content/casestudy-registry";
import CaseStudiesManager from "./CaseStudiesManager";

export const metadata = { title: "Case Studies — CMS" };
export const dynamic = "force-dynamic";

export default async function CaseStudiesListPage() {
  const caseStudies = await listCaseStudies();

  return (
    <section className="max-w-3xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Case Studies
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Case study pages</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Create, edit and publish <code>/case-studies/&lt;slug&gt;</code> pages. New pages start as
        drafts — edit their sections, preview privately, then publish to go live.
      </p>

      <CaseStudiesManager
        initial={caseStudies.map((c) => ({
          slug: c.slug,
          title: c.title,
          industry: c.industry,
          published: c.published,
        }))}
      />
    </section>
  );
}
