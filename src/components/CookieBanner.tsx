"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mmv_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem("mmv_cookie_consent", accepted ? "accepted" : "denied");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl bg-[#0f0f14]/95 border border-white/15 text-white backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">🍪</span>
            <div className="space-y-3">
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                We use cookies to ensure that we give you the best experience on our website.{" "}
                <span className="text-red-400 underline cursor-pointer">Learn more</span>.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleChoice(true)}
                  className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleChoice(false)}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
