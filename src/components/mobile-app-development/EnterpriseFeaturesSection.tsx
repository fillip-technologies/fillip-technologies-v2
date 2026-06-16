"use client";

import Image from "next/image";
import {
    ShieldCheck,
    KeyRound,
    BarChart3,
    Lock,
    RefreshCw,
    Cloud,
    Layers3,
    Workflow,
} from "lucide-react";

const features = [
    {
        title: "Enterprise Security",
        description: "Advanced encryption and secure enterprise-grade protection.",
        icon: ShieldCheck,
    },
    {
        title: "Single Sign-On (SSO)",
        description: "Unified authentication across all enterprise systems.",
        icon: KeyRound,
    },
    {
        title: "Real-Time Analytics",
        description: "Monitor KPIs and business performance instantly.",
        icon: BarChart3,
    },
    {
        title: "Role-Based Access Control",
        description: "Granular permissions for departments and teams.",
        icon: Lock,
    },
    {
        title: "Offline Synchronization",
        description: "Continue operations even without connectivity.",
        icon: RefreshCw,
    },
    {
        title: "Cloud & API Integration",
        description: "Connect seamlessly with third-party systems.",
        icon: Cloud,
    },
    {
        title: "Scalable Architecture",
        description: "Built to grow alongside your organization.",
        icon: Layers3,
    },
    {
        title: "Multi-Department Workflows",
        description: "Enable collaboration across business units.",
        icon: Workflow,
    },
];

export default function EnterpriseFeaturesSection() {
    return (
        <section className="relative overflow-hidden py-22 lg:py-24">

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
        linear-gradient(to right, #2563eb 1px, transparent 1px),
        linear-gradient(to bottom, #2563eb 1px, transparent 1px)
      `,
                    backgroundSize: "70px 70px",
                }}
            />

            {/* Left Glow */}
            <div
                className="absolute left-0 top-20 h-[450px] w-[450px] rounded-full blur-[150px]"
                style={{ background: "var(--glow-primary)" }}
            />

            {/* Right Glow */}
            <div
                className="absolute right-0 bottom-20 h-[450px] w-[450px] rounded-full blur-[150px]"
                style={{ background: "var(--glow-accent)" }}
            />
            {/* Background Glow */}
            <div
                className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[140px]"
                style={{ background: "var(--glow-primary)" }}
            />

            <div
                className="absolute right-0 bottom-20 h-[400px] w-[400px] rounded-full blur-[140px]"
                style={{ background: "var(--glow-accent)" }}
            />

            <div className="container mx-auto max-w-7xl px-6">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
                        ENTERPRISE FEATURES
                    </span>

                    <h2 className="mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
                        Built For Enterprise
                        <span className="block text-[var(--primary)]">
                            Performance
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-relaxed text-[var(--body)]">
                        Enterprise-grade capabilities designed to deliver
                        security, scalability and operational efficiency.
                    </p>
                </div>

                {/* Main Layout */}
                <div className="mt-20 grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
                    {/* Left Visual */}
                    <div className="relative flex justify-center">
                        {/* Glow */}
                        <div
                            className="absolute inset-0 rounded-full blur-[120px]"
                            style={{ background: "var(--glow-primary)" }}
                        />

                        {/* Dashboard */}
                        <div className="relative">
                            {/* Concentric Rings */}
                            <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/60" />

                            <div className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/50" />

                            <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/40" />

                            <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/30" />
                            <Image
                                src="/images/enterprise-mobile-dashboardd.png"
                                alt="Enterprise Mobile Dashboard"
                                width={650}
                                height={800}
                                className="relative z-10 mx-auto max-w-[480px]"
                            />




                        </div>
                    </div>

                    {/* Right Features */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-200" />

                        <div className="space-y-8">
                            {features.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={feature.title}
                                        className="group relative flex gap-6"
                                    >
                                        {/* Icon */}
                                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-[var(--border)] shadow-sm transition-all duration-300 group-hover:border-[var(--primary)] group-hover:shadow-lg">
                                            <Icon className="h-5 w-5 text-[var(--primary)]" />
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <h3 className="text-xl font-semibold text-[var(--heading)]">
                                                {feature.title}
                                            </h3>

                                            <p className="mt-2 leading-relaxed text-[var(--body)]">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}