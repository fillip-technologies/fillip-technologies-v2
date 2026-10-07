"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, MessageSquareText, Sparkles } from "lucide-react";
import type { Project, SectionHeading } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";

type CaseStudiesContent = SectionHeading & { featured: Project | null; secondary: Project[]; projectTypes: string[] };

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function openSiteAssistant() {
  document.querySelector<HTMLButtonElement>('[aria-label="Open support chat"]')?.click();
}

function Tag({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "outline" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
        tone === "light" ? "bg-blue-50 text-[#0242A2]" : "border border-slate-200 bg-white text-slate-500"
      }`}
    >
      {children}
    </span>
  );
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 sm:text-[13px]">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectVisual({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-blue-50 via-white to-sky-50 ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(2,66,162,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,66,162,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {project.image ? (
        <div className="relative flex h-full items-center justify-center p-8 sm:p-12">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 1024px) 30vw, 80vw"
            className="h-auto max-h-[520px] w-auto max-w-full rounded-[22px] shadow-[0_30px_70px_rgba(2,66,162,0.22)] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </div>
      ) : (
        // Placeholder slot until a real screenshot is added.
        <div className="relative flex h-full min-h-[240px] items-center justify-center p-8 text-center">
          <p className="text-sm text-slate-400">Project screenshot</p>
        </div>
      )}
    </div>
  );
}

function SecondaryProject({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <motion.article
      {...reveal}
      className={`grid items-center gap-8 rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6 lg:gap-10 ${
        reversed ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"
      }`}
    >
      <ProjectVisual project={project} className={`h-full min-h-[260px] ${reversed ? "lg:order-2" : ""}`} />
      <div className="p-1 sm:p-2">
        <Tag>{project.category}</Tag>
        <h3 className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.description}</p>
        <div className="mt-5">
          <TechList items={project.technology} />
        </div>
        {project.href && (
          <Link href={project.href} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0242A2]">
            View Project
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

export default function HireProjects({ content }: { content: CaseStudiesContent }) {
  const p = content.featured;
  const SECONDARY = content.secondary;
  const PROJECT_TYPES = content.projectTypes;

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            <HighlightTitle title={content.title} />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {content.description}
          </p>
        </motion.div>

        {/* Featured case study */}
        {p && (
        <motion.article
          {...reveal}
          className="mt-14 grid gap-8 rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_24px_60px_rgba(7,47,55,0.06)] sm:p-6 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:p-8"
        >
          <ProjectVisual project={p} className="min-h-[380px] lg:min-h-[640px]" />

          <div className="flex flex-col justify-center px-1 pb-2 sm:px-2 lg:py-4 lg:pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <Tag>{p.category}</Tag>
              {p.label && <Tag tone="outline">{p.label}</Tag>}
            </div>
            <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{p.description}</p>

            <dl className="mt-7 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Business Challenge</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-700">{p.challenge}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#0F6FFF]">AI Solution</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-700">{p.solution}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Technology</p>
              <div className="mt-2.5">
                <TechList items={p.technology} />
              </div>
            </div>

            {p.delivered && (
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">What We Delivered</p>
                <ul className="mt-2.5 space-y-2">
                  {p.delivered.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0F6FFF]">
                        <Check className="h-3 w-3" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.outcomes && (
              <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex items-center gap-2 bg-slate-50/80 px-3.5 py-3 text-xs font-semibold text-slate-800 sm:text-[13px]">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#0F6FFF]" />
                    {o}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              {p.tryLive && (
                <button
                  type="button"
                  onClick={openSiteAssistant}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0242A2] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(2,66,162,0.3)] transition-all duration-300 hover:bg-[#0F6FFF]"
                >
                  <MessageSquareText className="h-4 w-4" />
                  Try It on This Page
                </button>
              )}
              {p.href && (
                <Link
                  href={p.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0242A2] px-6 py-3 text-sm font-semibold text-white"
                >
                  View Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:border-[#0242A2] hover:text-[#0242A2]"
              >
                Discuss a Similar Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.article>
        )}

        {/* Secondary projects (rendered only when real projects are added) */}
        {SECONDARY.length > 0 && (
          <div className="mt-8 space-y-8">
            {SECONDARY.map((proj, i) => (
              <SecondaryProject key={proj.title} project={proj} index={i} />
            ))}
          </div>
        )}

        {/* Project types */}
        {PROJECT_TYPES.length > 0 && (
        <motion.div
          {...reveal}
          className="mt-12 flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-between lg:text-left"
        >
          <p className="text-sm font-semibold text-slate-900">Projects our AI developers take on</p>
          <ul className="flex flex-wrap justify-center gap-2 lg:justify-end">
            {PROJECT_TYPES.map((t) => (
              <li key={t}>
                <Tag tone="outline">{t}</Tag>
              </li>
            ))}
          </ul>
        </motion.div>
        )}
      </div>
    </section>
  );
}
