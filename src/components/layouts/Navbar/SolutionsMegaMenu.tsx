"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SOLUTIONS_MENU, buildSolutionsColumns } from "./solutionsMegaMenuData";
import type { SolutionMenuItem } from "./solutionsMegaMenuData";
import { useSolutionsCategories } from "./useSolutionsCategories";

function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function SolutionMegaMenuItem({ item }: { item: SolutionMenuItem }) {
  const href = item.href ?? "#";
  const className = `
    group/item relative flex w-full items-center justify-between rounded-xl border border-transparent
    px-4 py-2.5 text-[15px] leading-6 text-slate-700 transition-all duration-200
    hover:border-[#105278]/10 hover:bg-[#105278]/[0.06] hover:text-[#105278]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#105278]/30
  `;
  const content = (
    <>
      <span>{item.label}</span>
      <ArrowRight
        size={15}
        className="
          shrink-0 -translate-x-1 text-[#105278] opacity-0 transition-all duration-200
          group-hover/item:translate-x-0 group-hover/item:opacity-100
        "
        aria-hidden="true"
      />
    </>
  );

  if (href === "#") {
    return (
      <button type="button" className={className}>
        {content}
      </button>
    );
  }

  if (isInternalRoute(href)) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}

const PANEL_MAX_WIDTH = 1040;
const VIEWPORT_GUTTER = 16;

export default function SolutionsMegaMenu() {
  const [open, setOpen] = useState(false);
  // Panel offset from the trigger, so the panel stays inside the viewport
  // even when the trigger sits right of centre.
  const [panelLeft, setPanelLeft] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Published categories drive the menu; fall back to the static menu until they
  // load (or if none/failed).
  const categories = useSolutionsCategories();
  const columns =
    categories && categories.length ? buildSolutionsColumns(categories) : SOLUTIONS_MENU;

  useEffect(() => {
    const closeOnScroll = () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setOpen(false);
    };

    window.addEventListener("scroll", closeOnScroll, { passive: true });
    // The panel position is measured on open, so close it if the window size changes.
    window.addEventListener("resize", closeOnScroll, { passive: true });

    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      window.removeEventListener("scroll", closeOnScroll);
      window.removeEventListener("resize", closeOnScroll);
    };
  }, []);

  /** Centre the panel under the trigger, then clamp it inside the viewport. */
  const positionPanel = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const width = Math.min(PANEL_MAX_WIDTH, viewportWidth - VIEWPORT_GUTTER * 2);
    const centred = rect.left + rect.width / 2 - width / 2;
    const clamped = Math.min(Math.max(centred, VIEWPORT_GUTTER), viewportWidth - VIEWPORT_GUTTER - width);
    setPanelLeft(clamped - rect.left);
  };

  const showMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!open) positionPanel();
    setOpen(true);
  };

  const hideMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div ref={wrapRef} className="relative shrink-0" onMouseEnter={showMenu} onMouseLeave={hideMenu}>
      <button
        type="button"
        className="
          flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-[16px]
          tracking-wide transition-colors hover:bg-card/45
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
        "
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={showMenu}
      >
        <span className="whitespace-nowrap">Solutions</span>
        <ChevronDown
          size={17}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={showMenu}
            onMouseLeave={hideMenu}
            style={{ left: panelLeft }}
            className="absolute top-full z-[940] w-[min(1040px,calc(100vw-32px))] pt-4"
          >
            <div
              className="
                grid overflow-hidden rounded-[24px] border border-slate-200/80 bg-white
                text-heading shadow-[0_28px_80px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.8)]
                md:grid-cols-2
              "
            >
              {columns.map((column, columnIndex) => (
                <section
                  key={column.title}
                  className={`
                    p-8
                    ${columnIndex > 0 ? "border-t border-slate-200 md:border-l md:border-t-0" : ""}
                  `}
                >
                  <div className="mb-6 border-b border-slate-200 pb-5">
                    <h3 className="text-[19px] font-semibold leading-7 text-slate-950">
                      {column.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {column.description}
                    </p>
                  </div>

                  <div className={`grid gap-1 ${column.children.length > 5 ? "sm:grid-cols-2 sm:gap-x-4" : ""}`}>
                    {column.children.map((item) => (
                      <SolutionMegaMenuItem key={item.label} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
