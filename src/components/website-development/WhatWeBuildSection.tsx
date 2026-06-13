"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function WebsiteSolutionsSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-26">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div
          className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{ background: "var(--glow-primary)" }}
        />
        <div
          className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{ background: "var(--glow-accent)" }}
        />
      </div>

      <div className="container relative mx-auto max-w-8xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-20 max-w-5xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            WHAT WE DO
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
            End-to-End Website Solutions
            <br />
            for Modern Businesses
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[var(--body)]">
            From business websites and ecommerce stores to custom web
            applications, we create digital experiences that build trust,
            generate leads, and support growth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Featured */}
          <div className="group lg:col-span-7">
            <div className="flex h-full flex-col rounded-[32px] border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--primary)]">
                  01
                </span>
                <ArrowUpRight className="h-5 w-5 text-[var(--primary)]" />
              </div>

              <h3 className="mt-6 text-3xl font-semibold text-[var(--heading)]">
                Business Websites
              </h3>

              <p className="mt-3 max-w-lg text-[var(--body)]">
                Professional websites designed to build trust, generate
                qualified leads, and establish a strong online presence.
              </p>

              <div className="mt-auto pt-8">
                <div className="overflow-hidden rounded-[24px] border border-[var(--border)]">
                  <Image
                    src="/images/proptru.png"
                    alt="Business Website"
                    width={1200}
                    height={800}
                    className="h-[280px] w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ecommerce */}
          <div className="group lg:col-span-5">
            <div className="flex h-full flex-col rounded-[32px] border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--primary)]">
                  02
                </span>
                <ArrowUpRight className="h-5 w-5 text-[var(--primary)]" />
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-[var(--heading)]">
                Ecommerce Websites
              </h3>

              <p className="mt-3 text-[var(--body)]">
                Online stores engineered for conversions, secure payments,
                and scalable growth.
              </p>

              <div className="mt-auto pt-8">
                <div className="overflow-hidden rounded-[24px] border border-[var(--border)]">
                  <Image
                    src="/images/pharmaride.png"
                    alt="Ecommerce Website"
                    width={800}
                    height={600}
                    className="h-[220px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Web Apps */}
          <div className="group lg:col-span-3">
            <div className="flex h-full flex-col rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1">
              <span className="text-sm font-medium text-[var(--primary)]">
                03
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Custom Web Apps
              </h3>

              <p className="mt-3 text-sm text-[var(--body)]">
                Portals, dashboards, booking systems and internal tools.
              </p>

              <div className="mt-auto pt-6">
                <Image
                  src="/images/domus.png"
                  alt=""
                  width={600}
                  height={400}
                  className="h-36 w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>

          {/* Landing Pages */}
          <div className="group lg:col-span-4">
            <div className="flex h-full flex-col rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1">
              <span className="text-sm font-medium text-[var(--primary)]">
                04
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Landing Pages
              </h3>

              <p className="mt-3 text-sm text-[var(--body)]">
                Conversion-focused pages built for campaigns and lead
                generation.
              </p>

              <div className="mt-auto pt-6">
                <Image
                  src="/images/weddding.png"
                  alt=""
                  width={600}
                  height={400}
                  className="h-36 w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>

          {/* Redesign */}
          <div className="group lg:col-span-5">
            <div className="flex h-full flex-col rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1">
              <span className="text-sm font-medium text-[var(--primary)]">
                05
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Website Redesign & Optimization
              </h3>

              <p className="mt-3 text-sm text-[var(--body)]">
                Transform outdated websites into modern, fast and
                conversion-focused digital experiences.
              </p>

              <div className="mt-auto pt-6">
                <Image
                  src="/images/litera.png"
                  alt=""
                  width={600}
                  height={400}
                  className="h-36 w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:col-span-12">
            <div className="rounded-[32px] bg-slate-950 p-8 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Need Something Custom?
                  </h3>

                  <p className="mt-3 max-w-2xl text-slate-300">
                    Don't see your requirement listed above? We build
                    tailored website solutions for healthcare, education,
                    real estate, startups, agencies and many other
                    industries.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-medium text-slate-900 transition hover:scale-[1.02]"
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}