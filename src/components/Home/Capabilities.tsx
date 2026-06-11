"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const capabilities = [
  {
    category: "APPLICATION ENGINEERING",
    title: "Application Engineering",
    image: "/images/SERVICES/APPLICATION.jpg",
    description:
      "Custom Website Development, E-Commerce Development, WordPress Development, and Enterprise Software Solutions built for scale.",
  },
  {
    category: "MOBILE APPLICATIONS",
    title: "Mobile App Development",
    image: "/images/SERVICES/MOBILE.jpg",
    description:
      "Enterprise Mobile Applications, E-Commerce Mobile Solutions, On-Demand Platforms, and Business Process Automation Apps.",
  },
  {
    category: "SEARCH ENGINEERING",
    title: "Search Visibility Engineering",
    image: "/images/SERVICES/SEO.jpg",
    description:
      "Local SEO, On-Page SEO, Off-Page SEO, Technical SEO, and CMS Optimization to improve search performance.",
  },
  {
    category: "DIGITAL MARKETING",
    title: "Digital Growth Marketing",
    image: "/images/SERVICES/SOCIAL.jpg",
    description:
      "Facebook Marketing, Instagram Marketing, YouTube Marketing, LinkedIn Marketing, and growth-focused campaigns.",
  },
  {
    category: "PERFORMANCE MEDIA",
    title: "Performance Marketing",
    image: "/images/SERVICES/ADS.jpg",
    description:
      "Facebook & Instagram Ads, Google Ads, YouTube Advertising, and conversion-focused paid acquisition strategies.",
  },
  {
    category: "CREATIVE DESIGN",
    title: "Creative Experience Design",
    image: "/images/SERVICES/APPLICATION.jpg",
    description:
      "Graphic Design, Logo Design, UI/UX Design, Video Editing, and brand experiences that drive engagement.",
  },
 
];

export default function CapabilitiesSection() {
  const sectionRef = useRef(null);

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

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
          {Array.from({ length: 22 }).map((_, i) => (
            <ellipse
              key={i}
              cx="450"
              cy="450"
              rx={140 + i * 16}
              ry={80 + i * 12}
              stroke="currentColor"
              strokeOpacity="0.08"
            />
          ))}
        </svg>
      </div>

      <Image
        src="/images/capabilities-background.png"
        alt=""
        width={1536}
        height={1024}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[10%] -left-[16%] w-[clamp(380px,78vw,720px)] opacity-85"
      />

    

      <div className="relative z-10 mx-auto max-w-[1800px] px-6 lg:px-12 2xl:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 text-xs uppercase tracking-[0.35em] text-body">
              WHAT WE DO
            </div>

            <h2 className="text-[28px] font-medium leading-[1.05] tracking-[-0.03em] text-heading md:text-[42px] lg:text-[48px]">
              End-to-End Digital Services
              <br />
              for Modern Organizations
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-body md:text-lg">
              From software engineering and mobile applications to marketing,
              design, automation, and growth solutions, we help organizations
              build stronger digital foundations and unlock new opportunities.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay: index * 0.08,
                duration: 0.6,
              }}
              whileHover={{
                y: -10,
              }}
              className="group relative flex h-[470px] flex-col overflow-hidden rounded-[12px] border border-border bg-card"
            >
              {/* Notch */}

              

              <div className="relative h-58 w-full shrink-0 overflow-hidden rounded-[12px] border-b border-border">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-7">
                {/* <div className="text-[10px] uppercase tracking-[0.28em] text-body">
                  {item.category}
                </div> */}

                <h3 className="text-2xl font-medium text-heading">
                  {item.title}
                </h3>

                <div className="my-4 h-px w-14 bg-border" />

                <p className="text-body leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm text-body">
                    Explore Capability
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:translate-x-1">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-[12px] ring-1 ring-transparent transition-all duration-500 group-hover:ring-primary/20" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
