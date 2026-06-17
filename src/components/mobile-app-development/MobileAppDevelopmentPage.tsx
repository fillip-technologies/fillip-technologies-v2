import NeedGuidanceSection from "@/components/Cta/NeedGuidanceSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import type { MobileAppDevelopmentContent } from "@/data/mobile-app-development";
import MobileAppChallenges from "./MobileAppChallenges";
import MobileAppFAQ from "./MobileAppFAQ";
import MobileAppFeatures from "./MobileAppFeatures";
import MobileAppHero from "./MobileAppHero";
import MobileAppSolutions from "./MobileAppSolutions";
import MobileAppTestimonials from "./MobileAppTestimonials";

type MobileAppDevelopmentPageProps = {
  data: MobileAppDevelopmentContent;
};

export default function MobileAppDevelopmentPage({
  data,
}: MobileAppDevelopmentPageProps) {
  return (
    <main>
      <MobileAppHero data={data.hero} />
      <TrustedBrandsSection />
      <MobileAppChallenges data={data.challenges} />
      <MobileAppSolutions data={data.solutions} />
      <NeedGuidanceSection
        title={data.guidance.title}
        buttonText={data.guidance.buttonText}
      />

      <MobileAppFeatures data={data.features} />

      <MobileAppTestimonials data={data.testimonials} />
      <MobileAppFAQ data={data.faq} />


    </main>
  );
}
