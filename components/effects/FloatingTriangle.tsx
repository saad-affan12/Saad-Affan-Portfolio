"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Triangle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingTriangle() {
  const [triangles, setTriangles] = useState<Triangle[]>([]);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const isDark = theme !== "light";
    const baseOpacity = isDark ? 0.03 : 0.06;
    const items: Triangle[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      rotation: Math.random() * 360,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      opacity: baseOpacity + Math.random() * baseOpacity,
    }));
    setTriangles(items);
  }, [theme]);

  if (!mounted) return null;

  const isDark = theme !== "light";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="triGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isDark ? "#3b82f6" : "#6366f1"} />
            <stop offset="100%" stopColor={isDark ? "#8b5cf6" : "#a78bfa"} />
          </linearGradient>
        </defs>
      </svg>
      {triangles.map((t) => (
        <motion.div
          key={t.id}
          className="absolute"
          style={{
            left: `${t.x}%`,
            top: `${t.y}%`,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            rotate: [t.rotation, t.rotation + 180, t.rotation + 360],
            opacity: [t.opacity, t.opacity * 1.5, t.opacity],
          }}
          transition={{
            duration: t.duration,
            repeat: Infinity,
            delay: t.delay,
            ease: "linear",
          }}
        >
          <svg width={t.size} height={t.size * 0.87} viewBox="0 0 100 87" fill="none">
            <path
              d="M50 2L98 85H2L50 2Z"
              stroke="url(#triGrad)"
              strokeOpacity={isDark ? 0.3 : 0.4}
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
