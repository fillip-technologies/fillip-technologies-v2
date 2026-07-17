import Hero from "@/components/Home/HeroSection";
import TrustedBy from "@/components/Home/TrustedBy";
import CapabilitiesSection from "@/components/Home/Capabilities";
import HumanAISection from "@/components/Home/HumanAiSection";
import OurClients from "@/components/Home/OurClients";
import IndustriesImpactSection from "@/components/Home/IndustriesImpactSection";
import TechnologyEcosystem from "@/components/Home/TechnologyEcosystem";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import { getContentDataMany } from "@/server/content/queries";
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
import UnitOfSection from "@/components/Home/UnitOfSection";
import Faq from "@/components/Home/Faq";


// Serve a cached copy and regenerate at most every 5 minutes, so most requests
// skip the DB entirely. Admin edits still appear promptly: `saveHomeSection`
// calls revalidatePath("/") on save, which rebuilds this page on demand.
export const revalidate = 300;

const SECTION_IDS = [
  "hero", "trustedby", "capabilities", "humanai", "industries", "clients",
  "technology", "testimonials", "needguidance", "clientlistcta", "whychooseus",
  "casestudies", "unitof",
] as const;

export default async function HomePage() {
  // One batched round trip for all sections instead of 13 separate queries.
  const sections = await getContentDataMany(
    SECTION_IDS.map((id) => ({
      key: `home.${id}`,
      defaults: sectionDefaults(getSection(id)!),
    }))
  );
  const s = (id: (typeof SECTION_IDS)[number]) => sections[`home.${id}`];
  const hero = s("hero");
  const trustedBy = s("trustedby");
  const capabilities = s("capabilities");
  const humanai = s("humanai");
  const industries = s("industries");
  const clients = s("clients");
  const technology = s("technology");
  const testimonials = s("testimonials");
  const needguidance = s("needguidance");
  const clientlistcta = s("clientlistcta");
  const whychooseus = s("whychooseus");
  const casestudies = s("casestudies");
  const unitof = s("unitof");

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
      <UnitOfSection content={unitof} />
      <BlogSection />
      <Faq />

      <ConsultationFormSection className="pt-8 pb-24" />
    </>
  );
}
