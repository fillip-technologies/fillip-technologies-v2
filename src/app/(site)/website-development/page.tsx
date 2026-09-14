import ServicePage from "@/components/services/ServicePage";
import { websiteDevelopmentContent } from "@/data/website-development";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";


export const generateMetadata = () => pageMetadata("/website-development");

export default async function WebsiteDevelopmentPage() {
  const jsonLd = await pageJsonLd("/website-development");
  return (
    <>
      {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
      <ServicePage data={websiteDevelopmentContent} />
    </>
  );
}
