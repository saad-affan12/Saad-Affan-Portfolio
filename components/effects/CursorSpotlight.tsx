"use client";

import { useTheme } from "next-themes";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useState, useEffect } from "react";

export default function CursorSpotlight() {
  const { theme } = useTheme();
  const { x, y } = useMousePosition();
  const isDark = theme !== "light";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Mobile: static ambient gradient in light mode only
  if (isMobile) {
    if (isDark) return null;
    return (
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: [
            "radial-gradient(120% 60% at 40% 30%, rgba(59,130,246,0.08), transparent 60%)",
            "radial-gradient(100% 50% at 70% 70%, rgba(139,92,246,0.05), transparent 55%)",
            "radial-gradient(80% 40% at 50% 50%, rgba(6,182,212,0.03), transparent 60%)",
          ].join(","),
        }}
      />
    );
  }

  // Desktop dark mode: keep existing subtle glow
  if (isDark) {
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

  // Desktop light mode: premium GPU-optimized ambient glow
  // Using transform with CSS transition avoids repaint (GPU composited)
  const largeGlow = 1000;
  const midGlow = 600;

  return (
    <>
      <div
        className="fixed -z-10 pointer-events-none"
        style={{
          width: largeGlow * 2,
          height: largeGlow * 2,
          left: 0,
          top: 0,
          borderRadius: "50%",
          background: `radial-gradient(${largeGlow}px at center, rgba(59,130,246,0.15), rgba(139,92,246,0.08), transparent 65%)`,
          transform: `translate3d(${x - largeGlow}px, ${y - largeGlow}px, 0)`,
          willChange: "transform",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        className="fixed -z-10 pointer-events-none"
        style={{
          width: midGlow * 2,
          height: midGlow * 2,
          left: 0,
          top: 0,
          borderRadius: "50%",
          background: `radial-gradient(${midGlow * 0.45}px at center, rgba(6,182,212,0.08), rgba(59,130,246,0.05), transparent 60%)`,
          transform: `translate3d(${x - midGlow}px, ${y - midGlow}px, 0)`,
          willChange: "transform",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        className="fixed -z-10 pointer-events-none"
        style={{
          width: 400 * 2,
          height: 400 * 2,
          left: 0,
          top: 0,
          borderRadius: "50%",
          background: `radial-gradient(${200}px at center, rgba(245,158,11,0.04), transparent 60%)`,
          transform: `translate3d(${x - 400}px, ${y - 400}px, 0)`,
          willChange: "transform",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </>
  );
}
