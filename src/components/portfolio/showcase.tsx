"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LogoItem {
  name: string;
  file: string;
  category: string;
  folder: "goverment" | "clients";
}

const ALL_LOGOS: LogoItem[] = [
  { name: "Rajgir Zoo Safari", file: "Zoo Safari logo copy.jpg", category: "Web Development", folder: "goverment" },
  { name: "Patna Park", file: "Patna Park.png", category: "Web Development", folder: "goverment" },
  { name: "Patna Zoo", file: "logo-large-converted-from-svg.png", category: "Web Development", folder: "goverment" },
  { name: "Vana Vani", file: "Green and Beige Groceries Business Logo.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Nagar Parishad Jamui", file: "jamui logo.png", category: "Web Development", folder: "clients" },
  { name: "Thakurganj Nagar Panchayat", file: "THAKUR GANJ NAGAR PANCHAYAT.png", category: "Web Development", folder: "clients" },
  { name: "Domus Cure", file: "Domus-logo png.png", category: "Mobile Apps", folder: "clients" },
  { name: "Gayatri Astroscience", file: "logo (2).png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Diagno First Lab", file: "Diagno-lab-PNG.png", category: "Mobile Apps", folder: "clients" },
  { name: "Golden Apple", file: "golden apple logo.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Inception", file: "Inception logo.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Janya Hospital", file: "Janya-Hospital-Logo-PNG copy.png", category: "Mobile Apps", folder: "clients" },
  { name: "Landmark Hotel", file: "LANDMARK LOGO.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Ruban Hospital", file: "Ruban@logo-with-NABH-2-ovg23ovg0xx8ocfhzbaqtv86rfyyms5d4as9irornm.png", category: "Mobile Apps", folder: "clients" },
  { name: "Advante", file: "Advante Logo Final - 25-07-2022 - Copy.png", category: "Web Development", folder: "clients" },
  { name: "AHL", file: "Ahl-logo-copy-300x76.png", category: "Web Development", folder: "clients" },
  { name: "ARCS", file: "ARCS.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "BCIT", file: "bcit_logo.webp", category: "Web Development", folder: "clients" },
  { name: "Edify School", file: "Edify Logo.jpg", category: "Web Development", folder: "clients" },
  { name: "Hotel Sidh Vedantha", file: "Hotel Sidh Vedantha logo.webp", category: "Graphic Design & Branding", folder: "clients" },
  { name: "New Era High School", file: "NEW ERA HIGH SCHOOL LOGO.png", category: "Web Development", folder: "clients" },
  { name: "Patna Dental Clinic", file: "Patna Dental Final Logo.png", category: "Mobile Apps", folder: "clients" },
  { name: "Medica Emergency", file: "Medica Emergency logo.png", category: "Mobile Apps", folder: "clients" },
  { name: "Medica Hospital", file: "Medica Logo for Social Media.png", category: "Mobile Apps", folder: "clients" },
  { name: "Satyadev Hospital", file: "Satyadev Urology Logo.jpg", category: "Mobile Apps", folder: "clients" },
  { name: "Technosys", file: "technosys-logo (1).png", category: "Mobile Apps", folder: "clients" },
  { name: "Weddings72 Planners", file: "WEDDINGS72 LOGO.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Abhayanand Super 30", file: "abhayanand_logo-170x115.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Arvind Foundation", file: "arvind foundation logo copy.png", category: "Web Development", folder: "clients" },
  { name: "Sheodeni Sao College", file: "SHEODENI SAO COLLEGE LOGO-01.png", category: "Web Development", folder: "clients" },
  { name: "Unicare Hospital", file: "Unicare logo.png", category: "Mobile Apps", folder: "clients" },
  { name: "Vedanta Hospital", file: "vedantalogo.png", category: "Mobile Apps", folder: "clients" },
  { name: "Sita Interior", file: "SITA-ARCH-LOGO-DKPorKRm.webp", category: "Web Development", folder: "clients" },
  { name: "Tax Protect", file: "Tax Protect Logo - 09-June-2022.png", category: "Mobile Apps", folder: "clients" },
  { name: "Rapid House", file: "rapid_logo.png", category: "Mobile Apps", folder: "clients" },
  { name: "ClickCharm", file: "logo (3) - Copy.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Kiara", file: "kiayra-removebg-preview.webp", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Natural Spa", file: "NATURAL SPA.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Nirmal Inn", file: "Nirmal Inn logo2.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Parkomico", file: "Parkomiko.png", category: "Mobile Apps", folder: "clients" },
  { name: "Score High", file: "SCORE HIGH LOGO.jpg", category: "Web Development", folder: "clients" },
  { name: "K.P Sinha", file: "K.P Sinha Logo.png", category: "Web Development", folder: "clients" },
  { name: "MIA", file: "MIA logo.png", category: "Graphic Design & Branding", folder: "clients" },
  { name: "Krrish Fabricators", file: "Krrish Fabricators Logo - Copy.png", category: "Graphic Design & Branding", folder: "clients" }
];

type ShowcaseContent = Partial<{
  eyebrow: string;
  heading: string;
}>;

export default function PortfolioShowcase({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as ShowcaseContent;
  const c = {
    eyebrow: content.eyebrow ?? "✦ Selected Case Studies",
    heading: content.heading ?? "Our Portfolio",
  };

  const getLogoSrc = (logo: LogoItem) => {
    if (logo.folder === "goverment") {
      return `/images/goverment/${encodeURIComponent(logo.file)}`;
    }
    return `/images/NEW%20CLIENTS%20LOGO/${encodeURIComponent(logo.file)}`;
  };

  return (
    <section id="portfolio-work" className="py-24 px-6 md:px-12 bg-[#f8fafc] relative overflow-hidden">
      {/* Background soft grid pattern */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="border-b border-slate-100 pb-8 mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-900/5 text-slate-600 text-xs font-semibold uppercase tracking-widest mb-6">
            {c.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            {c.heading}
          </h2>
        </div>

        {/* Logos Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key="logos-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {ALL_LOGOS.length > 0 ? (
              ALL_LOGOS.map((logo, idx) => (
                <motion.div
                  key={logo.name + idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: Math.min(idx * 0.015, 0.25) }}
                  className="group relative flex items-center justify-center p-6 bg-white border border-slate-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 ease-out w-full aspect-[4/3]"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={getLogoSrc(logo)}
                      alt={logo.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      priority={idx < 15}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-slate-400 font-mono text-xs">
                No logos found.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
