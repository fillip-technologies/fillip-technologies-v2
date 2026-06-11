"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const services = [
  "Digital Marketing",
  "IT Services",
  "Advertising",
  "Web Development",
  "AI Solutions",
  "Brand Growth",
];

export default function Hero2() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-card">
      {/* Background Image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/images/logo/hero-2.png"
          alt="Hero Background"
          width={1400}
          height={1400}
          priority
          className="
            w-[850px]
            md:w-[1400px]
            lg:w-[1600px]
            max-w-none
            opacity-25
            blur-[1px]
            select-none
          "
        />

        <div className="absolute inset-0 bg-card/45" />
      </div>

      {/* Mesh + Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mesh Glow 1 */}
        <div className="absolute left-[15%] top-[20%] h-[500px] w-[500px] rounded-full bg-[var(--glow-accent)] blur-[120px]" />

        {/* Mesh Glow 2 */}
        <div className="absolute right-[10%] top-[10%] h-[450px] w-[450px] rounded-full bg-[var(--glow-primary)] blur-[120px]" />

        {/* Mesh Glow 3 */}
        <div className="absolute bottom-[10%] left-[35%] h-[500px] w-[500px] rounded-full bg-[var(--glow-primary)] blur-[150px]" />

        {/* Square Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(color-mix(in srgb, var(--heading) 5%, transparent) 1px, transparent 1px),
              linear-gradient(90deg, color-mix(in srgb, var(--heading) 5%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(circle at center, var(--foreground) 60%, transparent 95%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, var(--foreground) 60%, transparent 95%)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <div className="mb-8 rounded-full border border-card/60 bg-card/70 px-5 py-2 text-sm font-medium text-body backdrop-blur-xl shadow-lg">
          Fillip Technologies • Digital Growth Partner
        </div>

        {/* Heading */}
        <h1 className="max-w-6xl text-5xl font-medium leading-[0.95] tracking-[-0.07em] text-heading md:text-7xl lg:text-[7rem]">
          Building Digital
          <br />
          Experiences Through
          <br />

          <span
            key={services[index]}
            className="block bg-[image:var(--gradient-text)] bg-clip-text text-transparent transition-all duration-500"
          >
            {services[index]}
          </span>
        </h1>

        {/* Gradient Line */}
        <div className="mt-5 h-[4px] w-44 rounded-full bg-[image:var(--gradient-primary)]" />

        {/* Description */}
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-body md:text-xl">
          We craft high-performing digital experiences through
          marketing, technology, advertising and AI solutions
          that help ambitious brands grow faster.
        </p>

        {/* Trusted Brands */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground md:text-base">
          <span>Google</span>
          <span>Microsoft</span>
          <span>Amazon</span>
          <span>Meta</span>
          <span>OpenAI</span>
          <span>Vercel</span>
        </div>
      </div>
    </section>
  )
}
