import Image from "next/image";
import { ENQUIRY_HREF } from "./constants";

/**
 * Campaign header. Deliberately not the global <Navbar />: paid traffic lands
 * here to act on one offer, so the mega-menus and the logo's link back to the
 * marketing site are left out as exit routes. The in-page links below only
 * move the visitor down this page.
 */
export default function FestiveHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#C9972B]/20 bg-white/85 backdrop-blur-md after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[#B91C1C]/25 after:to-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:h-[72px]">
        <Image
          src="/images/logo/fillip-technologies.png"
          alt="Fillip Technologies"
          width={160}
          height={44}
          priority
          className="h-8 w-auto sm:h-9"
        />

        <nav aria-label="Offer sections" className="hidden items-center gap-8 md:flex">
          <a
            href="#what-you-get"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[#0242a2]"
          >
            What You Get
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[#0242a2]"
          >
            How It Works
          </a>
          <a
            href="#faqs"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[#0242a2]"
          >
            FAQs
          </a>
        </nav>

        <a
          href={ENQUIRY_HREF}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#C9972B] to-[#F0B429] px-4 py-2.5 text-[13px] font-semibold text-[#081C2E] shadow-[0_8px_24px_rgba(201,151,43,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(201,151,43,0.4)] sm:px-5 sm:text-sm"
        >
          Get Festive Offer
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}
