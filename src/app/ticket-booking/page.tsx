"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const pageRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Navbar />
      <main className="ticket-page min-h-screen overflow-x-hidden bg-background text-ink">
        <Hero />
        <WhatWeOffer />
        <KeyCapabilities />
        <HowItWorks />
        <Industries />
        <WhyChoose />
        <DashboardShowcase />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute left-1/2 top-0 h-[560px] w-[980px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(2,66,162,0.14),transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="gsap-soft-reveal inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-ink-muted">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Ticketing Platform Development Services
          </div>

          <h1 className="gsap-soft-reveal mt-6 text-[clamp(2.7rem,5.8vw,5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--heading)]">
            Ticketing Platform Development Services
          </h1>

          <p className="gsap-soft-reveal mt-7 max-w-xl text-lg leading-relaxed text-[var(--body)]">
            Build secure, scalable and intelligent ticketing solutions for tourism, public attractions,
            events and organizations.
          </p>

          <div className="gsap-soft-reveal mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-elevated transition-all hover:shadow-glow"
            >
              Discuss Your Platform
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-6 py-3.5 text-sm font-medium transition-colors hover:bg-surface"
            >
              View Sample Dashboard
            </a>
          </div>

          <div className="gsap-soft-reveal mt-12 grid max-w-lg grid-cols-3 gap-6">
            {[
              { k: "Online", v: "Booking Flows" },
              { k: "QR", v: "Entry Validation" },
              { k: "Live", v: "Admin Reporting" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-3xl font-bold tracking-[-0.03em] text-[var(--heading)]">{s.k}</div>
                <div className="mt-1 text-xs text-ink-muted">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="gsap-dashboard-drift relative h-[560px] lg:col-span-6">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(56,189,248,0.24),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glow-ring absolute right-2 top-6 w-[88%] overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-elevated"
      >
        <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
          <div className="size-2.5 rounded-full bg-red-400" />
          <div className="size-2.5 rounded-full bg-amber-400" />
          <div className="size-2.5 rounded-full bg-emerald-400" />
          <div className="ml-3 text-[11px] font-mono text-ink-muted">ticketing.fillip.dev</div>
        </div>
        <div className="grid grid-cols-5 gap-4 p-5">
          <div className="col-span-3">
            <div className="text-[11px] uppercase tracking-wider text-ink-muted">Online Booking</div>
            <div className="mt-1 text-2xl font-semibold tracking-[-0.03em]">Reserve a visit</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Field label="Date" value="Sat, 21 Jun" icon={<Calendar className="size-3.5" />} />
              <Field label="Guests" value="03" />
              <Field label="Category" value="General" />
              <Field label="Slot" value="10:30 AM" icon={<Clock className="size-3.5" />} />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-primary/10 bg-primary/5 px-3 py-2.5">
              <span className="text-xs text-ink-muted">Total</span>
              <span className="font-semibold tabular-nums">Rs 450</span>
            </div>
            <button className="mt-3 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground">
              Pay and Confirm
            </button>
          </div>
          <div className="col-span-2 flex flex-col items-center rounded-xl border border-border bg-surface p-3">
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">Digital Ticket</div>
            <div className="mt-2 grid size-24 place-items-center rounded-md bg-[conic-gradient(at_top_left,#0242a2,#075d6c,#38bdf8,#0242a2)]">
              <div className="grid size-[88%] place-items-center rounded-sm bg-white">
                <QrCode className="size-12 text-primary" strokeWidth={1.3} />
              </div>
            </div>
            <div className="mt-2 text-[10px] font-mono text-ink-muted">FT-39A11C</div>
            <div className="mt-3 w-full hairline-divider" />
            <div className="mt-2 text-center text-[10px] leading-tight text-ink-muted">
              Scan at entry
              <br />
              gate to validate
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="animate-float absolute bottom-8 left-0 w-[76%] rounded-[1.6rem] border border-cyan-100/10 bg-[#06191f] p-5 text-white shadow-[0_20px_45px_rgba(5,24,30,0.28)]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
              <Ticket className="size-4 text-cyan-400" strokeWidth={2} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.08em] text-white/50">Counter POS</div>
              <div className="mt-0.5 text-sm font-semibold leading-none">Window 02 Live</div>
            </div>
          </div>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
            Open
          </span>
        </div>
        <div className="mt-5 space-y-2 text-sm">
          <Row k="Adult x 4" v="Rs 400" />
          <Row k="Child x 2" v="Rs 100" />
          <Row k="Add-on x 1" v="Rs 50" />
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs font-medium text-white/50">Issue Ticket</span>
          <span className="text-2xl font-semibold tabular-nums">Rs 550</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="animate-float-slow absolute bottom-2 right-6 w-[44%] rounded-2xl border border-border bg-surface-elevated p-4 shadow-elevated"
      >
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-wider text-ink-muted">Today Visitors</div>
          <TrendingUp className="size-3.5 text-emerald-500" />
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums tracking-[-0.03em]">3,284</span>
          <span className="text-[11px] font-medium text-emerald-500">+18%</span>
        </div>
        <Sparkline />
        <div className="mt-2 text-[10px] text-ink-muted">Peak 11AM - 524/hr</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="surface-glass animate-float absolute -top-3 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-soft"
      >
        <ScanLine className="size-3.5 text-primary" /> QR Validated
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75 }}
        className="surface-glass animate-float-slow absolute -right-2 top-32 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-soft"
      >
        <Activity className="size-3.5 text-primary" /> Real-Time Reporting
      </motion.div>
    </div>
  );
}

function Field({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div className="mt-0.5 flex items-center gap-1.5 text-sm font-medium">
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
    <svg viewBox="0 0 120 32" className="mt-2 h-8 w-full">
      <path
        d="M0 24 L12 20 L24 22 L36 14 L48 16 L60 10 L72 13 L84 6 L96 9 L108 4 L120 7 L120 32 L0 32 Z"
        fill="rgba(56,189,248,0.18)"
      />
      <path
        d="M0 24 L12 20 L24 22 L36 14 L48 16 L60 10 L72 13 L84 6 L96 9 L108 4 L120 7"
        fill="none"
        stroke="#0242a2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <motion.div {...fadeUp} className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
      <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">{description}</p> : null}
    </motion.div>
  );
}

function WhatWeOffer() {
  const solutions = [
    {
      title: "Online Ticket Booking",
      body: "Responsive booking journeys with categories, visitor details, add-ons, secure payments and instant digital ticket delivery.",
      icon: Ticket,
    },
    {
      title: "Counter Ticketing",
      body: "Fast operator screens for walk-in sales, receipt printing, payment modes, shift reports and synchronized inventory.",
      icon: Building2,
    },
    {
      title: "QR Based Entry Validation",
      body: "Signed QR codes, scan logs, duplicate-entry prevention and gate-level visibility for smooth visitor movement.",
      icon: QrCode,
    },
    {
      title: "Visitor Management",
      body: "Structured visitor profiles, group bookings, category rules and role-based workflows for operations teams.",
      icon: Users,
    },
  ];

  const extended = [
    "Slot Booking",
    "Payment Gateway Integration",
    "Reporting and Analytics",
    "Admin Dashboard",
    "Capacity Management",
  ];

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/60 py-24 lg:py-32">
      <div className="absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-[var(--glow-accent)] blur-[120px]" />
      <Image
        src="/images/ticket-booking-What.png"
        alt=""
        aria-hidden="true"
        width={500}
        height={500}
        className="pointer-events-none absolute right-0 top-4 w-[260px] opacity-60 mix-blend-multiply sm:-top-16 sm:w-[360px] lg:-top-24 lg:w-[480px]"
        style={{
          maskImage: "radial-gradient(ellipse at top right, black 0%, black 32%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at top right, black 0%, black 32%, transparent 72%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="What We Offer"
          title="Our Ticketing Solutions"
          description="Fillip Technologies builds complete ticketing platforms around your operations, not a generic template. Every module works together across online booking, counters, gates, finance and administration."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <motion.div {...fadeUp} className="lg:col-span-5">
            <div className="h-full rounded-[32px] border border-border bg-white p-8 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-primary/10">
                  <Layers className="size-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--heading)]">End-to-end platform</div>
                  <div className="text-sm text-[var(--body)]">Built for live operational control</div>
                </div>
              </div>
              <div className="mt-8 space-y-5">
                {extended.map((item, index) => (
                  <div key={item} className="flex items-center gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-surface text-xs font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-[var(--heading)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...stagger} className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {solutions.map(({ title, body, icon: Icon }) => (
              <motion.div
                key={title}
                variants={{ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55 }}
                className="rounded-[28px] border border-border bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="grid size-11 place-items-center rounded-2xl border border-border bg-surface">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[var(--heading)]">{title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--body)]">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function KeyCapabilities() {
  const blocks = [
    {
      n: "01",
      title: "Booking experiences that reduce friction",
      lead: "Visitors can choose tickets, dates, slots and payment methods without confusion.",
      body: "We design booking journeys for clarity, speed and trust, including responsive layouts, dynamic pricing, add-ons, refund logic and automated ticket delivery.",
      points: ["Mobile-first booking", "Category rules", "Secure checkout", "SMS and email delivery"],
      visual: <OnlineVisual />,
    },
    {
      n: "02",
      title: "Unified counter and online operations",
      lead: "Offline ticket sales stay connected to the same inventory and reporting system.",
      body: "Counter teams get practical screens for fast sales, payment collection, receipt printing, shift close and supervisor review.",
      points: ["Counter POS", "Printer support", "Shift reconciliation", "Unified inventory"],
      visual: <CounterVisual />,
      reverse: true,
    },
    {
      n: "03",
      title: "Entry control and capacity intelligence",
      lead: "Every entry can be validated, tracked and reported in real time.",
      body: "Gate teams can scan QR tickets, prevent duplicate use, monitor capacity and keep operations moving during high-footfall periods.",
      points: ["Signed QR codes", "Duplicate prevention", "Gate scan logs", "Live capacity"],
      visual: <QRVisual />,
    },
  ];

  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Key Capabilities"
          title="A connected platform for booking, operations and reporting."
          description="We build the full product layer your organization needs: visitor experience, staff operations, gate validation, admin controls and business intelligence."
        />

        <div className="mt-20 space-y-28">
          {blocks.map((b) => (
            <motion.div
              key={b.n}
              {...fadeUp}
              className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${b.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="lg:col-span-7">{b.visual}</div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 text-xs font-mono text-ink-muted">
                  <span className="text-primary">{b.n}</span>
                  <span className="h-px w-10 bg-border-strong" />
                  Capability
                </div>
                <h3 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[var(--heading)]">
                  {b.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink">{b.lead}</p>
                <p className="mt-3 leading-relaxed text-ink-muted">{b.body}</p>
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
    <div className="glow-ring relative aspect-[5/4] overflow-hidden rounded-[32px] border border-border bg-gradient-to-br from-primary/5 via-surface to-accent/10 p-6">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="relative grid h-full grid-rows-[auto_1fr] gap-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-ink-muted">/booking</div>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-600">LIVE</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface-elevated p-4 shadow-soft">
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">Step 1</div>
            <div className="mt-1 font-medium">Choose Date and Slot</div>
            <div className="mt-3 grid grid-cols-7 gap-1">
              {Array.from({ length: 21 }).map((_, i) => (
                <div
                  key={i}
                  className={`grid aspect-square place-items-center rounded text-[9px] ${i === 12 ? "bg-primary font-medium text-primary-foreground" : "bg-surface text-ink-muted"
                    }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface-elevated p-4 shadow-soft">
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">Step 2</div>
            <div className="mt-1 font-medium">Visitors</div>
            <div className="mt-3 space-y-2">
              {["Adult", "Child", "Group"].map((t, i) => (
                <div key={t} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-xs">
                  <span>{t}</span>
                  <span className="font-mono">0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-between rounded-xl bg-primary p-4 text-primary-foreground shadow-elevated">
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Secure Payment</div>
              <div className="mt-0.5 text-2xl font-semibold">Rs 1,240 Payment Gateway</div>
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
    <div className="glow-ring relative aspect-[5/4] overflow-hidden rounded-[32px] bg-surface-dark p-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.24),transparent_50%)]" />
      <div className="relative grid h-full grid-cols-5 gap-4">
        <div className="col-span-2 flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="text-[10px] uppercase tracking-wider text-white/50">Counter</div>
          <div className="mt-0.5 text-xl font-semibold">Window 04</div>
          <div className="mt-4 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-white/60">Operator</span>
              <span>Staff user</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Shift</span>
              <span>09:00 - 17:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Tickets</span>
              <span className="font-mono">147</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Cash</span>
              <span className="font-mono">Rs 18,200</span>
            </div>
          </div>
          <div className="mt-auto rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-2 text-center text-[10px] text-cyan-200">
            Live sync with online inventory
          </div>
        </div>
        <div className="col-span-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">New Sale</div>
            <span className="text-[10px] font-mono text-white/50">TXN 0241</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Adult", "Child", "Senior", "Group", "Camera", "Vehicle"].map((t, i) => (
              <button
                key={t}
                className={`rounded-lg border py-2.5 text-xs ${i < 2 ? "border-primary bg-primary" : "border-white/10 bg-white/[0.03]"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 text-xs">
            <Row k="Adult x 3" v="Rs 300" />
            <Row k="Child x 2" v="Rs 100" />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-xs text-white/60">Print Ticket</span>
            <span className="text-2xl font-semibold">Rs 400</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QRVisual() {
  return (
    <div className="glow-ring relative aspect-[5/4] overflow-hidden rounded-[32px] border border-border bg-surface p-6">
      <div className="grid-bg absolute inset-0" />
      <div className="relative flex h-full items-center justify-center">
        <div className="relative">
          <div className="animate-pulse-ring absolute inset-0 rounded-[32px]" />
          <div className="relative grid size-52 place-items-center rounded-[32px] border border-border bg-surface-elevated p-5 shadow-elevated">
            <QrCode className="size-32 text-primary" strokeWidth={1.2} />
            <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-medium text-white shadow-soft">
              <CheckCircle2 className="size-3" /> Validated 0.12s
            </div>
          </div>
        </div>
        <div className="surface-glass animate-float absolute left-6 top-6 w-44 rounded-xl p-3 shadow-soft">
          <div className="text-[10px] uppercase tracking-wider text-ink-muted">Gate 02</div>
          <div className="mt-0.5 font-mono text-xs">FT-39A11C</div>
          <div className="mt-1 text-xs text-emerald-600">Entry granted</div>
        </div>
        <div className="surface-glass animate-float-slow absolute bottom-6 right-6 w-44 rounded-xl p-3 shadow-soft">
          <div className="text-[10px] uppercase tracking-wider text-ink-muted">Capacity</div>
          <div className="mt-0.5 text-xl font-bold tabular-nums">62%</div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
            <div className="h-full w-[62%] bg-gradient-to-r from-primary to-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { t: "Discovery and Workflow Mapping", d: "We understand visitor journeys, ticket categories, permissions, pricing, approval paths and operational constraints." },
    { t: "UX and Platform Architecture", d: "We define booking screens, counter flows, admin roles, data models, integrations and reporting requirements." },
    { t: "Development and Integration", d: "We build the booking portal, counter POS, QR validation, dashboards, payment gateway and notification layer." },
    { t: "Testing and Launch", d: "We validate payments, load behavior, security, scan flows, reports and staff readiness before production rollout." },
    { t: "Support and Optimization", d: "We provide training, maintenance, monitoring and feature improvements as your operations evolve." },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/60 py-28 lg:py-36">
      <Image
        src="/images/How-we-work.png"
        alt=""
        aria-hidden="true"
        width={500}
        height={500}
        className="pointer-events-none absolute left-0 top-1/2 w-[260px] -translate-y-1/2 opacity-65 mix-blend-multiply sm:w-[360px] lg:w-[500px]"
        style={{
          maskImage: "radial-gradient(ellipse at center left, black 0%, black 30%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at center left, black 0%, black 30%, transparent 72%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="How It Works"
          title="From operational planning to a reliable live platform."
          description="Our process is structured for organizations that need dependable technology, clear accountability and smooth handover to internal teams."
        />

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-[31px] top-0 w-px bg-gradient-to-b from-transparent via-border-strong to-transparent lg:left-1/2 lg:-translate-x-1/2" />

          <motion.div {...stagger} className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                variants={{ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className={`relative grid items-center gap-6 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className={`pl-20 lg:pl-0 ${i % 2 ? "lg:pl-16" : "lg:pr-16 lg:text-right"}`}>
                  <div className="text-xs font-mono text-primary">STEP / {String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[var(--heading)] lg:text-3xl">
                    {s.t}
                  </div>
                  <p className="mt-2 text-ink-muted">{s.d}</p>
                </div>
                <div className="absolute left-0 top-2 lg:left-1/2 lg:-translate-x-1/2">
                  <div className="relative grid size-[62px] place-items-center rounded-2xl border border-border bg-surface-elevated shadow-soft">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent" />
                    <span className="text-xl font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
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

function Industries() {
  const items = [
    { t: "Tourism Attractions", i: Trees },
    { t: "Safari and Nature Parks", i: Globe },
    { t: "Museums", i: Landmark },
    { t: "Heritage Sites", i: Castle },
    { t: "Events and Exhibitions", i: Calendar },
    { t: "Government Venues", i: Building2 },
    { t: "Theme Parks", i: Activity },
    { t: "Cultural Centers", i: Sparkles },
    { t: "Organizations", i: Layers },
  ];

  return (
    <section id="industries" className="relative overflow-hidden py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Industries We Serve"
          title="Ticketing systems for venues, institutions and high-footfall experiences."
          description="Our platforms support organizations where admission control, capacity, payments and visitor experience need to work together."
        />

        <div className="mt-16 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ t, i: Icon }, idx) => (
            <motion.div
              key={t}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              className="group relative border-b border-r border-border p-8 transition-colors hover:bg-surface lg:p-10"
            >
              <div className="flex items-start justify-between">
                <Icon className="size-7 text-primary" strokeWidth={1.4} />
                <span className="flex items-center gap-1 text-xs font-mono text-ink-muted opacity-0 transition-opacity group-hover:opacity-100">
                  Fit <ArrowUpRight className="size-3" />
                </span>
              </div>
              <div className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-[var(--heading)]">{t}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-ink-muted">
                Booking - Validation - Reporting
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const pillars = [
    { t: "Technology partner mindset", d: "We help shape the platform around your business goals, staff workflows and visitor expectations.", i: Cpu },
    { t: "Scalable architecture", d: "Platforms are engineered for traffic spikes, high transaction volume and long-term feature growth.", i: Layers },
    { t: "Secure implementation", d: "Payment integrations, signed QR tickets, role-based access, audit trails and hardened APIs are planned from the start.", i: ShieldCheck },
    { t: "Custom workflows", d: "We model your ticket rules, slots, counters, capacity limits, approvals and reporting needs instead of forcing generic behavior.", i: Activity },
    { t: "Clean user experience", d: "Visitors, counter staff, gate teams and administrators get interfaces designed for speed and confidence.", i: Users },
    { t: "Long-term support", d: "We stay involved after launch with monitoring, maintenance, training and ongoing platform improvements.", i: Building2 },
  ];

  return (
    <section className="relative overflow-hidden bg-surface-dark py-28 text-white lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.22),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(2,66,162,0.36),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[620px] w-[560px] overflow-visible">
        <div className="absolute bottom-14 left-10 h-80 w-80 rounded-full bg-cyan-200/10 blur-[90px]" />
        <Image
          src="/images/tckt-why.png"
          alt=""
          aria-hidden="true"
          width={640}
          height={960}
          className="relative bottom-[-9px] left-[-18px] h-[900px] w-auto origin-bottom-left rotate-[-14deg] object-contain opacity-58 mix-blend-screen"
          style={{
            maskImage:
              "radial-gradient(ellipse at 42% 58%, black 0%, black 42%, rgba(0,0,0,0.68) 58%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 42% 58%, black 0%, black 42%, rgba(0,0,0,0.68) 58%, transparent 82%)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div {...fadeUp} className="relative min-h-[640px] lg:col-span-5">
            <div className="relative z-10">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Why Choose Fillip Technologies
              </div>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-5xl">
                Built for organizations that need reliable ticketing operations.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                We combine product strategy, software engineering, UX design and operational support to deliver
                ticketing platforms your teams can trust every day.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {pillars.map(({ t, d, i: Icon }, idx) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-colors hover:bg-white/[0.06]"
              >
                <div className="grid size-9 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-200/15">
                  <Icon className="size-4 text-cyan-200" />
                </div>
                <div className="mt-5 text-xl font-semibold tracking-[-0.03em]">{t}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.02, 1]);

  const items = [
    { t: "Ticket Sales", i: Ticket },
    { t: "Revenue Reports", i: CreditCard },
    { t: "Visitor Analytics", i: Users },
    { t: "Capacity Monitoring", i: Activity },
    { t: "Entry Validation", i: ScanLine },
    { t: "Peak Visitor Tracking", i: TrendingUp },
  ];

  return (
    <section id="dashboard" ref={ref} className="relative overflow-hidden py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Dashboard Showcase"
          title="A sample platform view built by Fillip Technologies."
          description="This dashboard preview shows the type of operational control surface we can build for ticket sales, revenue, capacity and live entry management."
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-3">
            {items.map(({ t, i: Icon }) => (
              <div key={t} className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3">
                <div className="grid size-8 place-items-center rounded-md bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{t}</span>
                <ChevronRight className="ml-auto size-4 text-ink-muted" />
              </div>
            ))}
          </div>

          <motion.div style={{ scale }} className="relative lg:col-span-9">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_70%)] blur-2xl" />
            <div className="relative rounded-2xl border border-white/10 bg-surface-dark p-3 shadow-glow">
              <div className="overflow-hidden rounded-xl border border-white/5">
                <Image
                  src={analyticsDash}
                  alt="Sample ticketing analytics and operations dashboard"
                  loading="lazy"
                  width={1600}
                  height={1100}
                  className="block h-auto w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Can Fillip Technologies build a custom ticketing platform for our organization?",
      a: "Yes. We design and develop custom ticketing platforms for organizations that need online booking, counter sales, QR validation, dashboards and operational workflows tailored to their needs.",
    },
    {
      q: "Can the platform support both online and counter ticketing?",
      a: "Yes. We can build online booking and counter POS as part of one connected system, so inventory, reports and entry validation stay synchronized.",
    },
    {
      q: "Do you integrate payment gateways?",
      a: "Yes. We integrate suitable payment gateways, configure transaction flows, support reconciliation needs and connect payment status with ticket generation.",
    },
    {
      q: "Can we manage slots, capacity and visitor categories?",
      a: "Yes. The platform can include slot booking, capacity rules, visitor categories, pricing logic, add-ons and admin controls.",
    },
    {
      q: "Do you provide support after launch?",
      a: "Yes. We can provide training, monitoring, maintenance, performance improvements and ongoing feature development after launch.",
    },
  ];

  return (
    <section className="border-y border-border bg-surface/60 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions organizations ask before building a ticketing platform."
          centered
        />

        <div className="mt-12 divide-y divide-border rounded-[28px] border border-border bg-white shadow-soft">
          {faqs.map((item) => (
            <motion.details
              key={item.q}
              {...fadeUp}
              className="group px-6 py-5 open:bg-surface/70 first:rounded-t-[28px] last:rounded-b-[28px]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-[var(--heading)]">
                {item.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-white text-primary transition-transform group-open:rotate-90">
                  <ChevronRight className="size-4" />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-[var(--body)]">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
