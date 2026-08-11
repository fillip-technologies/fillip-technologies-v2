import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudySectionSpec } from "@/server/content/casestudy-sections";
import { getCaseStudy } from "@/server/content/casestudy-registry";
import { saveCaseStudySection } from "@/server/content/casestudy-actions";
import SectionEditor from "../../../SectionEditor";

export default async function EditCaseStudySection({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section: sectionId } = await params;
  const cs = await getCaseStudy(slug);
  const spec = getCaseStudySectionSpec(sectionId);
  if (!cs || !spec || !spec.section.ready) notFound();
  const section = spec.section;

  // The case study stores each section as a nested object; flatten it into the
  // editor's flat string/list shape.
  const sectionData = (cs as unknown as Record<string, unknown>)[sectionId] ?? {};
  const data = spec.flatten(sectionData as Record<string, unknown>);

  return (
    <section className="max-w-2xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/case-studies" className="hover:text-heading">
          Case Studies
        </Link>{" "}
        /{" "}
        <Link href={`/admin/cms/case-studies/${slug}`} className="hover:text-heading">
          {cs.title || cs.slug}
        </Link>{" "}
        / {section.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Edit: {section.label}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{section.description}</p>

      <SectionEditor
        onSave={saveCaseStudySection.bind(null, slug, section.id)}
        fields={section.fields}
        list={section.list ?? null}
        initial={data}
      />
    </section>
  );
}
