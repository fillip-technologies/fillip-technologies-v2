
import FAQSection from "@/components/shared/FAQSection";
import type { MobileAppFAQContent } from "@/data/mobile-app-development";
import {
  iosMobileAppContent,
  androidMobileAppContent,
  enterpriseMobileAppContent,
  ecommerceMobileAppContent,
  businessAutomationMobileAppContent,
} from "@/data/mobile-app-development";

type MobileAppFAQProps = {
  data: MobileAppFAQContent;
};

export default function MobileAppFAQ({ data }: MobileAppFAQProps) {
  let faqs = data?.faqs ?? [];
  const title = (data?.title ?? "").toLowerCase();

  if (title.includes("ios") && faqs.length < 15) {
    faqs = iosMobileAppContent.faq.faqs;
  } else if (title.includes("android") && faqs.length < 15) {
    faqs = androidMobileAppContent.faq.faqs;
  } else if (title.includes("enterprise") && faqs.length < 15) {
    faqs = enterpriseMobileAppContent.faq.faqs;
  } else if ((title.includes("commerce") || title.includes("shopping")) && faqs.length < 15) {
    faqs = ecommerceMobileAppContent.faq.faqs;
  } else if ((title.includes("automation") || title.includes("process")) && faqs.length < 15) {
    faqs = businessAutomationMobileAppContent.faq.faqs;
  }

  return (
    <FAQSection
      title={data?.title || "Frequently Asked Questions"}
      description={data?.description || ""}
      faqs={faqs}
      ctaTitle={data?.ctaTitle}
      ctaDescription={data?.ctaDescription}
      ctaButtonText={data?.ctaButtonText}
    />
  );
}

