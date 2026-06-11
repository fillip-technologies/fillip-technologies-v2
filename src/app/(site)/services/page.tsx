import ServicePage from "@/components/services/ServicePage";

export default function ServicesPage() {
  return (
    <ServicePage
      eyebrow="Services"
      title="Digital Services For Intelligent Growth"
      description="Explore our application engineering, marketing technology, automation, and digital growth capabilities for modern businesses."
      highlights={[
        "Website and web app development",
        "E-commerce and CMS platforms",
        "Digital marketing systems",
        "Automation and integrations",
      ]}
    />
  );
}
