"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "What is DLT registration and is it mandatory?",
    a: "Yes, in India, Distributed Ledger Technology (DLT) registration is mandatory as per TRAI regulations to combat spam. You must register your business entity, headers (sender IDs), and templates on an operator portal before sending messages. Our team provides complete assistance to get you approved."
  },
  {
    q: "What is the difference between Transactional and Promotional routes?",
    a: "Transactional SMS is used for critical alerts like OTPs and booking updates. They can be sent 24/7 and are delivered to all numbers (including DND). Promotional SMS is for marketing, discounts, and campaigns. They can only be sent between 9 AM and 9 PM and are not delivered to numbers registered on the DND registry."
  },
  {
    q: "How long does custom Sender ID (Header) approval take?",
    a: "Once DLT entity registration is complete, header (Sender ID) approvals typically take 24 to 48 hours on the operator DLT portal. Once approved there, it is active instantly on our gateway."
  },
  {
    q: "Do you support API integrations with webhooks?",
    a: "Absolutely. We offer high-performance REST APIs in multiple programming languages, along with live webhooks to receive real-time delivery status reports (DLR) directly back to your server databases."
  },
  {
    q: "How do I top up my SMS credits and do they expire?",
    a: "You can purchase SMS credits online via UPI, Credit Card, or Net Banking. Purchased credits do not expire and roll over indefinitely, allowing you to use them at your own pace."
  }
];

export default function SmsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Background soft grids */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">
            <HelpCircle size={10} className="text-primary" /> Common Inquiries
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/80 bg-slate-50/50 rounded-3xl overflow-hidden transition-colors duration-300 hover:border-slate-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-sm md:text-base font-bold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-6 text-xs md:text-sm text-slate-500 font-light leading-relaxed border-t border-slate-100 pt-4 bg-white/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
