"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { useData } from "@/hooks/useData";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import TiltCard from "@/components/effects/TiltCard";

const projectColors = [
  "from-[#6366F1]/20 via-[#4F46E5]/10 to-[#4338CA]/5",
  "from-[#8B5CF6]/20 via-[#7C3AED]/10 to-[#6D28D9]/5",
  "from-[#06B6D4]/20 via-[#0891B2]/10 to-[#0E7490]/5",
  "from-[#F59E0B]/20 via-[#D97706]/10 to-[#B45309]/5",
];

export default function Projects() {
  const projects = useData('projects', []);
  return (
    <section id="projects" className="py-24 relative">
      <div className="cinematic-container">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Work"
          description="Real-world projects built with focus on performance, architecture, and clean design."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => {
            const initials = (project.name || "").split(" ").map((w) => w ? w[0] : "").join("").slice(0, 3);
            const isFeatured = index === 0;

            return (
              <motion.div
                key={project.name}
                variants={fadeInUp}
                className={isFeatured ? "md:col-span-2" : ""}
              >
                <TiltCard className="h-full">
                  <div className="group relative bg-card border border-border rounded-xl overflow-hidden h-full transition-colors duration-300">
                    <div className="relative w-full aspect-video bg-card overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.name} preview`}
                          className="absolute inset-0 size-full object-cover"
                          loading={index < 2 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${projectColors[index % projectColors.length]}`} />
                      )}
                      {!project.image && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-5xl font-bold text-foreground/5 select-none tracking-tighter">
                            {initials}
                          </div>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border">
                        {project.date}
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {project.name}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {project.description}
                      </p>

                      {project.metrics && project.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.metrics.map((m: string) => (
                            <span
                              key={m}
                              className="inline-flex items-center gap-1 rounded-md bg-accent/5 px-2 py-0.5 text-[10px] font-medium text-accent/80 border border-accent/8"
                            >
                              <span className="size-1 rounded-full bg-accent/40" />
                              {m}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {(project.tags || []).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-accent/8 px-2.5 py-1 text-[10px] font-medium text-accent border border-accent/10"
                          >
                            {tag}
                          </span>
                        ))}
                        {(project.tags || []).length > 3 && (
                          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-subtle">
                            +{(project.tags || []).length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] flex-1 sm:flex-none"
                          >
                            <ExternalLink size={12} />
                            Live
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-accent/30 hover:text-foreground hover:bg-white/5 active:scale-[0.98] flex-1 sm:flex-none"
                        >
                          <Github size={12} />
                          Source
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/saad-affan12"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all on GitHub
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
