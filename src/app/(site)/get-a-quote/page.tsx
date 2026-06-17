import type { Metadata } from "next";
import QuoteCalculator from "@/components/quote/QuoteCalculator";

export const metadata: Metadata = {
  title: "Get a Quote | Fillip Technologies",
  description:
    "Build a custom estimate for websites, SEO, social media, performance marketing, and software. Get the PDF emailed to you instantly.",
};

export default function GetAQuotePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
      <header className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
          Pricing Calculator
        </p>
        <h1 className="mt-4 text-h2 font-bold tracking-tight text-heading">
          Build your custom estimate
        </h1>
        <p className="mt-4 text-body">
          Pick the packages you need and add any extras — your total updates live. Enter your
          details and we&apos;ll email you a PDF estimate (and download a copy instantly). Final
          pricing is always negotiable when you visit our office or talk to us on a call.
        </p>
      </header>

      <div className="mt-12">
        <QuoteCalculator />
      </div>
    </main>
  );
}
