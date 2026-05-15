"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import GalaxyBackground from "@/components/background/galaxy-background";
import DotGridBackground from "@/components/background/dot-grid-background";

const CursorSpotlight = dynamic(() => import("@/components/effects/CursorSpotlight"), { ssr: false });

export default function Background() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  return (
    <div className="fixed inset-0 -z-10">
      {isDark ? (
        <GalaxyBackground />
      ) : (
        <>
          <GalaxyBackground />
          <DotGridBackground />
        </>
      )}
      <CursorSpotlight />
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#020617]/50 via-transparent to-[#000814]/80 opacity-100"
            : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.015]" />
    </div>
  );
}
