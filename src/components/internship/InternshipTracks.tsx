"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { PREFILL_EVENT, TRACKS, type PrefillDetail } from "./constants";
import { PopIn, Reveal } from "./motion";
import SectionHeading, { Highlight } from "./SectionHeading";
import { TRACK_ICONS } from "./trackIcons";

/**
 * Tracks as photo cards (like the National Internship Portal's stream cards).
 * The cards act as tabs; the selected track's details show in the panel below.
 */
export default function InternshipTracks() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const track = TRACKS[active];
  const ActiveIcon = TRACK_ICONS[track.icon];

  // Roving focus between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (active + 1) % TRACKS.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (active - 1 + TRACKS.length) % TRACKS.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? TRACKS.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const applyForTrack = () => {
    const detail: PrefillDetail = { domain: track.title };
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
  };

  return (
    <section id="tracks" className="scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title={
            <>
              Internships for <Highlight>every track</Highlight> you choose
            </>
          }
          description={`${TRACKS.length} tracks, one goal: practical skills you can show. Pick the one that matches your interest.`}
        />

        {/* Photo cards (tabs) */}
        <div role="tablist" aria-label="Internship tracks" className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {TRACKS.map((t, i) => {
            const selected = i === active;
            return (
              <PopIn key={t.id} index={i} className="min-w-0">
                <button
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`track-tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`track-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                  className={`group relative block h-56 w-full overflow-hidden rounded-[24px] text-left transition duration-300 focus-visible:outline-none sm:h-72 sm:rounded-[28px] lg:h-80 ${
                    selected
                      ? "shadow-[0_24px_50px_rgba(2,66,162,0.30)] ring-4 ring-primary ring-offset-4 ring-offset-white"
                      : "shadow-[0_14px_34px_rgba(15,23,42,0.12)] hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-primary/40"
                  }`}
                >
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/5" />

                  <span aria-hidden="true" className="intern-display absolute left-4 top-3 text-3xl text-white/40 sm:left-6 sm:top-5 sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {selected ? (
                    <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-primary text-white shadow-lg sm:right-4 sm:top-4">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                  ) : null}

                  <span className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                    <span className="inline-flex max-w-full rounded-full bg-primary px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.12em] text-white sm:text-[10.5px]">
                      <span className="truncate">{t.tags}</span>
                    </span>
                    <span className="intern-display mt-2.5 block text-[1.2rem] leading-[1.1] text-white sm:text-[1.6rem]">
                      {t.name}
                    </span>
                    <span className="mt-2.5 hidden items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 sm:inline-flex">
                      {selected ? "Viewing track" : "Explore track"} <ArrowUpRight className="size-3.5" />
                    </span>
                  </span>
                </button>
              </PopIn>
            );
          })}
        </div>

        {/* Details panel (re-animates when the track changes) */}
        <Reveal key={track.id} y={24} className="mt-8">
          <div
            id={`track-panel-${track.id}`}
            role="tabpanel"
            aria-labelledby={`track-tab-${track.id}`}
            tabIndex={0}
            className="rounded-[28px] bg-white p-7 shadow-[0_24px_60px_-28px_rgba(2,30,80,0.3)] ring-1 ring-slate-200/70 outline-none focus-visible:ring-4 focus-visible:ring-primary/15 sm:p-9 lg:p-10"
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="flex items-start gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[#0b6ad6] text-white shadow-[0_12px_26px_rgba(2,66,162,0.28)]">
                    <ActiveIcon className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="intern-display text-[1.5rem] leading-tight text-[#0b1733] lg:text-[1.75rem]">{track.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{track.overview}</p>
                  </div>
                </div>

                <h4 className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">What you&apos;ll learn</h4>
                <ul className="mt-4 grid gap-3.5 sm:grid-cols-2">
                  {track.learn.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-6 text-slate-700">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Tools you&apos;ll use</h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {track.tools.map((tool) => (
                      <li key={tool} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-primary/[0.05] p-4 ring-1 ring-primary/10">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    <Sparkles className="size-3.5" /> Ideal for
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{track.idealFor}</p>
                </div>
                <div className="flex flex-col gap-3 border-t border-slate-200/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">Online and classroom batches.</p>
                  <a
                    href="#apply"
                    onClick={applyForTrack}
                    className="intern-glare inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5"
                  >
                    Apply for {track.name} <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
