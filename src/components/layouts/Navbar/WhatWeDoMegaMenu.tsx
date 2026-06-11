"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import NavSubmenuLink from "./NavSubmenuLink";
import { WHAT_WE_DO_MENU } from "./whatWeDoMegaMenuData";
import type { MegaMenuItem } from "./whatWeDoMegaMenuData";

type WhatWeDoMegaMenuProps = {
  panelTopClass?: string;
  variant?: "full" | "compact";
};

function BranchItems({ items }: { items: MegaMenuItem[] }) {
  return (
    <ul className="mt-4 space-y-3 border-l border-heading/12 pl-3">
      {items.map((item) => (
        <li key={item.label}>
          <NavSubmenuLink item={item} />
        </li>
      ))}
    </ul>
  );
}

export default function WhatWeDoMegaMenu({
  panelTopClass = "top-[92px]",
  variant = "full",
}: WhatWeDoMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const columns = WHAT_WE_DO_MENU;
  const isHeroMenu = variant === "compact";

  useEffect(() => {
    const closeOnScroll = () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setOpen(false);
    };

    window.addEventListener("scroll", closeOnScroll, { passive: true });

    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      window.removeEventListener("scroll", closeOnScroll);
    };
  }, []);

  const showMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const hideMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const panel = (
    <div
      onMouseEnter={showMenu}
      onMouseLeave={hideMenu}
      className={`
        fixed left-1/2 z-[940]
        ${isHeroMenu ? "w-[min(1088px,calc(100vw-48px))]" : "w-[min(1148px,calc(100vw-32px))]"}
        -translate-x-1/2 transition-all duration-200
        ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}
        ${panelTopClass}
      `}
    >
      <div
        className={`
          grid grid-cols-3 rounded-lg border border-card/55
          bg-card/72
          text-heading shadow-[0_22px_64px_color-mix(in_srgb,var(--heading)_16%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--card)_75%,transparent)] backdrop-blur-xl
          ${isHeroMenu ? "min-h-[430px] gap-12 px-8 py-7" : "min-h-[500px] gap-14 px-8 py-8 lg:px-10"}
        `}
      >
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className={isHeroMenu ? "space-y-5" : "space-y-6"}>
            {column.map((group) => (
              <section key={group.title}>
                <button
                  type="button"
                  className={`
                    block text-left font-medium leading-7 tracking-normal text-heading transition-colors hover:text-body
                    ${isHeroMenu ? "text-[18px]" : "text-[19px]"}
                  `}
                >
                  {group.title}
                </button>
                {group.items ? <BranchItems items={group.items} /> : null}
              </section>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div onMouseEnter={showMenu} onMouseLeave={hideMenu}>
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
        <span className="whitespace-nowrap">What We Do</span>
        <ChevronDown
          size={17}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {typeof document !== "undefined" ? createPortal(panel, document.body) : null}
    </div>
  );
}
