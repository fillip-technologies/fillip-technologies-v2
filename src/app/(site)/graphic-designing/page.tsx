import type { Metadata } from "next";
import GraphicHero from "@/components/graphic-desigining/hero";
import GraphicCapabilities from "@/components/graphic-desigining/capabilities";
import GraphicPortfolio from "@/components/graphic-desigining/portfolio";
import WhyChooseGraphics from "@/components/graphic-desigining/why-choose";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";

export const metadata: Metadata = {
  title: "Premium Graphic Designing Services | Fillip Technologies",
  description:
    "Bespoke graphic design solutions for modern brands. We design custom brand identities, conversion-focused marketing creatives, high-res vectors, and premium print assets.",
  alternates: {
    canonical: "/graphic-designing",
  },
};

export default function GraphicDesigningPage() {
  return (
    <main className="bg-[#f8fafc]">
      {/* Hero Section */}
      <GraphicHero />

      {/* Capabilities / Services Section */}
      <GraphicCapabilities />

      {/* Portfolio/Gallery Section */}
      <GraphicPortfolio />

      {/* Why Choose Us */}
      <WhyChooseGraphics />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Consultation Request Form */}
      <div id="estimate">
        <ConsultationFormSection />
      </div>
    </main>
  );
}
