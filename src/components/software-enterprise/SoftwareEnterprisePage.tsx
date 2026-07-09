import HeroSection from "@/components/website-development/HeroSection";
import WhyMostWebsitesUnderperform from "@/components/website-development/WhyMostWebsitesUnderperform";
import DevelopmentProcessTimeline from "@/components/website-development/DevelopmentProcessTimeline";
import BusinessOutcomesSection from "@/components/website-development/BusinessOutcomesSection";
import WhatWeBuildBlock from "@/components/services/blocks/WhatWeBuildBlock";
import TechnologyStackBlock from "@/components/services/blocks/TechnologyStackBlock";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import OurClients from "@/components/Home/OurClients";
import EngagementModelsSection from "./EngagementModelsSection";
import SoftwareEnterpriseFaq from "./SoftwareEnterpriseFaq";

import type { SoftwareEnterpriseContent } from "@/data/software-enterprise";

type SoftwareEnterprisePageProps = {
  data: SoftwareEnterpriseContent;
};

/**
 * Renderer for the "software-enterprise" Service Pages template. Reuses the
 * proven Service-shaped sections (hero, challenges, whatWeBuild, technologyStack,
 * process, outcomes) and adds two SE-only sections: engagement models + FAQs.
 * All content is per-page and CMS-editable.
 */
export default function SoftwareEnterprisePage({ data }: SoftwareEnterprisePageProps) {
  return (
    <>
      <HeroSection key={`${data.slug}-hero`} data={data.hero} />

      <TrustedBrandsSection />

      <WhyMostWebsitesUnderperform key={`${data.slug}-challenges`} data={data.challenges} />

      <WhatWeBuildBlock key={`${data.slug}-build`} data={data.whatWeBuild} />

      <OurClients />

      <TechnologyStackBlock key={`${data.slug}-stack`} data={data.technologyStack} />

      <DevelopmentProcessTimeline key={`${data.slug}-process`} data={data.process} />

      <EngagementModelsSection key={`${data.slug}-engagement`} data={data.engagementModels} />

      <BusinessOutcomesSection key={`${data.slug}-outcomes`} data={data.outcomes} />

      <SoftwareEnterpriseFaq key={`${data.slug}-faq`} data={data.faq} />

      <ConsultationFormSection />
    </>
  );
}
