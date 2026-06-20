"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, LayoutGrid, FileText, Wrench, ChevronDown } from "lucide-react";
import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";

import { useBackgroundState } from "@/components/providers/BackgroundStateProvider";

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
  const { setActiveDiagram } = useBackgroundState();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (pathname !== "/") return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      let targetId = "";
      if (href === "/") targetId = "hero";
      else if (href === "/roadmap") targetId = "experience";
      else if (href === "/projects") targetId = "projects";
      else if (href === "/resume") targetId = "education";
      else if (href === "/tools") targetId = "setup";

      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(element, { offset: -80 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
  };

  const getDockDiagramKey = (iconName: string) => {
    if (iconName === "roadmap") return "student-stress";
    if (iconName === "projects") return "smart-attendance";
    if (iconName === "tools") return "supercx";
    if (iconName === "resume") return "neuroadaptive";
    return "default";
  };

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
            className="glass-dock rounded-xl sm:rounded-2xl px-1.5 sm:px-3 py-1.5 sm:py-2.5 dark:shadow-[0_0_24px_rgba(37,99,235,0.15)]"
          >
            <div className="flex items-center gap-0.5 sm:gap-1.5">
              {dockLinks.map((link, index) => {
                const Icon = fallbackIcons[link.icon] || Home;
                const isHovered = hoveredIndex === index;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    aria-label={link.label}
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      setActiveDiagram(getDockDiagramKey(link.icon));
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setActiveDiagram("default");
                    }}
                    className="relative flex items-center justify-center size-9 sm:size-10 group"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.25, 
                        y: -6,
                        boxShadow: "0 0 15px rgba(37, 99, 235, 0.4)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        "flex items-center justify-center rounded-xl transition-all duration-200 size-full",
                        isHovered ? "text-foreground bg-accent/8" : "",
                        active ? "text-foreground bg-accent/10 border border-accent/20" : "text-subtle hover:text-foreground hover:bg-accent/5"
                      )}
                    >
                      <Icon size={16} />
                    </motion.div>
                    <span className="absolute -top-9 sm:-top-10 left-1/2 -translate-x-1/2 scale-0 rounded-lg bg-card px-2 py-1.5 text-[10px] sm:text-xs text-foreground opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap border border-border shadow-xl">
                      {link.label}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 size-2 bg-card border-r border-b border-border" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
