import PortfolioHero from "@/components/portfolio/hero";
import PortfolioShowcase from "@/components/portfolio/showcase";
import PortfolioIndustries from "@/components/portfolio/framework";
import PortfolioImpact from "@/components/portfolio/impact";

export default function PortfolioPage() {
  return (
    <main className="bg-[#f8fafc]">
      <PortfolioHero />
      <PortfolioShowcase />
      <PortfolioIndustries />
      <PortfolioImpact />
    </main>
  );
}
