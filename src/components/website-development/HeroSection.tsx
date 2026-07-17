"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Service } from "@/data/website-development";
import DiscussProjectButton from "@/components/shared/DiscussProjectButton";
import GetQuoteButton from "@/components/shared/GetQuoteButton";

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

  // Per-page hero image (CMS) wins; otherwise use the default preview gallery.
  const gallery = data.image?.src ? [data.image.src] : images;
  const imageAlt = data.image?.alt || "Website preview";

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % gallery.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [gallery.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#edf5ff] via-[#f8fbff] to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 py-20 lg:py-32">
      {/* Dynamic inline styles for the floating animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-0.5deg); }
        }
        .animate-float-card {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-card-reverse {
          animation: floatReverse 7s ease-in-out infinite;
        }
      `}} />

      {/* Radial Masked Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
        }}
      />

      {/* Grid Canvas Crosshair Markers */}
      <span className="absolute left-[10%] top-[15%] text-slate-350 dark:text-slate-800 text-xs font-light pointer-events-none select-none z-0">+</span>
      <span className="absolute right-[15%] top-[25%] text-slate-355 dark:text-slate-800 text-xs font-light pointer-events-none select-none z-0">+</span>
      <span className="absolute left-[20%] bottom-[20%] text-slate-355 dark:text-slate-800 text-xs font-light pointer-events-none select-none z-0">+</span>

      {/* Main Background Glows */}
      <div className="absolute left-10 top-20 h-[450px] w-[450px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute right-10 bottom-20 h-[450px] w-[450px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left z-10">
            {/* Pulsing Active Radar Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10 border border-blue-500/20 dark:border-blue-500/30 text-xs font-semibold text-[var(--primary)] dark:text-blue-400 tracking-wider uppercase w-fit mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Website Development
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15] dark:text-white">
              {data.title}
              <br />
              <span className="inline-flex flex-wrap items-center gap-3">
                {data.prefixText && <span>{data.prefixText}</span>}
                <span className="text-[var(--primary)]">
                  {data.highlightedTitle}
                </span>
                {data.suffixText && <span>{data.suffixText}</span>}
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-655 dark:text-slate-400 leading-relaxed max-w-xl">
              {data.description}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-5 items-center">
              <DiscussProjectButton />
              <GetQuoteButton />
            </div>

            {/* Tech Stack List */}
            <div className="mt-12 flex flex-col gap-3.5">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Powered by Industry Standards
              </span>
              <div className="flex flex-wrap gap-2.5 items-center">
                {["Next.js", "React", "WordPress", "Shopify", "Tailwind CSS", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-650 bg-white border border-slate-150 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-405 rounded-xl shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Device Stack with 3D Perspective */}
          <div className="lg:col-span-5 relative flex items-center justify-center [perspective:1500px] h-[450px]">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/10 dark:from-blue-500/10 dark:to-indigo-500/5 blur-3xl rounded-full scale-90 pointer-events-none" />

            {/* 1. Tablet Mockup (Back-Left Layer) */}
            <div className="absolute top-[10px] left-[-20px] w-[210px] aspect-[4/3] rounded-[20px] bg-slate-900 border-[6px] border-slate-800 shadow-2xl overflow-hidden z-0 transition-all duration-700 [transform:rotateX(6deg)_rotateY(-12deg)_rotateZ(2deg)_translateZ(-40px)] hover:[transform:rotateX(2deg)_rotateY(-4deg)_rotateZ(1deg)_translateZ(-20px)] opacity-75 hover:opacity-100 group/tablet">
              <div className="relative h-full w-full overflow-hidden bg-slate-900">
                {gallery.map((src, index) => (
                  <Image
                    key={`tab-${src}-${index}`}
                    src={src}
                    alt={imageAlt}
                    fill
                    className={`absolute inset-0 object-cover object-top transition-opacity duration-1000 ease-in-out ${active === index ? "z-10 opacity-100" : "z-0 opacity-0"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* 2. Desktop Browser Mockup (Center Layer) */}
            <div className="relative w-[90%] aspect-[16/10.5] rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-850 dark:bg-slate-950 overflow-hidden z-10 transition-all duration-700 [transform:rotateX(6deg)_rotateY(-12deg)_rotateZ(2deg)] hover:[transform:rotateX(3deg)_rotateY(-6deg)_rotateZ(1deg)] group/desktop shadow-blue-500/5">
              {/* Browser Header Bar */}
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-850 px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-450" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-405" />
                <div className="mx-auto w-[60%] h-4 rounded bg-slate-100 dark:bg-slate-955 text-[8px] text-center text-slate-404 dark:text-slate-500 flex items-center justify-center pointer-events-none border border-slate-200/40 dark:border-slate-900">
                  filliptechnologies.com
                </div>
              </div>

              {/* Mockup Slides */}
              <div className="relative h-full w-full overflow-hidden bg-slate-50 dark:bg-slate-955">
                {gallery.map((src, index) => (
                  <Image
                    key={`desk-${src}-${index}`}
                    src={src}
                    alt={imageAlt}
                    fill
                    priority={index === 0}
                    className={`absolute inset-0 object-cover object-top transition-opacity duration-1000 ease-in-out ${active === index ? "z-10 opacity-100" : "z-0 opacity-0"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* 3. Mobile Phone Mockup (Front-Right Layer) */}
            <div className="absolute bottom-[-15px] right-[-10px] w-[125px] aspect-[9/19.5] rounded-[24px] bg-slate-950 border-[5px] border-slate-800 shadow-2xl overflow-hidden z-20 transition-all duration-700 [transform:rotateX(6deg)_rotateY(-12deg)_rotateZ(2deg)_translateZ(40px)] hover:[transform:rotateX(2deg)_rotateY(-4deg)_rotateZ(1deg)_translateZ(60px)] group/phone">
              {/* Speaker / Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 rounded-full bg-slate-800 z-30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-950 mr-1" />
                <div className="w-4 h-0.5 rounded-full bg-slate-700" />
              </div>
              <div className="relative h-full w-full overflow-hidden bg-slate-900">
                {gallery.map((src, index) => (
                  <Image
                    key={`phone-${src}-${index}`}
                    src={src}
                    alt={imageAlt}
                    fill
                    className={`absolute inset-0 object-cover object-top transition-opacity duration-1000 ease-in-out ${active === index ? "z-10 opacity-100" : "z-0 opacity-0"
                      }`}
                  />
                ))}
              </div>
            </div>



            {/* Slider Dots */}
            <div className="absolute -bottom-14 flex gap-2.5 z-20">
              {gallery.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show web preview ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${active === index ? "w-8 bg-[var(--primary)]" : "w-2 bg-slate-355 dark:bg-slate-750"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fade Out Edge */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 pointer-events-none z-20" />
    </section>
  );
}
