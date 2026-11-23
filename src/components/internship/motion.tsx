"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";

/*
 * Motion helpers for the internship page. Patterns follow the National
 * Internship Portal: sections fade up out of a blur, cards pop in one after
 * another, a thin progress bar tracks the scroll. MotionRoot makes every
 * animation respect the visitor's "reduce motion" setting.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades content up from below (opacity + transform only, so it stays smooth). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 42,
  onMount = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate on first render instead of when scrolled into view (for the hero). */
  onMount?: boolean;
}) {
  const target = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(onMount ? { animate: target } : { whileInView: target, viewport: { once: true, amount: 0.25 } })}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Scales a card in; pass the item index to stagger a grid. */
export function PopIn({
  children,
  className,
  index = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "li";
}) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, scale: 0.86, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE, delay: Math.min(index, 8) * 0.07 }}
    >
      {children}
    </Comp>
  );
}

/** Thin bar fixed to the top of the window that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[920] h-[3px] origin-left bg-gradient-to-r from-primary via-[#0ea5e9] to-[#6366f1] shadow-[0_0_12px_rgba(14,165,233,0.55)]"
    />
  );
}

/** Hand-drawn style underline that draws itself under a word. */
export function DrawUnderline({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 24" preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id="intern-underline" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <motion.path
        d="M4 16 C 70 6, 160 3, 296 11"
        fill="none"
        stroke="url(#intern-underline)"
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
      />
    </svg>
  );
}
