"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
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

// Full-bleed auto-scrolling carousel of client logos. All logos render together
// in one row.
function ClientLogosCarousel({ logos }: { logos: Logo[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 2200);
    return () => clearInterval(id);
  }, [emblaApi]);

  if (logos.length === 0) return null;

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {logos.map((logo, index) => (
            <div
              key={logo.src + index}
              className="flex h-32 flex-none basis-1/3 items-center justify-center px-2 sm:basis-1/4 md:basis-1/6 lg:basis-[12.5%]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={80}
                className="h-16 w-32 object-contain opacity-90"
              />
            </div>
          ))}
        </div>
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
            <span>{c.stat1}</span>
            <span>•</span>
            <span>{c.stat2}</span>
            <span>•</span>
            <span>{c.stat3}</span>
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
