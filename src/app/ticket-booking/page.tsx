"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  LineChart,
  MonitorCheck,
  QrCode,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const buildItems = [
  {
    eyebrow: "Online Booking",
    title: "Online ticketing systems built for high-volume public access.",
    description:
      "We design booking flows that help visitors select dates, slots, ticket categories, add-ons, and payments with less friction across mobile and desktop.",
    image: "/images/patna-zoo.png",
    points: ["Slot-based booking", "Payment gateway integration", "Automated ticket delivery"],
  },
  {
    eyebrow: "Counter Operations",
    title: "Counter ticketing solutions for fast on-ground operations.",
    description:
      "Our counter modules support staff ticketing, cash and digital payment records, printer-friendly tickets, shift reporting, and operator-level controls.",
    image: "/images/rajgir-safari.png",
    points: ["Staff dashboard", "Counter sales reports", "Role-based access"],
  },
  {
    eyebrow: "Entry Validation",
    title: "QR-based entry management for secure venue access.",
    description:
      "We build QR validation workflows for gates, entry points, safari boarding, and event check-ins with real-time ticket status and scan history.",
    image: "/images/seo-magnifier.png",
    points: ["QR scanning", "Duplicate entry prevention", "Live visitor status"],
  },
];

const caseStudies = [
  {
    name: "Patna Zoo",
    image: "/images/patna-zoo.png",
    description:
      "A public-facing ticketing implementation designed to simplify visitor booking, support high demand, and improve ticket management for zoo operations.",
    features: ["Online ticket booking", "Visitor-friendly ticket flow", "Digital ticket records", "Operational reporting"],
  },
  {
    name: "Rajgir Zoo Safari",
    image: "/images/rajgir-safari.png",
    description:
      "A safari-focused ticketing platform implementation built around scheduled visits, visitor flow, and digital ticket validation for a tourism venue.",
    features: ["Safari booking flow", "Schedule-aware ticketing", "QR-based validation", "Admin visibility"],
  },
];

const process = [
  "Requirement Analysis",
  "UI/UX Design",
  "Development",
  "Payment Integration",
  "Testing",
  "Deployment",
  "Support",
];

const industries = [
  "Zoos",
  "Safari Parks",
  "Museums",
  "Tourist Attractions",
  "Government Venues",
  "Heritage Sites",
  "Events & Exhibitions",
];

const reasons = [
  {
    icon: MonitorCheck,
    title: "Real-world implementation experience",
    description:
      "Patna Zoo and Rajgir Zoo Safari give us practical insight into public venue ticketing, visitor flow, and operational reporting.",
  },
  {
    icon: ShieldCheck,
    title: "Scalable architecture",
    description:
      "We plan systems for traffic spikes, multiple counters, payment reliability, admin controls, and future feature expansion.",
  },
  {
    icon: Sparkles,
    title: "Custom development",
    description:
      "Every ticketing platform is designed around your venue rules, pricing, schedules, visitor journey, and approval workflows.",
  },
  {
    icon: Users,
    title: "Long-term support",
    description:
      "Our team supports launch, staff adoption, maintenance, feature upgrades, and ongoing platform improvement.",
  },
];

const dashboardMetrics = [
  { label: "Ticket Sales", value: "42,860", icon: Ticket },
  { label: "Revenue Reports", value: "98.4L", icon: LineChart },
  { label: "Visitor Monitoring", value: "Live", icon: ScanLine },
  { label: "Capacity Management", value: "84%", icon: BarChart3 },
];

function TicketDashboardMockup() {
  return (
    <div className="relative rounded-[32px] border border-white/15 bg-white p-3 shadow-[0_34px_100px_rgba(16,82,120,0.18)]">
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
            TicketOps Console
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
          <aside className="hidden border-r border-white/10 bg-white/[0.03] p-5 lg:block">
            {["Online Booking", "Counter Sales", "QR Validation", "Analytics"].map((item, index) => (
              <div
                key={item}
                className={`mb-3 rounded-2xl px-4 py-3 text-sm ${
                  index === 0 ? "bg-white text-slate-950" : "text-white/65"
                }`}
              >
                {item}
              </div>
            ))}
          </aside>

          <div className="p-5">
            <div className="grid gap-4 md:grid-cols-4">
              {dashboardMetrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <div key={metric.label} className="rounded-2xl bg-white/[0.08] p-4">
                    <Icon className="h-5 w-5 text-cyan-300" />
                    <div className="mt-4 text-2xl font-semibold text-white">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs text-white/50">{metric.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_260px]">
              <div className="rounded-3xl bg-white p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Booking Trend
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">
                      Live sales and visitor flow
                    </h3>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Active
                  </span>
                </div>

                <div className="flex h-48 items-end gap-3">
                  {[42, 58, 38, 76, 64, 88, 70, 92, 83].map((height, index) => (
                    <div key={index} className="flex flex-1 items-end rounded-full bg-slate-100">
                      <div
                        className="w-full rounded-full bg-[#105278]"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#105278]">
                  <QrCode className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  QR validation
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Validate digital tickets at entry gates and monitor scan status in real time.
                </p>
                <div className="mt-6 rounded-2xl bg-black/20 p-4">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Gate A</span>
                    <span>1,248 scans</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[72%] rounded-full bg-cyan-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TicketBookingPage() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
          },
        );
      });

      gsap.to("[data-float]", {
        y: -14,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={pageRef} className="overflow-hidden bg-white text-slate-950">
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 lg:px-10 lg:pb-28 lg:pt-40">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right,#105278 1px,transparent 1px),linear-gradient(to bottom,#105278 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#105278]/10 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#105278]/15 bg-[#105278]/5 px-4 py-2 text-sm font-medium text-[#105278]">
                <Ticket className="h-4 w-4" />
                Custom Ticketing Software Development
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-slate-950 md:text-7xl">
                Ticketing Platform Development Services
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
                Fillip Technologies builds custom ticket booking, counter ticketing,
                QR entry validation, and analytics platforms for public venues,
                tourism destinations, events, and government attractions.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#105278] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(16,82,120,0.24)] transition hover:-translate-y-0.5"
                >
                  Build My Ticketing Platform
                </Link>
                <Link
                  href="#case-studies"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:border-[#105278]/35"
                >
                  View Implementations
                </Link>
              </div>
            </div>

            <div data-reveal data-float className="relative">
              <div className="absolute -left-10 top-10 z-20 hidden rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:block">
                <div className="flex items-center gap-3">
                  <ScanLine className="h-5 w-5 text-[#105278]" />
                  <div>
                    <p className="text-xs text-slate-500">Entry status</p>
                    <p className="font-semibold text-slate-950">QR verified</p>
                  </div>
                </div>
              </div>

              <TicketDashboardMockup />
            </div>
          </div>
        </section>

        {/* What We Build */}
        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="mb-16 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#105278]">
                What We Build
              </p>
              <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-6xl">
                Ticketing systems designed around your operations.
              </h2>
            </div>

            <div className="space-y-20">
              {buildItems.map((item, index) => (
                <div
                  key={item.title}
                  data-reveal
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    index % 2 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-slate-50 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.06)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={900}
                      height={650}
                      className="h-[340px] w-full rounded-[28px] object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#105278]">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-slate-950 md:text-5xl">
                      {item.title}
                    </h3>
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                      {item.description}
                    </p>
                    <div className="mt-8 space-y-3">
                      {item.points.map((point) => (
                        <div key={point} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[#105278]" />
                          <span className="font-medium text-slate-800">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Implementations */}
        <section id="case-studies" className="bg-slate-950 px-6 py-20 text-white lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="mb-16 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Featured Implementations
              </p>
              <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
                Proven ticketing delivery for landmark public venues.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/58">
                Patna Zoo and Rajgir Zoo Safari show how Fillip Technologies can build reliable,
                visitor-friendly ticketing platforms for organizations with real operational needs.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {caseStudies.map((study) => (
                <article
                  key={study.name}
                  data-reveal
                  className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04]"
                >
                  <div className="p-4">
                    <Image
                      src={study.image}
                      alt={`${study.name} ticketing implementation`}
                      width={1000}
                      height={720}
                      className="h-[360px] w-full rounded-[28px] object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-semibold">{study.name}</h3>
                    <p className="mt-4 leading-7 text-white/60">{study.description}</p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {study.features.map((feature) => (
                        <div key={feature} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/78">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#105278]">
                  Development Process
                </p>
                <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-6xl">
                  From venue requirements to supported launch.
                </h2>
              </div>
              <p className="max-w-md text-lg leading-8 text-slate-600">
                We handle the full build cycle so your ticketing platform is practical,
                secure, and ready for real visitor traffic.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 hidden h-full w-px bg-slate-200 lg:block" />
              <div className="grid gap-5 lg:grid-cols-7">
                {process.map((step, index) => (
                  <div key={step} data-reveal className="relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#105278] text-sm font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-lg font-semibold leading-tight text-slate-950">
                      {step}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="bg-[#f7fbfd] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="mx-auto mb-14 max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#105278]">
                Industries We Serve
              </p>
              <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-6xl">
                Ticketing platforms for visitor-driven organizations.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((item) => (
                <div key={item} data-reveal className="group rounded-[28px] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#105278]/35 hover:shadow-[0_20px_60px_rgba(16,82,120,0.08)]">
                  <Building2 className="h-6 w-6 text-[#105278]" />
                  <h3 className="mt-8 text-xl font-semibold text-slate-950">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Fillip Technologies */}
        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#105278]">
                Why Choose Fillip Technologies
              </p>
              <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-6xl">
                We build ticketing platforms for real-world operations.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {reasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <div key={reason.title} data-reveal className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <Icon className="h-7 w-7 text-[#105278]" />
                    <h3 className="mt-7 text-xl font-semibold text-slate-950">
                      {reason.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">{reason.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dashboard Showcase */}
        <section className="bg-slate-950 px-6 py-20 text-white lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div data-reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Dashboard Showcase
              </p>
              <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
                Analytics, revenue, visitors, and capacity in one command center.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/58">
                Your admin dashboard can include sales analytics, revenue reports,
                visitor monitoring, capacity controls, booking trends, and counter performance.
              </p>
            </div>

            <div data-reveal>
              <TicketDashboardMockup />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div data-reveal className="mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#105278] p-10 text-white md:p-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100">
                  Need a Custom Ticketing Platform?
                </p>
                <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
                  Let us build a ticketing solution for your venue, event, or public attraction.
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#105278] transition hover:-translate-y-0.5"
                >
                  Contact Fillip Technologies
                </Link>
                <Link
                  href="tel:+910000000000"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Schedule a Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
