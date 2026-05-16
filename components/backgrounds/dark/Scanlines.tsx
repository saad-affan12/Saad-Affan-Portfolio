"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Scanlines() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (resolvedTheme !== "dark") return null;

  return <div className="scanlines pointer-events-none" aria-hidden="true" />;
}
Scanlines.displayName = "Scanlines";
