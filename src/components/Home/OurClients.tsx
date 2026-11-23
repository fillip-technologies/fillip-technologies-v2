"use client";

import Image from "next/image";
import HomeSectionTitle from "./HomeSectionTitle";
import { HOME_CLIENT_LOGOS, type ClientLogoItem } from "@/data/home/defaults";

type Logo = { src: string; alt: string };

type ClientsContent = Partial<{
  eyebrow: string;
  heading: string;
  stat1: string;
  stat2: string;
  stat3: string;
  logos: ClientLogoItem[];
}>;

/** Seconds each logo takes to scroll past; the total duration scales with the number of logos. */
const SECONDS_PER_LOGO = 2.2;
/** Each half of the track needs at least this many slots (12 × 176px > a 1920px screen) so no gap shows. */
const MIN_SLOTS_PER_HALF = 12;

// Full-bleed logo marquee that scrolls continuously and smoothly. The list is
// rendered twice and the track moves by exactly half its width (keyframes
// `marquee-2x`), so the loop restarts on an identical frame with no jump.
// Every logo slot has the same fixed width, which keeps both halves equal.
function ClientLogosCarousel({ logos }: { logos: Logo[] }) {
  if (logos.length === 0) return null;

  // With only a few logos, repeat the list so one half is wider than the screen.
  const repeats = Math.ceil(MIN_SLOTS_PER_HALF / logos.length);
  const half = Array.from({ length: repeats }, () => logos).flat();
  const duration = Math.max(30, half.length * SECONDS_PER_LOGO);

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="hover-pause flex w-max motion-safe:animate-[marquee-2x_60s_linear_infinite]"
        style={{ animationDuration: `${duration}s` }}
      >
        {[...half, ...half].map((logo, index) => {
          // Only the first copy of each logo is announced to screen readers.
          const isCopy = index >= logos.length;
          return (
            <div
              key={`${logo.src}-${index}`}
              aria-hidden={isCopy || undefined}
              className="flex h-32 w-[132px] shrink-0 items-center justify-center px-3 transition-transform duration-300 hover:scale-110 sm:w-[176px] sm:px-5"
            >
              <Image
                src={logo.src}
                alt={isCopy ? "" : logo.alt}
                width={160}
                height={80}
                className="h-16 w-32 object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 hover:drop-shadow-lg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OurClients({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as ClientsContent;
  const c = {
    eyebrow: content.eyebrow ?? "TRUSTED BY ORGANIZATIONS",
    heading: content.heading ?? "Organizations That Trust Fillip",
    stat1: content.stat1 ?? "13+ Years Experience",
    stat2: content.stat2 ?? "1000+ Projects Delivered",
    stat3: content.stat3 ?? "20+ Industries Served",
  };

  // CMS-managed logos (Content → Home Page → Our Clients); falls back to the
  // shared defaults if the saved list is somehow missing.
  const logos: Logo[] = (content.logos ?? HOME_CLIENT_LOGOS)
    .filter((l) => l.image)
    .map((l) => ({ src: l.image, alt: l.alt }));

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute inset-0 bg-white/75" />

        <div
          className="
            absolute
            left-1/2
            top-[ -250px]
            h-[700px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-violet-100/40
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[80px]
            h-[350px]
            w-[350px]
            -translate-x-1/2
            rounded-full
            bg-pink-100/40
            blur-[100px]
          "
        />

        <div className="absolute inset-0 flex justify-center gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="
                h-full
                w-[100px]
                border-x
                border-slate-200/40
              "
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1700px]">
        {/* Heading */}

        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">
            {c.eyebrow}
          </p>

          <HomeSectionTitle text={c.heading} className="text-center" />

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-body md:gap-8">
            <span className="transition-transform duration-300 hover:scale-110 cursor-default">{c.stat1}</span>
            <span>•</span>
            <span className="transition-transform duration-300 hover:scale-110 cursor-default">{c.stat2}</span>
            <span>•</span>
            <span className="transition-transform duration-300 hover:scale-110 cursor-default">{c.stat3}</span>
          </div>
        </div>

        {/* Logos carousel (full-width) */}
        <div className="mt-14">
          <ClientLogosCarousel logos={logos} />
        </div>
      </div>
    </section>
  );
}
