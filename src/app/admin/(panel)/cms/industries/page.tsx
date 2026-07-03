import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { INDUSTRIES, INDUSTRY_SECTION_IDS } from "@/server/content/industry-sections";

export const metadata = { title: "Industries — CMS" };

export default function IndustriesListPage() {
  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Industries
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Industry pages</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Edit the content of each <code>/industries/&lt;slug&gt;</code> page.
      </p>

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {INDUSTRIES.map((ind) => (
          <li key={ind.slug}>
            <Link
              href={`/admin/cms/industries/${ind.slug}`}
              className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-card"
            >
              <div>
                <p className="font-medium text-heading">{ind.label}</p>
                <p className="text-sm text-muted-foreground">
                  /industries/{ind.slug} · {INDUSTRY_SECTION_IDS.length} sections
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
