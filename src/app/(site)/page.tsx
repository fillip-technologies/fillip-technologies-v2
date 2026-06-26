import Hero from "@/components/Home/HeroSection";
import TrustedBy from "@/components/Home/TrustedBy";
import CapabilitiesSection from "@/components/Home/Capabilities";
import HumanAISection from "@/components/Home/HumanAiSection";
import OurClients from "@/components/Home/OurClients";
import IndustriesImpactSection from "@/components/Home/IndustriesImpactSection";
import TechnologyEcosystem from "@/components/Home/TechnologyEcosystem";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import { getContentData } from "@/server/content/queries";
import { getSection, sectionDefaults } from "@/server/content/home-sections";
import TrustBar from "@/components/TrustBar/TrustBar";
import WhyChooseFillip from "@/components/Home/WhyChooseFillip";
import NeedGuidanceSection from "@/components/Cta/NeedGuidanceSection";
import ClientListCTA from "@/components/Cta/ClientListCTA";
import CaseStudies from "@/components/Home/CaseStudies";
import HeroSection from "@/components/Home/HeroSection";
import ServicesSection from "@/components/Home/ServicesSection";

// Load a Home section's saved CMS content (falls back to registry defaults).
function sectionContent(id: string) {
  return getContentData(`home.${id}`, sectionDefaults(getSection(id)!));
}

export default async function HomePage() {
  const [hero, trustedBy, capabilities, humanai, industries, clients, technology, testimonials] =
    await Promise.all([
      sectionContent("hero"),
      sectionContent("trustedby"),
      sectionContent("capabilities"),
      sectionContent("humanai"),
      sectionContent("industries"),
      sectionContent("clients"),
      sectionContent("technology"),
      sectionContent("testimonials"),
    ]);

  return (
    <>

      <HeroSection />
      <TrustBar />
      <ServicesSection />


      <NeedGuidanceSection />
      <HumanAISection content={humanai} />
      <IndustriesImpactSection content={industries} />

      <OurClients />
      <ClientListCTA />
      <TestimonialsSection />
      <TechnologyEcosystem content={technology} />
      <WhyChooseFillip />
      <CaseStudies />

      <ConsultationFormSection />
    </>
  );
}
