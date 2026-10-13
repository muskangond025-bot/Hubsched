const fs = require('fs');

const realTestimonials = [
  {
    name: "Sanam Arora",
    role: "Founder",
    company: "NISAU UK",
    quote: "We've done a phenomenal tour across eight cities in India. And I could not have asked for a better videography and photography team than Make My Vid.",
    fullQuote: "We've done a phenomenal tour across eight cities in India. And I could not have asked for a better videography and photography team than Make My Vid. I'm going to keep reusing their services not just in India but also for our high-profile events in UK as well.",
    tag: "Multi-City Event Production"
  },
  {
    name: "Akshay Dujodwala",
    role: "Founder",
    company: "Mangalam Brands & CamPure",
    quote: "Rohan made our Amazon product videos. We're still using those videos four years later because they were so good and crisp.",
    fullQuote: "I've known Rohan since 2021 and have worked with him on a number of projects together. Rohan made for us for our Amazon product videos. We're still using those videos four years later because they were so good and crisp.",
    tag: "Commercial Product Videos"
  },
  {
    name: "Siddharta",
    role: "Founder",
    company: "Pipal Tree",
    quote: "All these short films have been made with great sensitivity. And we show it to people all over the world.",
    fullQuote: "He's been a person who has done made some wonderful videos for us, mainly on sustainable development. All these short films have been made with great sensitivity. And we show it to people all over the world.",
    tag: "Sustainability & Social Impact Films"
  },
  {
    name: "Amanda Martin",
    role: "Founder",
    company: "SignBee Academy, USA",
    quote: "I have never been so impressed with an editor's work as much as I am with Make My Vid team. Thorough, reliable, and consistent.",
    fullQuote: "I have never been so impressed with an editor's work as much as I am with Make My Vid team. They are thorough, reliable, and consistent with all of the work that they complete.",
    tag: "Remote Post-Production & Edits"
  }
];

const testimonialsJson = JSON.stringify(realTestimonials, null, 2);

const content = `"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = ${testimonialsJson};

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="w-full py-28 bg-[#09090d] text-white relative overflow-hidden select-none border-t border-b border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
              CLIENT TESTIMONIALS
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
              EVOLVING <br />
              <span className="text-zinc-400 font-light font-sans text-3xl sm:text-5xl">WITH GRATITUDE</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/10 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/10 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/15 p-8 sm:p-12 md:p-16 backdrop-blur-xl shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between min-h-[300px]"
            >
              {/* Category tag */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs tracking-widest text-red-500 uppercase px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                  {current.tag}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  0{activeIndex + 1} / 0{testimonials.length}
                </span>
              </div>

              {/* Quote Text */}
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-zinc-100 font-medium leading-relaxed mb-10">
                “{current.fullQuote}”
              </p>

              {/* Author Info */}
              <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold font-sans text-white">
                    {current.name}
                  </h4>
                  <p className="text-sm text-zinc-400 font-sans mt-0.5">
                    {current.role}, <span className="text-zinc-300 font-semibold">{current.company}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {testimonials.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActiveIndex(dotIdx)}
                      className={\`h-2.5 rounded-full transition-all duration-300 \${
                        dotIdx === activeIndex
                          ? 'w-8 bg-red-500'
                          : 'w-2.5 bg-white/20 hover:bg-white/40'
                      }\`}
                      aria-label={\`Go to slide \${dotIdx + 1}\`}
                    />
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
`;

fs.writeFileSync('src/components/sections/Testimonials.tsx', content);
console.log('Successfully created Testimonials.tsx with all 4 authentic reviews!');
