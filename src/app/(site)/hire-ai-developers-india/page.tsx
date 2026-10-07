import { permanentRedirect } from "next/navigation";

// This page moved to /hire-ai-developers when the Hire Developers pages became
// one JSON-driven master template. Keep the old URL working.
export default function HireAiDevelopersIndiaRedirect() {
  permanentRedirect("/hire-ai-developers");
}
