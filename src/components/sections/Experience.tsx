"use client";
import React, { useState, useEffect } from 'react';

interface CardItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  price: string;
  icon: string;
}

const CARDS_DATA: CardItem[] = [
  {
    id: 1,
    title: "Logitech Biometrics",
    description: "Seamless integration with advanced fingerprint and facial recognition biometric devices for real-time office attendance syncing.",
    image: "/enterprise_tracking_1784094192581.png",
    link: "/product/faceid",
    price: "$240",
    icon: "moon-half"
  },
  {
    id: 2,
    title: "Vogue Rosters",
    description: "Optimized shift scheduling, roster management, and overtime tracking for dynamic retail and fashion storefront workforces.",
    image: "/essential_dashboard_1784095488473.png",
    link: "/features",
    price: "$180",
    icon: "clock"
  },
  {
    id: 3,
    title: "Squad Banking",
    description: "Direct salary transfer integrations with fintech and banking APIs for secure, one-click payroll payouts.",
    image: "/professional_dashboard_1784095584244.png",
    link: "/product/smartpayroll",
    price: "$265",
    icon: "moon-crescent"
  },
  {
    id: 4,
    title: "Bamboo HRMS",
    description: "Bidirectional sync with global HR portals and tools to keep employee records, leave configurations, and data updated instantly.",
    image: "/custom_dashboard_1784095603372.png",
    link: "/features",
    price: "$290",
    icon: "layers"
  }
];

const renderIcon = (name: string) => {
  switch (name) {
    case 'moon-half':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18v-8H4c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      );
    case 'moon-crescent':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.1 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.4-8.9 8-9.8.5-.1 1 .2 1.2.7.2.5 0 1.1-.4 1.4-3 2.1-4.7 5.5-4.7 9.2 0 4.6 3.4 8.4 8 9.2.5.1.9.6.8 1.1-.1.7-.5 1.2-1.8 1.2z" />
        </svg>
      );
    case 'clock':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'layers':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    default:
      return null;
  }
};

export const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="section-experience relative w-full overflow-hidden bg-[#1b4fd8] py-24 flex flex-col justify-between" style={{ minHeight: '85vh' }}>
      
      {/* Decorative top strip */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

      {/* Centered Heading */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col z-10 text-left mb-12">
        <h3 className="font-heading text-4xl md:text-6xl text-white uppercase leading-none font-bold tracking-tight">
          WORKPLACE <span className="text-blue-200">INTEGRATIONS</span>
        </h3>
        <p className="font-sans text-xs md:text-sm text-blue-100/70 mt-3 uppercase tracking-widest">
          Connect HubSched with your existing enterprise systems instantly
        </p>
      </div>

      {/* Accordion Grow-Cards List */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 z-10 flex-grow flex items-center justify-center">
        <div className="grow-card-list">
          {CARDS_DATA.map((card, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={card.id}
                className={`grow-card group ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => window.location.href = card.link}
              >
                {/* Exoflora Luxury Card Inner Structure */}
                <div className="w-full h-full flex flex-col justify-between text-white select-none">
                  
                  {/* Top Content Block */}
                  <div>
                    {/* Image Frame */}
                    <div className="grow-card-image-wrap">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Number & Icon Meta Row */}
                    <div className="flex flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">
                      <span>NO. 0{card.id}</span>
                      <span className="text-neutral-400 flex items-center justify-center">
                        {renderIcon(card.icon)}
                      </span>
                    </div>

                    {/* Editorial Title (Serif Italic) */}
                    <h4 className="font-serif italic text-2xl text-white mt-2 mb-1.5 leading-none font-medium text-left">
                      {card.title}
                    </h4>

                    {/* Description */}
                    <p className="font-sans text-[11px] text-neutral-400 leading-relaxed text-left">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Content Block */}
                  <div>
                    {/* Subtle Line Divider */}
                    <div className="w-full h-[1px] bg-white/5 my-3.5" />

                    {/* Price & View Actions */}
                    <div className="flex flex-row justify-between items-center font-sans text-xs">
                      <span className="font-bold text-white text-[13px] tracking-wide">{card.price}</span>
                      <span className="font-semibold text-white/90 group-hover:text-white flex items-center gap-1 text-[10px] uppercase tracking-widest">
                        View &rarr;
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Info Details */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 z-10">
        <div className="text-left max-w-sm sm:max-w-md">
          <p className="font-sans text-[11px] md:text-xs text-blue-100/60 leading-relaxed font-semibold uppercase tracking-wider">
            Real-time biometric attendance syncing, API payroll transfers, and location tracking combined into one automated platform.
          </p>
        </div>
        <div>
          <a
            href="/features"
            className="group inline-flex items-center gap-2 border border-white/20 hover:border-white text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 bg-white/5 hover:bg-white hover:text-[#1b4fd8]"
          >
            Explore Integrations Hub
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
