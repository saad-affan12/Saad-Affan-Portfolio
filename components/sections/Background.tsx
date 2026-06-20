"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import EngineeringBackground from "@/components/background/engineering-background";

export default function Background() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 -z-10">
      {isDark ? (
        <EngineeringBackground />
      ) : (
        // Light theme: intentionally render no animated/background layers.
        // The static light background color is provided via CSS variables in globals.css.
        null
      )}
    </div>
  );
}
