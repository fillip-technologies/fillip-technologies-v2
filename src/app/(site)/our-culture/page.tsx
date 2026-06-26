import type { Metadata } from "next";
import CultureHero from "@/components/Our-culture/CultureHero";
import BeliefsSection from "@/components/Our-culture/BeliefsSection";
import ApproachSection from "@/components/Our-culture/ApproachSection";

export const metadata: Metadata = {
  title: "Our Culture | Fillip Technologies",
  description: "Explore the culture of curiosity, creativity, ownership, and innovation at Fillip Technologies. Discover our simple yet powerful approach to digital success.",
  alternates: { canonical: "/our-culture" },
};

export default function OurCulturePage() {
  return (
    <main className="bg-white dark:bg-slate-950 overflow-hidden">
      <CultureHero />
      <BeliefsSection />
      <ApproachSection />
    </main>
  );
}
