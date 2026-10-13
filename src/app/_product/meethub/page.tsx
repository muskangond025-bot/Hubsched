"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { PremiumFooter } from "@/components/sections/PremiumFooter";
import { gsap } from "@/lib/gsap";
import Link from "next/link";

export default function MeetHubProductPage() {
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
        const cards = containerRef.current?.querySelectorAll(".meethub-card");
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
      title: "Smart Room Displays",
      desc: "Interactive digital displays outside each meeting room showing real-time availability, current bookings, and instant check-in options.",
      img: "https://hubsched.com/static/image/smartroom.webp"
    },
    {
      title: "IT Equipment Management",
      desc: "Reserve smart displays, video conferencing systems, wireless presentation tools, and audio equipment with your meeting room booking.",
      img: "https://hubsched.com/static/image/geofencingalerts.webp"
    },
    {
      title: "Visitor Management",
      desc: "Pre-register visitors, send meeting invites with room details, and provide a seamless check-in experience for external guests.",
      img: "https://hubsched.com/static/image/visitormanagement.webp"
    },
    {
      title: "Auto-Release Feature",
      desc: "Automatically release meeting room bookings when no-shows occur, returning the space to the availability pool.",
      img: "https://hubsched.com/static/image/autoreleasefeature.webp"
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
                  Meeting & Conference Room
                </span>
                <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight uppercase leading-[0.95]">
                  HubSched <br />
                  <span className="text-shadow-glow">MeetHub</span>
                </h1>
                <p className={`text-gray-600 text-lg leading-relaxed font-sans max-w-xl transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
                  MeetHub is a specialized conference room management software of HubSched. It enables seamless space booking and resource coordination, optimizing space utilization and eliminating scheduling conflicts. Coordinate meeting rooms, IT equipment reservations, guest pre-registrations, and smart check-ins, allowing your team to collaborate without any conflicts.
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
                    <source src="https://hubsched.com/static/video/visitervideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

            </div>
          </section>

          <SectionCrosses dark={false} />

          {/* 2. Instant Room Booking Segment */}
          <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Text Left */}
              <div className="md:col-span-6 flex flex-col gap-6">
                <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight uppercase leading-[1]">
                  Instant Room Booking
                </h2>
                <p className="text-gray-600 text-base leading-relaxed font-sans">
                  Our meeting room reservation software allows employees to book spaces instantly via a mobile app or web portal. It provides real-time visibility of room availability across all locations, ensuring faster decisions and smoother collaboration.
                </p>
              </div>

              {/* Image Right */}
              <div className="md:col-span-6 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden border border-black/10 p-2 bg-background/[0.01] max-w-[90%]">
                  <img 
                    src="https://hubsched.com/static/image/InstantRoom.webp" 
                    alt="HubSched Instant Room Reservation interface" 
                    className="rounded-2xl w-full height-auto object-cover"
                  />
                </div>
              </div>

            </div>
          </section>

          <SectionCrosses dark={true} />

          {/* 3. Smart Check-In Segment */}
          <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Image Left */}
              <div className="md:col-span-6 flex justify-center order-2 md:order-1">
                <div className="relative rounded-3xl overflow-hidden border border-black/10 p-2 bg-background/[0.01] max-w-[90%]">
                  <img 
                    src="https://hubsched.com/static/image/smartcheckin.webp" 
                    alt="HubSched Smart Check-In panel" 
                    className="rounded-2xl w-full height-auto object-cover"
                  />
                </div>
              </div>

              {/* Text Right */}
              <div className="md:col-span-6 flex flex-col gap-6 order-1 md:order-2">
                <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight uppercase leading-[1]">
                  Smart Check-In & Auto-Release
                </h2>
                <p className="text-gray-600 text-base leading-relaxed font-sans">
                  MeetHub offers smart check-in through mobile apps, QR codes, or room panels. To improve efficiency, the system automatically releases unclaimed bookings after 10 minutes, reducing no-shows. This ensures maximum room availability.
                </p>
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
                MeetHub Features
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="meethub-card group relative overflow-hidden rounded-2xl bg-background/[0.02] border border-black/10 hover:border-black/20 p-6 flex flex-col gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500"
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
