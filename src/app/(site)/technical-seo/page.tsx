import SEOHeroSection from "@/components/Seo/TechnicalSeo/SEOHeroSection";
import HiddenTechnicalIssuesWeFix from "@/components/Seo/TechnicalSeo/HiddenTechnicalIssuesWeFix";
import WhyWebsiteIsntRanking from "@/components/Seo/TechnicalSeo/WhyWebsiteIsntRanking";
import TechnicalSeoServicesStack from "@/components/Seo/TechnicalSeo/TechnicalSeoServicesStack";
import IndustriesWeServeCards from "@/components/Seo/TechnicalSeo/IndustriesWeServeCards";
import TechnicalSeoToolsSection from "@/components/Seo/TechnicalSeo/TechnicalSeoToolsSection";
import FAQSection from "@/components/shared/FAQSection";
import { technicalSeoFaqs } from "@/components/Seo/TechnicalSeo/TechnicalSeoFAQ";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import { technicalSeoTestimonials } from "@/components/Seo/TechnicalSeo/TechnicalSeoTestimonials";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";

export default function TechnicalSeoPage() {
  return (
    <main>
      <SEOHeroSection />
      <WhyWebsiteIsntRanking />
      <TechnicalSeoServicesStack />
      <HiddenTechnicalIssuesWeFix />
      <IndustriesWeServeCards />
      <TechnicalSeoToolsSection />
       <TestimonialsSection
        badge="CLIENT SUCCESS STORIES"
        title="What Our Clients Say"
        description="See how businesses improved search visibility, performance, and organic growth through our technical SEO expertise."
        testimonials={technicalSeoTestimonials}
      />
      <FAQSection
        badge="TECHNICAL SEO FAQS"
        title="Frequently Asked Questions"
        description="Answers to common questions about technical SEO audits, implementation and optimization."
        faqs={technicalSeoFaqs}
      />
     <ConsultationFormSection />
    </main>
  );
}
