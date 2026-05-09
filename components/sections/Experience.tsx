"use client";

import { motion } from "framer-motion";
import { Calendar, Building2, Sparkles } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { roadmap } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3b82f6]/[0.01] to-transparent pointer-events-none" />
      <div className="cinematic-container">
        <SectionHeading
          eyebrow="Experience"
          title="Journey So Far"
          description="Academic projects, club involvement, and hands-on work building real systems."
        />

        <div className="relative mt-14">
          <div className="absolute left-[1.125rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#3b82f6]/40 via-[#3b82f6]/10 to-transparent hidden sm:block" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {roadmap.map((item, index) => (
              <motion.div
                key={item.role + item.company}
                variants={fadeInUp}
                className="relative pl-0 sm:pl-10"
              >
                <div className="absolute left-0 top-6 size-[1.125rem] rounded-full border-2 border-accent/30 bg-background hidden sm:flex items-center justify-center">
                  <div className="size-1.5 rounded-full bg-accent glow-dot" />
                </div>

                <div className="group relative">
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  <div className="relative glass-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="space-y-2 sm:space-y-3 flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <h3 className="text-base font-semibold text-foreground">{item.role}</h3>
                          {item.badge && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent/8 px-2.5 py-0.5 text-[10px] font-medium text-accent border border-accent/10">
                              <Sparkles size={10} />
                              {item.badge}
                            </span>
                          )}
                          {item.type && (
                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-subtle">
                              {item.type}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-subtle">
                          <span className="flex items-center gap-1.5">
                            <Building2 size={12} />
                            {item.company}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                        {item.highlights && item.highlights.length > 0 && (
                          <ul className="space-y-1.5 pt-1">
                            {item.highlights.map((h, i) => (
                              <li key={i} className="text-xs text-subtle flex items-start gap-2">
                                <span className="text-accent mt-[3px]">&#x2022;</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
