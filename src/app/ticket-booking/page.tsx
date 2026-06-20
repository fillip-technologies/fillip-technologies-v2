"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import {
  ArrowRight,
  ArrowUpRight,
  QrCode,
  Ticket,
  BarChart3,
  ScanLine,
  ShieldCheck,
  Calendar,
  Building2,
  Landmark,
  Trees,
  Castle,
  Sparkles,
  Globe,
  Layers,
  Cpu,
  CheckCircle2,
  Users,
  TrendingUp,
  CreditCard,
  Activity,
  Clock,
  ChevronRight,
} from "lucide-react";

const patnaZoo = "/images/patna-zoo-portal.png";
const rajgirDash = "/images/rajgir-safari-dashboard.jpg";
const analyticsDash = "/images/analytics-dashboard.jpg";



/* ------------------------------------------------------------------ */
/* Animation primitives                                                */
/* ------------------------------------------------------------------ */

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const stagger = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-80px" },
  transition: { staggerChildren: 0.08 },
};

/* ------------------------------------------------------------------ */

export default function TicketingService() {
  return (
    <>
      <Navbar />
      <main className="ticket-page min-h-screen overflow-x-hidden bg-background text-ink">
        <Hero />
        <TrustBar />
        <WhatWeBuild />
        <CaseStudyPatna />
        <CaseStudyRajgir />
        <Process />
        <Industries />
        <WhyChoose />
        <DashboardShowcase />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_top,oklch(0.62_0.11_220/0.18),transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <motion.div {...fadeUp} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-ink-muted">
            <span className="size-1.5 rounded-full bg-primary-glow animate-pulse" />
            Custom Ticketing Platform Development
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="mt-6 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.98] tracking-tight"
          >
            Build modern <em className="italic text-gradient">ticketing platforms</em> for public attractions.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
            className="mt-7 text-lg text-ink-muted max-w-xl leading-relaxed"
          >
            Fillip Technologies develops custom ticketing systems that streamline online booking,
            counter ticket sales, QR-based entry validation and visitor management operations.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.18 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium shadow-elevated hover:shadow-glow transition-all"
            >
              Discuss Your Project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-6 py-3.5 text-sm font-medium hover:bg-surface transition-colors"
            >
              View Our Work
            </a>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.28 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { k: "50K+", v: "Tickets Processed" },
              { k: "2+", v: "Live Deployments" },
              { k: "24/7", v: "Operational Support" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl tracking-tight">{s.k}</div>
                <div className="text-xs text-ink-muted mt-1">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Dashboard composition */}
        <div className="lg:col-span-6 relative h-[560px]">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="relative w-full h-full">
      {/* Halo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,oklch(0.62_0.11_220/0.25),transparent_60%)]" />

      {/* Main panel: Online Ticket Booking */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-6 right-2 w-[88%] rounded-2xl bg-surface-elevated shadow-elevated border border-border overflow-hidden glow-ring"
      >
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-surface">
          <div className="size-2.5 rounded-full bg-[oklch(0.7_0.18_25)]" />
          <div className="size-2.5 rounded-full bg-[oklch(0.85_0.15_85)]" />
          <div className="size-2.5 rounded-full bg-[oklch(0.78_0.15_150)]" />
          <div className="ml-3 text-[11px] font-mono text-ink-muted">tickets.fillip.dev</div>
        </div>
        <div className="p-5 grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <div className="text-[11px] uppercase tracking-wider text-ink-muted">Online Ticket Booking</div>
            <div className="mt-1 font-display text-2xl">Reserve your visit</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Field label="Date" value="Sat, 21 Jun" icon={<Calendar className="size-3.5" />} />
              <Field label="Adults" value="2" />
              <Field label="Children" value="1" />
              <Field label="Slot" value="10:30 AM" icon={<Clock className="size-3.5" />} />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-primary/5 border border-primary/10 px-3 py-2.5">
              <span className="text-xs text-ink-muted">Total</span>
              <span className="font-semibold tabular-nums">₹ 450</span>
            </div>
            <button className="mt-3 w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium">
              Pay & Confirm
            </button>
          </div>
          <div className="col-span-2 rounded-xl bg-surface border border-border p-3 flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">Digital Ticket</div>
            <div className="mt-2 size-24 rounded-md bg-[conic-gradient(at_top_left,#105278,#0a3a55,#2a7aa3,#105278)] grid place-items-center">
              <div className="size-[88%] rounded-sm bg-white grid place-items-center">
                <QrCode className="size-12 text-primary" strokeWidth={1.3} />
              </div>
            </div>
            <div className="mt-2 text-[10px] font-mono text-ink-muted">PZ-39A11C</div>
            <div className="mt-3 w-full hairline-divider" />
            <div className="mt-2 text-[10px] text-ink-muted text-center leading-tight">
              Scan at entry<br />gate to validate
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating: Counter Ticketing */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="absolute bottom-8 left-0 w-[76%] rounded-[1.6rem] border border-cyan-100/10 bg-[#06191f] p-5 text-white shadow-[0_20px_45px_rgba(5,24,30,0.28)] animate-float"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
              <Ticket className="size-4 text-cyan-400" strokeWidth={2} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.08em] text-white/50">Counter POS</div>
              <div className="mt-0.5 text-sm font-semibold leading-none">Window 02 · Live</div>
            </div>
          </div>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">Open</span>
        </div>
        <div className="mt-5 space-y-2 text-sm">
          <Row k="Adult × 4" v="₹ 400" />
          <Row k="Child × 2" v="₹ 100" />
          <Row k="Camera × 1" v="₹ 50" />
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs font-medium text-white/50">Issue Ticket</span>
          <span className="text-2xl font-semibold tabular-nums">₹ 550</span>
        </div>
      </motion.div>

      {/* Floating: Analytics tile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="absolute bottom-2 right-6 w-[44%] rounded-2xl bg-surface-elevated shadow-elevated border border-border p-4 animate-float-slow"
      >
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-wider text-ink-muted">Today · Visitors</div>
          <TrendingUp className="size-3.5 text-emerald-500" />
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-3xl tabular-nums">3,284</span>
          <span className="text-[11px] text-emerald-500 font-medium">+18%</span>
        </div>
        <Sparkline />
        <div className="mt-2 text-[10px] text-ink-muted">Peak 11AM · 524/hr</div>
      </motion.div>

      {/* Floating metric chips */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute -top-3 left-4 surface-glass rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-2 shadow-soft animate-float"
      >
        <ScanLine className="size-3.5 text-primary" /> QR Validated
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75 }}
        className="absolute top-32 -right-2 surface-glass rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-2 shadow-soft animate-float-slow"
      >
        <Activity className="size-3.5 text-primary-glow" /> Real-Time Reporting
      </motion.div>
    </div>
  );
}

function Field({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div className="mt-0.5 text-sm font-medium flex items-center gap-1.5">
        {icon}
        {value}
      </div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium text-white/65">{k}</span>
      <span className="font-semibold tabular-nums text-white/90">{v}</span>
    </div>
  );
}
function Sparkline() {
  return (
    <svg viewBox="0 0 120 32" className="mt-2 w-full h-8">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.11 220)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.62 0.11 220)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 24 L12 20 L24 22 L36 14 L48 16 L60 10 L72 13 L84 6 L96 9 L108 4 L120 7 L120 32 L0 32 Z"
        fill="url(#g1)"
      />
      <path
        d="M0 24 L12 20 L24 22 L36 14 L48 16 L60 10 L72 13 L84 6 L96 9 L108 4 L120 7"
        fill="none"
        stroke="oklch(0.38 0.075 235)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Trust bar                                                           */
/* ------------------------------------------------------------------ */

function TrustBar() {
  const logos = [
    "Patna Zoo", "Rajgir Zoo Safari", "Govt. of Bihar", "Forest Dept.", "Public Venues",
    "Museums", "Heritage Trusts", "Tourist Boards",
  ];
  return (
    <section className="border-y border-border bg-surface/50 py-6 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 flex items-center gap-10">
        <div className="shrink-0 text-xs uppercase tracking-[0.2em] text-ink-muted">
          Trusted by public institutions
        </div>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-12 whitespace-nowrap animate-marquee">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="text-base font-display italic text-ink-muted/80">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What We Build (alternating storytelling, no cards)                 */
/* ------------------------------------------------------------------ */

function WhatWeBuild() {
  const blocks = [
    {
      n: "01",
      title: "Online Ticketing Systems",
      lead: "Conversion-optimized booking flows engineered for high traffic.",
      body: "We architect end-to-end web booking experiences with secure payment gateways, real-time inventory, dynamic pricing rules, and instant digital ticket delivery — built to handle peak holiday surges without breaking.",
      points: ["Payment Gateway", "Inventory & Slots", "Email / SMS Delivery", "Refund Workflows"],
      visual: <OnlineVisual />,
    },
    {
      n: "02",
      title: "Counter Ticketing Solutions",
      lead: "Physical counter POS, fully synchronized with online inventory.",
      body: "Purpose-built counter applications for window operators with barcode printers, cash and digital payments, shift reconciliation, and centralized reporting — so online and offline sales operate as one system.",
      points: ["Window POS", "Printer Integration", "Shift Reconciliation", "Unified Inventory"],
      visual: <CounterVisual />,
      reverse: true,
    },
    {
      n: "03",
      title: "QR-Based Entry Management",
      lead: "Validated entries, anti-fraud scans, real-time gate operations.",
      body: "Each ticket is issued with a cryptographically signed QR. Gate scanners validate against the central platform in milliseconds, prevent duplicate entry, and surface live capacity for operations teams.",
      points: ["Signed QR", "Offline-Safe Scans", "Capacity Control", "Live Gate Feed"],
      visual: <QRVisual />,
    },
  ];
  return (
    <section id="what-we-build" className="relative overflow-hidden py-28 lg:py-36">
      <img
        src="/images/ticket-booking-What.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-5 w-[280px] opacity-70 mix-blend-multiply sm:-top-28 sm:w-[380px] lg:-top-36 lg:w-[500px]"
        style={{
          maskImage: "radial-gradient(ellipse at top right, black 0%, black 30%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at top right, black 0%, black 30%, transparent 72%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-medium">What we build</div>
          <h2 className="mt-4 font-display text-5xl lg:text-6xl leading-[1] tracking-tight">
            A complete ticketing <em className="italic text-gradient">ecosystem</em>, not a single product.
          </h2>
          <p className="mt-5 text-ink-muted text-lg">
            Three tightly integrated layers, engineered together so every ticket — online or at the counter —
            flows through one source of truth.
          </p>
        </motion.div>

        <div className="mt-20 space-y-28">
          {blocks.map((b) => (
            <motion.div
              key={b.n}
              {...fadeUp}
              className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-center ${b.reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
            >
              <div className="lg:col-span-7">{b.visual}</div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 text-xs font-mono text-ink-muted">
                  <span className="text-primary">{b.n}</span>
                  <span className="h-px w-10 bg-border-strong" />
                  Capability
                </div>
                <h3 className="mt-4 font-display text-4xl lg:text-[2.6rem] leading-[1.05] tracking-tight">
                  {b.title}
                </h3>
                <p className="mt-4 text-lg text-ink leading-relaxed">{b.lead}</p>
                <p className="mt-3 text-ink-muted leading-relaxed">{b.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {b.points.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-muted"
                    >
                      <CheckCircle2 className="size-3 text-primary" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OnlineVisual() {
  return (
    <div className="relative aspect-[5/4] rounded-3xl bg-gradient-to-br from-primary/5 via-surface to-primary-glow/10 border border-border p-6 overflow-hidden glow-ring">
      <div className="dot-bg absolute inset-0 opacity-60" />
      <div className="relative h-full grid grid-rows-[auto_1fr] gap-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-ink-muted">/booking</div>
          <span className="text-[10px] rounded-full bg-emerald-500/10 text-emerald-600 px-2 py-0.5">LIVE</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-surface-elevated border border-border p-4 shadow-soft">
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">Step 1</div>
            <div className="mt-1 font-medium">Choose Date & Slot</div>
            <div className="mt-3 grid grid-cols-7 gap-1">
              {Array.from({ length: 21 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded text-[9px] grid place-items-center ${i === 12
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-surface text-ink-muted"
                    }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-surface-elevated border border-border p-4 shadow-soft">
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">Step 2</div>
            <div className="mt-1 font-medium">Visitors</div>
            <div className="mt-3 space-y-2">
              {["Adult", "Child", "Senior"].map((t, i) => (
                <div key={t} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-xs">
                  <span>{t}</span>
                  <span className="font-mono">0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 rounded-xl bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-elevated">
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Secure Payment</div>
              <div className="font-display text-2xl mt-0.5">₹ 1,240 · Razorpay</div>
            </div>
            <CreditCard className="size-6 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CounterVisual() {
  return (
    <div className="relative aspect-[5/4] rounded-3xl bg-surface-dark text-white p-6 overflow-hidden glow-ring">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.62_0.11_220/0.25),transparent_50%)]" />
      <div className="relative h-full grid grid-cols-5 gap-4">
        <div className="col-span-2 rounded-xl bg-white/[0.04] border border-white/10 p-4 flex flex-col">
          <div className="text-[10px] uppercase tracking-wider text-white/50">Counter</div>
          <div className="font-display text-xl mt-0.5">Window 04</div>
          <div className="mt-4 space-y-1.5 text-xs">
            <div className="flex justify-between"><span className="text-white/60">Operator</span><span>R. Kumar</span></div>
            <div className="flex justify-between"><span className="text-white/60">Shift</span><span>09:00 – 17:00</span></div>
            <div className="flex justify-between"><span className="text-white/60">Tickets</span><span className="font-mono">147</span></div>
            <div className="flex justify-between"><span className="text-white/60">Cash</span><span className="font-mono">₹ 18,200</span></div>
          </div>
          <div className="mt-auto rounded-lg bg-primary-glow/10 border border-primary-glow/20 p-2 text-[10px] text-primary-glow text-center">
            ▸ Live sync with online inventory
          </div>
        </div>
        <div className="col-span-3 rounded-xl bg-white/[0.04] border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">New Sale</div>
            <span className="text-[10px] font-mono text-white/50">TXN · 0241</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Adult", "Child", "Senior", "Group", "Camera", "Vehicle"].map((t, i) => (
              <button
                key={t}
                className={`rounded-lg border text-xs py-2.5 ${i < 2 ? "bg-primary border-primary" : "bg-white/[0.03] border-white/10"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 text-xs">
            <Row k="Adult × 3" v="₹ 300" />
            <Row k="Child × 2" v="₹ 100" />
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/60">Print Ticket</span>
            <span className="font-display text-2xl">₹ 400</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QRVisual() {
  return (
    <div className="relative aspect-[5/4] rounded-3xl bg-surface border border-border p-6 overflow-hidden glow-ring">
      <div className="grid-bg absolute inset-0" />
      <div className="relative h-full flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl animate-pulse-ring" />
          <div className="relative size-52 rounded-3xl bg-surface-elevated shadow-elevated border border-border p-5 grid place-items-center">
            <QrCode className="size-32 text-primary" strokeWidth={1.2} />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 text-white text-[10px] font-medium px-2.5 py-1 flex items-center gap-1 shadow-soft">
              <CheckCircle2 className="size-3" /> Validated · 0.12s
            </div>
          </div>
        </div>
        <div className="absolute top-6 left-6 surface-glass rounded-xl p-3 w-44 shadow-soft animate-float">
          <div className="text-[10px] uppercase tracking-wider text-ink-muted">Gate 02</div>
          <div className="mt-0.5 font-mono text-xs">PZ-39A11C</div>
          <div className="mt-1 text-xs text-emerald-600">Entry granted</div>
        </div>
        <div className="absolute bottom-6 right-6 surface-glass rounded-xl p-3 w-44 shadow-soft animate-float-slow">
          <div className="text-[10px] uppercase tracking-wider text-ink-muted">Capacity</div>
          <div className="mt-0.5 font-display text-xl tabular-nums">62%</div>
          <div className="mt-1.5 h-1.5 rounded-full bg-border overflow-hidden">
            <div className="h-full w-[62%] bg-gradient-to-r from-primary to-primary-glow" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Case Study — Patna Zoo                                             */
/* ------------------------------------------------------------------ */

function CaseStudyPatna() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.02, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const tags = [
    "Online Ticket Booking",
    "Visitor Information Management",
    "Secure Booking Flow",
    "Real-Time Pricing",
    "Digital Ticket Preview",
    "Visitor Reporting",
  ];

  return (
    <section id="work" ref={ref} className="relative py-28 lg:py-36 bg-surface/60 border-y border-border overflow-hidden">
      <img
        src="/images/patna-zoo-one.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-[280px] opacity-30 mix-blend-multiply sm:w-[380px] lg:w-[500px]"
        style={{
          maskImage: "radial-gradient(ellipse at top left, black 0%, black 30%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at top left, black 0%, black 30%, transparent 72%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Featured Implementations · 01
          </div>
          <h2 className="mt-4 font-display text-5xl lg:text-6xl leading-[1] tracking-tight">
            Successful ticketing platforms <em className="italic text-gradient">we've delivered</em>.
          </h2>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-12 gap-10 items-center">
          {/* Left content */}
          <div className="lg:col-span-4">
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 text-primary px-3 py-1 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-primary" /> Case Study 01
              </div>
              <h3 className="mt-5 font-display text-4xl lg:text-5xl tracking-tight">Patna Zoo</h3>
              <div className="mt-2 text-sm text-ink-muted">E-Ticketing Platform · Bihar, India</div>

              <p className="mt-6 text-ink leading-relaxed">
                Fillip Technologies developed and deployed a complete e-ticketing ecosystem for Patna Zoo,
                enabling visitors to book tickets online, manage reservations digitally and streamline
                visitor entry operations.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-background px-3 py-1.5 text-xs font-medium">
                <Sparkles className="size-3.5" />
                Built & Maintained by Fillip Technologies
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { k: "50K+", v: "Tickets Processed" },
                  { k: "100%", v: "Digital Booking" },
                  { k: "QR", v: "Validation Workflow" },
                  { k: "Live", v: "Visitor Platform" },
                ].map((s) => (
                  <div key={s.v} className="rounded-xl border border-border bg-surface-elevated p-4">
                    <div className="font-display text-2xl tracking-tight">{s.k}</div>
                    <div className="text-xs text-ink-muted mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right showcase — laptop mockup with screenshot */}
          <div className="lg:col-span-8 relative">
            <motion.div style={{ scale, y }} className="relative">
              {/* Glow */}
              <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,oklch(0.62_0.11_220/0.25),transparent_70%)] blur-2xl" />

              {/* Laptop frame */}
              <div className="relative rounded-[1.5rem] bg-surface-dark p-3 shadow-glow border border-white/10">
                <div className="rounded-xl overflow-hidden bg-surface-elevated border border-white/5">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-surface border-b border-border">
                    <div className="size-2 rounded-full bg-[oklch(0.7_0.18_25)]" />
                    <div className="size-2 rounded-full bg-[oklch(0.85_0.15_85)]" />
                    <div className="size-2 rounded-full bg-[oklch(0.78_0.15_150)]" />
                    <div className="mx-auto text-[10px] font-mono text-ink-muted">patnazoo.bihar.gov.in/book</div>
                  </div>
                  <img
                    src={patnaZoo}
                    alt="Patna Zoo e-ticketing booking portal"
                    loading="lazy"
                    width={1600}
                    height={1024}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
              {/* Laptop base */}
              <div className="mx-auto h-3 w-[70%] rounded-b-2xl bg-surface-dark/70 shadow-elevated" />

              {/* Floating tags */}
              <FloatingTag className="-top-4 -left-4" delay={0}>✓ Online Ticket Booking</FloatingTag>
              <FloatingTag className="top-10 -right-6" delay={0.1}>✓ Secure Booking Flow</FloatingTag>
              <FloatingTag className="bottom-20 -left-8" delay={0.2}>✓ Real-Time Pricing</FloatingTag>
              <FloatingTag className="-bottom-2 right-8" delay={0.3}>✓ Digital Ticket Preview</FloatingTag>
            </motion.div>

            {/* Feature tag pills row */}
            <div className="mt-12 flex flex-wrap gap-2 justify-center">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs text-ink-muted"
                >
                  <CheckCircle2 className="size-3 text-primary" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingTag({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 + delay }}
      className={`absolute z-10 surface-glass rounded-full px-3 py-1.5 text-xs font-medium shadow-soft animate-float ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Case Study — Rajgir                                                */
/* ------------------------------------------------------------------ */

function CaseStudyRajgir() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.02, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10 items-center">
        {/* Visual first (alternates with Patna) */}
        <div className="lg:col-span-8 order-2 lg:order-1 relative">
          <motion.div style={{ scale, y }} className="relative">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,oklch(0.38_0.075_235/0.25),transparent_70%)] blur-2xl" />
            <div className="relative rounded-[1.5rem] bg-surface-dark p-3 shadow-glow border border-white/10">
              <div className="rounded-xl overflow-hidden bg-surface-elevated border border-white/5">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-surface border-b border-border">
                  <div className="size-2 rounded-full bg-[oklch(0.7_0.18_25)]" />
                  <div className="size-2 rounded-full bg-[oklch(0.85_0.15_85)]" />
                  <div className="size-2 rounded-full bg-[oklch(0.78_0.15_150)]" />
                  <div className="mx-auto text-[10px] font-mono text-ink-muted">admin.rajgirsafari.in</div>
                </div>
                <img
                  src={rajgirDash}
                  alt="Rajgir Zoo Safari ticketing & operations dashboard"
                  loading="lazy"
                  width={1600}
                  height={1024}
                  className="w-full h-auto block"
                />
              </div>
            </div>
            <FloatingTag className="-top-4 right-10" delay={0}>✓ Online + Counter</FloatingTag>
            <FloatingTag className="top-20 -left-6" delay={0.1}>✓ Slot Management</FloatingTag>
            <FloatingTag className="bottom-10 -right-4" delay={0.2}>✓ Reporting Dashboard</FloatingTag>
          </motion.div>
        </div>

        {/* Right content */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 text-primary px-3 py-1 text-xs font-medium">
              <span className="size-1.5 rounded-full bg-primary" /> Case Study 02
            </div>
            <h3 className="mt-5 font-display text-4xl lg:text-5xl tracking-tight">Rajgir Zoo Safari</h3>
            <div className="mt-2 text-sm text-ink-muted">Online + Counter Ticketing · Bihar, India</div>
            <p className="mt-6 text-ink leading-relaxed">
              Built a hybrid ticketing platform supporting both online reservations and physical counter
              ticket sales with centralized operational management.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-background px-3 py-1.5 text-xs font-medium">
              <Sparkles className="size-3.5" />
              Built & Maintained by Fillip Technologies
            </div>

            <ul className="mt-8 space-y-3">
              {[
                "Online Ticketing",
                "Counter Ticketing",
                "Slot Management",
                "QR Validation",
                "Reporting Dashboard",
                "Visitor Analytics",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <div className="size-6 rounded-md bg-primary/10 grid place-items-center">
                    <CheckCircle2 className="size-3.5 text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process timeline                                                    */
/* ------------------------------------------------------------------ */

function Process() {
  const steps = [
    { t: "Requirement Analysis", d: "Stakeholder interviews, operational audit, scope definition." },
    { t: "Business Workflow Planning", d: "Map ticketing flows, pricing rules, slot capacity and roles." },
    { t: "UI / UX Design", d: "Visitor booking journeys and operator interfaces, prototyped end-to-end." },
    { t: "Development", d: "Scalable backend, web booking, counter POS and admin platform." },
    { t: "Payment Gateway Integration", d: "Razorpay / PayU / Govt. gateways with reconciliation." },
    { t: "Testing", d: "Load tests for peak holidays, security audits, UAT with operations team." },
    { t: "Deployment", d: "Production rollout, monitoring, gate hardware provisioning." },
    { t: "Training & Support", d: "Operator training, runbooks and long-term SLA-backed support." },
  ];
  return (
    <section id="process" className="relative overflow-hidden py-28 lg:py-36 bg-surface/60 border-y border-border">
      <img
        src="/images/How-we-work.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 w-[280px] -translate-y-1/2 opacity-70 mix-blend-multiply sm:w-[380px] lg:w-[500px]"
        style={{
          maskImage: "radial-gradient(ellipse at center left, black 0%, black 30%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at center left, black 0%, black 30%, transparent 72%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-medium">How we work</div>
          <h2 className="mt-4 font-display text-5xl lg:text-6xl leading-[1] tracking-tight">
            From requirement to <em className="italic text-gradient">production</em>.
          </h2>
          <p className="mt-5 text-ink-muted text-lg">
            A disciplined eight-stage delivery, refined across live public-sector deployments.
          </p>
        </motion.div>

        <div className="mt-16 relative">
          {/* Vertical guide line */}
          <div className="absolute left-[31px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border-strong to-transparent" />

          <motion.div {...stagger} className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                variants={{
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className={`relative grid lg:grid-cols-2 gap-6 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
              >
                <div
                  className={`pl-20 lg:pl-0 ${i % 2 ? "lg:pl-16 lg:text-left" : "lg:pr-16 lg:text-right"
                    }`}
                >
                  <div className="text-xs font-mono text-primary">STEP / {String(i + 1).padStart(2, "0")}</div>
                  <div className="font-display text-2xl lg:text-3xl mt-1 tracking-tight">{s.t}</div>
                  <p className="mt-2 text-ink-muted">{s.d}</p>
                </div>
                {/* Dot */}
                <div
                  className={`absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-2 ${i % 2 ? "" : ""
                    }`}
                >
                  <div className="relative size-[62px] rounded-2xl bg-surface-elevated border border-border shadow-soft grid place-items-center">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent" />
                    <span className="font-display text-xl text-primary">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <div className="hidden lg:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

function Industries() {
  const items = [
    { t: "Zoos", i: Trees },
    { t: "Safari Parks", i: Globe },
    { t: "Museums", i: Landmark },
    { t: "Tourist Attractions", i: Sparkles },
    { t: "Theme Parks", i: Activity },
    { t: "Government Venues", i: Building2 },
    { t: "Heritage Sites", i: Castle },
    { t: "Events", i: Calendar },
    { t: "Exhibitions", i: Layers },
  ];
  return (
    <section id="industries" className="py-28 lg:py-36 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Industries we serve</div>
          <h2 className="mt-4 font-display text-5xl lg:text-6xl leading-[1] tracking-tight">
            Built for venues where <em className="italic text-gradient">people gather</em>.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {items.map(({ t, i: Icon }, idx) => (
            <motion.div
              key={t}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              className="group relative border-r border-b border-border p-8 lg:p-10 hover:bg-surface transition-colors"
            >
              <div className="flex items-start justify-between">
                <Icon className="size-7 text-primary" strokeWidth={1.4} />
                <span className="text-xs font-mono text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Explore <ArrowUpRight className="size-3" />
                </span>
              </div>
              <div className="mt-12 font-display text-3xl tracking-tight">{t}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-ink-muted">
                Ticketing · Validation · Reporting
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why choose                                                          */
/* ------------------------------------------------------------------ */

function WhyChoose() {
  const pillars = [
    { t: "Real-world implementation experience", d: "Live deployments serving thousands of daily visitors across public attractions.", i: Activity },
    { t: "Scalable architecture", d: "Engineered to absorb holiday traffic spikes without operational degradation.", i: Layers },
    { t: "Custom development", d: "Every workflow modeled to the venue — not forced into a generic SaaS template.", i: Cpu },
    { t: "Long-term support", d: "SLA-backed maintenance, hardening and feature evolution after go-live.", i: ShieldCheck },
    { t: "Enterprise-grade security", d: "Signed tickets, hardened APIs, audit trails and PCI-compliant payment integrations.", i: ShieldCheck },
    { t: "Proven public-sector deployments", d: "Familiar with government procurement, compliance and accountability requirements.", i: Building2 },
  ];
  return (
    <section className="py-28 lg:py-36 bg-surface-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,oklch(0.62_0.11_220/0.25),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,oklch(0.38_0.075_235/0.35),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div {...fadeUp} className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.2em] text-primary-glow font-medium">
              Why Fillip Technologies
            </div>
            <h2 className="mt-4 font-display text-5xl lg:text-6xl leading-[1] tracking-tight">
              The team that has actually <em className="italic">shipped</em> this before.
            </h2>
            <p className="mt-5 text-white/70 text-lg">
              Building a ticketing platform isn't about features on a slide — it's about
              what happens at 9:55 AM on a Sunday when the queue is around the block.
              We've been there. We build for it.
            </p>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {pillars.map(({ t, d, i: Icon }, idx) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 hover:bg-white/[0.06] transition-colors"
              >
                <div className="size-9 rounded-lg bg-primary-glow/15 border border-primary-glow/20 grid place-items-center">
                  <Icon className="size-4 text-primary-glow" />
                </div>
                <div className="mt-5 font-display text-xl tracking-tight">{t}</div>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard showcase                                                  */
/* ------------------------------------------------------------------ */

function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.04, 1]);

  const items = [
    { t: "Ticket Sales", i: Ticket },
    { t: "Revenue Reports", i: CreditCard },
    { t: "Visitor Analytics", i: Users },
    { t: "Capacity Monitoring", i: Activity },
    { t: "Entry Validation", i: ScanLine },
    { t: "Peak Visitor Tracking", i: TrendingUp },
  ];

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Dashboard</div>
          <h2 className="mt-4 font-display text-5xl lg:text-6xl leading-[1] tracking-tight">
            Complete operational <em className="italic text-gradient">visibility</em>.
          </h2>
          <p className="mt-5 text-ink-muted text-lg">
            One control surface for ticket sales, revenue, capacity and live gate operations —
            with reporting your finance and operations teams can both trust.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-3 space-y-3">
            {items.map(({ t, i: Icon }) => (
              <div
                key={t}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3"
              >
                <div className="size-8 rounded-md bg-primary/10 grid place-items-center">
                  <Icon className="size-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{t}</span>
                <ChevronRight className="size-4 ml-auto text-ink-muted" />
              </div>
            ))}
          </div>

          <motion.div style={{ scale }} className="lg:col-span-9 relative">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,oklch(0.62_0.11_220/0.2),transparent_70%)] blur-2xl" />
            <div className="relative rounded-2xl bg-surface-dark p-3 shadow-glow border border-white/10">
              <div className="rounded-xl overflow-hidden border border-white/5">
                <img
                  src={analyticsDash}
                  alt="Analytics & operations dashboard"
                  loading="lazy"
                  width={1600}
                  height={1100}
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
