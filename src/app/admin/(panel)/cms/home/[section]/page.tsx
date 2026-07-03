import Link from "next/link";
import { notFound } from "next/navigation";
import { getSection, sectionDefaults } from "@/server/content/home-sections";
import { getContentData } from "@/server/content/queries";
import { saveHomeSection } from "@/server/content/actions";
import SectionEditor from "../../SectionEditor";

export default async function EditHomeSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = await params;
  const section = getSection(sectionId);
  if (!section || !section.ready) notFound();

  const data = await getContentData(`home.${section.id}`, sectionDefaults(section));

  return (
    <section className="max-w-2xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/home" className="hover:text-heading">
          Home Page
        </Link>{" "}
        / {section.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Edit: {section.label}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{section.description}</p>

      <SectionEditor
        onSave={saveHomeSection.bind(null, section.id)}
        fields={section.fields}
        list={section.list ?? null}
        initial={data}
      />
    </section>
  );
}
