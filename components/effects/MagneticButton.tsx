"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MagneticButton({
  children,
  className = "",
  href,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  [key: string]: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  const Comp = href ? "a" : motion.div;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
      className={cn("inline-block", className)}
      {...(href ? {} : props)}
    >
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="block">
          {children}
        </a>
      ) : (
        children
      )}
    </motion.div>
  );
}
