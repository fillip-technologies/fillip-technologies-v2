"use client";

import { ArrowUpRight } from "lucide-react";

export default function WebsiteAuditCTA() {
  return (
    <section className="py-10 lg:py-12">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[28px] border border-[var(--border)] bg-white px-8 py-8 lg:flex-row">
          
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
              Free Website Audit
            </span>

            <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[var(--heading)] md:text-2xl">
              Your Website Might Be Losing Customers.
              <span className="highlight-text">{" Let's Find Out."}</span>
            </h2>

            <p className="mt-2 text-sm text-[var(--body)]">
              Get expert insights on performance, SEO, user experience, and conversion opportunities.
            </p>
          </div>

          <button className="group inline-flex items-center gap-2 rounded-full bg-[var(--heading)] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5">
            Get Website Audit

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
