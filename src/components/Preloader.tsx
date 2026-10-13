"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const text = "Make My Vid";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Check if animation already played in this browser session
    const hasSeenIntro = sessionStorage.getItem("mmv_intro_seen");
    if (!hasSeenIntro) {
      setIsVisible(true);

      // Typing effect
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          // Wait and close
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("mmv_intro_seen", "true");
          }, 1200);
        }
      }, 90);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: -40, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070709] text-white select-none pointer-events-none"
        >
          {/* Ambient glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[140px] pointer-events-none" />

          {/* Center Brand Text */}
          <div className="relative flex items-center gap-3">
            <span className="font-serif tracking-tight text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              {displayedText}
            </span>
            {displayedText.length === text.length && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-end gap-1 h-10 ml-2"
              >
                {[36, 18, 30, 22].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [8, h, 12, h] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.7 + i * 0.15,
                      ease: "easeInOut",
                    }}
                    className="w-[3px] bg-red-500 rounded-full"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Subtitle tag */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-xs md:text-sm tracking-[0.3em] uppercase text-zinc-400 font-mono"
          >
            Elevating Brands Through Video
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
