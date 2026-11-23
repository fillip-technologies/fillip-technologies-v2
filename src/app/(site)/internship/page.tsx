import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import InternshipShorts from "@/components/careers/InternshipShorts";
import InternshipStyles from "@/components/internship/InternshipStyles";
import { MotionRoot, ScrollProgress } from "@/components/internship/motion";
import InternshipApply from "@/components/internship/InternshipApply";
import InternshipEligibility from "@/components/internship/InternshipEligibility";
import InternshipFaq from "@/components/internship/InternshipFaq";
import InternshipHero from "@/components/internship/InternshipHero";
import InternshipPerks from "@/components/internship/InternshipPerks";
import InternshipProcess from "@/components/internship/InternshipProcess";
import InternshipTracks from "@/components/internship/InternshipTracks";
import OfferStrip from "@/components/internship/OfferStrip";
import { FAQS, INTERNSHIP_PATH, TRACKS } from "@/components/internship/constants";
import { breadcrumbJsonLd, faqPageJsonLd, JsonLdScript } from "@/lib/seo/schema";

// Page font (the National Internship Portal's body face), used for headings and text.
const bodyFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const TITLE = "Internship Programme in Patna | Fillip Technologies";
const DESCRIPTION = `Apply for the Fillip Technologies Internship Programme in ${TRACKS.map((t) => t.name).join(", ")}. Online & classroom batches in Patna, Training + Internship certificates. Registration at ₹500.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: INTERNSHIP_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: INTERNSHIP_PATH,
    type: "website",
  },
};

export default function InternshipPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", item: "/" },
      { name: "Internship Programme", item: INTERNSHIP_PATH },
    ]),
    faqPageJsonLd([...FAQS]),
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <main className={`${bodyFont.variable} intern-page bg-white`}>
      <JsonLdScript data={jsonLd} />
      <InternshipStyles />
      <MotionRoot>
        <ScrollProgress />
        <InternshipHero />
        <OfferStrip />
        <InternshipTracks />
        <InternshipPerks />
        <InternshipProcess />
        <InternshipEligibility />
        <div id="intern-stories" className="scroll-mt-24">
          <InternshipShorts showTitles={false} showEyebrow={false} />
        </div>
        <InternshipFaq />
        <InternshipApply />
      </MotionRoot>
    </main>
  );
}
