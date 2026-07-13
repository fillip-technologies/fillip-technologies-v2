import type { Metadata } from "next";
import WhatsAppBusinessSolutionsPage from "@/components/solutions/WhatsAppBusinessSolutionsPage";
import { getWhatsAppBusinessContent } from "@/server/content/solution-page-content";

export const metadata: Metadata = {
  title: "WhatsApp Business Solutions | Fillip Technologies",
  description: "Automate customer communication on WhatsApp — confirmations, notifications, follow-ups, reminders and lead workflows built for scale.",
  alternates: { canonical: "/solutions/whatsapp-business" },
};

// CMS-managed content — render fresh so edits show without a rebuild.
export const dynamic = "force-dynamic";

export default async function MessengerPage() {
  const content = await getWhatsAppBusinessContent();
  return <WhatsAppBusinessSolutionsPage content={content} />;
}
