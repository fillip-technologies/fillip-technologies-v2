import MobileAppDevelopmentPage from "@/components/mobile-app-development/MobileAppDevelopmentPage";
import type { MobileAppLandingPage } from "@/lib/service-content/types";

type MobileAppLandingTemplateProps = {
  page: MobileAppLandingPage;
};

export default function MobileAppLandingTemplate({
  page,
}: MobileAppLandingTemplateProps) {
  return <MobileAppDevelopmentPage data={page.content} />;
}
