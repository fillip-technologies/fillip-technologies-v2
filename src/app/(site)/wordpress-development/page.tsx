import ServicePage from "@/components/services/ServicePage";
import { wordpressDevelopmentContent } from "@/data/website-development";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";


export const generateMetadata = () => pageMetadata("/wordpress-development");

export default async function WordpressDevelopmentPage() {
  const jsonLd = await pageJsonLd("/wordpress-development");
  return (
    <>
      {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
      <ServicePage data={wordpressDevelopmentContent} />
    </>
  );
}
