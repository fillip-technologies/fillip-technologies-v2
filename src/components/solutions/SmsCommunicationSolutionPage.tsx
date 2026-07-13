import SmsHero from "@/components/sms-communication/SmsHero";
import SmsFeatures from "@/components/sms-communication/SmsFeatures";
import SmsApiIntegration from "@/components/sms-communication/SmsApiIntegration";
import SmsPricing from "@/components/sms-communication/SmsPricing";
import SmsFaq from "@/components/sms-communication/SmsFaq";
import type { SmsCommunicationContent } from "./sms-content";

// Inner content of the SMS Communication solution page (no Navbar/Footer, so it
// can render both under the (site) layout at /solutions/sms-communication and on
// the standalone /sms-communication route that supplies its own chrome).
export default function SmsCommunicationSolutionPage({
  content,
}: {
  content: SmsCommunicationContent;
}) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-slate-900">
      <SmsHero content={content.hero} />
      <SmsFeatures content={content.features} />
      <SmsApiIntegration content={content.api} />
      <SmsPricing content={content.pricing} />
      <SmsFaq content={content.faq} />
    </main>
  );
}
