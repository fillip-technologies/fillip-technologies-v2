import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import FestiveFaq from "@/components/festival-offer/FestiveFaq";
import FestiveFinalCta from "@/components/festival-offer/FestiveFinalCta";
import FestiveHeader from "@/components/festival-offer/FestiveHeader";
import FestiveHero from "@/components/festival-offer/FestiveHero";
import FestiveOfferBanner from "@/components/festival-offer/FestiveOfferBanner";
import FestiveProcess from "@/components/festival-offer/FestiveProcess";
import FestiveTrustBar from "@/components/festival-offer/FestiveTrustBar";
import FestiveWhatYouGet from "@/components/festival-offer/FestiveWhatYouGet";
import FestiveWhyChoose from "@/components/festival-offer/FestiveWhyChoose";

export const metadata: Metadata = {
  title: "Festive Growth 360° Offer | Fillip Technologies",
  description:
    "Grow your brand this festive season with Fillip Technologies. Get social media management, creative content and Meta Ads management at ₹9,999/month.",
  alternates: { canonical: "/festival-offer" },
};

export default function FestivalOfferPage() {
  return (
    <div className="scroll-smooth bg-white text-[#081C2E]">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-PLLBQ2B299"
        strategy="afterInteractive"
      />
      <Script id="google-analytics-festival-offer" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PLLBQ2B299');
        `}
      </Script>
      <FestiveHeader />
      <main>
        <FestiveHero />
        <FestiveTrustBar />
        <FestiveWhatYouGet />
        <FestiveWhyChoose />
        <FestiveProcess />
        <FestiveOfferBanner />
        <FestiveFaq />
        <FestiveFinalCta />
      </main>
      <footer className="border-t border-white/10 bg-[#06161F] px-5 py-7 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Fillip Technologies. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="text-sm text-white/60 transition hover:text-[#F0B429]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/60 transition hover:text-[#F0B429]">
              Terms
            </Link>
            <Link href="/cookies" className="text-sm text-white/60 transition hover:text-[#F0B429]">
              Cookies
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
