
import FAQSection from "@/components/shared/FAQSection";

const enterpriseMobileFaqs = [
  {
    question: "How long does it take to develop an enterprise mobile application?",
    answer:
      "The timeline depends on complexity, integrations, security requirements, and feature scope. Most enterprise mobile applications take between 12–24 weeks from planning to deployment.",
  },
  {
    question: "Do you build apps for both Android and iOS?",
    answer:
      "Yes. We develop native Android and iOS applications as well as cross-platform solutions using modern frameworks to maximize efficiency and reach.",
  },
  {
    question: "Can you integrate the app with our existing business systems?",
    answer:
      "Absolutely. We regularly integrate enterprise applications with CRMs, ERPs, HRMS platforms, payment gateways, inventory systems, and custom business software.",
  },
  {
    question: "How do you ensure enterprise-grade security?",
    answer:
      "We implement secure authentication, role-based access controls, encrypted data transmission, secure APIs, compliance best practices, and ongoing security reviews throughout development.",
  },
  {
    question: "Will the application scale as our organization grows?",
    answer:
      "Yes. Our applications are built with scalable architectures that support increasing users, transactions, locations, and future feature expansions without compromising performance.",
  },
  {
    question: "Do you provide support after the application is launched?",
    answer:
      "Yes. We offer ongoing maintenance, performance monitoring, feature enhancements, security updates, and technical support to ensure long-term success.",
  },
];

export default function EnterpriseMobileFAQ() {
  return (
    <FAQSection
      title="Frequently Asked Questions About Enterprise Mobile Apps"
      description="Common questions organizations ask before investing in enterprise mobile application development."
      faqs={enterpriseMobileFaqs}
      ctaTitle="Ready To Build Your Enterprise Mobile App?"
      ctaDescription="Let's discuss your business goals, operational challenges, and how a custom mobile solution can accelerate growth and efficiency."
      ctaButtonText="Book Free Consultation"
    />
  );
}

