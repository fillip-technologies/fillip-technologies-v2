"use client";

import { usePathname } from "next/navigation";
import ConsultationFormSection from "./ConsultationFormSection";

const excludedPaths = new Set([
  "/our-story",
  "/our-culture",
  "/portfolio",
  "/carrer",
  "/others/carrer",
]);

export default function SiteConsultationForm() {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  if (excludedPaths.has(normalizedPath)) {
    return null;
  }

  return <ConsultationFormSection />;
}
