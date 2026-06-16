"use client";

import Image from "next/image";
import {
    Globe,
    Search,
    Share2,
    Megaphone,
} from "lucide-react";

const leftCards = [
    {
        icon: Globe,
        title: "Website Development",
        description:
            "Build a modern healthcare website that creates trust and converts visitors into patients.",
    },
    {
        icon: Search,
        title: "SEO Optimization",
        description:
            "Increase your online visibility and rank higher in search results.",
    },
];

const rightCards = [
    {
        icon: Share2,
        title: "Social Media",
        description:
            "Engage your audience and grow your healthcare brand across platforms.",
    },
    {
        icon: Megaphone,
        title: "Paid Advertising",
        description:
            "Generate qualified leads through targeted advertising campaigns.",
    },
];

export default function HealthcareGrowthEngine() {
    return (
        <section className="relative overflow-hidden py-28">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                {/* Grid */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(59,130,246,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59,130,246,0.08) 1px, transparent 1px)
            `,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Glows */}
                <div className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[140px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center max-w-4xl mx-auto ">
                    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
                        Growth Ecosystem
                    </span>

                    <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                       One Growth Engine. Four Digital Channels.
                    </h2>

                    <p className="mt-6 text-lg text-slate-600">
                       Website Development, SEO, Social Media, and Paid Advertising work together inside one connected healthcare growth system to attract, engage, and convert more patients.
                    </p>
                </div>

                {/* Main Layout */}
                <div className="hidden lg:flex justify-center items-center gap-12">
                    {/* Left Cards */}
                    <div className="flex flex-col gap-8 w-[300px]">
                        {leftCards.map((card, index) => {
                            const Icon = card.icon;

                            return (
                                <div
                                    key={index}
                                    className="group rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_70px_rgba(37,99,235,0.15)] transition-all duration-300"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                                        <Icon className="h-6 w-6 text-blue-600" />
                                    </div>

                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {card.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                        {card.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Funnel */}
                    <div className="relative flex flex-col items-center">
                        {/* Pills */}


                        {/* Glow */}
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-[120px]" />

                        <Image
                            src="/images/funel-stack.png"
                            alt="Healthcare Funnel"
                            width={500}
                            height={500}
                            className="relative z-10 "
                            priority
                        />

                        {/* Output Pills */}

                    </div>

                    {/* Right Cards */}
                    <div className="flex flex-col gap-8 w-[300px]">
                        {rightCards.map((card, index) => {
                            const Icon = card.icon;

                            return (
                                <div
                                    key={index}
                                    className="group rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_70px_rgba(37,99,235,0.15)] transition-all duration-300"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                                        <Icon className="h-6 w-6 text-blue-600" />
                                    </div>

                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {card.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                        {card.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #e2e8f0;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(12px);
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
        </section>
    );
}