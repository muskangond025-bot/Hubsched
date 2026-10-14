"use client";

import React, { useEffect, useState } from "react";

export const ViewfinderOverlay: React.FC = () => {
  const [frame, setFrame] = useState(0);

  // Live ticking timecode at 24 FPS
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % (24 * 60));
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  const seconds = Math.floor(frame / 24) % 60;
  const minutes = Math.floor(frame / (24 * 60));
  const frames = frame % 24;
  const timecode = `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none text-black font-mono overflow-hidden z-20">
      {/* 1. 2.39:1 CINEMASCOPE SAFE FRAME GUIDES */}
      <div className="absolute inset-x-6 md:inset-x-12 inset-y-6 md:inset-y-10 border border-black/25 pointer-events-none">
        {/* Top-Left Corner Bracket */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-black" />
        {/* Top-Right Corner Bracket */}
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-black" />
        {/* Bottom-Left Corner Bracket */}
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-black" />
        {/* Bottom-Right Corner Bracket */}
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-black" />

        {/* Center Crosshair Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-black" />
        </div>

        {/* 16:9 Inner Framing Tick Marks */}
        <div className="absolute top-0 left-1/4 w-[1px] h-3 bg-black/40" />
        <div className="absolute top-0 right-1/4 w-[1px] h-3 bg-black/40" />
        <div className="absolute bottom-0 left-1/4 w-[1px] h-3 bg-black/40" />
        <div className="absolute bottom-0 right-1/4 w-[1px] h-3 bg-black/40" />
        <div className="absolute left-0 top-1/2 h-[1px] w-3 bg-black/40 -translate-y-1/2" />
        <div className="absolute right-0 top-1/2 h-[1px] w-3 bg-black/40 -translate-y-1/2" />
      </div>

      {/* 2. TOP TECHNICAL OSD BAR */}
      <div className="absolute top-8 md:top-12 inset-x-8 md:inset-x-16 flex justify-between items-center text-[11px] md:text-xs tracking-wider">
        {/* Left: REC Indicator + Timecode */}
        <div className="flex items-center gap-3 bg-black/5 px-3 py-1.5 rounded-full border border-black/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
          <span className="font-bold tracking-widest text-black">REC</span>
          <span className="text-black/30">•</span>
          <span className="font-mono text-black font-semibold">{timecode}</span>
        </div>

        {/* Center: Camera Model / Title */}
        <div className="hidden sm:flex items-center gap-2 text-black/60 text-[10px] tracking-[0.25em] uppercase font-semibold">
          <span>ARRI ALEXA 35</span>
          <span>•</span>
          <span>MAKE MY VID</span>
        </div>

        {/* Right: Technical Codecs & FPS */}
        <div className="flex items-center gap-2 bg-black/5 px-3 py-1.5 rounded-full border border-black/10 text-black/80 font-medium">
          <span className="text-black font-bold">24.000 FPS</span>
          <span className="text-black/30">•</span>
          <span>4K PRORES 4444</span>
        </div>
      </div>

      {/* 3. SIDE GAUGES (Left: Exposure Index, Right: Audio VU Meters) */}
      {/* Left: Exposure / EV Ladder */}
      <div className="hidden lg:flex absolute left-8 md:left-14 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-[10px] text-black/50">
        <span>+2</span>
        <div className="w-3 h-[1px] bg-black/30" />
        <span>+1</span>
        <div className="w-4 h-[1px] bg-black/50" />
        <span className="text-black font-bold">0.0</span>
        <div className="w-4 h-[1px] bg-black/50" />
        <span>-1</span>
        <div className="w-3 h-[1px] bg-black/30" />
        <span>-2</span>
      </div>

      {/* Right: Audio Level Peak Meters */}
      <div className="hidden lg:flex absolute right-8 md:right-14 top-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-[9px] text-black/60">
        <span className="text-[8px] uppercase tracking-widest text-black/40 mb-1">CH 1/2</span>
        <div className="flex gap-1 h-20 items-end bg-black/5 p-1 rounded border border-black/10">
          <div className="w-1.5 bg-emerald-600 rounded-sm animate-pulse" style={{ height: "68%" }} />
          <div className="w-1.5 bg-emerald-600 rounded-sm animate-pulse" style={{ height: "74%" }} />
        </div>
        <span className="text-black/40 font-mono mt-1">-12dB</span>
      </div>

      {/* 4. BOTTOM CINEMATOGRAPHY METADATA BAR */}
      <div className="absolute bottom-8 md:bottom-12 inset-x-8 md:inset-x-16 flex justify-between items-center text-[10px] md:text-[11px] text-black/80 tracking-wider">
        {/* Left: Lens & Shutter Data */}
        <div className="flex items-center gap-3 bg-black/5 px-3 py-1.5 rounded-full border border-black/10">
          <span>SHUTTER <strong className="text-black">180°</strong></span>
          <span className="text-black/30">•</span>
          <span>IRIS <strong className="text-black">T2.8</strong></span>
          <span className="text-black/30">•</span>
          <span>ISO <strong className="text-black">800</strong></span>
        </div>

        {/* Center: Aspect Ratio & Resolution */}
        <div className="hidden md:flex items-center gap-2 text-black/50 text-[10px] tracking-[0.2em] uppercase">
          <span>2.39:1 ANAMORPHIC</span>
          <span>•</span>
          <span>WHITE BALANCE 5600K</span>
        </div>

        {/* Right: Power & Card Media Status */}
        <div className="flex items-center gap-3 bg-black/5 px-3 py-1.5 rounded-full border border-black/10">
          <span>BAT <strong className="text-emerald-700">98%</strong></span>
          <span className="text-black/30">•</span>
          <span>CARD <strong className="text-black">512GB [RAW]</strong></span>
        </div>
      </div>
    </div>
  );
};
