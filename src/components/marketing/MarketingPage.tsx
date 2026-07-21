import SEOHeroSection from "@/components/Seo/TechnicalSeo/SEOHeroSection";
import WhyWebsiteIsntRanking from "@/components/Seo/TechnicalSeo/WhyWebsiteIsntRanking";
import TechnicalSeoServicesStack from "@/components/Seo/TechnicalSeo/TechnicalSeoServicesStack";
import HiddenTechnicalIssuesWeFix from "@/components/Seo/TechnicalSeo/HiddenTechnicalIssuesWeFix";
import IndustriesWeServeCards from "@/components/Seo/TechnicalSeo/IndustriesWeServeCards";
import TechnicalSeoToolsSection from "@/components/Seo/TechnicalSeo/TechnicalSeoToolsSection";
import GlobalTestimonials from "@/components/shared/GlobalTestimonials";
import FAQSection from "@/components/shared/FAQSection";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";

import type { MarketingContent } from "@/data/marketing";

type MarketingPageProps = {
  data: MarketingContent;
};

/**
 * Renderer for the "marketing" Service Pages template (SEO & Performance
 * Marketing). Composes the rich, purpose-built SEO layout — every section is
 * per-page and CMS-editable (content assembled in getServicePageData). The
 * static /technical-seo page used to hardcode these same sections.
 */
export default function MarketingPage({ data }: MarketingPageProps) {
  return (
    <main>
      <SEOHeroSection key={`${data.slug}-hero`} data={data.hero} />

      <WhyWebsiteIsntRanking key={`${data.slug}-challenges`} data={data.challenges} />

      <TechnicalSeoServicesStack key={`${data.slug}-services`} data={data.services} />

      <HiddenTechnicalIssuesWeFix key={`${data.slug}-issues`} data={data.issues} />

      <IndustriesWeServeCards key={`${data.slug}-industries`} data={data.industries} />

      <TechnicalSeoToolsSection key={`${data.slug}-tools`} data={data.tools} />

      <GlobalTestimonials
        key={`${data.slug}-testimonials`}
        badge={data.testimonials.badge}
        title={data.testimonials.title}
        description={data.testimonials.description}
      />

      <FAQSection
        key={`${data.slug}-faq`}
        badge={data.faq.badge}
        title={data.faq.title}
        description={data.faq.description}
        faqs={data.faq.items}
      />

      <ConsultationFormSection />
    </main>
  );
}
