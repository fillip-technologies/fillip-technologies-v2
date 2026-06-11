import Hero from "@/components/Home/hero";
import TrustedBy from "@/components/Home/TrustedBy";
import CapabilitiesSection from "@/components/Home/Capabilities";
import HumanAISection from "@/components/Home/HumanAiSection";
import ResultsSection from "@/components/Home/ResultsSection";
import OurClients from "@/components/Home/OurClients";
import IndustriesImpactSection from "@/components/Home/IndustriesImpactSection";
import TechnologyEcosystem from "@/components/Home/TechnologyEcosystem";
import TestimonialsSection from "@/components/Home/TestimonialsSection"

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <CapabilitiesSection />
      <HumanAISection />
       <IndustriesImpactSection />
    
      <OurClients />
      <TechnologyEcosystem />
      <TestimonialsSection />
     

    </>
  );
}
