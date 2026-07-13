import Link from "next/link";
import { notFound } from "next/navigation";
import { listServicePages } from "@/server/content/servicepage-registry";
import { getCategory } from "@/server/content/whatwedo-registry";
import { SERVICE_TEMPLATES } from "@/server/content/servicepage-templates";
import ServicePagesManager from "../../services/ServicePagesManager";

export const dynamic = "force-dynamic";

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
    </section>
  );
}
