"use client";

import { motion } from "framer-motion";
import { Zap, Box, Users, RefreshCw } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const principles = [
  {
    icon: Zap,
    title: "Performance First",
    description: "Building scalable systems with speed and efficiency.",
  },
  {
    icon: Box,
    title: "Clean Architecture",
    description: "Maintainable, structured engineering through modular design.",
  },
  {
    icon: Users,
    title: "User-Centered Thinking",
    description: "Interfaces designed for usability, clarity, and human experience.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Learning",
    description: "Constant iteration and growth across every project.",
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
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative bg-card border border-border rounded-xl p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/[0.1]">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 border border-accent/10">
                    <p.icon size={18} className="text-accent" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
