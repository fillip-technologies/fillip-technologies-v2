"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  FileLock2,
  Folder,
  GitBranch,
  Lock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import type { Cta, HireImage, IconItem, IconKey, SectionHeading } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";
import { getIcon } from "./icons";

type SecurityContent = SectionHeading & {
  points: IconItem[];
  strip: { label: string; icon: IconKey }[];
  cta: { text: string; button: Cta };
};

/* ---------- Illustrative visuals (decorative) ---------- */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_rgba(2,66,162,0.14)]">
      {children}
    </div>
  );
}

function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-2">
      {widths.map((w, i) => (
        <div key={i} className="h-2 rounded-full bg-slate-100" style={{ width: w }} />
      ))}
    </div>
  );
}

function NdaVisual() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0242A2]">
          <FileLock2 className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">Confidentiality Agreement</p>
          <p className="text-xs text-slate-500">Project: Your AI product</p>
        </div>
      </div>
      <div className="mt-5">
        <Lines widths={["100%", "92%", "96%", "70%"]} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {["Client", "Fillip Technologies"].map((party) => (
          <div key={party} className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Party</p>
            <p className="mt-0.5 text-xs font-medium text-slate-800">{party}</p>
            <div className="mt-2 h-px bg-slate-200" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function IpVisual() {
  const tree = [
    { name: "your-ai-product", depth: 0 },
    { name: "agents", depth: 1 },
    { name: "retrieval", depth: 1 },
    { name: "api", depth: 1 },
    { name: "docs", depth: 1 },
  ];
  return (
    <Card>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Project repository</p>
      <ul className="mt-3 space-y-1.5 font-mono text-xs text-slate-700">
        {tree.map((t) => (
          <li key={t.name} className="flex items-center gap-2" style={{ paddingLeft: t.depth * 18 }}>
            <Folder className="h-3.5 w-3.5 text-[#0F6FFF]" />
            {t.name}
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/60 p-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">IP & ownership terms</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">Defined in your engagement agreement.</p>
      </div>
    </Card>
  );
}

function AccessVisual() {
  const rows = [
    { name: "Code repository", on: true },
    { name: "Staging environment", on: true },
    { name: "Production environment", on: false },
    { name: "API credentials", on: false },
  ];
  return (
    <Card>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Developer access</p>
      <ul className="mt-3 divide-y divide-slate-100">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between py-2.5">
            <span className="flex items-center gap-2 text-sm text-slate-700">
              {r.on ? <UserCheck className="h-4 w-4 text-[#0F6FFF]" /> : <Lock className="h-4 w-4 text-slate-400" />}
              {r.name}
            </span>
            <span className={`relative h-5 w-9 rounded-full transition-colors ${r.on ? "bg-[#0F6FFF]" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${r.on ? "left-[18px]" : "left-0.5"}`} />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-500">Access set by the needs of the engagement.</p>
    </Card>
  );
}

function WorkflowVisual() {
  const steps = ["Feature branch", "Pull request", "Code review", "Testing", "Deployment"];
  return (
    <Card>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Development workflow</p>
      <ol className="relative mt-4 space-y-3">
        <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-blue-100" />
        {steps.map((s, i) => (
          <li key={s} className="relative flex items-center gap-3 text-sm text-slate-700">
            <span
              className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full ${
                i < 4 ? "bg-[#0F6FFF] text-white" : "border border-blue-200 bg-white text-[#0F6FFF]"
              }`}
            >
              {i < 4 ? <Check className="h-3.5 w-3.5" /> : <GitBranch className="h-3 w-3" />}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </Card>
  );
}

const VISUALS = [NdaVisual, IpVisual, AccessVisual, WorkflowVisual];

/* ---------- Section ---------- */

export default function HireSecurity({ content, image }: { content: SecurityContent; image?: HireImage | null }) {
  const [active, setActive] = useState(0);
  const Visual = VISUALS[active % VISUALS.length];

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Visual */}
          <div
            aria-hidden
            className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-slate-50 via-blue-50/70 to-white p-6 sm:min-h-[420px] lg:min-h-[580px]"
          >
            {image && <Image src={image.src} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover opacity-30" />}
            {/* Layered backdrop */}
            <div
              className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(2,66,162,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,66,162,0.07) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            <div className="absolute left-[12%] top-[14%] h-40 w-56 rotate-[-6deg] rounded-2xl border border-slate-200 bg-white/70" />
            <div className="absolute bottom-[12%] right-[10%] h-36 w-52 rotate-[5deg] rounded-2xl border border-slate-200 bg-white/70" />
            <span className="absolute right-[14%] top-[12%] flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0F6FFF] shadow-[0_10px_25px_rgba(2,66,162,0.12)]">
              <ShieldCheck className="h-5 w-5" />
            </span>

            <div key={active} className="relative flex w-full animate-in justify-center fade-in zoom-in-95 duration-300">
              <Visual />
            </div>
          </div>

          {/* Content */}
          <div>
            <h2>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0F6FFF]">
                {content.eyebrow}
              </span>
              <span className="mt-3 block text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
                <HighlightTitle title={content.title} />
              </span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.description}
            </p>

            <ul className="mt-8 border-t border-slate-200">
              {content.points.map((tp, i) => {
                const Icon = getIcon(tp.icon);
                const isActive = i === active;
                return (
                  <li key={tp.title} className="relative border-b border-slate-200">
                    {/* Active indicator line */}
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-[#0242A2] to-[#38BDF8] transition-transform duration-500 ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <button
                      type="button"
                      id={`security-trigger-${i}`}
                      aria-expanded={isActive}
                      aria-controls={`security-panel-${i}`}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="flex w-full items-center gap-4 py-5 pl-5 pr-1 text-left"
                    >
                      <span className="text-xs font-semibold tabular-nums text-[#0F6FFF]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                          isActive ? "bg-gradient-to-br from-[#0242A2] to-[#38BDF8] text-white" : "bg-blue-50 text-[#0242A2]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className={`flex-1 text-base font-semibold transition-colors sm:text-lg ${isActive ? "text-[#0242A2]" : "text-slate-900"}`}>
                        {tp.title}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${isActive ? "rotate-180 text-[#0F6FFF]" : ""}`}
                      />
                    </button>
                    <div
                      id={`security-panel-${i}`}
                      role="region"
                      aria-labelledby={`security-trigger-${i}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pl-5 pr-6 sm:pl-[6.5rem] text-sm leading-relaxed text-slate-600">{tp.description}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Trust strip */}
        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-y border-slate-200 py-5 sm:gap-x-0">
          {content.strip.map((t, i) => {
            const Icon = getIcon(t.icon);
            return (
              <li
                key={t.label}
                className={`flex items-center gap-2 text-sm font-medium text-slate-700 sm:px-6 lg:px-10 ${
                  i > 0 ? "sm:border-l sm:border-slate-200" : ""
                }`}
              >
                <Icon className="h-4 w-4 text-[#0F6FFF]" />
                {t.label}
              </li>
            );
          })}
        </ul>

        {/* Contextual CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
          <p className="text-sm font-medium text-slate-700 sm:text-base">{content.cta.text}</p>
          <Link
            href={content.cta.button.href}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:border-[#0242A2] hover:text-[#0242A2]"
          >
            {content.cta.button.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
