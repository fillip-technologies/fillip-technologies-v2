import OurClients from "./OurClients";
import { getContentDataMany } from "@/server/content/queries";
import { getSection, sectionDefaults } from "@/server/content/home-sections";
import {
  CLIENT_CATEGORIES,
  clientCategoryKey,
  clientCategoryDefaults,
  type ClientLogo,
} from "@/server/content/client-sections";

const META_KEY = "home.clients";

/**
 * Server wrapper for the "Trusted By Organizations" client-logo wall.
 *
 * Assembles the wall from a single, CMS-managed source so every instance stays
 * in sync (home page + every service / creative-design page):
 *   - heading, eyebrow and stats come from the `home.clients` section
 *     (edited under Content → Home Page → Our Clients);
 *   - the logos come from the per-category rows `clients.<id>`
 *     (edited under Content → Trusted By Clients), each tagged with its
 *     category id so the public filter tabs work.
 */
export default async function OurClientsSection() {
  // One batched round trip: the heading/stats meta row plus every category row.
  const rows = await getContentDataMany([
    { key: META_KEY, defaults: sectionDefaults(getSection("clients")!) },
    ...CLIENT_CATEGORIES.map((c) => ({
      key: clientCategoryKey(c.id),
      defaults: clientCategoryDefaults(c),
    })),
  ]);

  const meta = rows[META_KEY];

  // Flatten every category's logos into one list, tagging each with its category
  // id (the value the wall's filter tabs match against).
  const logos = CLIENT_CATEGORIES.flatMap((c) => {
    const list = (rows[clientCategoryKey(c.id)]?.logos as ClientLogo[] | undefined) ?? [];
    return list
      .filter((l) => l.image)
      .map((l) => ({ image: l.image, alt: l.alt, categories: c.id }));
  });

  return <OurClients content={{ ...meta, logos }} />;
}
