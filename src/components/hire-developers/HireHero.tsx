import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CircleCheck,
  Clock,
  Database,
  Handshake,
  Layers,
  MessageCircle,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Workflow,
} from "lucide-react";
import DiscussProjectButton from "@/components/shared/DiscussProjectButton";

const TRUST_POINTS: { label: string; icon: LucideIcon }[] = [
  { label: "Dedicated Developers", icon: UserCheck },
  { label: "Flexible Engagement", icon: Handshake },
  { label: "NDA & IP Protection", icon: ShieldCheck },
  { label: "Timezone Overlap", icon: Clock },
  { label: "Direct Developer Communication", icon: MessageCircle },
  { label: "Scalable Teams", icon: Users },
];

const BUILDS: { label: string; icon: LucideIcon }[] = [
  { label: "AI Agents", icon: Bot },
  { label: "Generative AI Apps", icon: Sparkles },
  { label: "RAG Systems", icon: Database },
  { label: "AI Automation", icon: Workflow },
  { label: "Chatbots", icon: MessagesSquare },
  { label: "AI Business Apps", icon: Layers },
];

const STACK = ["Python", "LangChain", "OpenAI", "Claude", "Vector DBs", "FastAPI"];

const STEPS = ["Share requirements", "Interview developers", "Start building"];

export default function HireHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Grid + glow background, matching the site's hero language */}
      <div
        aria-hidden
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(2,66,162,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,66,162,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-blue-200/40 via-cyan-200/30 to-transparent blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-blue-100/40 blur-[120px]"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: message + CTAs */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0242A2]">
              <BrainCircuit className="h-3.5 w-3.5" />
              Dedicated AI Engineers · India
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              Hire{" "}
              <span className="bg-gradient-to-r from-[#0242A2] via-[#0F6FFF] to-[#38BDF8] bg-clip-text text-transparent">
                AI Developers
              </span>{" "}
              in India
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Hire experienced AI developers from Fillip Technologies to build AI agents,
              generative AI applications, RAG systems, AI automation, chatbots and
              AI-powered business applications — working as an extension of your team.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <DiscussProjectButton href="/get-a-quote" label="Hire an AI Developer" />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/50 hover:text-[#0242A2]"
              >
                Discuss Your Project
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
              {TRUST_POINTS.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0242A2]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: "what you're hiring" panel */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(7,47,55,0.12)] backdrop-blur sm:p-7">
              {/* Role header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0242A2] to-[#38BDF8] text-white">
                    <BrainCircuit className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-slate-900">AI Developer</p>
                    <p className="text-sm text-slate-500">Dedicated · Remote from India</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              </div>

              {/* Stack chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* What they build */}
              <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-slate-400">
                What they build
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {BUILDS.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 text-xs font-semibold text-slate-700 sm:text-sm"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#0F6FFF]" />
                    {label}
                  </div>
                ))}
              </div>

              {/* How to start */}
              <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-slate-400">
                How to start
              </p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-3">
                {STEPS.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-2.5 rounded-xl bg-[#081C2E] px-3 py-2.5 text-xs font-medium text-white sm:text-sm"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-[0_18px_40px_rgba(7,47,55,0.12)] sm:flex lg:-left-8">
              <CircleCheck className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Your team, your process</p>
                <p className="text-xs text-slate-500">Daily standups · Direct Slack access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
