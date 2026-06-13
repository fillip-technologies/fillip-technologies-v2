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
  };

  return (
    <section className="relative flex min-h-screen w-full overflow-hidden bg-surface text-heading sm:min-h-[100svh]">
      <div
        className="absolute inset-0 opacity-[0.72]"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--heading) 5.5%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--heading) 5.5%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "clamp(3.25rem, 5vw, 9rem) clamp(3.25rem, 5vw, 9rem)",
        }}
      />

      <div className="absolute right-[clamp(-15rem,-6vw,-6rem)] top-[clamp(-18rem,-8vw,-8rem)] h-[clamp(34rem,48vw,118rem)] w-[clamp(34rem,48vw,118rem)] rounded-full bg-[var(--glow-accent)] blur-[clamp(110px,8vw,260px)]" />
      <div className="absolute left-[6%] top-[12%] h-[clamp(22rem,31vw,76rem)] w-[clamp(22rem,31vw,76rem)] rounded-full bg-[var(--glow-primary)] blur-[clamp(95px,7vw,230px)]" />
      <div className="absolute bottom-[clamp(-28rem,-10vw,-10rem)] right-[26%] h-[clamp(28rem,38vw,92rem)] w-[clamp(28rem,38vw,92rem)] rounded-full bg-[var(--glow-cyan)] blur-[clamp(110px,8vw,260px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_18%,color-mix(in_srgb,var(--card)_92%,transparent),color-mix(in_srgb,var(--surface)_34%,transparent)_35%,color-mix(in_srgb,var(--surface)_0%,transparent)_70%)]" />

      <div className="relative z-10 grid min-h-screen w-full grid-cols-1 items-center gap-[clamp(2.5rem,4vw,8rem)] px-[clamp(1.5rem,4.5vw,10rem)] py-[clamp(6rem,8vw,14rem)] sm:min-h-[100svh] lg:grid-cols-[55%_45%] lg:py-[clamp(5rem,5.6vw,10rem)]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="flex max-w-[clamp(48rem,46vw,104rem)] flex-col items-start"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-[clamp(2rem,2.1vw,4rem)] text-[clamp(0.875rem,0.85vw,1.55rem)] font-semibold uppercase tracking-[0.24em] text-primary"
          >
            {c.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-[clamp(1.25rem,1.35vw,2.5rem)] max-w-none text-[clamp(2.05rem,8.8vw,5.5rem)] font-semibold leading-[0.96] tracking-normal text-heading lg:text-[clamp(4rem,6.1vw,13rem)]"
          >
            <span className="block whitespace-nowrap">
              {c.headingLine1}
            </span>
            <span className="block">{c.headingLine2}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-[clamp(1.75rem,1.9vw,3.75rem)] max-w-[clamp(42rem,42vw,86rem)] text-[clamp(1rem,1.25vw,2.35rem)] leading-[1.75] text-body"
          >
            {c.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-[clamp(2.5rem,2.8vw,5.25rem)] flex w-full flex-col gap-[clamp(0.75rem,0.8vw,1.5rem)] sm:w-auto sm:flex-row sm:items-center"
          >
            <a
              href={c.primaryCtaHref}
              className="inline-flex h-[clamp(3.5rem,3.6vw,6.75rem)] items-center justify-center rounded-full bg-heading px-[clamp(2rem,2.1vw,4rem)] text-[clamp(0.875rem,0.95vw,1.65rem)] font-semibold text-primary-foreground shadow-[0_18px_50px_color-mix(in_srgb,var(--heading)_22%,transparent)] transition duration-300 hover:-translate-y-0.5 hover:bg-navy focus:outline-none focus:ring-2 focus:ring-heading focus:ring-offset-2"
            >
              {c.primaryCtaLabel}
            </a>
            <a
              href={c.secondaryCtaHref}
              className="inline-flex h-[clamp(3.5rem,3.6vw,6.75rem)] items-center justify-center rounded-full border border-border/80 bg-card/70 px-[clamp(2rem,2.1vw,4rem)] text-[clamp(0.875rem,0.95vw,1.65rem)] font-semibold text-heading shadow-[0_18px_45px_color-mix(in_srgb,var(--heading)_8%,transparent)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-card focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              {c.secondaryCtaLabel}
            </a>
          </motion.div>
        </motion.div>

        <div className="relative min-h-[clamp(27rem,72vw,42rem)] w-full lg:min-h-[100svh]">
          <motion.div
            initial={{ opacity: 0, x: 60, y: -40, rotate: -7, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: -7, scale: 1 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -right-[34vw] -top-[clamp(4rem,8vw,6rem)] z-10 w-[clamp(38rem,118vw,62rem)] max-w-none sm:-right-[24vw] md:-right-[20vw] lg:right-[clamp(-34rem,-12vw,-10rem)] lg:top-[clamp(-18rem,-7vw,-5rem)] lg:w-[clamp(54rem,66vw,148rem)]"
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
