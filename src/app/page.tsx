import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { Marquee } from "@/components/sections/Marquee";
import { Signature } from "@/components/sections/Signature";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { CardSwing } from "@/components/sections/CardSwing";
import { Experience } from "@/components/sections/Experience";

// New Premium Sections
import { DesignBento } from "@/components/sections/DesignBento";
import { VelocityRibbon } from "@/components/sections/VelocityRibbon";
import { CodeBuilder } from "@/components/sections/CodeBuilder";
import { PremiumFooter } from "@/components/sections/PremiumFooter";

export default function Home() {
  return (
    <main className="bg-background text-white min-h-screen font-sans selection:bg-primary-red selection:text-white relative">
      {/* Background Ornament SVGs */}
      <div className="absolute top-[20%] left-[5%] opacity-20 pointer-events-none z-0">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="1" fill="none" strokeDasharray="5,5" />
        </svg>
      </div>

      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        <Hero />
        <About />
        <Expertise />

        <SectionCrosses dark={false} />
        <CardSwing />

        <SectionCrosses dark={false} />
        <Experience />

        <FeaturedSection title="Projects" />
        <Projects />

        <SectionCrosses dark={true} />
        <Testimonials />

        <SectionCrosses dark={false} />
        <Faq />

        <PremiumFooter />
      </div>
    </main>
  );
}
