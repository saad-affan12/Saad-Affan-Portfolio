"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Code2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import TiltCard from "@/components/effects/TiltCard";
import { useBackgroundState } from "@/components/providers/BackgroundStateProvider";

const TECH_STACK = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "GitHub"];

const RESPONSIBILITIES = [
  "Spearheaded development of scalable full-stack web applications and user interfaces.",
  "Engineered robust frontend architectures and modular reusable components with Next.js.",
  "Optimized API workflows and database queries with Node.js and MongoDB.",
  "Collaborated with product designers and engineering teams in a fast-paced startup workflow."
];

export default function SuperCXSection() {
  const { setActiveDiagram } = useBackgroundState();

  return (
    <section id="supercx" className="py-20 relative overflow-hidden">
      <motion.div
        onViewportEnter={() => setActiveDiagram("supercx")}
        onViewportLeave={() => setActiveDiagram("default")}
        viewport={{ amount: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      />
      {/* Background Decorative Gradient Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

      <div
        onMouseEnter={() => setActiveDiagram("supercx")}
        onMouseLeave={() => setActiveDiagram("default")}
        className="cinematic-container relative"
      >
        {/* Section Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase border border-accent/20 dark:shadow-[0_0_12px_rgba(124,58,237,0.2)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Active Work
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Currently Building @ SuperCX
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Contributing to core product development and scalable engineering as a Full Stack Intern.
          </p>
        </div>

        {/* Credibility Card */}
        <TiltCard className="w-full">
          <div className="relative group overflow-hidden rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-6 sm:p-8 hover:border-accent/30 transition-all duration-300">
            {/* Glowing Spotlight effect */}
            <div className="absolute -inset-px bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

            <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
              {/* Left Column: Branding, Title, Metadata */}
              <div className="space-y-5 flex-1">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-xl bg-black/40 border border-white/[0.08] p-2 overflow-hidden shadow-inner">
                    <img
                      src="/company/supercx-logo.png"
                      alt="SuperCX Logo"
                      className="object-contain w-full h-full rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground tracking-tight">
                      SuperCX Technologies Pvt Ltd
                    </h3>
                    <p className="text-sm font-semibold text-accent/90 mt-0.5">
                      Full Stack Developer Intern
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground/80 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-accent" />
                    May 2026 – Present
                  </span>
                  <span className="hidden sm:inline text-border">•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-accent" />
                    Bengaluru (Remote/Hybrid)
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Contributing to high-performance product workflows and software systems. Involved in end-to-end frontend refinement, server architecture layout, and production-ready deployments.
                </p>

                {/* Key Achievements */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                    Impact & Contributions
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {RESPONSIBILITIES.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground/95 leading-relaxed">
                        <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Stack & Actions */}
              <div className="flex flex-col justify-between md:items-end gap-6 shrink-0 md:w-64 pt-4 md:pt-0 border-t md:border-t-0 border-border/60">
                <div className="space-y-3 w-full">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono md:text-right">
                    Core Internship Stack
                  </h4>
                  <div className="flex flex-wrap md:justify-end gap-1.5">
                    {TECH_STACK.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 rounded-md bg-accent/5 px-2.5 py-1 text-xs font-mono font-medium text-accent border border-accent/10 hover:bg-accent/10 transition-colors"
                      >
                        <Code2 size={12} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="https://github.com/saad-affan12"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-xs font-semibold text-foreground hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 w-full md:w-auto"
                >
                  View Coding Repositories
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
