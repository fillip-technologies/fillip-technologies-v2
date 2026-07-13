"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What solutions does Fillip Technologies offer?",
    answer: "Fillip Technologies delivers a wide array of digital services such as Website Designing services, Web Development, Custom Software Development, SEO, Digital Marketing, Social Media Marketing, Branding, UI/UX Design, and Performance Marketing. We ensure that our digital services will assist your business in building its online presence through continuous growth."
  },
  {
    question: "How can a professional website help my business grow?",
    answer: "An effective website will serve as the virtual shop front of your business and will assist you in increasing your level of credibility and attracting prospects that could become business opportunities."
  },
  {
    question: "Do you develop custom websites or use ready-made templates?",
    answer: "We believe in the fact that every organization has different needs. Therefore, we ensure to provide customized web development services based on our clients' business goals, brand image, and their target audience."
  },
  {
    question: "How does SEO benefit modern companies?",
    answer: "Through SEO, you can make your company visible to potential customers when they search for goods or services on the internet. This is beneficial since it raises visibility and enhances performance, which ultimately boosts traffic and creates room for growth."
  },
  {
    question: "Can Fillip Technologies be able to get us leads and sales through the internet?",
    answer: "Yes. Being the best lead generation agency, our marketing techniques ensure that our clients are well placed in such a way that they are capable of generating leads and sales from their prospective clients. This is done through various marketing methods, including SEO and PPC marketing."
  },
  {
    question: "Do you offer services to startups, small firms, and large corporations?",
    answer: "Yes, we have services that cater to organizations regardless of their size or stage of development, whether a startup wanting a digital footprint or an existing organization in need of advanced digital solutions."
  },
  {
    question: "What distinguishes Fillip Technologies from other digital marketing firms?",
    answer: "We blend the elements of creativity, technology, AI innovation and strategy. Instead of presenting off-the-shelf solutions, we concentrate on knowing your business, your audience, and what you hope to achieve through digital marketing."
  },
  {
    question: "Could you assist in enhancing my current website and digital presence?",
    answer: "Absolutely. If you require assistance in updating your website, enhancing your search engine optimization, optimizing the performance of your site, improving branding, or anything else relating to your digital presence, we will be happy to do so."
  },
  {
    question: "Does Fillip Technologies offer Local SEO Services?",
    answer: "Yes, our local SEO services are designed to help businesses rank higher in local searches, enhancing visibility and bolstering targeted traffic."
  },
  {
    question: "How can I start working with Fillip Technologies?",
    answer: "All you have to do to start is tell us about your business goals or the problems you are facing, or your project requirements. We will analyze your needs and come up with a solution that suits your business."
  }
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden pt-24 pb-8 lg:pt-28 lg:pb-8">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow Effects */}
      <div
        className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-primary)" }}
      />
      <div
        className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="relative z-10 container mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl uppercase">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--body)]">
            Have questions about our digital services? We've got answers. Explore our FAQs or get in touch for custom requirements.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-white/70 backdrop-blur-md transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between px-8 py-6 text-left focus:outline-none"
              >
                <h3 className="text-base sm:text-lg font-bold text-[var(--heading)] pr-4">
                  {faq.question}
                </h3>

                <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[var(--border)] text-[var(--primary)] transition-transform duration-300">
                  {open === index ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${open === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <p className="px-8 pb-6 text-sm sm:text-base leading-relaxed text-[var(--body)] border-t border-slate-50 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
