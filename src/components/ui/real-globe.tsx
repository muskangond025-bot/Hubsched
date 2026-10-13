"use client"

import React from "react"

interface RealGlobeProps {
  className?: string
}

export function RealGlobe({ className = "" }: RealGlobeProps) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}>
      {/* Outer atmospheric aura/glow */}
      <div className="absolute inset-0 rounded-full scale-100 opacity-60 blur-xl bg-blue-400/25 animate-pulse" />
      
      {/* The 3D spherical Earth structure */}
      <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.95),_0_0_35px_rgba(110,168,254,0.3)] bg-black border border-white/5">
        
        {/* Animated seamless revolving map background */}
        <div 
          className="absolute inset-0 w-[200%] h-full bg-repeat-x"
          style={{
            backgroundImage: "url('/earth-texture.png')",
            backgroundSize: "50% 100%",
            animation: "spin-earth 32s linear infinite",
            willChange: "background-position",
          }}
        />

        {/* 3D shading overlay to construct the sphere lighting depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.15) 35%, rgba(0, 0, 0, 0.95) 75%)",
          }}
        />

      </div>
    </div>
  )
}
