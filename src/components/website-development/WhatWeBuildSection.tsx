"use client";

<<<<<<< HEAD
import Image from "next/image";
import type { Service } from "@/data/services";

type WhatWeBuildSectionProps = {
    data?: Service["whatWeBuild"];
};

const defaultData: Service["whatWeBuild"] = {
    eyebrow: "SOLUTIONS WE ENGINEER",
    title: "Digital Products Built For",
    highlightedTitle: "Growth & Scale",
    description:
        "From business websites and ecommerce platforms to enterprise-grade applications, we build digital systems that drive measurable business outcomes.",
    cards: [
        {
            eyebrow: "Corporate Websites",
            title: "Professional Digital Presence",
            description:
                "High-performance websites engineered to establish trust, communicate value, and generate qualified business leads.",
            metric: "+42% Lead Growth",
        },
        {
            eyebrow: "E-Commerce Stores",
            title: "Built For Revenue Growth",
            description:
                "Conversion-focused ecommerce experiences with secure checkout, inventory management, and scalable architecture.",
            metric: "â‚¹2.4M Revenue",
        },
        {
            title: "Customer Portals",
            description:
                "Secure self-service portals for customers, vendors, and partners.",
        },
        {
            title: "Medical Applications",
            description:
                "Custom Medical applications that streamline workflows and operations.",
        },
        {
            title: "Educational Websites",
            description:
                "High-performance education websites that help institutions showcase programs, streamline admissions, and enhance student engagement.",
            tags: ["Admissions", "Courses", "Faculty", "Student Portal", "Results"],
        },
    ],
};

export default function WhatWeBuildSection({
    data = defaultData,
}: WhatWeBuildSectionProps) {
    const cards = data.cards;

=======

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function WhatWeBuildSection() {
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
    return (
        <section className="relative overflow-hidden py-20 lg:py-30">
            {/* Background Glow */}
            <div
                className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[120px]"
                style={{ background: "var(--glow-primary)" }}
            />

            <div
                className="absolute right-0 bottom-20 h-[400px] w-[400px] rounded-full blur-[120px]"
                style={{ background: "var(--glow-accent)" }}
            />

            <div className="container relative mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
<<<<<<< HEAD
                        {data.eyebrow}
                    </span>

                    <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
                        {data.title}
                        <span className="text-[var(--primary)]"> {data.highlightedTitle}</span>
                    </h2>

                    <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">
                        {data.description}
=======
                        SOLUTIONS WE ENGINEER
                    </span>

                    <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
                        Digital Products Built For
                        <span className="text-[var(--primary)]"> Growth & Scale</span>
                    </h2>

                    <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">
                        From business websites and ecommerce platforms to enterprise-grade
                        applications, we build digital systems that drive measurable
                        business outcomes.
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Corporate Website */}
                    <div className="group lg:col-span-6 rounded-[32px] border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-[0_25px_80px_rgba(15,111,255,0.12)]">
                        <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
<<<<<<< HEAD
                            {cards[0]?.eyebrow}
                        </span>

                        <h3 className="mt-5 text-2xl font-semibold text-[var(--heading)]">
                            {cards[0]?.title}
                        </h3>

                        <p className="mt-3 max-w-lg text-[var(--body)]">
                            {cards[0]?.description}
=======
                            Corporate Websites
                        </span>

                        <h3 className="mt-5 text-2xl font-semibold text-[var(--heading)]">
                            Professional Digital Presence
                        </h3>

                        <p className="mt-3 max-w-lg text-[var(--body)]">
                            High-performance websites engineered to establish trust,
                            communicate value, and generate qualified business leads.
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                        </p>

                        {/* Mockup */}
                        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
                            <div className="mb-4 flex gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-300" />
                                <div className="h-3 w-3 rounded-full bg-yellow-300" />
                                <div className="h-3 w-3 rounded-full bg-green-300" />
                            </div>

                            <div className="overflow-hidden rounded-xl">
                                <Image
                                    src="/images/proptru.png"
                                    alt="Corporate Website"
                                    width={1200}
                                    height={800}
                                    className="h-56 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="mt-4 inline-flex rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-medium text-white">
<<<<<<< HEAD
                                {cards[0]?.metric}
=======
                                +42% Lead Growth
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                            </div>
                        </div>
                    </div>

                    {/* Ecommerce */}
                    <div className="group lg:col-span-6 rounded-[32px] border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-[0_25px_80px_rgba(15,111,255,0.12)]">
                        <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
<<<<<<< HEAD
                            {cards[1]?.eyebrow}
                        </span>

                        <h3 className="mt-5 text-2xl font-semibold text-[var(--heading)]">
                            {cards[1]?.title}
                        </h3>

                        <p className="mt-3 max-w-lg text-[var(--body)]">
                            {cards[1]?.description}
=======
                            E-Commerce Stores
                        </span>

                        <h3 className="mt-5 text-2xl font-semibold text-[var(--heading)]">
                            Built For Revenue Growth
                        </h3>

                        <p className="mt-3 max-w-lg text-[var(--body)]">
                            Conversion-focused ecommerce experiences with secure checkout,
                            inventory management, and scalable architecture.
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="overflow-hidden rounded-2xl">
                                <Image
                                    src="/images/pharmaride.png"
                                    alt="Ecommerce Store"
                                    width={600}
                                    height={400}
                                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="overflow-hidden rounded-2xl">
                                <Image
                                    src="/images/pharmaride.png"
                                    alt="Ecommerce Store"
                                    width={600}
                                    height={400}
                                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        <div className="mt-4 inline-flex rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-medium text-white">
<<<<<<< HEAD
                            {cards[1]?.metric}
=======
                            ₹2.4M Revenue
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                        </div>
                    </div>

                    {/* Customer Portals */}
                    <div className="group lg:col-span-4 rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)]">
                        <h3 className="text-xl font-semibold text-[var(--heading)]">
<<<<<<< HEAD
                            {cards[2]?.title}
                        </h3>

                        <p className="mt-3 text-sm text-[var(--body)]">
                            {cards[2]?.description}
=======
                            Customer Portals
                        </h3>

                        <p className="mt-3 text-sm text-[var(--body)]">
                            Secure self-service portals for customers, vendors, and partners.
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                        </p>

                        <div className="mt-6 overflow-hidden rounded-2xl">
                            <Image
                                src="/images/weddding.png"
                                alt="Web Application"
                                width={800}
                                height={500}
                                className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Web Apps */}
                    <div className="group lg:col-span-4 rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)]">
                        <h3 className="text-xl font-semibold text-[var(--heading)]">
<<<<<<< HEAD
                            {cards[3]?.title}
                        </h3>

                        <p className="mt-3 text-sm text-[var(--body)]">
                            {cards[3]?.description}
=======
                            Medical Applications
                        </h3>

                        <p className="mt-3 text-sm text-[var(--body)]">
                            Custom Medical applications that streamline workflows and operations.
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                        </p>

                        <div className="mt-6 overflow-hidden rounded-2xl">
                            <Image
                                src="/images/domus.png"
                                alt="Web Application"
                                width={800}
                                height={500}
                                className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <div className="group lg:col-span-4 rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)]">
                        <h3 className="text-xl font-semibold text-[var(--heading)]">
<<<<<<< HEAD
                            {cards[4]?.title}
                        </h3>

                        <p className="mt-3 text-sm text-[var(--body)]">
                            {cards[4]?.description}
=======
                            Educational Websites
                        </h3>

                        <p className="mt-3 text-sm text-[var(--body)]">
                            High-performance education websites that help institutions showcase
                            programs, streamline admissions, and enhance student engagement.
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                        </p>

                        <div className="mt-6 overflow-hidden rounded-2xl">
                            <Image
                                src="/images/litera.png"
                                alt="Educational Website"
                                width={800}
                                height={500}
                                className="
        h-40
        w-full
        object-cover
        object-top
        transition-transform
        duration-500
        group-hover:scale-105
      "
                            />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
<<<<<<< HEAD
                            {(cards[4]?.tags ?? []).map((item) => (
=======
                            {[
                                "Admissions",
                                "Courses",
                                "Faculty",
                                "Student Portal",
                                "Results",
                            ].map((item) => (
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                                <span
                                    key={item}
                                    className="rounded-full border border-[var(--border)] px-3 py-1 text-xs"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                {/* <div className="mt-14 text-center">
                    <Link
                        href="/website-development"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.02]"
                    >
                        Explore Website Development Services
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div> */}
            </div>
        </section>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
