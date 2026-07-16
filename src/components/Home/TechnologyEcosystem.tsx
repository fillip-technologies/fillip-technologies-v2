"use client";

import {
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiPython,
    SiDocker,
    SiMongodb,
    SiPostgresql,
    SiOpenai,

    SiFirebase,
    SiVercel,
    SiGithub,
    SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";


const techs = [
    // TOP BAR

    { Icon: SiReact, name: "React", top: "0%", left: "0%", color: "#61DAFB" },
    { Icon: SiNextdotjs, name: "Next.js", top: "0%", left: "9%", color: "#000000" },
    { Icon: SiNodedotjs, name: "Node.js", top: "0%", left: "18%", color: "#339933" },
    { Icon: SiPython, name: "Python", top: "0%", left: "27%", color: "#3776AB", accentColor: "#FFD43B" },
    { Icon: SiDocker, name: "Docker", top: "0%", left: "36%", color: "#2496ED" },

    // GAP

    { Icon: SiOpenai, name: "OpenAI", top: "0%", left: "48%", color: "#000000" },
    { Icon: SiFirebase, name: "Firebase", top: "0%", left: "57%", color: "#FFCA28", accentColor: "#FF8F00" },
    { Icon: SiVercel, name: "Vercel", top: "0%", left: "66%", color: "#000000" },
    { Icon: SiGithub, name: "GitHub", top: "0%", left: "75%", color: "#181717" },
    { Icon: FaAws, name: "AWS", top: "0%", left: "84%", color: "#FF9900" },
    { Icon: SiTypescript, name: "TypeScript", top: "0%", left: "93%", color: "#3178C6" },

    // F LEFT

    { Icon: SiReact, name: "React", top: "16%", left: "0%", color: "#61DAFB" },
    { Icon: SiNextdotjs, name: "Next.js", top: "32%", left: "0%", color: "#000000" },
    { Icon: SiNodedotjs, name: "Node.js", top: "48%", left: "0%", color: "#339933" },
    { Icon: SiPython, name: "Python", top: "64%", left: "0%", color: "#3776AB", accentColor: "#FFD43B" },
    { Icon: SiDocker, name: "Docker", top: "80%", left: "0%", color: "#2496ED" },

    // F MIDDLE

    { Icon: SiOpenai, name: "OpenAI", top: "48%", left: "9%", color: "#000000" },
    { Icon: SiMongodb, name: "MongoDB", top: "48%", left: "18%", color: "#47A248" },
    { Icon: SiPostgresql, name: "PostgreSQL", top: "48%", left: "27%", color: "#336791" },


    // T STEM

    { Icon: SiReact, name: "React", top: "16%", left: "75%", color: "#61DAFB" },
    { Icon: SiNextdotjs, name: "Next.js", top: "32%", left: "75%", color: "#000000" },
    { Icon: SiNodedotjs, name: "Node.js", top: "48%", left: "75%", color: "#339933" },
    { Icon: SiPython, name: "Python", top: "64%", left: "75%", color: "#3776AB", accentColor: "#FFD43B" },
    { Icon: SiDocker, name: "Docker", top: "80%", left: "75%", color: "#2496ED" },
];

const mobileTechs = [
    { Icon: SiReact, name: "React", color: "#61DAFB" },
    { Icon: SiNextdotjs, name: "Next.js", color: "#000000" },
    { Icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    { Icon: SiPython, name: "Python", color: "#3776AB", accentColor: "#FFD43B" },
    { Icon: SiDocker, name: "Docker", color: "#2496ED" },
    { Icon: SiOpenai, name: "OpenAI", color: "#000000" },
    { Icon: SiFirebase, name: "Firebase", color: "#FFCA28", accentColor: "#FF8F00" },
    { Icon: SiVercel, name: "Vercel", color: "#000000" },
    { Icon: SiGithub, name: "GitHub", color: "#181717" },
    { Icon: FaAws, name: "AWS", color: "#FF9900" },
    { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    { Icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
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
        return <Icon className="text-[32px]" style={{ color }} />;
    }

    return (
        <span className="relative block h-8 w-8" aria-hidden="true">
            <Icon
                className="absolute inset-0 text-[32px]"
                style={{ color }}
            />
            <span className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
                <Icon
                    className="absolute bottom-0 left-0 text-[32px]"
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
        <section className="relative overflow-hidden py-20 xl:pt-28 xl:pb-0">
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

                {/* Mobile / tablet grid */}

                <div className="mt-14 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 xl:hidden">
                    {mobileTechs.map(({ Icon, name, color, accentColor }) => (
                        <div
                            key={name}
                            aria-label={name}
                            title={name}
                            className="flex min-h-24 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                        >
                            <TechLogo
                                Icon={Icon}
                                color={color}
                                accentColor={accentColor}
                            />

                            <span className="mt-3 max-w-full text-center text-xs font-medium leading-tight text-slate-600">
                                {name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Desktop FT Shape */}

                <div className="relative mx-auto mt-24 hidden h-[520px] max-w-[1130px] xl:block">
                    {techs.map(({ Icon, name, top, left, color, accentColor }, i) => (
                        <div
                            key={i}
                            aria-label={name}
                            title={name}
                            className="
absolute
flex
h-20
w-20
items-center
justify-center
rounded-full
border
border-slate-200
bg-white
shadow-[0_10px_30px_rgba(15,23,42,0.08)]
transition-all
duration-300
hover:-translate-y-2
hover:scale-110
hover:border-indigo-300
"
                            style={{
                                top,
                                left,
                            }}  
                        >
                            <TechLogo
                                Icon={Icon}
                                color={color}
                                accentColor={accentColor}
                            />
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
