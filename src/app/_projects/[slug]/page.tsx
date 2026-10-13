import React from "react";
import { notFound } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { PremiumFooter } from "@/components/sections/PremiumFooter";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { projects } from "@/lib/projectsData";

export async function generateStaticParams() {
  return [
    { slug: "logitech" },
    { slug: "logitech-g" },
    { slug: "bamboo" },
    { slug: "rise" },
    { slug: "vogue" },
    { slug: "crane" },
    { slug: "ejraid" },
    { slug: "squad" }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Normalize slug to match project names
  const normalizedSlug = slug === "logitech-g" ? "logitech" : slug.toLowerCase();
  
  const projectIndex = projects.findIndex(
    (p) => p.name.toLowerCase() === normalizedSlug
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  
  // Get next project for transition navigation
  const nextProject = projects[(projectIndex + 1) % projects.length];
  
  const isLight = project.textColor === "text-black";
  const textColor = isLight ? "#1b1c1e" : "white";

  return (
    <main className="bg-background text-white min-h-screen font-sans selection:bg-primary-red selection:text-white relative">
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10 pt-32">
        
        {/* Project Header Hero Section */}
        <section 
          className="w-full py-16 md:py-24 relative overflow-hidden transition-colors duration-500 border-b"
          style={{ 
            backgroundColor: project.color,
            borderColor: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)"
          }}
        >
          {/* Decorative overlay grids */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#101010_100%)] opacity-20 pointer-events-none" />

          {/* Corners border design */}
          <div className="corners absolute inset-0 pointer-events-none">
            <div className={`frame-corner border-current opacity-30 ${isLight ? "text-black" : "text-white"}`}></div>
            <div className={`frame-corner is--2 border-current opacity-30 ${isLight ? "text-black" : "text-white"}`}></div>
            <div className={`frame-corner is--3 border-current opacity-30 ${isLight ? "text-black" : "text-white"}`}></div>
            <div className={`frame-corner is--4 border-current opacity-30 ${isLight ? "text-black" : "text-white"}`}></div>
          </div>
          
          <div className="padding-global relative z-10">
            <div className="container-large">
              <div className="flex flex-col gap-8 md:gap-12">
                
                {/* Back to all projects link */}
                <a 
                  href="/projects" 
                  className="group flex items-center gap-2 text-sm font-mono tracking-widest transition-colors uppercase w-fit"
                  style={{ color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)" }}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="transform group-hover:-translate-x-1 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  [ Back to projects ]
                </a>

                {/* Big Heading Display using Tall Humane typography */}
                <div>
                  <span 
                    className="font-mono text-sm tracking-[0.3em] uppercase block mb-4 opacity-75"
                    style={{ color: isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)" }}
                  >
                    Project {project.id}
                  </span>
                  <h1 
                    className="font-humane text-7xl md:text-[10vw] leading-[0.8] uppercase select-none tracking-tight"
                    style={{ color: textColor }}
                  >
                    {project.name}
                  </h1>
                </div>

                {/* Info Metadata cards grid */}
                <div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t"
                  style={{ borderColor: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)" }}
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest opacity-60">Role</span>
                    <span className="text-sm font-bold uppercase tracking-wider">{project.tag2}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest opacity-60">Service</span>
                    <span className="text-sm font-bold uppercase tracking-wider">{project.tag1}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest opacity-60">Year</span>
                    <span className="text-sm font-bold uppercase tracking-wider">{project.tag3}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest opacity-60">Platform</span>
                    <span className="text-sm font-bold uppercase tracking-wider">Webflow & Next.js</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Project Content details (Media player & Description) */}
        <section className="w-full py-16 md:py-24 bg-background">
          <div className="padding-global">
            <div className="container-large">
              <div className="flex flex-col gap-16 md:gap-24">
                
                {/* Double Rounded Media Card Container */}
                <div 
                  className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] border-[10px] border-black/5 overflow-hidden relative bg-[#F8F9FA]"
                  style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)" }}
                >
                  {project.video ? (
                    <video 
                      src={project.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      controls
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>

                {/* Staggered description & case details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left big text summary */}
                  <div className="lg:col-span-8 flex flex-col gap-8">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-yellow-400">
                      Overview
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 font-sans leading-relaxed">
                      {project.description}
                    </p>
                    <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">
                      Every project requires a meticulous design system that balances the core values of the brand with immersive layouts. During this partnership, we iterated closely from initial low-fidelity sitemaps up to polished high-fidelity prototypes in Figma, and finally custom production builds in Webflow/Next.js.
                    </p>
                  </div>

                  {/* Right summary cards list */}
                  <div className="lg:col-span-4 bg-background/5 border border-black/10 rounded-2xl p-8 flex flex-col gap-6">
                    <h3 className="font-heading text-lg text-white uppercase tracking-wider">
                      Key Highlights
                    </h3>
                    <ul className="flex flex-col gap-4 text-sm text-gray-600">
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-400 mt-1 font-mono">✓</span>
                        <span>Responsive pixel-perfect layouts optimized for all sizes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-400 mt-1 font-mono">✓</span>
                        <span>High-performance animations with smooth scroll integrations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-400 mt-1 font-mono">✓</span>
                        <span>Modular components built for brand scalability</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Transition Navigation to Next Project */}
        <section className="w-full border-t border-black/10">
          <a 
            href={`/projects/${nextProject.name.toLowerCase()}`}
            className="group flex flex-col items-center justify-center text-center py-24 md:py-36 relative overflow-hidden transition-all duration-500 hover:scale-[1.01]"
            style={{ backgroundColor: nextProject.color }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-0" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <span className="text-yellow-400 font-mono text-sm tracking-[0.3em] uppercase block">
                [ Next Project ]
              </span>
              <h2 
                className="font-humane text-6xl md:text-8xl lg:text-[8vw] leading-[0.8] uppercase select-none tracking-tight transition-transform duration-500 group-hover:scale-105"
                style={{ color: nextProject.textColor === "text-black" ? "#1b1c1e" : "white" }}
              >
                {nextProject.name}
              </h2>
              <div className="btn-icon-wrap bg-[#ffd600] text-black rounded-full w-12 h-12 flex items-center justify-center mt-6 transform group-hover:scale-110 transition-transform duration-300 shadow-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </a>
        </section>

        <SectionCrosses dark={false} />

        <PremiumFooter />
      </div>
    </main>
  );
}
