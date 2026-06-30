"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import NavSubmenuLink from "./NavSubmenuLink";
import type { MegaMenuItem } from "./types";

type NavDropdownMenuProps = {
  label: string;
  items: readonly (string | MegaMenuItem)[];
  align?: "center" | "left";
  widthClass?: string;
};

export default function NavDropdownMenu({
  label,
  items,
  align = "center",
  widthClass = "w-[min(380px,calc(100vw-32px))]",
}: NavDropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        absolute top-full z-[940] ${widthClass} pt-3
        ${align === "left" ? "left-0" : "left-1/2 -translate-x-1/2"}
        transition-all duration-200
        ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}
      `}
    >
      <div
        className="
          rounded-lg border border-card/70 bg-card/95 px-5 py-4
          text-heading shadow-[0_22px_64px_color-mix(in_srgb,var(--heading)_16%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--card)_75%,transparent)]
          backdrop-blur-xl
        "
      >
        <div className="space-y-1">
          {items.map((item) =>
            typeof item === "string" ? (
              <NavSubmenuLink key={item} label={item} />
            ) : (
              <NavSubmenuLink key={item.href ?? item.label} item={item} />
            ),
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative shrink-0" onMouseEnter={showMenu} onMouseLeave={hideMenu}>
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
        <span className="whitespace-nowrap">{label}</span>
        <ChevronDown
          size={17}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {panel}
    </div>
  );
}
