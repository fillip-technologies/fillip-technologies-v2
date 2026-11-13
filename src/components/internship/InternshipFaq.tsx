import { Mail, Phone, Plus } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FAQS } from "./constants";

/** FAQ accordion built on <details>, so it works without JavaScript and is keyboard accessible. */
export default function InternshipFaq() {
  return (
    <section id="faq" className="scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">FAQ</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 lg:text-5xl">Questions, answered</h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
            Everything you need to know before you apply. Can&apos;t find your answer? Talk to our team.
          </p>
          <div className="mt-8 space-y-3">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 transition hover:border-primary/40 hover:text-primary"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Phone className="size-4" />
              </span>
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 transition hover:border-primary/40 hover:text-primary"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Mail className="size-4" />
              </span>
              <span className="break-all">{siteConfig.email}</span>
            </a>
          </div>
        </div>

        <div className="divide-y divide-slate-200 rounded-[28px] border border-slate-200 bg-white px-6 shadow-[0_18px_44px_rgba(15,23,42,0.05)] sm:px-8">
          {FAQS.map(({ question, answer }, i) => (
            <details key={question} className="group py-1" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-semibold text-slate-900 marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 [&::-webkit-details-marker]:hidden">
                {question}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45 group-open:bg-primary group-open:text-white">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="pb-6 pr-12 leading-7 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
