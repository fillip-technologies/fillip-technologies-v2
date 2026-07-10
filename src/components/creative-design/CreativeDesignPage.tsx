import HeroSection from "@/components/website-development/HeroSection";
import DevelopmentProcessTimeline from "@/components/website-development/DevelopmentProcessTimeline";
import WhatWeBuildBlock from "@/components/services/blocks/WhatWeBuildBlock";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import OurClients from "@/components/Home/OurClients";
import PortfolioSection from "./PortfolioSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import CreativeDesignFaq from "./CreativeDesignFaq";

import type { CreativeDesignContent } from "@/data/creative-design";

type CreativeDesignPageProps = {
  data: CreativeDesignContent;
};

/**
 * Renderer for the "creative-design" Service Pages template. Reuses the proven
 * hero + capabilities (whatWeBuild) + process sections and adds three
 * design-specific sections: portfolio, why-choose-us and FAQs. All content is
 * per-page and CMS-editable.
 */
export default function CreativeDesignPage({ data }: CreativeDesignPageProps) {
  return (
    <>
      <HeroSection key={`${data.slug}-hero`} data={data.hero} />

      <TrustedBrandsSection />

      <WhatWeBuildBlock key={`${data.slug}-capabilities`} data={data.capabilities} />

      <PortfolioSection key={`${data.slug}-portfolio`} data={data.portfolio} />

      <OurClients />

      <DevelopmentProcessTimeline key={`${data.slug}-process`} data={data.process} />

      <WhyChooseUsSection key={`${data.slug}-why`} data={data.whyChooseUs} />

      <CreativeDesignFaq key={`${data.slug}-faq`} data={data.faq} />

      <ConsultationFormSection />
    </>
  );
}
