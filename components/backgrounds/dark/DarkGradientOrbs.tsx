"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function DarkGradientOrbs() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (resolvedTheme !== "dark") return null;

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="dark-orb-1 absolute top-[-250px] left-[-200px] w-[700px] h-[700px] rounded-full will-change-transform"
        style={{
          background: "rgba(124, 58, 237, 0.18)",
          filter: "blur(140px)",
          animation: "dark-float-1 14s ease-in-out infinite alternate",
        }}
      />
      <div
        className="dark-orb-2 absolute top-[25%] right-[-150px] w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background: "rgba(168, 85, 247, 0.14)",
          filter: "blur(120px)",
          animation: "dark-float-2 18s ease-in-out infinite alternate",
        }}
      />
      <div
        className="dark-orb-3 absolute bottom-[-150px] left-[35%] w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          background: "rgba(109, 40, 217, 0.12)",
          filter: "blur(100px)",
          animation: "dark-float-3 22s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}
DarkGradientOrbs.displayName = "DarkGradientOrbs";
