"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Avoid hydration mismatch by rendering a skeleton placeholder
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 opacity-0" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto shadow-md cursor-pointer focus:outline-none"
      style={{
        backgroundColor: isDark ? "#101010" : "#ffffff",
        borderColor: isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(16, 16, 16, 0.5)",
      }}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {/* Sun Icon */}
        <Sun
          className={`absolute w-full h-full transition-all duration-500 transform ${
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
          strokeWidth={2.5}
          color={isDark ? "#ffffff" : "#101010"}
        />
        {/* Moon Icon */}
        <Moon
          className={`absolute w-full h-full transition-all duration-500 transform ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
          strokeWidth={2.5}
          color={isDark ? "#ffffff" : "#101010"}
        />
      </div>
    </button>
  );
}
