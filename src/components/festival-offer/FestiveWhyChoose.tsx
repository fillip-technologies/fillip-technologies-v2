import { Check } from "lucide-react";
import { CAMPAIGN_WHATSAPP_URL, ENQUIRY_HREF } from "./constants";
import { Diya, FloralSpray, SectionEyebrow } from "./decor";

const REASONS = [
  {
    title: "Strategy built around your goals",
    copy: "We start from what your business actually needs this season, not a template calendar.",
  },
  {
    title: "Consistent creative content",
    copy: "Graphics and reels produced on a steady schedule so your brand stays visible.",
  },
  {
    title: "Targeted, optimised campaigns",
    copy: "Meta Ads set up, monitored and adjusted as the data comes in.",
  },
  {
    title: "Planned and published for you",
    copy: "A content calendar your team approves, then we handle the publishing.",
  },
  {
    title: "Transparent reporting",
    copy: "A clear monthly report on what ran, what reached people and what we are changing.",
  },
];

export default function FestiveWhyChoose() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloralSpray className="absolute -right-4 top-6 hidden h-[300px] w-[220px] -scale-x-100 text-[#C9972B]/20 xl:block" />
        <div className="absolute -left-20 bottom-10 h-[320px] w-[320px] rounded-full bg-[#F0B429]/8 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Editorial panel */}
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#081C2E] via-[#0c2740] to-[#0242a2] p-9 text-white shadow-[0_26px_60px_rgba(8,28,46,0.22)] sm:p-11">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />

            <div className="relative">
              <Diya className="h-12 w-12" />

              <h2 className="mt-6 text-[30px] font-bold leading-[1.14] tracking-tight sm:text-[38px]">
                A partner for your
                <span className="block bg-gradient-to-r from-[#F0B429] to-[#E8C97A] bg-clip-text text-transparent">
                  festive growth
                </span>
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-white/70">
                We combine strategy, creative and performance marketing so your business
                stands out during the busiest season of the year — and keeps the momentum
                after it.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={ENQUIRY_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9972B] to-[#F0B429] px-6 py-3.5 text-sm font-bold text-[#081C2E] transition hover:-translate-y-0.5"
                >
                  Claim Your Festive Offer
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href={CAMPAIGN_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:border-[#F0B429]/60 hover:text-[#F0B429]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Reasons */}
          <div>
            <SectionEyebrow>Why Fillip Technologies</SectionEyebrow>

            <h3 className="mt-5 text-[26px] font-bold leading-[1.18] tracking-tight text-[#081C2E] sm:text-[32px]">
              What working with us actually looks like
            </h3>

            <ul className="mt-8 space-y-5">
              {REASONS.map(({ title, copy }) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#C9972B]/15 text-[#A9741B]">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[15.5px] font-bold text-[#081C2E]">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[13px] leading-6 text-slate-500">
              Outcomes depend on your product, market and budget, so we do not promise
              specific sales, leads or reach figures — we commit to the work, the
              consistency and the reporting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
