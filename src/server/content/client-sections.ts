/**
 * Registry for the "Trusted By Organizations" client-logo wall, split into the
 * four filter categories shown on the public site (Govt, Healthcare, Education,
 * Corporates & Startups). Each category is edited on its own admin page and
 * stored under its own content key (`clients.<id>`), so admins can add/remove
 * logos per section — mirroring how the Home page sections work.
 *
 * The wall appears on the home page AND every service / creative-design page via
 * the shared `OurClientsSection` server component, so all instances read these
 * same rows and stay in sync.
 */
import { HOME_CLIENT_LOGOS } from "@/data/home/defaults";

export type ClientLogo = { image: string; alt: string };

export type ClientCategory = {
  id: string;
  label: string;
  description: string;
  /** Seed logos (derived from the original wall) used until an admin edits it. */
  default: ClientLogo[];
};

/** Original wall logos tagged with `cat`, reduced to the editable image + alt. */
function defaultsFor(cat: string): ClientLogo[] {
  return HOME_CLIENT_LOGOS.filter((l) =>
    l.categories
      .split(",")
      .map((s) => s.trim())
      .includes(cat)
  ).map((l) => ({ image: l.image, alt: l.alt }));
}

export const CLIENT_CATEGORIES: ClientCategory[] = [
  {
    id: "govt",
    label: "Govt. Projects",
    description: "Logos shown under the “Govt. Projects” filter tab of the client wall.",
    default: defaultsFor("govt"),
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description: "Logos shown under the “Healthcare” filter tab of the client wall.",
    default: defaultsFor("healthcare"),
  },
  {
    id: "education",
    label: "Education",
    description: "Logos shown under the “Education” filter tab of the client wall.",
    default: defaultsFor("education"),
  },
  {
    id: "corporate",
    label: "Corporates & Startups",
    description: "Logos shown under the “Corporates & Startups” filter tab of the client wall.",
    default: defaultsFor("corporate"),
  },
];

export function getClientCategory(id: string): ClientCategory | undefined {
  return CLIENT_CATEGORIES.find((c) => c.id === id);
}

/** Content key holding a category's saved `{ logos }` payload. */
export const clientCategoryKey = (id: string) => `clients.${id}`;

/** Default `{ logos }` payload for a category (used before it's ever saved). */
export function clientCategoryDefaults(cat: ClientCategory): { logos: ClientLogo[] } {
  return { logos: cat.default };
}
