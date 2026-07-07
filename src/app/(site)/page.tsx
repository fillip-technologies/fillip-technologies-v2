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
import IndustriesSection from "@/components/Home/IndustriesSection"
import BlogSection from "@/components/Home/BlogSection";


// Always render with the latest CMS content. Without this Next can serve a
// cached static copy, so edits saved in the admin panel wouldn't appear until a
// rebuild. `saveHomeSection` also calls revalidatePath("/") as a backstop.
export const dynamic = "force-dynamic";

// Load a Home section's saved CMS content (falls back to registry defaults).
function sectionContent(id: string) {
  return getContentData(`home.${id}`, sectionDefaults(getSection(id)!));
}

export default async function HomePage() {
  const [
    hero,
    trustedBy,
    capabilities,
    humanai,
    industries,
    clients,
    technology,
    testimonials,
    needguidance,
    clientlistcta,
    whychooseus,
    casestudies,
  ] = await Promise.all([
    sectionContent("hero"),
    sectionContent("trustedby"),
    sectionContent("capabilities"),
    sectionContent("humanai"),
    sectionContent("industries"),
    sectionContent("clients"),
    sectionContent("technology"),
    sectionContent("testimonials"),
    sectionContent("needguidance"),
    sectionContent("clientlistcta"),
    sectionContent("whychooseus"),
    sectionContent("casestudies"),
  ]);

  return (
    <>

      <HeroSection content={hero} />
      <TrustBar content={trustedBy} />
      <ServicesSection content={capabilities} />
      <NeedGuidanceSection content={needguidance} />

      <HumanAISection content={humanai} />
      <IndustriesSection content={industries} />


      <OurClients content={clients} />
      <ClientListCTA content={clientlistcta} />
      <TestimonialsSection content={testimonials} />
      <TechnologyEcosystem content={technology} />
      <WhyChooseFillip content={whychooseus} />
      <CaseStudies content={casestudies} />
      <BlogSection />

      <ConsultationFormSection />
    </>
  );
}
