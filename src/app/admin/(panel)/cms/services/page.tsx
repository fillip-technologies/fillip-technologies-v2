import Link from "next/link";
import { listServicePages } from "@/server/content/servicepage-registry";
import { listCategories } from "@/server/content/whatwedo-registry";
import { SERVICE_TEMPLATES } from "@/server/content/servicepage-sections";
import ServicePagesManager from "./ServicePagesManager";

export const metadata = { title: "Service Pages — CMS" };
export const dynamic = "force-dynamic";

export default async function ServicePagesCmsPage() {
  const [pages, categories] = await Promise.all([listServicePages(), listCategories()]);

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Service Pages
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Service Pages</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        The detail pages behind the “What We Do” menu links (e.g.{" "}
        <code>/services/ecommerce-development</code>). Create a page under a category, edit its
        sections, then publish — its link is added to that category’s menu automatically.
      </p>

      <ServicePagesManager
        initial={pages}
        categories={categories.map((c) => ({ slug: c.slug, label: c.label }))}
        templates={SERVICE_TEMPLATES.map((t) => ({ id: t.id, label: t.label }))}
      />
    </section>
  );
}
