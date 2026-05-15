"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { topNavLinks, personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal, Sun, Moon } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function TopNavbar() {
  const { progress, scrolled } = useScrollProgress();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#3b82f6] origin-left z-[60]"
        style={{ transform: `scaleX(${progress})` }}
      />
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-nav shadow-[var(--nav-shadow)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="relative text-lg font-bold tracking-tight text-foreground group"
            >
              <span className="relative z-10">{personalInfo.initials}</span>
              <span className="absolute -inset-2 bg-accent/0 group-hover:bg-accent/5 rounded-lg transition-all duration-300" />
            </Link>

            {/* Centered desktop pill */}
            <div className="hidden md:flex items-center gap-1 bg-card/80 backdrop-blur-xl border border-border/60 rounded-full px-3 py-1.5 shadow-xl">
              {topNavLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300",
                      active
                        ? "text-foreground bg-accent/10 shadow-[0_0_12px_rgba(59,130,246,0.08)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/8 to-accent/12 -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
                      />
                    )}
                  </Link>
                );
              })}
              <span className="w-px h-4 bg-border mx-1" />
              <Link
                href="/cli"
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-all"
                aria-label="Terminal"
              >
                <Terminal size={13} />
              </Link>
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-1.5">
              {mounted && (
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="flex size-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-xl border border-border/60 shadow-lg transition-all duration-300 active:scale-90 hover:border-accent/30"
                  aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                >
                  <motion.div
                    key={isDark ? "moon" : "sun"}
                    initial={{ rotate: -45, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {isDark ? (
                      <Moon size={14} className="text-foreground" />
                    ) : (
                      <Sun size={14} className="text-amber-500" />
                    )}
                  </motion.div>
                </button>
              )}
              {!mounted && <div className="size-9" />}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative h-full flex flex-col items-center justify-center gap-5">
              {topNavLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "text-2xl sm:text-3xl font-semibold transition-colors",
                      isActive(link.href) ? "text-accent" : "text-foreground/80 hover:text-accent"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.4, delay: topNavLinks.length * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/cli"
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl sm:text-3xl font-semibold text-foreground/80 hover:text-accent transition-colors flex items-center gap-2"
                >
                  &gt;_ CLI
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: (topNavLinks.length + 1) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-16"
              >
                <ThemeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
