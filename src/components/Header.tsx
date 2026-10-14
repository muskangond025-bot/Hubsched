"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import {
  MoreVertical,
  X,
  ExternalLink,
  Film,
  Sparkles,
  MessageSquare,
  HelpCircle,
  ArrowUpRight
} from "lucide-react";

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  // Exact original data items preserved
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Join Us", href: "https://rohanjoshi.in/join-us", target: "_blank" },
    { name: "Blogs", href: "https://rohanjoshi.in/all-blogs", target: "_blank" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#expertise" },
    { name: "Supports", href: "https://rohanjoshi.in/support", target: "_blank" },
  ];

  const quickLinks = [
    {
      title: "Commercial Showreel",
      desc: "Watch our high-velocity 2026 production reel",
      href: "#",
      icon: Film,
    },
    {
      title: "Production Capabilities",
      desc: "Commercials, 3D motion, VFX and social campaigns",
      href: "#expertise",
      icon: Sparkles,
    },
    {
      title: "Client Testimonials",
      desc: "Verified feedback from enterprise clients",
      href: "#testimonials",
      icon: MessageSquare,
    },
    {
      title: "FAQ & Workflow",
      desc: "Frequently asked questions and timeline details",
      href: "#faq",
      icon: HelpCircle,
    },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "YouTube", href: "https://youtube.com" },
    { name: "Awwwards", href: "https://awwwards.com" },
  ];

  return (
    <>
      {/* Dimmed backdrop overlay when dropdown is open */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            onClick={() => setDropdownOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Header Container (Butter.video style: single left pill, right CTA removed) */}
      <header className="fixed top-3 sm:top-4 md:top-5 left-0 right-0 z-50 pointer-events-none select-none transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-start">

            {/* ========================================================= */}
            {/* BUTTER-STYLE FLOATING PILL NAVBAR                         */}
            {/* Exact Butter.video height, width, font, color & equal gap */}
            {/* ========================================================= */}
            <div ref={dropdownRef} className="relative pointer-events-auto w-full sm:w-auto">
              <div
                className={`flex items-center justify-between sm:justify-start rounded-[1.6rem] transition-all duration-300 border ${
                  isScrolled
                    ? "bg-[#EDEDED]/95 dark:bg-[#1E1E1E]/95 shadow-[0_12px_36px_rgba(0,0,0,0.12)] backdrop-blur-xl border-black/8 dark:border-white/10"
                    : "bg-[#EDEDED] dark:bg-[#1E1E1E] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-black/5 dark:border-white/8"
                }`}
                style={{
                  padding: "1.25rem 2.2rem", // Exact Butter padding (12.5px 22px)
                  color: isDark ? "#EBEBEB" : "#1E1E1E", // Exact Butter font color
                  gap: "44px", // Equal generous gap across navbar items
                }}
              >
                {/* Brand Logo */}
                <a
                  href="/"
                  className="flex items-center flex-shrink-0 transition-opacity duration-200 hover:opacity-75"
                  aria-label="Make My Vid Home"
                >
                  <img
                    src="https://storage.googleapis.com/mkv_imagesbackend/navbar_logo/677e52686d8ba_navbarlogo.png"
                    alt="Make My Vid Logo"
                    className="h-6 sm:h-[26px] w-auto object-contain dark:brightness-110"
                  />
                </a>

                {/* Desktop Nav Items with strict equal gap */}
                <nav
                  className="butter-nav-desktop whitespace-nowrap"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "44px", // Generous equal gap between each nav text link
                  }}
                >
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.target || "_self"}
                      rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                      className="transition-opacity duration-200 text-decoration-none hover:opacity-60 block flex-shrink-0"
                      style={{
                        fontFamily: "'HK Guise', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "15px",
                        lineHeight: 1.5,
                        letterSpacing: "0.04em",
                        fontWeight: 400,
                        color: isDark ? "#EBEBEB" : "#1E1E1E",
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                {/* Three-dots Menu Icon (⋮) with exact matching Butter styling */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-1 rounded-md flex items-center justify-center transition-opacity duration-200 cursor-pointer hover:opacity-60 flex-shrink-0"
                  style={{
                    color: isDark ? "#EBEBEB" : "#1E1E1E",
                  }}
                  aria-label="Toggle navigation menu"
                  aria-expanded={dropdownOpen}
                >
                  {dropdownOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <MoreVertical className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* ========================================================= */}
              {/* BUTTER-STYLE EXPANDING DROPDOWN MENU                      */}
              {/* ========================================================= */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.2, 0.715, 0.205, 0.99] }}
                    className="absolute top-[calc(100%+8px)] left-0 w-[calc(100vw-32px)] sm:w-[420px] max-w-[95vw] rounded-2xl bg-[#EDEDED] dark:bg-[#1E1E1E] border border-black/8 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-4 sm:p-5 z-50 overflow-hidden"
                  >
                    {/* Theme Mode Toggle inside dropdown */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-black/8 dark:border-white/10">
                      <span className="text-[12px] font-mono uppercase tracking-wider text-[#1E1E1E]/60 dark:text-white/60">
                        Appearance Theme
                      </span>
                      <ThemeToggle />
                    </div>

                    {/* Mobile Navigation Links (Shown on small screens) */}
                    <div className="butter-nav-mobile-list py-3 border-b border-black/8 dark:border-white/10 grid-cols-2 gap-3">
                      {navItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          target={item.target || "_self"}
                          rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                          onClick={() => setDropdownOpen(false)}
                          className="px-3.5 py-2 text-[14px] font-sans font-medium text-[#1E1E1E] dark:text-white hover:bg-black/5 dark:hover:bg-white/8 rounded-lg transition-colors flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          {item.target === "_blank" && <ExternalLink className="w-3 h-3 opacity-40" />}
                        </a>
                      ))}
                    </div>

                    {/* Quick Explore Section */}
                    <div className="space-y-1.5 py-3 border-b border-black/8 dark:border-white/10">
                      <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#1E1E1E]/50 dark:text-white/40 px-2 pb-1">
                        Quick Explore
                      </div>
                      {quickLinks.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/8 transition-colors duration-150 group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-black/6 dark:bg-white/10 flex items-center justify-center text-[#1E1E1E] dark:text-white group-hover:bg-[#1b4fd8] group-hover:text-white transition-colors duration-200">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-[14px] font-sans font-semibold text-[#1E1E1E] dark:text-white">
                                  {item.title}
                                </div>
                                <div className="text-[12px] font-sans text-[#1E1E1E]/60 dark:text-white/60 line-clamp-1">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:text-[#1b4fd8] transition-opacity" />
                          </a>
                        );
                      })}
                    </div>

                    {/* Social Channels Bottom Footer */}
                    <div className="pt-3 flex items-center justify-between px-2 text-[12px] font-sans text-[#1E1E1E]/60 dark:text-white/50">
                      <span className="font-mono text-[11px] uppercase tracking-wider">Follow Us</span>
                      <div className="flex items-center gap-3">
                        {socialLinks.map((soc, i) => (
                          <a
                            key={i}
                            href={soc.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1b4fd8] transition-colors"
                          >
                            {soc.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </header>

      {/* Awwwards Vertical Ribbon (Desktop) */}
      <div
        className="awwwards-ribbon hidden lg:block"
        style={{
          position: "fixed",
          zIndex: 40,
          transform: "translateY(-50%)",
          top: "50%",
          right: 0,
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
              <path
                d="M20.047 153.665v-1.9h3.888v-4.093h-3.888v-1.9h10.231v1.9h-4.59v4.093h4.59v1.9zM29.898 142.236c-.331.565-.784.997-1.359 1.294s-1.222.446-1.944.446c-.721 0-1.369-.149-1.943-.446a3.316 3.316 0 0 1-1.36-1.294c-.331-.564-.497-1.232-.497-2.002s.166-1.438.497-2.002a3.316 3.316 0 0 1 1.36-1.294c.574-.297 1.223-.445 1.943-.445.723 0 1.369.148 1.944.445a3.307 3.307 0 0 1 1.359 1.294c.331.564.497 1.232.497 2.002s-.166 1.438-.497 2.002m-1.703-3.347c-.435-.33-.967-.496-1.601-.496-.633 0-1.166.166-1.601.496-.433.332-.649.78-.649 1.346 0 .564.217 1.013.649 1.345.435.331.968.497 1.601.497.634 0 1.166-.166 1.601-.497.435-.332.649-.78.649-1.345.001-.566-.214-1.014-.649-1.346M22.911 134.852v-1.813h1.186a3.335 3.335 0 0 1-.951-1.009 2.423 2.423 0 0 1-.352-1.271c0-.682.19-1.229.57-1.645.381-.413.932-.621 1.652-.621h5.262v1.812h-4.721c-.419 0-.727.096-.921.285-.195.19-.292.447-.292.769 0 .302.115.58.35.833.234.254.577.458 1.03.613.454.156.993.234 1.616.234h2.938v1.813h-7.367zM29.898 125.136a3.314 3.314 0 0 1-1.359 1.294c-.575.297-1.222.445-1.944.445-.721 0-1.369-.148-1.943-.446a3.322 3.322 0 0 1-1.36-1.294c-.331-.565-.497-1.232-.497-2.002 0-.771.166-1.438.497-2.003a3.313 3.313 0 0 1 1.36-1.293c.574-.297 1.223-.446 1.943-.446.723 0 1.369.149 1.944.446s1.028.728 1.359 1.293.497 1.232.497 2.003c.001.759-.194 1.396-.583 1.907M35.481 17.006l-4.782 14.969h-3.266l-2.584-9.682-2.584 9.682h-3.268l-4.782-14.969h3.713l2.673 10.276 2.525-10.276h3.445l2.524 10.276 2.674-10.276zM37.978 27.163c1.426 0 2.496 1.068 2.496 2.495 0 1.425-1.07 2.495-2.496 2.495-1.425 0-2.494-1.07-2.494-2.495-.001-1.427 1.069-2.495 2.494-2.495"
                fill="black"
              />
            </g>
          </svg>
        </a>
      </div>
    </>
  );
};
