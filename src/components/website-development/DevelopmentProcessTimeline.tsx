"use client";

import Image from "next/image";
import type { Service } from "@/data/services";

const processSteps = [
  {
    title: "Discovery",
    items: [
      "Business Analysis",
      "Requirement Gathering",
      "Competitor Research",
      "Goal Definition",
    ],
    offset: "mt-52",
  },
  {
    title: "Planning",
    items: [
      "Information Architecture",
      "Feature Mapping",
      "Project Roadmap",
      "Technology Selection",
    ],
    offset: "mt-36",
  },
  {
    title: "UI/UX Design",
    items: [
      "Wireframing",
      "User Flows",
      "Visual Design",
      "Interactive Prototypes",
    ],
    offset: "mt-20",
  },
  {
    title: "Develop",
    items: [
      "Frontend Development",
      "Backend Development",
      "CMS Integration",
      "API Development",
    ],
    offset: "mt-4",
  },
  {
    title: "Testing",
    items: [
      "Quality Assurance",
      "Performance Testing",
      "Security Validation",
      "Bug Resolution",
    ],
    offset: "-mt-12",
  },
  {
    title: "Launch",
    items: [
      "Deployment",
      "Monitoring",
      "Maintenance",
      "Growth Support",
    ],
    offset: "-mt-28",
  },
];

type WebsiteProcessTimelineProps = {
  data?: Service["process"];
};

const defaultData: Service["process"] = {
  title: "Project Phases",
  highlightedTitle: "and Timeline",
  description:
    "From discovery and planning to deployment and support, every stage is focused on building secure, scalable, and growth-driven digital experiences.",
  steps: processSteps.map(({ title, items }) => ({ title, items })),
};

export default function WebsiteProcessTimeline({
  data = defaultData,
}: WebsiteProcessTimelineProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <Image
        src="/images/4.png"
        alt=""
        width={520}
        height={520}
        className="pointer-events-none absolute -left-28 -top-28 z-0 h-auto w-[320px] opacity-60 lg:w-[450px]"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="grid gap-12 lg:grid-cols-2">
          <div>


            <h2 className="mt-10 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-7xl">
              {data.title}
              <br />
              {data.highlightedTitle}
            </h2>
          </div>

          <div className="flex items-start lg:justify-end">
            <p className="max-w-md text-lg leading-relaxed text-[var(--body)]">
              {data.description}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-6 lg:gap-0">
            {data.steps.map((step, index) => (
              <div
                key={index}
                className={`
                  relative
                  px-6
                  border-l
                  border-[var(--border)]
                  ${processSteps[index]?.offset ?? ""}
                `}
              >
                <div className="mb-5 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[var(--primary)]">
                  0{index + 1}
                </div>

                <h3 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--heading)]">
                  {step.title}
                </h3>

                <div className="mt-6 space-y-3">
                  {step.items.map((item) => (
                    <p
                      key={item}
                      className="text-[15px] text-[var(--body)]"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Image
        src="/images/process.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute right-2 top-100 z-0 hidden h-auto w-[300px] lg:block xl:w-[420px]"
      />
    </section>
  );
}
