import CapabilitiesSection from "@/components/aichatbots/CapabilitiesSection";
import CTASection from "@/components/aichatbots/CTASection";
import HeroSection from "@/components/aichatbots/HeroSection";
import IndustriesSection from "@/components/aichatbots/IndustriesSection";
import ResponseGapSection from "@/components/aichatbots/ResponseGapSection";
import ResultsSection from "@/components/aichatbots/ResultsSection";
import ShowcaseSection from "@/components/aichatbots/ShowcaseSection";
import WhyFillipSection from "@/components/aichatbots/WhyFillipSection";
import WorkflowSection from "@/components/aichatbots/WorkflowSection";
import type { AIAutomationLandingPage } from "@/lib/service-content/types";

export default function AIAutomationLandingTemplate({page}:{page:AIAutomationLandingPage}){const{content}=page;return <main className="ticket-page min-h-screen overflow-hidden bg-background text-ink"><HeroSection data={content.hero}/><ResponseGapSection data={content.problem}/><WorkflowSection data={content.workflow}/><CapabilitiesSection data={content.capabilities}/><ShowcaseSection data={content.showcase}/><IndustriesSection data={content.industries}/><WhyFillipSection data={content.why}/><ResultsSection data={content.results}/><CTASection data={content.cta}/></main>}
