"use client";

import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// CMS-editable content (key: page.portfolio.hero). Falls back to defaults.
type Project = { image: string; title: string; category: string };
type PortfolioHeroContent = Partial<{
  headingLead: string;
  headingHighlight: string;
  description: string;
  projects: Project[];
}>;

// Fallback project cards, used only if the CMS list is empty.
const DEFAULT_PROJECTS: Project[] = [
  { image: "/images/portfolio/litera-mockup.png", title: "Litera Valley School", category: "Education Industry" },
  { image: "/images/portfolio/sita-mockup.png", title: "Sita Interior", category: "Architecture Industry" },
  { image: "/images/portfolio/domus-mockup.png", title: "Domus Cure", category: "HealthCare Industry" },
  { image: "/images/portfolio/abhijeet-mockup.png", title: "Dr Abhijeet Jha", category: "Dermatology" },
  { image: "/images/portfolio/chaapak-mockup.png", title: "Chappak Resort", category: "Event Planning" },
  { image: "/images/portfolio/wedding-mockups.png", title: "Weddings72", category: "Event Planning" },
  { image: "/images/portfolio/technosys-mockup.png", title: "Technosys It and Managment", category: "It Industry" },
  { image: "/images/web-img.png", title: "Patna Zoo", category: "Government Industry" },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 150 : -150,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 }
    }
  })
};

export default function PortfolioHero({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as PortfolioHeroContent;
  const c = {
    headingLead: content.headingLead ?? "Ideas shaped into",
    headingHighlight: content.headingHighlight ?? "digital experiences.",
    description:
      content.description ??
      "Explore digital products, platforms and growth experiences built by Fillip Technologies for ambitious businesses and public institutions.",
  };
  const projects = content.projects?.length ? content.projects : DEFAULT_PROJECTS;

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const nextIndex = (page + newDirection + projects.length) % projects.length;
    setPage([nextIndex, newDirection]);
  };

  const sheenVariants = {
    rest: { x: "-100%" },
    hover: {
      x: "100%",
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  // Dynamically computes variants based on index, Y offset, and rotation parameters
  const getCardVariants = (index: number, yOffset: number, rotateVal: number): Variants => ({
    initial: {
      x: -(index - 3.5) * 120, // Stack in the center horizontally
      y: 160,
      rotate: 0,
      scale: 0.9,
      opacity: 0,
      zIndex: 10 + (4 - Math.abs(index - 3.5)),
    },
    animate: {
      x: 0,
      y: yOffset,
      rotate: rotateVal,
      scale: 1,
      opacity: 1,
      zIndex: 10 + (4 - Math.abs(index - 3.5)),
      transition: {
        type: "spring" as const,
        stiffness: 45,
        damping: 12,
        delay: index * 0.08,
      }
    },
    hover: {
      x: 0,
      y: yOffset - 32,
      rotate: 0,
      scale: 1.15,
      zIndex: 50,
      transition: {
        type: "spring" as const,
        stiffness: 180,
        damping: 18,
      }
    }
  });

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-6 pb-20 pt-36 text-heading lg:px-10 lg:pt-40">
      {/* Background Accents */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#ffffff_0%,#f9fbff_58%,#f3fbff_100%)]" />
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/10 to-accent/15 blur-3xl opacity-60 dark:opacity-20 pointer-events-none" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01] pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto flex flex-col items-center text-center max-w-[1440px]">

        {/* Centered Heading Layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Heading */}
          <h3 className="max-w-4xl text-[clamp(2.4rem,5.5vw,5.2rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-heading">
            {c.headingLead}
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-indigo-600 bg-clip-text text-transparent pb-2 [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              {c.headingHighlight}
            </span>
          </h3>

          {/* Description */}
          <p className="mt-8 max-w-xl text-base leading-relaxed text-body md:text-lg">
            {c.description}
          </p>
        </motion.div>

        {/* Mobile Swipeable Slider Layout (Shows one photo at a time) */}
        <div className="block sm:hidden w-full max-w-[290px] mx-auto mt-6">
          <div className="relative w-full h-[300px] rounded-2xl border-[4px] border-white bg-surface shadow-[0_16px_36px_rgba(15,23,42,0.12)] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(e, info) => {
                  const threshold = 50;
                  if (info.offset.x < -threshold) {
                    paginate(1);
                  } else if (info.offset.x > threshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
              >
                {/* Image */}
                <Image
                  src={projects[page].image}
                  alt={projects[page].title}
                  fill
                  sizes="(max-width: 640px) 100vw, 290px"
                  className="object-cover pointer-events-none"
                  priority
                />

                {/* Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent leading-none">
                    {projects[page].category}
                  </span>
                  <h4 className="text-base font-bold mt-1.5 text-white leading-tight">
                    {projects[page].title}
                  </h4>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Pagination Controls */}
          <div className="mt-4 flex items-center justify-between px-2">
            <button
              onClick={() => paginate(-1)}
              className="flex size-10 items-center justify-center rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 active:scale-95 transition-all text-slate-700 cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const dir = index > page ? 1 : -1;
                    setPage([index, dir]);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === page
                    ? "w-6 bg-primary"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="flex size-10 items-center justify-center rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 active:scale-95 transition-all text-slate-700 cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* ================= CURVED PORTFOLIO CARD FAN ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:flex relative w-full overflow-x-auto lg:overflow-x-visible pt-0 pb-6 sm:pb-8 lg:pb-12 justify-start lg:justify-center items-end min-h-[320px] lg:min-h-[360px] -space-x-12 lg:-space-x-16 mt-0 px-6 scrollbar-none"
        >
          {projects.map((project, index) => {
            // Mathematical arc: center index cards have Y offset 0, side cards curve down by offset
            const rotateVal = (index - 3.5) * 4; // -14deg to +14deg
            const yOffset = Math.pow(Math.abs(index - 3.5), 2) * 5.5; // center is 0, ends Y is ~67px

            return (
              <motion.div
                key={`${project.title}-${index}`}
                variants={getCardVariants(index, yOffset, rotateVal)}
                initial="initial"
                animate="animate"
                whileHover="hover"
                style={{ transformOrigin: "bottom center" }}
                className="relative shrink-0 w-[110px] h-[155px] sm:w-[160px] sm:h-[225px] lg:w-[200px] lg:h-[280px] rounded-2xl border-[3px] sm:border-[4px] border-white bg-surface shadow-[0_12px_28px_rgba(15,23,42,0.1)] transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(2,66,162,0.2)] overflow-hidden group cursor-pointer"
              >
                {/* Image desaturated by default */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 34vw, 200px"
                  className="object-cover filter saturate-[0.85] contrast-[1.02] transition-all duration-300 group-hover:filter-none group-hover:saturate-[1.1] group-hover:scale-102"
                />

                {/* Shimmer sheen reflection sweep overlay */}
                <motion.div
                  variants={sheenVariants}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none -skew-x-12 z-20"
                />

                {/* Combine dark hover gradient and text details overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-2.5 sm:p-3.5 text-white z-10">
                  <span className="text-[7px] sm:text-[9px] font-extrabold uppercase tracking-widest text-accent leading-none">
                    {project.category}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold leading-tight mt-1 text-white leading-none">
                    {project.title}
                  </span>
                </div>

                {/* Default subtle gradient at bottom so it doesn't look flat */}
                <div className="absolute inset-0 bg-gradient-to-t from-heading/20 via-transparent to-transparent opacity-60 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
