import Link from "next/link";
import { notFound } from "next/navigation";
import { getTemplateSchema } from "@/server/content/servicepage-schema";
import { getServicePage } from "@/server/content/servicepage-registry";
import { getContentData } from "@/server/content/queries";
import { saveServicePageSection } from "@/server/content/servicepage-actions";
import SectionEditor from "../../../SectionEditor";

export default async function EditServicePageSection({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section: sectionId } = await params;
  const page = await getServicePage(slug);
  if (!page) notFound();
  const schema = getTemplateSchema(page.template);
  const spec = schema.getSpec(sectionId);
  if (!spec || !spec.section.ready) notFound();
  const section = spec.section;

  // Editor values start from the template's static default (flattened), merged
  // with any saved override.
  const data = await getContentData(
    `servicepage.${slug}.${section.id}`,
    spec.flatten(schema.default(slug, sectionId))
  );

  return (
    <section className="max-w-2xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/services" className="hover:text-heading">
          Service Pages
        </Link>{" "}
        /{" "}
        <Link href={`/admin/cms/services/${slug}`} className="hover:text-heading">
          {page.title}
        </Link>{" "}
        / {section.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Edit: {section.label}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{section.description}</p>

      <SectionEditor
        onSave={saveServicePageSection.bind(null, slug, section.id)}
        fields={section.fields}
        list={section.list ?? null}
        initial={data}
      />
    </section>
  );
}
