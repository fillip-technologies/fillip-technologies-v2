import type { Metadata } from "next";
import InternshipShorts from "@/components/careers/InternshipShorts";
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
    <main className="bg-white text-slate-950">
      <JsonLdScript data={jsonLd} />
      <InternshipHero />
      <OfferStrip />
      <InternshipTracks />
      <InternshipPerks />
      <InternshipProcess />
      <InternshipEligibility />
      <InternshipShorts />
      <InternshipFaq />
      <InternshipApply />
    </main>
  );
}
