import { getContentData } from "./queries";
import { GLOBAL_TESTIMONIALS, type GlobalTestimonial } from "@/data/testimonials";

/**
 * Read the single site-wide testimonials list (content key `global.testimonials`),
 * falling back to the seeded defaults. Safe to call from any Server Component;
 * this is the one place render sites should get testimonials from.
 */
export async function getGlobalTestimonials(): Promise<GlobalTestimonial[]> {
  const data = await getContentData("global.testimonials", { items: GLOBAL_TESTIMONIALS });
  const items = (data.items as GlobalTestimonial[] | undefined) ?? [];
  return items.length ? items : GLOBAL_TESTIMONIALS;
}
