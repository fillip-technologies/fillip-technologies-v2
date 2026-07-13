import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import TicketBookingSolutionPage from "@/components/solutions/TicketBookingSolutionPage";
import { getTicketBookingContent } from "@/server/content/solution-page-content";

export const metadata: Metadata = {
  title: "Ticketing Platform Development Services | Fillip Technologies",
  description: "Build secure, scalable and intelligent ticketing solutions for tourism, public attractions, events and organizations — online booking, counter POS, QR entry and live reporting.",
  alternates: { canonical: "/solutions/ticket-booking" },
};

// CMS-managed content — render fresh so edits show without a rebuild.
export const dynamic = "force-dynamic";

export default async function TicketBookingPage() {
  const content = await getTicketBookingContent();
  return (
    <>
      <Navbar />
      <TicketBookingSolutionPage content={content} />
      <Footer />
    </>
  );
}
