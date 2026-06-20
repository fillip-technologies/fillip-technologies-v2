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

import type { Service } from "@/data/website-development";

type ServicePageProps = {
  data: Service;
};

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

      <WhatWeBuildSection />

      <OurClients />

      <DevelopmentProcessTimeline
        key={`${data.slug}-process`}
        data={data.process}
      />


      <TechnologyStackSection />

      <ConsultationFormSection />
    </>
  );
}
