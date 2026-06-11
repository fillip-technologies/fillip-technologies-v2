"use client";

import Image from "next/image";
import { useState } from "react";
<<<<<<< HEAD
import type { Service } from "@/data/services";
=======
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)

const techStacks = {
    frontend: {
        title: "Frontend Development",
        description:
            "Modern interfaces engineered for speed, responsiveness, and exceptional user experiences.",
        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Vue.js",
            "Angular",
        ],
        centerImage: "/images/stack/frontend-hub.png",
        orbitIcons: [
            "/images/tech/nextjs.png",
            "/images/tech/react.png",
            "/images/tech/typescript.png",
            "/images/tech/tailwind.png",
            "/images/tech/vue.png",
            "/images/tech/angular.png",
        ],
    },

    backend: {
        title: "Backend Development",
        description:
            "Robust server-side architectures built for performance, security, and scalability.",
        technologies: [
            "Node.js",
            "Laravel",
            ".NET",
            "Python",
            "Java",
            "REST APIs",
        ],
        centerImage: "/images/stack/backend-hub.png",
        orbitIcons: [
            "/images/tech/nodejs.png",
            "/images/tech/laravel.png",
            "/images/tech/dotnet.png",
            "/images/tech/python.png",
            "/images/tech/java.png",
            "/images/tech/rest-api.png",
        ],
    },

    cms: {
        title: "CMS & Ecommerce",
        description:
            "Flexible content and commerce platforms tailored for business growth.",
        technologies: [
            "WordPress",
            "Shopify",
            "WooCommerce",
            "Strapi",
            "Headless CMS",
            "Contentful",
        ],
        centerImage: "/images/stack/cms-hub.png",
        orbitIcons: [
            "/images/tech/wordpress.png",
            "/images/tech/shopify.png",
            "/images/tech/woocommerce.png",
            "/images/tech/strapi.png",
            "/images/tech/headless-cms.png",
            "/images/tech/contentful.png",
        ],
    },

    cloud: {
        title: "Cloud & Deployment",
        description:
            "Reliable cloud infrastructure and DevOps practices for continuous delivery.",
        technologies: [
            "AWS",
            "Azure",
            "Google Cloud",
            "Docker",
            "CI/CD",
            "Vercel",
        ],
        centerImage: "/images/stack/cloud-hub.png",
        orbitIcons: [
            "/images/tech/aws.png",
            "/images/tech/azure.png",
            "/images/tech/google-cloud.png",
            "/images/tech/docker.png",
            "/images/tech/cicd.png",
            "/images/tech/vercel.png",
        ],
    },
};

<<<<<<< HEAD
type TechnologyStackSectionProps = {
    data?: Service["technologyStack"];
};

const defaultData: Service["technologyStack"] = {
    eyebrow: "Our Stack",
    title: "Built With Modern",
    highlightedTitle: "Technologies",
    description:
        "We leverage industry-leading technologies, frameworks, and platforms to deliver secure, scalable, and future-ready websites.",
    stacks: Object.fromEntries(
        Object.entries(techStacks).map(([key, item]) => [
            key,
            {
                title: item.title,
                description: item.description,
                technologies: item.technologies,
            },
        ])
    ),
    whyTitle: "Why This Stack?",
    whyDescription:
        "We carefully choose technologies based on performance, maintainability, scalability, security, and long-term business requirements rather than following trends.",
};

export default function TechnologyStackSection({
    data = defaultData,
}: TechnologyStackSectionProps) {
    const stackEntries = Object.entries(data.stacks);
    const [active, setActive] = useState(stackEntries[0]?.[0] ?? "frontend");

    const current = data.stacks[active] ?? stackEntries[0]?.[1] ?? defaultData.stacks.frontend;
    const currentVisual =
        techStacks[active as keyof typeof techStacks] ?? techStacks.frontend;
=======
export default function TechnologyStackSection() {
    const [active, setActive] =
        useState<keyof typeof techStacks>("frontend");

    const current = techStacks[active];
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)

    return (
        <section className="relative overflow-hidden py-24 lg:py-20">
            {/* Background Glow */}
            <div
                className="absolute left-0 top-20 h-[350px] w-[350px] rounded-full blur-[120px]"
                style={{ background: "var(--glow-primary)" }}
            />

            <div
                className="absolute right-0 bottom-20 h-[350px] w-[350px] rounded-full blur-[120px]"
                style={{ background: "var(--glow-accent)" }}
            />

            <div className="container mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
<<<<<<< HEAD
                        {data.eyebrow}
                    </span>

                    <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
                        {data.title}
                        <span className="text-[var(--primary)]">
                            {" "}
                            {data.highlightedTitle}
=======
                        Our Stack
                    </span>

                    <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
                        Built With Modern
                        <span className="text-[var(--primary)]">
                            {" "}
                            Technologies
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                        </span>
                    </h2>

                    <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">
<<<<<<< HEAD
                        {data.description}
=======
                        We leverage industry-leading technologies, frameworks,
                        and platforms to deliver secure, scalable, and future-ready
                        websites.
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                    </p>
                </div>

                {/* Tabs */}
                <div className="mt-12 flex flex-wrap justify-center gap-3">
<<<<<<< HEAD
                    {stackEntries.map(([key, item]) => {
=======
                    {Object.entries(techStacks).map(([key, item]) => {
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                        return (
                            <button
                                key={key}
                                onClick={() =>
<<<<<<< HEAD
                                    setActive(key)
=======
                                    setActive(key as keyof typeof techStacks)
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                                }
                                className={`flex items-center gap-2 rounded-full px-5 py-3 transition-all duration-300 ${active === key
                                        ? "bg-[var(--primary)] text-white shadow-lg"
                                        : "border border-[var(--border)] bg-white text-[var(--heading)] hover:border-[var(--primary)]"
                                    }`}
                            >
                                {item.title}
                            </button>
                        );
                    })}
                </div>

                {/* Main Visual */}
                <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
                    {/* Orbit Animation */}
                    <div className="flex justify-center">
                        <div className="relative h-[420px] w-[420px]">
                            {/* Outer Ring */}
                            <div className="absolute inset-0 rounded-full border border-[var(--border)]" />

                            <div className="absolute inset-[60px] rounded-full border border-[var(--border)]/70" />

                            {/* Floating Logos */}
                            <div className="absolute inset-0 orbit-ring">
<<<<<<< HEAD
                                {currentVisual.orbitIcons.slice(0, 3).map((logo, index) => {
=======
                                {current.orbitIcons.slice(0, 3).map((logo, index) => {
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                                    const angle = (index / 3) * Math.PI * 2;
                                    const x = 210 * Math.cos(angle);
                                    const y = 210 * Math.sin(angle);

                                    return (
                                        <div
                                            key={logo}
                                            className="absolute left-1/2 top-1/2"
                                            style={{
                                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                                            }}
                                        >
                                            <div className="orbit-card-counter">
                                                <div className="group flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                                                    <Image
                                                        src={logo}
                                                        alt=""
                                                        width={32}
                                                        height={32}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2">
                                <div className="absolute inset-0 orbit-ring-reverse">
<<<<<<< HEAD
                                    {currentVisual.orbitIcons.slice(3).map((logo, index) => {
=======
                                    {current.orbitIcons.slice(3).map((logo, index) => {
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                                        const angle = (index / 3) * Math.PI * 2 + Math.PI / 3;
                                        const x = 150 * Math.cos(angle);
                                        const y = 150 * Math.sin(angle);

                                        return (
                                            <div
                                                key={logo}
                                                className="absolute left-1/2 top-1/2"
                                                style={{
                                                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                                                }}
                                            >
                                                <div className="orbit-card-counter-reverse">
                                                    <div className="group flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                                                        <Image
                                                            src={logo}
                                                            alt=""
                                                            width={32}
                                                            height={32}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Center Hub */}
                            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(15,111,255,0.20)] blur-3xl" />

                            <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[32px] border border-white/50 bg-white/70 shadow-[0_40px_100px_rgba(15,111,255,0.20)] backdrop-blur-xl">
                                <div className="relative h-20 w-20">
                                    <Image
<<<<<<< HEAD
                                        src={currentVisual.centerImage}
=======
                                        src={current.centerImage}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                                        alt={current.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-3xl font-bold text-[var(--heading)]">
                            {current.title}
                        </h3>

                        <p className="mt-4 max-w-xl text-lg text-[var(--body)]">
                            {current.description}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {current.technologies.map((tech) => (
                                <div
                                    key={tech}
                                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--heading)]"
                                >
                                    {tech}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
                            <div className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
<<<<<<< HEAD
                                {data.whyTitle}
                            </div>

                            <p className="mt-3 text-[var(--body)]">
                                {data.whyDescription}
=======
                                Why This Stack?
                            </div>

                            <p className="mt-3 text-[var(--body)]">
                                We carefully choose technologies based on performance,
                                maintainability, scalability, security, and long-term
                                business requirements rather than following trends.
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes orbit {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes orbitReverse {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(-360deg);
                    }
                }

                .orbit-ring {
                    animation: orbit 40s linear infinite;
                }

                .orbit-ring-reverse {
                    animation: orbitReverse 40s linear infinite;
                }

                .orbit-card-counter {
                    animation: orbitReverse 40s linear infinite;
                }

                .orbit-card-counter-reverse {
                    animation: orbit 40s linear infinite;
                }
            `}</style>
        </section>
    );
}
