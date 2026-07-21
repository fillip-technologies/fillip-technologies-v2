import GraphicHero from "@/components/graphic-desigining/hero";
import GraphicCapabilities from "@/components/graphic-desigining/capabilities";
import GraphicPortfolio from "@/components/graphic-desigining/portfolio";
import WhyChooseGraphics from "@/components/graphic-desigining/why-choose";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import type { GraphicDesigningContent } from "@/components/graphic-desigining/content";
import { getGlobalTestimonials } from "@/server/content/global-testimonials";

/**
 * Renderer for the "creative-experience" Service Pages template — the same rich
 * layout as the standalone /graphic-designing page, but driven by per-page CMS
 * content (servicepage.<slug>.<id>). Reuses the graphic-designing section
 * components directly so the two stay visually identical.
 */
export default async function CreativeExperiencePage({ data }: { data: GraphicDesigningContent }) {
  const testimonialItems = await getGlobalTestimonials();
  return (
    <main className="bg-[#f8fafc]">
      <GraphicHero content={data.hero} />
      <GraphicCapabilities services={data.capabilities} process={data.process} />
      <GraphicPortfolio content={data.portfolio} />
      <WhyChooseGraphics content={data.whychoose} deliverables={data.deliverables} />
      <TestimonialsSection items={testimonialItems} />
      <div id="estimate">
        <ConsultationFormSection />
      </div>
    </main>
  );
}
