"use client";

import React, { useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { PremiumFooter } from "@/components/sections/PremiumFooter";
import { gsap } from "@/lib/gsap";

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(".blog-hero-text",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        const cards = containerRef.current?.querySelectorAll(".blog-post-card");
        if (cards) {
          gsap.fromTo(cards,
            { opacity: 0, y: 35, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.15,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".blog-grid-section",
                start: "top 80%",
              }
            }
          );
        }

        ScrollTrigger.refresh();
      }, containerRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const posts = [
    {
      title: "Top Tech Trends Dominating the Digital World",
      author: "Pawan Shejwal",
      date: "Jan. 27, 2025",
      excerpt: "Discover the latest innovations shaping the digital landscape—from artificial intelligence and cloud computing to blockchain, cybersecurity, and automation. This blog explores how emerging technologies are transforming industries.",
      svg: (
        <svg viewBox="0 0 200 200" fill="none" className="w-24 h-24 text-primary-red">
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
          <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" />
          <circle cx="70" cy="80" r="6" fill="currentColor" />
          <circle cx="130" cy="80" r="6" fill="currentColor" />
          <circle cx="70" cy="120" r="6" fill="currentColor" />
          <circle cx="130" cy="120" r="6" fill="currentColor" />
          <line x1="70" y1="80" x2="100" y2="70" stroke="currentColor" strokeWidth="1.5" />
          <line x1="130" y1="80" x2="100" y2="70" stroke="currentColor" strokeWidth="1.5" />
          <line x1="70" y1="120" x2="100" y2="130" stroke="currentColor" strokeWidth="1.5" />
          <line x1="130" y1="120" x2="100" y2="130" stroke="currentColor" strokeWidth="1.5" />
          <rect x="88" y="88" width="24" height="24" rx="4" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "The Rise of Automation: What It Means for Businesses",
      author: "Jivan Thakare",
      date: "Apr. 27, 2025",
      excerpt: "Automation is revolutionizing the modern workplace. This blog explains how automated tools, AI workflows, and smart machines help companies reduce costs, increase productivity, and eliminate repetitive tasks.",
      svg: (
        <svg viewBox="0 0 200 200" fill="none" className="w-24 h-24 text-primary-red">
          <rect x="60" y="70" width="80" height="90" rx="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
          <rect x="75" y="50" width="50" height="35" rx="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
          <circle cx="90" cy="65" r="4" fill="currentColor" />
          <circle cx="110" cy="65" r="4" fill="currentColor" />
          <line x1="100" y1="50" x2="100" y2="35" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="32" r="3" fill="currentColor" />
          <circle cx="85" cy="95" r="6" fill="currentColor" />
          <circle cx="115" cy="95" r="6" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "How Digital Transformation Is Reshaping Modern Businesses",
      author: "Yash Gaikwad",
      date: "Dec. 27, 2025",
      excerpt: "Digital transformation is no longer optional—it's essential. This blog explores how companies are leveraging digital tools, cloud platforms, data analytics, and AI to streamline operations and enhance customer experience.",
      svg: (
        <svg viewBox="0 0 200 200" fill="none" className="w-24 h-24 text-primary-red">
          <path d="M60 110 Q60 85 80 85 Q80 65 100 65 Q120 65 120 85 Q140 85 140 110 Q140 135 120 135 L80 135 Q60 135 60 110 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
          <g transform="translate(100, 110)">
            <circle r="12" fill="currentColor" />
            <circle r="6" fill="#101010" />
          </g>
          <line x1="100" y1="135" x2="100" y2="155" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="100" cy="160" r="4" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <main ref={containerRef} className="bg-background text-white min-h-screen font-sans selection:bg-primary-red selection:text-white relative">
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        
        <div className="relative z-10 bg-background pt-32 pb-24">
          
          {/* Hero Section */}
          <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full text-center blog-hero-text">
            <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
              Insights & Trends
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight uppercase mt-4 mb-6 leading-none">
              Our <span className="text-shadow-glow">Blog</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
              Explore the latest thoughts, industry trends, and business innovations in HR automation and workplace management.
            </p>
          </section>

          <SectionCrosses dark={false} />

          {/* Grid Section */}
          <section className="blog-grid-section py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article 
                  key={index}
                  className="blog-post-card group relative overflow-hidden rounded-2xl bg-background/[0.01] border border-black/10 p-6 flex flex-col justify-between hover:border-black/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 min-h-[480px]"
                >
                  <div className="flex flex-col gap-6">
                    <div className="w-full h-48 rounded-xl overflow-hidden bg-background/[0.02] border border-black/5 flex items-center justify-center relative">
                      {post.svg}
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-red transition-colors duration-300 line-clamp-2 uppercase">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-4 font-sans">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/5 flex justify-start">
                    <span className="text-xs font-bold text-primary-red group-hover:translate-x-2 transition-transform duration-300 uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                      Read Article <span className="text-lg">→</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <SectionCrosses dark={false} />

        </div>

        <PremiumFooter />
      </div>
    </main>
  );
}
