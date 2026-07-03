import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  getIndustrySectionSpec,
  INDUSTRY_SECTION_IDS,
} from "@/server/content/industry-sections";
import { getIndustry } from "@/server/content/industry-registry";
import StatusBar from "./StatusBar";

export default async function IndustrySectionsList({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) notFound();

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/industries" className="hover:text-heading">
          Industries
        </Link>{" "}
        / {industry.label}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">{industry.label} — sections</h1>
      <p className="mb-6 text-sm text-muted-foreground">Choose a section to edit.</p>

      <StatusBar slug={slug} published={industry.published} />

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {INDUSTRY_SECTION_IDS.map((id) => {
          const section = getIndustrySectionSpec(id)!.section;
          return (
            <li key={id}>
              <Link
                href={`/admin/cms/industries/${slug}/${id}`}
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
    </section>
  );
}
