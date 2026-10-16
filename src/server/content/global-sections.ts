/**
 * CMS field registry for site-wide ("global") content that is shared across many
 * pages rather than living on a single page. Currently: the one testimonials list
 * rendered everywhere. Mirrors the `Section` shape from home-sections so the same
 * generic `SectionEditor` and `sectionDefaults` helper can drive it.
 */

import type { Section } from "./home-sections";
import { GLOBAL_TESTIMONIALS } from "@/data/testimonials";

/** "How often" choices for the popup ad (stored value → admin label). */
export const POPUP_FREQUENCIES = [
  { value: "every", label: "Every page load (each reload / page visit)" },
  { value: "session", label: "Once per visit (until the browser is closed)" },
  { value: "day", label: "Once a day" },
  { value: "once", label: "Only once (never again on that device)" },
];

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

/**
 * The site-wide popup ad (content key `global.popup`): just an image and the link
 * it opens. Leave the image empty to switch the popup off.
 */
export const GLOBAL_POPUP_SECTION: Section = {
  id: "popup",
  label: "Popup Ad",
  description:
    "The popup shown to visitors on every page. Upload an image and set the link it opens. Remove the image to turn the popup off.",
  ready: true,
  fields: [
    {
      name: "image",
      label: "Popup image",
      type: "image",
      default: "",
      help: "Shown in a fixed square frame and cropped to fill it. Best size: 1080 × 1080 px, with key text away from the edges.",
    },
    {
      name: "link",
      label: "Link",
      type: "text",
      default: "",
      help: "Where clicking the image goes, e.g. /contact or https://… Leave empty for an image-only popup.",
    },
    {
      name: "frequency",
      label: "How often to show it",
      type: "select",
      default: "every",
      options: POPUP_FREQUENCIES,
    },
    {
      name: "delay",
      label: "Delay before it opens (seconds)",
      type: "text",
      default: "1.5",
      help: "How long after the page loads the popup appears. 0 = immediately (max 60).",
    },
  ],
};
