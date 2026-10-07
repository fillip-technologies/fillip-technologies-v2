import Link from "next/link";
import {
  CASE_STUDY_MENU_CATEGORY,
  caseStudyMenuLink,
  listCaseStudies,
} from "@/server/content/casestudy-registry";
import { getCategoryMenuLinks, menuStateFor } from "@/server/content/whatwedo-registry";
import CaseStudiesManager from "./CaseStudiesManager";

export const metadata = { title: "Case Studies — CMS" };
export const dynamic = "force-dynamic";

export default async function CaseStudiesListPage() {
  const [caseStudies, menuLinks] = await Promise.all([
    listCaseStudies(),
    getCategoryMenuLinks(CASE_STUDY_MENU_CATEGORY),
  ]);

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
        drafts — edit their sections, preview privately, then publish to go live.{" "}
        <strong className="text-heading">Show in menu</strong> lists a case study under “Challenges
        We Solve” in the What We Do hover menu.
      </p>

      <CaseStudiesManager
        initial={caseStudies.map((c) => {
          const link = caseStudyMenuLink(c);
          return {
            slug: c.slug,
            title: c.title,
            industry: c.industry,
            published: c.published,
            ...menuStateFor(menuLinks, link.href, link.label),
          };
        })}
      />
    </section>
  );
}
