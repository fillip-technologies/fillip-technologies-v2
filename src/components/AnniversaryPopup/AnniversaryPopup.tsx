"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { isAnniversaryActive } from "@/lib/anniversary";
import AnniversaryBadge from "./AnniversaryBadge";
import Fireworks from "./Fireworks";
import GoldParticles from "./GoldParticles";
import SmokeEffect from "./SmokeEffect";

type Phase = "idle" | "open" | "closing" | "done";

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
            className="relative w-full max-w-[560px] overflow-hidden rounded-[32px] border border-white/55 bg-white/78 px-7 py-8 text-center shadow-[0_32px_90px_rgba(8,28,46,0.24)] backdrop-blur-2xl sm:px-10 sm:py-10"
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
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/65 bg-white/70 text-slate-500 shadow-sm backdrop-blur transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50"
              aria-label="Close anniversary celebration"
            >
              <X size={17} />
            </button>

            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
              aria-hidden="true"
            />
            <div
              className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-28 -right-20 h-64 w-64 rounded-full bg-blue-400/18 blur-3xl"
              aria-hidden="true"
            />
            <GoldParticles />

            <div className="relative z-10 flex flex-col items-center">
              <div className="rounded-3xl border border-white/70 bg-white/70 px-6 py-4 shadow-[0_16px_38px_rgba(15,23,42,0.08)]">
                <Image
                  src="/images/logo/fillip-technologies.png"
                  alt="Fillip Technologies"
                  width={260}
                  height={60}
                  priority
                  style={{ height: "auto" }}
                />
              </div>

              <div className="mt-7">
                <AnniversaryBadge />
              </div>

              <h1 className="mt-7 text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Celebrating 13 Years of Excellence
              </h1>

              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600 sm:text-lg">
                Thank you for being a part of our incredible journey.
              </p>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Welcome to the New Fillip Technologies Experience
              </p>
            </div>
          </motion.section>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
