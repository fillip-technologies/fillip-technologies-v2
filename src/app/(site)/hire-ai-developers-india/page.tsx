import type { Metadata } from "next";
import HireDevelopersPage from "@/components/hire-developers/HireDevelopersPage";

export const metadata: Metadata = {
  title: "Hire AI Developers in India | Fillip Technologies",
  description:
    "Hire experienced AI developers from Fillip Technologies to build AI agents, generative AI applications, RAG systems, AI automation, chatbots and AI-powered business applications.",
  alternates: { canonical: "/hire-ai-developers-india" },
};

export default function HireAiDevelopersIndiaPage() {
  return <HireDevelopersPage />;
}
