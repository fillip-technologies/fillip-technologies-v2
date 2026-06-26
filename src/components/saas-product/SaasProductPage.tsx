"use client";

import SaaSProductHero from "./SaaSProductHero";
import SaaSBrands from "./SaaSBrands";
import SaaSBentoFeatures from "./SaaSBentoFeatures";
import SaaSScaleTiers from "./SaaSScaleTiers";
import SaaSFaq from "./SaaSFaq";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";

export default function SaasProductPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 font-sans">
      <SaaSProductHero />
      <SaaSBrands />
      <SaaSBentoFeatures />
      <SaaSScaleTiers />
      <SaaSFaq />
      <ConsultationFormSection />
    </div>
  );
}
