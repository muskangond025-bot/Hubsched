"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { PremiumFooter } from "@/components/sections/PremiumFooter";
import { gsap } from "@/lib/gsap";
import Link from "next/link";

export default function FaceIDProductPage() {
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
        const cards = containerRef.current?.querySelectorAll(".mode-card");
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
                trigger: ".section-modes",
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

  const modes = [
    {
      title: "AI Attendance",
      desc: "Real-time, cloud-connected attendance marking using AI face recognition for offices with stable internet.",
      img: "https://hubsched.com/static/image/AIAttendance.webp"
    },
    {
      title: "Selfie Attendance",
      desc: "Mobile-based attendance for remote or field employees using the HubSched app selfie capture.",
      img: "https://hubsched.com/static/image/SelfieAttendance.webp"
    },
    {
      title: "Low Network / Hybrid Mode",
      desc: "Works perfectly even in low or no internet zones — syncs attendance data automatically when online.",
      img: "https://hubsched.com/static/image/LowNetwork.webp"
    },
    {
      title: "Contactless Attendance",
      desc: "Smart, touch-free attendance made easy with AI face recognition. Just look at the camera for instant and secure verification.",
      img: "https://hubsched.com/static/image/ContactlessAttendance.webp"
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
                  AI Face Recognition
                </span>
                <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight uppercase leading-[0.95]">
                  HubSched AI <br />
                  <span className="text-shadow-glow">Face-Based Attendance</span>
                </h1>
                <p className={`text-gray-600 text-lg leading-relaxed font-sans max-w-xl transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
                  HubSched FaceID+ is a specialized module designed to transform attendance tracking. Our system uses advanced AI facial recognition to mark attendance instantly and securely. We provide four smart modes of attendance, ensuring seamless operation whether your workplace is online, offline, or in low-network zones. Rest assured that employee hours are tracked accurately with zero manual work.
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
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden border border-black/10 bg-background/[0.02] aspect-video flex items-center justify-center">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  >
                    <source src="https://hubsched.com/static/video/attendanceviedio.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

            </div>
          </section>

          <SectionCrosses dark={false} />

          {/* 2. Mobile App Attendance Segment */}
          <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Image Left */}
              <div className="md:col-span-6 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden border border-black/10 p-2 bg-background/[0.01] max-w-[90%]">
                  <img 
                    src="https://hubsched.com/static/image/mobileattendance.webp" 
                    alt="HubSched Mobile App Attendance interface" 
                    className="rounded-2xl w-full height-auto object-cover"
                  />
                </div>
              </div>

              {/* Text Right */}
              <div className="md:col-span-6 flex flex-col gap-6">
                <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight uppercase leading-[1]">
                  Mobile App Attendance
                </h2>
                <p className="text-gray-600 text-base leading-relaxed font-sans">
                  Mark attendance on the go with our powerful mobile app. Perfect for remote teams, field staff, and flexible workplaces. Features GPS tracking, selfie verification, real-time sync, and offline mode support. Your team stays connected and accountable from anywhere, anytime.
                </p>
              </div>

            </div>
          </section>

          <SectionCrosses dark={true} />

          {/* 3. Web Dashboard Segment */}
          <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Text Left */}
              <div className="md:col-span-6 flex flex-col gap-6 order-2 md:order-1">
                <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight uppercase leading-[1]">
                  Web Dashboard & Management
                </h2>
                <p className="text-gray-600 text-base leading-relaxed font-sans">
                  The Web Module offers real-time attendance sync from devices and mobile apps directly to your dashboard, giving HR and managers instant visibility. It delivers fast face recognition, automatic updates, smart alerts, and easy report downloads—all through a secure browser interface. No manual work—just seamless, modern attendance management.
                </p>
              </div>

              {/* Image Right */}
              <div className="md:col-span-6 flex justify-center order-1 md:order-2">
                <div className="relative rounded-3xl overflow-hidden border border-black/10 p-2 bg-background/[0.01] max-w-[90%]">
                  <img 
                    src="https://hubsched.com/static/image/payroll.webp" 
                    alt="HubSched Web Dashboard interface" 
                    className="rounded-2xl w-full height-auto object-cover"
                  />
                </div>
              </div>

            </div>
          </section>

          <SectionCrosses dark={false} />

          {/* 4. Four Modes Grid */}
          <section className="section-modes py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center gap-6 mb-16">
              <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
                Versatile Options
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight uppercase leading-[0.9] text-shadow-glow">
                Four Attendance Modes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {modes.map((mode, index) => (
                <div 
                  key={index}
                  className="mode-card group relative overflow-hidden rounded-2xl bg-background/[0.02] border border-black/10 hover:border-black/20 p-6 flex flex-col gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500"
                >
                  <div className="w-full h-48 rounded-xl overflow-hidden bg-background/5 border border-black/5 flex items-center justify-center">
                    <img 
                      src={mode.img} 
                      alt={mode.title} 
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">{mode.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed font-sans">{mode.desc}</p>
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
