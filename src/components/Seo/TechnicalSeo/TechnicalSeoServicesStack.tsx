"use client";

import type { ComponentType } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { resolveIcon } from "./icons";
import type { MarketingServicesContent } from "@/data/marketing/types";

// Card accent gradients, applied cyclically by index (not CMS-editable).
const GRADIENTS = [
  "from-blue-600 to-cyan-500",
  "from-indigo-600 to-blue-500",
  "from-sky-600 to-emerald-500",
  "from-violet-600 to-blue-500",
  "from-cyan-600 to-blue-500",
  "from-blue-700 to-indigo-500",
];

const FALLBACK: MarketingServicesContent = {
  eyebrow: "TECHNICAL SEO SERVICES",
  title: "Technical SEO Solutions",
  highlightedTitle: "For Sustainable Growth",
  description:
    "Premium technical SEO execution built for faster crawling, cleaner indexing, stronger site structure and long-term organic growth.",
  items: [
    {
      number: "01",
      title: "Technical SEO Audit",
      description: "Find crawl, indexation, performance and structure issues.",
      metric: "SEO Health",
      icon: "search",
    },
    {
      number: "02",
      title: "Core Web Vitals",
      description: "Improve speed, responsiveness and visual stability.",
      metric: "LCP • INP • CLS",
      icon: "gauge",
    },
    {
      number: "03",
      title: "Crawl & Indexation",
      description: "Help search engines crawl and index important pages.",
      metric: "Crawl Flow",
      icon: "bot",
    },
    {
      number: "04",
      title: "Schema Markup",
      description: "Add structured data for rich result eligibility.",
      metric: "JSON-LD",
      icon: "code",
    },
    {
      number: "05",
      title: "Site Architecture",
      description: "Create scalable hierarchy and internal linking.",
      metric: "URL Structure",
      icon: "network",
    },
    {
      number: "06",
      title: "SEO Migration Support",
      description: "Protect rankings during redesigns and migrations.",
      metric: "Safe Launch",
      icon: "shield",
    },
  ],
};

type ServiceItem = MarketingServicesContent["items"][number];

type TechnicalSeoServicesStackProps = {
  data?: MarketingServicesContent;
};

export default function TechnicalSeoServicesStack({
  data,
}: TechnicalSeoServicesStackProps) {
  const content = data ?? FALLBACK;
  const services = content.items;

  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: `${services.length * 78}vh` }}
    >
      <div className="sticky top-0 min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8eef7_1px,transparent_1px),linear-gradient(to_bottom,#e8eef7_1px,transparent_1px)] bg-[size:56px_56px] opacity-45" />

        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1450px] grid-cols-1 items-center gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold tracking-[0.28em] text-blue-600">
              {content.eyebrow}
            </p>

            <h2 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl xl:text-7xl">
              {content.title}
              <span className="highlight-text block">
                {content.highlightedTitle}
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              {content.description}
            </p>


          </div>

          <div className="relative h-[500px] w-full overflow-visible">
            {services.map((service, index) => {
              const IconComp = resolveIcon(service.icon);
              return (
                <ParallaxCard
                  key={service.title}
                  service={service}
                  index={index}
                  total={services.length}
                  progress={scrollYProgress}
                  IconComp={IconComp}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({
  service,
  index,
  total,
  progress,
  IconComp,
}: {
  service: ServiceItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  IconComp: ComponentType<{ className?: string }>;
}) {
  const gradient = GRADIENTS[index % GRADIENTS.length];

  const start = index / total;
  const active = start + 0.08;
  const end = (index + 1) / total;

  const y = useTransform(
    progress,
    [Math.max(0, start - 0.14), active, Math.min(1, end + 0.04)],
    [210, 0, -115]
  );

  const scale = useTransform(
    progress,
    [Math.max(0, start - 0.14), active, Math.min(1, end + 0.04)],
    [0.92, 1, 0.9]
  );

  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.14), active, Math.min(1, end + 0.04)],
    [0, 1, 0.45]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: total + index,
        willChange: "transform, opacity",
      }}
      className="absolute left-1/2 top-1/2 w-[82%] max-w-[500px] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-xl">
        <div className={`h-2.5 bg-gradient-to-r ${gradient}`} />

        <div className="relative p-6">
          <span className="pointer-events-none absolute -right-2 -top-8 text-[100px] font-bold leading-none text-blue-600/[0.07]">
            {service.number}
          </span>

          <div
            className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md`}
          >
            <IconComp className="h-5 w-5" />
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            {service.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
            {service.description}
          </p>

          <div className="mt-5 rounded-[20px] bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">
                {service.metric}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                Optimized
              </span>
            </div>

            <CardVisual gradient={gradient} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CardVisual({ gradient }: { gradient: string }) {
  return (
    <div className="space-y-3">
      {[90, 76, 84].map((value, i) => (
        <div key={i} className="h-2.5 rounded-full bg-blue-100">
          <div
            className={`h-2.5 rounded-full bg-gradient-to-r ${gradient}`}
            style={{ width: `${value}%` }}
          />
        </div>
      ))}
    </div>
  );
}
