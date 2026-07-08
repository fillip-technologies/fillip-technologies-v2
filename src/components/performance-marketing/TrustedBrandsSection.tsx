"use client";

import Image from "next/image";

const logos = [
  {
    src: "/images/NEW%20CLIENTS%20LOGO/abhayanand_logo-170x115.png",
    alt: "Abhayanand Super 30",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/Advance%20Line%20Logo%20Final.png",
    alt: "Advance Line",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/ADVANCED%20NEURO%20HOSPITAL.png",
    alt: "Advanced Neuro Hospital",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/Ahl-logo-copy-300x76.png",
    alt: "AHL",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/ARCS.png",
    alt: "ARCS",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/Domus-logo%20png.png",
    alt: "Domus",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/Diagno-lab-PNG.png",
    alt: "Diagno Lab",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/gadgethubpatna%20logo%20900.png",
    alt: "Gadget Hub Patna",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/golden%20apple%20logo.png",
    alt: "Golden Apple",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/Inception%20logo.png",
    alt: "Inception",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/Janya-Hospital-Logo-PNG%20copy.png",
    alt: "Janya Hospital",
  },
  {
    src: "/images/NEW%20CLIENTS%20LOGO/LANDMARK%20LOGO.png",
    alt: "Landmark",
  },
];

export default function TrustedBrandsSection() {
  const marqueeLogos = [...logos, ...logos, ...logos];

  return (
    <section className="relative overflow-hidden bg-transparent py-12">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--body)]">
            Trusted By Growing Brands
          </span>
        </div>
      </div>

      <div className="relative flex overflow-hidden py-2">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap [animation-duration:70s]">
          {marqueeLogos.map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex h-28 w-64 shrink-0 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/85 px-8 shadow-sm"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={220}
                height={96}
                className="max-h-20 w-auto max-w-full object-contain grayscale transition duration-300 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[var(--background)] to-transparent" />
    </section>
  );
}
