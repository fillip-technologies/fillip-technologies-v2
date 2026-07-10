import HeroSection from "@/components/website-development/HeroSection";
import DevelopmentProcessTimeline from "@/components/website-development/DevelopmentProcessTimeline";
import BusinessOutcomesSection from "@/components/website-development/BusinessOutcomesSection";
import WhatWeBuildBlock from "@/components/services/blocks/WhatWeBuildBlock";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import OurClients from "@/components/Home/OurClients";
import WhyChooseUsSection from "@/components/shared/WhyChooseUsSection";
import ServiceFaqSection from "@/components/shared/ServiceFaqSection";

import type { MarketingContent } from "@/data/marketing";

type MarketingPageProps = {
  data: MarketingContent;
};

/**
 * Renderer for the "marketing" Service Pages template (SEO & Performance
 * Marketing). Reuses the proven hero + capabilities (whatWeBuild) + process +
 * results (outcomes) sections plus the shared whyChooseUs + faq sections. All
 * content is per-page and CMS-editable.
 */
export default function MarketingPage({ data }: MarketingPageProps) {
  return (
    <>
      <HeroSection key={`${data.slug}-hero`} data={data.hero} />

      <TrustedBrandsSection />

      <WhatWeBuildBlock key={`${data.slug}-capabilities`} data={data.capabilities} />

      <DevelopmentProcessTimeline key={`${data.slug}-process`} data={data.process} />

      <OurClients />

      <BusinessOutcomesSection key={`${data.slug}-results`} data={data.results} />

      <WhyChooseUsSection key={`${data.slug}-why`} data={data.whyChooseUs} />

      <ServiceFaqSection key={`${data.slug}-faq`} data={data.faq} />

      <ConsultationFormSection />
    </>
  );
}
