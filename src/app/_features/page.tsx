"use client";

import React, { useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { PremiumFooter } from "@/components/sections/PremiumFooter";
import { gsap } from "@/lib/gsap";

export default function FeaturesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Hero animation
        gsap.fromTo(".features-hero-text",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // Sections animations
        const sections = containerRef.current?.querySelectorAll(".feature-group-section");
        sections?.forEach((section) => {
          const cards = section.querySelectorAll(".feature-card");
          const title = section.querySelector(".feature-section-header");
          
          if (title) {
            gsap.fromTo(title,
              { opacity: 0, x: -30 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                }
              }
            );
          }

          if (cards.length > 0) {
            gsap.fromTo(cards,
              { opacity: 0, y: 25, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.1,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                }
              }
            );
          }
        });

        ScrollTrigger.refresh();
      }, containerRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const featureGroups = [
    {
      title: "Attendance & Time Management",
      accent: "#3b82f6", // blue
      bgGradient: "from-blue-600/10 to-blue-800/5",
      borderAccent: "border-blue-500/20 hover:border-blue-500/40",
      items: [
        {
          name: "Real-Time Sync",
          desc: "Attendance updates instantly across all devices. No manual refresh, no delays—just seamless synchronization."
        },
        {
          name: "Monthly Overview",
          desc: "View complete monthly attendance with present days, absences, and leave summary in one dashboard."
        },
        {
          name: "Punch In/Out Logs",
          desc: "Detailed timestamp records with GPS location tracking for every check-in and check-out."
        },
        {
          name: "Late & Half Day Rules",
          desc: "Smart detection of late arrivals and automatic half-day marking based on your company policies."
        },
        {
          name: "Overtime Tracking",
          desc: "Automated calculation of extra hours worked beyond shift timings for accurate compensation."
        },
        {
          name: "Attendance Reports",
          desc: "Generate comprehensive reports with filters for date range, departments, and employee groups."
        }
      ]
    },
    {
      title: "Payroll & Compliance",
      accent: "#10b981", // green
      bgGradient: "from-emerald-600/10 to-emerald-800/5",
      borderAccent: "border-emerald-500/20 hover:border-emerald-500/40",
      items: [
        {
          name: "Payroll Processing",
          desc: "Automated salary calculations based on attendance, leaves, and overtime with 100% accuracy."
        },
        {
          name: "Digital Pay Slips",
          desc: "Instant generation and distribution of detailed pay slips directly to employee accounts."
        },
        {
          name: "Statutory Compliance",
          desc: "Automatic PF, ESI, PT, and TDS calculations ensuring 100% compliance with labor laws."
        }
      ]
    },
    {
      title: "Document & Asset Management",
      accent: "#06b6d4", // cyan
      bgGradient: "from-cyan-600/10 to-cyan-800/5",
      borderAccent: "border-cyan-500/20 hover:border-cyan-500/40",
      items: [
        {
          name: "Secure Document Storage",
          desc: "Cloud-based storage for all employee documents with bank-level encryption and access control."
        },
        {
          name: "Employee Self-Service",
          desc: "Employees can view and download their documents anytime through mobile or web app."
        },
        {
          name: "Asset Tracking",
          desc: "Complete lifecycle management of company assets assigned to employees with return tracking."
        }
      ]
    },
    {
      title: "Leave & Administration",
      accent: "#f59e0b", // yellow
      bgGradient: "from-amber-600/10 to-amber-800/5",
      borderAccent: "border-amber-500/20 hover:border-amber-500/40",
      items: [
        {
          name: "Leave Management",
          desc: "Apply for leave, track balance, and manage approvals seamlessly through the mobile app."
        },
        {
          name: "Holiday Calendar",
          desc: "Centralized calendar showing all company holidays, events, and important dates for planning."
        },
        {
          name: "Multi-Admin Access",
          desc: "Role-based permissions for HR, managers, and admins with customizable access levels."
        },
        {
          name: "Smart Notifications",
          desc: "Real-time alerts for pending approvals, leave requests, and important updates via app and email."
        }
      ]
    },
    {
      title: "Reports & Analytics",
      accent: "#ef4444", // red
      bgGradient: "from-red-600/10 to-red-800/5",
      borderAccent: "border-red-500/20 hover:border-red-500/40",
      items: [
        {
          name: "Visual Dashboards",
          desc: "Interactive dashboards with charts, graphs, and real-time analytics for attendance, payroll, and workforce trends. Make data-driven decisions with powerful visual insights."
        },
        {
          name: "Export Reports",
          desc: "Download detailed reports in Excel, PDF, or CSV formats for presentations, audits, or record-keeping. Schedule automated report delivery via email."
        }
      ]
    }
  ];

  return (
    <main ref={containerRef} className="bg-background text-white min-h-screen font-sans selection:bg-primary-red selection:text-white relative">
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        
        <div className="relative z-10 bg-background pt-32 pb-24">
          
          {/* Hero Section */}
          <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full text-center features-hero-text">
            <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
              Robust capabilities
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight uppercase mt-4 mb-6 leading-none">
              Software <span className="text-shadow-glow">Features</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
              Explore the full suite of HR automation and workplace management tools built to streamline your operations and scale your organization.
            </p>
          </section>

          <SectionCrosses dark={false} />

          {/* Features Sections */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col gap-24 py-16">
            {featureGroups.map((group, idx) => (
              <section key={idx} className="feature-group-section flex flex-col gap-8">
                
                {/* Header */}
                <div className="feature-section-header flex items-center gap-4">
                  <div 
                    className="w-1.5 h-8 rounded-full" 
                    style={{ backgroundColor: group.accent }}
                  />
                  <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight uppercase">
                    {group.title}
                  </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx}
                      className={`feature-card group relative overflow-hidden rounded-2xl bg-background/[0.01] border ${group.borderAccent} p-6 flex flex-col gap-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-background/[0.02] transition-all duration-500`}
                    >
                      {/* Background Glow */}
                      <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${group.bgGradient} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      <div className="flex flex-col gap-2 relative z-10">
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-shadow-glow">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </section>
            ))}
          </div>

          <SectionCrosses dark={false} />

        </div>

        <PremiumFooter />
      </div>
    </main>
  );
}
