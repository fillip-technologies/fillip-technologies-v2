import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, Pencil } from "lucide-react";
import { listServicePages } from "@/server/content/servicepage-registry";
import {
  CASE_STUDY_MENU_CATEGORY,
  caseStudyMenuLink,
  listCaseStudies,
} from "@/server/content/casestudy-registry";
import {
  getCategory,
  getCategoryMenuLinks,
  menuStateFor,
  withMenuState,
} from "@/server/content/whatwedo-registry";
import { SERVICE_TEMPLATES } from "@/server/content/servicepage-templates";
import ServicePagesManager from "../../services/ServicePagesManager";
import CaseStudiesManager from "../../case-studies/CaseStudiesManager";
import { CategoryLinkMenuToggle, MenuBadge } from "../../MenuToggle";

export const dynamic = "force-dynamic";

/**
 * Pages that belong to a What We Do column but aren't CMS service pages, so they
 * get their own rows (with a menu toggle) here:
 * - custom-layout pages with a bespoke, hand-built design, whose content lives in
 *   the ABOUT_PAGES registry (`page.<slug>.*`) and MUST be edited via the
 *   dedicated page editor at /admin/cms/pages/<slug>;
 * - standalone file-based landing pages (no CMS editor — `editHref` omitted).
 */
const BESPOKE_CATEGORY_PAGES: Record<
  string,
  { title: string; editHref?: string; note?: string; publicHref: string }[]
> = {
  "creative-experience-design": [
    {
      title: "Graphic Designing",
      editHref: "/admin/cms/pages/graphic-designing",
      publicHref: "/graphic-designing",
    },
  ],
  "seo-performance-marketing": [
    {
      title: "Technical SEO",
      note: "Standalone landing page — content in src/data/services/seo/pages/technical-seo.json",
      publicHref: "/technical-seo",
    },
  ],
};

/**
 * Which template(s) new pages in each What-We-Do category can use. Keeps the
 * create form focused on the layouts that column actually uses, instead of the
 * full catch-all list. Columns with more than one entry let the admin choose a
 * layout when adding a page (e.g. SEO vs Performance Marketing).
 */
const CATEGORY_TEMPLATES: Record<string, string[]> = {
  "web-development": ["service"],
  "mobile-app-development": ["mobile-app"],
  "software-enterprise": ["software-enterprise"],
  "creative-experience-design": ["creative-design"],
  "seo-performance-marketing": ["marketing", "performance-marketing"],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: `${category?.label ?? "Category"} — CMS` };
}

export default async function CategoryPagesCmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  // Only the What-We-Do columns; Solutions has its own area.
  if (!category || category.group === "solutions") notFound();

  // "Challenges We Solve" links to case studies, not service pages.
  const isCaseStudyColumn = slug === CASE_STUDY_MENU_CATEGORY;

  const [allPages, caseStudies, menuLinks] = await Promise.all([
    isCaseStudyColumn ? Promise.resolve([]) : listServicePages(),
    isCaseStudyColumn ? listCaseStudies() : Promise.resolve([]),
    getCategoryMenuLinks(slug),
  ]);
  const pages = await withMenuState(allPages.filter((p) => p.categorySlug === slug));

  const templateIds = CATEGORY_TEMPLATES[slug] ?? ["service"];
  const templates = SERVICE_TEMPLATES.filter((t) => templateIds.includes(t.id));

  const bespokePages = (BESPOKE_CATEGORY_PAGES[slug] ?? []).map((p) => ({
    ...p,
    inMenu: menuLinks.some((i) => i.href === p.publicHref),
  }));

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / {category.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">{category.label} — pages</h1>
      <p className="mb-2 text-sm text-muted-foreground">
        {isCaseStudyColumn
          ? `The case studies behind the “${category.label}” column of the What We Do menu.`
          : `The detail pages behind the “${category.label}” column of the What We Do menu.`}{" "}
        Publishing makes a page live; <strong className="text-heading">Show in menu</strong>{" "}
        decides whether it appears when hovering the menu.
      </p>
      <Link
        href={`/admin/cms/whatwedo/${slug}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Reorder or rename this column’s menu links <ArrowRight size={15} />
      </Link>

      {isCaseStudyColumn ? (
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
      ) : (
        <ServicePagesManager
          initial={pages}
          categories={[{ slug: category.slug, label: category.label }]}
          templates={templates.map((t) => ({ id: t.id, label: t.label, urlPrefix: t.urlPrefix }))}
        />
      )}

      {/* Pages under this column that aren't CMS service pages (custom-layout or
          standalone landing pages), listed so everything in the column — and its
          menu toggle — is reachable from one place. */}
      {bespokePages.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-1 text-sm font-semibold text-heading">Other pages in this column</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Custom-layout pages are edited in their own page editor (their content lives under{" "}
            <code>page.&lt;slug&gt;</code>) — editing them in the generic section editor above won’t
            affect the live page.
          </p>
          <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
            {bespokePages.map((p) => (
              <li
                key={p.publicHref}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-medium text-heading">
                    {p.editHref ? (
                      <Link href={p.editHref} className="hover:text-primary">
                        {p.title}
                      </Link>
                    ) : (
                      p.title
                    )}
                    <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[11px] font-medium text-orange-600">
                      {p.editHref ? "Custom layout" : "Landing page"}
                    </span>
                    <MenuBadge inMenu={p.inMenu} />
                  </p>
                  <p className="truncate text-sm text-muted-foreground">{p.publicHref}</p>
                  {p.note ? <p className="text-xs text-muted-foreground">{p.note}</p> : null}
                </div>

                <div className="flex items-center gap-1">
                  <a
                    href={p.publicHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View live page"
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-card hover:text-heading"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <CategoryLinkMenuToggle
                    categorySlug={slug}
                    label={p.title}
                    href={p.publicHref}
                    inMenu={p.inMenu}
                  />
                  {p.editHref ? (
                    <Link
                      href={p.editHref}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-body transition-colors hover:bg-card"
                    >
                      <Pencil size={14} /> Edit
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
