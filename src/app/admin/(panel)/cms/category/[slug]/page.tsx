import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Pencil } from "lucide-react";
import { listServicePages } from "@/server/content/servicepage-registry";
import { getCategory } from "@/server/content/whatwedo-registry";
import { SERVICE_TEMPLATES } from "@/server/content/servicepage-templates";
import ServicePagesManager from "../../services/ServicePagesManager";

export const dynamic = "force-dynamic";

/**
 * Custom-layout pages that belong to a What We Do category but use a bespoke,
 * hand-built layout instead of the generic service-page renderer. Their content
 * lives in the ABOUT_PAGES registry (`page.<slug>.*`) and MUST be edited via the
 * dedicated page editor at /admin/cms/pages/<slug>. Listed here so they are
 * reachable from the category they belong to.
 */
const BESPOKE_CATEGORY_PAGES: Record<
  string,
  { title: string; editHref: string; publicHref: string }[]
> = {
  "creative-experience-design": [
    {
      title: "Graphic Designing",
      editHref: "/admin/cms/pages/graphic-designing",
      publicHref: "/graphic-designing",
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
  "challenges-we-solve": ["challenges"],
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

  const allPages = await listServicePages();
  const pages = allPages.filter((p) => p.categorySlug === slug);

  const templateIds = CATEGORY_TEMPLATES[slug] ?? ["service"];
  const templates = SERVICE_TEMPLATES.filter((t) => templateIds.includes(t.id));

  const bespokePages = BESPOKE_CATEGORY_PAGES[slug] ?? [];

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / {category.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">{category.label} — pages</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        The detail pages behind the “{category.label}” column of the What We Do menu. Create a page,
        edit its sections, then publish — its link is added to this column’s menu automatically.
      </p>

      <ServicePagesManager
        initial={pages}
        categories={[{ slug: category.slug, label: category.label }]}
        templates={templates.map((t) => ({ id: t.id, label: t.label, urlPrefix: t.urlPrefix }))}
      />

      {/* Custom-layout pages — hand-built designs edited via their own page
          editor, listed here so everything under this column is reachable from
          one place. */}
      {bespokePages.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-1 text-sm font-semibold text-heading">Custom-layout pages</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            These use a bespoke design and are edited in their own page editor (their content lives
            under <code>page.&lt;slug&gt;</code>). Use “Edit” below — editing them in the generic
            section editor above won’t affect the live page.
          </p>
          <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
            {bespokePages.map((p) => (
              <li
                key={p.editHref}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <Link href={p.editHref} className="min-w-0 flex-1 group">
                  <p className="flex items-center gap-2 font-medium text-heading group-hover:text-primary">
                    {p.title}
                    <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[11px] font-medium text-orange-600">
                      Custom layout
                    </span>
                  </p>
                  <p className="truncate text-sm text-muted-foreground">{p.publicHref}</p>
                </Link>

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
                  <Link
                    href={p.editHref}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-body transition-colors hover:bg-card"
                  >
                    <Pencil size={14} /> Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
