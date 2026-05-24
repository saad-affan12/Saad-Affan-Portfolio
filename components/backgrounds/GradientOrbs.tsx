"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function GradientOrbs() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (resolvedTheme !== "light") return null;

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="orb orb-1 absolute top-[-200px] left-[-150px] w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background: "rgba(99, 102, 241, 0.10)",
          filter: "blur(120px)",
          animation: "float-orb-1 12s ease-in-out infinite alternate",
        }}
      />
      <div
        className="orb orb-2 absolute top-[30%] right-[-100px] w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          background: "rgba(139, 92, 246, 0.08)",
          filter: "blur(100px)",
          animation: "float-orb-2 16s ease-in-out infinite alternate",
        }}
      />
      <div
        className="orb orb-3 absolute bottom-[-100px] left-[40%] w-[400px] h-[400px] rounded-full will-change-transform"
        style={{
          background: "rgba(56, 189, 248, 0.07)",
          filter: "blur(80px)",
          animation: "float-orb-3 20s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}
GradientOrbs.displayName = "GradientOrbs";
