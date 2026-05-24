"use client";

import { useTheme } from "next-themes";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useState, useEffect } from "react";

export default function CursorSpotlight() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { x, y } = useMousePosition();
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => { setMounted(true); }, []);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Only render spotlight for dark theme to keep light theme fully static.
  if (!isDark) return null;

  return (
    <>
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(800px at ${x}px ${y}px, rgba(59, 130, 246, 0.05), transparent 60%)`,
        }}
      />
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(400px at ${x}px ${y}px, rgba(139, 92, 246, 0.03), transparent 50%)`,
        }}
      />
    </>
  );
}
