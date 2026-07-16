import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ABOUT_PAGES } from "@/server/content/page-sections";

export const metadata = { title: "About Pages — CMS" };

// Some pages live in the ABOUT_PAGES registry only so other CMS areas can
// deep-link to their generic section editor. They belong to the Solutions menu
// or a What We Do category, not About, so keep them out of this list.
const NON_ABOUT_PAGE_IDS = new Set([
  "security-surveillance",
  "whatsapp-business",
  "ticket-booking",
  "sms-communication",
  "graphic-designing",
]);

export default function AboutPagesListPage() {
  const aboutPages = ABOUT_PAGES.filter((group) => !NON_ABOUT_PAGE_IDS.has(group.id));

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
        {aboutPages.map((group) => (
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
