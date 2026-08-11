"use client";

import { usePathname } from "next/navigation";
import HomeTestimonialsSection from "@/components/Home/TestimonialsSection";
import type { GlobalTestimonial } from "@/data/testimonials";
import ConsultationFormSection from "./ConsultationFormSection";

const excludedPaths = new Set([
  "/our-story",
  "/our-culture",
  "/portfolio",
  "/carrer",
  "/others/carrer",
]);

const pageTestimonialsPaths = new Set([
  "/",
  "/digital-marketing-company-in-patna",
  "/graphic-designing",
  "/performance-marketing",
  "/security-surveillance",
]);

const pageTestimonialsPrefixes = [
  "/design/",
  "/hardware-solutions/",
  "/industries/",
  "/marketing/",
  "/mobile-app-development",
  "/software-development",
  "/solutions/",
  "/what-we-do/",
];

function hasPageTestimonials(pathname: string) {
  return (
    pageTestimonialsPaths.has(pathname) ||
    pageTestimonialsPrefixes.some((prefix) => pathname.startsWith(prefix))
  );
}

export default function SiteConsultationForm({
  testimonials,
}: {
  testimonials: GlobalTestimonial[];
}) {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  if (excludedPaths.has(normalizedPath)) {
    return null;
  }

  return (
    <>
      {!hasPageTestimonials(normalizedPath) && testimonials.length > 0 ? (
        <HomeTestimonialsSection items={testimonials} />
      ) : null}
      <ConsultationFormSection />
    </>
  );
}
