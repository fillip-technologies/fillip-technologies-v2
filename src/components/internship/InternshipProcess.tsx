"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Blobs from "./Blobs";
import { PROCESS_STEPS } from "./constants";
import { PopIn, Reveal } from "./motion";
import SectionHeading, { Highlight } from "./SectionHeading";

const TOTAL = PROCESS_STEPS.length;

/**
 * Milestone timeline. When it scrolls into view the milestones complete one by
 * one (nodes turn into ticks, the line fills, the counter climbs), like the
 * National Internship Portal's "Milestone x of 5" tracker.
 */
export default function InternshipProcess() {
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [ticked, setTicked] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let n = 0;
    const timer = window.setInterval(() => {
      n += 1;
      setTicked(n);
      if (n >= TOTAL) window.clearInterval(timer);
    }, 420);
    return () => window.clearInterval(timer);
  }, [inView, reduceMotion]);

  const done = reduceMotion && inView ? TOTAL : ticked;
  const pct = Math.round((done / TOTAL) * 100);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/50 to-white py-20 lg:py-28">
      <Blobs />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title={
            <>
              From application to your <Highlight>first class</Highlight>
            </>
          }
          description={`${TOTAL} milestones, end to end: from registration to your learning platform login.`}
        />

        {/* Milestone counter */}
        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <div
            className="flex w-full max-w-sm items-center gap-4 rounded-full bg-white py-2 pl-2 pr-5 shadow-[0_10px_30px_-18px_rgba(2,30,80,0.35)] ring-1 ring-slate-200/70"
            role="progressbar"
            aria-label="Milestones completed"
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-valuenow={done}
          >
            <span className="intern-display grid size-9 shrink-0 place-items-center rounded-full bg-slate-950 text-sm text-white">{done}</span>
            <span className="shrink-0 text-sm font-semibold text-slate-800">
              Milestone {done} of {TOTAL}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
              <span
                className="block h-full origin-left rounded-full bg-gradient-to-r from-primary to-[#0ea5e9] transition-transform duration-500 ease-out"
                style={{ transform: `scaleX(${done / TOTAL})` }}
              />
            </span>
            <span className="w-9 shrink-0 text-right text-sm font-semibold text-slate-500">{pct}%</span>
          </div>
        </Reveal>

        <ol ref={listRef} className="relative mt-14 lg:grid lg:grid-cols-6 lg:gap-5">
          {/* Track + fill (desktop: horizontal) */}
          <span aria-hidden="true" className="absolute left-[8.33%] right-[8.33%] top-7 hidden h-1 rounded-full bg-slate-200 lg:block" />
          <span
            aria-hidden="true"
            className="absolute left-[8.33%] right-[8.33%] top-7 hidden h-1 origin-left rounded-full bg-gradient-to-r from-primary via-[#0b6ad6] to-sky-400 transition-transform duration-500 ease-out lg:block"
            style={{ transform: `scaleX(${Math.max(done - 1, 0) / (TOTAL - 1)})` }}
          />
          {/* Track + fill (mobile: vertical) */}
          <span aria-hidden="true" className="absolute bottom-10 left-7 top-7 w-1 -translate-x-1/2 rounded-full bg-slate-200 lg:hidden" />
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-7 top-7 w-1 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-[#0b6ad6] to-sky-400 transition-transform duration-500 ease-out lg:hidden"
            style={{ transform: `scaleY(${Math.max(done - 1, 0) / (TOTAL - 1)})` }}
          />

          {PROCESS_STEPS.map(({ title, description }, i) => {
            const complete = i < done;
            return (
              <PopIn
                as="li"
                key={title}
                index={i}
                className="relative flex gap-5 pb-6 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center"
              >
                <span
                  className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-full ring-[6px] ring-white transition-all duration-500 ${
                    complete
                      ? "scale-100 bg-gradient-to-br from-primary to-[#0b6ad6] text-white shadow-[0_10px_24px_rgba(2,66,162,0.30)]"
                      : "scale-95 bg-white text-slate-400 shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
                  }`}
                >
                  {complete ? (
                    <Check className="size-6" strokeWidth={3} />
                  ) : (
                    <span className="intern-display text-base">{String(i + 1).padStart(2, "0")}</span>
                  )}
                </span>
                <div className="min-w-0 flex-1 lg:mt-4 lg:w-full">
                  <p className={`text-[11px] font-bold uppercase tracking-[0.16em] transition-colors lg:mb-3 ${complete ? "text-primary" : "text-slate-400"}`}>
                    Step {i + 1}
                  </p>
                  <div className="mt-2 rounded-2xl bg-white p-5 shadow-[0_14px_34px_-22px_rgba(2,30,80,0.3)] ring-1 ring-slate-200/70 lg:mt-0 lg:min-h-[148px]">
                    <h3 className="intern-display text-[15px] text-[#0b1733]">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                </div>
              </PopIn>
            );
          })}
        </ol>

        <Reveal className="mt-12 text-center">
          <Link
            href="#apply"
            className="intern-glare inline-flex h-13 items-center gap-2 rounded-full bg-primary px-8 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_rgba(2,66,162,0.28)] transition hover:-translate-y-0.5"
          >
            Start step one: register now <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
