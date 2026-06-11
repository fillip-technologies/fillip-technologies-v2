import HeroSection from "@/components/website-development/HeroSection";
import WhyMostWebsitesUnderperform from "@/components/website-development/WhyMostWebsitesUnderperform";
import WhatWeBuildSection from "@/components/website-development/WhatWeBuildSection";
import TechnologyStackSection from "@/components/website-development/TechnologyStackSection";
import DevelopmentProcessTimeline from "@/components/website-development/DevelopmentProcessTimeline";
import BusinessOutcomesSection from "@/components/website-development/BusinessOutcomesSection";
import type { Service } from "@/data/services";

type ServicePageProps = {
  service: Service;
};

export default function ServicePage({ service }: ServicePageProps) {
  return (
    <>
      <HeroSection key={`${service.slug}-hero`} data={service.hero} />
      <WhyMostWebsitesUnderperform
        key={`${service.slug}-challenges`}
        data={service.challenges}
      />
      <WhatWeBuildSection
        key={`${service.slug}-what-we-build`}
        data={service.whatWeBuild}
      />
      <TechnologyStackSection
        key={`${service.slug}-technology-stack`}
        data={service.technologyStack}
      />
      <DevelopmentProcessTimeline
        key={`${service.slug}-process`}
        data={service.process}
      />
      <BusinessOutcomesSection
        key={`${service.slug}-outcomes`}
        data={service.outcomes}
      />
    </>
  );
}
