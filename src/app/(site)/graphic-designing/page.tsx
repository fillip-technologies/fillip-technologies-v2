import type { Metadata } from "next";
import GraphicHero from "@/components/graphic-desigining/hero";
import GraphicCapabilities from "@/components/graphic-desigining/capabilities";
import GraphicPortfolio from "@/components/graphic-desigining/portfolio";
import WhyChooseGraphics from "@/components/graphic-desigining/why-choose";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import { getGraphicDesigningContent } from "@/server/content/solution-page-content";
import { getGlobalTestimonials } from "@/server/content/global-testimonials";

// Content is CMS-managed (page.graphic-designing.*), so render fresh.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premium Graphic Designing Services | Fillip Technologies",
  description:
    "Bespoke graphic design solutions for modern brands. We design custom brand identities, conversion-focused marketing creatives, high-res vectors, and premium print assets.",
  alternates: {
    canonical: "/graphic-designing",
  },
};

export default async function GraphicDesigningPage() {
  const [content, testimonialItems] = await Promise.all([
    getGraphicDesigningContent(),
    getGlobalTestimonials(),
  ]);

  return (
    <main className="bg-[#f8fafc]">
      {/* Hero Section */}
      <GraphicHero content={content.hero} />

      {/* Capabilities / Services Section */}
      <GraphicCapabilities services={content.capabilities} process={content.process} />

      {/* Portfolio/Gallery Section */}
      <GraphicPortfolio content={content.portfolio} />

      {/* Why Choose Us */}
      <WhyChooseGraphics content={content.whychoose} deliverables={content.deliverables} />

      {/* Testimonials */}
      <TestimonialsSection items={testimonialItems} />

      {/* Consultation Request Form */}
      <div id="estimate">
        <ConsultationFormSection />
      </div>
    </main>
  );
}
