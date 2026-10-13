const fs = require('fs');
const data = require('./rohanjoshi_homepage_data.json');

const logosJson = JSON.stringify(data.trustedLogos, null, 2);

const content = `"use client";
import React from 'react';

const logos = ${logosJson};

export const TrustedBy = () => {
  const row1 = logos.slice(0, 25);
  const row2 = logos.slice(25);

  return (
    <section id="trusted" className="w-full py-24 bg-background border-t border-b border-white/5 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
          PARTNERSHIPS & CLIENTELE
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
          TRUSTED BY
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-sans">
          Proud to produce high-impact films, corporate AVs, and digital campaigns for over 49+ visionary brands and global enterprises.
        </p>
      </div>

      {/* Row 1 Marquee (Scrolls Left) */}
      <div className="relative w-full overflow-hidden flex items-center mb-6">
        <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-full">
          {[...row1, ...row1].map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-40 h-20 sm:w-48 sm:h-24 px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white border border-white/10 hover:border-white transition-all duration-300 group shrink-0 shadow-md backdrop-blur-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.logoUrl}
                alt={logo.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 Marquee (Scrolls Right) */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap min-w-full">
          {[...row2, ...row2].map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-40 h-20 sm:w-48 sm:h-24 px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white border border-white/10 hover:border-white transition-all duration-300 group shrink-0 shadow-md backdrop-blur-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.logoUrl}
                alt={logo.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

fs.writeFileSync('src/components/sections/TrustedBy.tsx', content);
console.log('Successfully created TrustedBy.tsx with 49 brand logos!');
