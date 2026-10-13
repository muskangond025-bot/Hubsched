"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sigPathRef = useRef<SVGPathElement>(null);
  const sliceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Portrait Sliver Scroll Shutter Parallax and SVG Signature Animation
  useEffect(() => {
    // Sliver parallax animation
    sliceRefs.current.forEach((slice, idx) => {
      if (!slice) return;
      const direction = idx % 2 === 0 ? 1 : -1;

      gsap.fromTo(slice,
        { y: 35 * direction },
        {
          y: -35 * direction,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    // Signature path scroll-draw animation
    const path = sigPathRef.current;
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: path,
          start: "top 85%",
          end: "bottom 55%",
          scrub: true,
        }
      });
    }
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-intro is--hero w-full bg-background py-32 flex flex-col items-center relative overflow-hidden select-none"
    >
      <header className="section-intro-inner w-full max-w-[1440px] px-4 md:px-8 z-10">
        <div className="padding-global w-full">
          <div className="container-large w-full">

            {/* INTRO GRID WRAPPER */}
            <div className="intro-border flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8 w-full border-t border-black/5 pt-16">

              {/* LEFT COLUMN: DESCRIPTION TEXT & BUTTON */}
              <div className="intro-wrap-left flex-1 flex flex-col justify-start items-start text-left max-w-[640px]">

                {/* Heading */}
                <h2 className="text-size-large is--header font-heading text-white text-[2.5rem] leading-[1.2] uppercase mb-8 tracking-wide">
                  HUBSCHED <span className="text-white/40">FEATURES</span>
                </h2>

                {/* Features List */}
                <div className="flex flex-col gap-6 mb-10 text-left font-sans w-full">
                  
                  {/* Feature 1 */}
                  <div>
                    <h3 className="text-white font-bold text-base mb-1.5 flex items-center gap-2 tracking-wide uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffd600]" />
                      Face Attendance Management
                    </h3>
                    <ul className="text-white/70 text-xs md:text-sm pl-4 list-disc space-y-1 leading-relaxed">
                      <li>HubSched AI Face Attendance lets your team clock in instantly with fast and secure facial recognition.</li>
                      <li>It removes manual errors and buddy punching, giving you clean and reliable attendance data every day.</li>
                    </ul>
                  </div>

                  {/* Feature 2 */}
                  <div>
                    <h3 className="text-white font-bold text-base mb-1.5 flex items-center gap-2 tracking-wide uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffd600]" />
                      Visitor Management
                    </h3>
                    <ul className="text-white/70 text-xs md:text-sm pl-4 list-disc space-y-1 leading-relaxed">
                      <li>Mobile app enabled visitor alerts and approvals.</li>
                      <li>Real-time host notifications.</li>
                      <li>Digital visitor logs for security and compliance.</li>
                    </ul>
                  </div>

                  {/* Feature 3 */}
                  <div>
                    <h3 className="text-white font-bold text-base mb-1.5 flex items-center gap-2 tracking-wide uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffd600]" />
                      IOT-Based Meeting Rooms
                    </h3>
                    <ul className="text-white/70 text-xs md:text-sm pl-4 list-disc space-y-1 leading-relaxed">
                      <li>Smart IoT sensors automate room booking and occupancy tracking.</li>
                      <li>Employees can check availability in real time, reducing booking conflicts.</li>
                      <li>Efficient resource usage leads to streamlined internal meetings.</li>
                    </ul>
                  </div>

                </div>

                {/* About Button */}
                <div className="button-group is-hero">
                  <a href="#projects" className="btn-main w-inline-block hover:scale-[0.98] transition-transform duration-300">
                    <div className="btn-frame">
                      <div className="btn-text">FEATURES</div>
                    </div>
                    <div className="btn-icon-wrap">
                      <div className="btn-icon">
                        <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

              </div>

              {/* RIGHT COLUMN: SLICED PORTRAIT & DONUT LAYERS & SIGNATURE */}
              <div className="intro-wrap-right flex-1 flex flex-col items-center justify-center relative w-full max-w-[480px]">

                {/* PORTRAIT IMAGE WIDGET WITH RINGS */}
                <div className="header-img-container relative flex items-center justify-center w-full aspect-square overflow-visible">

                  {/* Slices Wrapper */}
                  <div className="header-img-wrap relative flex w-[24em] aspect-square rounded-full overflow-hidden border border-black/10 z-10 bg-black">
                    {Array.from({ length: 8 }).map((_, colIndex) => (
                      <div
                        key={colIndex}
                        ref={(el) => { sliceRefs.current[colIndex] = el }}
                        className="relative h-full flex-grow overflow-hidden"
                        style={{ width: '12.5%' }}
                      >
                        <div
                          className="absolute top-[-10%] h-[120%] w-[800%] bg-cover bg-center"
                          style={{
                            backgroundImage: `url('https://hubsched.com/static/image/home%20page%20girl%201.webp')`,
                            left: `-${colIndex * 100}%`,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Concentric Donut Backdrops */}
                  <div className="donut--1" />
                  <div className="donut--2" />
                  <div className="donut--3" />
                  <div className="donut--4" />
                  <div className="donut--5" />
                  <div className="donut--6" />

                </div>

                {/* SIGNATURE ELEMENT UNDER PORTRAIT */}
                <div className="header-sig-wrap w-full max-w-[320px] mt-6 text-[#ffd600] opacity-80 z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 388 109" fill="none" className="header-sig">
                    <path
                      ref={sigPathRef}
                      d="M1.50049 73.5C99.7684 48.8311 153.391 38.0197 246 25C272 21.7144 281 27.5 260.5 47C231.9 71.8675 212.379 83.8182 173 102.5C154 111.514 147.807 105.5 165.5 90.5C208.486 54.0589 235.342 38.9805 285 15.5C304.5 6.2796 312 11.5 304.5 25C290.226 47.8903 263.137 71.5 257 76C244.5 85.1667 244.5 73.943 256 65.5C295.5 36.5 339.5 19.5 386 1.5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

              </div>

            </div>
          </div>
        </div>
      </header>
    </section>
  );
};
