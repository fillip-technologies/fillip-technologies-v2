import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Cloud,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import FAQSection from "@/components/shared/FAQSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import type { HardwareSolutionPage as HardwareSolutionPageData } from "@/data/hardware-solutions";

type HardwareSolutionPageProps = {
  data: HardwareSolutionPageData;
};

// Position-based icons for the "Our Promise" feature cards (content is CMS-driven,
// the icon per row is not — extra cards reuse the last icon).
const PROMISE_ICONS = [Bell, Smartphone, Cloud];

export default function HardwareSolutionPage({ data }: HardwareSolutionPageProps) {
  const label = data.label;
  const lower = label.toLowerCase();

  // Each copy block falls back to the original hardcoded text so hardware pages
  // (and any un-migrated seed) render exactly as before.
  const about = data.about ?? {
    heading: "Protecting What\nMatters Most",
    description:
      "We deliver intelligent hardware solutions that adapt to your needs and keep your infrastructure dependable every day.",
    ctaLabel: "Contact Us",
  };

  const promise = data.promise ?? {
    eyebrow: "/ Our Promise",
    heading: "Smart technology.\nStronger systems.",
    description:
      "We combine careful planning, quality hardware, and professional installation to deliver dependable infrastructure for your site.",
    features: [
      { title: "Real-time Alerts", description: "Stay informed with timely notifications and updates." },
      { title: "Mobile Access", description: "Monitor and manage essential systems from anywhere." },
      { title: "Centralized Access", description: "Keep information, devices, and monitoring easier to manage." },
    ],
  };

  const solutionsHeading = data.solutionsHeading ?? {
    eyebrow: "/ Solutions",
    heading: `${label}\nSolutions We Offer`,
    description:
      "Explore practical, scalable hardware solutions designed around your site, users, operations, and security requirements.",
  };

  const whyChoose = data.whyChoose ?? {
    eyebrow: "/ Why Choose Us",
    heading: "Security you can trust.\nService you can count on.",
    benefitDescription:
      "Practical planning, clean installation, and dependable support for long-term hardware performance.",
  };

  const testimonialsBlock = data.testimonials;
  const testimonials =
    testimonialsBlock?.items && testimonialsBlock.items.length > 0
      ? testimonialsBlock.items
      : [
          {
            name: "Amit Kumar",
            role: "Business Owner",
            image: "",
            review: `Fillip Technologies planned and installed our ${lower} setup professionally. The system is reliable, clean, and easy for our team to manage.`,
          },
          {
            name: "Priya Sharma",
            role: "Operations Manager",
            image: "",
            review: `Their team understood our site requirements and delivered a practical ${lower} solution with clear handover and support.`,
          },
          {
            name: "Rahul Verma",
            role: "Facility Head",
            image: "",
            review: "The installation quality, documentation, and post-installation support were excellent. We now have much better visibility and control.",
          },
          {
            name: "Neha Singh",
            role: "Administrator",
            image: "",
            review: "The project was completed smoothly and the team explained everything in simple terms. It has made our daily operations easier.",
          },
        ];

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="relative overflow-hidden bg-[#020817] px-6 pb-24 pt-32 text-white lg:pb-32 lg:pt-40">
        <div className="absolute inset-0">
          <Image
            src={data.hero.image}
            alt={data.hero.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.96),rgba(2,8,23,0.76),rgba(2,8,23,0.42))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(14,165,233,0.28),transparent_32%)]" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/45 via-white/22 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-sky-300/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-sky-100 backdrop-blur">
              {data.hero.badge}
            </span>
            <h1 className="mt-8 text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              {data.hero.title}
              <br />
              <span className="text-sky-200">{data.hero.highlightedTitle}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              {data.hero.description}
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-sky-500 px-7 py-4 text-sm font-bold text-white shadow-[0_18px_48px_rgba(14,165,233,0.28)] transition hover:-translate-y-1 hover:bg-sky-600"
            >
              Get Free Consultation
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f8fb] py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(37,99,235,0.08),transparent_28%)]" />
        <div className="container relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[32%_68%]">
            <div className="max-w-md">
              <div className="mb-8 flex items-center gap-3">
                <span className="text-sm font-black text-slate-950">01</span>
                <div className="h-px flex-1 bg-slate-300" />
                <span className="text-xs font-bold text-slate-300">02 03</span>
              </div>

              <h2 className="whitespace-pre-line text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
                {about.heading}
              </h2>

              <p className="mt-6 max-w-xs text-sm leading-7 text-slate-500">
                {about.description}
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#071126] px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_rgba(2,8,23,0.18)] transition hover:-translate-y-1 hover:bg-sky-700"
              >
                {about.ctaLabel}
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {data.solutions.slice(0, 2).map((solution) => (
                <article
                  key={solution.title}
                  className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 34vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
                  </div>

                  <div className="px-7 pb-7 pt-7">
                    <h3 className="text-2xl font-black tracking-tight">
                      {solution.title}
                    </h3>
                    <p className="mt-4 min-h-[4.5rem] text-sm leading-7 text-slate-500">
                      {solution.description}
                    </p>
                    <Link
                      href="/contact"
                      className="mt-7 flex items-center justify-between text-sm font-bold transition hover:text-sky-700"
                    >
                      <span>Contact Us</span>
                      <span className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500">
                        <ArrowRight className="size-4" />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
        <div className="container mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.08fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <p className="text-sm font-bold text-slate-500">{promise.eyebrow}</p>
            <h2 className="mt-6 whitespace-pre-line text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
              {promise.heading}
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-7 text-slate-500">
              {promise.description}
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#071126] shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={data.solutions[0]?.image ?? data.hero.image}
                  alt={data.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-1">
            {promise.features.map((feature, index) => {
              const IconComp = PROMISE_ICONS[index] ?? PROMISE_ICONS[PROMISE_ICONS.length - 1];

              return (
                <div key={`${feature.title}-${index}`} className="flex gap-5">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-950 ring-1 ring-slate-100">
                    <IconComp className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black">{feature.title}</h3>
                    <p className="mt-2 max-w-56 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20 sm:py-24 lg:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div>
              <p className="text-sm font-bold text-slate-500">{solutionsHeading.eyebrow}</p>
              <h2 className="mt-6 max-w-2xl whitespace-pre-line text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
                {solutionsHeading.heading}
              </h2>
            </div>
            <p className="max-w-md text-base leading-8 text-slate-500 lg:pt-12">
              {solutionsHeading.description}
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {data.solutions.map((solution) => (
              <article
                key={solution.title}
                className="group overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.13)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                </div>

                <div className="px-7 pb-8 pt-7">
                  <h3 className="text-2xl font-black tracking-tight">
                    {solution.title}
                  </h3>
                  <p className="mt-4 min-h-[6rem] text-sm leading-7 text-slate-500">
                    {solution.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold transition hover:text-sky-700"
                  >
                    Explore Solution
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold text-slate-500">{whyChoose.eyebrow}</p>
          <h2 className="mt-6 max-w-2xl whitespace-pre-line text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            {whyChoose.heading}
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {data.benefits.map((benefit) => (
              <div key={benefit} className="max-w-xs">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-950 ring-1 ring-slate-200">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="mt-7 text-base font-black">{benefit}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {whyChoose.benefitDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection
        badge={testimonialsBlock?.badge || "Customer Stories"}
        title={testimonialsBlock?.title || `Trusted ${label} Projects`}
        description={
          testimonialsBlock?.description ||
          "Homes, offices, institutions, and businesses rely on Fillip Technologies for dependable hardware planning, installation, and support."
        }
        testimonials={testimonials}
      />

      <FAQSection
        badge={`${data.label} FAQs`}
        title="Everything You Need To Know"
        description={`Common questions about ${data.label.toLowerCase()} planning, installation, and support.`}
        faqs={data.faqs}
      />
    </main>
  );
}
