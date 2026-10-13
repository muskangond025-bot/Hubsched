const fs = require('fs');
const data = require('./rohanjoshi_homepage_data.json');

const cleanedServices = data.services.map((s, idx) => ({
    id: idx + 1,
    title: s.title.replace(/&amp;/g, '&'),
    description: s.description,
    imageUrl: s.imageUrl,
    ctaText: s.ctaText || "Get in Touch",
    ctaLink: "#contact",
    knowMoreLink: s.knowMoreLink
}));

const servicesJson = JSON.stringify(cleanedServices, null, 2);

const content = `"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = ${servicesJson};

export const ServicesAccordion = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section id="services" className="w-full py-28 bg-[#07070a] text-white relative overflow-hidden select-none">
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
            CORE CAPABILITIES & SOLUTIONS
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-none">
                EMPOWERING <br />
                <span className="text-zinc-400 font-light font-sans text-3xl sm:text-5xl lg:text-6xl">YOU WITH</span>
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              Explore our full suite of professional film, event broadcast, and remote editing solutions crafted for creators, MSMEs, and global institutions.
            </p>
          </div>
        </div>

        {/* Interactive Accordion List */}
        <div className="space-y-4">
          {services.map((service, index) => {
            const isOpen = activeId === service.id;
            return (
              <div
                key={service.id}
                className="border-b border-white/10 transition-colors duration-300"
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? 0 : service.id)}
                  className="w-full py-6 sm:py-8 flex items-center justify-between gap-4 text-left group focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="font-mono text-xs sm:text-sm text-zinc-400 tracking-wider">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className={\`font-sans text-xl sm:text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 \${
                      isOpen ? 'text-red-500' : 'text-zinc-200 group-hover:text-white'
                    }\`}>
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={\`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 \${
                      isOpen
                        ? 'bg-red-600 border-red-600 text-white rotate-45'
                        : 'border-white/20 text-zinc-400 group-hover:border-white/50 group-hover:text-white'
                    }\`}>
                      <svg
                        className="w-4 h-4 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Text and Actions */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans">
                            {service.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 pt-4">
                            <a
                              href="#contact"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.4)]"
                            >
                              <span>Get in Touch</span>
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </a>

                            <a
                              href="#contact"
                              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                            >
                              <span>Know More</span>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          </div>
                        </div>

                        {/* Visual Image Preview */}
                        <div className="lg:col-span-5 flex justify-center">
                          <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-900 group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={service.imageUrl}
                              alt={service.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                              {service.title}
                            </div>
                          </div>
                        </div>

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
};
`;

fs.writeFileSync('src/components/sections/ServicesAccordion.tsx', content);
console.log('Successfully created ServicesAccordion.tsx with all 11 services!');
