"use client";

import { useState } from "react";
import Image from "next/image";
import { Circle, CircleCheck, Mic, PhoneOff, Plus, Video } from "lucide-react";
import type { HireImage, IconItem, SectionHeading, TeamMember } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";
import { getIcon } from "./icons";

type ProcessContent = SectionHeading & {
  steps: IconItem[];
  brief: { role: string; experience: string; engagement: string; skills: string[] };
  profiles: TeamMember[];
  interviewer: TeamMember;
  team: TeamMember[];
  teamRoles: string[];
};

/* ---------- Step visuals (illustrative UI, decorative) ---------- */

function Avatar({ image, name, size = 40 }: { image: string; name: string; size?: number }) {
  return (
    <span className="relative shrink-0 overflow-hidden rounded-full ring-2 ring-white" style={{ width: size, height: size }}>
      <Image src={image} alt={name} fill sizes={`${size}px`} className="object-cover object-top" />
    </span>
  );
}

function PanelShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/60 bg-white/95 p-5 shadow-[0_24px_60px_rgba(7,47,55,0.25)] backdrop-blur">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function RequirementsVisual({ c }: { c: ProcessContent }) {
  const rows = [
    { label: "Role", value: c.brief.role },
    { label: "Experience", value: c.brief.experience },
    { label: "Engagement", value: c.brief.engagement },
  ];
  return (
    <PanelShell title="Project brief">
      <dl className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-3 py-2">
            <dt className="text-xs text-slate-500">{r.label}</dt>
            <dd className="text-sm font-medium text-slate-900">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-slate-500">Skills</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {c.brief.skills.map((s) => (
          <span key={s} className="rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs font-medium text-[#0242A2]">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-[#0242A2] py-2 text-center text-sm font-semibold text-white">
        Submit requirements
      </div>
    </PanelShell>
  );
}

function ProfilesVisual({ c }: { c: ProcessContent }) {
  return (
    <PanelShell title="Example developer profiles">
      <ul className="space-y-2.5">
        {c.profiles.map((m, i) => (
          <li
            key={m.name}
            className={`flex items-center gap-3 rounded-xl border p-2.5 ${i === 0 ? "border-blue-200 bg-blue-50/60" : "border-slate-100"}`}
          >
            <Avatar image={m.image} name={m.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{m.name}</p>
              <p className="truncate text-xs text-slate-500">{m.role}</p>
            </div>
            {i === 0 && <CircleCheck className="h-4 w-4 shrink-0 text-[#0F6FFF]" />}
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}

function InterviewVisual({ c }: { c: ProcessContent }) {
  const interviewer = c.interviewer;
  return (
    <PanelShell title="Interview call">
      <div className="grid grid-cols-2 gap-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-200">
          <Image src={interviewer.image} alt={interviewer.name} fill sizes="160px" className="object-cover object-top" />
          <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white">
            {interviewer.name}
          </span>
        </div>
        <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#081C2E] to-[#0242A2]">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">
            You
          </span>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {[Mic, Video].map((I, i) => (
          <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <I className="h-4 w-4" />
          </span>
        ))}
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
          <PhoneOff className="h-4 w-4" />
        </span>
      </div>
    </PanelShell>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- shares the visual signature
function OnboardingVisual(_: { c: ProcessContent }) {
  const items = [
    { label: "NDA signed", done: true },
    { label: "Agreement completed", done: true },
    { label: "Tools and access set up", done: true },
    { label: "Kick-off call", done: false },
  ];
  return (
    <PanelShell title="Onboarding">
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2.5 text-sm">
            {it.done ? (
              <CircleCheck className="h-4 w-4 shrink-0 text-emerald-500" />
            ) : (
              <Circle className="h-4 w-4 shrink-0 text-slate-300" />
            )}
            <span className={it.done ? "text-slate-700" : "font-medium text-slate-900"}>{it.label}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#0242A2] to-[#38BDF8]" />
      </div>
    </PanelShell>
  );
}

function ScaleVisual({ c }: { c: ProcessContent }) {
  const members = c.team;
  return (
    <PanelShell title="Your team">
      <div className="flex -space-x-3">
        {members.map((m) => (
          <Avatar key={m.name} image={m.image} name={m.name} size={48} />
        ))}
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-blue-300 bg-blue-50 text-[#0F6FFF] ring-2 ring-white">
          <Plus className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.teamRoles.map((r) => (
          <span key={r} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
            {r}
          </span>
        ))}
        <span className="rounded-md border border-dashed border-blue-300 px-2 py-1 text-xs font-medium text-[#0F6FFF]">
          + Add specialist
        </span>
      </div>
    </PanelShell>
  );
}

const VISUALS = [RequirementsVisual, ProfilesVisual, InterviewVisual, OnboardingVisual, ScaleVisual];

/* ---------- Section ---------- */

export default function HireProcess({ content, image }: { content: ProcessContent; image?: HireImage | null }) {
  const [active, setActive] = useState(0);
  const STEPS = content.steps;
  const Visual = VISUALS[active % VISUALS.length];
  const progress = (active / (STEPS.length - 1)) * 100;

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            <HighlightTitle title={content.title} />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {content.description}
          </p>
        </div>

        {/* Desktop: horizontal journey */}
        <div className="relative mt-14 hidden lg:block">
          <div aria-hidden className="absolute left-[10%] right-[10%] top-6 h-[2px] rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0242A2] to-[#38BDF8] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <ol className="relative grid grid-cols-5 gap-6">
            {STEPS.map((step, i) => {
              const Icon = getIcon(step.icon);
              const isActive = i === active;
              const isDone = i < active;
              return (
                <li key={step.title}>
                  <button
                    type="button"
                    aria-current={isActive ? "step" : undefined}
                    aria-controls="process-visual"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full flex-col items-center text-center"
                  >
                    <span
                      className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "scale-110 border-transparent bg-gradient-to-br from-[#0242A2] to-[#38BDF8] text-white shadow-[0_10px_25px_rgba(15,111,255,0.35)]"
                          : isDone
                            ? "border-[#0F6FFF] bg-white text-[#0F6FFF]"
                            : "border-slate-200 bg-white text-slate-400 group-hover:border-blue-200 group-hover:text-[#0242A2]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="mt-4 text-[11px] font-semibold tabular-nums tracking-wider text-[#0F6FFF]">
                      STEP {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-1 text-base font-semibold transition-colors ${
                        isActive ? "text-[#0242A2]" : "text-slate-900"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="mt-1.5 text-sm leading-relaxed text-slate-500">{step.description}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Supporting visual */}
        <div
          id="process-visual"
          aria-live="polite"
          className="relative mt-12 overflow-hidden rounded-[28px] lg:mt-14"
        >
          <div className="relative h-[380px] bg-gradient-to-br from-[#081C2E] via-[#0242A2] to-[#0F6FFF] sm:h-[420px] lg:h-[440px]">
            {image ? <Image src={image.src} alt="" fill sizes="100vw" className="object-cover" /> : null}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#081C2E]/85 via-[#0242A2]/55 to-[#0242A2]/20" />

            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 lg:justify-between lg:px-14">
              {/* Step caption (desktop) */}
              <div key={`caption-${active}`} className="hidden max-w-sm animate-in text-white fade-in slide-in-from-left-2 duration-300 lg:block">
                <p className="text-[11px] font-semibold tracking-wider text-[#38BDF8]">
                  STEP {String(active + 1).padStart(2, "0")} OF {String(STEPS.length).padStart(2, "0")}
                </p>
                <p className="mt-2 text-3xl font-bold leading-tight">{STEPS[active].title}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{STEPS[active].description}</p>
              </div>

              <div key={active} className="flex w-full max-w-sm animate-in justify-center fade-in zoom-in-95 duration-300 lg:justify-end">
                <Visual c={content} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/tablet: vertical timeline */}
        <ol className="relative mt-10 lg:hidden">
          <span aria-hidden className="absolute bottom-6 left-[23px] top-6 w-[2px] bg-slate-200" />
          {STEPS.map((step, i) => {
            const Icon = getIcon(step.icon);
            const isActive = i === active;
            return (
              <li key={step.title} className="relative pb-6 last:pb-0">
                <button
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  aria-controls="process-visual"
                  onClick={() => setActive(i)}
                  className="flex w-full items-start gap-4 text-left"
                >
                  <span
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-transparent bg-gradient-to-br from-[#0242A2] to-[#38BDF8] text-white shadow-[0_10px_25px_rgba(15,111,255,0.3)]"
                        : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`flex-1 rounded-2xl border p-4 transition-colors duration-300 ${
                      isActive ? "border-blue-200 bg-white shadow-[0_10px_30px_rgba(2,66,162,0.08)]" : "border-transparent"
                    }`}
                  >
                    <span className="block text-[11px] font-semibold tracking-wider text-[#0F6FFF]">
                      STEP {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`mt-0.5 block text-base font-semibold ${isActive ? "text-[#0242A2]" : "text-slate-900"}`}>
                      {step.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">{step.description}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
