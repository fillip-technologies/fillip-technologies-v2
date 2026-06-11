"use client";

import Image from "next/image";

const row1 = [
  "/images/clients/Abhyanand-Super-30-Logo-21-June-2022-Final-2022-300x182-1.png",
  "/images/clients/Domus-BHDGAjch-768x139.png",
  "/images/clients/logo.png",
  "/images/clients/logo_proptru1.png",
  "/images/clients/logo-2-768x311.png",
  "/images/clients/logo-Copy.png",
];

const row2 = [
  "/images/clients/logo-green-new.png",
  "/images/clients/LVS_logo-768x754.png",
  "/images/clients/Patna-Park-768x212.png",
  "/images/clients/rajgir-zoo-safari-768x225.png",
  "/images/clients/THAKUR-GANJ-NAGAR-PANCHAYAT.png",
  "/images/clients/vanu-van-768x148.png",
];

function LogoRow({
  logos,
  reverse = false,
}: {
  logos: string[];
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max items-center gap-20 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex h-16 shrink-0 items-center justify-center"
          >
            <Image
              src={logo}
              alt=""
              width={200}
              height={80}
              className="
                h-12
                w-auto
                object-contain
                opacity-70
                grayscale
                transition-all
                duration-500
                hover:opacity-100
                hover:grayscale-0
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

type ClientsContent = Partial<{
  eyebrow: string;
  heading: string;
  stat1: string;
  stat2: string;
  stat3: string;
}>;

export default function OurClients({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as ClientsContent;
  const c = {
    eyebrow: content.eyebrow ?? "TRUSTED BY ORGANIZATIONS",
    heading: content.heading ?? "Organizations That Trust Fillip",
    stat1: content.stat1 ?? "13+ Years Experience",
    stat2: content.stat2 ?? "1000+ Projects Delivered",
    stat3: content.stat3 ?? "20+ Industries Served",
  };

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="
            absolute
            left-1/2
            top-[-250px]
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

          <h2 className="text-heading text-3xl font-semibold text-center">
            {c.heading}
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-body md:gap-8">
            <span>{c.stat1}</span>
            <span>•</span>
            <span>{c.stat2}</span>
            <span>•</span>
            <span>{c.stat3}</span>
          </div>
        </div>

        {/* Logos */}

        <div className="mt-14 space-y-8">
          <LogoRow logos={row1} />
          <LogoRow logos={row2} reverse />
        </div>
      </div>
    </section>
  );
}
