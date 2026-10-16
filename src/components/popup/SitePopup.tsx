"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { SitePopup as SitePopupData } from "@/server/content/global-popup";

const DAY_MS = 24 * 60 * 60 * 1000;
// Remembered per image, so uploading a new ad shows it again to returning visitors.
const seenKey = (image: string) => `fillip:popup-seen:${image}`;

/** Whether the admin's "how often" setting allows showing the popup now. */
function shouldShow(popup: SitePopupData): boolean {
  if (popup.frequency === "every") return true;
  try {
    const key = seenKey(popup.image);
    if (popup.frequency === "session") return !sessionStorage.getItem(key);
    const last = Number(localStorage.getItem(key) || 0);
    if (popup.frequency === "once") return !last;
    return Date.now() - last > DAY_MS; // "day"
  } catch {
    return true; // storage blocked (private mode etc.) — just show it
  }
}

/** Record that the popup was shown, for the non-"every" frequencies. */
function markShown(popup: SitePopupData) {
  if (popup.frequency === "every") return;
  try {
    const key = seenKey(popup.image);
    if (popup.frequency === "session") sessionStorage.setItem(key, "1");
    else localStorage.setItem(key, String(Date.now()));
  } catch {
    // ignore
  }
}

/**
 * Site-wide popup ad managed under Content → Popup Ad: an image that links
 * somewhere. How often it shows and the delay before it opens are admin
 * settings. Decided after mount (pages are ISR-cached and storage is
 * client-only), so server and client markup always match.
 */
export default function SitePopup({ popup }: { popup: SitePopupData | null }) {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!popup || !shouldShow(popup)) return;
    const id = setTimeout(() => {
      setIsOpen(true);
      markShown(popup);
    }, popup.delay * 1000);
    return () => clearTimeout(id);
  }, [popup]);

  const closePopup = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePopup, isOpen]);

  if (!popup) return null;

  const external = /^https?:\/\//i.test(popup.link);
  const image = (
    // Plain <img>: admins can paste any image URL, which next/image would reject.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={popup.image}
      alt="Fillip Technologies offer"
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
  );

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm"
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
            aria-label="Announcement"
            // Fixed square frame (standard ad size): 600px max, shrinking to fit
            // narrow or short screens. The image covers it edge to edge.
            className="relative size-[min(600px,92vw,85vh)] overflow-hidden rounded-xl bg-slate-100 shadow-[0_24px_90px_rgba(15,23,42,0.35)]"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.38, bounce: 0.16 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-white/95 text-slate-950 shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close popup"
            >
              <X size={22} strokeWidth={2.5} />
            </button>

            {popup.link ? (
              <a
                className="absolute inset-0 block"
                href={popup.link}
                onClick={closePopup}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {image}
              </a>
            ) : (
              image
            )}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
