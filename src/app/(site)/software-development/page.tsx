import ServicePage from "@/components/services/ServicePage";
import { getServiceBySlug } from "@/data/services";

export default function SoftwareDevelopmentPage() {
  const service = getServiceBySlug("software-development");

  return service ? <ServicePage service={service} /> : null;
}
