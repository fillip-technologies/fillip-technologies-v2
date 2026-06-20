import FAQSection from "@/components/shared/FAQSection";
import ServicePage from "@/components/services/ServicePage";
import type { WebsiteDesignLandingPage } from "@/lib/service-content/types";

type WebsiteDesignLandingTemplateProps = {
  page: WebsiteDesignLandingPage;
};

export default function WebsiteDesignLandingTemplate({
  page,
}: WebsiteDesignLandingTemplateProps) {
  return (
    <>
      <ServicePage data={page.content} />
      <FAQSection
        badge={page.faq.badge}
        title={page.faq.title}
        description={page.faq.description}
        faqs={page.faq.items}
      />
    </>
  );
}
