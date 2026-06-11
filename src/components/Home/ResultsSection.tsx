"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const outcomes = [
  {
    value: "60%",
    title: "Reduction in Manual Effort",
    description:
      "Automating repetitive workflows and operational tasks through intelligent systems.",
  },
  {
    value: "3×",
    title: "Faster Processing",
    description:
      "Accelerated execution through connected systems, AI assistance, and automation.",
  },
  {
    value: "95%",
    title: "Client Retention",
    description:
      "Long-term partnerships built through reliable delivery and measurable outcomes.",
  },
  {
    value: "1000+",
    title: "Projects Delivered",
    description:
      "Applications, platforms, integrations, automation systems, and AI solutions.",
  },
];

export default function ImpactSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Subtle Grid */}

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Glow */}

      <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[140px]" />

      <div className="relative mx-auto max-w-[1350px] px-6">
        {/* Header */}

        <div className="mb-20 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-primary">
              IMPACT THAT MATTERS
            </p>

            <h2 className="max-w-[700px] text-heading text-4xl md:text-6xl font-semibold leading-[0.95]">
              Business Outcomes,
              <br />
              Not Just Deliverables.
            </h2>
          </div>

          <p className="max-w-[450px] text-body leading-relaxed">
            We help organizations reduce operational complexity,
            accelerate execution, and create measurable growth through
            AI, automation, cloud, and enterprise technology.
          </p>
        </div>

        {/* Grid */}

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Hero Card */}

          <motion.div
            whileHover={{ y: -8 }}
            className="
              group
              relative
              overflow-hidden
              rounded-[36px]
              bg-card
              p-10
              lg:col-span-7
              min-h-[500px]
            "
          >
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/5 blur-[90px]" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="mb-6 inline-flex rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.25em] text-body">
                  Primary Outcome
                </div>

                <h3 className="text-heading text-7xl md:text-8xl font-bold leading-none">
                  {outcomes[0].value}
                </h3>

                <h4 className="mt-6 max-w-md text-heading text-3xl font-semibold leading-tight">
                  {outcomes[0].title}
                </h4>

                <p className="mt-6 max-w-lg text-body leading-relaxed">
                  {outcomes[0].description}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-3 text-primary">
                <span className="text-sm font-medium">
                  Measurable Efficiency Gains
                </span>

                <ArrowUpRight size={18} />
              </div>
            </div>
          </motion.div>

          {/* Right Column */}

          <div className="grid gap-6 lg:col-span-5">
            {outcomes.slice(1).map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className="
                  group
                  rounded-[32px]
                  bg-card
                  p-8
                  transition-all
                  duration-300
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-heading text-5xl font-bold">
                      {item.value}
                    </div>

                    <h3 className="mt-4 text-heading text-2xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-sm text-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}