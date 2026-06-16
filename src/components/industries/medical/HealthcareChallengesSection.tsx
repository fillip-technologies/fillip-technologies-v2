"use client";

import Image from "next/image";

const challenges = [
    {
        badge: "Patient Experience",
        title: "Poor Website Experience",
        description:
            "Slow loading pages, outdated designs, and confusing navigation create friction that discourages patients from booking appointments or contacting your practice.",
        impact: "Lost Patient Opportunities",
        image: "/images/healthcare/problem-1.png",
    },
    {
        badge: "Search Visibility",
        title: "Low Google Visibility",
        description:
            "When patients search for healthcare services, your competitors appear first. Limited visibility reduces discovery, credibility, and appointment enquiries.",
        impact: "Fewer Appointment Requests",
        image: "/images/healthcare/problem-2.png",
    },
    {
        badge: "Patient Trust",
        title: "Weak Social Presence",
        description:
            "Inconsistent content and low engagement make it harder for patients to trust your expertise and choose your organization.",
        impact: "Lower Patient Confidence",
        image: "/images/healthcare/problem-3.png",
    },
];

export default function HealthcareChallengesSection() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            <div className="container mx-auto max-w-7xl px-6">
                <Image
                    src="/images/flower.png"
                    alt=""
                    width={420}
                    height={420}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-20 z-0 hidden lg:block xl:w-[420px]"
                    style={{
                        opacity: 0.30,
                    }}
                />

                {/* Heading */}
                <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
                    <div className="max-w-2xl">
                        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                            Challenges We Solve
                        </span>

                        <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            Why Healthcare Businesses Struggle to Attract Patients Online
                        </h2>
                    </div>

                    <div className="max-w-xl mt-16">
                        <p className="text-lg leading-8 text-slate-600">
                            Even exceptional healthcare providers lose patient opportunities
                            when their digital presence fails to build visibility, trust, and
                            engagement.
                        </p>


                    </div>
                </div>

                {/* Cards */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {challenges.map((item) => (
                        <div
                            key={item.title}
                            className="group rounded-[30px] border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                        >
                            {/* Screenshot Area */}
                            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={500}
                                    height={320}
                                    className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                />
                            </div>

                            {/* Badge */}
                            <div className="mt-5">
                                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                    {item.badge}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="mt-4 text-2xl font-bold text-slate-900">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-4 text-sm leading-7 text-slate-600">
                                {item.description}
                            </p>

                            {/* Impact */}
                            <div className="mt-6 border-t border-slate-100 pt-4">
                                <p className="text-sm font-semibold text-slate-900">
                                    {item.impact}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}