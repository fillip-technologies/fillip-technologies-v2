import HeroSection from "@/components/performance-marketing/HeroSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import MarketingPhilosophySection from "@/components/performance-marketing/MarketingPhilosophySection";
import HowItWorksSection from "@/components/performance-marketing/HowItWorksSection";
import ResultsSection from "@/components/performance-marketing/ResultsSection";
import GrowthStoriesSection from "@/components/performance-marketing/GrowthStoriesSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import FAQSection from "@/components/shared/FAQSection";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";

import type { PerformanceMarketingCmsContent } from "@/data/performance-marketing-cms";

type PerformanceMarketingCmsPageProps = {
  data: PerformanceMarketingCmsContent;
};

/**
 * Renderer for the "performance-marketing" Service Pages template — the
 * admin-created /marketing/<slug> pages that use the Performance Marketing (ads)
 * layout. Mirrors the /performance-marketing landing layout, but every section
 * is per-page and CMS-editable (content assembled in getServicePageData).
 */
export default function PerformanceMarketingCmsPage({
  data,
}: PerformanceMarketingCmsPageProps) {
  return (
    <main className="ticket-page relative overflow-hidden bg-background text-heading">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="relative">
        <HeroSection key={`${data.slug}-hero`} data={data.hero} />

        <TrustedBrandsSection />

        <MarketingPhilosophySection key={`${data.slug}-philosophy`} data={data.philosophy} />

        <HowItWorksSection key={`${data.slug}-workflow`} data={data.workflow} />

        <ResultsSection key={`${data.slug}-results`} data={data.results} />

        <GrowthStoriesSection />

        <TestimonialsSection
          key={`${data.slug}-testimonials`}
          badge={data.testimonials.badge}
          title={data.testimonials.title}
          description={data.testimonials.description}
          testimonials={data.testimonials.items}
        />

        <FAQSection
          key={`${data.slug}-faq`}
          badge={data.faq.badge}
          title={data.faq.title}
          description={data.faq.description}
          faqs={data.faq.items}
        />

        <ConsultationFormSection />
      </div>
    </main>
  );
}
