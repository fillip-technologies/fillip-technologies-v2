import FAQSection from "@/components/shared/FAQSection";
import GlobalTestimonials from "@/components/shared/GlobalTestimonials";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import GrowthStoriesSection from "@/components/performance-marketing/GrowthStoriesSection";
import HeroSection from "@/components/performance-marketing/HeroSection";
import HowItWorksSection from "@/components/performance-marketing/HowItWorksSection";
import MarketingPhilosophySection from "@/components/performance-marketing/MarketingPhilosophySection";
import ResultsSection from "@/components/performance-marketing/ResultsSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import type { PerformanceMarketingLandingPage } from "@/lib/service-content/types";

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
      <GlobalTestimonials
        badge="CLIENT SUCCESS STORIES"
        title="What Our Clients Say"
        description="See how focused advertising strategies help businesses improve lead quality, conversions, and campaign performance."
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
