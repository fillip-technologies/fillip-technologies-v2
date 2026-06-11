"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const items = [
  {
    title: "Healthcare Transformation",
    description:
      "Modern patient platforms, hospital automation, and AI-powered healthcare operations.",
    stat: "50+",
    label: "Healthcare Solutions",
    color: "from-emerald-200 to-emerald-100",
    image: "/images/impact.jpg",
    overlay: "bg-emerald-100/70",
  },
  {
    title: "Financial Innovation",
    description:
      "Enterprise banking, fintech products, secure digital transactions and automation.",
    stat: "60+",
    label: "Financial Platforms",
    color: "from-blue-200 to-blue-100",
    image: "/images/finance.jpg",
    overlay: "bg-blue-100/70",
  },
  {
    title: "Retail Experience",
    description:
      "Omnichannel commerce, customer intelligence and scalable digital experiences.",
    stat: "40+",
    label: "Retail Solutions",
    color: "from-orange-200 to-orange-100",
    image: "/images/retail.jpg",
    overlay: "bg-orange-100/70",
  },
  {
    title: "Education Systems",
    description:
      "Learning platforms, student portals and large-scale education transformation.",
    stat: "50+",
    label: "Education Platforms",
    color: "from-cyan-200 to-cyan-100",
    image: "/images/education.jpg",
    overlay: "bg-cyan-100/70",
  },
];

export default function IndustriesImpactSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-22 bg-[#fafafa]">
      {/* Premium Background */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
        linear-gradient(to right, #0f172a 1px, transparent 1px),
        linear-gradient(to bottom, #0f172a 1px, transparent 1px)
      `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Main Glow */}

        <div
          className="
      absolute
      left-1/2
      top-[10%]
      h-[700px]
      w-[700px]
      -translate-x-1/2
      rounded-full
      bg-gradient-to-r
      from-indigo-200/30
      to-cyan-200/30
      blur-[120px]
    "
        />

        {/* Left Glow */}

        <div
          className="
      absolute
      left-[-100px]
      top-1/3
      h-[400px]
      w-[400px]
      rounded-full
      bg-indigo-100/30
      blur-[100px]
    "
        />

        {/* Right Glow */}

        <div
          className="
      absolute
      right-[-100px]
      bottom-0
      h-[400px]
      w-[400px]
      rounded-full
      bg-cyan-100/30
      blur-[100px]
    "
        />
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        {/* Header */}

        <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="max-w-[700px] text-[28px] font-medium leading-[1.05] tracking-[-0.03em] text-heading md:text-[42px] lg:text-[48px]">
            <span className="text-slate-900">
              Proven Impact
            </span>

            <br />

            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Across Industries.
            </span>
          </h2>

          <button className="group flex h-16 items-center overflow-hidden rounded-full border border-indigo-100 bg-white">
            <span className="px-8 text-sm font-medium text-slate-900">
              Get Started
            </span>

            <span className="flex h-16 w-16 items-center justify-center bg-gradient-to-r from-indigo-500 to-cyan-500 text-white transition-all duration-300 group-hover:w-20">
              <ArrowUpRight size={18} />
            </span>
          </button>
        </div>

        {/* Main Layout */}

        <div className="grid gap-12 lg:grid-cols-[380px_1fr_260px]">
          {/* LEFT STACKED CARD */}

          <div className="relative h-[420px]">
            <div className="absolute left-8 top-8 h-[320px] w-[320px] rounded-[20px] bg-slate-200/40" />

            <div className="absolute left-4 top-4 h-[340px] w-[340px] rounded-[20px] bg-slate-200/60" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: -5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.5,
                }}
                className={`absolute inset-0 overflow-hidden rounded-[24px] bg-gradient-to-br ${items[active].color} p-8`}
              >
                <Image
                  src={items[active].image}
                  alt=""
                  fill
                  sizes="340px"
                  className="object-cover"
                />
                <div className={`absolute inset-0 ${items[active].overlay}`} />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="text-6xl font-bold text-slate-900">
                      {items[active].stat}
                    </div>

                    <div className="mt-3 text-lg text-slate-700">
                      {items[active].label}
                    </div>
                  </div>

                  <div className="text-sm uppercase tracking-[0.25em] text-slate-600">
                    Impact Across Industries
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CENTER CONTENT */}

          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="max-w-[500px] text-5xl font-medium leading-tight text-slate-900">
                  {items[active].title}
                </h3>

                <p className="mt-8 max-w-[520px] text-lg leading-relaxed text-slate-600">
                  {items[active].description}
                </p>

                <button className="mt-10 flex items-center gap-3 font-medium text-violet-600">
                  Explore More
                  <ArrowUpRight size={16} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SIDE CONTENT */}

          <div className="flex flex-col justify-center">
            <Image
              src="/images/fillip-icon.png"
              alt="Fillip Technologies"
              width={32}
              height={32}
              className="h-16 w-12 object-contain"
            />

            <p className="text-lg leading-relaxed text-slate-600">
              We build scalable AI, cloud, automation and enterprise
              technology solutions that help organizations grow faster.
            </p>
          </div>
        </div>

        {/* Stats */}

        <div className="mt-24 grid gap-10 border-t border-slate-200 pt-12 lg:grid-cols-5">
          <div>
            <div className="text-5xl font-semibold text-slate-900">
              320M<span className="text-violet-500">+</span>
            </div>

            <div className="mt-3 text-slate-500">
              Business Users
            </div>
          </div>

          <div>
            <div className="text-5xl font-semibold text-slate-900">
              590K<span className="text-violet-500">+</span>
            </div>

            <div className="mt-3 text-slate-500">
              Happy Clients
            </div>
          </div>

          <div>
            <div className="text-5xl font-semibold text-slate-900">
              $438B<span className="text-violet-500">+</span>
            </div>

            <div className="mt-3 text-slate-500">
              Revenue Impact
            </div>
          </div>

          {/* Bottom Cards */}

          <div className="rounded-[20px] bg-slate-200 p-6">
            <div className="h-24 rounded-xl bg-slate-300" />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Technology
              </span>

              <ArrowUpRight size={14} />
            </div>
          </div>

          <div className="rounded-[20px] bg-slate-200 p-6">
            <div className="h-24 rounded-xl bg-slate-300" />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Artificial Intelligence
              </span>

              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
