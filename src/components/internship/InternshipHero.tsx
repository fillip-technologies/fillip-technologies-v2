import Link from "next/link";
import {
  ArrowDown,
  Award,
  CalendarCheck,
  ChevronRight,
  CircleCheck,
  IndianRupee,
  Laptop,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { ENGINEERS_CLINIC, KEY_FACTS, TRACKS, TRUST_STATS } from "./constants";
import HeroApplyForm from "./HeroApplyForm";

const FACT_ICONS: Record<(typeof KEY_FACTS)[number]["label"], LucideIcon> = {
  Tracks: Layers,
  Mode: Laptop,
  Certificates: Award,
  Attendance: CalendarCheck,
  Registration: IndianRupee,
};

export default function InternshipHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-[#f5f9ff] to-white pb-14 pt-32 lg:pb-20 lg:pt-44">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#0242a2 1px,transparent 1px),linear-gradient(to bottom,#0242a2 1px,transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />
      <div aria-hidden="true" className="absolute -top-24 left-1/3 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-primary/15 blur-[150px]" />
      <div aria-hidden="true" className="absolute right-0 top-40 h-[360px] w-[420px] rounded-full bg-sky-300/25 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="transition hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-slate-700">
              Internship Programme
            </li>
          </ol>
        </nav>

        {/*
          Mobile order: intro → form → highlights.
          Desktop: intro + highlights on the left, form on the right spanning both rows.
        */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
          {/* Intro */}
          <div className="lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Admissions open · New batch
            </span>

            <h1 className="mt-6">
              <span className="block text-xl font-semibold tracking-tight text-slate-600 sm:text-2xl">
                Fillip Technologies Internship Programme
              </span>
              <span className="mt-3 block text-[3.25rem] font-bold leading-[1] tracking-[-0.045em] text-slate-950 sm:text-7xl xl:text-[5.25rem]">
                Learn. Build.{" "}
                <span className="bg-gradient-to-r from-primary to-[#0ea5e9] bg-clip-text pr-1 text-transparent">Grow.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              A guided, hands-on internship for college students, online or in our Patna classroom.
            </p>
          </div>

          {/* Form */}
          <div id="hero-apply" className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <HeroApplyForm />
          </div>

          {/* Highlights */}
          <div className="lg:col-start-1 lg:row-start-2">
            <ul className="space-y-3.5">
              <li className="flex gap-3 leading-7 text-slate-700">
                <CircleCheck className="mt-1 size-5 shrink-0 text-emerald-500" />
                <span>
                  <strong className="text-slate-900">{TRACKS.length} tracks:</strong> {TRACKS.map((t) => t.name).join(", ")}
                </span>
              </li>
              <li className="flex gap-3 leading-7 text-slate-700">
                <CircleCheck className="mt-1 size-5 shrink-0 text-emerald-500" />
                <span>
                  <strong className="text-slate-900">Training + Internship certificates</strong> from Fillip Technologies Pvt. Ltd.
                </span>
              </li>
              <li className="flex gap-3 leading-7 text-slate-700">
                <CircleCheck className="mt-1 size-5 shrink-0 text-emerald-500" />
                <span>
                  Learn on <strong className="text-slate-900">{ENGINEERS_CLINIC.name}</strong> with guidance from mentors
                </span>
              </li>
            </ul>

            <Link
              href="#tracks"
              className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-primary underline-offset-4 hover:underline"
            >
              Explore all tracks <ArrowDown className="size-4" />
            </Link>

            <ul className="mt-9 grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-6 sm:flex sm:flex-wrap sm:gap-x-10">
              {TRUST_STATS.map(({ value, label }) => (
                <li key={label}>
                  <p className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">{value}</p>
                  <p className="text-sm text-slate-500">{label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key facts */}
        <dl className="mt-14 grid grid-cols-2 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] lg:mt-16 lg:grid-cols-5">
          {KEY_FACTS.map(({ label, value }, i) => {
            const Icon = FACT_ICONS[label];
            return (
              <div
                key={label}
                className={`flex flex-col items-start gap-3 border-b border-slate-100 p-5 last:border-b-0 sm:flex-row sm:items-center sm:gap-3.5 lg:border-b-0 lg:p-6 ${
                  i > 0 ? "lg:border-l" : ""
                } ${i % 2 === 1 ? "border-l" : ""} ${i === KEY_FACTS.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/8 text-primary">
                  <Icon className="size-[18px]" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-900">{value}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
