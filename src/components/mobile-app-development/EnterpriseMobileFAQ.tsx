
import FAQSection from "@/components/shared/FAQSection";
import type { MobileAppFAQContent } from "@/data/mobile-app-development";

type MobileAppFAQProps = {
  data: MobileAppFAQContent;
};

export default function MobileAppFAQ({ data }: MobileAppFAQProps) {
  return (
    <FAQSection
      title={data.title}
      description={data.description}
      faqs={data.faqs}
      ctaTitle={data.ctaTitle}
      ctaDescription={data.ctaDescription}
      ctaButtonText={data.ctaButtonText}
    />
  );
}

