"use client";
import React, { useRef, useState } from "react";
import { useScroll, motion, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  className,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  className?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll relative to viewport center to align active card perfectly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (cardLength === 0) return;
    // Divide [0, 1] range into cardLength equal segments
    const index = Math.min(
      Math.max(0, Math.floor(latest * cardLength)),
      cardLength - 1
    );
    setActiveCard(index);
  });

  return (
    <div ref={containerRef} className="relative w-full z-10">
      {/* Minimalist dual-tone background panel overlay */}
      <div className="absolute inset-0 flex flex-col lg:flex-row z-0 pointer-events-none rounded-[32px] overflow-hidden border border-border/50">
        <div className="w-full lg:w-[45%] bg-[#F5F5F5] dark:bg-[#0d0d0d] transition-colors duration-500" />
        <div className="w-full lg:w-[55%] bg-[#022C22] dark:bg-[#011C15] transition-colors duration-500" />
      </div>

      <div
        className={cn(
          "flex flex-col lg:flex-row justify-between relative gap-8 w-full select-none z-10 px-6 sm:px-12 py-16",
          className
        )}
      >
        {/* Left Column - Natural Page-Scrolling Stepper */}
        <div className="relative flex items-start w-full lg:w-[42%] flex-col gap-6 py-12">
          {content.map((item, index) => (
            <motion.div
              key={item.title + index}
              className={cn(
                "w-full flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 border",
                activeCard === index 
                  ? "bg-background dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 shadow-md translate-x-2"
                  : "bg-background/40 dark:bg-neutral-950/20 border-transparent hover:bg-background/60 dark:hover:bg-neutral-900/40"
              )}
              animate={{
                opacity: activeCard === index ? 1 : 0.4,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className={cn(
                "size-12 rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 transition-all duration-500 shrink-0",
                activeCard === index 
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  : "bg-background dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-600"
              )}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 text-left">
                <span className="text-[9px] font-mono tracking-[0.15em] text-neutral-600 dark:text-neutral-600 uppercase block mb-1">
                  PHASE {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50 leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting Line Column */}
        {cardLength > 1 && (
          <div className="hidden lg:flex lg:w-[8%] justify-center relative my-12">
            <div className="w-[1.5px] h-[85%] bg-neutral-200/50 dark:bg-neutral-800/40 relative flex flex-col justify-between">
              {/* Active glowing indicator that moves along the line */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0d0d0d] shadow-[0_0_14px_rgba(16,185,129,0.7)]"
                animate={{
                  top: `${(activeCard / (cardLength - 1)) * 100}%`,
                  y: "-50%"
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
              {/* Horizontal connector line extending right to point to the card */}
              <motion.div
                className="absolute left-1/2 h-[1.5px] bg-emerald-500 w-[50px] lg:w-[60px]"
                animate={{
                  top: `${(activeCard / (cardLength - 1)) * 100}%`,
                  y: "-50%"
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
            </div>
          </div>
        )}

        {/* Right Column - Sticky Visual Detail Card */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-[20vh] relative z-10 mt-8 lg:mt-0 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "w-full bg-background dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col",
                contentClassName
              )}
            >
              {/* Top Visual Image */}
              <div className="w-full h-48 sm:h-64 relative overflow-hidden bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center">
                {content[activeCard]?.content ?? null}
              </div>

              {/* Bottom Content Detail */}
              <div className="p-6 sm:p-8 flex flex-col text-left">
                <span className="text-[10px] tracking-[0.2em] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-2">
                  PHASE {String(activeCard + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 uppercase tracking-tight mb-3">
                  {content[activeCard]?.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed font-sans font-light">
                  {content[activeCard]?.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default StickyScroll;
