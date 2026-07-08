import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  getWhatWeDoSectionSpec,
  WHATWEDO_SECTION_IDS,
} from "@/server/content/whatwedo-sections";
import { getCategory, getCategoryMenuLinks } from "@/server/content/whatwedo-registry";
import { saveCategoryMenuLinks } from "@/server/content/whatwedo-actions";
import StatusBar from "./StatusBar";
import MenuLinksEditor from "./MenuLinksEditor";

export default async function CategorySectionsList({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const menuLinks = await getCategoryMenuLinks(slug);

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/whatwedo" className="hover:text-heading">
          What We Do
        </Link>{" "}
        / {category.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">{category.label} — sections</h1>
      <p className="mb-6 text-sm text-muted-foreground">Choose a section to edit.</p>

      <StatusBar slug={slug} published={category.published} />

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {WHATWEDO_SECTION_IDS.map((id) => {
          const section = getWhatWeDoSectionSpec(id)!.section;
          return (
            <li key={id}>
              <Link
                href={`/admin/cms/whatwedo/${slug}/${id}`}
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

      <div className="mt-10 max-w-2xl">
        <h2 className="mb-1 text-base font-semibold text-heading">Menu links</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The sub-links shown under <strong className="text-heading">{category.label}</strong> in the
          top-nav “What We Do” dropdown. Add, edit, reorder or remove them — each has a label and an
          optional URL.
        </p>
        <MenuLinksEditor
          initial={menuLinks}
          onSave={saveCategoryMenuLinks.bind(null, slug)}
        />
      </div>
    </section>
  );
}
