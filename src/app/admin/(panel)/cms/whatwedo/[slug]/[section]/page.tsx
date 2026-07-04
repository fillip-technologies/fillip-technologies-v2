import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getWhatWeDoSectionSpec,
  whatwedoDefault,
} from "@/server/content/whatwedo-sections";
import { getCategory } from "@/server/content/whatwedo-registry";
import { getContentData } from "@/server/content/queries";
import { saveWhatWeDoSection } from "@/server/content/whatwedo-actions";
import SectionEditor from "../../../SectionEditor";

export default async function EditCategorySection({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section: sectionId } = await params;
  const category = await getCategory(slug);
  const spec = getWhatWeDoSectionSpec(sectionId);
  if (!category || !spec || !spec.section.ready) notFound();
  const section = spec.section;

  // Editor values start from the generic default (flattened), merged with any
  // saved override.
  const data = await getContentData(
    `whatwedo.${slug}.${section.id}`,
    spec.flatten(whatwedoDefault(slug, sectionId))
  );

  return (
    <section className="max-w-2xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/whatwedo" className="hover:text-heading">
          What We Do
        </Link>{" "}
        /{" "}
        <Link href={`/admin/cms/whatwedo/${slug}`} className="hover:text-heading">
          {category.label}
        </Link>{" "}
        / {section.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Edit: {section.label}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{section.description}</p>

      <SectionEditor
        onSave={saveWhatWeDoSection.bind(null, slug, section.id)}
        fields={section.fields}
        list={section.list ?? null}
        initial={data}
      />
    </section>
  );
}
