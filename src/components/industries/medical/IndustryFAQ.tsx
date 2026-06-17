import FAQSection from "@/components/shared/FAQSection";

type IndustryFAQProps = {
  data: {
    title: string;
    description: string;
    items: {
      question: string;
      answer: string;
    }[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
  };
};

export default function IndustryFAQ({ data }: IndustryFAQProps) {
  return (
    <FAQSection
      title={data.title}
      description={data.description}
      faqs={data.items}
      ctaTitle={data.ctaTitle}
      ctaDescription={data.ctaDescription}
      ctaButtonText={data.ctaButtonText}
    />
  );
}
