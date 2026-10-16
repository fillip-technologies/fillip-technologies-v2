import OurClients from "./OurClients";
import { getContentData } from "@/server/content/queries";
import { getSection, sectionDefaults } from "@/server/content/home-sections";

/**
 * Server wrapper for the "Trusted By Organizations" client-logo carousel.
 *
 * Heading, eyebrow, stats and the logo list all come from the single
 * `home.clients` row (edited under Content → Home Page → Our Clients), so every
 * instance — home page + every service / creative-design page — stays in sync.
 */
export default async function OurClientsSection() {
  const content = await getContentData("home.clients", sectionDefaults(getSection("clients")!));
  return <OurClients content={content} />;
}
