import Link from "next/link";
import { GLOBAL_POPUP_SECTION } from "@/server/content/global-sections";
import { sectionDefaults } from "@/server/content/home-sections";
import { getContentData } from "@/server/content/queries";
import { saveGlobalPopup } from "@/server/content/global-actions";
import SectionEditor from "../SectionEditor";

export const metadata = { title: "Popup Ad — CMS" };

export default async function GlobalPopupCmsPage() {
  const section = GLOBAL_POPUP_SECTION;
  const data = await getContentData("global.popup", sectionDefaults(section));

  return (
    <section className="max-w-2xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Popup Ad
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Edit: {section.label}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{section.description}</p>

      <SectionEditor
        onSave={saveGlobalPopup}
        fields={section.fields}
        list={null}
        initial={data}
      />
    </section>
  );
}
