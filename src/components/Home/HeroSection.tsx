"use client";
import Image from "next/image";
import { motion } from "framer-motion";
const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
};

// CMS-editable content (key: home.hero). Falls back to these defaults.
type HeroContent = Partial<{
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    heroImage: string;
}>;

export default function HeroSection({ content: raw = {} }: { content?: Record<string, unknown> }) {
    const content = raw as HeroContent;
    const c = {
        eyebrow: content.eyebrow ?? "Human × Intelligence",
        headingLine1: content.headingLine1 ?? "Building Intelligent",
        headingLine2: content.headingLine2 ?? "Enterprises",
        description:
            content.description ??
            "We design practical AI, cloud, and software systems for teams that need dependable results.",
        primaryCtaLabel: content.primaryCtaLabel ?? "Talk to Experts",
        primaryCtaHref: content.primaryCtaHref ?? "#contact",
        secondaryCtaLabel: content.secondaryCtaLabel ?? "Explore Capabilities",
        secondaryCtaHref: content.secondaryCtaHref ?? "#capabilities",
        heroImage: content.heroImage || "/images/hand.png",
    };

    return (
        <section className="relative flex min-h-0 lg:min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,color-mix(in_srgb,var(--surface)_92%,white)_0%,color-mix(in_srgb,var(--card)_96%,#f6fbff)_42%,color-mix(in_srgb,var(--surface)_88%,#fff7fb)_100%)] text-heading lg:sm:min-h-[100svh]">
            <div
                className="absolute inset-0 opacity-[0.58]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--heading) 4.5%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--heading) 4.5%, transparent) 1px, transparent 1px)
          `,
                    backgroundSize: "clamp(3.25rem, 5vw, 9rem) clamp(3.25rem, 5vw, 9rem)",
                }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_17%_22%,rgba(255,110,199,0.20),transparent_28%),radial-gradient(circle_at_74%_18%,rgba(78,143,255,0.22),transparent_30%),radial-gradient(circle_at_83%_60%,rgba(42,221,245,0.20),transparent_31%),radial-gradient(circle_at_44%_78%,rgba(147,97,255,0.14),transparent_32%)]" />
            <div className="absolute right-[clamp(-16rem,-7vw,-6rem)] top-[clamp(-18rem,-9vw,-8rem)] h-[clamp(34rem,48vw,118rem)] w-[clamp(34rem,48vw,118rem)] rounded-full bg-[color-mix(in_srgb,var(--glow-accent)_78%,#ff6ec7_22%)] blur-[clamp(120px,8vw,260px)] opacity-85" />
            <div className="absolute left-[4%] top-[10%] h-[clamp(22rem,31vw,76rem)] w-[clamp(22rem,31vw,76rem)] rounded-full bg-[color-mix(in_srgb,var(--glow-primary)_72%,#46b7ff_28%)] blur-[clamp(100px,7vw,230px)] opacity-80" />
            <div className="absolute bottom-[clamp(-24rem,-8vw,-8rem)] right-[22%] h-[clamp(28rem,38vw,92rem)] w-[clamp(28rem,38vw,92rem)] rounded-full bg-[color-mix(in_srgb,var(--glow-cyan)_78%,#9b7cff_22%)] blur-[clamp(112px,8vw,260px)] opacity-75" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_18%,color-mix(in_srgb,var(--card)_88%,transparent),color-mix(in_srgb,var(--surface)_38%,transparent)_34%,color-mix(in_srgb,var(--surface)_0%,transparent)_72%)]" />
            <div className="absolute inset-x-[8%] top-[14%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="relative z-10 grid w-full grid-cols-1 items-center gap-[clamp(2rem,3.5vw,6rem)] px-6 py-12 pt-28 pb-16 md:px-[clamp(1.5rem,4.5vw,10rem)] md:pb-[clamp(1.5rem,2vw,3rem)] md:pt-[clamp(5rem,6.2vw,10rem)] lg:grid-cols-[55%_45%] lg:min-h-screen lg:sm:min-h-[100svh] lg:pb-[clamp(1rem,1.4vw,2rem)] lg:pt-[clamp(4rem,4.5vw,7.5rem)]">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1 }}
                    className="relative flex max-w-[clamp(48rem,46vw,104rem)] flex-col items-start"
                >
                    <div className="absolute -left-[clamp(1rem,2vw,3rem)] top-[clamp(1rem,3vw,5rem)] h-[clamp(12rem,18vw,28rem)] w-[clamp(12rem,18vw,28rem)] rounded-full border border-primary/10 bg-card/18 blur-3xl" />
                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="relative mt-[clamp(1rem,1.45vw,2.75rem)] inline-flex rounded-full border border-primary/18 bg-card/48 px-4 py-2 text-[clamp(0.75rem,0.72vw,1.25rem)] font-semibold uppercase tracking-[0.24em] text-primary shadow-[0_18px_48px_color-mix(in_srgb,var(--primary)_12%,transparent)] backdrop-blur-xl"
                    >
                        {c.eyebrow}
                    </motion.p>

                    <motion.h1
                        variants={fadeUp}
                        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-[clamp(1.1rem,1.2vw,2.15rem)] max-w-none text-[clamp(2.05rem,8.8vw,5.5rem)] font-semibold leading-[0.96] tracking-normal text-transparent bg-clip-text bg-[linear-gradient(115deg,var(--heading)_0%,color-mix(in_srgb,var(--heading)_82%,#5f7cff)_34%,color-mix(in_srgb,var(--primary)_70%,#ff5fb7)_68%,var(--heading)_100%)] lg:text-[clamp(4rem,6.1vw,13rem)]"
                    >
                        <span className="block whitespace-nowrap">
                            {c.headingLine1}
                        </span>
                        <span className="block">{c.headingLine2}</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-[clamp(1.5rem,1.55vw,3rem)] max-w-[clamp(42rem,42vw,86rem)] text-[clamp(1rem,1.18vw,2.2rem)] leading-[1.72] text-body/90"
                    >
                        {c.description}
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-[clamp(2rem,2.25vw,4.2rem)] flex w-full flex-col gap-[clamp(0.75rem,0.8vw,1.5rem)] sm:w-auto sm:flex-row sm:items-center"
                    >
                        <a
                            href={c.primaryCtaHref}
                            className="inline-flex h-[clamp(3.35rem,3.35vw,6.25rem)] items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--heading),color-mix(in_srgb,var(--navy)_82%,#5f7cff_18%))] px-[clamp(2rem,2.1vw,4rem)] text-[clamp(0.875rem,0.9vw,1.55rem)] font-semibold text-primary-foreground shadow-[0_20px_58px_color-mix(in_srgb,var(--heading)_24%,transparent),0_0_42px_color-mix(in_srgb,var(--primary)_16%,transparent)] transition duration-300 hover:-translate-y-0.5 hover:bg-navy focus:outline-none focus:ring-2 focus:ring-heading focus:ring-offset-2"
                        >
                            {c.primaryCtaLabel}
                        </a>
                        <a
                            href={c.secondaryCtaHref}
                            className="inline-flex h-[clamp(3.35rem,3.35vw,6.25rem)] items-center justify-center rounded-full border border-card/80 bg-card/58 px-[clamp(2rem,2.1vw,4rem)] text-[clamp(0.875rem,0.9vw,1.55rem)] font-semibold text-heading shadow-[0_18px_45px_color-mix(in_srgb,var(--heading)_8%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--card)_82%,transparent)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:bg-card/82 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                        >
                            {c.secondaryCtaLabel}
                        </a>
                    </motion.div>
                </motion.div>

                <div className="hidden lg:block relative w-full lg:min-h-[100svh]">
                    <motion.div
                        initial={{ opacity: 0, x: 60, y: -40, rotate: -7, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, y: 0, rotate: -7, scale: 1 }}
                        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none absolute -right-[34vw] -top-[clamp(4rem,8vw,6rem)] z-10 w-[clamp(38rem,118vw,62rem)] max-w-none drop-shadow-[0_34px_80px_color-mix(in_srgb,var(--heading)_16%,transparent)] sm:-right-[24vw] md:-right-[20vw] lg:right-[clamp(-34rem,-12vw,-10rem)] lg:top-[clamp(-18rem,-7vw,-5rem)] lg:w-[clamp(54rem,66vw,148rem)]"
                    >
                        <Image
                            src="/images/hand.png"
                            alt=""
                            width={1400}
                            height={1400}
                            priority
                            sizes="(max-width: 640px) 118vw, (max-width: 1024px) 92vw, 66vw"
                            className="h-auto w-full max-w-none object-contain"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
