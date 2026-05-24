"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const CommandPalette = dynamic(() => import("@/components/shared/CommandPalette"), { ssr: false });

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open]);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12, scale: visible ? 1 : 0.9 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 rounded-xl border border-border/60 bg-card/80 px-3 py-2.5 text-sm text-muted-foreground shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-accent/20 hover:text-foreground hover:bg-card hover:shadow-xl active:scale-[0.97]"
        aria-label="Search"
      >
        <Search size={14} />
        <span className="hidden sm:inline text-xs">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-[9px] font-medium text-subtle/70 ml-1">
          <span className="text-[10px]">&#8984;</span>K
        </kbd>
      </motion.button>

      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
