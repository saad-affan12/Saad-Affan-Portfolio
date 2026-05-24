"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useData } from "@/hooks/useData";

export default function HeroStatusBadge() {
  const hero = useData('hero');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-5" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400"
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75 dark:bg-emerald-400" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
      </span>
      {hero?.availability || "Available"}
    </motion.div>
  );
}
