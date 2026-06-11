import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HOME_SECTIONS } from "@/server/content/home-sections";

export const metadata = { title: "Home Page — CMS" };

export default function HomeSectionsPage() {
  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Home Page
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Home Page sections</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Choose a section to edit. Sections marked “Soon” use card lists and are coming next.
      </p>

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {HOME_SECTIONS.map((section) => {
          const inner = (
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-heading">{section.label}</p>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
              {section.ready ? (
                <ChevronRight size={18} className="text-muted-foreground" aria-hidden="true" />
              ) : (
                <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                  Soon
                </span>
              )}
            </div>
          );

          return (
            <li key={section.id}>
              {section.ready ? (
                <Link href={`/admin/cms/home/${section.id}`} className="block transition-colors hover:bg-card">
                  {inner}
                </Link>
              ) : (
                <div className="cursor-not-allowed opacity-60">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
