"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const bands = [
  { className: "aurora-band-1", delay: "0s", duration: "14s", keyframes: "aurora-drift-1", top: "10%", height: "55%" },
  { className: "aurora-band-2", delay: "3s", duration: "18s", keyframes: "aurora-drift-2", top: "25%", height: "45%" },
  { className: "aurora-band-3", delay: "6s", duration: "22s", keyframes: "aurora-drift-3", top: "40%", height: "50%" },
  { className: "aurora-band-4", delay: "2s", duration: "16s", keyframes: "aurora-drift-4", top: "15%", height: "40%" },
];

export default function AuroraBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (resolvedTheme !== "light") return null;

  return (
    <div className="absolute inset-0 overflow-hidden z-[-1] pointer-events-none" aria-hidden="true">
      {bands.map((band) => (
        <div
          key={band.className}
          className={`absolute ${band.className} will-change-transform`}
          style={{
            width: "120%",
            height: band.height,
            borderRadius: "50%",
            filter: "blur(60px)",
            top: band.top,
            left: "-10%",
            animation: `${band.keyframes} ${band.duration} ease-in-out infinite`,
            animationDelay: band.delay,
          }}
        />
      ))}
    </div>
  );
}
AuroraBackground.displayName = "AuroraBackground";
