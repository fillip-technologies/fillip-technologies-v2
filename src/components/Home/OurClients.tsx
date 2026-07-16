"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const logoDirectory = "/images/NEW%20CLIENTS%20LOGO";

const priorityClientLogoFiles = [
  "Patna Park.png",
  "BMC NEW LOGO-011.png",
  "THAKUR GANJ NAGAR PANCHAYAT.png",
  "Zoo Safari logo copy.jpg",
  "Ruban@logo-with-NABH-2-ovg23ovg0xx8ocfhzbaqtv86rfyyms5d4as9irornm.png",
  "Medica Emergency logo.png",
  "Patna Dental Final Logo.png",
  "arvind foundation logo copy.png",
  "darsh news logo.png",
  "New era high school LOGO copy.png",
  "SHEODENI SAO COLLEGE LOGO-01.png",
  "Tax Protect Logo - 09-June-2022.png",
  "technosys-logo (1).png",
  "rapid_logo.png",
  "Advance Line Logo Final.png",
  "Domus-logo png.png",
  "Map sketch logo.png",
  "venu-van.png"
];

const clientLogoFiles = [
  "abhayanand_logo-170x115.png",
  "Advance Line Logo Final.png",
  "ADVANCED NEURO HOSPITAL.png",
  "Advante Logo Final - 25-07-2022 - Copy.png",
  "Ahl-logo-copy-300x76.png",
  "ARCS.png",
  "arvind foundation logo copy.png",
  "bcit_logo.webp",
  "BMC NEW LOGO 222-01.jpg",
  "BMC NEW LOGO-011.png",
  "cropped-Capture_Atithi_prev_ui.png",
  "cropped-Screenshot-2024-09-10-184114-300x300.png",
  "darsh logo copy (1).png",
  "darsh news logo.png",
  "DHPL logo 1 copy.png",
  "Diagno-lab-PNG.png",
  "Domus-logo png.png",
  "Edify Logo.jpg",
  "gadgethubpatna logo 900.png",
  "golden apple logo.png",
  "Green and Beige Groceries Business Logo.png",
  "Hotel Sidh Vedantha logo.webp",
  "Inception logo.png",
  "jamui logo.png",
  "Janya-Hospital-Logo-PNG copy.png",
  "K.P Sinha Logo.png",
  "kanika spa logo.jpg",
  "kashlaya reahb logo.png",
  "kiayra-removebg-preview.webp",
  "Krrish Fabricators Logo - Copy.png",
  "LANDMARK LOGO.png",
  "logo (1) - Copy.jpg",
  "logo (1).png",
  "logo (10).png",
  "logo (11).png",
  "logo (13).png",
  "logo (14).png",
  "logo (15).png",
  "logo (16) - Copy.png",
  "logo (17).png",
  "logo (18).png",
  "logo (19).png",
  "Logo (2).png",
  "logo (20).png",
  "logo (21).png",
  "logo (22).png",
  "logo (23).png",
  "logo (24).png",
  "logo (25) - Copy.png",
  "logo (26).png",
  "logo (27).png",
  "logo (28).png",
  "logo (29).png",
  "logo (3) - Copy.png",
  "logo (30).png",
  "logo (4) - Copy.png",
  "logo (5).png",
  "logo (6).png",
  "logo (7).png",
  "logo (8).png",
  "logo (9).png",
  "logo - Copy (2).png",
  "logo - Copy - Copy.png",
  "logo - Copy.jpg",
  "Logo Black.png",
  "logo-01-removebg-preview-768x257.png",
  "Logo-1 - Copy.png",
  "logo-2 - Copy.png",
  "logo-fotter-300x69.png",
  "logo-green-new.png",
  "logo-lg.png",
  "logo-name.png",
  "logo-partyt patna zone.png",
  "logo-removebg-preview - Copy.png",
  "logo-rng.png",
  "logo-shubh momentz.png",
  "logo.jpg",
  "logo.png",
  "logo1 (2).png",
  "logo1 - Copy.png",
  "logo1-1536x359.png",
  "Logo2-01 - Copy.png",
  "Logo2-01.png",
  "logo2.png",
  "logo4.png",
  "logonew2.png",
  "logo_old - Copy.png",
  "logo_old.png",
  "LVS_logo.webp",
  "Maa.jpg",
  "Map sketch logo.png",
  "Medica Emergency logo.png",
  "Medica Logo for Social Media.png",
  "MIA logo.png",
  "NATURAL SPA.png",
  "Nature Safari logo copy.png",
  "New era high school LOGO copy.png",
  "NEW ERA HIGH SCHOOL LOGO.png",
  "Nirmal Inn logo2.png",
  "Parkomiko.png",
  "Patna Dental Final Logo.png",
  "Patna Park.png",
  "Rakshit Logo.PNG",
  "RAMRATAN LOGO.png",
  "rapid_logo.png",
  "rkch-logo.png",
  "Ruban@logo-with-NABH-2-ovg23ovg0xx8ocfhzbaqtv86rfyyms5d4as9irornm.png",
  "SAI CARE CLININC.png",
  "Saicare logo.png",
  "Sanjivani medicine logo copy.png",
  "Satyadev Urology Logo.jpg",
  "Savij LOGO-01 (1) - Copy.png",
  "SCORE HIGH LOGO.jpg",
  "SHEODENI SAO COLLEGE LOGO-01.png",
  "SITA-ARCH-LOGO-DKPorKRm.webp",
  "Sri millets logo copy.jpg",
  "Startup Logo.png",
  "tanush ent fnail logo.png",
  "Tax Protect Logo - 09-June-2022.png",
  "technosys-logo (1).png",
  "THAKUR GANJ NAGAR PANCHAYAT.png",
  "tqpl logo red white.JPG",
  "TRIVEDI DESIGN.webp",
  "Unicare logo.png",
  "vedantalogo.png",
  "WEDDINGS72 LOGO.png",
  "WhatsApp Image 2022-03-28 at 11.38.44 AM.jpeg",
  "Zoo Safari logo copy.jpg",
  "venu-van.png"
];

// Clean duplicates
const uniqueClientLogoFiles = Array.from(new Set(clientLogoFiles));

interface Client {
  src: string;
  alt: string;
  categories: string[];
}

const clientLogos: Client[] = uniqueClientLogoFiles.map((file) => {
  const alt = file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const categories: string[] = ["all"];

  if (priorityClientLogoFiles.includes(file)) {
    categories.push("priority");
  }

  const lowerFile = file.toLowerCase();

  // Government & Municipal Project Detection
  if (
    lowerFile.includes("park") ||
    lowerFile.includes("safari") ||
    lowerFile.includes("bmc") ||
    lowerFile.includes("jamui") ||
    lowerFile.includes("nagar") ||
    lowerFile.includes("panchayat") ||
    lowerFile.includes("municipal") ||
    lowerFile.includes("council") ||
    lowerFile.includes("zoo") ||
    lowerFile.includes("sita-arch") ||
    lowerFile.includes("patna") ||
    lowerFile.includes("zone")
  ) {
    categories.push("govt");
  }

  // Healthcare / Medical Detection
  if (
    lowerFile.includes("hospital") ||
    lowerFile.includes("diagno") ||
    lowerFile.includes("clinic") ||
    lowerFile.includes("medicine") ||
    lowerFile.includes("urology") ||
    lowerFile.includes("rehab") ||
    lowerFile.includes("reahb") ||
    lowerFile.includes("medica") ||
    lowerFile.includes("dental") ||
    lowerFile.includes("care") ||
    lowerFile.includes("ent") ||
    lowerFile.includes("ruban") ||
    lowerFile.includes("physio")
  ) {
    categories.push("healthcare");
  }

  // Education / Institution Detection
  if (
    lowerFile.includes("school") ||
    lowerFile.includes("college") ||
    lowerFile.includes("edify") ||
    lowerFile.includes("score high") ||
    lowerFile.includes("lvs") ||
    lowerFile.includes("bcit") ||
    lowerFile.includes("academy") ||
    lowerFile.includes("learning") ||
    lowerFile.includes("education")
  ) {
    categories.push("education");
  }

  // Corporates & Commercial (if it doesn't fit in other industry classifications)
  if (
    !categories.includes("govt") &&
    !categories.includes("healthcare") &&
    !categories.includes("education")
  ) {
    categories.push("corporate");
  }

  return {
    src: `${logoDirectory}/${encodeURIComponent(file)}`,
    alt,
    categories,
  };
});

const categoriesConfig = [
  { id: "govt", label: "Govt. Projects" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "all", label: "Corporates & Startups" },
];

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

  const [activeCategory, setActiveCategory] = useState<string>("govt");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Filter logos based on activeCategory
  const filteredLogos = useMemo(() => {
    if (activeCategory === "govt") {
      const governmentFiles = [
        "rajgir-zoo.png",
        "Nature Safari logo copy.png",
        "venu-van.png",
        "logo-large-converted-from-svg.png",
        "BMC NEW LOGO-011.png",
        "Patna Park.png",
        "logo - Copy - Copy.png",
        "BMC NEW LOGO 222-01.jpg"
      ];
      return governmentFiles.map((file) => {
        const alt = file
          .replace(/\.[^.]+$/, "")
          .replace(/[-_]+/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        return {
          src: `/images/goverment/${encodeURIComponent(file)}`,
          alt,
          categories: ["govt"],
        };
      });
    }
    return clientLogos.filter((logo) => logo.categories.includes(activeCategory));
  }, [activeCategory]);

  const itemsPerPage = 20;

  const visibleLogos = useMemo(() => {
    if (isExpanded) return filteredLogos;
    return filteredLogos.slice(0, itemsPerPage);
  }, [filteredLogos, isExpanded]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setIsExpanded(false);
  };

  // Split logos into two rows for mobile marquee
  const half = Math.ceil(filteredLogos.length / 2);
  const row1 = filteredLogos.slice(0, half);
  const row2 = filteredLogos.slice(half);

  const getLogoHeightClass = (src: string, isDesktop = false) => {
    const isRajgirZoo = src.toLowerCase().includes("rajgir-zoo") ||
      (src.toLowerCase().includes("zoo") && src.toLowerCase().includes("safari"));
    const isOtherSafariOrZoo = src.toLowerCase().includes("safari") || src.toLowerCase().includes("zoo");
    const isVenuVan = src.toLowerCase().includes("vanu-van") || src.toLowerCase().includes("venu-van");

    if (isDesktop) {
      if (isRajgirZoo) return "max-h-[105px]";
      if (isOtherSafariOrZoo) return "max-h-20";
      if (isVenuVan) return "max-h-[90px]";
      return "max-h-14";
    } else {
      if (isRajgirZoo) return "max-h-[60px]";
      if (isOtherSafariOrZoo) return "max-h-12";
      if (isVenuVan) return "max-h-14";
      return "max-h-10";
    }
  };

  const getMarqueeItems = (arr: typeof visibleLogos) => {
    if (arr.length === 0) return [];
    let result = [...arr];
    while (result.length < 8) {
      result = [...result, ...arr];
    }
    return [...result, ...result];
  };

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute inset-0 bg-white/75" />

        <div
          className="
            absolute
            left-1/2
            top-[ -250px]
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

        {/* Filter Pills */}
        <div className="mx-auto mt-12 max-w-5xl px-6 flex justify-center">
          <div
            role="tablist"
            aria-label="Client categories"
            className="flex flex-wrap justify-center gap-2 rounded-full border border-slate-100 bg-white/80 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-md"
          >
            {categoriesConfig.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(cat.id)}
                  className="relative shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold text-slate-600 transition-colors duration-300 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:text-sm"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeClientTab"
                      className="absolute inset-0 rounded-full bg-primary shadow-[0_8px_20px_rgba(2,66,162,0.18)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 whitespace-nowrap transition-colors duration-300 ${isActive ? "text-white" : ""
                      }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logos Grid */}
        <div className="mx-auto mt-14 max-w-7xl px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Mobile View: Two-line auto-scrolling marquee */}
              <div className="block md:hidden space-y-4 overflow-hidden w-full">
                {/* Row 1 */}
                <div className="flex overflow-hidden w-full">
                  <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                      ease: "linear",
                      duration: 20,
                      repeat: Infinity,
                    }}
                    className="flex gap-x-6 whitespace-nowrap w-max"
                  >
                    {getMarqueeItems(row1).map((logo, index) => (
                      <div
                        key={logo.src + "-row1-" + index}
                        className="relative flex h-20 shrink-0 items-center justify-center px-2"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={160}
                          height={64}
                          className={`${getLogoHeightClass(logo.src)} w-auto object-contain opacity-90`}
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Row 2 */}
                <div className="flex overflow-hidden w-full">
                  <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                      ease: "linear",
                      duration: 20,
                      repeat: Infinity,
                    }}
                    className="flex gap-x-6 whitespace-nowrap w-max"
                  >
                    {getMarqueeItems(row2).map((logo, index) => (
                      <div
                        key={logo.src + "-row2-" + index}
                        className="relative flex h-20 shrink-0 items-center justify-center px-2"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={160}
                          height={64}
                          className={`${getLogoHeightClass(logo.src)} w-auto object-contain opacity-90`}
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Desktop/Tablet View: Standard Grid Layout */}
              <div className="hidden md:flex flex-wrap items-center justify-center gap-x-16 gap-y-10 w-full">
                {visibleLogos.map((logo, index) => (
                  <motion.div
                    key={logo.src + index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
                    className="group relative flex h-28 items-center justify-center px-4 transition-all duration-300 ease-out hover:-translate-y-1"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={160}
                      height={64}
                      className={`${getLogoHeightClass(logo.src, true)} w-auto object-contain opacity-90 transition-all duration-300 group-hover:opacity-100`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* View More / View Less Button */}
          {filteredLogos.length > itemsPerPage && (
            <div className="mt-12 hidden md:flex justify-center">
              <motion.button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-7 py-3 text-sm font-semibold text-slate-700 shadow-soft backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:bg-white hover:text-primary hover:shadow-[0_12px_30px_rgba(2,66,162,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? "View Less" : `View More (${filteredLogos.length - itemsPerPage} More)`}</span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                )}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
