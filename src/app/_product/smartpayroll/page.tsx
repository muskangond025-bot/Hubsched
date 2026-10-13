"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { PremiumFooter } from "@/components/sections/PremiumFooter";
import { gsap } from "@/lib/gsap";
import Link from "next/link";

export default function SmartPayrollProductPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Reveal headers
        gsap.fromTo(".product-hero-text",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // Reveal features cards staggered
        const cards = containerRef.current?.querySelectorAll(".payroll-card");
        if (cards) {
          gsap.fromTo(cards,
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".section-features",
                start: "top 80%",
              }
            }
          );
        }

        // Force calculations check
        ScrollTrigger.refresh();
      }, containerRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const features = [
    {
      title: "One-Click Salary Generation",
      desc: "Calculate salaries for your entire workforce instantly with automated attendance, leave, and overtime integration.",
      img: "https://hubsched.com/static/image/oneclicksalary.webp"
    },
    {
      title: "Employee Self-Service",
      desc: "Employees can view payslips, download tax documents, and track salary history anytime from their portal.",
      img: "https://hubsched.com/static/image/selfservice.webp"
    },
    {
      title: "Custom Reports & Analytics",
      desc: "Generate detailed payroll reports, cost analysis, department-wise breakdowns, and export to Excel or PDF.",
      img: "https://hubsched.com/static/image/customreport.webp"
    },
    {
      title: "Multi-Location Support",
      desc: "Manage payroll across multiple branches, locations, and departments with centralized control and visibility.",
      img: "https://hubsched.com/static/image/location.webp"
    }
  ];

  return (
    <main ref={containerRef} className="bg-background text-white min-h-screen font-sans selection:bg-primary-red selection:text-white relative">
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        
        <div className="relative z-10 bg-background pt-32 pb-16">
          {/* 1. Hero Section */}
          <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-6 flex flex-col gap-6 product-hero-text">
                <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
                  Automated HRMS
                </span>
                <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight uppercase leading-[0.95]">
                  HubSched Smart <br />
                  <span className="text-shadow-glow">Payroll</span>
                </h1>
                <p className={`text-gray-600 text-lg leading-relaxed font-sans max-w-xl transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
                  HubSched Smart Payroll is a fully integrated, intelligent payroll management system designed to simplify salary processing, compliance, and employee financial management — all in one unified platform. Effortlessly sync attendance logs to process payroll with one click, calculate statutory deductions, generate digital payslips, and comply with all regional labor laws automatically.
                </p>
                <div className="text-start -mt-2">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#E83C25] font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center gap-1.5"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                    <svg 
                      className={`w-3.5 h-3.5 transition-transform duration-350 ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="mt-4">
                  <Link href="/contact">
                    <button className="px-8 py-4 bg-primary-red hover:bg-primary-red/90 text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#0C329E]/20 hover:scale-[1.02]">
                      Book Free Demo
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Media */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden border border-black/10 p-2 bg-background/[0.01]">
                  <img 
                    src="https://hubsched.com/static/image/payroll%20management%20design.webp" 
                    alt="HubSched Smart Payroll design interface" 
                    className="rounded-2xl w-full height-auto object-cover max-w-lg"
                  />
                </div>
              </div>

            </div>
          </section>

          <SectionCrosses dark={false} />

          {/* 2. Automated Salary Processing Segment */}
          <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Text Left */}
              <div className="md:col-span-6 flex flex-col gap-6">
                <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight uppercase leading-[1]">
                  Automated Salary Processing
                </h2>
                <ul className="flex flex-col gap-4 font-sans text-gray-600 text-base leading-relaxed list-disc pl-5">
                  <li>Calculate salaries automatically based on attendance, overtime, and leave records.</li>
                  <li>Configure custom salary components including allowances, deductions, and bonuses.</li>
                  <li>Generate accurate payslips instantly with zero manual effort.</li>
                </ul>
              </div>

              {/* Image Right */}
              <div className="md:col-span-6 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden border border-black/10 p-2 bg-background/[0.01] max-w-[90%]">
                  <img 
                    src="https://hubsched.com/static/image/automatic%20salary%20processing.webp" 
                    alt="HubSched Automated Salary Processing interface" 
                    className="rounded-2xl w-full height-auto object-cover"
                  />
                </div>
              </div>

            </div>
          </section>

          <SectionCrosses dark={true} />

          {/* 3. Tax & Compliance Management Segment */}
          <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Image Left */}
              <div className="md:col-span-6 flex justify-center order-2 md:order-1">
                <div className="relative rounded-3xl overflow-hidden border border-black/10 p-2 bg-background/[0.01] max-w-[90%]">
                  <img 
                    src="https://hubsched.com/static/image/autosalary.webp" 
                    alt="HubSched Tax and Compliance interface" 
                    className="rounded-2xl w-full height-auto object-cover"
                  />
                </div>
              </div>

              {/* Text Right */}
              <div className="md:col-span-6 flex flex-col gap-6 order-1 md:order-2">
                <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight uppercase leading-[1]">
                  Tax & Compliance Management
                </h2>
                <ul className="flex flex-col gap-4 font-sans text-gray-600 text-base leading-relaxed list-disc pl-5">
                  <li>Automatic TDS, PF, ESI, and PT calculations as per latest government regulations.</li>
                  <li>Generate statutory reports for easy compliance and audit trails.</li>
                  <li>Stay updated with real-time tax rule changes and notifications.</li>
                </ul>
              </div>

            </div>
          </section>

          <SectionCrosses dark={false} />

          {/* 4. Features Grid */}
          <section className="section-features py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center gap-6 mb-16">
              <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
                Core Capabilities
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight uppercase leading-[0.9] text-shadow-glow">
                Payroll Modules
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="payroll-card group relative overflow-hidden rounded-2xl bg-background/[0.02] border border-black/10 hover:border-black/20 p-6 flex flex-col gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500"
                >
                  <div className="w-full h-48 rounded-xl overflow-hidden bg-background/5 border border-black/5 flex items-center justify-center">
                    <img 
                      src={feature.img} 
                      alt={feature.title} 
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">{feature.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed font-sans">{feature.desc}</p>
                  </div>
                </div>
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
