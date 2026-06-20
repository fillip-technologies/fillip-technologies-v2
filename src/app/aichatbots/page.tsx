"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Database,
  GraduationCap,
  Headphones,
  HeartPulse,
  Languages,
  MessageCircleMore,
  MessagesSquare,
  PlugZap,
  Send,
  ShoppingBag,
  Sparkles,
  Target,
  Utensils,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const scenarios = [
  {
    name: "Lead generation",
    icon: Target,
    eyebrow: "New website visitor",
    messages: [
      { ai: false, text: "We need a website for our training institute." },
      { ai: true, text: "I can help with that. How many courses do you currently offer?" },
      { ai: false, text: "Twelve, with new batches every month." },
      { ai: true, text: "Perfect. I have your requirements. Shall I arrange a 20-minute consultation?" },
    ],
    result: "Qualified lead captured",
  },
  {
    name: "Customer support",
    icon: Headphones,
    eyebrow: "Existing customer",
    messages: [
      { ai: false, text: "Can I update the email on my account?" },
      { ai: true, text: "Yes. Open Profile, select Account Details, then choose Edit Email." },
      { ai: false, text: "Will I need to verify it again?" },
      { ai: true, text: "Yes, we will send a secure verification link to your new address." },
    ],
    result: "Resolved without a ticket",
  },
  {
    name: "Appointment booking",
    icon: CalendarCheck,
    eyebrow: "Returning prospect",
    messages: [
      { ai: false, text: "Can I book a product demo for next week?" },
      { ai: true, text: "Absolutely. Tuesday at 11:30 AM and Thursday at 3:00 PM are available." },
      { ai: false, text: "Thursday works for me." },
      { ai: true, text: "Done. Your calendar invitation is on its way." },
    ],
    result: "Meeting added to CRM",
  },
  {
    name: "Recommendations",
    icon: Sparkles,
    eyebrow: "Product discovery",
    messages: [
      { ai: false, text: "Which service is best for automating my sales team?" },
      { ai: true, text: "A CRM-connected AI assistant fits your goal. It can qualify leads and trigger follow-ups." },
      { ai: false, text: "Can it work with WhatsApp too?" },
      { ai: true, text: "Yes. We can connect the same intelligence across your website and WhatsApp." },
    ],
    result: "Right service recommended",
  },
];

export default function AIChatbotsPage() {
  const [activeScenario, setActiveScenario] = useState(0);
  const metricsRef = useRef<HTMLDivElement>(null);
  const scenario = scenarios[activeScenario];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-metric]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: metricsRef.current, start: "top 78%", once: true },
        },
      );
    }, metricsRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main className="ticket-page min-h-screen overflow-hidden bg-background text-ink">
        {/* Hero Section */}
        <section className="relative pb-24 pt-36 lg:pb-32 lg:pt-48">
          <div className="grid-bg pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[620px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,oklch(0.62_0.11_220/0.18),transparent_68%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <motion.div {...reveal} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3.5 py-2 text-xs font-medium text-ink-muted shadow-soft">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-glow opacity-40" /><span className="relative inline-flex size-2 rounded-full bg-primary-glow" /></span>
                Custom AI chatbot development
              </motion.div>
              <motion.h1 {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} className="mt-7 font-display text-[clamp(3.2rem,6.2vw,5.6rem)] leading-[0.96] tracking-[-0.045em]">
                AI chatbots that work like your <em className="text-gradient italic">best team member.</em>
              </motion.h1>
              <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">
                Automate customer conversations, lead qualification, support requests and business workflows with intelligent AI chatbots built specifically for your organization.
              </motion.p>
              <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.18 }} className="mt-9 flex flex-wrap gap-3">
                <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-elevated transition-all hover:-translate-y-0.5 hover:shadow-glow">
                  Book free consultation <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#showcase" className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-6 py-3.5 text-sm font-medium transition-colors hover:bg-surface">
                  See AI in action <MessageCircleMore className="size-4 text-primary" />
                </a>
              </motion.div>
              <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.24 }} className="mt-11 flex flex-wrap gap-x-7 gap-y-3 text-xs text-ink-muted">
                {["Your data, securely handled", "Built around your workflows", "Human support included"].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" />{item}</span>)}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 34, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="relative lg:col-span-6">
              <div className="absolute -inset-12 bg-[radial-gradient(circle,oklch(0.62_0.11_220/0.22),transparent_65%)]" />
              <div className="glow-ring relative overflow-hidden rounded-[1.75rem] border border-border bg-surface-elevated shadow-elevated">
                <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4">
                  <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-primary text-white"><Bot className="size-5" /></div><div><p className="text-sm font-semibold">Fillip AI Assistant</p><p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink-muted"><span className="size-1.5 rounded-full bg-emerald-500" />Online now</p></div></div>
                  <span className="rounded-full border border-border bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-ink-muted">Live demo</span>
                </div>
                <div className="min-h-[390px] space-y-5 p-5 sm:p-7">
                  <div className="flex justify-end"><div className="max-w-[82%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-white">I want information about your services.</div></div>
                  <div className="flex gap-3"><div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10"><Sparkles className="size-3.5 text-primary" /></div><div className="max-w-[82%] rounded-2xl rounded-tl-md border border-border bg-surface px-4 py-3 text-sm leading-relaxed">Sure. Which service are you interested in?</div></div>
                  <div className="flex justify-end"><div className="max-w-[82%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-white">Website development.</div></div>
                  <div className="flex gap-3"><div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10"><Sparkles className="size-3.5 text-primary" /></div><div className="max-w-[82%] rounded-2xl rounded-tl-md border border-border bg-surface px-4 py-3 text-sm leading-relaxed">Great choice. I can recommend the right package after two quick questions.</div></div>
                  <div className="ml-11 flex gap-2"><button className="rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary">Start a new website</button><button className="rounded-full border border-border px-3 py-2 text-xs text-ink-muted">Redesign existing</button></div>
                </div>
                <div className="m-4 mt-0 flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2.5"><span className="flex-1 text-xs text-ink-muted">Type your message...</span><span className="grid size-8 place-items-center rounded-full bg-primary text-white"><Send className="size-3.5" /></span></div>
              </div>
              <div className="surface-glass absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-2xl p-3.5 sm:flex"><div className="grid size-9 place-items-center rounded-xl bg-emerald-500/10"><Check className="size-4 text-emerald-600" /></div><div><p className="text-xs font-semibold">Lead qualified</p><p className="text-[10px] text-ink-muted">Synced to your CRM</p></div></div>
            </motion.div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="border-y border-border bg-surface py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...reveal} className="grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">The response gap</p><h2 className="mt-4 font-display text-5xl leading-[1] tracking-tight lg:text-6xl">Businesses cannot respond to every customer instantly.</h2></div><p className="max-w-md text-lg leading-relaxed text-ink-muted lg:col-span-4 lg:col-start-9">Every unanswered question is a moment of friction. At scale, those moments become missed revenue and exhausted teams.</p></motion.div>
            <motion.div {...reveal} className="mt-16 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5">
              {[['01','Missed leads','High-intent visitors leave before sales can respond.'],['02','Slow response','Customers expect help in seconds, not hours.'],['03','Repeat questions','Your experts spend time repeating basic answers.'],['04','Support overload','Ticket queues grow faster than teams can resolve them.'],['05','Lost opportunities','Context disappears between channels and handoffs.']].map(([n,t,d]) => <div key={t} className="group border-b border-r border-border bg-background p-6 transition-colors hover:bg-white lg:p-8"><span className="font-mono text-xs text-primary">{n}</span><h3 className="mt-12 font-display text-2xl">{t}</h3><p className="mt-3 text-sm leading-relaxed text-ink-muted">{d}</p></div>)}
            </motion.div>
          </div>
        </section>

        {/* AI Workflow */}
        <section className="relative py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...reveal} className="mx-auto max-w-3xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Always-on customer journey</p><h2 className="mt-4 font-display text-5xl leading-none tracking-tight lg:text-6xl">Let AI handle conversations <em className="text-gradient italic">24/7.</em></h2><p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">One intelligent flow from first question to the next business action.</p></motion.div>
            <div className="relative mt-16"><div className="absolute left-[7%] right-[7%] top-8 hidden h-px bg-border lg:block" /><motion.div {...reveal} className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-7">{["Visitor arrives","AI engages","Answers questions","Captures lead","Qualifies prospect","Schedules follow-up","Business grows"].map((item,i) => <div key={item} className="group relative text-center"><div className="relative mx-auto grid size-16 place-items-center rounded-2xl border border-border bg-surface-elevated shadow-soft transition-all group-hover:-translate-y-1 group-hover:border-primary/30"><span className="font-display text-xl text-primary">{String(i+1).padStart(2,"0")}</span></div><p className="mt-4 text-sm font-medium">{item}</p>{i < 6 && <ChevronRight className="absolute -right-3 top-6 hidden size-4 text-primary/40 lg:block" />}</div>)}</motion.div></div>
          </div>
        </section>

        {/* AI Capabilities */}
        <section className="bg-surface-dark py-24 text-white lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12">
            <motion.div {...reveal} className="lg:col-span-5"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-glow">Connected intelligence</p><h2 className="mt-4 font-display text-5xl leading-none tracking-tight lg:text-6xl">One chatbot.<br /><em className="italic text-primary-glow">Many roles.</em></h2><p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">Designed around your customer journey, trained on your business and connected to the tools your team already uses.</p><div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-primary-glow/15"><PlugZap className="size-5 text-primary-glow" /></div><div><p className="text-sm font-medium">Enterprise integrations</p><p className="text-xs text-white/45">Website, WhatsApp, CRM and APIs</p></div></div></div></motion.div>
            <motion.div {...reveal} className="lg:col-span-7"><div className="grid sm:grid-cols-2">{[[Target,"Lead generation"],[CircleUserRound,"Lead qualification"],[CalendarCheck,"Appointment booking"],[MessagesSquare,"FAQ automation"],[Headphones,"Customer support"],[ShoppingBag,"Product recommendations"],[MessageCircleMore,"WhatsApp integration"],[Database,"CRM integration"],[Languages,"Multi-language support"],[PlugZap,"Website integration"]].map(([I,label],i) => { const Icon=I as typeof Target; return <div key={label as string} className="group flex items-center gap-4 border-b border-white/10 py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"><span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:bg-primary-glow/15"><Icon className="size-4 text-primary-glow" /></span><span className="text-sm font-medium text-white/85">{label as string}</span><ArrowUpRight className="ml-auto size-4 text-white/20 transition-colors group-hover:text-primary-glow" /></div>})}</div></motion.div>
          </div>
        </section>

        {/* Chatbot Showcase */}
        <section id="showcase" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...reveal} className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Interactive showcase</p><h2 className="mt-4 font-display text-5xl leading-none tracking-tight lg:text-6xl">See how it works in the <em className="text-gradient italic">moments that matter.</em></h2></motion.div>
            <div className="mt-14 grid gap-6 lg:grid-cols-12">
              <div className="space-y-2 lg:col-span-4">{scenarios.map((item,index) => {const Icon=item.icon; return <button key={item.name} onClick={() => setActiveScenario(index)} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${activeScenario===index?'border-primary/25 bg-primary text-white shadow-elevated':'border-border bg-surface-elevated hover:border-border-strong hover:bg-surface'}`}><span className={`grid size-10 place-items-center rounded-xl ${activeScenario===index?'bg-white/12':'bg-primary/10'}`}><Icon className={`size-4 ${activeScenario===index?'text-white':'text-primary'}`} /></span><span className="text-sm font-medium">{item.name}</span><ChevronRight className="ml-auto size-4 opacity-50" /></button>})}</div>
              <motion.div key={activeScenario} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.35}} className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-soft lg:col-span-8"><div className="flex items-center justify-between border-b border-border bg-white px-5 py-4"><div><p className="text-xs uppercase tracking-wider text-ink-muted">{scenario.eyebrow}</p><p className="mt-1 text-sm font-semibold">{scenario.name}</p></div><span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" />Live conversation</span></div><div className="min-h-[420px] space-y-5 p-5 sm:p-8">{scenario.messages.map((message,index) => <div key={index} className={`flex ${message.ai?'justify-start':'justify-end'}`}>{message.ai && <span className="mr-3 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10"><Bot className="size-3.5 text-primary" /></span>}<div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.ai?'rounded-tl-md border border-border bg-white':'rounded-br-md bg-primary text-white'}`}>{message.text}</div></div>)}<div className="ml-11 inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/8 px-3 py-2 text-xs font-medium text-emerald-700"><CheckCircle2 className="size-3.5" />{scenario.result}</div></div></motion.div>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="border-y border-border bg-surface py-24 lg:py-32"><div className="mx-auto max-w-7xl px-6"><motion.div {...reveal} className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Industries we serve</p><h2 className="mt-4 max-w-2xl font-display text-5xl leading-none tracking-tight lg:text-6xl">Trained for the way your industry talks.</h2></div><p className="max-w-md text-ink-muted">From first enquiry to complex support, every experience reflects your terminology, policies and customer expectations.</p></motion.div><motion.div {...reveal} className="mt-14 flex flex-wrap gap-3">{[[GraduationCap,"Education"],[HeartPulse,"Healthcare"],[BriefcaseBusiness,"Real estate"],[ShoppingBag,"E-commerce"],[Utensils,"Restaurants"],[Sparkles,"Travel"],[Database,"Finance"],[GraduationCap,"Training institutes"],[Headphones,"Service businesses"]].map(([I,label])=>{const Icon=I as typeof Target; return <div key={label as string} className="group flex min-w-[190px] flex-1 items-center gap-3 rounded-2xl border border-border bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-soft"><span className="grid size-9 place-items-center rounded-xl bg-primary/8"><Icon className="size-4 text-primary" /></span><span className="text-sm font-medium">{label as string}</span></div>})}</motion.div></div></section>

        {/* Why Choose Us */}
        <section className="py-24 lg:py-32"><div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12"><motion.div {...reveal} className="lg:col-span-5"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Why Fillip Technologies</p><h2 className="mt-4 font-display text-5xl leading-none tracking-tight lg:text-6xl">Not another generic chatbot setup.</h2><p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">We create a business system that happens to speak. It knows your services, follows your rules and improves with real conversations.</p><a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">Build your AI experience <ArrowRight className="size-4" /></a></motion.div><motion.div {...reveal} className="lg:col-span-7"><div className="relative border-l border-border pl-7 sm:pl-10">{[["Custom development","Architecture and conversation design shaped around your exact goals."],["Business-specific training","Grounded in your approved content, policies, products and tone."],["Connected everywhere","Website, WhatsApp and CRM working as one customer journey."],["Ongoing optimization","Conversation reviews, insight-led improvements and dedicated support."]].map(([t,d],i)=><div key={t} className="relative border-b border-border py-7 first:pt-0 last:border-0"><span className="absolute -left-[2.25rem] top-7 grid size-5 place-items-center rounded-full border border-primary/20 bg-background sm:-left-[2.875rem]"><span className="size-1.5 rounded-full bg-primary" /></span><div className="flex gap-5"><span className="font-mono text-xs text-primary">0{i+1}</span><div><h3 className="font-display text-2xl">{t}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{d}</p></div></div></div>)}</div></motion.div></div></section>

        {/* Results */}
        <section ref={metricsRef} className="bg-surface-dark py-20 text-white"><div className="mx-auto max-w-7xl px-6"><p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-primary-glow">Designed for measurable impact</p><div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{[["24/7","Availability"],["80%","Faster response time"],["3x","Better lead engagement"],["Higher","Customer satisfaction"]].map(([value,label])=><div data-metric key={label} className="bg-surface-dark p-8 text-center"><p className="font-display text-5xl text-white">{value}</p><p className="mt-3 text-sm text-white/50">{label}</p></div>)}</div></div></section>

        {/* CTA */}
        <section id="contact" className="relative overflow-hidden py-24 lg:py-32"><div className="pointer-events-none absolute inset-0 grid-bg" /><div className="relative mx-auto max-w-5xl px-6 text-center"><motion.div {...reveal} className="rounded-[2rem] border border-border bg-surface-elevated px-6 py-16 shadow-elevated sm:px-12 lg:py-20"><div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary text-white shadow-glow"><MessagesSquare className="size-5" /></div><h2 className="mx-auto mt-7 max-w-3xl font-display text-5xl leading-none tracking-tight lg:text-6xl">Ready to deploy your AI chatbot?</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">Whether you need lead generation, customer support, appointment booking or business automation, Fillip Technologies can build an AI chatbot tailored to your organization.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><a href="mailto:info@filliptechnologies.com?subject=AI%20Chatbot%20Consultation" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-elevated">Schedule consultation <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a><a href="mailto:info@filliptechnologies.com" className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white px-6 py-3.5 text-sm font-medium">Contact us <ArrowUpRight className="size-4 text-primary" /></a></div></motion.div></div></section>
      </main>
      <Footer />
    </>
  );
}
