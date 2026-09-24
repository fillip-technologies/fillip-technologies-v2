import TicketBookingLandingView from "@/components/solutions/TicketBookingLandingView";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript, siteJsonLd } from "@/lib/seo/schema";

// This route sits outside the (site) group and renders its own Navbar/Footer,
// so it also has to emit the site-wide graph the (site) layout would provide.
export const generateMetadata = () => pageMetadata("/ticket-booking");

export default async function TicketBookingPage() {
  const jsonLd = await pageJsonLd("/ticket-booking");
  return (
    <>
      <JsonLdScript data={[...siteJsonLd(), ...jsonLd]} />
      <TicketBookingLandingView />
    </>
  );
}
