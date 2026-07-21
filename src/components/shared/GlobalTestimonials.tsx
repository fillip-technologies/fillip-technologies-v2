import TestimonialsSection from "./TestimonialsSection";
import { getGlobalTestimonials } from "@/server/content/global-testimonials";

/**
 * Server drop-in for the shared 3-card testimonials section. Reads the one
 * site-wide testimonials list and renders it, while each page keeps its own
 * badge/title/description. Use this instead of passing a local testimonials
 * array so every page shows the same, CMS-editable list.
 */
export default async function GlobalTestimonials({
  badge,
  title,
  description,
}: {
  badge?: string;
  title: string;
  description: string;
}) {
  const testimonials = await getGlobalTestimonials();
  if (!testimonials.length) return null;

  return (
    <TestimonialsSection
      badge={badge}
      title={title}
      description={description}
      testimonials={testimonials}
    />
  );
}
