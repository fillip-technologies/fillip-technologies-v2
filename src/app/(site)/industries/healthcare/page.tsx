import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import IndustryHero from "@/components/industries/medical/IndustryHero";
import IndustryChallengesSection from "@/components/industries/medical/IndustryChallengesSection";
import IndustryGrowthEngine from "@/components/industries/medical/IndustryGrowthEngine";
import IndustryProcessTimeline from "@/components/industries/medical/IndustryProcessTimeline";
import IndustryWhyChooseUs from "@/components/industries/medical/IndustryWhyChooseUs";
import IndustryTestimonials from "@/components/industries/medical/IndustryTestimonials";
import IndustryFAQ from "@/components/industries/medical/IndustryFAQ";
import { industriesData } from "@/data/industries";

export default function HealthcarePage() {
    const industry = industriesData.healthcare;

    return (
        <main>
            <IndustryHero data={industry.hero} />
            <TrustedBrandsSection />
            <IndustryChallengesSection data={industry.challenges} />
         <IndustryGrowthEngine data={industry.growthEngine} />
         <IndustryProcessTimeline data={industry.timeline} />
         <IndustryWhyChooseUs data={industry.whyChooseUs}/>
         <IndustryTestimonials data={industry.testimonials} />
         <IndustryFAQ data={industry.faqs} />
        </main>
    );
}
