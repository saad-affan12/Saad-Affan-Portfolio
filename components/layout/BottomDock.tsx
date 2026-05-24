"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, LayoutGrid, FileText, Wrench, ChevronDown } from "lucide-react";
import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";

const fallbackIcons: Record<string, React.ElementType> = {
  home: Home,
  roadmap: Map,
  projects: LayoutGrid,
  resume: FileText,
  tools: Wrench,
};

export default function BottomDock() {
  const settings = useData('settings');
  const dockLinks = settings?.dockLinks ?? [];
  const [expanded, setExpanded] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2"
    >
      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex size-5 sm:size-6 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle dock"
      >
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={10} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-dock rounded-xl sm:rounded-2xl px-1.5 sm:px-3 py-1.5 sm:py-2.5"
          >
            <div className="flex items-center gap-0.5 sm:gap-1.5">
              {dockLinks.map((link, index) => {
                const Icon = fallbackIcons[link.icon] || Home;
                const isHovered = hoveredIndex === index;
                const active = isActive(link.href);

                return (
                  <motion.div
                    key={link.label}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{ scale: 1.2, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "group relative flex items-center justify-center rounded-xl transition-all duration-200 size-9 sm:size-10",
                      isHovered ? "text-foreground bg-accent/8" : "",
                      active ? "text-foreground bg-accent/10" : "text-subtle hover:text-foreground hover:bg-accent/5"
                    )}
                  >
                    <Link href={link.href} aria-label={link.label}>
                      <Icon size={16} />
                    </Link>
                    <span className="absolute -top-9 sm:-top-10 left-1/2 -translate-x-1/2 scale-0 rounded-lg bg-card px-2 py-1.5 text-[10px] sm:text-xs text-foreground opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap border border-border shadow-xl">
                      {link.label}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 size-2 bg-card border-r border-b border-border" />
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
