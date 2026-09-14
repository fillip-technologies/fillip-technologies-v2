import IndustryPageView from "@/components/industries/IndustryPageView";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";

// SEO alias URL that renders the Healthcare industry page content. Its SEO
// record canonicalises to /industries/healthcare, so this route stays reachable
// for inbound links without competing with the page it duplicates.
export const revalidate = 300;

export const generateMetadata = () => pageMetadata("/industries/healthcare-web-design");

export default async function HealthcareWebDesignPage() {
  const jsonLd = await pageJsonLd("/industries/healthcare-web-design");
  return (
    <>
      {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
      <IndustryPageView slug="healthcare" />
    </>
  );
}
