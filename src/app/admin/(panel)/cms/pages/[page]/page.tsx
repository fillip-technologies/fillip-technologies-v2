import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getPageGroup } from "@/server/content/page-sections";

export default async function PageSectionsList({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const group = getPageGroup(page);
  if (!group) notFound();

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/pages" className="hover:text-heading">
          About Pages
        </Link>{" "}
        / {group.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">{group.label} — sections</h1>
      <p className="mb-6 text-sm text-muted-foreground">Choose a section to edit.</p>

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {group.sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`/admin/cms/pages/${group.id}/${section.id}`}
              className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-card"
            >
              <div>
                <p className="font-medium text-heading">{section.label}</p>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
