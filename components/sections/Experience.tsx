"use client";

import { motion } from "framer-motion";
import { Calendar, Building2, Sparkles, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { useData } from "@/hooks/useData";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export default function Experience() {
  const roadmap = useData('roadmap', []);
  const firstNonProjectIndex = roadmap.findIndex((r) => r.type !== "project");

  return (
    <section id="experience" className="py-24 relative">
      <div className="cinematic-container">
        <SectionHeading
          eyebrow="Experience & Projects"
          title="Journey So Far"
          description="Academic projects, club involvement, and hands-on work building real systems."
        />

        <div className="relative mt-14">
          <div className="absolute left-[1.125rem] top-0 bottom-0 w-px bg-border hidden sm:block" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {roadmap.map((item, index) => {
              const isProject = item.type === "project";
              const isFirstProject =
                isProject && roadmap[index - 1]?.type !== "project";
              const isCurrentRole = index === firstNonProjectIndex;

              return (
                <motion.div
                  key={item.role + item.company}
                  variants={fadeInUp}
                  className="relative pl-0 sm:pl-10"
                >
                  {isFirstProject && (
                    <>
                      <hr className="section-divider my-8 sm:my-10" />
                      <div className="text-xs font-semibold tracking-widest uppercase text-subtle mb-4 sm:mb-6 flex items-center gap-2">
                        <span className="w-4 h-px bg-subtle/30" />
                        Featured Projects
                      </div>
                    </>
                  )}

                  <div className="absolute left-0 top-6 hidden sm:flex items-center justify-center">
                    {isCurrentRole ? (
                      <span className="relative flex size-[18px]">
                        <span className="animate-ping absolute inline-flex size-full rounded-full bg-accent/30 opacity-75" />
                        <span className="relative inline-flex size-[18px] rounded-full border-2 border-accent bg-background items-center justify-center">
                          <span className="size-[6px] rounded-full bg-accent" />
                        </span>
                      </span>
                    ) : (
                      <span className="size-[18px] rounded-full border border-border bg-background flex items-center justify-center">
                        <span className="size-[6px] rounded-full bg-accent/60" />
                      </span>
                    )}
                  </div>

                  <div className="group relative">
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                    <div className="relative bg-card border border-border rounded-xl p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/[0.1]">
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
                            {item.type && item.type !== "project" && (
                              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-subtle">
                                {item.type}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-subtle">
                            <span className="flex items-center gap-2">
                              <Building2 size={12} />
                              {item.logo ? (
                                <span className="flex items-center justify-center rounded-md p-0.5">
                                  <img
                                    src={item.logo}
                                    alt={item.company + ' logo'}
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain rounded-md"
                                  />
                                </span>
                              ) : null}
                              <span>{item.company}</span>
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
                              {item.highlights.slice(0, 3).map((h, i) => (
                                <li key={i} className="text-[13px] text-subtle flex items-start gap-2">
                                  <ArrowRight size={12} className="text-accent mt-0.5 shrink-0" />
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
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
