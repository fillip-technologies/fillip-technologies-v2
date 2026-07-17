"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "./data";
import { AI_AUTOMATION_MENU } from "./aiAutomationMenuData";
import AboutMegaMenu from "./AboutMegaMenu";
import IndustriesMegaMenu from "./IndustriesMegaMenu";
import Logo from "./Logo";
import MobileDrawer from "./MobileDrawer";
import MenuButton from "./MenuButton";
import NavDropdownMenu from "./NavDropdownMenu";
import NavLink from "./NavLink";
import SolutionsMegaMenu from "./SolutionsMegaMenu";
import TalkButton from "./TalkButton";
import WhatWeDoMegaMenu from "./WhatWeDoMegaMenu";


function DesktopNavItem({
  label,
  panelTopClass,
  variant,
}: {
  label: string;
  panelTopClass?: string;
  variant?: "full" | "compact";
}) {
  if (label === "About") {
    return <AboutMegaMenu />;
  }

  if (label === "Industries") {
    return <IndustriesMegaMenu />;
  }

  if (label === "What We Do") {
    return <WhatWeDoMegaMenu panelTopClass={panelTopClass} variant={variant} />;
  }

  if (label === "AI & Automation") {
    return <NavDropdownMenu label="AI & Automation" items={AI_AUTOMATION_MENU} />;
  }

  if (label === "Solutions") {
    return <SolutionsMegaMenu />;
  }

  if (label === "Contact") {
    return <NavLink label={label} href="/contact" />;
  }

  return <NavLink label={label} />;
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* GSAP target refs */
  const heroLeftRef = useRef<HTMLElement>(null);
  const heroCenterRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLElement>(null);
  const stickyBarRef = useRef<HTMLDivElement>(null);

  /* Drawer refs */
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerTl = useRef<gsap.core.Timeline | null>(null);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((v) => !v), []);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      gsap.set([heroLeftRef.current, heroCenterRef.current, heroRightRef.current], {
        clearProps: "all",
        force3D: true,
      });
      gsap.set(stickyBarRef.current, {
        yPercent: -120,   // starts above viewport (no layout dependency)
        opacity: 0,
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=200",          // complete transition over 200px of scroll
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      /* Hero exits: all three sections animate simultaneously at position 0 */
      tl.to(heroLeftRef.current, { x: -140, opacity: 0, ease: "power2.inOut", duration: 0.55 }, 0)
        .to(heroCenterRef.current, { y: -50, opacity: 0, ease: "power2.inOut", duration: 0.55 }, 0)
        .to(heroRightRef.current, { x: 140, opacity: 0, ease: "power2.inOut", duration: 0.55 }, 0)
        /* Sticky enters at 40% through â€” slight overlap removes the empty gap */
        .to(stickyBarRef.current, { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.6 }, 0.4);

      /*
       * Pointer-events: swap at visual midpoint so only
       * the visible navbar receives clicks/taps.
       * Direct DOM mutation â€” zero React re-render.
       */
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top+=100 top",
        invalidateOnRefresh: true,
        onEnter: () => swapPointerEvents(true),
        onLeaveBack: () => swapPointerEvents(false),
      });

      function swapPointerEvents(stickyActive: boolean) {
        // hero wrapper â€” we climb up from heroLeftRef
        const heroWrap = heroLeftRef.current?.closest<HTMLDivElement>("[data-hero-wrap]");
        if (heroWrap) heroWrap.style.pointerEvents = stickyActive ? "none" : "auto";
        if (stickyBarRef.current) stickyBarRef.current.style.pointerEvents = stickyActive ? "auto" : "none";
      }
    });

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    /* Build timeline once â€” play / reverse it on toggle */
    drawerTl.current = gsap.timeline({ paused: true })
      .to(overlayRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3, ease: "none" }, 0)
      .fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" },
        0
      );

    return () => { drawerTl.current?.kill(); };
  }, []);

  /* Play / reverse drawer on state change */
  useEffect(() => {
    if (!drawerTl.current) return;
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      drawerTl.current.play();
    } else {
      document.body.style.overflow = "";
      drawerTl.current.reverse();
    }
  }, [drawerOpen]);

  /* Close drawer on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) closeDrawer(); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [closeDrawer]);


  return (
    <>

      <header className="fixed top-0 left-0 w-full z-[900] pointer-events-none">


        <div
          data-hero-wrap
          className="pointer-events-auto w-full px-10 pt-8 hidden lg:block"
        >
          <div className="mx-auto flex max-w-[1600px] items-center">

            {/* Left links */}
            <nav ref={heroLeftRef} className="flex flex-1 items-center justify-end gap-10 pr-16 will-change-transform">
              {NAV_LINKS.slice(0, 3).map((l) => (
                <DesktopNavItem
                  key={l}
                  label={l}
                  panelTopClass="top-[120px]"
                  variant="compact"
                />
              ))}
            </nav>

            {/* Center logo + tagline */}
            <div
              ref={heroCenterRef}
              className="flex flex-shrink-0 flex-col items-center will-change-transform"
            >
              <Logo width={260} height={60} />

              <div className="relative mt-2">
                {/* AI Stars */}
                <div className="absolute -top-3 left-6 text-[12px] text-primary ai-star pointer-events-none">
                  ✦
                </div>

                <div className="absolute -top-1 right-1 text-[8px] text-accent ai-star-delayed pointer-events-none">
                  ✧
                </div>

                {/* <p className="text-[12px] uppercase tracking-[0.6em] select-none flex items-center gap-3">
                  <span className="human-ai-text">
                    Human
                  </span>

                  <span className="text-neutral-500">×</span>

                  <span className="human-ai-text">
                    Intelligence
                  </span>
                </p> */}
              </div>
            </div>

            {/* Right links + CTA */}
            <nav ref={heroRightRef} className="flex flex-1 items-center justify-start gap-10 pl-16 will-change-transform">
              {NAV_LINKS.slice(3).map((l) => <DesktopNavItem key={l} label={l} />)}
              <div className="ml-auto">
                <TalkButton />
              </div>
            </nav>

          </div>
        </div>


        <div
          ref={stickyBarRef}
          className="
            absolute top-0 left-0 w-full
            pt-3 px-4
            pointer-events-none
            will-change-transform
            /* Mobile override: always visible, pointer-events on */
            lg:[pointer-events:none]
            [pointer-events:auto]
          "
          style={{
            /* On mobile the GSAP yPercent:-120 never fires (desktop-only effect),
               but we also forcibly reset it via CSS so mobile never inherits it. */
          }}
        >
          <div
            className="
              max-w-7xl mx-auto flex items-center justify-between
              min-h-[64px] px-6 md:px-8 rounded-full
              bg-card/75 backdrop-blur-xl
              border border-card/50
              shadow-[0_6px_32px_color-mix(in_srgb,var(--foreground)_9%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--card)_70%,transparent)]
            "
          >
            {/* Logo â€” always left */}
            <Logo width={150} height={42} />

            {/* Desktop centre links */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9 mx-auto">
              {NAV_LINKS.map((l) => (
                <DesktopNavItem key={l} label={l} panelTopClass="top-[84px]" variant="full" />
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block flex-shrink-0">
              <TalkButton />
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden">
              <MenuButton open={drawerOpen} onClick={toggleDrawer} />
            </div>
          </div>
        </div>

      </header>



      <MobileDrawer
        drawerOpen={drawerOpen}
        overlayRef={overlayRef}
        drawerRef={drawerRef}
        closeDrawer={closeDrawer}
      />
    </>
  );
}
