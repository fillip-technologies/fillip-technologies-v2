import PortfolioHero from "@/components/portfolio/hero";
import PortfolioShowcase from "@/components/portfolio/showcase";
import { getContentData } from "@/server/content/queries";
import { getPageSection, pageSectionDefaults } from "@/server/content/page-sections";

export const dynamic = "force-dynamic";

function sec(id: string) {
  return getContentData(`page.portfolio.${id}`, pageSectionDefaults(getPageSection("portfolio", id)!));
}

export default async function PortfolioPage() {
  const [hero, showcase] = await Promise.all([sec("hero"), sec("showcase")]);

  return (
    <main className="bg-[#f8fafc]">
      <PortfolioHero content={hero} />
      <PortfolioShowcase content={showcase} />
    </main>
  );
}
