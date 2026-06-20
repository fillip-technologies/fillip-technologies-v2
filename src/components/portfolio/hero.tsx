"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const projects = [
  { src: "/images/patna-zoo-portal.jpg", alt: "Patna Zoo ticketing platform", className: "left-0 top-0 h-[35%] w-[34%]" },
  { src: "/images/analytics-dashboard.jpg", alt: "Business analytics dashboard", className: "left-[38%] top-0 h-[27%] w-[29%]" },
  { src: "/images/rajgir-safari-dashboard.jpg", alt: "Rajgir Safari operations dashboard", className: "right-0 top-0 h-[42%] w-[29%]" },
  { src: "/images/case-studies.png", alt: "Fillip Technologies case studies", className: "left-[38%] top-[31%] h-[36%] w-[29%]" },
  { src: "/images/team/team1.png", alt: "Fillip Technologies team", className: "left-0 top-[39%] h-[29%] w-[34%]" },
  { src: "/images/team/team2.png", alt: "Fillip Technologies delivery team", className: "right-0 top-[46%] h-[27%] w-[29%]" },
  { src: "/images/analytics-dashboard.jpg", alt: "Custom software interface", className: "left-[38%] bottom-0 h-[29%] w-[29%]" },
  { src: "/images/patna-zoo-portal.jpg", alt: "Public platform experience", className: "right-0 bottom-0 h-[23%] w-[29%]" },
];

const avatars = ["/images/team/team1.png", "/images/team/team2.png", "/images/team/team1.png", "/images/team/team2.png"];

export default function PortfolioHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-6 pb-16 pt-36 text-heading lg:px-10 lg:pb-10 lg:pt-40">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#ffffff_0%,#f9fbff_58%,#f3fbff_100%)]" />
      <div className="absolute -left-36 top-1/3 -z-10 size-[34rem] rounded-full bg-primary/[0.055] blur-3xl" />
      <div className="absolute -right-28 top-20 -z-10 size-[32rem] rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[1440px] grid-cols-1 gap-14 lg:grid-cols-[47%_53%] lg:items-center lg:gap-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 lg:pl-8 xl:pl-14">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.22em] text-primary">Fillip Technologies · Selected Work</p>
          <h1 className="max-w-[650px] text-[clamp(3.4rem,6.2vw,7rem)] font-normal leading-[0.9] tracking-[-0.07em] text-heading">
            Ideas shaped into
            <span className="block">meaningful</span>
            <span className="block"><strong className="font-bold text-primary">digital</strong> experiences.</span>
          </h1>

          <p className="mt-9 max-w-lg text-base leading-7 text-body md:text-lg">
            Explore digital products, platforms and growth experiences built by Fillip Technologies for ambitious businesses and public institutions.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-7">
            <Link href="#portfolio-work" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-heading px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(15,23,42,.16)] transition hover:-translate-y-0.5 hover:bg-primary">
              View Projects <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-3 text-sm font-semibold text-heading">
              <span className="grid size-11 place-items-center rounded-full border-2 border-heading transition group-hover:border-primary group-hover:bg-primary group-hover:text-white"><Play className="ml-0.5 size-4 fill-current" /></span>
              Start a Project
            </Link>
          </div>

          <div className="mt-20 flex flex-wrap items-end gap-12 md:gap-20">
            <div>
              <div className="text-5xl font-bold tracking-[-0.055em] text-heading md:text-6xl">100%</div>
              <p className="mt-3 max-w-36 text-sm leading-5 text-body">Custom-built around every client goal</p>
            </div>
            <div className="pb-3">
              <div className="flex -space-x-3">
                {avatars.map((src, index) => (
                  <div key={`${src}-${index}`} className="relative size-10 overflow-hidden rounded-full border-2 border-white bg-surface shadow-sm">
                    <Image src={src} alt="Fillip team member" fill sizes="40px" className="object-cover" />
                  </div>
                ))}
                <div className="grid size-10 place-items-center rounded-full border-2 border-white bg-primary text-[10px] font-bold text-white shadow-sm">FT</div>
              </div>
              <p className="mt-3 text-xs font-medium text-body">Strategy · Design · Engineering</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto h-[600px] w-full max-w-[690px] sm:h-[700px] lg:h-[720px]">
          <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-br from-primary/[0.045] to-accent/[0.08]" />
          {projects.map((project, index) => (
            <motion.div
              key={`${project.alt}-${index}`}
              whileHover={{ y: -7, scale: 1.02, zIndex: 20 }}
              transition={{ duration: 0.25 }}
              className={`absolute overflow-hidden rounded-[1.35rem] border-[5px] border-white bg-surface shadow-[0_20px_55px_rgba(15,23,42,.14)] ${project.className}`}
            >
              <Image src={project.src} alt={project.alt} fill sizes="(max-width: 768px) 34vw, 220px" className="object-cover" priority={index < 3} />
              <div className="absolute inset-0 bg-gradient-to-t from-heading/20 via-transparent to-transparent opacity-60" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <svg aria-hidden="true" className="pointer-events-none absolute bottom-[-8%] left-[28%] -z-10 hidden h-[34%] w-[58%] text-primary/15 lg:block" viewBox="0 0 800 300" fill="none">
        <motion.path
          d="M8 260C70 78 168 38 244 177C312 300 371 304 415 173C456 53 531 36 591 167C655 306 728 245 792 117"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
        />
        <motion.path
          d="M8 285C78 118 164 90 232 205C301 320 377 318 432 201C484 89 551 90 613 201C669 300 738 264 792 171"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2, delay: 0.7, ease: "easeOut" }}
        />
      </svg>
    </section>
  );
}
