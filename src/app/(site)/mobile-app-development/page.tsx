import MobileAppDevelopmentPage from "@/components/mobile-app-development/MobileAppDevelopmentPage";
import { enterpriseMobileAppContent } from "@/data/mobile-app-development";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";

export const generateMetadata = () => pageMetadata("/mobile-app-development");

export default async function MobileAppDevelopmentRootPage() {
  const jsonLd = await pageJsonLd("/mobile-app-development");
  return (
    <>
      {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
      <MobileAppDevelopmentPage data={enterpriseMobileAppContent} />
    </>
  );
}
