"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const record = async () => {
      const recorded = localStorage.getItem("visitor_recorded");
      if (!recorded) {
        const res = await fetch("/api/visitors", { method: "POST" });
        const data = await res.json();
        if (data.count !== null) {
          localStorage.setItem("visitor_recorded", "true");
        }
      }
    };

    const fetchCount = async () => {
      try {
        const res = await fetch("/api/visitors");
        const data = await res.json();
        setCount(data.count);
      } catch {
        setCount(null);
      }
    };

    fetchCount();
    record();
  }, []);

  if (!mounted || count === null || count === 0) return null;

  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-xs text-subtle/60"
      title="Total visitors"
    >
      {count.toLocaleString()} visitors
    </motion.span>
  );
}
