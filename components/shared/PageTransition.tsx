"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { getLenis } from "@/lib/lenis";

const ease = [0.16, 1, 0.3, 1] as const;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const prevPathname = useRef(pathname);
  const [transitioning, setTransitioning] = useState(false);
  const [loadingBar, setLoadingBar] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (prevPathname.current !== pathname) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: false, duration: 0.5 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setTransitioning(true);
      setLoadingBar(true);
      prevPathname.current = pathname;
      const timer = setTimeout(() => {
        setTransitioning(false);
        setTimeout(() => setLoadingBar(false), 200);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [pathname, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease }}
            className="fixed inset-0 z-[100] bg-background/20 backdrop-blur-[1px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loadingBar && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed top-0 left-0 right-0 h-[2px] z-[110] origin-left pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
