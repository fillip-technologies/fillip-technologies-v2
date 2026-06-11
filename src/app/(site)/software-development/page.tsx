import ServicePage from "@/components/services/ServicePage";

export default function SoftwareDevelopmentPage() {
  return (
    <ServicePage
      eyebrow="Software Development"
      title="Custom Software For Modern Business Operations"
      description="We design and develop practical software systems that automate workflows, connect teams, and support scalable business processes."
      highlights={[
        "Business workflow automation",
        "Custom dashboards and portals",
        "API and system integrations",
        "Scalable application architecture",
      ]}
    />
  );
}
