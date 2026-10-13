"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, CustomEase } from '@/lib/gsap';

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sticky Title refs
  const stickyTitleRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);

  // 1. Sticky Title Scroll Animation (GSAP Context)
  useEffect(() => {
    const ctx = gsap.context(() => {

      const chars1 = title1Ref.current?.querySelectorAll('.char-span');
      const chars2 = title2Ref.current?.querySelectorAll('.char-span');

      if (chars1 && chars2 && stickyTitleRef.current) {
        // Reset visibility for stacked headings
        gsap.set(title2Ref.current, { visibility: 'visible' });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: stickyTitleRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        });

        const revealDuration = 0.7;
        const fadeOutDuration = 0.7;
        const overlapOffset = 0.15;

        // Heading 1 reveal & fade-out timeline
        const h1Tl = gsap.timeline();
        h1Tl.to(chars1, {
          opacity: 1,
          stagger: { amount: revealDuration, from: "start" },
          duration: revealDuration
        });
        h1Tl.to(chars1, {
          opacity: 0,
          stagger: { amount: fadeOutDuration, from: "end" },
          duration: fadeOutDuration
        });

        // Heading 2 reveal timeline
        const h2Tl = gsap.timeline();
        h2Tl.to(chars2, {
          opacity: 1,
          stagger: { amount: revealDuration, from: "start" },
          duration: revealDuration
        });

        masterTl.add(h1Tl);
        masterTl.add(h2Tl, `-=${overlapOffset}`);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Expertise Cards Scroll Reveal Animation
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const root = containerRef.current?.querySelector('.expertise-cards');
      if (!root) return;

      const pinHeight = root.querySelector('.pin-height');
      const container = root.querySelector('.expertise-container');
      const cards = root.querySelectorAll('.expertise-card');

      if (!pinHeight || !container || cards.length === 0) return;

      // Pin container during scroll
      const pinTrigger = ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        pinSpacing: false,
        scrub: 0.4
      });

      // Set initial card position (offset down off screen)
      gsap.set(cards, {
        yPercent: 50,
        y: 0.5 * window.innerHeight
      });

      // Re-create the Webflow exact custom ease curve for the cards reveal
      CustomEase.create("expertiseCurve", "M0,0 C0,0 0.098,0.613 0.5,0.5 0.899,0.386 1,1 1,1");

      // Animate cards staggered reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4
        }
      });

      // Translate up
      tl.to(cards, {
        yPercent: -50,
        y: -0.5 * window.innerHeight,
        duration: 1,
        stagger: 0.12,
        ease: "expertiseCurve"
      }, 'step');

      // Add random rotation swings
      tl.to(cards, {
        rotation: () => (Math.random() - 0.5) * 20,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power3.out'
      }, 'step');

      // Straighten out rotation at the end
      tl.to(cards, {
        rotation: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power3.in'
      }, 'step+=0.5');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text strings into character spans for fade staggering
  const splitWordsAndChars = (text: string) => {
    return text.split(" ").map((word, wordIdx) => (
      <span key={wordIdx} className="inline-block whitespace-nowrap">
        {word.split("").map((char, charIdx) => (
          <span key={charIdx} className="char-span inline-block opacity-0">
            {char}
          </span>
        ))}
        {/* Trailing space span */}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  };

  // Render square ornaments for checkerboard pattern
  const renderSquareOrnaments = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <div key={i} className="square-ornament">
        <div className="square"></div>
        <div className="square is--black"></div>
        <div className="square is--black"></div>
        <div className="square"></div>
      </div>
    ));
  };

  return (
    <div ref={containerRef} className="w-full">
      {/* 1. CHECKERBOARD MARQUEE (Ticker) */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes ticker-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .ticker-marquee-scroll {
          display: flex;
          width: 300%;
          animation: ticker-scroll 16s linear infinite;
        }
      `}} />
      <section className="section-check-marquee w-full bg-black py-4 border-b border-black/5 overflow-hidden">
        <div className="ticker-section w-full">
          <div className="ticker-component align-center w-full">
            <div className="ticker-main w-full flex">
              <div className="ticker-marquee-scroll flex gap-2">
                {renderSquareOrnaments(40)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN EXPERTISE SECTION */}
      <div className="section-expertise w-full bg-[#1b4fd8] text-white relative flex flex-col justify-start select-none overflow-visible">
        <div className="expertise-outer w-full">
          <div className="padding-global w-full">
            <div className="container-large w-full">
              <div className="expertise-inner w-full">
                <div className="expertise-border w-full">

                  {/* STICKY STAGGER LETTER TITLE WRAPPER */}
                  <section ref={stickyTitleRef} className="sticky-title-wrapper w-full relative">
                    <div className="sticky-title-container w-full h-screen sticky top-0 flex items-center justify-center">
                      <div className="sticky-title-inner text-center flex flex-col items-center justify-center relative w-full">

                        {/* Heading 1: EXPERTISE */}
                        <h2 ref={title1Ref} className="sticky-title-el is--title font-humane text-white text-[14vw] uppercase leading-[0.8] tracking-widest font-bold select-none">
                          {splitWordsAndChars("CORE SUITE")}
                        </h2>

                        {/* Heading 2: Description */}
                        <h2 ref={title2Ref} className="sticky-title-el is--stacked font-sans text-center text-[2.5rem] leading-[1.2] font-semibold text-white max-w-[900px] select-none uppercase">
                          {splitWordsAndChars("Automated Attendance, Smart Payroll, and Workspace Management")}
                        </h2>

                      </div>
                    </div>
                  </section>

                  {/* DESKTOP STICKY STAGGER REVEAL CARDS */}
                  <div className="expertise-cards">
                    <div className="pin-height">
                      <div className="expertise-container">

                        {/* CARD 1: FACE ID+ */}
                        <div className="expertise-card">
                          <div className="media">
                            <div className="expertise-front is--1">
                              <div className="card-inner-top">
                                <div className="eyebrow-main">
                                  <div className="eyebrow-text">AI BIOMETRICS</div>
                                </div>
                                <div className="text-size-large text-weight-medium is--title">FACE ID+</div>
                                <p className="text-size-tiny text-color-secondary text-align-center">
                                  Clock in instantly with secure facial recognition on web and mobile, syncing data in hybrid network zones.
                                </p>
                              </div>
                              <div className="button-group is--card">
                                <a href="#projects" className="btn-main w-inline-block">
                                  <div className="btn-frame">
                                    <div className="btn-text">VIEW</div>
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
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://hubsched.com/static/image/AI%20Face%20attendance.webp" loading="eager" alt="AI Face attendance console screen" className="h-full object-contain rounded-t-2xl" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CARD 2: SMART PAYROLL */}
                        <div className="expertise-card">
                          <div className="media">
                            <div className="expertise-front is--2">
                              <div className="card-inner-top">
                                <div className="eyebrow-main">
                                  <div className="eyebrow-text">COMPLIANCE AUTOMATION</div>
                                </div>
                                <div className="text-size-large text-weight-medium is--title">SMART PAYROLL</div>
                                <p className="text-size-tiny text-color-secondary text-align-center">
                                  Calculate overtime, process statutory PF/ESI/PT deductions, and generate digital payslips automatically.
                                </p>
                              </div>
                              <div className="button-group is--card">
                                <a href="#projects" className="btn-main w-inline-block">
                                  <div className="btn-frame">
                                    <div className="btn-text">VIEW</div>
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
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://hubsched.com/static/image/payroll.webp" loading="eager" alt="Payroll Automation web screen" className="h-full object-contain rounded-t-2xl" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CARD 3: WORKSPACE BOOKINGS */}
                        <div className="expertise-card">
                          <div className="media">
                            <div className="expertise-front is--3">
                              <div className="card-inner-top">
                                <div className="eyebrow-main">
                                  <div className="eyebrow-text">MEET HUB & VISITORS</div>
                                </div>
                                <div className="text-size-large text-weight-medium is--title">WORKSPACE BOOKINGS</div>
                                <p className="text-size-tiny text-color-secondary text-align-center">
                                  Manage digital visitor logs, notify hosts in real-time, and reserve rooms or desks using IoT sensors.
                                </p>
                              </div>
                              <div className="button-group is--card">
                                <a href="#projects" className="btn-main w-inline-block">
                                  <div className="btn-frame">
                                    <div className="btn-text">VIEW</div>
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
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://hubsched.com/static/image/finalpagevister.webp" loading="eager" alt="Workspace MeetHub screen" className="h-full object-contain rounded-t-2xl" />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* MOBILE RESPONSIVE SIMPLE LIST */}
                  <div className="expertise-cards-mobile">
                    <div className="expertise-container-mobile">

                      {/* CARD 1: FACE ID+ */}
                      <div className="expertise-card">
                        <div className="media">
                          <div className="expertise-front is--1">
                            <div className="card-inner-top">
                              <div className="eyebrow-main">
                                <div className="eyebrow-text">AI BIOMETRICS</div>
                              </div>
                              <div className="text-size-large text-weight-medium is--title">FACE ID+</div>
                              <p className="text-size-tiny text-color-secondary text-align-center">
                                Clock in instantly with secure facial recognition on web and mobile, syncing data in hybrid network zones.
                              </p>
                            </div>
                            <div className="button-group is--card">
                              <a href="#projects" className="btn-main w-inline-block">
                                <div className="btn-frame">
                                  <div className="btn-text">VIEW</div>
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
                            <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                              <img src="https://hubsched.com/static/image/AI%20Face%20attendance.webp" loading="eager" alt="AI Face attendance console screen" className="h-full object-contain rounded-t-2xl" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CARD 2: SMART PAYROLL */}
                      <div className="expertise-card">
                        <div className="media">
                          <div className="expertise-front is--2">
                            <div className="card-inner-top">
                              <div className="eyebrow-main">
                                <div className="eyebrow-text">COMPLIANCE AUTOMATION</div>
                              </div>
                              <div className="text-size-large text-weight-medium is--title">SMART PAYROLL</div>
                              <p className="text-size-tiny text-color-secondary text-align-center">
                                Calculate overtime, process statutory PF/ESI/PT deductions, and generate digital payslips automatically.
                              </p>
                            </div>
                            <div className="button-group is--card">
                              <a href="#projects" className="btn-main w-inline-block">
                                <div className="btn-frame">
                                  <div className="btn-text">VIEW</div>
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
                            <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                              <img src="https://hubsched.com/static/image/payroll.webp" loading="eager" alt="Payroll Automation web screen" className="h-full object-contain rounded-t-2xl" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CARD 3: WORKSPACE BOOKINGS */}
                      <div className="expertise-card">
                        <div className="media">
                          <div className="expertise-front is--3">
                            <div className="card-inner-top">
                              <div className="eyebrow-main">
                                <div className="eyebrow-text">MEET HUB & VISITORS</div>
                              </div>
                              <div className="text-size-large text-weight-medium is--title">WORKSPACE BOOKINGS</div>
                              <p className="text-size-tiny text-color-secondary text-align-center">
                                Manage digital visitor logs, notify hosts in real-time, and reserve rooms or desks using IoT sensors.
                              </p>
                            </div>
                            <div className="button-group is--card">
                              <a href="#projects" className="btn-main w-inline-block">
                                <div className="btn-frame">
                                  <div className="btn-text">VIEW</div>
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
                            <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                              <img src="https://hubsched.com/static/image/finalpagevister.webp" loading="eager" alt="Workspace MeetHub screen" className="h-full object-contain rounded-t-2xl" />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
