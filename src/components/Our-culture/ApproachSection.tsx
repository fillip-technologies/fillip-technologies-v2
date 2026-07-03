"use client";

import { motion } from "framer-motion";
import { Search, Map, Code, Activity, TrendingUp } from "lucide-react";

const DEFAULT_STEPS = [
  {
    phase: "01",
    title: "Discover",
    description: "We are aware of your business objectives, target audience, and market competitiveness.",
    icon: Search,
    color: "bg-blue-500",
    glow: "shadow-blue-500/20",
    textGradient: "from-blue-500 to-indigo-500",
  },
  {
    phase: "02",
    title: "Strategize",
    description: "We plan a customized roadmap that aligns with your growth objectives.",
    icon: Map,
    color: "bg-indigo-500",
    glow: "shadow-indigo-500/20",
    textGradient: "from-indigo-500 to-purple-500",
  },
  {
    phase: "03",
    title: "Create",
    description: "We first design, develop, and market solutions that adhere to your brand identity.",
    icon: Code,
    color: "bg-purple-500",
    glow: "shadow-purple-500/20",
    textGradient: "from-purple-500 to-pink-500",
  },
  {
    phase: "04",
    title: "Optimise",
    description: "Our persistent monitoring and improvement ensure optimised performance and results.",
    icon: Activity,
    color: "bg-pink-500",
    glow: "shadow-pink-500/20",
    textGradient: "from-pink-500 to-rose-500",
  },
  {
    phase: "05",
    title: "Grow",
    description: "We make sure that your business grows with our long-lasting business strategies.",
    icon: TrendingUp,
    color: "bg-rose-500",
    glow: "shadow-rose-500/20",
    textGradient: "from-rose-500 to-emerald-500",
  },
];

type ApproachContent = Partial<{
  eyebrow: string;
  heading: string;
  description: string;
  steps: { phase: string; title: string; description: string }[];
}>;

export default function ApproachSection({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as ApproachContent;
  const c = {
    eyebrow: content.eyebrow ?? "METHODOLOGY",
    heading: content.heading ?? "Our Approach: Simple Yet Powerful",
    description:
      content.description ??
      "Being the best lead generation agency, we follow a step-by-step and collaborative process, ensuring every project is designed for success.",
  };
  const steps = content.steps?.length
    ? content.steps.map((s, i) => ({ ...DEFAULT_STEPS[i % DEFAULT_STEPS.length], phase: s.phase, title: s.title, description: s.description }))
    : DEFAULT_STEPS;

  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-950">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary dark:text-blue-400">
              {c.eyebrow}
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-heading dark:text-white sm:text-5xl">
              {c.heading}
            </h2>
            <div className="mt-4 mx-auto h-1.5 w-20 rounded-full bg-primary" />
            <p className="mt-6 text-lg leading-relaxed text-body dark:text-slate-400">
              {c.description}
            </p>
          </motion.div>
        </div>

        {/* Desktop timeline horizontal representation */}
        <div className="relative mt-16 hidden lg:block">
          {/* Main timeline track line */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-[3px] bg-slate-100 dark:bg-slate-800">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500" 
            />
          </div>

          <div className="grid grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center px-2 group"
                >
                  {/* Step bubble */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className={`relative z-10 flex size-24 items-center justify-center rounded-full bg-white border border-slate-150 shadow-md transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 group-hover:border-transparent group-hover:text-white group-hover:${step.glow}`}
                  >
                    {/* Background hover bubble */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${step.textGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
                    <Icon className="size-8 text-heading dark:text-white group-hover:text-white transition-colors duration-300" />
                  </motion.div>

                  {/* Step label / Title */}
                  <div className="mt-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Phase {step.phase}
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-heading dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-body dark:text-slate-400 max-w-[220px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet vertical layout */}
        <div className="relative mt-12 lg:hidden">
          {/* Vertical timeline line */}
          <div className="absolute left-[39px] top-4 bottom-4 w-[3px] bg-slate-100 dark:bg-slate-800">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-rose-500"
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  {/* Step bubble */}
                  <div className="relative z-10 flex size-[80px] shrink-0 items-center justify-center rounded-full bg-white border border-slate-150 shadow-md dark:bg-slate-900 dark:border-slate-800">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${step.textGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
                    <Icon className="size-6 text-heading dark:text-white group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Phase {step.phase}
                    </span>
                    <h3 className="mt-0.5 text-lg font-bold text-heading dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body dark:text-slate-400 max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
