"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import Image from "next/image";
import {
  Hexagon,
  Layers,
  Package,
  Film,
  Feather,
  Monitor,
  Share2,
  FileText,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    id: "01",
    icon: Hexagon,
    title: "Logo Design",
    subtitle: "Brand Marks & Identity",
    desc: "Iconic, scalable logos crafted from scratch — wordmarks, lettermarks, emblem logos, and abstract marks that define your brand's first impression.",
    features: ["Wordmarks", "Lettermarks", "Emblem Logos", "Icon Marks"],
    color1: "#0242a2", color2: "#1d4ed8",
    glow: "rgba(2, 66, 162, 0.12)",
    tag: "Most Popular",
    wide: false,
  },
  {
    id: "02",
    icon: Layers,
    title: "Brand Identity",
    subtitle: "Complete Visual Systems",
    desc: "End-to-end brand identity systems covering color palettes, typography hierarchy, brand voice, guidelines, and full brand books for consistent multi-channel presence.",
    features: ["Color System", "Typography", "Brand Guidelines", "Style Sheets"],
    color1: "#7C3AED", color2: "#6D28D9",
    glow: "rgba(124, 58, 237, 0.1)",
    tag: "Enterprise",
    wide: true,
  },
  {
    id: "03",
    icon: Package,
    title: "Packaging Design",
    subtitle: "Product & Retail Packaging",
    desc: "Premium retail packaging, label designs, box layouts, and product wraps built on golden-ratio grids that make products fly off shelves.",
    features: ["Product Labels", "Box Design", "Retail Packaging", "Die-cut Layouts"],
    color1: "#059669", color2: "#047857",
    glow: "rgba(5, 150, 105, 0.1)",
    tag: "3D Ready",
    wide: false,
  },
  {
    id: "04",
    icon: FileText,
    title: "Print & Collateral",
    subtitle: "Brochures, Posters & More",
    desc: "High-resolution print assets including brochures, flyers, exhibition banners, magazine layouts, business cards, and stationery — press-ready at 300+ DPI.",
    features: ["Brochures", "Posters", "Business Cards", "Stationery"],
    color1: "#0891B2", color2: "#0e7490",
    glow: "rgba(8, 145, 178, 0.1)",
    tag: "Print Ready",
    wide: false,
  },
  {
    id: "05",
    icon: Film,
    title: "Motion Graphics",
    subtitle: "Animation & Visual Effects",
    desc: "Captivating motion design for intros, logo animations, explainer videos, social media reels, and interactive UI micro-animations that bring brands to life.",
    features: ["Logo Animation", "Explainer Videos", "Reel Covers", "UI Motion"],
    color1: "#D97706", color2: "#B45309",
    glow: "rgba(217, 119, 6, 0.1)",
    tag: "After Effects",
    wide: true,
  },
  {
    id: "06",
    icon: Feather,
    title: "Illustration",
    subtitle: "Custom Art & Characters",
    desc: "Bespoke vector illustrations in flat, isometric, hand-drawn, or character art styles — purpose-built for websites, apps, marketing, and editorial content.",
    features: ["Character Art", "Isometric", "Flat Design", "Editorial"],
    color1: "#DB2777", color2: "#BE185D",
    glow: "rgba(219, 39, 119, 0.1)",
    tag: "Custom",
    wide: false,
  },
  {
    id: "07",
    icon: Monitor,
    title: "UI/UX Design",
    subtitle: "Interfaces & Digital Products",
    desc: "Pixel-perfect Figma designs for web apps, dashboards, landing pages, and mobile interfaces with full design systems, component libraries, and dev handoffs.",
    features: ["Figma Design", "Component Libraries", "Prototyping", "Dev Handoff"],
    color1: "#0242a2", color2: "#38bdf8",
    glow: "rgba(2, 66, 162, 0.1)",
    tag: "Figma",
    wide: false,
  },
  {
    id: "08",
    icon: Share2,
    title: "Social Media Design",
    subtitle: "Content & Ad Creatives",
    desc: "Scroll-stopping social media graphics, Instagram templates, Facebook/Google ad creatives, stories, thumbnails, and campaign kits that drive real engagement.",
    features: ["Ad Creatives", "Story Templates", "Post Series", "Campaign Kits"],
    color1: "#7C3AED", color2: "#9333EA",
    glow: "rgba(124, 58, 237, 0.1)",
    tag: "All Platforms",
    wide: false,
  },
];

const processSteps = [
  { num: "01", title: "Discovery Call", desc: "We learn your brand, audience, and design goals in detail." },
  { num: "02", title: "Concepts & Moodboards", desc: "Visual directions with color systems and typography pairings." },
  { num: "03", title: "High-Fidelity Design", desc: "Custom vectors, grids, and assets built from scratch." },
  { num: "04", title: "Revisions & Delivery", desc: "Unlimited revisions until perfect. Clean source files delivered." },
];

export default function GraphicCapabilities() {
  return (
    <>
      {/* ============== SERVICES SECTION ============== */}
      <section id="services" className="bg-white text-[#0f172a] py-32 px-6 md:px-12 relative overflow-hidden border-t border-slate-100">

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(2,66,162,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Top glow accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, #0242a2 0%, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0242a2]/20 bg-[#0242a2]/6 text-[#0242a2] text-xs font-semibold uppercase tracking-[0.2em] mb-5"
            >
              ✦ What We Design
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0f172a]"
            >
              Every Design{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0242a2 0%, #38bdf8 60%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Category
              </span>
              <br />
              <span className="text-slate-400">Covered.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-base md:text-lg max-w-lg mx-auto mt-5 leading-relaxed"
            >
              From your first logo to a complete brand universe — we design everything your business needs.
            </motion.p>
          </div>

          {/* Services bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Fragment key={service.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.07 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className={`group relative rounded-2xl border border-slate-200 bg-white p-7 overflow-hidden cursor-pointer transition-all duration-300 hover:border-slate-300 hover:shadow-lg ${service.wide ? "lg:col-span-2" : ""}`}
                  >
                    {/* Top gradient accent line on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, ${service.color1}, ${service.color2})` }}
                    />

                    {/* Hover bg tint */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{ background: service.glow }}
                    />

                    {/* Number */}
                    <div className="absolute top-6 right-7 text-slate-100 font-black text-6xl select-none group-hover:text-slate-200 transition-colors">
                      {service.id}
                    </div>

                    {/* Top row */}
                    <div className="flex items-start justify-between mb-5 relative z-10">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${service.color1}, ${service.color2})` }}
                      >
                        <Icon size={20} className="text-white stroke-[1.5]" />
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                        style={{
                          borderColor: `${service.color1}30`,
                          color: service.color1,
                          background: `${service.color1}0d`,
                        }}
                      >
                        {service.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">{service.subtitle}</p>
                      <h3 className="text-xl font-bold text-[#0f172a] mb-3 group-hover:text-[#0242a2] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.desc}</p>

                      {/* Feature pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.features.map((feat) => (
                          <span
                            key={feat}
                            className="text-[11px] px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 font-medium"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold group-hover:text-[#0242a2] transition-colors duration-300">
                        <span>Explore service</span>
                        <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Insert graphic-image-2 in the first empty space (after Item 3, which is idx === 3) */}
                  {idx === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="relative w-full h-[380px] lg:h-full min-h-[360px] group cursor-pointer overflow-hidden rounded-2xl"
                    >
                      <Image
                        src="/images/graphic-image-2.png"
                        alt="Creative Design Showcase 2"
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      />
                    </motion.div>
                  )}

                  {/* Insert graphic-image-3 in the second empty space (after Item 7, which is idx === 7) */}
                  {idx === 7 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="relative w-full h-[380px] lg:h-full min-h-[360px] group cursor-pointer overflow-hidden rounded-2xl"
                    >
                      <Image
                        src="/images/graphic-image-3.png"
                        alt="Creative Design Showcase 3"
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      />
                    </motion.div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== PROCESS SECTION ============== */}
      <section id="process" className="bg-[#f8fafc] text-[#0f172a] pt-20 pb-4 px-6 md:px-12 relative overflow-hidden border-t border-slate-100">
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(2,66,162,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

            {/* Left heading */}
            <div className="lg:w-[40%] lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0242a2]/20 bg-[#0242a2]/6 text-[#0242a2] text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              >
                ✦ Our Process
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-5 text-[#0f172a]"
              >
                How We Bring{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #0242a2 0%, #38bdf8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ideas to Life
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-sm leading-relaxed"
              >
                A proven 4-step creative process ensures every project is delivered on time, on brand, and beyond expectations.
              </motion.p>
            </div>

            {/* Steps */}
            <div className="lg:w-[60%] flex flex-col gap-5">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group relative flex items-start gap-7 p-7 rounded-2xl border border-slate-200 bg-white hover:border-[#0242a2]/30 hover:shadow-md transition-all duration-300 cursor-default"
                >
                  {/* Number badge */}
                  <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm border border-slate-200 bg-slate-50 text-slate-400 group-hover:text-[#0242a2] group-hover:border-[#0242a2]/30 group-hover:bg-[#0242a2]/6 transition-all duration-300">
                    {step.num}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a] mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Connector line */}
                  {idx < processSteps.length - 1 && (
                    <div className="absolute left-[43px] -bottom-5 w-px h-5 bg-gradient-to-b from-slate-200 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
