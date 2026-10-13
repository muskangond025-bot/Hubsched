"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useTheme } from 'next-themes';

const segments = [
  "-11", "-10", "-09", "-08", "-07", "-06", "-05", "-04", "-03", "-02", "-01",
  "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"
];

export const PremiumFooter = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  const rulerRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLAnchorElement>(null);

  // Ruler horizontal parallax scroll
  useEffect(() => {
    if (!rulerRef.current) return;

    let tl: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      tl = gsap.fromTo(rulerRef.current,
        { x: 50 },
        {
          x: -250,
          ease: "none",
          scrollTrigger: {
            trigger: rulerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      // Force scroll trigger calculations update
      ScrollTrigger.refresh();
    };

    init();

    return () => {
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
      }
    };
  }, []);

  const handleContactMouseMove = (e: React.MouseEvent) => {
    if (!contactBtnRef.current) return;
    const rect = contactBtnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(contactBtnRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleContactMouseLeave = () => {
    if (!contactBtnRef.current) return;
    gsap.to(contactBtnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <footer id="contact" className="footer-wrapper w-full relative bg-[#070b19]" style={{ color: '#ffffff' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes footerMarqueeCheckers {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-email-loop {
          display: flex;
          width: max-content;
          animation: footerMarqueeCheckers 18s linear infinite;
        }
      `}} />

      <div className="spacer" />

      <div className="section-footer w-full">
        <div className="padding-global is--center">
          <div className="container-large full-width">
            <div className="padding-top padding-xxhuge">

              {/* 2. Horizontal Scroll Ruler */}
              <div className="hero-ruler is--footer w-full overflow-hidden relative h-16">
                <div className="ruler-wrapper w-full">
                  <div ref={rulerRef} className="ruler-container flex flex-row whitespace-nowrap">
                    {segments.map((seg, idx) => (
                      <div key={idx} className="ruler-segment inline-flex flex-row items-end">
                        <div className="ruler-long-wrapper flex flex-col items-center">
                          <div className="ruler-long-line" />
                          <div className="ruler-text mt-1 text-xs text-gray-400 font-mono">{seg}</div>
                        </div>
                        {Array.from({ length: 18 }).map((_, i) => (
                          <div key={i} className="ruler-short-line mx-[2px] bg-gray-800 w-[1px] h-2" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Footer Top (Contact Me Layout) */}
              <div className="footer-top flex flex-col items-center justify-center text-center mt-12">
                <div className="heading-style-h1 is-smaller font-heading uppercase text-blue-200 tracking-wider text-xl mb-4">
                  Ready to elevate your brand through videos?
                </div>

                <div className="footer-logo-wrapper relative flex items-center justify-center w-full min-h-[220px]">

                  {/* Desktop letters display */}
                  <span className="footer-letters flex flex-row items-center justify-center gap-1 font-heading text-[12vw] leading-none select-none text-white uppercase">
                    <div className="heading-style-display">C</div>
                    <div className="heading-style-display">O</div>
                    <div className="heading-style-display">N</div>
                    <div className="heading-style-display is-subtract">T</div>
                    <div className="heading-style-display">A</div>
                    <div className="heading-style-display">C</div>
                    <div className="heading-style-display is--next mr-[3vw]">T</div>
                    <div className="heading-style-display">U</div>
                    <div className="heading-style-display">S</div>
                  </span>

                  {/* Mobile letters display */}
                  <div className="footer-letter-mobile hidden flex-row items-center justify-center gap-1 font-heading text-[16vw] leading-none select-none text-white uppercase">
                    <div className="heading-style-display">C</div>
                    <div className="heading-style-display">O</div>
                    <div className="heading-style-display">N</div>
                    <div className="heading-style-display">T</div>
                    <div className="heading-style-display is--next">A</div>
                    <div className="heading-style-display">C</div>
                    <div className="heading-style-display">T</div>
                  </div>

                  {/* Center Overlay Pill Button */}
                  <div className="footer-pill-large absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <a
                      ref={contactBtnRef}
                      onMouseMove={handleContactMouseMove}
                      onMouseLeave={handleContactMouseLeave}
                      href="https://rohanjoshi.in/support"
                      className="btn-main pointer-events-auto bg-white hover:bg-blue-50 border border-white text-[#1b4fd8] rounded-full flex flex-row items-center pl-8 pr-3 py-3 transition-colors duration-300"
                    >
                      <div className="btn-frame mr-6">
                        <div className="btn-text font-bold text-sm tracking-[0.2em] text-[#1b4fd8]">GET QUOTE</div>
                      </div>
                      <div className="btn-icon-wrap bg-[#1b4fd8] text-white rounded-full w-12 h-12 flex items-center justify-center">
                        <div className="btn-icon w-embed">
                          <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </div>

                </div>

                {/* Horizontal Navigation List */}
                <div className="footer-link-list flex flex-row items-center justify-center gap-6 mt-8 mb-16 text-sm font-semibold tracking-widest text-gray-400">
                  <a href="https://rohanjoshi.in/" className="footer-link-inner hover:text-white transition-colors">
                    <div className="footer-link-text">HOME</div>
                  </a>
                  <div className="icon-embed-small text-blue-400 w-4 h-4 flex items-center justify-center w-embed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6145 8.86421V0.679688H9.60064V7.23358L6.87247 9.64817H0.820312V13.5366H8.94212L13.6145 8.86421Z" fill="currentColor" />
                      <path d="M10.7605 15.1358L10.7605 23.3203L14.7744 23.3203L14.7744 16.7664L17.5025 14.3518L23.5547 14.3518L23.5547 10.4634L15.4329 10.4634L10.7605 15.1358Z" fill="currentColor" />
                    </svg>
                  </div>
                  <a href="https://rohanjoshi.in/about-us" className="footer-link-inner hover:text-white transition-colors">
                    <div className="footer-link-text">ABOUT</div>
                  </a>
                  <div className="icon-embed-small text-blue-400 w-4 h-4 flex items-center justify-center w-embed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6145 8.86421V0.679688H9.60064V7.23358L6.87247 9.64817H0.820312V13.5366H8.94212L13.6145 8.86421Z" fill="currentColor" />
                      <path d="M10.7605 15.1358L10.7605 23.3203L14.7744 23.3203L14.7744 16.7664L17.5025 14.3518L23.5547 14.3518L23.5547 10.4634L15.4329 10.4634L10.7605 15.1358Z" fill="currentColor" />
                    </svg>
                  </div>
                  <a href="https://rohanjoshi.in/service" className="footer-link-inner hover:text-white transition-colors">
                    <div className="footer-link-text">SERVICES</div>
                  </a>
                  <div className="icon-embed-small text-blue-400 w-4 h-4 flex items-center justify-center w-embed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6145 8.86421V0.679688H9.60064V7.23358L6.87247 9.64817H0.820312V13.5366H8.94212L13.6145 8.86421Z" fill="currentColor" />
                      <path d="M10.7605 15.1358L10.7605 23.3203L14.7744 23.3203L14.7744 16.7664L17.5025 14.3518L23.5547 14.3518L23.5547 10.4634L15.4329 10.4634L10.7605 15.1358Z" fill="currentColor" />
                    </svg>
                  </div>
                  <a href="https://rohanjoshi.in/support" className="footer-link-inner hover:text-white transition-colors">
                    <div className="footer-link-text">CONTACT</div>
                  </a>
                </div>

              </div>

              {/* 4. Footer Columns Grid (from HubSched Footer) */}
              <div className="footer-grid-wrap w-full max-w-[1440px] mx-auto px-10 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 py-16 border-t border-white/10 text-left font-sans text-sm">
                
                {/* Column 1: Logo & Text */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 font-bold text-lg font-heading tracking-wide" style={{ color: '#ffffff' }}>
                    <span className="text-white">MAKE MY VID</span>
                  </div>
                  <p className="text-xs leading-relaxed max-w-[240px]" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    ELEVATING, EMPOWERING, and EVOLVING brands through cinematic video production and remote editing.
                  </p>
                  <p className="text-[10px] uppercase font-bold tracking-wider mt-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Founded by Rohan Joshi • Mumbai, India
                  </p>
                </div>

                {/* Column 2: Services */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider" style={{ color: '#ffffff' }}>Services</h4>
                  <ul className="flex flex-col gap-2 text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <li><a href="https://rohanjoshi.in/services/multi-city-videos-production" className="hover:text-blue-400 transition-colors">Multi City Production</a></li>
                    <li><a href="https://rohanjoshi.in/services/remote-editing-work" className="hover:text-blue-400 transition-colors">Remote Editing Work</a></li>
                    <li><a href="https://rohanjoshi.in/services/corporate-av" className="hover:text-blue-400 transition-colors">Corporate AV</a></li>
                    <li><a href="https://rohanjoshi.in/services/trade-shows-exhibition-videos" className="hover:text-blue-400 transition-colors">Trade Shows &amp; Expos</a></li>
                  </ul>
                </div>

                {/* Column 3: Quick Links */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider" style={{ color: '#ffffff' }}>Quick Links</h4>
                  <ul className="flex flex-col gap-2 text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <li><a href="https://rohanjoshi.in/all-projects" className="hover:text-blue-400 transition-colors">Projects</a></li>
                    <li><a href="https://rohanjoshi.in/all-blogs" className="hover:text-blue-400 transition-colors">Blogs</a></li>
                    <li><a href="https://rohanjoshi.in/join-us" className="hover:text-blue-400 transition-colors">Join Us</a></li>
                    <li><a href="#testimonials" className="hover:text-blue-400 transition-colors">Reviews</a></li>
                  </ul>
                </div>

                {/* Column 4: Company */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider" style={{ color: '#ffffff' }}>Company</h4>
                  <ul className="flex flex-col gap-2 text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <li><a href="https://rohanjoshi.in/about-us" className="hover:text-blue-400 transition-colors">About Us</a></li>
                    <li><a href="https://rohanjoshi.in/support" className="hover:text-blue-400 transition-colors">Contact &amp; Support</a></li>
                    <li><a href="#faq" className="hover:text-blue-400 transition-colors">FAQs</a></li>
                    <li><a href="https://rohanjoshi.in/" className="hover:text-blue-400 transition-colors">Home</a></li>
                  </ul>
                </div>

                {/* Column 5: Contact Info */}
                <div className="flex flex-col gap-3 text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  <h4 className="font-bold text-xs uppercase tracking-wider" style={{ color: '#ffffff' }}>Contact Info</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">✉</span>
                      <a href="https://rohanjoshi.in/support" className="hover:text-blue-400 transition-colors">support@rohanjoshi.in</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">🌐</span>
                      <a href="https://rohanjoshi.in/" className="hover:text-blue-400 transition-colors">rohanjoshi.in</a>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">📍</span>
                      <span className="leading-relaxed">Mumbai, Maharashtra • Serving Pan-India &amp; Global Clients</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 5. Footer Bottom Copyright & Socials */}
              <div className="footer-bottom w-full max-w-[1440px] mx-auto px-10 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-6 py-8 border-t border-white/10 font-sans text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                <div className="text-center sm:text-left">
                  © 2024–2026 Make My Vid • All Rights Reserved.
                </div>
                
                {/* Social Media Links */}
                <div className="flex items-center gap-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {/* Facebook */}
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
