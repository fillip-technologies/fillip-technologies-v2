import type { Metadata } from "next";
import WhatsAppBusinessSolutionsPage from "@/components/solutions/WhatsAppBusinessSolutionsPage";
import { getWhatsAppBusinessContent } from "@/server/content/solution-page-content";
import { getGlobalTestimonials } from "@/server/content/global-testimonials";

export const metadata: Metadata = {
  title: "WhatsApp Business Solutions | Fillip Technologies",
  description: "Automate customer communication on WhatsApp — confirmations, notifications, follow-ups, reminders and lead workflows built for scale.",
  alternates: { canonical: "/solutions/whatsapp-business" },
};

// CMS-managed content — render fresh so edits show without a rebuild.
export const revalidate = 300;

export default async function MessengerPage() {
  const [content, testimonials] = await Promise.all([
    getWhatsAppBusinessContent(),
    getGlobalTestimonials(),
  ]);
  return <WhatsAppBusinessSolutionsPage content={content} testimonials={testimonials} />;
}
