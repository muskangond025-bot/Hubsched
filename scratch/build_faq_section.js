const fs = require('fs');
const faqs = JSON.parse(fs.readFileSync('scratch/all_faqs.json', 'utf8'));

// Helper to categorize
function getCategory(num) {
    if ([1, 10, 11, 12, 14, 15, 20].includes(num)) return "Services";
    if ([5, 7, 8, 9, 13, 16, 17, 18, 25, 26, 27].includes(num)) return "Workflow & Tech";
    if ([2, 3, 4, 6, 19, 21, 22, 23, 43, 44, 45].includes(num)) return "Industries & Work";
    if ([24, 28, 29, 30].includes(num)) return "Pricing";
    if ([31, 32, 33, 34, 35, 36, 37, 38].includes(num)) return "Quality & Support";
    return "Marketing & CSR";
}

const enrichedFaqs = faqs.map(f => ({
    ...f,
    category: getCategory(f.num)
}));

const faqsJson = JSON.stringify(enrichedFaqs, null, 2);

const content = `"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const allFaqs = ${faqsJson};

const categories = [
  "All",
  "Services",
  "Workflow & Tech",
  "Industries & Work",
  "Pricing",
  "Quality & Support",
  "Marketing & CSR"
];

export const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<number | null>(1);

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="faq" className="w-full py-28 bg-[#07070a] text-white relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-600/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
              HELP & FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
              FAQs <br />
              <span className="text-zinc-400 font-light font-sans text-2xl sm:text-4xl">WE ARE HERE TO HELP</span>
            </h2>
          </div>

          {/* Real-time Search Input */}
          <div className="w-full md:w-80 relative">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 focus-within:border-red-500/60 transition-colors">
              <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all 48 FAQs..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-mono text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={\`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 shrink-0 \${
                  isSelected
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-200 border border-white/10'
                }\`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* FAQs Accordion Grid */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 font-sans">
              No matching questions found for &ldquo;{searchQuery}&rdquo;. Try another search keyword.
            </div>
          ) : (
            filteredFaqs.map((item) => {
              const isOpen = openId === item.num;
              return (
                <div
                  key={item.num}
                  className={\`rounded-2xl border transition-all duration-300 overflow-hidden \${
                    isOpen
                      ? 'bg-white/[0.04] border-red-500/30'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }\`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.num)}
                    className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs sm:text-sm text-red-500 font-bold shrink-0 mt-0.5">
                        Q{item.num.toString().padStart(2, '0')}
                      </span>
                      <h3 className="font-sans text-base sm:text-lg md:text-xl font-semibold text-zinc-100 leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <span className={\`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 transition-transform duration-300 \${
                      isOpen ? 'rotate-180 bg-red-600 text-white border-red-600' : 'text-zinc-400'
                    }\`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 pl-14 sm:pl-16">
                          <div className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line border-t border-white/10 pt-4">
                            {item.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
`;

fs.writeFileSync('src/components/sections/Faq.tsx', content);
console.log('Successfully written Faq.tsx with all 48 FAQs!');
