import PortfolioHero from "@/components/portfolio/hero";
import PortfolioShowcase from "@/components/portfolio/showcase";
import PortfolioIndustries from "@/components/portfolio/framework";
import PortfolioImpact from "@/components/portfolio/impact";
import { getContentData } from "@/server/content/queries";
import { getPageSection, pageSectionDefaults } from "@/server/content/page-sections";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const hero = await getContentData(
    "page.portfolio.hero",
    pageSectionDefaults(getPageSection("portfolio", "hero")!)
  );

  return (
    <main className="bg-[#f8fafc]">
      <PortfolioHero content={hero} />
      <PortfolioShowcase />
      <PortfolioIndustries />
      <PortfolioImpact />
    </main>
  );
}
