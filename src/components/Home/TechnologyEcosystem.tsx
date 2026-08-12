"use client";

import {
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiTypescript,
    SiJavascript,
    SiLaravel,
    SiPhp,
    SiPython,
    SiFlutter,
    SiOpenai,
    SiClaude,
    SiGooglegemini,
    SiMistralai,
    SiHuggingface,
    SiFirebase,
    SiRedis,
    SiN8N,
    SiMake,
    SiGooglecloud,
    SiVercel,
    SiDocker,
    SiPostgresql,
    SiMongodb,
    SiCloudflare,
    SiGithub,
    SiGitlab,
    SiFigma,
    SiWordpress,
    SiShopify,
} from "react-icons/si";
import type { IconType } from "react-icons";

type TechItem = {
    Icon: IconType;
    name: string;
    color: string;
    accentColor?: string;
};

const techs: TechItem[] = [
    { Icon: SiReact, name: "React", color: "#61DAFB" },
    { Icon: SiNextdotjs, name: "Next.js", color: "#000000" },
    { Icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    { Icon: SiLaravel, name: "Laravel", color: "#FF2D20" },
    { Icon: SiPhp, name: "PHP", color: "#777BB4" },
    { Icon: SiPython, name: "Python", color: "#3776AB" },
    { Icon: SiFlutter, name: "Flutter", color: "#02569B" },
    { Icon: SiReact, name: "React Native", color: "#61DAFB" },
    { Icon: SiOpenai, name: "OpenAI", color: "#000000" },
    { Icon: SiClaude, name: "Claude", color: "#D97757" },
    { Icon: SiGooglegemini, name: "Gemini", color: "#8E75B2" },
    { Icon: SiMistralai, name: "Mistral AI", color: "#FA520F" },
    { Icon: SiHuggingface, name: "Hugging Face", color: "#FFD21E" },
    { Icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
    { Icon: SiRedis, name: "Redis", color: "#FF4438" },
    { Icon: SiN8N, name: "n8n", color: "#EA4B71" },
    { Icon: SiMake, name: "Make.com", color: "#6D00CC" },
    { Icon: SiGooglecloud, name: "Google Cloud", color: "#4285F4" },
    { Icon: SiVercel, name: "Vercel", color: "#000000" },
    { Icon: SiDocker, name: "Docker", color: "#2496ED" },
    { Icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
    { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    { Icon: SiCloudflare, name: "Cloudflare", color: "#F38020" },
    { Icon: SiGithub, name: "GitHub", color: "#181717" },
    { Icon: SiGitlab, name: "GitLab", color: "#FC6D26" },
    { Icon: SiFigma, name: "Figma", color: "#F24E1E" },
    { Icon: SiWordpress, name: "WordPress", color: "#21759B" },
    { Icon: SiShopify, name: "Shopify", color: "#7AB55C" },
];

function TechLogo({
    Icon,
    color,
    accentColor,
}: {
    Icon: IconType;
    color: string;
    accentColor?: string;
}) {
    if (!accentColor) {
        return (
            <Icon
                className="text-[38px]"
                style={{ color }}
            />
        );
    }

    return (
        <span className="relative block h-[38px] w-[38px]" aria-hidden="true">
            <Icon
                className="absolute inset-0 text-[38px]"
                style={{ color }}
            />
            <span className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
                <Icon
                    className="absolute bottom-0 left-0 text-[38px]"
                    style={{ color: accentColor }}
                />
            </span>
        </span>
    );
}

type TechnologyContent = Partial<{
    eyebrow: string;
    headingLead: string;
    headingHighlight: string;
    description: string;
    backgroundImage: string;
}>;

export default function TechnologyEcosystem({ content: raw = {} }: { content?: Record<string, unknown> }) {
    const content = raw as TechnologyContent;
    const c = {
        eyebrow: content.eyebrow ?? "OUR TECH STACK",
        headingLead: content.headingLead ?? "Technologies Behind Every",
        headingHighlight: content.headingHighlight ?? "Intelligent Solution.",
        description:
            content.description ??
            "From AI and cloud platforms to modern frameworks and enterprise tools, we leverage proven technologies to build scalable digital experiences.",
        backgroundImage: content.backgroundImage || "/images/TECH-BG.png",
    };

    return (
        <section className="relative overflow-hidden py-20 xl:pb-24 xl:pt-28">
            <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
                style={{
                    backgroundImage: `url('${c.backgroundImage}')`,
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1400px] px-6">
                {/* Heading */}

                <div className="text-center">
                    <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">
                        {c.eyebrow}
                    </p>

                    <h2 className="text-[28px] font-medium leading-[1.05] tracking-[-0.03em] text-heading md:text-[42px] lg:text-[48px]">
                        {c.headingLead}{" "}
                        <span className="highlight-text">
                            {c.headingHighlight}
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-body">
                        {c.description}
                    </p>
                </div>

                {/* Technology grid */}

                <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6">
                    {techs.map(({ Icon, name, color, accentColor }) => (
                        <div
                            key={name}
                            aria-label={name}
                            title={name}
                            className="
                                group relative flex min-h-[128px] overflow-hidden rounded-[22px]
                                border border-white/80 bg-white/78 px-3 py-5
                                shadow-[0_18px_45px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.9)]
                                backdrop-blur-xl transition-all duration-300
                                hover:-translate-y-1.5 hover:border-slate-200
                                hover:bg-white hover:shadow-[0_26px_70px_rgba(15,23,42,0.12)]
                            "
                        >
                            <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                            <div className="relative z-10 flex w-full flex-col items-center justify-center">
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-white/70 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-transform duration-300 group-hover:scale-105">
                                    <div className="relative">
                                        <TechLogo
                                            Icon={Icon}
                                            color={color}
                                            accentColor={accentColor}
                                        />
                                    </div>
                                </div>
                            </div>

                            <span className="relative z-10 mt-auto max-w-full text-center text-xs font-semibold leading-tight text-slate-700 transition-colors duration-300 group-hover:text-heading">
                                {name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
