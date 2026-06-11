import HeroSection from "@/components/website-development/HeroSection";
import WhyMostWebsitesUnderperform from "@/components/website-development/WhyMostWebsitesUnderperform";
import WhatWeBuildSection from "@/components/website-development/WhatWeBuildSection";
import TechnologyStackSection from "@/components/website-development/TechnologyStackSection";
import DevelopmentProcessTimeline from "@/components/website-development/DevelopmentProcessTimeline";
import BusinessOutcomesSection from "@/components/website-development/BusinessOutcomesSection"

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <HeroSection />
      <WhyMostWebsitesUnderperform />
      <WhatWeBuildSection />
      <TechnologyStackSection />
      <DevelopmentProcessTimeline />
      <BusinessOutcomesSection />
    </>
  );
}
