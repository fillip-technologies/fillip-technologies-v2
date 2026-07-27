import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import AIAutomationLandingTemplate from "@/components/service-landing/templates/AIAutomationLandingTemplate";
import { getServiceLandingPage } from "@/lib/service-content/repository";
import { buildLandingPageMetadata, serviceLandingToSeoRecord } from "@/lib/seo/metadata";
import { buildJsonLdForPage, JsonLdScript } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServiceLandingPage("aichatbots");
  if (!page) notFound();

  return buildLandingPageMetadata(page);
}

export default async function AIChatbotsPage() {
  const page = await getServiceLandingPage("aichatbots");
  if (!page || page.templateKey !== "ai-automation") notFound();

  return (
    <>
      <JsonLdScript data={buildJsonLdForPage(serviceLandingToSeoRecord(page))} />
      <Navbar />
      <AIAutomationLandingTemplate page={page} />
      <Footer />
    </>
  );
}
