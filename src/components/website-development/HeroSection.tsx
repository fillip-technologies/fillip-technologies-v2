"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import type { Service } from "@/data/services";
=======
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)

const images = [
  "/images/patna-zoo.png",
  "/images/rajgir-safari.png",
  "/images/patna-zoo.png",
];

<<<<<<< HEAD
type HeroSectionProps = {
  data?: Service["hero"];
};

const defaultData: Service["hero"] = {
  title: "Build Faster Websites",
  highlightedTitle: "Grow Smarter Businesses",
  description:
    "Custom website design and development services that help businesses attract, engage and convert more customers online.",
};

export default function HeroSection({ data = defaultData }: HeroSectionProps) {
=======
export default function HeroSection() {
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#edf5ff] via-[#f8fbff] to-white pb-[420px]">
      <div className="absolute left-[-150px] top-0 h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-[140px]" />

      <div className="absolute right-[-150px] top-0 h-[500px] w-[500px] rounded-full bg-violet-300/20 blur-[140px]" />

      <div className="absolute left-1/2 top-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-200/20 blur-[120px]" />

      <Image
        src="/images/cloud.png"
        alt=""
        width={350}
        height={180}
        className="absolute right-0 top-40 opacity-60"
      />

      <div className="container relative mx-auto max-w-7xl px-6 pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-[var(--heading)] md:text-5xl">
<<<<<<< HEAD
            {data.title}
            <br />
            <span className="text-[var(--primary)]">
              {data.highlightedTitle}
=======
            Build Faster Websites
            <br />
            <span className="text-[var(--primary)]">
              Grow Smarter Businesses
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
<<<<<<< HEAD
            {data.description}
=======
            Custom website design and development services that help businesses
            attract, engage and convert more customers online.
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
          </p>
        </div>
      </div>

      <div className="absolute left-1/2 top-[420px] z-0 h-[220px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute left-[12%] top-[430px] z-10 hidden xl:block">
        <Image
          src={images[(active + 1) % images.length]}
          alt=""
          width={220}
          height={140}
          className="-rotate-[8deg] rounded-[24px] shadow-xl"
        />
      </div>

      <div className="absolute left-1/2 top-[310px] z-20 w-[90%] max-w-5xl -translate-x-1/2">
        <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_50px_120px_rgba(15,23,42,0.15)]">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-6 py-3">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          <div className="relative aspect-[16/9] overflow-hidden">
            {images.map((src, index) => (
              <Image
                key={`${src}-${index}`}
                src={src}
                alt=""
                fill
                priority={index === 0}
                className={`absolute inset-0 object-cover transition-opacity duration-700 ease-in-out ${
                  active === index ? "z-10 opacity-100" : "z-0 opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show website preview ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === index ? "w-8 bg-blue-600" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 h-56 bg-gradient-to-t from-white via-white/90 via-40% to-transparent" />
    </section>
  );
}
