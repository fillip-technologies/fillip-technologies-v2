import PortfolioHero from "@/components/portfolio/hero";
import PortfolioShowcase from "@/components/portfolio/showcase";
import PortfolioIndustries from "@/components/portfolio/framework";
import PortfolioImpact from "@/components/portfolio/impact";
import { getContentData } from "@/server/content/queries";
import { getPageSection, pageSectionDefaults } from "@/server/content/page-sections";

export const dynamic = "force-dynamic";

function sec(id: string) {
  return getContentData(`page.portfolio.${id}`, pageSectionDefaults(getPageSection("portfolio", id)!));
}

export default async function PortfolioPage() {
  const [hero, showcase, industries, impact, impactstories] = await Promise.all([
    sec("hero"),
    sec("showcase"),
    sec("industries"),
    sec("impact"),
    sec("impactstories"),
  ]);

  return (
    <main className="bg-[#f8fafc]">
      <PortfolioHero content={hero} />
      <PortfolioShowcase content={showcase} />
      {/* <PortfolioIndustries content={industries} />
      <PortfolioImpact content={impact} stories={impactstories} /> */}
    </main>
  );
}
