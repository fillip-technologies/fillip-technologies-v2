import PortfolioHero from "@/components/portfolio/hero";
import PortfolioShowcase from "@/components/portfolio/showcase";
import { getContentData } from "@/server/content/queries";
import { getPageSection, pageSectionDefaults } from "@/server/content/page-sections";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";

export const revalidate = 300;

export const generateMetadata = () => pageMetadata("/portfolio");

function sec(id: string) {
  return getContentData(`page.portfolio.${id}`, pageSectionDefaults(getPageSection("portfolio", id)!));
}

export default async function PortfolioPage() {
  const [hero, showcase, jsonLd] = await Promise.all([
    sec("hero"),
    sec("showcase"),
    pageJsonLd("/portfolio"),
  ]);

  return (
    <>
      {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
      <main className="bg-[#f8fafc]">
        <PortfolioHero content={hero} />
        <PortfolioShowcase content={showcase} />
      </main>
    </>
  );
}
