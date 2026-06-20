import type { ServiceLandingPage } from "@/lib/service-content/types";
import MobileAppLandingTemplate from "./templates/MobileAppLandingTemplate";
import AIAutomationLandingTemplate from "./templates/AIAutomationLandingTemplate";
import PerformanceMarketingLandingTemplate from "./templates/PerformanceMarketingLandingTemplate";
import TechnicalSeoLandingTemplate from "./templates/TechnicalSeoLandingTemplate";
import WebsiteDesignLandingTemplate from "./templates/WebsiteDesignLandingTemplate";

type ServiceTemplateResolverProps = {
  page: ServiceLandingPage;
};

export default function ServiceTemplateResolver({
  page,
}: ServiceTemplateResolverProps) {
  switch (page.templateKey) {
    case "website-design":
      return <WebsiteDesignLandingTemplate page={page} />;
    case "mobile-app-development":
      return <MobileAppLandingTemplate page={page} />;
    case "technical-seo":
      return <TechnicalSeoLandingTemplate page={page} />;
    case "performance-marketing":
      return <PerformanceMarketingLandingTemplate page={page} />;
    case "ai-automation":
      return <AIAutomationLandingTemplate page={page} />;
  }
}
