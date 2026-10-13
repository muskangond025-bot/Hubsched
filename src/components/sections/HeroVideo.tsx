"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

export const HeroVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoInnerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // 1. GSAP Scroll Trigger for Video Expansion
  useEffect(() => {
    if (!containerRef.current || !videoInnerRef.current) return;

    const anim = gsap.fromTo(videoInnerRef.current,
      {
        scale: 0.85,
        borderRadius: "96px",
      },
      {
        scale: 1.0,
        borderRadius: "24px",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  // 2. Play/Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch((err) => console.log("Video play interrupted:", err));
      setIsPlaying(true);
    }
  };

  // 3. Pointer move to track custom cursor position
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={containerRef}
      className="hero-video w-full bg-background py-24 flex flex-col items-center relative overflow-hidden"
    >
      <header className="hero-video-border w-full max-w-[1440px] px-4 md:px-8">
        <div className="padding-global w-full">
          <div className="container-large w-full">
            <div className="hero-video-padding w-full py-4">

              {/* VIDEO WRAPPER WITH EXPANSION AND HOVER INTERACTION */}
              <div
                ref={videoInnerRef}
                className="hero-video-inner relative w-full aspect-video rounded-[96px] object-cover justify-center items-center flex overflow-hidden cursor-none select-none border border-black/10 shadow-2xl"
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
                onPointerMove={handlePointerMove}
                onClick={togglePlay}
              >

                {/* VIDEO ELEMENT */}
                <video
                  ref={videoRef}
                  src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176%2F6808ad0ca3423c64b004a0c1_hero-video-NEW-transcode.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* BLACK OVERLAY (adds cinematic depth) */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />

                {/* CUSTOM PLAY/PAUSE FLOATING CURSOR BADGE */}
                {isHovered && (
                  <div
                    className="absolute bg-[#ffd600] text-black font-sans text-xs font-bold tracking-widest uppercase rounded-full w-24 h-24 flex items-center justify-center pointer-events-none z-30 transition-transform duration-75 ease-out shadow-xl"
                    style={{
                      left: cursorPos.x,
                      top: cursorPos.y,
                      transform: 'translate(-50%, -50%) scale(1)',
                    }}
                  >
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </div>
                )}

                {/* BOTTOM RIGHT STATIC TOGGLE INDICATOR */}
                <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="w-14 h-14 bg-black/80 hover:bg-[#ffd600] hover:text-black text-white rounded-full flex items-center justify-center transition-colors duration-300 border border-black/10"
                  >
                    {isPlaying ? (
                      // Pause Icon
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      // Play Icon
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </header>
    </section>
  );
};
