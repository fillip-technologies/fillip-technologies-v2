import ServicePage from "@/components/services/ServicePage";
import { ecommerceDevelopmentContent } from "@/data/website-development";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";


export const generateMetadata = () => pageMetadata("/ecommerce-development");

export default async function EcommerceDevelopmentPage() {
  const jsonLd = await pageJsonLd("/ecommerce-development");
  return (
    <>
      {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
      <ServicePage data={ecommerceDevelopmentContent} />
    </>
  );
}
