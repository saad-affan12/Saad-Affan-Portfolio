"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Download, ChevronDown } from "lucide-react";
import ProfileImage from "@/components/shared/ProfileImage";
import SocialLinks from "@/components/shared/SocialLinks";
import { personalInfo } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/utils";

export default function Hero() {
  const [age, setAge] = useState({ years: 0, decimal: "000000000" });

  useEffect(() => {
    const birth = new Date(personalInfo.birthDate);
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - birth.getTime();
      const years = diff / (365.25 * 24 * 60 * 60 * 1000);
      const whole = Math.floor(years);
      const decimal = String(years - whole).replace("0.", "").slice(0, 9).padEnd(9, "0");
      setAge({ years: whole, decimal });
    };
    update();
    const id = setInterval(update, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90dvh] flex items-center overflow-hidden">
      <div className="w-full cinematic-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <div className="flex flex-col-reverse items-start gap-6 sm:gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col space-y-3 sm:space-y-4">
              <motion.div variants={fadeInUp} className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="inline-block text-2xl sm:text-3xl md:text-5xl xl:text-6xl/none font-bold tracking-tight text-foreground">
                    hey, Saad here
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0, filter: "blur(6px)", y: 6 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="text-sm font-bold min-h-[24px]"
                >
                  <span className="tabular-nums text-gradient-blue">
                    been on earth for {age.years}.{age.decimal} years
                  </span>
                </motion.div>
              </motion.div>
              <motion.p
                variants={fadeInUp}
                className="max-w-[600px] text-xs sm:text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {personalInfo.role}
              </motion.p>
            </div>
            <motion.div variants={scaleIn}>
              <ProfileImage />
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="max-w-2xl space-y-4 text-sm text-muted-foreground leading-relaxed"
          >
            <p>
              I&apos;m Mohammed Saad Affan A, a Computer Science student at{" "}
              <span className="text-foreground/80">Vellore Institute of Technology (VIT)</span>,
              focused on building scalable full-stack applications and intelligent AI-driven systems.
            </p>
            <p>
              I work on modern web technologies, backend engineering, machine learning, and
              futuristic user experiences with a strong focus on performance, architecture, and clean design.
            </p>
            <p>
              Currently exploring AI systems, advanced full-stack engineering, and modern software
              practices while building impactful real-world projects.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent/80 shadow-lg shadow-accent/20 hover:shadow-accent/30"
            >
              View Projects
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={personalInfo.resume}
              className="group relative inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-accent/30 hover:text-foreground hover:bg-accent/5"
            >
              Resume
              <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <SocialLinks />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-subtle" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
