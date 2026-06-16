"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const challenges = [
  "Disconnected Business Systems",
  "Manual & Time-Consuming Processes",
  "Limited Workforce Visibility",
  "Legacy Infrastructure Challenges",
];

export default function EnterpriseChallengesSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      {/* Background Glow */}
      <div
        className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-primary)" }}
      />

      <div
        className="absolute right-0 bottom-20 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Content */}
          <div>
            <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
              ENTERPRISE CHALLENGES
            </span>

            <h2 className="mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
              Enterprise Challenges
              <span className="block text-[var(--primary)]">
                We Solve
              </span>
            </h2>

            <div className="mt-8 border-l-4 border-[var(--primary)] pl-6">
              <p className="text-xl font-medium leading-relaxed text-[var(--heading)]">
                Growing organizations often face operational bottlenecks.
              </p>

              <p className="mt-3 text-lg text-[var(--body)]">
                We help eliminate inefficiencies through intelligent
                enterprise software solutions.
              </p>
            </div>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--body)]">
              From fragmented systems to outdated infrastructure,
              we help businesses streamline operations, improve
              visibility, and create scalable digital ecosystems.
            </p>

            {/* Challenge Cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {challenges.map((item) => (
                <div
                  key={item}
                  className="group flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--primary)]" />

                  <span className="font-medium leading-relaxed text-[var(--heading)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex justify-center">
            {/* Floating Card */}
           

            {/* Main Image */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-[100px]"
                style={{ background: "var(--glow-primary)" }}
              />

              <Image
                src="/images/enterprise-dashboard.png"
                alt="Enterprise Dashboard"
                width={1000}
                height={1000}
                className="relative z-10 max-w-[560px]"
              />

            
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}