"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useData } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { getLenis } from "@/lib/lenis";
import MagneticButton from "@/components/effects/MagneticButton";
export default function TopNavbar() {
  const pathname = usePathname();
  const personalInfo = useData('hero', { name: '', initials: '', role: '', shortName: '', description: '', tagline: '', image: '', resume: '', github: '', linkedin: '', email: '', instagram: '', location: '', availability: '', birthDate: '', portfolio: '', repo: '' });
  const settings = useData('settings');
  const topNavLinks = settings?.topNavLinks ?? [];
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href === "/") {
      const element = document.getElementById("hero");
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
  };

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
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="glass-nav rounded-full px-5 py-2 shadow-xl flex items-center gap-5">
          <div className="flex items-center gap-3">
            <MagneticButton>
              <Link
                href="/"
                onClick={(e) => handleLinkClick(e, "/")}
                className="text-sm font-mono font-bold tracking-tight text-foreground hover:text-accent transition-colors block py-1 px-1.5"
              >
                {personalInfo.initials}
              </Link>
            </MagneticButton>
            <span className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/8 px-2 py-0.5 text-[9px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/15 dark:border-emerald-400/15">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75 dark:bg-emerald-400" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              </span>
              Open to Opportunities
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          {topNavLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <MagneticButton key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 py-1 px-1.5 block",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {active && mounted && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
                    />
                  )}
                </Link>
              </MagneticButton>
            );
          })}
          <div className="w-px h-4 bg-border" />
          <ThemeToggle />
        </div>
      </motion.nav>

      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className={cn(
          "flex items-center justify-between h-14 px-4 transition-all duration-300",
          "bg-background/80 backdrop-blur-xl border-b border-border"
        )}>
          <Link
            href="/"
            onClick={(e) => handleLinkClick(e, "/")}
            className="text-base font-mono font-bold tracking-tight text-foreground"
          >
            {personalInfo.initials}
          </Link>
          <div className="flex items-center gap-1.5">
            {mounted && <ThemeToggle />}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
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
                    onClick={(e) => {
                      setMobileOpen(false);
                      handleLinkClick(e, link.href);
                    }}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
