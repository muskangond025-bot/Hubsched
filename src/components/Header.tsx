"use client";

import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from 'next-themes';
import { ArrowUpRight } from 'lucide-react';

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Join Us', href: 'https://rohanjoshi.in/join-us', target: '_blank' },
    { name: 'Blogs', href: 'https://rohanjoshi.in/all-blogs', target: '_blank' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#expertise' },
    { name: 'Supports', href: 'https://rohanjoshi.in/support', target: '_blank' },
  ];

  return (
    <>
      {/* 1. ULTRA-PREMIUM, HIGH-VISIBILITY NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 pointer-events-auto select-none transition-all duration-300 backdrop-blur-2xl border-b ${
          isScrolled
            ? 'py-2.5 md:py-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.8)]'
            : 'py-3.5 md:py-4 shadow-[0_6px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.55)]'
        }`}
        style={{
          backgroundColor: isDark 
            ? (isScrolled ? 'rgba(7, 10, 20, 0.95)' : 'rgba(7, 10, 20, 0.88)') 
            : (isScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.92)'),
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          color: isDark ? '#ffffff' : '#111827',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            
            {/* COLUMN 1: BRAND LOGO */}
            <div className="flex items-center flex-shrink-0">
              <a 
                href="/" 
                className="flex items-center group transition-transform duration-300 hover:scale-105"
                aria-label="Make My Vid Home"
              >
                <div className="relative flex items-center">
                  <div className="absolute -inset-1 bg-red-600/25 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src="https://storage.googleapis.com/mkv_imagesbackend/navbar_logo/677e52686d8ba_navbarlogo.png"
                    alt="Make My Vid Logo"
                    className="h-8 sm:h-9 w-auto object-contain relative z-10"
                  />
                </div>
              </a>
            </div>

            {/* COLUMN 2: CENTER DESKTOP NAVIGATION LINKS WITH EXPLICIT GAPS */}
            <nav 
              className="hidden md:flex items-center"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.target || '_self'}
                  rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="text-[14px] xl:text-[15px] font-medium tracking-normal transition-colors duration-200 relative group"
                  style={{
                    color: isDark ? '#f3f4f6' : '#222938',
                    display: 'inline-block',
                    padding: '6px 8px',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#1b4fd8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isDark ? '#f3f4f6' : '#222938'; }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#1b4fd8] transition-all duration-200 opacity-0 group-hover:opacity-100 rounded-full" />
                </a>
              ))}
            </nav>

            {/* COLUMN 3: THEME TOGGLE & GET QUOTE CTA */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 flex-shrink-0">
              
              {/* Theme Toggle */}
              <div className="transition-opacity duration-300">
                <ThemeToggle />
              </div>

              {/* High-Impact GET QUOTE CTA Button */}
              <a
                href="#contact"
                className="group relative overflow-hidden rounded-full font-mono font-bold text-xs tracking-widest text-white px-5 sm:px-6 py-2.5 bg-gradient-to-r from-[#1b4fd8] to-[#2563eb] hover:from-[#1541b6] hover:to-[#1d4ed8] shadow-[0_4px_18px_rgba(27,79,216,0.4)] hover:shadow-[0_6px_28px_rgba(27,79,216,0.6)] transition-all duration-300 flex items-center gap-2 select-none hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 hidden xs:inline sm:inline">GET QUOTE</span>
                <span className="relative z-10 xs:hidden sm:hidden">QUOTE</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
                <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

            </div>

          </div>
        </div>
      </header>

      {/* 2. AWWWARDS VERTICAL RIBBON WIDGET */}
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
          href="https://rohanjoshi.in" 
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


