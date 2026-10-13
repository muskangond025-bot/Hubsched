"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const projects = [
  {
    id: "01",
    name: "ESSENTIAL PLAN",
    tag1: "FaceID + SmartPayroll",
    tag2: "Only Web",
    tag3: "₹70/employee/month",
    color: "#1b4fd8",
    textColor: "text-white",
    borderColor: "white",
    description: "Ideal for small teams needing core office attendance tracking and payroll automation. Includes AI face recognition on web console, overtime calculation, PF/ESI/PT statutory processing, and automated digital payslip generation.",
    video: "",
    image: "https://hubsched.com/static/image/AI%20Face%20attendance.webp"
  },
  {
    id: "02",
    name: "PROFESSIONAL PLAN",
    tag1: "FaceID + SmartPayroll + App",
    tag2: "Web • Android • iOS",
    tag3: "₹120/employee/month",
    color: "#1b4fd8",
    textColor: "text-white",
    borderColor: "white",
    description: "Our most popular plan. Empowers employees with Android & iOS apps, featuring a self-service portal, offline attendance sync, geofencing, leave applications, expense claims, task management, and tickets/grievance desk.",
    video: "",
    image: "https://hubsched.com/static/image/selfservice.webp"
  },
  {
    id: "03",
    name: "ENTERPRISE PLAN",
    tag1: "FaceID + SmartPayroll + App + Tracking",
    tag2: "Web • Android • iOS",
    tag3: "₹250/employee/month",
    color: "#1b4fd8",
    textColor: "text-white",
    borderColor: "white",
    description: "Complete tracking and analytics package for teams with field operations. Adds real-time GPS location tracking, geo-fencing alerts, advanced admin control reporting, and document manager with PDF/Excel exports.",
    video: "",
    image: "https://hubsched.com/static/image/realtimegpstracking.webp"
  },
  {
    id: "04",
    name: "CUSTOM DEPLOYMENT",
    tag1: "Custom Integrations",
    tag2: "Web • Android • iOS • Hardware",
    tag3: "Tailored Quote",
    color: "#1b4fd8",
    textColor: "text-white",
    borderColor: "white",
    description: "Built for large enterprises requiring bespoke HRMS integrations, connection with existing physical biometric scanners, custom module additions, API access, and a dedicated customer success support manager.",
    video: "",
    image: "https://hubsched.com/static/image/web%20Dashboard.webp"
  }
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    if (window.innerWidth >= 991 && containerRef.current) {
      let trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%",
        pin: ".projects-sticky",
        scrub: 1,
        onUpdate: (self) => {
          const active = Math.min(
            Math.round(self.progress * (projects.length - 1)),
            projects.length - 1
          );
          setActiveIndex(active);
        }
      });

      return () => {
        window.removeEventListener('resize', handleResize);
        trigger.kill();
      };
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Mobile layout
  if (isMobile) {
    return (
      <div id="pricing" className="section-projects-mobile w-full bg-background py-16">
        <div className="padding-global">
          <div className="container-large">
            <div className="projects-mobile-wrap">
              <div className="flex flex-col gap-12">
                {projects.map((project, i) => (
                  <div key={i} className="projects-mobile-item flex flex-col gap-6">
                    <div className="projects-video-card w-full aspect-[3/2] rounded-2xl overflow-hidden relative bg-[#F8F9FA]">
                      {project.video ? (
                        <div className="projects-video w-full h-full z-10 absolute inset-0">
                          <video autoPlay muted loop playsInline poster={project.image} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                            <source src={project.video} type="video/mp4" />
                          </video>
                        </div>
                      ) : null}
                      <div className="projects-video-img-wrap w-full h-full absolute inset-0 z-0">
                        <img src={project.image} loading="lazy" alt={project.name} className="projects-video-img w-full h-full object-contain" style={{ objectFit: 'contain' }} />
                      </div>
                    </div>

                    <div className="projects-content-wrap flex flex-col gap-4">
                      <h2 className="heading-style-h2 font-heading uppercase text-4xl text-white">
                        {project.name}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                      <div className="flex gap-3 items-center mt-2 flex-wrap">
                        <div className="eyebrow-main is--dark border border-black/10 rounded-full px-4 py-1 text-xs text-white">
                          <div className="eyebrow-text">{project.tag1}</div>
                        </div>
                        <div className="eyebrow-main is--dark border border-black/10 rounded-full px-4 py-1 text-xs text-white">
                          <div className="eyebrow-text">{project.tag2}</div>
                        </div>
                        <div className="eyebrow-main is--dark border border-black/10 rounded-full px-4 py-1 text-xs text-white">
                          <div className="eyebrow-text">{project.tag3}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop sticky split scroll
  return (
    <div ref={containerRef} className="section-projects-wrap w-full relative">
      <section id="pricing" className="anchor-projects" />
      <section className="section-projects w-full h-full relative">
        <div className="projects-sticky">

          {/* Background transitions */}
          <div className="project-background-color">
            <div className="project-bg-color-list">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className={`project-bg-color-item ${activeIndex === i ? 'is-active' : ''}`}
                >
                  <div className="background-color" style={{ backgroundColor: project.color }} />
                </div>
              ))}
            </div>
          </div>

          <div className="padding-global full-height">
            <div className="container-large full-height">
              <div className="projects-padding">

                {/* Structural Wrapper matching Webflow layout */}
                <div className="header-wrapper is--project">

                  {/* Active slide borders */}
                  <div className="projects-border">
                    <div className="project-border-list">
                      {projects.map((project, i) => (
                        <div key={i} className={`project-border-item ${activeIndex === i ? 'is-active' : ''}`}>
                          <div className="project-border" style={{ borderColor: project.borderColor }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top View Button */}
                  <div className="projects-top">
                    <div className="projects-btn w-dyn-list">
                      <div className="projects-btn-list">
                        {projects.map((project, i) => (
                          <div key={i} className={`projects-btn-item ${activeIndex === i ? 'is-active' : ''}`}>
                            <a
                              href="/contact"
                              className="btn-main w-variant-3f868a72-10ee-c7cf-16c8-83bb44488a8a w-inline-block"
                              style={{
                                color: project.textColor === 'text-white' ? 'white' : 'black',
                                borderColor: project.textColor === 'text-white' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'
                              }}
                            >
                              <div className="btn-frame w-variant-3f868a72-10ee-c7cf-16c8-83bb44488a8a">
                                <div className="btn-text w-variant-3f868a72-10ee-c7cf-16c8-83bb44488a8a">GET STARTED</div>
                              </div>
                              <div className="btn-icon-wrap w-variant-3f868a72-10ee-c7cf-16c8-83bb44488a8a">
                                <div className="btn-icon w-variant-3f868a72-10ee-c7cf-16c8-83bb44488a8a w-embed">
                                  <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Content Layout */}
                  <div className="projects-content">

                    {/* Left Column (Text & details) */}
                    <div className="projects-content-left">
                      <div className="projects-heading">

                        {/* Projects text titles */}
                        <div className="projects-title w-dyn-list">
                          <div className="projects-title-list" style={{ transform: `translateY(-${activeIndex * 13.1}em)` }}>
                            {projects.map((project, i) => (
                              <div key={i} className="projects-title-item" style={{ height: '13.1em', display: 'flex', alignItems: 'center' }}>
                                <div className="projects-title-wrap">
                                  <h2 className="heading-style-h2 project-color" style={{
                                    color: project.textColor === 'text-white' ? 'white' : '#1b1c1e',
                                    whiteSpace: 'nowrap',
                                    fontSize: 'clamp(2rem, 5.5vw, var(--_general---general-sizes--14rem))'
                                  }}>
                                    {project.name}
                                  </h2>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Project Index number */}
                        <div className="projects-number-wrap w-dyn-list">
                          <div className="projects-number-list">
                            {projects.map((project, i) => (
                              <div key={i} className={`projects-number-item ${activeIndex === i ? 'is-active' : ''}`}>
                                <div className="projects-number-inner" style={{ color: project.textColor === 'text-white' ? 'white' : '#1b1c1e' }}>
                                  <div className="projects-number">(0</div>
                                  <div className="projects-number">{i + 1}</div>
                                  <div className="projects-number">)</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Project text descriptions */}
                      <div className="max-width-huge w-full relative">
                        <div className="projects-text w-dyn-list">
                          <div className="projects-text-list" style={{ height: 'auto', minHeight: '11em', overflow: 'visible' }}>
                            {projects.map((project, i) => (
                              <div
                                key={i}
                                className={`projects-text-item ${activeIndex === i ? 'is-active' : ''}`}
                              >
                                <p className="text-size-medium project-color" style={{ color: project.textColor === 'text-white' ? 'white' : '#1b1c1e' }}>
                                  {project.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Category Eyebrow Pill elements */}
                      <div className="eyebrow-group" style={{ flexWrap: 'wrap' }}>

                        {/* Tag 1 Category */}
                        <div className="projects-eyebrow-wrap w-dyn-list" style={{ flexShrink: 0 }}>
                          <div className="projects-eyebrow-list">
                            {projects.map((project, i) => (
                              <div key={i} className={`projects-eyebrow-item ${activeIndex === i ? 'is-active' : ''}`}>
                                <div
                                  className={`eyebrow-main ${project.textColor === 'text-white' ? 'is--dark' : ''}`}
                                  style={{
                                    borderColor: project.textColor === 'text-white' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  <div className="eyebrow-text">
                                    {project.tag1}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tag 2 Category */}
                        <div className="projects-eyebrow-wrap w-dyn-list" style={{ flexShrink: 0 }}>
                          <div className="projects-eyebrow-list">
                            {projects.map((project, i) => (
                              <div key={i} className={`projects-eyebrow-item ${activeIndex === i ? 'is-active' : ''}`}>
                                <div
                                  className={`eyebrow-main ${project.textColor === 'text-white' ? 'is--dark' : ''}`}
                                  style={{
                                    borderColor: project.textColor === 'text-white' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  <div className="eyebrow-text">
                                    {project.tag2}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tag 3 Category */}
                        <div className="projects-eyebrow-wrap w-dyn-list" style={{ flexShrink: 0 }}>
                          <div className="projects-eyebrow-list">
                            {projects.map((project, i) => (
                              <div key={i} className={`projects-eyebrow-item ${activeIndex === i ? 'is-active' : ''}`}>
                                <div
                                  className={`eyebrow-main ${project.textColor === 'text-white' ? 'is--dark' : ''}`}
                                  style={{
                                    borderColor: project.textColor === 'text-white' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  <div className="eyebrow-text">
                                    {project.tag3}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Right Column (Videos and visual slide content) */}
                    <div className="project-content-right">
                      <div className="projects-video-wrap w-dyn-list" style={{ height: 'auto' }}>
                        <div className="projects-video-list" style={{ transform: `translateY(-${activeIndex * 100}%)` }}>
                          {projects.map((project, i) => (
                            <div key={i} className="projects-video-item">
                              {project.video ? (
                                <div className="projects-video w-embed z-10 absolute inset-0 w-full h-full">
                                  <video autoPlay muted loop playsInline poster={project.image} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                                    <source src={project.video} type="video/mp4" />
                                  </video>
                                </div>
                              ) : null}
                              <div className="projects-video-img-wrap z-0 absolute inset-0 w-full h-full">
                                <img src={project.image} loading="lazy" alt={project.name} className="projects-video-img w-full h-full object-contain" style={{ objectFit: 'contain' }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
