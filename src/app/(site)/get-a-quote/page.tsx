import type { Metadata } from "next";
import { FileText, MousePointerClick, SlidersHorizontal } from "lucide-react";
import QuoteCalculator from "@/components/quote/QuoteCalculator";
import {
  WhatsIncluded,
  HowToChoose,
  WhyChooseFillip,
} from "@/components/quote/QuoteDetailSections";
import { SERVICE_CATEGORIES } from "@/data/pricing";
import {
  CATEGORY_ICONS,
  HOW_TO_CHOOSE,
  WHY_CHOOSE_STATS,
  WHY_CHOOSE_POINTS,
  type DetailCard,
} from "@/data/quote/detail";

export const metadata: Metadata = {
  title: "Get a Quote | Fillip Technologies",
  description:
    "Build a custom estimate for websites, SEO, social media, performance marketing, and software. Get the PDF emailed to you instantly.",
};

// The 3-step "how it works" strip in the hero.
const steps = [
  {
    icon: MousePointerClick,
    title: "Pick your services",
    text: "Choose only the packages you actually need.",
  },
  {
    icon: SlidersHorizontal,
    title: "Add any extras",
    text: "Fine-tune with add-ons — your total updates live.",
  },
  {
    icon: FileText,
    title: "Get it emailed",
    text: "A polished PDF estimate lands in your inbox instantly.",
  },
];

// "What we do" cards derived from the real service categories so they stay in
// sync with the calculator's offering.
const includedCards: DetailCard[] = SERVICE_CATEGORIES.map((c) => ({
  icon: CATEGORY_ICONS[c.id] ?? "LayoutGrid",
  title: c.name,
  description: c.description,
}));

export default function GetAQuotePage() {
  return (
    <main className="relative">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 top-0 h-[340px] w-[340px] rounded-full blur-[120px]"
          style={{ background: "var(--glow-primary)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 bottom-0 h-[340px] w-[340px] rounded-full blur-[120px]"
          style={{ background: "var(--glow-accent)" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--primary)]">
              <span className="size-1.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
              Instant price estimate
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
              Know your price <span className="highlight-text">before you commit</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--body)]">
              No back-and-forth emails, no waiting. Build your own estimate in under a minute — then
              we&apos;ll email you a clean PDF. Every price stays negotiable when we talk.
            </p>
          </div>

          {/* How it works — numbered, connected */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="relative rounded-2xl border border-[var(--border)] bg-white/70 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-sm shadow-primary/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-2xl font-extrabold tracking-tight text-[var(--border)]">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[var(--heading)]">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--body)]">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What we do (orientation before building) ─────────── */}
      <WhatsIncluded
        eyebrow="What we do"
        heading="Everything you need, under one roof"
        subheading="Websites, SEO, social, ads and custom software — mix and match into a single plan instead of juggling five different vendors."
        cards={includedCards}
      />

      {/* ── The estimate builder (Step 1 + Step 2) ───────────── */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
          <QuoteCalculator />
        </div>
      </section>

      {/* ── Guidance ─────────────────────────────────────────── */}
      <HowToChoose heading="Not sure which to pick? Start here" steps={HOW_TO_CHOOSE} />

      {/* ── Trust ────────────────────────────────────────────── */}
      <WhyChooseFillip stats={WHY_CHOOSE_STATS} points={WHY_CHOOSE_POINTS} />
    </main>
  );
}
