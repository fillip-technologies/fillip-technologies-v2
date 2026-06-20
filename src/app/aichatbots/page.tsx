import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import AIAutomationLandingTemplate from "@/components/service-landing/templates/AIAutomationLandingTemplate";
import { getServiceLandingPage } from "@/lib/service-content/repository";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServiceLandingPage("aichatbots");
  if (!page) notFound();

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: page.seo.canonical },
    openGraph: {
      title: page.seo.openGraph.title,
      description: page.seo.openGraph.description,
      url: page.seo.canonical,
      images: [{ url: page.seo.openGraph.image }],
    },
    robots: page.seo.robots,
  };
}

export default async function AIChatbotsPage(){const page=await getServiceLandingPage("aichatbots");if(!page||page.templateKey!=="ai-automation")notFound();return <><Navbar/><AIAutomationLandingTemplate page={page}/><Footer/></>}
