import HeroSection from "@/components/website-development/HeroSection";
import WhyMostWebsitesUnderperform from "@/components/website-development/WhyMostWebsitesUnderperform";
import DevelopmentProcessTimeline from "@/components/website-development/DevelopmentProcessTimeline";
import BusinessOutcomesSection from "@/components/website-development/BusinessOutcomesSection";
import WhatWeBuildBlock from "@/components/services/blocks/WhatWeBuildBlock";
import TechnologyStackBlock from "@/components/services/blocks/TechnologyStackBlock";
import ConsultationFormSection from "../form/ConsultationFormSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import WebsiteAuditCTA from "../Cta/WebsiteAuditCTA";
import OurClients from "../Home/OurClients";

import type { Service } from "@/data/website-development";

type ServicePageProps = {
  data: Service;
};

// All content sections are now per-page (CMS-editable). The remaining sections
// (TrustedBrands, WebsiteAuditCTA, OurClients, ConsultationForm) are shared,
// static brand furniture.
export default function ServicePage({ data }: ServicePageProps) {
  return (
    <>
      <HeroSection key={`${data.slug}-hero`} data={data.hero} />

      <TrustedBrandsSection />

      <WhyMostWebsitesUnderperform
        key={`${data.slug}-challenges`}
        data={data.challenges}
      />

      <WebsiteAuditCTA />

      <WhatWeBuildBlock key={`${data.slug}-build`} data={data.whatWeBuild} />

      <OurClients />

      <DevelopmentProcessTimeline
        key={`${data.slug}-process`}
        data={data.process}
      />

      <TechnologyStackBlock key={`${data.slug}-stack`} data={data.technologyStack} />

      <BusinessOutcomesSection key={`${data.slug}-outcomes`} data={data.outcomes} />

      <ConsultationFormSection />
    </>
  );
}
