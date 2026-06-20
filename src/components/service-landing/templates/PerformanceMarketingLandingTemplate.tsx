import FAQSection from "@/components/shared/FAQSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import GrowthStoriesSection from "@/components/performance-marketing/GrowthStoriesSection";
import HeroSection from "@/components/performance-marketing/HeroSection";
import HowItWorksSection from "@/components/performance-marketing/HowItWorksSection";
import MarketingPhilosophySection from "@/components/performance-marketing/MarketingPhilosophySection";
import ResultsSection from "@/components/performance-marketing/ResultsSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import type { PerformanceMarketingLandingPage } from "@/lib/service-content/types";
import performanceMarketingTestimonials from "@/data/services/performance-marketing/testimonials.json";

type PerformanceMarketingLandingTemplateProps = {
  page: PerformanceMarketingLandingPage;
};

export default function PerformanceMarketingLandingTemplate({
  page,
}: PerformanceMarketingLandingTemplateProps) {
  return (
    <main>
      <HeroSection data={page.content.hero} />
      <TrustedBrandsSection />
      <MarketingPhilosophySection data={page.content.philosophy} />
      <HowItWorksSection data={page.content.workflow} />
      <ResultsSection data={page.content.results} />
      <GrowthStoriesSection />
      <TestimonialsSection
        badge="CLIENT SUCCESS STORIES"
        title="What Our Clients Say"
        description="See how focused advertising strategies help businesses improve lead quality, conversions, and campaign performance."
        testimonials={performanceMarketingTestimonials}
      />
      <FAQSection
        badge={page.faq.badge}
        title={page.faq.title}
        description={page.faq.description}
        faqs={page.faq.items}
      />
      <ConsultationFormSection />
    </main>
  );
}
