"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, Sparkles } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import DotGrid from "@/components/backgrounds/DotGrid";
import DarkDotGrid from "@/components/backgrounds/dark/DarkDotGrid";
import { education } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";

function InstitutionLogo({
  src,
  alt,
  initials,
}: {
  src: string | null;
  alt: string;
  initials: string;
}) {
  const [error, setError] = useState(false);

  if (src && !error) {
    return (
      <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-card">
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-card/80">
      <span className="text-sm sm:text-base font-bold tracking-tight text-subtle">
        {initials}
      </span>
    </div>
  );
}

function getInitials(institution: string) {
  return institution
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default function Education() {
  const isVIT = (name: string) => name.toLowerCase().includes("vellore");

  return (
    <section id="education" className="relative py-24">
      <DotGrid />
      <DarkDotGrid />
      <div className="cinematic-container">
        <SectionHeading
          eyebrow="Education"
          title="Education"
          description="My academic journey and foundations in Computer Science, AI, and problem solving."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 space-y-6"
        >
          {education.map((item) => {
            const current = isVIT(item.institution);
            return (
              <motion.div
                key={item.institution + (item.degree || item.program || "")}
                variants={fadeInUp}
                className="group relative pl-8 sm:pl-10"
              >
                <div className="absolute left-[3px] sm:left-[5px] top-0 bottom-0 w-px bg-border last:hidden" />

                <div className="absolute left-0 top-6 flex items-center justify-center">
                  <span className={`size-[14px] rounded-full border-2 bg-background flex items-center justify-center ${
                    current ? "border-accent" : "border-border"
                  }`}>
                    <span className={`size-[5px] rounded-full ${
                      current ? "bg-accent" : "bg-muted"
                    }`} />
                  </span>
                </div>

                <div className={`group relative ${current ? "border-l-2 border-accent/40 pl-4 -ml-0.5 sm:-ml-0" : ""}`}>
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  <div className="relative bg-card border border-border rounded-xl p-4 sm:p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/[0.1]">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <InstitutionLogo
                        src={item.logo ?? null}
                        alt={item.institution}
                        initials={getInitials(item.institution)}
                      />

                      <div className="flex-1 space-y-3">
                        <div className="space-y-1">
                          <h3 className="text-base font-semibold text-foreground">
                            {item.institution}
                            {current && (
                              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-accent/8 px-2 py-0.5 text-[9px] font-medium text-accent border border-accent/10 align-middle">
                                <Sparkles size={8} />
                                Current
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-accent/80">
                            {item.degree || item.program}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-subtle">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} />
                              {item.period}
                            </span>
                            {item.cgpa && (
                              <span className="flex items-center gap-1.5 text-[#f59e0b]/80">
                                <Award size={12} />
                                {item.cgpa}
                              </span>
                            )}
                            {item.specialization && (
                              <span className="flex items-center gap-1.5 text-accent/60">
                                <Sparkles size={12} />
                                {item.specialization}
                              </span>
                            )}
                          </div>
                        </div>

                        {item.description && (
                          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                            {item.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-1.5 pb-1">
                          {item.skills.slice(0, 5).map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center rounded-full border border-accent/10 bg-accent/8 px-3 py-1 text-[11px] font-medium text-accent whitespace-nowrap"
                            >
                              {skill}
                            </span>
                          ))}
                          {item.skills.length > 5 && (
                            <span className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                              +{item.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
