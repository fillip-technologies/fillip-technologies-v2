import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageGroup, getPageSection, pageSectionDefaults } from "@/server/content/page-sections";
import { getContentData } from "@/server/content/queries";
import { savePageSection } from "@/server/content/pages-actions";
import SectionEditor from "../../../SectionEditor";

export default async function EditPageSection({
  params,
}: {
  params: Promise<{ page: string; section: string }>;
}) {
  const { page, section: sectionId } = await params;
  const group = getPageGroup(page);
  const section = getPageSection(page, sectionId);
  if (!group || !section || !section.ready) notFound();

  const data = await getContentData(`page.${page}.${section.id}`, pageSectionDefaults(section));

  return (
    <section className="max-w-2xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/pages" className="hover:text-heading">
          About Pages
        </Link>{" "}
        /{" "}
        <Link href={`/admin/cms/pages/${group.id}`} className="hover:text-heading">
          {group.label}
        </Link>{" "}
        / {section.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Edit: {section.label}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{section.description}</p>

      <SectionEditor
        onSave={savePageSection.bind(null, group.id, section.id)}
        fields={section.fields}
        list={section.list ?? null}
        initial={data}
      />
    </section>
  );
}
