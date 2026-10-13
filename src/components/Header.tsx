"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from 'next-themes';

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuCardRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      // 1. Show backdrop blur overlay
      gsap.to(overlayRef.current, { display: 'block', duration: 0 });
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      
      // 2. Slide yellow menu card in from left
      gsap.fromTo(menuCardRef.current,
        { xPercent: -120 },
        { xPercent: 0, duration: 0.8, ease: "power4.out" }
      );

      // 3. Stagger reveal links inside card
      gsap.fromTo(navLinksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.15, ease: "power3.out" }
      );
    } else {
      // 1. Slide yellow menu card out to left
      gsap.to(menuCardRef.current, {
        xPercent: -120,
        duration: 0.6,
        ease: "power4.in",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' });
        }
      });

      // 2. Fade out overlay background
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 1. MAIN HEADER NAVIGATION BAR */}
      <div className="navbar-wrap w-nav fixed top-0 left-0 w-full z-50 pointer-events-auto select-none">
        <div className="navbar-main">
          <div className="padding-global full-height align-center">
            <div className="nav-inner">
              
              {/* Column 1: Menu and Designer Eyebrow */}
              <div id="w-node-_93cc042f-0317-37ba-3357-5f26b01f47ee-b01f47ea" className="navbar-wrapper">
                
                {/* Menu / Close Button */}
                <div 
                  onClick={toggleMenu}
                  className="menu-button cursor-pointer z-50 relative pointer-events-auto"
                >
                  <div className="menu-button-inner flex items-center gap-3">
                    <div className="menu-button-text relative overflow-hidden h-[18px] w-[50px] select-none">
                      <span 
                        className={`menu-text block absolute transition-all duration-300 font-bold tracking-widest text-xs ${isOpen ? 'translate-y-[-150%] opacity-0' : 'translate-y-0 opacity-100'}`}
                        style={{ color: isDark ? '#ffffff' : '#101010' }}
                      >
                        MENU
                      </span>
                      <span 
                        className={`menu-text block absolute transition-all duration-300 font-bold tracking-widest text-xs ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'}`}
                        style={{ color: isDark ? '#ffffff' : '#101010' }}
                      >
                        CLOSE
                      </span>
                    </div>
                    <div 
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#ffd600] border-[#ffd600] text-black rotate-90 scale-110' : ''}`}
                      style={isOpen ? {} : {
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(16, 16, 16, 0.25)',
                        color: isDark ? '#ffffff' : '#101010',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {isOpen ? (
                          <>
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </>
                        ) : (
                          <>
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </>
                        )}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Lead Designer Eyebrow (Hidden when menu is open on small viewports) */}
                <div className={`eyebrow-nav transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}>
                  <div className="eyebrow-wrap is--border-white is--nav">
                    <div className="circle-dot pulse bg-[#ffd600]"></div>
                    <div className="pill-text is--nav">SMART HRMS</div>
                    <a 
                      href="https://hubsched.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="pill-text is--nav text-color-primary"
                    >
                      --&nbsp;&nbsp;HUBSCHED
                    </a>
                  </div>
                </div>

              </div>

              {/* Column 2: Oval Logo (Removed) */}
              <div 
                id="w-node-f3b6ddde-b93b-0c60-ecc0-6b22502bacb1-b01f47ea" 
                className={`logo-nav transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}
              />

              {/* Column 3: Contact button and Theme Toggle */}
              <div 
                id="w-node-_93cc042f-0317-37ba-3357-5f26b01f484a-b01f47ea" 
                className="flex items-center justify-end gap-5 pointer-events-auto z-50"
              >
                {/* Theme Toggle */}
                <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}>
                  <ThemeToggle />
                </div>

                {/* Contact Button */}
                <div 
                  className={`button-group is--nav transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}
                >
                  <a href="#contact" className="btn-main small w-inline-block">
                    <div className="btn-icon-wrap">
                      <div className="btn-icon">
                        <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                          <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor"/>
                        </svg>
                      </div>
                    </div>
                    <div className="btn-frame">
                      <div className="btn-text">BOOK DEMO</div>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC YELLOW MENU OVERLAY REPLICA */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden select-none bg-black/65 backdrop-blur-md transition-opacity duration-300"
      >
        <div className="relative z-50 h-full flex items-center justify-start p-4 md:p-12">
          
          {/* Yellow Card Panel */}
          <div 
            ref={menuCardRef}
            className="w-full max-w-[550px] h-[85vh] md:h-[90vh] rounded-[2.5rem] md:rounded-[3.5rem] bg-[#ffd600] text-black flex flex-col justify-between p-8 md:p-14 relative overflow-hidden shadow-2xl"
          >
            {/* Card corner markings (subtle decoration) */}
            <div className="corners absolute inset-0 pointer-events-none">
              <div className="frame-corner border-black opacity-10"></div>
              <div className="frame-corner is--2 border-black opacity-10"></div>
              <div className="frame-corner is--3 border-black opacity-10"></div>
              <div className="frame-corner is--4 border-black opacity-10"></div>
            </div>

            {/* Top Spacer */}
            <div />

            {/* Menu Links columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full relative z-10">
              
              {/* Column 1: QUICK LINKS */}
              <div className="flex flex-col gap-4 items-start">
                <span className="font-mono text-[11px] font-black tracking-[0.15em] text-black/40 uppercase mb-2">QUICK LINKS</span>
                {[
                  { label: 'Features', link: '#features' },
                  { label: 'Integrations', link: '#experience' },
                  { label: 'Pricing Plans', link: '#pricing' },
                  { label: 'About Us', link: '#about' },
                ].map((item, i) => (
                  <div 
                    key={item.label}
                    ref={el => { if (el) navLinksRef.current[i] = el; }}
                    className="transform translate-y-8 opacity-0"
                  >
                    <a 
                      href={item.link}
                      onClick={toggleMenu}
                      className="font-bold text-xl md:text-2xl hover:translate-x-2 block transition-transform duration-300 select-none text-black hover:opacity-75"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>

              {/* Column 2: PRODUCTS */}
              <div className="flex flex-col gap-4 items-start">
                <span className="font-mono text-[11px] font-black tracking-[0.15em] text-black/40 uppercase mb-2">PRODUCTS</span>
                {[
                  { label: 'FaceID+', link: '#experience' },
                  { label: 'Smart Payroll', link: '#experience' },
                  { label: 'GeoTrace', link: '#experience' },
                  { label: 'MeetHub', link: '#experience' },
                ].map((item, i) => (
                  <div 
                    key={item.label}
                    ref={el => { if (el) navLinksRef.current[i + 4] = el; }}
                    className="transform translate-y-8 opacity-0"
                  >
                    <a 
                      href={item.link}
                      onClick={toggleMenu}
                      className="font-bold text-lg md:text-xl hover:translate-x-2 block transition-transform duration-300 select-none text-black hover:opacity-75"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>

              {/* Column 3: COMPANY */}
              <div className="flex flex-col gap-4 items-start">
                <span className="font-mono text-[11px] font-black tracking-[0.15em] text-black/40 uppercase mb-2">COMPANY</span>
                {[
                  { label: 'About Us', link: '#about' },
                  { label: 'Contact Us', link: '#contact' },
                  { label: 'Pricing', link: '#pricing' },
                  { label: 'Integrations', link: '#experience' },
                ].map((item, i) => (
                  <div 
                    key={item.label}
                    ref={el => { if (el) navLinksRef.current[i + 8] = el; }}
                    className="transform translate-y-8 opacity-0"
                  >
                    <a 
                      href={item.link}
                      onClick={toggleMenu}
                      className="font-bold text-xl md:text-2xl hover:translate-x-2 block transition-transform duration-300 select-none text-black hover:opacity-75"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Social Handles */}
            <div className="flex gap-4 md:gap-6 mt-8 relative z-10 flex-wrap">
              {[
                { name: 'WEBSITE', url: 'https://hubsched.com' },
                { name: 'PLAY STORE', url: 'https://play.google.com/store/apps/details?id=com.nakshatratechnohub.hubsched&pli=1' },
                { name: 'APP STORE', url: 'https://apps.apple.com/in/app/hubsched/id6475716363' },
                { name: 'CONTACT', url: '#contact' },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold tracking-widest text-black/60 hover:text-black transition-colors uppercase font-mono"
                >
                  {soc.name}
                </a>
              ))}
            </div>

          </div>
          
        </div>
      </div>

      {/* 3. AWWWARDS VERTICAL RIBBON WIDGET */}
      <div 
        className="awwwards-ribbon hidden lg:block" 
        style={{ 
          position: 'fixed', 
          zIndex: 999, 
          transform: 'translateY(-50%)', 
          top: '50%', 
          right: 0 
        }}
      >
        <a 
          href="https://hubsched.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:translate-x-[-4px] transition-transform duration-300"
        >
          <svg width="53.08" height="171.358" className="shadow-2xl">
            <path className="js-color-bg" fill="white" d="M0 0h53.08v171.358H0z" />
            <g className="js-color-text" fill="black">
              <path d="M20.047 153.665v-1.9h3.888v-4.093h-3.888v-1.9h10.231v1.9h-4.59v4.093h4.59v1.9zM29.898 142.236c-.331.565-.784.997-1.359 1.294s-1.222.446-1.944.446c-.721 0-1.369-.149-1.943-.446a3.316 3.316 0 0 1-1.36-1.294c-.331-.564-.497-1.232-.497-2.002s.166-1.438.497-2.002a3.316 3.316 0 0 1 1.36-1.294c.574-.297 1.223-.445 1.943-.445.723 0 1.369.148 1.944.445a3.307 3.307 0 0 1 1.359 1.294c.331.564.497 1.232.497 2.002s-.166 1.438-.497 2.002m-1.703-3.347c-.435-.33-.967-.496-1.601-.496-.633 0-1.166.166-1.601.496-.433.332-.649.78-.649 1.346 0 .564.217 1.013.649 1.345.435.331.968.497 1.601.497.634 0 1.166-.166 1.601-.497.435-.332.649-.78.649-1.345.001-.566-.214-1.014-.649-1.346M22.911 134.852v-1.813h1.186a3.335 3.335 0 0 1-.951-1.009 2.423 2.423 0 0 1-.352-1.271c0-.682.19-1.229.57-1.645.381-.413.932-.621 1.652-.621h5.262v1.812h-4.721c-.419 0-.727.096-.921.285-.195.19-.292.447-.292.769 0 .302.115.58.35.833.234.254.577.458 1.03.613.454.156.993.234 1.616.234h2.938v1.813h-7.367zM29.898 125.136a3.314 3.314 0 0 1-1.359 1.294c-.575.297-1.222.445-1.944.445-.721 0-1.369-.148-1.943-.446a3.322 3.322 0 0 1-1.36-1.294c-.331-.565-.497-1.232-.497-2.002 0-.771.166-1.438.497-2.003a3.313 3.313 0 0 1 1.36-1.293c.574-.297 1.223-.446 1.943-.446.723 0 1.369.149 1.944.446s1.028.728 1.359 1.293.497 1.232.497 2.003c.001.759-.194 1.396-.583 1.907M35.481 17.006l-4.782 14.969h-3.266l-2.584-9.682-2.584 9.682h-3.268l-4.782-14.969h3.713l2.673 10.276 2.525-10.276h3.445l2.524 10.276 2.674-10.276zM37.978 27.163c1.426 0 2.496 1.068 2.496 2.495 0 1.425-1.07 2.495-2.496 2.495-1.425 0-2.494-1.07-2.494-2.495-.001-1.427 1.069-2.495 2.494-2.495" fill="black" />
            </g>
          </svg>
        </a>
      </div>
    </>
  );
};
