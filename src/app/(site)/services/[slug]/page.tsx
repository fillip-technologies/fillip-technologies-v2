import { notFound } from "next/navigation";
import ServicePage from "@/components/services/ServicePage";
import { getServiceBySlug, services } from "@/data/website-development";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePage data={service} />;
}
