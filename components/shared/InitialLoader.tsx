"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

export default function InitialLoader() {
  const [show, setShow] = useState(true);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("portfolio-loaded")) {
      setShow(false);
      return;
    }
    setReady(true);

    // Simulate page assets loading from 0 to 100%
    const duration = 1200; // 1.2 seconds loading
    const intervalTime = 15;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setShow(false);
          sessionStorage.setItem("portfolio-loaded", "true");
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const logoLetters = ["M", "S", "A"];

  return (
    <AnimatePresence>
      {show && ready && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden pointer-events-none"
        >
          {/* Top Panel Sliding Up */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#030712] border-b border-white/[0.03] pointer-events-auto"
          />

          {/* Bottom Panel Sliding Down */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#030712] border-t border-white/[0.03] pointer-events-auto"
          />

          {/* Main Loader Contents */}
          <motion.div
            exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-[210]"
          >
            <div className="space-y-6 text-center">
              {/* Staggered Logo Letters */}
              <div className="flex gap-2 justify-center items-center">
                {logoLetters.map((letter, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.7,
                      ease,
                      delay: idx * 0.1,
                    }}
                    className="text-6xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-secondary"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Progress Percentage Counter */}
              <div className="relative w-48 mx-auto space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-subtle uppercase">
                  <span>loading system</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
