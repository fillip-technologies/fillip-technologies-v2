"use client";

import SecurityHero from "./SecurityHero";
import SecurityBenefits from "./SecurityBenefits";
import SecurityPriority from "./SecurityPriority";
import SecurityServices from "./SecurityServices";
import SecuritySupport from "./SecuritySupport";
import FAQSection from "@/components/shared/FAQSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import type { SecuritySurveillanceContent } from "./content";

export default function SecuritySurveillance({
  content,
}: {
  content: SecuritySurveillanceContent;
}) {
  return (
    <div className="relative w-full bg-slate-50/50">
      {/* 1. Hero Section (Light Background) */}
      <SecurityHero content={content.hero} />

      {/* 2. Priority & Dome camera details */}
      <SecurityPriority content={content.priority} />

      {/* 3. High-Quality Services Grid */}
      <SecurityServices content={content.services} />

      {/* 4. Support and Technician details */}
      <SecuritySupport content={content.support} />

      {/* 5. Benefits and why choose us */}
      <SecurityBenefits content={content.benefits} />

      {/* 6. Customer testimonials */}
      <TestimonialsSection
        badge={content.testimonials.badge}
        title={content.testimonials.title}
        description={content.testimonials.description}
        testimonials={content.testimonials.testimonials}
      />

      {/* 7. Frequently asked questions */}
      <FAQSection
        badge={content.faqs.badge}
        title={content.faqs.title}
        description={content.faqs.description}
        faqs={content.faqs.faqs}
      />
    </div>
  );
}
