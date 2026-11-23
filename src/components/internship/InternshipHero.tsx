import Image from "next/image";
import Link from "next/link";
import {
  Award,
  CalendarCheck,
  ChevronRight,
  IndianRupee,
  Laptop,
  Layers,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";
import Blobs from "./Blobs";
import { INTERN_AVATARS, KEY_FACTS, TRACKS, TRUST_STATS } from "./constants";
import HeroApplyForm from "./HeroApplyForm";
import { DrawUnderline, Reveal } from "./motion";
import { TRACK_ICONS } from "./trackIcons";

const FACT_ICONS: Record<(typeof KEY_FACTS)[number]["label"], LucideIcon> = {
  Tracks: Layers,
  Mode: Laptop,
  Certificates: Award,
  Attendance: CalendarCheck,
  Registration: IndianRupee,
};

export default function InternshipHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef5ff] via-[#f7faff] to-white pb-14 pt-32 lg:pb-20 lg:pt-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.6] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
        style={{ backgroundImage: "radial-gradient(rgba(2,66,162,0.10) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
      />
      <Blobs variant="hero" />

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

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Intro */}
          <Reveal onMount>
            <h1 className="intern-display text-[3rem] leading-[1.04] text-[#0b1733] sm:text-6xl lg:text-[4.1rem]">
              {/* Page name for search engines and screen readers (no visible eyebrow). */}
              <span className="sr-only">Fillip Technologies Internship Programme: </span>
              Learn. Build.{" "}
              <span className="relative inline-block">
                <span className="intern-aurora">Grow.</span>
                <DrawUnderline className="absolute -bottom-1.5 left-0 h-3 w-full sm:-bottom-2 sm:h-4" />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-8 text-slate-600">
              A guided, hands-on internship for college students, online or in our Patna classroom. Earn a Training
              Certificate and an Internship Certificate from Fillip Technologies Pvt. Ltd.
            </p>

            {/* Track chips */}
            <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${TRACKS.length} internship tracks`}>
              {TRACKS.map((t) => {
                const Icon = TRACK_ICONS[t.icon];
                return (
                  <li key={t.id}>
                    <Link
                      href="#tracks"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-[0_2px_10px_rgba(15,23,42,0.06)] ring-1 ring-slate-200 transition hover:text-primary hover:ring-primary/30"
                    >
                      <Icon className="size-4 text-primary" />
                      {t.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Interns */}
            <Link href="#intern-stories" className="group mt-8 inline-flex items-center gap-3.5">
              <span className="flex -space-x-3">
                {INTERN_AVATARS.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 rounded-full bg-slate-200 object-cover shadow-sm ring-[3px] ring-white"
                  />
                ))}
              </span>
              <span className="text-sm leading-5">
                <span className="flex items-center gap-1.5 whitespace-nowrap font-semibold text-slate-900 transition group-hover:text-primary">
                  <PlayCircle className="size-4 text-primary" /> Hear from our interns
                </span>
                <span className="text-slate-500">Watch their stories</span>
              </span>
            </Link>

            {/* Stats */}
            <ul className="mt-8 flex max-w-xl divide-x divide-slate-200 border-t border-slate-200/80 pt-6">
              {TRUST_STATS.map(({ value, label }) => (
                <li key={label} className="flex-1 px-5 first:pl-0">
                  <p className="intern-display whitespace-nowrap text-[1.35rem] leading-tight text-[#0b1733] sm:text-[1.55rem]">{value}</p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:text-sm">{label}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Form */}
          <div id="hero-apply">
            <Reveal onMount delay={0.12} y={30}>
              <HeroApplyForm />
            </Reveal>
          </div>
        </div>

        {/* Key facts */}
        <Reveal className="mt-16 lg:mt-20">
          <dl className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-20px_rgba(2,30,80,0.18)] ring-1 ring-slate-200/70 lg:grid-cols-5">
            {KEY_FACTS.map(({ label, value }, i) => {
              const Icon = FACT_ICONS[label];
              return (
                <div
                  key={label}
                  className={`flex items-center gap-3.5 border-b border-slate-100 p-5 last:border-b-0 lg:border-b-0 lg:p-6 ${
                    i > 0 ? "lg:border-l" : ""
                  } ${i % 2 === 1 ? "border-l" : ""} ${i === KEY_FACTS.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/[0.07] text-primary">
                    <Icon className="size-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs font-medium text-slate-500">{label}</dt>
                    <dd className="text-sm font-semibold text-slate-900">{value}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
