import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getTemplateSchema } from "@/server/content/servicepage-schema";
import { getServicePage } from "@/server/content/servicepage-registry";
import StatusBar from "./StatusBar";

export default async function ServicePageSectionsList({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (!page) notFound();

  const schema = getTemplateSchema(page.template);

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/services" className="hover:text-heading">
          Service Pages
        </Link>{" "}
        / {page.title}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">{page.title} — sections</h1>
      <p className="mb-6 text-sm text-muted-foreground">Choose a section to edit.</p>

      <StatusBar slug={slug} published={page.published} urlPrefix={page.urlPrefix} />

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {schema.sectionIds.map((id) => {
          const section = schema.getSpec(id)!.section;
          return (
            <li key={id}>
              <Link
                href={`/admin/cms/services/${slug}/${id}`}
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
