"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { isAnniversaryActive } from "@/lib/anniversary";
import Fireworks from "./Fireworks";
import GoldParticles from "./GoldParticles";
import SmokeEffect from "./SmokeEffect";

type Phase = "idle" | "open" | "closing" | "done";

const confetti = [
  "left-8 top-12 size-3 rounded-full bg-pink-500",
  "left-16 top-24 size-2 rounded-full bg-blue-500",
  "left-12 top-40 size-4 rotate-45 rounded-sm bg-sky-400",
  "left-24 bottom-24 size-2.5 rounded-full bg-amber-400",
  "left-10 bottom-40 size-3 rotate-45 bg-pink-500",
  "right-28 top-10 size-2 rounded-full bg-amber-400",
  "right-16 top-20 size-3 rounded-full bg-blue-500",
  "right-10 top-36 size-4 rotate-45 rounded-sm bg-amber-400",
  "right-24 bottom-32 size-2 rounded-full bg-blue-500",
  "right-8 bottom-20 size-3 rounded-full bg-pink-500",
  "left-[42%] top-16 size-2 rounded-full bg-amber-300",
  "left-[56%] top-24 size-1.5 rounded-full bg-blue-300",
  "left-[66%] top-32 size-2 rounded-full bg-amber-400",
  "left-[72%] top-44 size-1.5 rounded-full bg-blue-400",
  "left-[64%] bottom-40 size-2 rounded-full bg-sky-400",
  "left-[70%] bottom-52 size-1.5 rounded-full bg-amber-400",
  "left-[50%] bottom-28 size-3 rounded-full bg-pink-500",
  "left-[34%] top-[45%] size-2 rounded-full bg-amber-400",
  "right-[34%] top-[54%] size-2 rounded-full bg-blue-400",
  "right-[30%] top-[58%] size-1.5 rounded-full bg-sky-300",
];

export default function AnniversaryPopup() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(() => (isAnniversaryActive() ? "open" : "idle"));
  const [smokeActive, setSmokeActive] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const doneTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);
  const smokeTimer = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    [closeTimer, doneTimer, revealTimer, smokeTimer].forEach((timerRef) => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    });
  }, []);

  const startReveal = useCallback(() => {
    document.body.classList.remove("anniversary-experience-active");
    document.body.classList.add("anniversary-experience-reveal");

    revealTimer.current = window.setTimeout(() => {
      document.body.classList.remove("anniversary-experience-reveal");
    }, 650);
  }, []);

  const closeExperience = useCallback(() => {
    clearTimers();
    setPhase("closing");

    doneTimer.current = window.setTimeout(() => {
      setPhase("done");
      setSmokeActive(false);
      startReveal();
    }, 500);
  }, [clearTimers, startReveal]);

  const handleFireworksComplete = useCallback(() => {
    if (reduceMotion) return;
    if (smokeTimer.current) window.clearTimeout(smokeTimer.current);
    setSmokeActive(true);
    smokeTimer.current = window.setTimeout(() => setSmokeActive(false), 2100);
  }, [reduceMotion]);

  useEffect(() => {
    if (!isAnniversaryActive()) return;

    document.body.classList.add("anniversary-experience-active");

    closeTimer.current = window.setTimeout(() => {
      closeExperience();
    }, 60000);

    return () => {
      clearTimers();
      document.body.classList.remove("anniversary-experience-active");
      document.body.classList.remove("anniversary-experience-reveal");
    };
  }, [clearTimers, closeExperience]);

  if (phase === "idle" || phase === "done") return null;

  const isClosing = phase === "closing";

  return (
    <>
      <Fireworks
        active={phase === "open"}
        reducedMotion={Boolean(reduceMotion)}
        onComplete={handleFireworksComplete}
      />
      <SmokeEffect active={smokeActive} />

      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[997] flex items-center justify-center bg-slate-950/42 px-5 backdrop-blur-[3px]"
          aria-hidden={isClosing}
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-live="polite"
            aria-label="Fillip Technologies 13 year anniversary celebration"
            className="relative max-h-[92vh] w-full max-w-[560px] overflow-hidden rounded-[34px] border border-white/70 bg-gradient-to-br from-white via-blue-50 to-sky-100 px-5 py-6 text-center shadow-[0_34px_100px_rgba(8,28,46,0.28)] backdrop-blur-2xl sm:px-8 sm:py-7"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
            animate={
              reduceMotion
                ? { opacity: isClosing ? 0 : 1 }
                : { opacity: isClosing ? 0 : 1, scale: isClosing ? 0.96 : 1 }
            }
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : {
                    type: "spring",
                    duration: 0.5,
                    bounce: 0.22,
                    damping: 22,
                    stiffness: 210,
                  }
            }
          >
            <button
              type="button"
              onClick={closeExperience}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,0.14)] transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50"
              aria-label="Close anniversary celebration"
            >
              <X size={22} strokeWidth={3} />
            </button>

            <div
              className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-28 -right-20 h-64 w-64 rounded-full bg-blue-400/18 blur-3xl"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {confetti.map((className) => (
                <span key={className} className={`absolute ${className}`} />
              ))}
            </div>
            <GoldParticles />

            <div className="relative z-10 flex flex-col items-center">
              <Image
                src="/images/logo/fillip-technologies.png"
                alt="Fillip Technologies"
                width={280}
                height={60}
                priority
                style={{ height: "auto" }}
              />

              <h1 className="mt-5 text-4xl font-black leading-[0.9] tracking-normal text-slate-950 drop-shadow-[0_5px_0_rgba(255,255,255,0.9)] sm:text-5xl">
                Celebrating
                <span className="mt-1 block text-[5rem] leading-[0.82] text-blue-600 sm:text-[6.4rem]">
                  13
                </span>
                <span className="block text-4xl text-pink-500 sm:text-5xl">
                  Years
                </span>
              </h1>

              <div className="mt-2 rotate-[-3deg] rounded-full bg-amber-300 px-6 py-2 text-lg font-black text-slate-950 shadow-[0_8px_0_rgba(255,255,255,0.85)] sm:text-2xl">
                of Digital Excellence
              </div>

              <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-slate-900 sm:text-base">
                For 13 years, Fillip Technologies has empowered businesses with innovative
                software, web, mobile, AI, and digital solutions.
              </p>

              <div className="mt-5 flex w-full max-w-md items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="size-3 rounded-full bg-pink-500" />
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="mt-4 max-w-md text-sm font-bold leading-6 text-slate-950 sm:text-base">
                Thank you for being a part of our journey. Explore our new experience and
                <span className="text-blue-700"> let&apos;s build the future together.</span>
              </p>

              <div className="mt-6 w-full max-w-sm">
                <Link
                  href="/contact"
                  onClick={closeExperience}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-base font-black text-slate-950 shadow-[0_18px_38px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:text-[var(--primary)] sm:text-lg"
                >
                  <Calendar className="size-5 text-pink-500" />
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
