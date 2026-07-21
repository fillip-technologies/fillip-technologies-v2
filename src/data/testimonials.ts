import { HOME_TESTIMONIALS } from "@/data/home/defaults";

/**
 * Canonical testimonial shape used everywhere on the site. This is the single
 * source of truth: the same list renders on the home carousel and on every
 * service/industry page's testimonial section. Admins edit it in one place at
 * `/admin/cms/testimonials` (content key `global.testimonials`).
 */
export type GlobalTestimonial = {
  name: string;
  role: string;
  image: string;
  review: string;
};

// Seeded from the original home testimonials (mapping `content` -> `review`) so
// the site looks identical out of the box before any CMS edit.
export const GLOBAL_TESTIMONIALS: GlobalTestimonial[] = HOME_TESTIMONIALS.map((t) => ({
  name: t.name,
  role: t.role,
  image: t.image,
  review: t.content,
}));
