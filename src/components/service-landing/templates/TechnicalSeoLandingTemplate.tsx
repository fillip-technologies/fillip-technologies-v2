import HiddenTechnicalIssuesWeFix from "@/components/Seo/TechnicalSeo/HiddenTechnicalIssuesWeFix";
import IndustriesWeServeCards from "@/components/Seo/TechnicalSeo/IndustriesWeServeCards";
import SEOHeroSection from "@/components/Seo/TechnicalSeo/SEOHeroSection";
import TechnicalSeoServicesStack from "@/components/Seo/TechnicalSeo/TechnicalSeoServicesStack";
import TechnicalSeoToolsSection from "@/components/Seo/TechnicalSeo/TechnicalSeoToolsSection";
import WhyWebsiteIsntRanking from "@/components/Seo/TechnicalSeo/WhyWebsiteIsntRanking";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import FAQSection from "@/components/shared/FAQSection";
import GlobalTestimonials from "@/components/shared/GlobalTestimonials";
import type { TechnicalSeoLandingPage } from "@/lib/service-content/types";

type TechnicalSeoLandingTemplateProps = {
  page: TechnicalSeoLandingPage;
};

export default function TechnicalSeoLandingTemplate({
  page,
}: TechnicalSeoLandingTemplateProps) {
  return (
    <main>
      <SEOHeroSection data={page.content.hero} />
      <WhyWebsiteIsntRanking />
      <TechnicalSeoServicesStack />
      <HiddenTechnicalIssuesWeFix />
      <IndustriesWeServeCards />
      <TechnicalSeoToolsSection />
      <GlobalTestimonials
        badge="CLIENT SUCCESS STORIES"
        title="What Our Clients Say"
        description="See how businesses improved search visibility, performance, and organic growth through our technical SEO expertise."
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
