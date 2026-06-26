import type { Metadata } from "next";
import SaasProductPage from "@/components/saas-product/SaasProductPage";

export const metadata: Metadata = {
  title: "SaaS Product Development Services | Fillip Technologies",
  description:
    "End-to-end SaaS product engineering services. We build scalable multi-tenant architectures, operations dashboards, workflow automation tools, and API integrations.",
  alternates: {
    canonical: "/services/saas-product-development",
  },
};

export default function SaasProductRoute() {
  return <SaasProductPage />;
}
