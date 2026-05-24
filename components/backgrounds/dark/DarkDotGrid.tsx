"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function DarkDotGrid() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (resolvedTheme !== "dark") return null;

  return <div className="dark-dot-grid pointer-events-none" aria-hidden="true" />;
}
DarkDotGrid.displayName = "DarkDotGrid";
