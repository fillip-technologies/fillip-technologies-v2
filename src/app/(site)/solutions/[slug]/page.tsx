import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HardwareSolutionPage from "@/components/Hardware-solution/HardwareSolutionPage";
import WhatsAppBusinessSolutionsPage from "@/components/solutions/WhatsAppBusinessSolutionsPage";
import TicketBookingSolutionPage from "@/components/solutions/TicketBookingSolutionPage";
import SmsCommunicationSolutionPage from "@/components/solutions/SmsCommunicationSolutionPage";
import type { HardwareSolutionPage as HardwareSolutionPageData } from "@/data/hardware-solutions";
import { getBusinessSolutionBySlug } from "@/data/solutions";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";
import {
  getWhatsAppBusinessContent,
  getTicketBookingContent,
  getSmsCommunicationContent,
} from "@/server/content/solution-page-content";

// Content is CMS-managed, so render fresh (mirrors the other CMS pages).
export const dynamic = "force-dynamic";

// Slugs with a bespoke, hand-built layout that replaces the generic renderer.
// Their content is managed under CMS group `page.<slug>.*`.
const CUSTOM_LAYOUT_SLUGS = new Set(["whatsapp-business", "ticket-booking", "sms-communication"]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const customMeta: Record<string, Metadata> = {
    "whatsapp-business": {
      title: "WhatsApp Business Solutions | Fillip Technologies",
      description: "Automate customer communication on WhatsApp — confirmations, notifications, follow-ups, reminders and lead workflows built for scale.",
      alternates: { canonical: `/solutions/${slug}` },
    },
    "ticket-booking": {
      title: "Ticketing Platform Development Services | Fillip Technologies",
      description: "Build secure, scalable and intelligent ticketing solutions for tourism, public attractions, events and organizations — online booking, counter POS, QR entry and live reporting.",
      alternates: { canonical: `/solutions/${slug}` },
    },
    "sms-communication": {
      title: "SMS Communication Solution | Fillip Technologies",
      description: "Enterprise SMS Gateway solutions by Fillip Technologies. Send transactional OTPs, notification alerts, and marketing bulk broadcasts with 99.9% delivery rates.",
      alternates: { canonical: `/solutions/${slug}` },
    },
  };
  if (customMeta[slug]) return customMeta[slug];
  const page = await getServicePage(slug);
  if (page) {
    return { title: `${page.title} | Fillip Technologies`, alternates: { canonical: `/solutions/${slug}` } };
  }
  const staticPage = getBusinessSolutionBySlug(slug);
  if (staticPage) {
    return {
      title: staticPage.seo.title,
      description: staticPage.seo.description,
      alternates: { canonical: `/solutions/${slug}` },
    };
  }
  return {};
}

export default async function BusinessSolutionSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Bespoke layout slugs render their own CMS-driven component.
  if (CUSTOM_LAYOUT_SLUGS.has(slug)) {
    if (slug === "ticket-booking") {
      return <TicketBookingSolutionPage content={await getTicketBookingContent()} />;
    }
    if (slug === "sms-communication") {
      return <SmsCommunicationSolutionPage content={await getSmsCommunicationContent()} />;
    }
    return <WhatsAppBusinessSolutionsPage content={await getWhatsAppBusinessContent()} />;
  }

  // DB-managed page wins; unknown slugs fall back to the static content (zero
  // regression for the seeded pages); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (page.template !== "business-solution") notFound(); // lives under another route
    if (!page.published) notFound(); // drafts are visible only via /preview
    const data = (await getServicePageData(slug, "business-solution")) as HardwareSolutionPageData;
    return <HardwareSolutionPage data={{ ...data, label: page.title }} />;
  }

  const staticData = getBusinessSolutionBySlug(slug);
  if (!staticData) notFound();
  return <HardwareSolutionPage data={staticData} />;
}
