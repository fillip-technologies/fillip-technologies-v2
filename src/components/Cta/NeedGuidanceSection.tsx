"use client";

import Link from "next/link";
import { ArrowRight, FileText, PhoneCall } from "lucide-react";

// Shared CTA. Editable via CMS on the home page (key: home.needguidance) by
// passing `content`, or via explicit props on service landing pages (explicit
// props win over CMS content, which wins over the defaults below).
type NeedGuidanceFields = Partial<{
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  image: string;
}>;

export default function NeedGuidanceSection(
  props: { content?: Record<string, unknown> } & NeedGuidanceFields
) {
  const fromContent = (props.content ?? {}) as NeedGuidanceFields;
  const eyebrow = props.eyebrow ?? fromContent.eyebrow ?? "Need Expert Advice?";
  const title =
    props.title ?? fromContent.title ?? "Not Sure What Solution Fits Your Business?";
  const description =
    props.description ??
    fromContent.description ??
    "Every business has different goals. Whether you need a website, mobile app, digital marketing, SEO, automation, or AI solutions, our experts will help you choose the right strategy.";
  const buttonText = props.buttonText ?? fromContent.buttonText ?? "Talk To Our Experts →";

  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-[82rem]">
        <div className="relative w-full overflow-hidden rounded-2xl border border-blue-100 bg-white px-6 py-7 shadow-[0_22px_70px_rgba(15,23,42,0.08)] sm:px-9 lg:px-12 lg:py-9">
          <div className="pointer-events-none absolute bottom-0 left-0 h-44 w-64 opacity-50 [background-image:radial-gradient(#1d4ed8_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100/70 blur-2xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
              </p>
              <div className="mt-3 h-0.5 w-12 rounded-full bg-primary" />

              <h3 className="mt-5 max-w-3xl text-2xl font-bold leading-tight text-slate-950 md:text-3xl lg:text-4xl">
                {title}
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                {description}
              </p>
            </div>

            <div className="relative border-t border-blue-100 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <Link
                href="/contact"
                className="group inline-flex w-full max-w-[18rem] items-center justify-between rounded-xl bg-primary px-5 py-4 text-base font-semibold text-white shadow-[0_22px_45px_rgba(2,66,162,0.26)] transition hover:-translate-y-1 hover:bg-blue-700"
              >
                <span className="inline-flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  {buttonText}
                </span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>

              <div className="mt-6 flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary">
                  <PhoneCall className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-950">Call Us :</p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-primary xl:flex-nowrap">
                    <a className="whitespace-nowrap hover:underline" href="tel:+917257930444">
                      +91 7257930444
                    </a>
                    <a className="whitespace-nowrap hover:underline" href="tel:+917545999996">
                      +91 7545999996
                    </a>
                    <a className="whitespace-nowrap hover:underline" href="tel:+917545999995">
                      +91 7545999995
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
