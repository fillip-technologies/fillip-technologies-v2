import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import SaasHero from "./saas/SaasHero";
import SaasCapabilities from "./saas/SaasCapabilities";
import SaasScaleTiers from "./saas/SaasScaleTiers";
import SaasFaq from "./saas/SaasFaq";

import type { SoftwareEnterpriseContent } from "@/data/software-enterprise";

type SoftwareEnterprisePageProps = {
  data: SoftwareEnterpriseContent;
};

/**
 * Renderer for the "software-enterprise" Service Pages template — a SaaS-style
 * layout shared by every Software & Enterprise page (SaaS Product Development,
 * Custom Software, CRM, ERP, API Integration, Software Development overview).
 * All copy is per-page and CMS-editable; the interactive demo widgets keep
 * fixed mechanics.
 */
export default function SoftwareEnterprisePage({ data }: SoftwareEnterprisePageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 font-sans">
      <SaasHero key={`${data.slug}-hero`} data={data.hero} />
      <TrustedBrandsSection />
      <SaasCapabilities key={`${data.slug}-capabilities`} data={data.capabilities} />
      <SaasScaleTiers key={`${data.slug}-tiers`} data={data.scaleTiers} />
      <SaasFaq key={`${data.slug}-faq`} data={data.faq} />
      <ConsultationFormSection />
    </div>
  );
}
