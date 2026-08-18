import IndustryPageView from "@/components/industries/IndustryPageView";

// SEO alias URL that renders the Healthcare industry page content.
export const revalidate = 300;

export default function HealthcareWebDesignPage() {
  return <IndustryPageView slug="healthcare" />;
}
