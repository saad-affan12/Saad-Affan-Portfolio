"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startTime = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const statItems = [
  { value: 10, suffix: "+", label: "Projects Built", sublabel: "" },
  { label: "Current @ SuperCX", sublabel: "Full Stack Developer" },
  { label: "Full Stack + AI", sublabel: "Systems Building" },
  { label: "CS Student", sublabel: "@ VIT Vellore" },
];

export default function StatsRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl"
    >
      {statItems.map((stat, i) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-lg px-3 py-2.5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/15 hover:shadow-[0_0_12px_rgba(124,58,237,0.06)]"
        >
          <div className="text-sm font-bold text-foreground leading-tight">
            {"value" in stat ? (
              <AnimatedCounter value={stat.value!} suffix={stat.suffix!} />
            ) : (
              stat.label
            )}
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">
            {stat.sublabel}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
