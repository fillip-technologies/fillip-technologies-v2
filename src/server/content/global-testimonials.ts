import { cache } from "react";
import { getContentData } from "./queries";
import { GLOBAL_TESTIMONIALS, type GlobalTestimonial } from "@/data/testimonials";

/**
 * Read the single site-wide testimonials list (content key `global.testimonials`),
 * falling back to the seeded defaults. Safe to call from any Server Component;
 * this is the one place render sites should get testimonials from.
 *
 * Wrapped in React's `cache()`: the shared site layout and several individual
 * pages/components all call this per request, so this collapses those into a
 * single DB read instead of firing the same query 2-3x per page render.
 */
export const getGlobalTestimonials = cache(async (): Promise<GlobalTestimonial[]> => {
  const data = await getContentData("global.testimonials", { items: GLOBAL_TESTIMONIALS });
  const items = (data.items as GlobalTestimonial[] | undefined) ?? [];
  return items.length ? items : GLOBAL_TESTIMONIALS;
});
