import Hero from "@/components/Home/Hero";
import TrustedBy from "@/components/Home/TrustedBy";
import CapabilitiesSection from "@/components/Home/Capabilities";
import HumanAISection from "@/components/Home/HumanAiSection";
import OurClients from "@/components/Home/OurClients";
import IndustriesImpactSection from "@/components/Home/IndustriesImpactSection";
import TechnologyEcosystem from "@/components/Home/TechnologyEcosystem";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import { getContentData } from "@/server/content/queries";
import { getSection, sectionDefaults } from "@/server/content/home-sections";

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
      <Hero content={hero} />
      <TrustedBy content={trustedBy} />
      <CapabilitiesSection content={capabilities} />
      <HumanAISection content={humanai} />
      <IndustriesImpactSection content={industries} />

      <OurClients content={clients} />
      <TechnologyEcosystem content={technology} />
      <TestimonialsSection content={testimonials} />
    </>
  );
}
