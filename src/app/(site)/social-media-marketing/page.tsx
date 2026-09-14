import SocialMediaHero from "@/components/social-media-marketing/SocialMediaHero";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";

export const generateMetadata = () => pageMetadata("/social-media-marketing");

export default async function SocialMediaMarketingPage() {
  const jsonLd = await pageJsonLd("/social-media-marketing");
  return (
    <>
      {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
      <SocialMediaHero />
    </>
  );
}
