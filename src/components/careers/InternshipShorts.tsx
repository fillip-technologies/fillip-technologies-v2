"use client";

import { useState } from "react";
import { Play } from "lucide-react";

const SHORTS = [
  { id: "jA_ISoEglw0", title: "Life at Fillip Technologies" },
  { id: "m-hQupSrrZs", title: "Meet Our Interns" },
  { id: "bVse6hf6Bt4", title: "Behind the Scenes at Fillip Technologies" },
] as const;

function ShortCard({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="grid size-16 place-items-center rounded-full bg-white/95 text-primary shadow-lg transition group-hover:scale-110">
              <Play className="size-6 translate-x-0.5 fill-current" />
            </span>
          </span>
          <span className="absolute inset-x-4 bottom-4 text-left text-sm font-semibold text-white">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}

export default function InternshipShorts() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Watch &amp; Explore
          </span>
          <h2 className="mt-5 text-5xl font-bold tracking-tight text-slate-950">
            See What Our Interns Are Building
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Get a real look at internship life at Fillip Technologies &mdash; the projects, the
            team, and the culture behind our internship program in Patna.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHORTS.map((short) => (
            <ShortCard key={short.id} id={short.id} title={short.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
