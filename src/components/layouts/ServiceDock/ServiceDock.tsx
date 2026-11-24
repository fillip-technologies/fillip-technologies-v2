"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { normalizePath, useDockMatch, type DockGroup, type DockItem } from "./dockSources";

/**
 * Service dock — a left-edge tab that opens a panel of every page in the same
 * nav menu (What We Do, AI & Automation, Solutions, Industries), so a visitor
 * can jump to a sibling page without reopening the navbar.
 *
 * - Vertically centred tab on the left edge. Mouse: hover or click opens the
 *   panel. Touch: tap opens it over a scrim.
 * - Menus with categories show an accordion (current category open); flat
 *   menus show a single list.
 * - Mounted once in the site layout, right after the page content: it shows
 *   once the hero has scrolled away and hides when the footer area arrives.
 * - Renders nothing when the current URL isn't in one of those menus.
 */

const EASE_OUT: [number, number, number, number] = [0.32, 0.72, 0, 1];

// The nudge bubble shows once per browser session, not on every page.
const NUDGE_KEY = "fillip:service-dock-nudged";
const wasNudged = () => {
  try {
    return sessionStorage.getItem(NUDGE_KEY) === "1";
  } catch {
    return false;
  }
};
const markNudged = () => {
  try {
    sessionStorage.setItem(NUDGE_KEY, "1");
  } catch {
    /* storage blocked — the bubble may just show again */
  }
};

export default function ServiceDock() {
  const pathname = normalizePath(usePathname() ?? "");
  const match = useDockMatch(pathname);
  const hasMatch = Boolean(match);

  const [open, setOpen] = useState(false);
  const [openedBy, setOpenedBy] = useState<"hover" | "click">("click");
  // Accordion choice, tagged with the path it was made on so it resets by
  // itself after a navigation. `slug: null` = everything collapsed.
  const [expanded, setExpanded] = useState<{ slug: string | null; on: string } | null>(null);
  const expandedSlug = expanded?.on === pathname ? expanded.slug : match?.group.slug;

  const sentinelRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const nudgeTimer = useRef<number | undefined>(undefined);
  const panelId = useId();

  // Attention cues: a pulsing dot until the dock is first opened, and a one-off
  // "Psst…" bubble beside the tab.
  const [discovered, setDiscovered] = useState(false);
  const [nudge, setNudge] = useState(false);

  const openPanel = useCallback((by: "hover" | "click") => {
    window.clearTimeout(nudgeTimer.current);
    setOpenedBy(by);
    setOpen(true);
    setNudge(false);
    setDiscovered(true);
    markNudged();
  }, []);

  const close = useCallback(() => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    setOpen(false);
    setExpanded(null); // reopen on the current page's category
  }, []);

  /* ---------- show only between the hero and the footer ---------- */
  // Past the hero: the visitor has scrolled most of a screen down.
  const subscribeScroll = useCallback(
    (onChange: () => void) => {
      if (!hasMatch) return () => {};
      window.addEventListener("scroll", onChange, { passive: true });
      window.addEventListener("resize", onChange);
      return () => {
        window.removeEventListener("scroll", onChange);
        window.removeEventListener("resize", onChange);
      };
    },
    [hasMatch]
  );
  const pastHero = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > window.innerHeight * 0.85,
    () => false
  );

  // Before the footer: the sentinel (which sits right after the page content)
  // hasn't risen above a line ~55% down the viewport yet.
  const [beforeEnd, setBeforeEnd] = useState(true);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) =>
        setBeforeEnd(entry.isIntersecting || entry.boundingClientRect.top > window.innerHeight),
      { rootMargin: "-55% 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMatch]);

  const visible = pastHero && beforeEnd;
  const isOpen = open && visible;
  const showHandle = visible && !isOpen;

  // First time the tab slides in: wait a beat, then show the bubble briefly.
  useEffect(() => {
    if (!showHandle) return;
    const t = window.setTimeout(() => {
      if (wasNudged()) return;
      markNudged();
      setNudge(true);
      nudgeTimer.current = window.setTimeout(() => setNudge(false), 6500);
    }, 1400);
    return () => window.clearTimeout(t);
  }, [showHandle]);

  /* ---------- dismiss: Esc + outside press ---------- */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      handleRef.current?.focus();
    };
    const onPress = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || handleRef.current?.contains(t)) return;
      close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPress);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPress);
    };
  }, [isOpen, close]);

  // Opened on purpose (click / keyboard): move focus into the panel.
  useEffect(() => {
    if (isOpen && openedBy === "click") panelRef.current?.focus({ preventScroll: true });
  }, [isOpen, openedBy]);

  useEffect(
    () => () => {
      window.clearTimeout(openTimer.current);
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(nudgeTimer.current);
    },
    []
  );

  if (!match) return null;

  const { source, group: currentGroup, item: currentItem } = match;
  const total = source.groups.reduce((n, g) => n + g.items.length, 0);
  const flat = source.groups.length === 1;
  const HandleIcon = currentItem.icon ?? currentGroup.icon;

  /* ---------- hover intent (mouse only) ---------- */
  const onHandleEnter = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => openPanel("hover"), 140);
  };
  const onHandleLeave = () => window.clearTimeout(openTimer.current);
  const onPanelEnter = () => window.clearTimeout(closeTimer.current);
  const onPanelLeave = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse" || openedBy !== "hover") return;
    closeTimer.current = window.setTimeout(close, 280);
  };
  const onHandleClick = () => {
    window.clearTimeout(openTimer.current);
    if (isOpen) return close();
    openPanel("click");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div ref={sentinelRef} aria-hidden />

      {/* ---------- Handle ---------- */}
      <div className="pointer-events-none fixed inset-y-0 left-0 z-40 flex items-center">
        <motion.button
          ref={handleRef}
          type="button"
          aria-label={`Explore more ${source.noun}`}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-hidden={!showHandle}
          tabIndex={showHandle ? 0 : -1}
          onClick={onHandleClick}
          onPointerEnter={onHandleEnter}
          onPointerLeave={onHandleLeave}
          initial={false}
          animate={showHandle ? { x: 0, opacity: 1 } : { x: "-130%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          className={cn(
            // Tab glued to the left edge, vertically centred (slimmer on phones).
            "group flex flex-col items-center gap-2.5 rounded-r-2xl border border-l-0 border-border/70 bg-card/85 px-1.5 py-2.5 text-foreground outline-none backdrop-blur-xl",
            "shadow-[0_12px_36px_-14px_color-mix(in_srgb,var(--foreground)_32%,transparent)]",
            "transition-[padding] duration-300 focus-visible:ring-2 focus-visible:ring-ring",
            "md:gap-3 md:px-2 md:py-3 md:hover:pl-3",
            showHandle ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          <span className="relative grid size-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_6px_16px_-6px_color-mix(in_srgb,var(--primary)_80%,transparent)] md:size-8">
            <HandleIcon className="size-3.5 md:size-4" aria-hidden />
            {!discovered && (
              <span aria-hidden className="absolute -right-0.5 -top-0.5 flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full border-2 border-card bg-emerald-500" />
              </span>
            )}
          </span>
          <span className="rotate-180 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors [writing-mode:vertical-rl] group-hover:text-primary md:text-[11px]">
            Explore more
          </span>
          <ChevronRight
            className="size-3.5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary md:size-4"
            aria-hidden
          />
        </motion.button>

        {/* One-off nudge bubble beside the tab */}
        <AnimatePresence>
          {nudge && showHandle && (
            <motion.button
              key="nudge"
              type="button"
              onClick={() => openPanel("click")}
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -6, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="pointer-events-auto relative ml-3 w-max max-w-[220px] origin-left rounded-2xl border border-border/70 bg-card px-4 py-3 text-left shadow-[0_18px_48px_-18px_color-mix(in_srgb,var(--foreground)_40%,transparent)] outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden
                className="absolute -left-[7px] top-1/2 size-3 -translate-y-1/2 rotate-45 border-b border-l border-border/70 bg-card"
              />
              <span className="relative block text-sm font-semibold text-foreground">
                {source.teaser(currentGroup.slug)}
              </span>
              <span className="relative mt-0.5 flex items-center gap-1 text-xs font-semibold text-primary">
                Peek at {Math.max(total - 1, 0)} more {source.noun}
                <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- Scrim (touch layouts) ---------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="scrim"
            aria-hidden
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[870] bg-black/25 backdrop-blur-[2px] xl:hidden"
          />
        )}
      </AnimatePresence>

      {/* ---------- Panel ---------- */}
      <AnimatePresence>
        {isOpen && (
          <div
            key="panel"
            // Symmetric padding keeps the panel truly centred and clear of the navbar.
            className="pointer-events-none fixed inset-y-0 left-0 z-[880] flex items-center py-24 pl-3"
          >
            <motion.div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-label={source.eyebrow}
              tabIndex={-1}
              onPointerEnter={onPanelEnter}
              onPointerLeave={onPanelLeave}
              initial={{ opacity: 0, x: -28, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="pointer-events-auto flex max-h-full w-[min(340px,calc(100vw-24px))] origin-left flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/90 text-card-foreground shadow-[0_30px_80px_-24px_color-mix(in_srgb,var(--foreground)_40%,transparent)] outline-none backdrop-blur-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 px-5 pb-4 pt-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {source.eyebrow}
                  </p>
                  <p className="mt-1.5 text-lg font-bold leading-tight tracking-tight text-foreground">
                    {source.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{source.subtitle(total)}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => {
                    close();
                    handleRef.current?.focus();
                  }}
                  className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
              <div className="mx-5 h-px shrink-0 bg-border/70" />

              <nav
                aria-label={source.eyebrow}
                className="scrollbar-none min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
              >
                {flat ? (
                  <ul className="flex flex-col gap-0.5">
                    {currentGroup.items.map((item) => (
                      <li key={item.href}>
                        <FlatLink
                          item={item}
                          fallbackIcon={currentGroup.icon}
                          active={item.href === pathname}
                          onNavigate={close}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col gap-0.5">
                    {source.groups.map((g) => (
                      <AccordionGroup
                        key={g.slug}
                        group={g}
                        listId={`${panelId}-${g.slug}`}
                        expanded={g.slug === expandedSlug}
                        isCurrent={g.slug === currentGroup.slug}
                        pathname={pathname}
                        onToggle={() =>
                          setExpanded({ slug: g.slug === expandedSlug ? null : g.slug, on: pathname })
                        }
                        onNavigate={close}
                      />
                    ))}
                  </ul>
                )}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

/* ---------------- Panel rows ---------------- */

function ActiveDot() {
  return (
    <span className="relative flex size-2 shrink-0" title="You're here">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50" />
      <span className="relative inline-flex size-2 rounded-full bg-primary" />
    </span>
  );
}

function HoverArrow({ group }: { group: "item" | "row" }) {
  return (
    <ArrowRight
      className={cn(
        "size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200",
        group === "item"
          ? "group-hover/item:translate-x-0 group-hover/item:opacity-100"
          : "group-hover/row:translate-x-0 group-hover/row:opacity-100"
      )}
      aria-hidden
    />
  );
}

/** A row in a flat menu (AI & Automation, Industries): icon tile + label. */
function FlatLink({
  item,
  fallbackIcon: FallbackIcon,
  active,
  onNavigate,
}: {
  item: DockItem;
  fallbackIcon: DockGroup["icon"];
  active: boolean;
  onNavigate: () => void;
}) {
  const Icon = item.icon ?? FallbackIcon;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group/row flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
        active ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted/60 hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-xl transition-colors",
          active
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground group-hover/row:text-foreground"
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {active ? <ActiveDot /> : <HoverArrow group="row" />}
    </Link>
  );
}

/** A category in a grouped menu (What We Do, Solutions): header + its pages. */
function AccordionGroup({
  group,
  listId,
  expanded,
  isCurrent,
  pathname,
  onToggle,
  onNavigate,
}: {
  group: DockGroup;
  listId: string;
  expanded: boolean;
  isCurrent: boolean;
  pathname: string;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const Icon = group.icon;
  return (
    <li>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={listId}
        onClick={onToggle}
        className={cn(
          "group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
          expanded ? "bg-muted/80 text-foreground" : "text-foreground/80 hover:bg-muted/60 hover:text-foreground"
        )}
      >
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-xl transition-colors",
            isCurrent
              ? "bg-primary text-primary-foreground"
              : expanded
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground group-hover:text-foreground"
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="min-w-0 flex-1 truncate">{group.label}</span>
        <span className="text-xs font-medium tabular-nums text-muted-foreground">{group.items.length}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={listId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <ul className="mb-2 ml-[29px] mt-1 border-l border-border pl-3">
              {group.items.map((item) => {
                const active = item.href === pathname;
                return (
                  <li key={item.href} className="relative">
                    {active && (
                      <span
                        aria-hidden
                        className="absolute -left-[13px] top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                      />
                    )}
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={onNavigate}
                      className={cn(
                        "group/item flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <span className="truncate">{item.label}</span>
                      {active ? <ActiveDot /> : <HoverArrow group="item" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
