"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-[46px] h-[24px] rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40 group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span
        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isDark
            ? "bg-[#1e293b] border border-[#334155]"
            : "bg-[#e2e8f0] border border-[#cbd5e1]"
        }`}
      />
      <span
        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 ${
          isDark ? "left-[6px] opacity-100" : "left-[6px] opacity-0"
        }`}
      >
        <Moon size={9} className="text-[#94a3b8]" />
      </span>
      <span
        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 ${
          isDark ? "right-[6px] opacity-0" : "right-[6px] opacity-100"
        }`}
      >
        <Sun size={9} className="text-amber-500" />
      </span>
      <span
        className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          isDark ? "translate-x-0" : "translate-x-[22px]"
        }`}
      />
    </button>
  );
}
