"use client";

import {
    Boxes,
    Users,
    UserRound,
    Package,
    Workflow,
    BarChart3,
    ArrowRight,
} from "lucide-react";

const solutions = [
    {
        title: "ERP Mobile Applications",
        description:
            "Centralize business operations, finance, HR, procurement and reporting into a unified mobile experience.",
        icon: Boxes,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50",
    },
    {
        title: "Field Workforce Management Apps",
        description:
            "Manage field teams, attendance, task assignments, live tracking and productivity in real time.",
        icon: Users,
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-50",
    },
    {
        title: "Employee Self-Service Applications",
        description:
            "Empower employees with leave requests, approvals, payroll access and internal communication tools.",
        icon: UserRound,
        iconColor: "text-cyan-600",
        iconBg: "bg-cyan-50",
    },
    {
        title: "Inventory & Asset Tracking Apps",
        description:
            "Track inventory, equipment and assets with real-time visibility across locations and teams.",
        icon: Package,
        iconColor: "text-violet-600",
        iconBg: "bg-violet-50",
    },
    {
        title: "Workflow Automation Platforms",
        description:
            "Automate repetitive processes, approvals and operational workflows to improve efficiency.",
        icon: Workflow,
        iconColor: "text-sky-600",
        iconBg: "bg-sky-50",
    },
    {
        title: "Executive Analytics Dashboards",
        description:
            "Transform business data into actionable insights through interactive executive reporting dashboards.",
        icon: BarChart3,
        iconColor: "text-blue-700",
        iconBg: "bg-blue-50",
    },
];

export default function EnterpriseApplicationsSection() {
    return (
        <section className="relative overflow-hidden py-20 lg:py-22 pb-8">
            {/* Glow */}
            <div
                className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full blur-[140px]"
                style={{ background: "var(--glow-primary)" }}
            />

            <div
                className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full blur-[140px]"
                style={{ background: "var(--glow-accent)" }}
            />

            <div className="container relative mx-auto max-w-7xl px-6">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
                        ENTERPRISE APPLICATIONS
                    </span>

                    <h2 className="mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
                        Enterprise Solutions
                        <span className="block text-[var(--primary)]">
                            Tailored To Your Business
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-relaxed text-[var(--body)]">
                        We design and develop enterprise-grade applications that
                        streamline operations, improve workforce productivity,
                        and provide real-time business intelligence.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {solutions.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
                            >
                                {/* Glow */}
                                <div
                                    className="absolute right-0 top-0 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                                    style={{ background: "var(--glow-primary)" }}
                                />

                                {/* Icon */}
                                <div
                                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl ${item.iconBg}`}
                                >
                                    <Icon className={`h-8 w-8 ${item.iconColor}`} />
                                </div>

                                {/* Number */}
                                <div className="absolute right-6 top-6 text-5xl font-bold text-slate-100">
                                    {String(
                                        solutions.findIndex(
                                            (s) => s.title === item.title
                                        ) + 1
                                    ).padStart(2, "0")}
                                </div>

                                <h3 className="relative z-10 mt-8 text-2xl font-semibold leading-tight text-[var(--heading)]">
                                    {item.title}
                                </h3>

                                <p className="relative z-10 mt-4 leading-relaxed text-[var(--body)]">
                                    {item.description}
                                </p>

                                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                                    <span className="text-sm text-slate-500">
                                        Enterprise Solution
                                    </span>

                                    <div className="flex items-center gap-2 font-medium text-[var(--primary)]">
                                        Request Proposal
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}