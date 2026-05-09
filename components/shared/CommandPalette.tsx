"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchData, type SearchItem } from "@/lib/search-data";

const ease = [0.16, 1, 0.3, 1];

function fuzzyMatch(text: string, query: string): boolean {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  let qi = 0;
  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return searchData.slice(0, 8);
    return searchData.filter(
      (item) =>
        fuzzyMatch(item.title, query) ||
        fuzzyMatch(item.description, query) ||
        fuzzyMatch(item.category, query)
    );
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const navigate = useCallback(
    (item: SearchItem) => {
      onClose();
      if (item.href.startsWith("http") || item.href.startsWith("mailto")) {
        window.open(item.href, "_blank", "noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [onClose, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      navigate(results[selectedIndex]);
    }
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const selected = el.children[selectedIndex] as HTMLElement | undefined;
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-start justify-center pt-[12vh] sm:pt-[15vh]"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.25, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90vw] max-w-[560px] rounded-2xl border border-border/60 bg-card/90 shadow-2xl backdrop-blur-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 h-12 sm:h-14 border-b border-border/40">
              <Search size={16} className="text-subtle shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, projects, skills..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle/50"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-subtle">
                <span>ESC</span>
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[360px] overflow-y-auto py-2 px-2 space-y-0.5">
              {results.length === 0 ? (
                <div className="py-8 text-center text-sm text-subtle/60">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                results.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150 ${
                      i === selectedIndex
                        ? "bg-accent/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                    }`}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-card text-[13px]">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{item.title}</span>
                        <span className="shrink-0 rounded-full bg-muted/50 px-1.5 py-0.5 text-[9px] font-medium tracking-wider text-subtle/70 uppercase">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-subtle/60 truncate mt-0.5">{item.description}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
