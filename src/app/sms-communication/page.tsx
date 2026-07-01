import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SmsHero from "@/components/sms-communication/SmsHero";
import SmsFeatures from "@/components/sms-communication/SmsFeatures";
import SmsApiIntegration from "@/components/sms-communication/SmsApiIntegration";
import SmsPricing from "@/components/sms-communication/SmsPricing";
import SmsFaq from "@/components/sms-communication/SmsFaq";

export const metadata: Metadata = {
  title: "SMS Communication Solution | Fillip Technologies",
  description: "Enterprise SMS Gateway solutions by Fillip Technologies. Send transactional OTPs, notification alerts, and marketing bulk broadcasts with 99.9% delivery rates.",
  alternates: { canonical: "/sms-communication" },
};

export default function SmsCommunicationPage() {
  return (
    <>
      {/* Sticky header navbar */}
      <Navbar />
      
      {/* Main page sections */}
      <main className="min-h-screen overflow-x-hidden bg-background text-slate-900">
        <SmsHero />
        <SmsFeatures />
        <SmsApiIntegration />
        <SmsPricing />
        <SmsFaq />
      </main>
      
      {/* Footer layout */}
      <Footer />
    </>
  );
}
