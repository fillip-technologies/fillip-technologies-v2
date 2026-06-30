import HeroSection from "@/components/performance-marketing/HeroSection";
import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import MarketingPhilosophySection from "@/components/performance-marketing/MarketingPhilosophySection";
import HowItWorksSection from "@/components/performance-marketing/HowItWorksSection";
import ResultsSection from "@/components/performance-marketing/ResultsSection";
import GrowthStoriesSection from "@/components/performance-marketing/GrowthStoriesSection";

export default function PerformanceMarketingPage() {
  return (
    <main className="ticket-page relative overflow-hidden bg-background text-heading">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="relative">
        <HeroSection />
        <TrustedBrandsSection />
        <MarketingPhilosophySection />
        <HowItWorksSection />
        <ResultsSection />
        <GrowthStoriesSection />
      </div>
    </main>
  );
}
