"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, Sparkles, Building2 } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { education } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
      <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
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
    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm">
      <span className="text-lg font-bold tracking-tight text-subtle">
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
  return (
    <section id="education" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#3b82f6]/[0.01] to-transparent" />
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
          {education.map((item) => (
            <motion.div
              key={item.institution + (item.degree || item.program || "")}
              variants={fadeInUp}
              className="group relative"
            >
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-[#8b5cf6]/5 opacity-0 transition-opacity duration-500 blur-sm group-hover:opacity-100" />
              <div className="relative glass-card p-6 md:p-8">
                <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row">
                  <InstitutionLogo
                    src={item.logo ?? null}
                    alt={item.institution}
                    initials={getInitials(item.institution)}
                  />

                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.institution}
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

                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-full border border-accent/10 bg-accent/8 px-3 py-1 text-[11px] font-medium text-accent"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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
