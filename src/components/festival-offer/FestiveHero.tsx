import { FaWhatsapp } from "react-icons/fa6";
import { CalendarDays, Check } from "lucide-react";
import ConsultationForm from "@/components/form/ConsultationForm";
import DurgaPujaDiscountBadge from "./DurgaPujaDiscountBadge";
import {
  CAMPAIGN_WHATSAPP_URL,
  ENQUIRY_ANCHOR,
  ENQUIRY_HREF,
  OFFER,
} from "./constants";
import { CrackerBurst, Diya, MadhubaniPeacock, PujaAlpana } from "./decor";

const BENEFITS = ["More Visibility", "More Customers", "Real Growth"];

export default function FestiveHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF8EC] via-[#FDFBF5] to-white">
      {/* Decoration layer — pinned to the edges so it never crowds the
          headline, pricing, CTAs or the form. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#F0B429]/10 blur-[130px]" />
        <div className="absolute -right-20 top-1/3 h-[380px] w-[380px] rounded-full bg-[#0242a2]/10 blur-[130px]" />
        <PujaAlpana className="absolute -right-10 -top-20 hidden h-[230px] w-[230px] text-[#B91C1C]/10 lg:block" />
        <MadhubaniPeacock className="absolute -left-10 bottom-0 hidden h-[240px] w-[205px] text-[#B91C1C]/15 xl:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-6 lg:pb-24 lg:pt-16">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* ---------------- Left: offer ---------------- */}
          <div className="max-w-xl text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C9972B]/35 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9741B] shadow-sm">
                <span aria-hidden="true" className="text-[#B91C1C]">✦</span> Durga Puja Special Offer
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#081C2E]/10 bg-white/80 px-3.5 py-2 text-[11px] font-semibold text-[#081C2E] shadow-sm">
                <span className="font-extrabold text-[#B91C1C]">13+</span>
                Years of Experience
              </span>
            </div>

            <h1 className="mt-6 text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-[#081C2E] sm:text-5xl lg:text-[54px]">
              Make Your Brand the{" "}
              <span className="relative whitespace-nowrap text-[#0242a2]">
                Festive Favourite
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-gradient-to-r from-[#F0B429] via-[#C9972B] to-transparent opacity-60"
                />
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Digital Marketing &amp; Social Media Management to help your business grow
              this festive season.
            </p>

            {/* Pricing — the single loudest element in the hero. */}
            <div className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-3">
              <Diya className="h-11 w-11 shrink-0 self-center" />

              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-400 line-through decoration-[#C9972B]/70 decoration-2">
                  {OFFER.regularPrice}
                  {OFFER.per}
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9741B]">
                  Only at
                </span>
                <span className="flex items-baseline gap-1">
                  <span className="bg-gradient-to-br from-[#C9972B] via-[#E0A52E] to-[#F0B429] bg-clip-text text-[46px] font-extrabold leading-none text-transparent sm:text-[58px]">
                    {OFFER.festivePrice}
                  </span>
                  <span className="text-lg font-semibold text-[#081C2E]">{OFFER.per}</span>
                </span>
              </div>

              <span className="relative inline-flex">
                <DurgaPujaDiscountBadge size="hero" />
                <CrackerBurst className="absolute -right-5 -top-5 size-14 text-[#D97706] drop-shadow-[0_0_8px_rgba(245,158,11,0.45)]" />
              </span>
            </div>

            {/* Benefits */}
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm font-semibold text-[#081C2E]">
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#C9972B]/15 text-[#A9741B]">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={ENQUIRY_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0242a2] to-[#0a5bd3] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(2,66,162,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(2,66,162,0.36)]"
              >
                Claim Your Festive Offer
                <span aria-hidden="true">→</span>
              </a>

              <a
                href={CAMPAIGN_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-[#081C2E] shadow-sm transition hover:-translate-y-0.5 hover:border-[#25D366]/50 hover:shadow-md"
              >
                <FaWhatsapp className="size-5 text-[#25D366]" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-slate-500">
              <CalendarDays className="size-4 text-[#C9972B]" aria-hidden="true" />
              Offer valid: {OFFER.validity}
            </p>
          </div>

          {/* ---------------- Right: enquiry form ---------------- */}
          <div
            id={ENQUIRY_ANCHOR}
            tabIndex={-1}
            className="scroll-mt-28 lg:sticky lg:top-28"
          >
            <div className="relative rounded-[28px] border border-[#C9972B]/25 bg-white p-6 shadow-[0_24px_60px_rgba(8,28,46,0.1)] sm:p-8">
              {/* thin gold rim */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-[#F0B429]/20"
              />

              <div className="relative">
                <div className="mb-6 border-b border-slate-100 pb-5 text-center">
                  <h2 className="text-[22px] font-bold leading-snug text-[#081C2E] sm:text-2xl">
                    Get Your Festive Growth Plan
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-[13px] leading-6 text-slate-500">
                    Interested in the ₹9,999/month festive offer? Share your details and
                    our team will get in touch shortly.
                  </p>
                </div>

                {/*
                  The site's existing contact form, reused as-is: same fields,
                  validation, /api/contact payload and success/error states.
                  Only `source` is set so these leads are identifiable.
                */}
                <ConsultationForm source="Festive Offer Landing Page" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
