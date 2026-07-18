import type { Metadata } from "next";
import OurClients from "@/components/Home/OurClients";
import HumanAISection from "@/components/Home/HumanAiSection";
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
import { siteConfig } from "@/config/site";


// Serve a cached copy and regenerate at most every 5 minutes, so most requests
// skip the DB entirely. Admin edits still appear promptly: `saveHomeSection`
// calls revalidatePath("/") on save, which rebuilds this page on demand.
export const revalidate = 300;

const homepageTitle =
  "Best Digital Marketing Company in Patna | Fillip Technologies";
const homepageDescription =
  "Fillip Technologies is a digital marketing company in Patna helping businesses grow with SEO, performance marketing, website development, social media, and AI-driven solutions.";

export const metadata: Metadata = {
  title: homepageTitle,
  description: homepageDescription,
  keywords: [
    "best digital marketing company",
    "best digital marketing company in Patna",
    "digital marketing company in Patna",
    "digital marketing agency in Patna",
    "SEO company in Patna",
    "performance marketing agency",
    "website development company in Patna",
    "Fillip Technologies",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.defaultOpenGraphImage,
        alt: "Fillip Technologies digital marketing and technology services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
    images: [siteConfig.defaultOpenGraphImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
