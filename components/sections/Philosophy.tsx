"use client";

import { motion } from "framer-motion";
import { Zap, Box, Users, RefreshCw } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import TiltCard from "@/components/effects/TiltCard";

const principles = [
  {
    icon: Zap,
    title: "Performance First",
    description: "Building scalable systems with speed, high frame rates, and latency efficiency.",
  },
  {
    icon: Box,
    title: "Clean Architecture",
    description: "Maintainable, structured engineering through modular and testable design.",
  },
  {
    icon: Users,
    title: "User-Centered Thinking",
    description: "Interfaces designed with micro-animations, clear hierarchy, and human interaction.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Learning",
    description: "Constant iteration and feedback-driven improvement across every project.",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 relative">
      <div className="cinematic-container">
        <SectionHeading
          eyebrow="Engineering"
          title="How I Build"
          description="Principles that guide every system, interface, and solution I create."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {principles.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="group relative"
            >
              <TiltCard className="h-full">
                <div className="relative h-full bg-card border border-border rounded-xl p-6 transition-all duration-300 group-hover:border-accent/20">
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 border border-accent/10">
                      <p.icon size={18} className="text-accent" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
