import Link from "next/link";
import { listServicePages } from "@/server/content/servicepage-registry";
import { listCategories } from "@/server/content/whatwedo-registry";
import { SERVICE_TEMPLATES, isSolutionTemplate } from "@/server/content/servicepage-templates";
import ServicePagesManager from "../services/ServicePagesManager";

export const metadata = { title: "Solutions — CMS" };
export const dynamic = "force-dynamic";

export default async function SolutionPagesCmsPage() {
  const [allPages, categories] = await Promise.all([
    listServicePages(),
    listCategories("solutions"),
  ]);
  // Only the Solutions-menu pages (hardware + business solution templates).
  const pages = allPages.filter((p) => isSolutionTemplate(p.template));
  const templates = SERVICE_TEMPLATES.filter((t) => isSolutionTemplate(t.id));

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Solutions
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Solutions — solution pages</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        The detail pages behind the “Solutions” menu (e.g. <code>/hardware-solutions/networking</code>,{" "}
        <code>/solutions/ticket-booking</code>). Create a page under a solution category, edit its
        sections, then publish — its link is added to that category’s menu automatically.
      </p>

      <ServicePagesManager
        initial={pages}
        categories={categories.map((c) => ({ slug: c.slug, label: c.label }))}
        templates={templates.map((t) => ({ id: t.id, label: t.label, urlPrefix: t.urlPrefix }))}
      />
    </section>
  );
}
