"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const POPUP_EXPIRES_AT = new Date("2026-08-15T23:59:59+05:30").getTime();

export default function IndependenceDayPopup() {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(() => Date.now() <= POPUP_EXPIRES_AT);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePopup, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[998] flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          onClick={closePopup}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Independence Day announcement"
            className="relative w-full max-w-[560px] overflow-hidden rounded-lg bg-white shadow-[0_24px_90px_rgba(15,23,42,0.35)]"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", duration: 0.38, bounce: 0.16 }
            }
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-white/95 text-slate-950 shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label="Close Independence Day popup"
            >
              <X size={22} strokeWidth={2.5} />
            </button>

            <Image
              src="/images/independence-day-pop-up.jpeg"
              alt="Independence Day celebration"
              width={1080}
              height={1080}
              priority
              className="block h-auto max-h-[86vh] w-full object-contain"
            />
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
