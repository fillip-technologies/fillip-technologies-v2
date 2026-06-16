import HeroSection from "@/components/mobile-app-development/HeroSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import MobileAppServices from "@/components/mobile-app-development/EnterpriseChallengesSection";
import EnterpriseChallengesSection from "@/components/mobile-app-development/EnterpriseChallengesSection";
import EnterpriseApplicationsSection from "@/components/mobile-app-development/EnterpriseApplicationsSection";
import NeedGuidanceSection from "@/components/Cta/NeedGuidanceSection";
import EnterpriseFeaturesSection from "@/components/mobile-app-development/EnterpriseFeaturesSection";
import WhyChooseUs from "@/components/mobile-app-development/WhyChooseUs";
import EnterpriseMobileTestimonials from "@/components/mobile-app-development/EnterpriseMobileTestimonials";
import EnterpriseMobileFAQ from "@/components/mobile-app-development/EnterpriseMobileFAQ";

export default function MobileAppDevelopmentPage() {
  return (
    <main>
      <HeroSection />
      <TrustedBrandsSection />
      <EnterpriseChallengesSection />
      <EnterpriseApplicationsSection />
      <NeedGuidanceSection
        title="Planning a Mobile App?"
        buttonText="Discuss Your App Idea →"
      />

      <EnterpriseFeaturesSection />

      <EnterpriseMobileTestimonials />
      <EnterpriseMobileFAQ />


    </main>
  );
}