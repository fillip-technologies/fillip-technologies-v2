
import FAQSection from "@/components/shared/FAQSection";

const healthcareFaqs = [
  {
    question: "How long does it take to see results from healthcare SEO?",
    answer:
      "Most healthcare organizations begin seeing improvements in visibility and organic traffic within 3–6 months. The timeline depends on competition, website quality, and current search presence.",
  },
  {
    question: "Do you only work with hospitals and clinics?",
    answer:
      "No. We work with hospitals, multi-specialty clinics, diagnostic centers, healthcare startups, wellness brands, and independent healthcare providers.",
  },
  {
    question: "Why is a healthcare website important for patient acquisition?",
    answer:
      "Your website is often the first interaction patients have with your organization. A professional website builds trust, improves patient experience, and increases appointment conversions.",
  },
  {
    question: "Can social media really help generate patient appointments?",
    answer:
      "Yes. Consistent healthcare content improves brand awareness, patient trust, engagement, and keeps your organization top-of-mind when healthcare needs arise.",
  },
  {
    question: "Do paid ads work alongside SEO and social media?",
    answer:
      "Absolutely. Paid advertising creates immediate visibility while SEO and social media build long-term growth, making all channels work together as one patient acquisition system.",
  },
  {
    question: "What makes your healthcare growth approach different?",
    answer:
      "Instead of treating website development, SEO, and social media as separate services, we connect them into one complete growth system designed to increase patient enquiries and appointments.",
  },
];

export default function HealthcareFAQ() {
  return (
    <FAQSection
      title="Everything You Need To Know"
      description="Common questions healthcare providers ask before building a digital growth system."
      faqs={healthcareFaqs}
      ctaTitle="Still Have Questions?"
      ctaDescription="Let's discuss your healthcare organization, growth goals, and how we can help generate more patient appointments."
      ctaButtonText="Book Free Strategy Call"
    />
  );
}
