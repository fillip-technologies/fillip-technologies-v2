import { ArrowRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  CAMPAIGN_PHONE_DISPLAY,
  CAMPAIGN_PHONE_TEL,
  CAMPAIGN_WHATSAPP_URL,
  ENQUIRY_HREF,
  OFFER,
} from "./constants";
import DurgaPujaDiscountBadge from "./DurgaPujaDiscountBadge";
import { CrackerBurst, Diya, MandalaCorner, PujaAlpana } from "./decor";

export default function FestiveFinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF5] px-5 py-20 sm:px-6 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <MandalaCorner className="absolute -left-24 -top-24 h-72 w-72 text-[#C9972B]/15" />
        <MandalaCorner className="absolute -bottom-28 -right-20 h-80 w-80 text-[#C9972B]/15" />
      </div>

      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[30px] bg-gradient-to-br from-[#06161F] via-[#081C2E] to-[#0c2b47] px-6 py-12 text-center shadow-[0_26px_60px_rgba(8,28,46,0.2)] sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 rounded-full bg-[#F0B429]/10 blur-[100px]" />
          <PujaAlpana className="absolute -right-20 -top-20 h-56 w-56 text-[#FDE68A]/15" />
        </div>

        <div className="relative">
          <Diya className="mx-auto h-11 w-11" />
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F0B429]">
            A limited period Durga Puja offer
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-[30px] font-bold leading-tight tracking-tight text-white sm:text-[42px]">
            Ready to Make Your Brand the Festive Favourite?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/70">
            Let&apos;s plan your festive digital marketing campaign with a clear strategy,
            consistent content and transparent reporting.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <div className="flex flex-col items-center">
              <span className="text-sm text-white/45 line-through decoration-[#F0B429]/70 decoration-2">
                {OFFER.regularPrice}{OFFER.per}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FDE68A]/80">
                Only at
              </span>
              <span className="flex items-baseline gap-1">
                <span className="text-[36px] font-extrabold leading-none text-[#F0B429] sm:text-[44px]">
                  {OFFER.festivePrice}
                </span>
                <span className="text-sm font-semibold text-white/75">{OFFER.per}</span>
              </span>
            </div>
            <span className="relative inline-flex">
              <DurgaPujaDiscountBadge size="closing" />
              <CrackerBurst className="absolute -right-4 -top-4 size-12 text-[#FDE68A] drop-shadow-[0_0_8px_rgba(253,230,138,0.45)]" />
            </span>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={ENQUIRY_HREF}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9972B] to-[#F0B429] px-7 py-3.5 text-sm font-bold text-[#081C2E] shadow-[0_12px_30px_rgba(240,180,41,0.22)] transition hover:-translate-y-0.5"
            >
              Claim Your Festive Offer <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={CAMPAIGN_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition hover:border-[#F0B429]/60 hover:text-[#F0B429]"
            >
              <FaWhatsapp className="size-5 text-[#25D366]" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          <p className="mt-5 text-[13px] text-white/55">Valid {OFFER.validity}</p>
          <a
            href={CAMPAIGN_PHONE_TEL}
            className="mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-white/75 transition hover:text-[#F0B429]"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            Call {CAMPAIGN_PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
