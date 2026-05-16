"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function MeshGradient() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (resolvedTheme !== "light") return null;

  return <div className="mesh-gradient absolute inset-0 z-[-1] pointer-events-none" aria-hidden="true" />;
}
MeshGradient.displayName = "MeshGradient";
