<<<<<<< HEAD
import HeroSection from "@/components/website-development/HeroSection";
import WhyMostWebsitesUnderperform from "@/components/website-development/WhyMostWebsitesUnderperform";
import WhatWeBuildSection from "@/components/website-development/WhatWeBuildSection";
import TechnologyStackSection from "@/components/website-development/TechnologyStackSection";
import DevelopmentProcessTimeline from "@/components/website-development/DevelopmentProcessTimeline";
import BusinessOutcomesSection from "@/components/website-development/BusinessOutcomesSection";
import type { Service } from "@/data/services";

type ServicePageProps = {
  service: Service;
};

export default function ServicePage({ service }: ServicePageProps) {
  return (
    <>
      <HeroSection key={`${service.slug}-hero`} data={service.hero} />
      <WhyMostWebsitesUnderperform
        key={`${service.slug}-challenges`}
        data={service.challenges}
      />
      <WhatWeBuildSection
        key={`${service.slug}-what-we-build`}
        data={service.whatWeBuild}
      />
      <TechnologyStackSection
        key={`${service.slug}-technology-stack`}
        data={service.technologyStack}
      />
      <DevelopmentProcessTimeline
        key={`${service.slug}-process`}
        data={service.process}
      />
      <BusinessOutcomesSection
        key={`${service.slug}-outcomes`}
        data={service.outcomes}
      />
    </>
=======
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type ServicePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
};

export default function ServicePage({
  eyebrow,
  title,
  description,
  highlights,
}: ServicePageProps) {
  return (
    <main className="relative overflow-hidden bg-[var(--background)] pt-32">
      <div
        className="absolute left-0 top-24 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: "var(--glow-primary)" }}
      />
      <div
        className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <section className="container relative mx-auto max-w-7xl px-6 pb-24 pt-10 lg:pb-32">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
            {eyebrow}
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-[-0.04em] text-[var(--heading)] md:text-6xl">
            {title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-[var(--body)] md:text-xl">
            {description}
          </p>

          <Link
            href="/website-development"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.02]"
          >
            Explore Website Development
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-6"
            >
              <CheckCircle2 className="h-6 w-6 text-[var(--primary)]" />
              <p className="mt-4 font-medium leading-relaxed text-[var(--heading)]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
  );
}
