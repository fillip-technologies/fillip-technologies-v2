import type { Metadata } from "next";
import ChallengesLandingSections, {
  ChallengeFinalCta,
} from "@/components/challenges/ChallengesLandingSections";
import IndustriesSection from "@/components/Home/IndustriesSection";
import ServiceFaqSection from "@/components/shared/ServiceFaqSection";
import WhyChooseUsSection from "@/components/shared/WhyChooseUsSection";
import type { ChallengesCatalog } from "@/data/challenges/index";
import { getChallengesCatalog } from "@/data/challenges/index";

export const metadata: Metadata = {
  title: "Challenges We Solve | Fillip Technologies",
  description:
    "Explore the growth challenges Fillip Technologies solves across websites, SEO, organic traffic, and lead generation.",
};

export default function ChallengesWeSolvePage() {
  const catalog = getChallengesCatalog() as ChallengesCatalog;

  return (
    <>
      <ChallengesLandingSections
        listing={catalog.listing}
        challenges={catalog.challenges}
      />
      <WhyChooseUsSection data={catalog.listing.whyChooseUs} />
      <IndustriesSection content={catalog.listing.industries} />
      <ServiceFaqSection data={catalog.listing.faq} />
      <ChallengeFinalCta data={catalog.listing.finalCta} />
    </>
  );
}
