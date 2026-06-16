"use client";

import Image from "next/image";

const logoDirectory = "/images/NEW%20CLIENTS%20LOGO";

const priorityClientLogoFiles = [
  "Patna Park.png",
  "Nature Safari logo copy.png",
  "BMC NEW LOGO-011.png",
  "jamui logo.png",
  "THAKUR GANJ NAGAR PANCHAYAT.png",
];

const clientLogoFiles = [
  ...priorityClientLogoFiles,
  "abhayanand_logo-170x115.png",
  "Advance Line Logo Final.png",
  "ADVANCED NEURO HOSPITAL.png",
  "Advante Logo Final - 25-07-2022 - Copy.png",
  "Ahl-logo-copy-300x76.png",
  "ARCS.png",
  "arvind foundation logo copy.png",
  "cropped-Capture_Atithi_prev_ui.png",
  "cropped-Screenshot-2024-09-10-184114-300x300.png",
  "darsh logo copy (1).png",
  "darsh news logo.png",
  "DHPL logo 1 copy.png",
  "Diagno-lab-PNG.png",
  "Domus-logo png.png",
  "gadgethubpatna logo 900.png",
  "golden apple logo.png",
  "Green and Beige Groceries Business Logo.png",
  "Inception logo.png",
  "Janya-Hospital-Logo-PNG copy.png",
  "K.P Sinha Logo.png",
  "kashlaya reahb logo.png",
  "Krrish Fabricators Logo - Copy.png",
  "LANDMARK LOGO.png",
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
  "Map sketch logo.png",
  "Medica Emergency logo.png",
  "Medica Logo for Social Media.png",
  "MIA logo.png",
  "NATURAL SPA.png",
  "New era high school LOGO copy.png",
  "NEW ERA HIGH SCHOOL LOGO.png",
  "Nirmal Inn logo2.png",
  "Parkomiko.png",
  "Patna Dental Final Logo.png",
  "Rakshit Logo.PNG",
  "RAMRATAN LOGO.png",
  "rapid_logo.png",
  "rkch-logo.png",
  "Ruban@logo-with-NABH-2-ovg23ovg0xx8ocfhzbaqtv86rfyyms5d4as9irornm.png",
  "SAI CARE CLININC.png",
  "Saicare logo.png",
  "Sanjivani medicine logo copy.png",
  "Savij LOGO-01 (1) - Copy.png",
  "SHEODENI SAO COLLEGE LOGO-01.png",
  "Startup Logo.png",
  "tanush ent fnail logo.png",
  "Tax Protect Logo - 09-June-2022.png",
  "technosys-logo (1).png",
  "Unicare logo.png",
  "vedantalogo.png",
  "WEDDINGS72 LOGO.png",
];

const clientLogos = clientLogoFiles.map((file) => ({
  src: `${logoDirectory}/${encodeURIComponent(file)}`,
  alt: file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim(),
}));

const row1 = clientLogos.filter((_, index) => index % 2 === 0);
const row2 = clientLogos.filter((_, index) => index % 2 === 1);

function LogoRow({
  logos,
  reverse = false,
}: {
  logos: { src: string; alt: string }[];
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max items-center gap-20 ${
          reverse ? "animate-client-marquee-reverse" : "animate-client-marquee"
        }`}
      >
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex h-16 shrink-0 items-center justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={80}
              className="
                h-12
                w-auto
                object-contain
                opacity-70
                grayscale
                transition-all
                duration-500
                hover:opacity-100
                hover:grayscale-0
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

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

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="
            absolute
            left-1/2
            top-[-250px]
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

        {/* Logos */}

        <div className="mt-14 space-y-8">
          <LogoRow logos={row1} />
          <LogoRow logos={row2} reverse />
        </div>
      </div>
    </section>
  );
}
