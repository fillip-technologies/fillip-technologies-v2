"use client";

import { useState } from "react";
import Image from "next/image";
import type { HireImage, IconKey, SectionHeading, TechItem } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";
import { DynamicIcon, getIcon } from "./icons";

type Role = { title: string; detail: string; icon: IconKey; x: number; y: number };

type CollaborationContent = SectionHeading & {
  centre: { title: string; subtitle: string; icon: IconKey };
  roles: Role[];
  workflow: { title: string; icon: IconKey }[];
  toolsHeading: string;
  toolGroups: { title: string; icon: IconKey; tools: TechItem[] }[];
};

function RoleNode({ role, highlighted }: { role: Role; highlighted: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border bg-white px-3.5 py-3 text-left shadow-[0_12px_30px_rgba(7,47,55,0.08)] transition-all duration-300 ${
        highlighted ? "-translate-y-0.5 border-blue-200 shadow-[0_16px_40px_rgba(15,111,255,0.18)]" : "border-slate-200"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
          highlighted ? "bg-gradient-to-br from-[#0242A2] to-[#38BDF8] text-white" : "bg-blue-50 text-[#0242A2]"
        }`}
      >
        <DynamicIcon name={role.icon} className="h-4 w-4" />
      </span>
      <span>
        <span className="block whitespace-nowrap text-sm font-semibold text-slate-900">{role.title}</span>
        <span className="block whitespace-nowrap text-xs text-slate-500">{role.detail}</span>
      </span>
    </div>
  );
}

function CentreNode({
  centre,
  image,
  size = "lg",
}: {
  centre: CollaborationContent["centre"];
  image?: HireImage | null;
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? "h-40 w-40" : "h-24 w-24";
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`relative ${dim} rounded-full bg-gradient-to-br from-[#0242A2] via-[#0F6FFF] to-[#38BDF8] p-[3px] shadow-[0_20px_50px_rgba(15,111,255,0.3)]`}>
        <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white">
          {image ? (
            <Image src={image.src} alt="" fill sizes="160px" className="object-cover object-[55%_45%]" />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-white text-[#0242A2]">
              <DynamicIcon name={centre.icon} className={size === "lg" ? "h-12 w-12" : "h-8 w-8"} />
            </span>
          )}
        </div>
        {image && (
          <span className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0F6FFF] shadow-md">
            <DynamicIcon name={centre.icon} className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="mt-3 text-sm font-bold text-slate-900">{centre.title}</p>
      <p className="text-xs text-slate-500">{centre.subtitle}</p>
    </div>
  );
}

export default function HireTeamIntegration({ content, image }: { content: CollaborationContent; image?: HireImage | null }) {
  const ROLES = content.roles;
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Connected-team visual */}
          <div className="order-2 lg:order-1">
            {/* Desktop/tablet diagram */}
            <div
              className="relative mx-auto hidden aspect-square w-full max-w-[580px] md:block"
              role="img"
              aria-label="A Fillip AI developer at the centre, connected to your product team, design team, client stakeholders and QA / DevOps"
            >
              {/* Backdrop rings */}
              <div aria-hidden className="absolute inset-[14%] rounded-full border border-blue-100" />
              <div aria-hidden className="absolute inset-[28%] rounded-full border border-blue-100/80" />
              <div aria-hidden className="absolute inset-[22%] rounded-full bg-gradient-to-br from-blue-50 via-white to-cyan-50 blur-2xl" />

              {/* Connectors */}
              <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {ROLES.map((r, i) => (
                  <line
                    key={r.title}
                    x1="50"
                    y1="50"
                    x2={r.x}
                    y2={r.y}
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray={hovered === i ? undefined : "4 5"}
                    className={`transition-all duration-300 ${hovered === i ? "stroke-[#0F6FFF]" : "stroke-blue-200"}`}
                    strokeWidth={hovered === i ? 2 : 1.5}
                  />
                ))}
              </svg>

              {/* Centre */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CentreNode centre={content.centre} image={image} />
              </div>

              {/* Roles */}
              {ROLES.map((r, i) => (
                <div
                  key={r.title}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <RoleNode role={r} highlighted={hovered === i} />
                </div>
              ))}
            </div>

            {/* Mobile: vertical flow */}
            <div className="md:hidden">
              <CentreNode centre={content.centre} image={image} size="sm" />
              <ul className="relative mt-6 space-y-3 pl-8">
                <span aria-hidden className="absolute bottom-6 left-3 top-0 w-px bg-gradient-to-b from-[#0F6FFF] to-blue-100" />
                {ROLES.map((r) => (
                  <li key={r.title} className="relative">
                    <span aria-hidden className="absolute -left-[25px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#0F6FFF] ring-4 ring-white" />
                    <RoleNode role={r} highlighted={false} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copy + tools */}
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              <HighlightTitle title={content.title} />
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.description}
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
              <p className="text-sm font-semibold text-slate-900">{content.toolsHeading}</p>
              <p className="mt-1 text-xs text-slate-500">For example:</p>
              <dl className="mt-4 space-y-4">
                {content.toolGroups.map((g) => {
                  const Icon = getIcon(g.icon);
                  return (
                    <div key={g.title} className="sm:flex sm:items-start sm:gap-4">
                      <dt className="flex w-44 shrink-0 items-center gap-2 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <Icon className="h-3.5 w-3.5 text-[#0F6FFF]" />
                        {g.title}
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-2 sm:mt-0">
                        {g.tools.map((t) => (
                          <span
                            key={t.name}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-[#0242A2] hover:shadow-[0_6px_16px_rgba(15,111,255,0.15)] sm:text-[13px]"
                          >
                            {t.name}
                          </span>
                        ))}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>

        {/* Workflow strip */}
        <div className="mt-16 rounded-[28px] border border-slate-200 bg-gradient-to-br from-white to-blue-50/40 p-6 sm:p-8 lg:mt-20">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0F6FFF]">How work flows</p>
          <ol className="relative mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            <span
              aria-hidden
              className="absolute left-[8.33%] right-[8.33%] top-5 hidden h-px bg-gradient-to-r from-blue-200 via-[#0F6FFF]/50 to-blue-200 lg:block"
            />
            {content.workflow.map((w, i) => {
              const Icon = getIcon(w.icon);
              return (
                <li key={w.title} className="group relative flex items-center gap-3 lg:flex-col lg:text-center">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white text-[#0242A2] shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-[#0242A2] group-hover:to-[#38BDF8] group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold tabular-nums text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block text-sm font-semibold text-slate-900">{w.title}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
