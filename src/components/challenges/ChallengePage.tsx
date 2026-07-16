import HeroSection from "@/components/website-development/HeroSection";
import WhyMostWebsitesUnderperform from "@/components/website-development/WhyMostWebsitesUnderperform";
import BusinessOutcomesSection from "@/components/website-development/BusinessOutcomesSection";
import WhatWeBuildBlock from "@/components/services/blocks/WhatWeBuildBlock";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import OurClients from "@/components/Home/OurClients";
import WhyChooseUsSection from "@/components/shared/WhyChooseUsSection";
import ServiceFaqSection from "@/components/shared/ServiceFaqSection";

import type { ChallengeContent } from "@/data/challenges/index";

type ChallengePageProps = {
  data: ChallengeContent;
};

/**
 * Renderer for the "challenges" Service Pages template (Challenges We Solve).
 * Reuses the proven hero + problem (challenges) + approach (whatWeBuild) +
 * outcomes sections plus the shared whyChooseUs + faq sections. All content is
 * per-page and CMS-editable.
 */
export default function ChallengePage({ data }: ChallengePageProps) {
  return (
    <>
      <HeroSection key={`${data.slug}-hero`} data={data.hero} />

      <TrustedBrandsSection />

      <WhyMostWebsitesUnderperform key={`${data.slug}-problem`} data={data.problem} />

      <WhatWeBuildBlock key={`${data.slug}-approach`} data={data.approach} />

      <OurClients />

      <BusinessOutcomesSection key={`${data.slug}-outcomes`} data={data.outcomes} />

      <WhyChooseUsSection key={`${data.slug}-why`} data={data.whyChooseUs} />

      <ServiceFaqSection key={`${data.slug}-faq`} data={data.faq} />

      <ConsultationFormSection />
    </>
  );
}
