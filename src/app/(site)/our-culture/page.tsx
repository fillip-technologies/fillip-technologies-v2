import type { Metadata } from "next";
import CultureHero from "@/components/Our-culture/CultureHero";
import BeliefsSection from "@/components/Our-culture/BeliefsSection";
import ApproachSection from "@/components/Our-culture/ApproachSection";
import { getContentData } from "@/server/content/queries";
import { getPageSection, pageSectionDefaults } from "@/server/content/page-sections";

export const metadata: Metadata = {
  title: "Our Culture | Fillip Technologies",
  description: "Explore the culture of curiosity, creativity, ownership, and innovation at Fillip Technologies. Discover our simple yet powerful approach to digital success.",
  alternates: { canonical: "/our-culture" },
};

export const dynamic = "force-dynamic";

export default async function OurCulturePage() {
  const hero = await getContentData(
    "page.our-culture.hero",
    pageSectionDefaults(getPageSection("our-culture", "hero")!)
  );

  return (
    <main className="bg-white dark:bg-slate-950 overflow-hidden">
      <CultureHero content={hero} />
      <BeliefsSection />
      <ApproachSection />
    </main>
  );
}
