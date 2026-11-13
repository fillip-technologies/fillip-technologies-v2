"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { PREFILL_EVENT, TRACKS, type PrefillDetail } from "./constants";
import { TRACK_ICONS } from "./trackIcons";

export default function InternshipTracks() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const track = TRACKS[active];
  const ActiveIcon = TRACK_ICONS[track.icon];

  // Roving focus between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = TRACKS.length - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? (active + 1) % TRACKS.length
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? (active - 1 + TRACKS.length) % TRACKS.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Internship tracks</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 lg:text-5xl">Choose your track</h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-slate-600">
            {TRACKS.length} tracks, one goal: practical skills you can show. Pick the one that matches your interest.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-8">
          {/* Tab list */}
          <div
            role="tablist"
            aria-label="Internship tracks"
            aria-orientation="vertical"
            className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-5 pt-1 [scrollbar-width:none] lg:mx-0 lg:pt-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {TRACKS.map((t, i) => {
              const Icon = TRACK_ICONS[t.icon];
              const selected = i === active;
              return (
                <button
                  key={t.id}
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
                  className={`group flex min-w-[240px] shrink-0 items-center gap-4 rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 lg:min-w-0 ${
                    selected
                      ? "border-primary/30 bg-white shadow-[0_14px_34px_rgba(2,66,162,0.12)]"
                      : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-xl transition ${
                      selected ? "bg-primary text-white" : "bg-white text-primary ring-1 ring-slate-200"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block font-semibold leading-snug ${selected ? "text-slate-950" : "text-slate-700"}`}>
                      {t.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-slate-500">{t.short}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            key={track.id}
            id={`track-panel-${track.id}`}
            role="tabpanel"
            aria-labelledby={`track-tab-${track.id}`}
            tabIndex={0}
            className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.06)] outline-none focus-visible:ring-4 focus-visible:ring-primary/15 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 sm:p-9 lg:p-10"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[#0b6ad6] text-white shadow-[0_12px_26px_rgba(2,66,162,0.28)]">
                <ActiveIcon className="size-6" />
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">{track.title}</h3>
                <p className="mt-3 max-w-2xl leading-7 text-slate-600">{track.overview}</p>
              </div>
            </div>

            <div className="mt-9 grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">What you&apos;ll learn</h4>
                <ul className="mt-4 space-y-3.5">
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
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Tools you&apos;ll use</h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {track.tools.map((tool) => (
                      <li key={tool} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-primary/[0.05] p-4 ring-1 ring-primary/10">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <Sparkles className="size-3.5" /> Ideal for
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{track.idealFor}</p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-4 border-t border-slate-100 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">Available in online and classroom batches.</p>
              <a
                href="#apply"
                onClick={applyForTrack}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5"
              >
                Apply for {track.name} <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
