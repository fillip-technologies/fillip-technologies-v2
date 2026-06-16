import HealthcareHero from "@/components/industries/medical/healthcareHero"
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import HealthcareChallengesSection from "@/components/industries/medical/HealthcareChallengesSection";
import HealthcareGrowthEngine from "@/components/industries/medical/HealthcareGrowthEngine";
import GrowthProcessTimeline from "@/components/industries/medical/GrowthProcessTimeline";
import WhyChooseUs from "@/components/industries/medical/WhyChooseUs";
import TestimonialsSectionMedical from "@/components/industries/medical/TestimonialsSectionMedical";
import HealthcareFAQ from "@/components/industries/medical/HealthcareFAQ";


export default function HealthcarePage() {
    return (
        <main>
            <HealthcareHero />
            <TrustedBrandsSection />
            <HealthcareChallengesSection />
         <HealthcareGrowthEngine />
         <GrowthProcessTimeline />
         <WhyChooseUs/>
         <TestimonialsSectionMedical />
         <HealthcareFAQ />


        </main>
    );
}
