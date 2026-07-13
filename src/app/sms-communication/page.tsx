import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SmsCommunicationSolutionPage from "@/components/solutions/SmsCommunicationSolutionPage";
import { getSmsCommunicationContent } from "@/server/content/solution-page-content";

export const metadata: Metadata = {
  title: "SMS Communication Solution | Fillip Technologies",
  description: "Enterprise SMS Gateway solutions by Fillip Technologies. Send transactional OTPs, notification alerts, and marketing bulk broadcasts with 99.9% delivery rates.",
  alternates: { canonical: "/solutions/sms-communication" },
};

// CMS-managed content — render fresh so edits show without a rebuild.
export const dynamic = "force-dynamic";

export default async function SmsCommunicationPage() {
  const content = await getSmsCommunicationContent();
  return (
    <>
      <Navbar />
      <SmsCommunicationSolutionPage content={content} />
      <Footer />
    </>
  );
}
