"use client";

import SecurityHero from "./SecurityHero";
import SecurityBenefits from "./SecurityBenefits";
import SecurityPriority from "./SecurityPriority";
import SecurityServices from "./SecurityServices";
import SecuritySupport from "./SecuritySupport";
import FAQSection from "@/components/shared/FAQSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";

const hardwareFaqs = [
  {
    question: "Do you provide CCTV installation for both homes and businesses?",
    answer:
      "Yes. Fillip Technologies provides CCTV installation for homes, offices, apartments, schools, warehouses, hospitals, retail stores, and industrial sites with solutions sized to each location.",
  },
  {
    question: "Can I view CCTV footage remotely on my phone?",
    answer:
      "Yes. We configure mobile and remote access so you can monitor live camera feeds, check recordings, and receive important alerts from anywhere with a secure internet connection.",
  },
  {
    question: "Do your CCTV cameras support night vision and motion detection?",
    answer:
      "Yes. We offer HD and 4K camera options with infrared night vision, motion detection, real-time alerts, and weatherproof outdoor coverage depending on your requirements.",
  },
  {
    question: "Can you integrate CCTV with access control or video door phones?",
    answer:
      "Yes. We can combine CCTV surveillance with video door phones, biometric access control, RFID systems, and attendance solutions for a complete security setup.",
  },
  {
    question: "Do you provide maintenance and support after installation?",
    answer:
      "Yes. Our team supports camera health checks, troubleshooting, recording setup, remote viewing configuration, and ongoing maintenance for reliable security performance.",
  },
];

const hardwareTestimonials = [
  {
    name: "Amit Kumar",
    role: "Office Owner",
    image: "",
    review:
      "Fillip Technologies installed CCTV and access control for our office. The setup is clean, remote viewing works smoothly, and their team explained everything clearly.",
  },
  {
    name: "Priya Sharma",
    role: "Apartment Manager",
    image: "",
    review:
      "We needed better security for entry gates and common areas. The camera coverage, night vision, and mobile monitoring have made day-to-day management much easier.",
  },
  {
    name: "Rahul Verma",
    role: "Warehouse Operator",
    image: "",
    review:
      "Their team planned the right camera points for our warehouse and loading area. The system is stable, clear, and useful for both security and operations.",
  },
  {
    name: "Neha Singh",
    role: "Homeowner",
    image: "",
    review:
      "The CCTV installation was quick and professional. I can now check my home from my phone anytime, and the alerts are very helpful.",
  },
];

export default function SecuritySurveillance() {
  return (
    <div className="relative w-full bg-slate-50/50">
      {/* 1. Hero Section (Light Background) */}
      <SecurityHero />

      {/* 2. Priority & Dome camera details */}
      <SecurityPriority />

      {/* 3. High-Quality Services Grid */}
      <SecurityServices />

      {/* 4. Support and Technician details */}
      <SecuritySupport />

      {/* 5. Benefits and why choose us */}
      <SecurityBenefits />

      {/* 6. Customer testimonials */}
      <TestimonialsSection
        badge="Customer Stories"
        title="Trusted Security Installations"
        description="Homeowners, businesses, and institutions rely on Fillip Technologies for dependable CCTV surveillance, remote monitoring, and professional security support."
        testimonials={hardwareTestimonials}
      />

      {/* 7. Frequently asked questions */}
      <FAQSection
        badge="Security FAQs"
        title="CCTV Questions, Answered"
        description="Everything you need to know about CCTV installation, remote access, night vision, access control integration, and support."
        faqs={hardwareFaqs}
      />
    </div>
  );
}
