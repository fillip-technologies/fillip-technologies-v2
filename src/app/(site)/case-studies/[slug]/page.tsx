import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, LineChart, Target } from "lucide-react";
import { HOME_CASE_STUDIES, HOME_CASESTUDIES_BG } from "@/data/home/defaults";
import { enrichCaseStudies, findCaseStudy, type CaseStudiesContent } from "@/lib/case-studies";
import { getContentData } from "@/server/content/queries";
import { getSection, sectionDefaults } from "@/server/content/home-sections";

export const dynamic = "force-dynamic";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

async function getCaseStudyItems() {
  const section = getSection("casestudies");
  const defaults = section ? sectionDefaults(section) : {};
  const content = (await getContentData("home.casestudies", defaults)) as CaseStudiesContent;
  return content.items?.length ? content.items : HOME_CASE_STUDIES;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findCaseStudy(await getCaseStudyItems(), slug);

  if (!item) return {};

  return {
    title: `${item.title} Case Study | Fillip Technologies`,
    description: item.description,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const rawItems = await getCaseStudyItems();
  const item = findCaseStudy(rawItems, slug);
  const related = enrichCaseStudies(rawItems).filter((study) => study.slug !== slug).slice(0, 3);

  if (!item) notFound();

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
          src={HOME_CASESTUDIES_BG}
          alt=""
          width={1536}
          height={1024}
          aria-hidden="true"
          className="pointer-events-none absolute -right-[12%] top-1/2 hidden w-[min(760px,52vw)] -translate-y-1/2 opacity-50 lg:block"
        />
        <div className="container relative mx-auto max-w-7xl px-6">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:gap-3"
          >
            <ArrowLeft size={16} />
            All Case Studies
          </Link>

          <div className="mt-10 max-w-3xl">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
                {item.industry} Case Study
              </div>
              <h1 className="mt-6 text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-slate-950 md:text-7xl">
                {item.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{item.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-sm">
              <Target className="h-7 w-7 text-[var(--primary)]" />
              <h2 className="mt-6 text-3xl font-bold tracking-[-0.04em] text-[var(--heading)]">
                The Challenge
              </h2>
              <p className="mt-4 leading-8 text-[var(--body)]">{item.challenge}</p>
            </div>

            <div className="rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-sm">
              <LineChart className="h-7 w-7 text-[var(--primary)]" />
              <h2 className="mt-6 text-3xl font-bold tracking-[-0.04em] text-[var(--heading)]">
                How We Solved It
              </h2>
              <div className="mt-6 grid gap-4">
                {item.approach.map((point) => (
                  <div key={point} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[var(--primary)]" />
                    <p className="leading-7 text-[var(--body)]">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-[var(--heading)]">
              Outcome
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {item.outcomes.map((outcome) => (
                <div key={outcome} className="rounded-2xl bg-[var(--surface)] p-6">
                  <p className="leading-7 text-[var(--body)]">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
                  More Case Studies
                </p>
                <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)]">
                  Explore Related Results
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((study) => (
                <Link
                  key={study.slug}
                  href={study.href}
                  className="group overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 text-sm font-bold text-white">
                      {study.result}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[var(--heading)]">{study.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--body)]">{study.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
