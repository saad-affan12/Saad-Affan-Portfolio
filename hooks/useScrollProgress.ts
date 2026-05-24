"use client";

import { useState, useEffect } from "react";
import { getLenis } from "@/lib/lenis";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const lenis = getLenis();

    if (lenis) {
      const handleScroll = (e: { animatedScroll: number; limit: number; velocity: number; direction: number; progress: number }) => {
        setProgress(Math.min(1, Math.max(0, e.progress)));
        setScrolled(e.animatedScroll > 50);
      };
      lenis.on("scroll", handleScroll);

      const handleResize = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total > 0) {
          setProgress(Math.min(1, window.scrollY / total));
        }
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        lenis.off("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    } else {
      const handleScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? window.scrollY / total : 0);
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return { progress, scrolled };
}
