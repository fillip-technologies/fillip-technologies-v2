"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const services = [
  "Digital Marketing",
  "IT Services",
  "Advertising",
  "Web Development",
  "AI Solutions",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-card">
      {/* Mesh Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-[var(--glow-accent)] blur-[180px]" />

        <div className="absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[var(--glow-primary)] blur-[180px]" />

        <div className="absolute left-1/2 top-[25%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--glow-primary)] blur-[220px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--navy) 5%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--navy) 5%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Orb -> Arc */}
      <div className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2">
        <motion.div
          initial={{
            scale: 0.02,
            opacity: 1,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          {/* Breathing Glow */}
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full blur-[140px]"
            style={{
              width: "2600px",
              height: "2600px",
              background:
                "conic-gradient(from 180deg,var(--accent),var(--primary),var(--navy),var(--heading),var(--accent))",
              opacity: 0.15,
            }}
          />

          {/* Moving Sweep */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
            style={{
              width: "2600px",
              height: "2600px",
            }}
          >
            <div
              className="absolute left-1/2 top-0 h-[420px] w-[12px] -translate-x-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, var(--card), color-mix(in srgb, var(--accent) 80%, transparent), transparent)",
                filter: "blur(10px)",
              }}
            />
          </motion.div>

          {/* Arc */}
          <div
            className="rounded-full"
            style={{
              width: "2600px",
              height: "2600px",
              border: "2px solid color-mix(in srgb, var(--card) 95%, transparent)",
              boxShadow: `
                0 0 60px color-mix(in srgb, var(--accent) 25%, transparent),
                0 0 120px color-mix(in srgb, var(--primary) 20%, transparent),
                0 0 220px color-mix(in srgb, var(--navy) 15%, transparent)
              `,
            }}
          />
        </motion.div>
      </div>

      {/* Floating Orb */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-[12%] h-5 w-5 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle,var(--accent) 0%,var(--primary) 60%,transparent 100%)",
          boxShadow:
            "0 0 20px var(--accent), 0 0 50px var(--primary), 0 0 90px var(--accent)",
        }}
      />

      {/* Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex min-h-screen items-center justify-center px-6"
          >
            <div className="max-w-5xl text-center">


              <h1 className="text-4xl font-medium leading-[0.92] tracking-[-0.08em] text-navy md:text-6xl lg:text-[4.8rem]">
                Building Digital
                <br />
                Experiences Through
                <br />

                <AnimatePresence mode="wait">
                  <motion.span
                    key={services[index]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                    className="inline-block  text-primary"
                  >
                    {services[index]}
                  </motion.span>
                </AnimatePresence>
              </h1>

              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-body">
                We craft high-performing digital experiences through
                marketing, technology, advertising and AI solutions
                that help ambitious brands grow faster.
              </p>


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
