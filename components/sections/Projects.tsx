"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import { projects } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const projectColors = [
  "from-[#3b82f6]/20 via-[#2563eb]/10 to-[#1d4ed8]/5",
  "from-[#8b5cf6]/20 via-[#7c3aed]/10 to-[#6d28d9]/5",
  "from-[#06b6d4]/20 via-[#0891b2]/10 to-[#0e7490]/5",
  "from-[#f59e0b]/20 via-[#d97706]/10 to-[#b45309]/5",
];

export default function Projects() {
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
            const initials = project.name.split(" ").map((w) => w[0]).join("").slice(0, 3);

            return (
              <motion.div
                key={project.name}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="absolute -inset-[0.5px] rounded-xl overflow-hidden pointer-events-none opacity-15 group-hover:opacity-45 transition-opacity duration-700">
                  <motion.div
                    className="absolute -inset-8"
                    style={{
                      background: "conic-gradient(from 0deg, transparent 0deg, #3b82f6 60deg, #8b5cf6 120deg, #06b6d4 180deg, transparent 240deg)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="relative glass-card overflow-hidden">
                  {/* Project Image Banner - 16:9 aspect ratio */}
                  <div className="relative w-full aspect-video bg-card overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.name} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 2}
                        className="object-cover"
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
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {project.name}
                      </h3>
                      <span className="text-xs text-subtle whitespace-nowrap mt-1">{project.date}</span>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-accent/8 px-2.5 py-1 text-[10px] font-medium text-accent border border-accent/10"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-subtle">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-medium text-white"
                        >
                          <ExternalLink size={12} />
                          Live
                        </a>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        <Github size={12} />
                        Source
                      </a>
                    </div>
                  </div>
                </div>
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
