import ServicePage from "@/components/services/ServicePage";
import { getServiceBySlug } from "@/data/services";

export default function WebsiteDevelopmentPage() {
  const service = getServiceBySlug("website-development");

  return service ? <ServicePage service={service} /> : null;
}
