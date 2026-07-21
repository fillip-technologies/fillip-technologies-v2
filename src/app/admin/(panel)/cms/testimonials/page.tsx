import Link from "next/link";
import { GLOBAL_TESTIMONIALS_SECTION } from "@/server/content/global-sections";
import { sectionDefaults } from "@/server/content/home-sections";
import { getContentData } from "@/server/content/queries";
import { saveGlobalTestimonials } from "@/server/content/global-actions";
import SectionEditor from "../SectionEditor";

export const metadata = { title: "Testimonials — CMS" };

export default async function GlobalTestimonialsCmsPage() {
  const section = GLOBAL_TESTIMONIALS_SECTION;
  const data = await getContentData("global.testimonials", sectionDefaults(section));

  return (
    <section className="max-w-2xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Testimonials
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Edit: {section.label}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{section.description}</p>

      <SectionEditor
        onSave={saveGlobalTestimonials}
        fields={section.fields}
        list={section.list ?? null}
        initial={data}
      />
    </section>
  );
}
