import { CalendarDays } from "lucide-react";
import { ENQUIRY_HREF, OFFER } from "./constants";
import DurgaPujaDiscountBadge from "./DurgaPujaDiscountBadge";
import { CrackerBurst, Diya, MandalaCorner, PujaAlpana } from "./decor";

export default function FestiveOfferBanner() {
  return (
    <section className="bg-white px-5 py-6 sm:px-6 lg:py-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-gradient-to-r from-[#06161F] via-[#081C2E] to-[#0c2b47] px-7 py-10 shadow-[0_26px_60px_rgba(8,28,46,0.25)] sm:px-10 lg:px-14">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <MandalaCorner className="absolute -left-16 -top-16 h-[220px] w-[220px] text-[#F0B429]/18" />
          <PujaAlpana className="absolute -bottom-20 -right-14 h-[240px] w-[240px] text-[#FDE68A]/20" />
          <div className="absolute bottom-0 left-0 h-40 w-64 rounded-full bg-[#B91C1C]/10 blur-[90px]" />
          <div className="absolute left-1/2 top-0 h-[180px] w-[420px] -translate-x-1/2 rounded-full bg-[#F0B429]/12 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/* Copy */}
          <div className="max-w-sm text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <Diya className="h-9 w-9 shrink-0" />
              <h2 className="bg-gradient-to-r from-[#F0B429] to-[#E8C97A] bg-clip-text text-[26px] font-bold leading-tight text-transparent sm:text-[30px]">
                Limited Period
                <span className="block">Durga Puja Offer</span>
              </h2>
            </div>

            <p className="mt-4 text-[14.5px] leading-6 text-white/65">
              Grow your business this season with expert digital marketing support from a
              team that handles the whole thing.
            </p>
          </div>

          {/* Price block */}
          <div className="flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-[#F0B429]/25 bg-white/[0.04] px-7 py-5 backdrop-blur-sm">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-sm font-medium text-white/40 line-through decoration-[#F0B429]/60 decoration-2">
                {OFFER.regularPrice}
                {OFFER.per}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FDE68A]/80">
                Only at
              </span>
              <span className="flex items-baseline gap-1">
                <span className="text-[40px] font-extrabold leading-none text-[#F0B429] sm:text-[46px]">
                  {OFFER.festivePrice}
                </span>
                <span className="text-base font-semibold text-white/80">{OFFER.per}</span>
              </span>
            </div>

            <span className="relative inline-flex">
              <DurgaPujaDiscountBadge size="banner" />
              <CrackerBurst className="absolute -right-4 -top-4 size-12 text-[#FDE68A] drop-shadow-[0_0_8px_rgba(253,230,138,0.45)]" />
            </span>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 lg:items-end">
            <a
              href={ENQUIRY_HREF}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9972B] to-[#F0B429] px-8 py-4 text-sm font-bold text-[#081C2E] shadow-[0_14px_34px_rgba(240,180,41,0.3)] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Claim Your Festive Offer
              <span aria-hidden="true">→</span>
            </a>

            <p className="inline-flex items-center gap-2 text-[12.5px] font-medium text-white/55">
              <CalendarDays className="size-4 text-[#F0B429]" aria-hidden="true" />
              Valid from {OFFER.validity}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
