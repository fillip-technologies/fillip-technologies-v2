import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getIndustrySectionSpec,
  industryDefault,
} from "@/server/content/industry-sections";
import { getIndustry } from "@/server/content/industry-registry";
import { getContentData } from "@/server/content/queries";
import { saveIndustrySection } from "@/server/content/industry-actions";
import SectionEditor from "../../../SectionEditor";

export default async function EditIndustrySection({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section: sectionId } = await params;
  const industry = await getIndustry(slug);
  const spec = getIndustrySectionSpec(sectionId);
  if (!industry || !spec || !spec.section.ready) notFound();
  const section = spec.section;

  // Editor values start from the industriesData default (flattened), merged
  // with any saved override.
  const data = await getContentData(
    `industry.${slug}.${section.id}`,
    spec.flatten(industryDefault(slug, sectionId))
  );

  return (
    <section className="max-w-2xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/industries" className="hover:text-heading">
          Industries
        </Link>{" "}
        /{" "}
        <Link href={`/admin/cms/industries/${slug}`} className="hover:text-heading">
          {industry.label}
        </Link>{" "}
        / {section.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Edit: {section.label}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{section.description}</p>

      <SectionEditor
        onSave={saveIndustrySection.bind(null, slug, section.id)}
        fields={section.fields}
        list={section.list ?? null}
        initial={data}
      />
    </section>
  );
}
