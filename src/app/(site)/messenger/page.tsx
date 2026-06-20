"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Bell,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  Check,
  CheckCheck,
  Clock3,
  FileText,
  GraduationCap,
  HeartPulse,
  MessageCircle,
  PackageCheck,
  Plane,
  Send,
  ShoppingBag,
  Sparkles,
  Store,
  Utensils,
  X,
  Zap,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
};

const problemSteps = [
  { label: "Customer fills enquiry form", icon: FileText },
  { label: "No immediate response", icon: Clock3 },
  { label: "Lead becomes cold", icon: AlertTriangle },
  { label: "Customer contacts competitor", icon: ArrowRight },
  { label: "Business loses opportunity", icon: X },
];

const solutionSteps = [
  "Customer action",
  "WhatsApp automation",
  "Instant response",
  "Business notification",
  "Follow-up sequence",
  "Better conversion",
];

const useCases = [
  {
    number: "01",
    title: "Website Form Automation",
    copy: "The moment a visitor submits your website form, they receive a personalized WhatsApp confirmation while your team gets a qualified lead alert.",
    icon: FileText,
    accent: "from-emerald-400/20 to-cyan-400/5",
    messages: ["Thanks for your enquiry, Aisha.", "A specialist will contact you shortly."],
  },
  {
    number: "02",
    title: "Appointment Booking",
    copy: "Confirm bookings instantly, send timely reminders and reduce no-shows without adding manual work for your operations team.",
    icon: CalendarCheck,
    accent: "from-blue-400/20 to-violet-400/5",
    messages: ["Your appointment is confirmed.", "Reminder: Tomorrow at 11:30 AM"],
  },
  {
    number: "03",
    title: "Order Updates",
    copy: "Keep customers informed from order confirmation to dispatch and delivery with automated, event-triggered status messages.",
    icon: PackageCheck,
    accent: "from-amber-400/20 to-orange-400/5",
    messages: ["Order #FT2048 is confirmed.", "Your order is out for delivery."],
  },
  {
    number: "04",
    title: "Lead Notifications",
    copy: "Route high-intent leads to the right salesperson in real time, complete with source, requirement and customer contact details.",
    icon: Bell,
    accent: "from-fuchsia-400/20 to-pink-400/5",
    messages: ["New enterprise lead received.", "Assigned to Rahul · Sales Team"],
  },
];

const industries = [
  { label: "Education", icon: GraduationCap },
  { label: "Healthcare", icon: HeartPulse },
  { label: "Real Estate", icon: Building2 },
  { label: "Travel", icon: Plane },
  { label: "Restaurants", icon: Utensils },
  { label: "E-Commerce", icon: ShoppingBag },
  { label: "Training Institutes", icon: Sparkles },
  { label: "Service Businesses", icon: Store },
  { label: "Agencies", icon: BriefcaseBusiness },
];

export default function WhatsAppBusinessSolutionsPage() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".wa-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((element) => {
        const target = Number(element.dataset.count ?? 0);
        const suffix = element.dataset.suffix ?? "";
        const value = { current: 0 };

        gsap.to(value, {
          current: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
          onUpdate: () => {
            element.textContent = `${Math.round(value.current)}${suffix}`;
          },
        });
      });

      gsap.to(".wa-orbit", {
        rotate: 360,
        duration: 32,
        ease: "none",
        repeat: -1,
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden bg-white text-heading">
      {/* Hero Section */}
      <section className="relative isolate min-h-[820px] overflow-hidden bg-white px-6 pb-20 pt-36 text-heading lg:pb-28 lg:pt-44">
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_42%,#f4fffa_100%)]" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_22%,rgba(52,211,153,0.16),transparent_28%),radial-gradient(circle_at_18%_55%,rgba(2,66,162,0.13),transparent_30%),radial-gradient(circle_at_55%_90%,rgba(56,189,248,0.10),transparent_28%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.45] [background-image:linear-gradient(rgba(15,23,42,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.045)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="absolute inset-x-[8%] top-[18%] -z-10 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.02fr_.98fr]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-[0_12px_35px_rgba(2,66,162,.08)] backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_#6ee7b7]" />
              WhatsApp Business Solutions
            </div>
            <h1 className="mt-7 max-w-3xl text-[clamp(3.25rem,6.4vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
              Never miss a <span className="bg-gradient-to-r from-primary via-blue-500 to-emerald-500 bg-clip-text text-transparent">lead</span> again.
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-semibold leading-tight text-heading md:text-2xl">
              Automate customer communication on WhatsApp.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-body md:text-lg">
              Automate confirmations, notifications, follow-ups, reminders and customer engagement through intelligent WhatsApp workflows.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-heading px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(15,23,42,.18)] transition hover:-translate-y-0.5 hover:bg-navy">
                Book Consultation <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#workflow" className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3.5 text-sm font-semibold text-heading shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white">
                See How It Works <ArrowDown className="size-4" />
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.12em] text-body/70">
              <span>Meta-ready workflows</span><span>CRM integrations</span><span>Built for scale</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease }} className="relative mx-auto w-full max-w-[590px]">
            <div className="absolute -inset-16 -z-10 rounded-full bg-gradient-to-br from-primary/10 via-cyan-300/10 to-emerald-300/20 blur-3xl" />
            <div className="rounded-[2rem] border border-white/80 bg-white/70 p-3 shadow-[0_40px_100px_rgba(15,23,42,.16)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-[1.5rem] border border-border bg-[#f3f8fa]">
                <div className="flex items-center justify-between border-b border-border bg-white/90 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-full bg-emerald-400 text-[#052014]"><MessageCircle className="size-5" /></div>
                    <div><div className="text-sm font-semibold text-heading">Fillip Automation</div><div className="text-xs text-emerald-600">online · replies instantly</div></div>
                  </div>
                  <div className="flex gap-1.5"><span className="size-1 rounded-full bg-heading/25" /><span className="size-1 rounded-full bg-heading/25" /><span className="size-1 rounded-full bg-heading/25" /></div>
                </div>
                <div className="space-y-4 p-5 md:p-7">
                  <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-border bg-white p-4 text-sm text-heading shadow-sm">
                    Hi! I just submitted the enterprise enquiry form.
                    <div className="mt-2 text-[10px] text-body/60">10:42 AM</div>
                  </div>
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }} className="ml-auto max-w-[86%] rounded-2xl rounded-tr-sm bg-emerald-400 p-4 text-sm text-[#062217]">
                    Thanks, Priya. Your enquiry is confirmed. A solution specialist has been notified and will connect with you shortly.
                    <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-[#075b3a]"><span>10:42 AM</span><CheckCheck className="size-3.5" /></div>
                  </motion.div>
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-primary/10 bg-white p-3 shadow-sm">
                    <span className="grid size-8 place-items-center rounded-lg bg-primary/10"><Zap className="size-4 text-primary" /></span>
                    <div><div className="text-xs font-semibold text-heading">Lead routed to Enterprise Sales</div><div className="mt-0.5 text-[10px] text-body">Website form · High intent</div></div>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">LIVE</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-border bg-white px-4 py-3 text-xs text-body/60 shadow-sm"><span className="flex-1">Type a message</span><Send className="size-4 text-primary" /></div>
                </div>
              </div>
            </div>

            {[
              ["24/7 Automation", "-left-5 top-12"],
              ["Instant Notifications", "-right-5 top-28"],
              ["Lead Conversion Boost", "-left-8 bottom-24"],
              ["Smart Workflows", "right-2 -bottom-6"],
            ].map(([label, position], index) => (
              <motion.div key={label} animate={{ y: [0, index % 2 ? 7 : -7, 0] }} transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }} className={`absolute hidden rounded-full border border-border bg-white/90 px-3 py-2 text-[11px] font-semibold text-heading shadow-xl backdrop-blur md:block ${position}`}>
                <span className="mr-2 inline-block size-1.5 rounded-full bg-emerald-400" />{label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">The hidden revenue leak</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] md:text-6xl">Why businesses lose leads.</h2></div>
            <p className="max-w-2xl text-lg leading-8 text-body lg:justify-self-end">Speed shapes intent. When an enquiry sits unanswered, interest decays and the next available business wins the conversation.</p>
          </motion.div>
          <div className="wa-reveal mt-16 overflow-hidden rounded-[2rem] border border-border bg-surface p-6 md:p-10">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
              {problemSteps.map(({ label, icon: Icon }, index) => (
                <div key={label} className="contents">
                  <div className={`group rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 ${index === problemSteps.length - 1 ? "border-red-200 bg-red-50" : "border-border bg-white"}`}>
                    <div className={`grid size-9 place-items-center rounded-xl ${index > 1 ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"}`}><Icon className="size-4" /></div>
                    <div className="mt-5 text-sm font-semibold leading-5">{label}</div>
                    <div className="mt-2 text-[11px] text-body">0{index + 1} · {index < 2 ? "Intent waiting" : "Opportunity declining"}</div>
                  </div>
                  {index < problemSteps.length - 1 && <ArrowRight className="mx-auto hidden size-4 text-body/40 lg:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="workflow" className="relative border-y border-border bg-surface px-6 py-24 text-heading lg:py-32">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_center,rgba(2,66,162,.18)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div {...reveal} className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">One connected system</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] md:text-6xl">Automate every customer interaction.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-body">We design the complete journey from trigger to conversion, not merely the API connection behind it.</p></motion.div>
          <div className="wa-reveal relative mt-16 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent lg:block" />
            {solutionSteps.map((step, index) => (
              <motion.div whileHover={{ y: -6 }} key={step} className="relative rounded-2xl border border-border bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,.05)]">
                <div className={`relative z-10 grid size-10 place-items-center rounded-full text-xs font-bold ${index === 1 ? "bg-emerald-400 text-[#052014] shadow-[0_0_30px_rgba(52,211,153,.25)]" : "border border-primary/15 bg-primary/5 text-primary"}`}>0{index + 1}</div>
                <div className="mt-8 text-sm font-semibold">{step}</div><div className="mt-2 text-xs leading-5 text-body">{index === 0 ? "A real business event" : index === 5 ? "Measured business outcome" : "Orchestrated automatically"}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Use Cases */}
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Built around real moments</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] md:text-6xl">Workflows customers actually experience.</h2></motion.div>
          <div className="mt-20 space-y-24 lg:space-y-32">
            {useCases.map(({ number, title, copy, icon: Icon, accent, messages }, index) => (
              <div key={title} className={`wa-reveal grid items-center gap-12 lg:grid-cols-2 ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-[#081d25] p-6 text-white shadow-[0_26px_70px_rgba(8,29,37,.16)] md:p-9">
                  <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
                  <div className="relative flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-white/10"><Icon className="size-5" /></span><div><div className="text-xs text-white/40">Automation active</div><div className="text-sm font-semibold">{title}</div></div></div><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399]" /></div>
                  <div className="relative mt-10 space-y-3">
                    {messages.map((message, messageIndex) => <motion.div whileHover={{ x: 4 }} key={message} className={`${messageIndex ? "ml-auto bg-emerald-400 text-[#052014]" : "bg-white/10 text-white"} max-w-[84%] rounded-2xl p-4 text-sm shadow-lg`}><div>{message}</div><div className={`mt-2 flex items-center justify-end gap-1 text-[10px] ${messageIndex ? "text-emerald-900/60" : "text-white/35"}`}>Just now <CheckCheck className="size-3" /></div></motion.div>)}
                  </div>
                  <div className="relative mt-8 flex items-center gap-2 text-[11px] text-white/35"><Zap className="size-3.5 text-emerald-300" /> Triggered and delivered automatically</div>
                </div>
                <div className="max-w-xl"><div className="text-sm font-bold text-primary">{number} / REAL USE CASE</div><h3 className="mt-4 text-3xl font-bold tracking-[-0.035em] md:text-5xl">{title}</h3><p className="mt-5 text-lg leading-8 text-body">{copy}</p><div className="mt-7 flex flex-wrap gap-2">{["Instant trigger", "Personalized message", "Team visibility"].map((item) => <span key={item} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-body">{item}</span>)}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Difference Section */}
      <section className="bg-surface px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">The Fillip difference</p><h2 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-[-0.045em] md:text-6xl">More than just WhatsApp API access.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-body">An API sends messages. A well-designed automation system moves your business forward.</p></motion.div>
          <div className="wa-reveal mx-auto mt-16 grid max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_30px_80px_rgba(15,23,42,.08)] lg:grid-cols-2">
            <div className="p-7 md:p-10"><div className="text-xs font-bold uppercase tracking-[0.16em] text-body">Typical API provider</div><h3 className="mt-3 text-2xl font-bold">You receive the plumbing.</h3><div className="mt-8 space-y-5">{["API access only", "Complex setup", "Limited support", "Generic integrations"].map((item) => <div key={item} className="flex items-center gap-3 text-body"><span className="grid size-7 place-items-center rounded-full bg-red-50 text-red-500"><X className="size-3.5" /></span>{item}</div>)}</div></div>
            <div className="relative overflow-hidden bg-[#071d25] p-7 text-white md:p-10"><div className="absolute right-0 top-0 size-56 rounded-full bg-emerald-400/15 blur-3xl" /><div className="relative text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">Fillip Technologies</div><h3 className="relative mt-3 text-2xl font-bold">You receive the complete system.</h3><div className="relative mt-8 grid gap-4 sm:grid-cols-2">{["End-to-end setup", "Business workflow design", "Website integration", "CRM integration", "Custom automations", "Dedicated support", "Ongoing optimization"].map((item) => <div key={item} className="flex items-center gap-3 text-sm text-white/75"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-400 text-[#052014]"><Check className="size-3.5" /></span>{item}</div>)}</div></div>
          </div>
        </div>
      </section>

      {/* Automation Showcase */}
      <section className="relative overflow-hidden bg-white px-6 py-24 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Automation architecture</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] md:text-6xl">Every signal. One intelligent engine.</h2></motion.div>
          <div className="wa-reveal relative mt-20 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr_1fr]">
            <div className="space-y-3">{["Website Form", "Contact Form", "Order Placement", "Appointment Booking", "Lead Capture", "CRM Events"].map((item, index) => <motion.div whileHover={{ x: 6 }} key={item} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium"><span className="text-xs text-body">0{index + 1}</span><span className="flex-1">{item}</span><ArrowRight className="size-3.5 text-primary" /></motion.div>)}</div>
            <div className="relative mx-auto grid aspect-square w-full max-w-[430px] place-items-center">
              <div className="wa-orbit absolute inset-4 rounded-full border border-dashed border-primary/20"><span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_20px_#34d399]" /><span className="absolute bottom-[14%] right-[6%] size-2 rounded-full bg-primary" /></div>
              <div className="absolute inset-14 rounded-full border border-primary/10 bg-primary/[0.03]" />
              <motion.div whileHover={{ scale: 1.03 }} className="relative z-10 grid size-48 place-items-center rounded-[2rem] bg-[#071d25] p-6 text-center text-white shadow-[0_30px_80px_rgba(7,29,37,.28)]"><div><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-emerald-400 text-[#052014]"><Bot className="size-6" /></span><div className="mt-4 text-lg font-bold">WhatsApp Automation Engine</div><div className="mt-2 text-xs text-white/40">Logic · Routing · Personalization</div></div></motion.div>
            </div>
            <div className="space-y-3">{["Customer Confirmation", "Admin Notification", "Follow-Up Message", "Reminder Message", "Sales Alert"].map((item) => <motion.div whileHover={{ x: -6 }} key={item} className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium"><Check className="size-3.5 text-emerald-600" /><span className="flex-1">{item}</span><Zap className="size-3.5 text-emerald-600" /></motion.div>)}</div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-y border-border bg-surface px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl"><motion.div {...reveal} className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Industries we serve</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] md:text-6xl">One engine. Different business moments.</h2></motion.div><div className="wa-reveal mt-16 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">{industries.map(({ label, icon: Icon }, index) => <motion.div whileHover={{ backgroundColor: "#ffffff" }} key={label} className="group flex min-h-36 items-end justify-between border-b border-r border-border p-6 transition"><div><span className="text-xs text-body">0{index + 1}</span><div className="mt-8 text-xl font-bold">{label}</div></div><Icon className="size-6 text-primary transition-transform group-hover:-translate-y-1 group-hover:scale-110" /></motion.div>)}</div></div>
      </section>

      {/* Why Fillip Technologies */}
      <section className="bg-[#071a23] px-6 py-24 text-white lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <motion.div {...reveal}><p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Why Fillip Technologies</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] md:text-6xl">Automation grounded in real business operations.</h2><p className="mt-6 text-lg leading-8 text-white/55">We combine product thinking, integration engineering and ongoing optimization to build workflows that stay useful as your business evolves.</p></motion.div>
          <div className="wa-reveal divide-y divide-white/10 border-y border-white/10">{[
            ["01", "Real Business Automation Experience", "Workflows designed around response time, team ownership and measurable outcomes."],
            ["02", "Custom Workflow Development", "Logic tailored to your customer journey, policies and internal operations."],
            ["03", "Scalable Architecture", "A dependable foundation that can expand across teams, locations and use cases."],
            ["04", "Fast Deployment", "Focused delivery with clear milestones, integrations and production readiness."],
            ["05", "Dedicated Support", "A team that stays involved after launch, not a dashboard and documentation handoff."],
            ["06", "Future Enhancements", "Continuous refinement as customer behavior and business priorities change."],
          ].map(([number, title, copy]) => <motion.div whileHover={{ x: 5 }} key={title} className="grid gap-3 py-5 sm:grid-cols-[48px_1fr_1.35fr] sm:items-center"><span className="text-xs text-emerald-300">{number}</span><span className="font-semibold">{title}</span><span className="text-sm leading-6 text-white/45">{copy}</span></motion.div>)}</div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl"><motion.div {...reveal} className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Designed for outcomes</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] md:text-6xl">Communication that keeps moving.</h2></div><p className="max-w-md text-body">Illustrative performance goals for a properly implemented automation ecosystem.</p></motion.div><div className="wa-reveal mt-16 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">{[
          ["60", "%", "Faster response time"], ["3", "x", "Better lead engagement"], ["24", "/7", "Automated communication"], ["100", "%", "Instant notifications"],
        ].map(([value, suffix, label]) => <div key={label} className="border-b border-r border-border p-7 lg:p-9"><div data-count={value} data-suffix={suffix} className="text-5xl font-bold tracking-[-0.05em] text-primary md:text-6xl">0{suffix}</div><div className="mt-6 text-sm font-semibold">{label}</div><div className="mt-2 h-1 w-10 rounded-full bg-emerald-400" /></div>)}</div></div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 lg:pb-32">
        <motion.div {...reveal} className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-primary px-7 py-16 text-white shadow-[0_35px_100px_rgba(2,66,162,.22)] md:px-14 md:py-20 lg:px-20">
          <div className="absolute -right-24 -top-28 size-96 rounded-full border border-white/10" /><div className="absolute -right-10 -top-14 size-72 rounded-full border border-white/10" /><div className="absolute bottom-0 right-[28%] size-52 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Start a conversation</p><h2 className="mt-5 text-4xl font-bold tracking-[-0.05em] md:text-6xl">Ready to automate customer communication?</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">Whether you need lead automation, enquiry workflows, customer notifications or complete WhatsApp business automation, Fillip Technologies can help you build a scalable communication ecosystem.</p><div className="mt-9 flex flex-wrap gap-3"><a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary transition hover:-translate-y-0.5">Schedule Consultation <ArrowRight className="size-4" /></a><a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15">Contact Us</a></div></div>
        </motion.div>
      </section>
    </main>
  );
}
