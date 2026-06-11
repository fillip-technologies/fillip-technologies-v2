import ServicePage from "@/components/services/ServicePage";
import { getServiceBySlug } from "@/data/services";

export default function WordpressDevelopmentPage() {
  const service = getServiceBySlug("wordpress-development");

  return service ? <ServicePage service={service} /> : null;
}
