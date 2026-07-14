"use client";

import {
  Globe,
  Search,
  Users,
  Share2,
  Megaphone,
  Clock3,
  MapPin,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const iconMap = {
  Globe,
  Search,
  Users,
  Share2,
  Megaphone,
  Clock3,
  MapPin,
  ShieldCheck,
  TrendingUp,
};

type IndustryProcessTimelineProps = {
  data: {
    headingPrimary: string;
    headingSecondary: string;
    tags: string[];
    eyebrow: string;
    labels: string[];
    steps: {
      step: string;
      title: string;
      description: string;
      icon: string;
      active?: boolean;
    }[];
  };
};

export default function IndustryProcessTimeline({ data }: IndustryProcessTimelineProps) {
  return (
    <section className="relative overflow-hidden bg-[#071428] py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-white md:text-6xl">
            <span className="text-cyan-400">{data.headingPrimary}</span>{" "}
            <span className="text-blue-400">{data.headingSecondary}</span>
          </h2>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-slate-400">
            {data.tags.map((tag, index) => (
              <span key={`${tag}-${index}`}>{tag}</span>
            )).flatMap((item, index, items) =>
              index < items.length - 1
                ? [item, <span key={`separator-${index}`}>•</span>]
                : [item],
            )}
          </div>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            {data.eyebrow}
          </p>
        </div>

        {/* Process Area */}
        <div className="relative">
          {/* Flow Line */}
          <div className="absolute left-[8%] right-[8%] top-[48%] hidden lg:block">
            <div className="h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
          </div>

          {/* Labels */}
          <div className="absolute left-[21%] top-[44%] hidden lg:block">
            <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-300">
              {data.labels[0]}
            </span>
          </div>

          <div className="absolute left-[40%] top-[44%] hidden lg:block">
            <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-300">
              {data.labels[1]}
            </span>
          </div>

          <div className="absolute left-[59%] top-[44%] hidden lg:block">
            <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-300">
              {data.labels[2]}
            </span>
          </div>

          <div className="absolute left-[78%] top-[44%] hidden lg:block">
            <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-300">
              {data.labels[3]}
            </span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {data.steps.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];

              return (
                <div
                  key={item.step}
                  className={`relative flex min-h-[280px] flex-col items-center justify-center rounded-[28px] p-6 text-center transition-all duration-300 ${
                    item.active
                      ? "scale-105 border border-cyan-400 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 text-white shadow-[0_25px_80px_rgba(59,130,246,0.35)]"
                      : "border border-white/10 bg-white/5 backdrop-blur-xl text-white"
                  }`}
                >
                  {/* Step Badge */}
                  <div className="absolute -top-3">
                    <span
                      className={`rounded-full px-4 py-1 text-xs font-bold text-white ${
                        item.active
                          ? "bg-emerald-500"
                          : "bg-slate-800"
                      }`}
                    >
                      STEP {item.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                      item.active
                        ? "bg-white/15"
                        : "bg-white/10"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`h-8 w-8 ${
                          item.active
                            ? "text-white"
                            : "text-cyan-300"
                        }`}
                      />
                    )}
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
