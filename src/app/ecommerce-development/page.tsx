import ServicePage from "@/components/services/ServicePage";
import { getServiceBySlug } from "@/data/services";

export default function EcommerceDevelopmentPage() {
  const service = getServiceBySlug("ecommerce-development");

  return service ? <ServicePage service={service} /> : null;
}
