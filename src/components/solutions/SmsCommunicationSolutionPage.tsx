import SmsHero from "@/components/sms-communication/SmsHero";
import SmsFeatures from "@/components/sms-communication/SmsFeatures";
import SmsApiIntegration from "@/components/sms-communication/SmsApiIntegration";
import SmsPricing from "@/components/sms-communication/SmsPricing";
import SmsFaq from "@/components/sms-communication/SmsFaq";
import HomeTestimonialsSection from "@/components/Home/TestimonialsSection";
import type { GlobalTestimonial } from "@/data/testimonials";
import type { SmsCommunicationContent } from "./sms-content";

// Inner content of the SMS Communication solution page (no Navbar/Footer, so it
// can render both under the (site) layout at /solutions/sms-communication and on
// the standalone /sms-communication route that supplies its own chrome).
export default function SmsCommunicationSolutionPage({
  content,
  testimonials = [],
}: {
  content: SmsCommunicationContent;
  testimonials?: GlobalTestimonial[];
}) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-slate-900">
      <SmsHero content={content.hero} />
      <SmsFeatures content={content.features} />
      <SmsApiIntegration content={content.api} />
      <SmsPricing content={content.pricing} />
      {testimonials.length > 0 ? (
        <HomeTestimonialsSection
          content={{ heading: "What Our Clients Say" }}
          items={testimonials}
        />
      ) : null}
      <SmsFaq content={content.faq} />
    </main>
  );
}
