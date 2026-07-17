"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search, Info } from "lucide-react";
import type { SaasFaq as SaasFaqData } from "@/data/software-enterprise";

/**
 * FAQ section with category tabs + search. Heading, categories and items are
 * CMS-driven; the category tabs are derived from the items' `category` fields.
 */
export default function SaasFaq({ data }: { data: SaasFaqData }) {
  const items = useMemo(() => data.items ?? [], [data.items]);
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const item of items) {
      if (item.category && !seen.includes(item.category)) seen.push(item.category);
    }
    return ["All", ...seen];
  }, [items]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => setExpandedFaq(expandedFaq === index ? null : index);

  const filteredFaqs = items.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesQuery =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section className="relative py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">FAQ</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {data.title} <span className="text-primary">{data.highlightedTitle}</span>
          </h2>
          <p className="mt-4 text-sm text-slate-500">{data.description}</p>
        </div>

        {/* Search + category filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-50 border border-slate-100 rounded-xl max-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedFaq(null);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat ? "bg-white text-slate-800 shadow-xs" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-md w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExpandedFaq(null);
              }}
              className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-850"
            />
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-4 min-h-[150px]">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const globalIndex = items.findIndex((item) => item.question === faq.question);
              const isExpanded = expandedFaq === globalIndex;
              return (
                <motion.div
                  key={globalIndex}
                  layout="position"
                  className="rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:border-slate-200/80 hover:shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(globalIndex)}
                    className="flex w-full items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex flex-col text-left pr-4">
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wide mb-1">{faq.category}</span>
                      <span className="font-bold text-slate-800 text-sm md:text-base leading-snug">{faq.question}</span>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-colors duration-300">
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-700" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-xs md:text-sm leading-relaxed text-slate-500 pt-3 border-t border-slate-50">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <Info className="h-8 w-8 text-slate-400 mb-2" />
              <p className="text-xs font-bold text-slate-700">No questions found matching your search</p>
              <p className="text-[10px] text-slate-450 mt-1">Try resetting the category filter or searching a different term.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
