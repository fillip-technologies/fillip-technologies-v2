import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_CASE_STUDIES, HOME_CASESTUDIES_BG } from "@/data/home/defaults";
import { enrichCaseStudies, type CaseStudiesContent } from "@/lib/case-studies";
import { getContentData } from "@/server/content/queries";
import { getSection, sectionDefaults } from "@/server/content/home-sections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Case Studies | Fillip Technologies",
  description:
    "Explore Fillip Technologies case studies across healthcare, e-commerce, real estate, education, fintech, and more.",
};

async function getCaseStudiesContent() {
  const section = getSection("casestudies");
  const defaults = section ? sectionDefaults(section) : {};
  return getContentData("home.casestudies", defaults) as Promise<CaseStudiesContent>;
}

export default async function CaseStudiesPage() {
  const content = await getCaseStudiesContent();
  const items = enrichCaseStudies(content.items?.length ? content.items : HOME_CASE_STUDIES);
  const backgroundImage = content.backgroundImage || HOME_CASESTUDIES_BG;

  return (
    <main className="bg-[#f8fafc]">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#edf5ff] via-[#f8fbff] to-white py-24 lg:py-32">
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0242a2 1px, transparent 1px), linear-gradient(to bottom, #0242a2 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <Image
          src={backgroundImage}
          alt=""
          width={1536}
          height={1024}
          aria-hidden="true"
          className="pointer-events-none absolute -right-[12%] top-1/2 hidden w-[min(760px,52vw)] -translate-y-1/2 opacity-50 lg:block"
        />

        <div className="container relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
              {content.eyebrow ?? "Case Studies"}
            </span>
            <h1 className="mt-7 text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-slate-950 md:text-7xl">
              Results That Speak <span className="highlight-text">For Themselves</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {content.description ??
                "Discover how strategy, technology, and execution helped our clients generate more leads, increase revenue, and scale faster."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.slug}
                className="group overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.11)]"
              >
                <Link href={item.href} className="relative block aspect-[16/12] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950">
                    {item.result}
                  </span>
                  <span className="absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                    {item.industry}
                  </span>
                </Link>

                <div className="p-7">
                  <h2 className="text-2xl font-bold leading-tight text-[var(--heading)]">
                    <Link href={item.href}>{item.title}</Link>
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[var(--body)]">{item.description}</p>
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-all duration-300 group-hover:gap-3"
                  >
                    View Case Study
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
