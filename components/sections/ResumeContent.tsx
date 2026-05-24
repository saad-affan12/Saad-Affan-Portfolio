"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, GraduationCap, MapPin, Calendar, Award, Building2, Sparkles } from "lucide-react";
import { useData } from "@/hooks/useData";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ResumeContent() {
  const personalInfo = useData('hero', { name: '', initials: '', role: '', shortName: '', description: '', tagline: '', image: '', resume: '', github: '', linkedin: '', email: '', instagram: '', location: '', availability: '', birthDate: '', portfolio: '', repo: '' });
  const education = useData('education', []);
  const projects = useData('projects', []);
  const roadmap = useData('roadmap', []);
  const skillsData = useData('skills', []);
  const allSkills = skillsData.flatMap((c) => c.items);
  if (!allSkills.length) {
    // fallback if skills data not loaded yet
  }
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3b82f6]/[0.01] to-transparent pointer-events-none" />
      <div className="cinematic-container">
        <SectionHeading
          eyebrow="Resume"
          title="My Professional Profile"
          description="Academic background, technical skills, and project experience."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Left: Summary Card */}
          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <div className="group relative h-full">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative glass-panel-strong p-5 sm:p-8 space-y-5 sm:space-y-6">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      {personalInfo.name}
                    </h3>
                    <p className="text-sm text-accent font-medium">
                      {personalInfo.role}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={personalInfo.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-accent/80 shadow-lg shadow-accent/20"
                    >
                      <FileText size={12} />
                      View
                    </a>
                    <a
                      href={personalInfo.resume}
                      download
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-accent/30 hover:text-foreground"
                    >
                      <Download size={12} />
                      Download
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-subtle">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={14} />
                    B.Sc Computer Science
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {personalInfo.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    Second Year
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {personalInfo.description.split("\n\n")[0]}
                </p>

                <div>
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-subtle mb-3">
                    Skills & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-accent/8 px-3 py-1 text-[11px] font-medium text-accent border border-accent/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-subtle mb-3">
                    Featured Projects
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projects.map((p) => (
                      <a
                        key={p.name}
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="group/card rounded-xl border border-border bg-card/60 p-4 transition-all duration-300 hover:border-accent/20 hover:bg-card"
                      >
                        <h5 className="text-sm font-medium text-foreground group-hover/card:text-accent transition-colors">
                          {p.name}
                        </h5>
                        <p className="text-[11px] text-subtle mt-1 line-clamp-2">
                          {p.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Education + Experience + GitHub */}
          <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
            {education.map((edu, i) => (
              <div key={edu.institution + (edu.degree || edu.program || i)} className="group relative">
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative glass-card glass-card-border-accent p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 text-accent">
                    <GraduationCap size={16} />
                    <span className="text-xs font-semibold tracking-widest uppercase">Education</span>
                  </div>
                  <h4 className="text-base font-semibold text-foreground">{edu.degree || edu.program}</h4>
                  <p className="text-sm text-accent/80">{edu.institution}</p>
                  <div className="flex items-center gap-3 text-xs text-subtle">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {edu.period}
                    </span>
                    {edu.cgpa && (
                      <span className="flex items-center gap-1 text-[#f59e0b]/80">
                        <Award size={11} />
                        {edu.cgpa}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {edu.skills.slice(0, 6).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-subtle"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {edu.description && (
                    <p className="text-xs text-subtle leading-relaxed line-clamp-3">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Experience Section */}
            <div className="space-y-4">
              {roadmap.filter((r) => r.type !== "project").map((item) => (
                <div key={item.role + item.company} className="group relative">
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  <div className="relative glass-card glass-card-border-accent p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-2 text-accent">
                      <Building2 size={16} />
                      <span className="text-xs font-semibold tracking-widest uppercase">Experience</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-foreground">{item.role}</h4>
                      {item.badge && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/8 px-2 py-0.5 text-[9px] font-medium text-accent border border-accent/10">
                          <Sparkles size={8} />
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-accent/80">{item.company}</p>
                    <div className="flex items-center gap-2 text-[10px] text-subtle">
                      <Calendar size={10} />
                      {item.period}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}

              <div className="text-xs font-semibold tracking-widest uppercase text-subtle pt-2 flex items-center gap-2">
                <span className="w-4 h-px bg-subtle/30" />
                Featured Projects
              </div>

              {roadmap.filter((r) => r.type === "project").map((item) => (
                <div key={item.role + item.company} className="group relative">
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  <div className="relative glass-card glass-card-border-accent p-5 sm:p-6 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-foreground">{item.company}</h4>
                      {item.badge && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/8 px-2 py-0.5 text-[9px] font-medium text-accent border border-accent/10">
                          <Sparkles size={8} />
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-subtle">
                      <Calendar size={10} />
                      {item.period}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub Link Card */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="group relative block"
            >
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative glass-card glass-card-border-accent p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <span className="text-sm font-semibold text-foreground">GitHub</span>
                  </div>
                  <ExternalLink size={14} className="text-subtle group-hover:text-foreground transition-colors" />
                </div>
                <p className="text-xs text-subtle">
                  View my open-source contributions, projects, and repositories.
                </p>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
