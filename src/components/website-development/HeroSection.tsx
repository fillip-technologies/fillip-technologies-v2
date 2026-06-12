"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Service } from "@/data/services";

const images = [
  "/images/patna-zoo.png",
  "/images/rajgir-safari.png",
  "/images/patna-zoo.png",
];

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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#edf5ff] via-[#f8fbff] to-white pb-[420px]">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
      linear-gradient(to right, #000 1px, transparent 1px),
      linear-gradient(to bottom, #000 1px, transparent 1px)
    `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main Glow */}
      <div className="absolute left-1/2 top-1/2 h-[550px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl" />

      <div className="container relative mx-auto max-w-7xl px-6 pt-28">
        <div className="mx-auto max-w-5xl text-center mt-10">
          <h1 className="text-5xl font-bold leading-[1.1] text-[var(--heading)] md:text-5xl lg:text-6xl">
            {data.title}
            <br />

            <span className="inline-flex flex-wrap items-center justify-center gap-3">
              {data.prefixText && (
                <span>{data.prefixText}</span>
              )}

              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                {data.highlightedTitle}
              </span>

              {data.suffixText && (
                <span>{data.suffixText}</span>
              )}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            {data.description}
          </p>
        </div>
      </div>

      <div className="absolute left-1/2 top-[420px] z-0 h-[220px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute left-[12%] top-[520px] z-10 hidden xl:block">
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
                className={`absolute inset-0 object-cover transition-opacity duration-700 ease-in-out ${active === index ? "z-10 opacity-100" : "z-0 opacity-0"
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
              className={`h-2 rounded-full transition-all duration-300 ${active === index ? "w-8 bg-blue-600" : "w-2 bg-slate-300"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 h-56 bg-gradient-to-t from-white via-white/90 via-40% to-transparent" />
    </section>
  );
}
