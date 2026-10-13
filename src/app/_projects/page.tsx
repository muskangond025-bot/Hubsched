"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Projects } from "@/components/sections/Projects";
import { PricingContent } from "@/components/sections/PricingContent";
import { Faq } from "@/components/sections/Faq";
import { PremiumFooter } from "@/components/sections/PremiumFooter";
import { SectionCrosses } from "@/components/sections/SectionCrosses";

export default function ProjectsIndexPage() {
  return (
    <main className="bg-background text-white min-h-screen font-sans selection:bg-primary-red selection:text-white relative">
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        {/* Render the full-screen interactive projects slider exactly as it is on the live Webflow projects page */}
        <Projects />
        
        <SectionCrosses dark={false} />

        {/* Real-time comparison table, benefits, and CTA sections */}
        <PricingContent />
        
        <SectionCrosses dark={false} />
        
        {/* Interactive FAQ component exactly as displayed on the live Webflow projects page */}
        <Faq />
        
        <PremiumFooter />
      </div>
    </main>
  );
}
