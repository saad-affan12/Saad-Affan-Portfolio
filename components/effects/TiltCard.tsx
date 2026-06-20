"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // Maximum rotation in degrees
}

export default function TiltCard({
  children,
  className = "",
  maxRotation = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for tracking cursor relative positions (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to animate the rotation properties
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxRotation, -maxRotation]), {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxRotation, maxRotation]), {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  // Spotlight position motion values (percentages)
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), {
    stiffness: 150,
    damping: 20,
  });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate cursor position relative to the element (from -0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    // Snap back to original orientation
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative ${className}`}
    >
      {/* Background Hover Spotlight Glow */}
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(400px circle at ${gx} ${gy}, rgba(99, 102, 241, 0.08), transparent 80%)`
          ),
        }}
      />

      {/* Border Spotlight Glow */}
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(150px circle at ${gx} ${gy}, rgba(99, 102, 241, 0.2), transparent 50%)`
          ),
          maskImage: "linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          padding: "1px",
        }}
      />

      {/* Children container with perspective preserve */}
      <div style={{ transform: "translateZ(10px)" }}>{children}</div>
    </motion.div>
  );
}
