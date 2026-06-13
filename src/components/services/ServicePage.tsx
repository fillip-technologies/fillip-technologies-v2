import HeroSection from "@/components/website-development/HeroSection";
import WhyMostWebsitesUnderperform from "@/components/website-development/WhyMostWebsitesUnderperform";
import WhatWeBuildSection from "@/components/website-development/WhatWeBuildSection";
import TechnologyStackSection from "@/components/website-development/TechnologyStackSection";
import DevelopmentProcessTimeline from "@/components/website-development/DevelopmentProcessTimeline";
import BusinessOutcomesSection from "@/components/website-development/BusinessOutcomesSection";
import ConsultationFormSection from "../form/ConsultationFormSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import TrustBar from "../TrustBar/TrustBar";
import WebsiteAuditCTA from "../Cta/WebsiteAuditCTA";
import OurClients from "../Home/OurClients";

import type { Service } from "@/data/services";

type ServicePageProps = {
  service: Service;
};

export default function ServicePage({ service }: ServicePageProps) {
  return (
    <>
      <HeroSection key={`${service.slug}-hero`} data={service.hero} />

      <TrustedBrandsSection />

      <WhyMostWebsitesUnderperform
        key={`${service.slug}-challenges`}
        data={service.challenges}
      />

      <WebsiteAuditCTA />

      <WhatWeBuildSection
        key={`${service.slug}-what-we-build`}
        data={service.whatWeBuild}
      />

      <OurClients />

      <DevelopmentProcessTimeline
        key={`${service.slug}-process`}
        data={service.process}
      />


      <TechnologyStackSection
        key={`${service.slug}-technology-stack`}
        data={service.technologyStack}
      />

      <ConsultationFormSection />
    </>
  );
}
