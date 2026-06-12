"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 ">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gradient Glow */}
      <div className="absolute left-1/2 top-1/2 h-[550px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6">
        {/* Heading */}
        <div className="mx-auto max-w-5xl text-center mt-10">
          <h1 className="text-5xl font-bold leading-[1.1] text-slate-900 md:text-5xl lg:text-6xl">
            Elevate your brand with
            <br />
            Elite{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
              Meta Ads
            </span>{" "}
            Expertise
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            We help brands increase visibility, generate leads, and maximize
            conversions through strategic Meta advertising campaigns.
          </p>
        </div>


        {/* Visual Area */}
        <div className="relative mx-auto h-[450px] max-w-6xl">
          {/* CTA */}
          <div className="absolute left-10 top-16 hidden lg:block z-20">
            <button className="group flex items-center gap-3 rounded-full bg-blue-50 px-5 py-3 font-medium text-blue-600">
              Get Started Free
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </button>
          </div>

          {/* Trust Card */}
          <div className="absolute right-10 top-10 hidden lg:block z-20">
            <div>
              <h3 className="text-5xl font-bold text-slate-900">2.3M+</h3>
              <p className="mt-2 text-sm text-slate-500">
                Trusted by thousand of users
                <br />
                across 20+ citites
              </p>
            </div>
          </div>

          {/* Glow Behind Meta */}
          <div className="absolute left-1/2 top-[180px] h-[350px] w-[550px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-200/40 via-cyan-200/30 to-purple-200/40 blur-3xl" />

          {/* Orbit */}
          <svg
            className="absolute left-1/2 top-[40px] -translate-x-1/2"
            width="900"
            height="340"
            viewBox="0 0 900 340"
            fill="none"
          >
            <path
              d="M120 300C220 60 680 60 780 300"
              stroke="#C7D2FE"
              strokeWidth="2"
            />
          </svg>

          {/* Meta Logo */}
          <div className="absolute left-1/2 top-[20px] z-10 -translate-x-1/2">
            <Image
              src="/images/meta.png"
              alt="Meta"
              width={290}
              height={290}
              priority
              className="object-contain"
            />
          </div>

          {/* Facebook */}
          <div className="absolute left-20 top-[210px] rotate-[-18deg]  ">
            <Image
              src="/images/facebook.png"
              alt="Facebook"
              width={82}
              height={82}
            />
          </div>

          {/* WhatsApp */}
          <div className="absolute left-[240px] top-[240px] rotate-[-15deg] ]">
            <Image
              src="/images/whatsapp.png"
              alt="WhatsApp"
              width={82}
              height={52}
            />
          </div>

          {/* Instagram */}
          <div className="absolute right-[250px] top-[212px] rotate-[15deg] ]">
            <Image
              src="/images/instagram.png"
              alt="Instagram"
              width={82}
              height={82}
            />
          </div>

          {/* Messenger */}
          <div className="absolute right-20 top-[230px] rounded-3xl bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <Image
              src="/images/performance-marketing/messenger.png"
              alt="Messenger"
              width={52}
              height={52}
            />
          </div>

          {/* Arrow Down */}
          <div className="absolute left-1/2 top-[390px] -translate-x-1/2 text-blue-500">
            ↓
          </div>
        </div>


      </div>
    </section>
  );
}