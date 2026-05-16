"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface DotGridProps {
  variant?: "default" | "lg";
}

export default function DotGrid({ variant = "default" }: DotGridProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (resolvedTheme !== "light") return null;

  return (
    <div
      className={`${variant === "lg" ? "dot-grid-lg" : "dot-grid"} absolute inset-0 z-[-1] pointer-events-none`}
      aria-hidden="true"
    />
  );
}
DotGrid.displayName = "DotGrid";
