/**
 * CMS field registry for site-wide ("global") content that is shared across many
 * pages rather than living on a single page. Currently: the one testimonials list
 * rendered everywhere. Mirrors the `Section` shape from home-sections so the same
 * generic `SectionEditor` and `sectionDefaults` helper can drive it.
 */

import type { Section } from "./home-sections";
import { GLOBAL_TESTIMONIALS } from "@/data/testimonials";

/** The single, site-wide testimonials list (content key `global.testimonials`). */
export const GLOBAL_TESTIMONIALS_SECTION: Section = {
  id: "testimonials",
  label: "Testimonials (global)",
  description:
    "The one testimonials list used across the whole site — the home carousel and every service/industry page. Edit here once and it updates everywhere.",
  ready: true,
  fields: [],
  list: {
    name: "items",
    label: "Testimonials",
    itemNoun: "testimonial",
    itemFields: [
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "image", label: "Photo", type: "image" },
      { name: "review", label: "Review", type: "textarea" },
    ],
    default: GLOBAL_TESTIMONIALS as unknown as Record<string, string>[],
  },
};
