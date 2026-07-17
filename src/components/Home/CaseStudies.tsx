"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HOME_CASE_STUDIES, HOME_CASESTUDIES_BG, type CaseStudyItem } from "@/data/home/defaults";
import { enrichCaseStudies } from "@/lib/case-studies";

// CMS-editable content (key: home.casestudies). Falls back to these defaults.
type CaseStudiesContent = Partial<{
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  description: string;
  backgroundImage: string;
  items: CaseStudyItem[];
}>;

export default function CaseStudies({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as CaseStudiesContent;
  const c = {
    eyebrow: content.eyebrow ?? "CASE STUDIES",
    headingLine1: content.headingLine1 ?? "Results",
    headingLine2: content.headingLine2 ?? "That Speak",
    headingLine3: content.headingLine3 ?? "For Themselves",
    description:
      content.description ??
      "Discover how strategy, technology, and execution helped our clients generate more leads, increase revenue, and scale faster.",
    backgroundImage: content.backgroundImage || HOME_CASESTUDIES_BG,
  };
  const caseStudies = enrichCaseStudies(content.items?.length ? content.items : HOME_CASE_STUDIES);

  const sectionRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "right" ? 440 : -440,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface py-24 lg:py-32"
    >
      {/* Background Mesh */}

      <div className="pointer-events-none absolute right-[-10%] top-1/2 hidden h-[900px] w-[900px] -translate-y-1/2 xl:block">
        <svg
          viewBox="0 0 900 900"
          className="h-full w-full text-border"
          fill="none"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <ellipse
              key={i}
              cx="450"
              cy="450"
              rx={130 + i * 16}
              ry={80 + i * 12}
              stroke="currentColor"
              strokeOpacity="0.08"
            />
          ))}
        </svg>
      </div>

      <Image
        src={c.backgroundImage}
        alt=""
        width={1536}
        height={1024}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[10%] -left-[16%] w-[clamp(380px,78vw,720px)] opacity-65"
      />

      <div className="relative z-10 mx-auto max-w-[1800px] px-6 lg:px-12 2xl:px-20">
        <div className="grid gap-16 xl:grid-cols-[460px_1fr]">
          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex h-full flex-col justify-between pb-6"
          >
            <div>
              <div className="mb-6 text-xs uppercase tracking-[0.35em] text-body">
                {c.eyebrow}
              </div>

              <h2 className="text-heading text-5xl font-medium leading-[0.92] lg:text-7xl">
                {c.headingLine1}
                <br />
                {c.headingLine2}
                <br />
                {c.headingLine3}
                <span className="ml-3 inline-block">↘</span>
              </h2>

              <p className="mt-8 max-w-md text-body leading-relaxed">
                {c.description}
              </p>
            </div>

            <div className="mt-14 flex gap-3">
              <button
                onClick={() => scroll("left")}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                onClick={() => scroll("right")}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:scale-105"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* RIGHT CAROUSEL */}

          <div
            ref={sliderRef}
            className="
              flex
              gap-8
              overflow-x-auto
              pb-6
              scrollbar-none
              snap-x
              snap-mandatory
            "
          >
            {caseStudies.map((item, index) => (
              <motion.article
                key={item.slug}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -10,
                }}
                className="
                  group
                  relative
                  h-[520px]
                  w-[420px]
                  flex-shrink-0
                  overflow-hidden
                  rounded-[40px]
                  snap-start
                "
              >
                <Link href={item.href} className="absolute inset-0 block" aria-label={`View case study: ${item.title}`}>
                  {/* Background Image */}

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="420px"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Result Badge */}

                  <div
                    className="
                      absolute
                      left-8
                      top-8
                      rounded-full
                      bg-white
                      px-5
                      py-2
                      text-sm
                      font-semibold
                      text-black
                    "
                  >
                    {item.result}
                  </div>
                  {/* Content */}

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white/70">
                      {item.industry}
                    </div>

                    <h3 className="text-4xl font-medium leading-tight">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-white/80 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        View Case Study
                      </span>

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/30
                          backdrop-blur
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                        "
                      >
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Hover Ring */}

                  <div
                    className="
                      absolute
                      inset-0
                      rounded-[40px]
                      ring-1
                      ring-transparent
                      transition-all
                      duration-500
                      group-hover:ring-white/20
                    "
                  />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
