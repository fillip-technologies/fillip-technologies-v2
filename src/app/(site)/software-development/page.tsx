import ServicePage from "@/components/services/ServicePage";
import { softwareDevelopmentContent } from "@/data/website-development";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";


export const generateMetadata = () => pageMetadata("/software-development");

export default async function SoftwareDevelopmentPage() {
  const jsonLd = await pageJsonLd("/software-development");
  return (
    <>
      {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
      <ServicePage data={softwareDevelopmentContent} />
    </>
  );
}
