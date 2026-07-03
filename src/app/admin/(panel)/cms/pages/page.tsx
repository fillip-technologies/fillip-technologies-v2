import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ABOUT_PAGES } from "@/server/content/page-sections";

export const metadata = { title: "About Pages — CMS" };

export default function AboutPagesListPage() {
  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / About Pages
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">About pages</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Edit the content of the pages linked from the top-nav “About” dropdown.
      </p>

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {ABOUT_PAGES.map((group) => (
          <li key={group.id}>
            <Link
              href={`/admin/cms/pages/${group.id}`}
              className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-card"
            >
              <div>
                <p className="font-medium text-heading">{group.label}</p>
                <p className="text-sm text-muted-foreground">
                  {group.description} · {group.sections.length} section
                  {group.sections.length === 1 ? "" : "s"}
                </p>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
