"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Download, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import SocialLinks from "@/components/shared/SocialLinks";
import HeroStatusBadge from "@/components/ui/HeroStatusBadge";
import ProfileCard from "@/components/ui/ProfileCard";
import StatsRow from "@/components/sections/StatsRow";
import { useData } from "@/hooks/useData";
import { fadeInUp, staggerContainer, scaleIn, cinematicEase } from "@/lib/utils";
import type { GitHubProfile, ContributionsResponse } from "@/lib/github";

const roles = [
  "Full Stack Developer",
  "AI Systems Builder",
  "Computer Science Student",
  "Building Scalable Systems",
  "Problem Solver",
];

function RoleRotator() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % roles.length), 3800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative h-[1.5em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: cinematicEase }}
          className="text-lg md:text-xl text-muted-foreground font-medium block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function MagneticWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: (e.clientX - r.left - r.width / 2) * 0.12, y: (e.clientY - r.top - r.height / 2) * 0.12 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.12 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Hero({
  profile,
  contributions,
}: {
  profile?: GitHubProfile | null;
  contributions?: ContributionsResponse | null;
}) {
  const personalInfo = useData('hero', { name: '', initials: '', role: '', shortName: '', description: '', tagline: '', image: '', resume: '', github: '', linkedin: '', email: '', instagram: '', location: '', availability: '', birthDate: '', portfolio: '', repo: '' });
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";
  const [age, setAge] = useState({ years: 0, decimal: "000000000" });

  useEffect(() => {
    setMounted(true);
    if (!personalInfo) return;
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
  }, [personalInfo]);

  return (
    <section id="hero" className="relative min-h-[90dvh] flex items-center overflow-hidden">
      <div className="w-full cinematic-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            <div className="flex justify-center sm:justify-start">
              <HeroStatusBadge />
            </div>

            <div className="space-y-2">
              <h1 className="hero-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none bg-clip-text text-transparent"
                style={{
                  backgroundImage: mounted && !isDark
                    ? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #475569 100%)"
                    : "linear-gradient(135deg, #F5F5F5 0%, #F5F5F5 90%, #A1A1AA 100%)"
                }}
              >
                {personalInfo.shortName}
              </h1>
              <RoleRotator />
              {mounted && (
                <p className="text-xs tabular-nums text-accent font-mono truncate max-w-full">
                  been on earth for {age.years}.{age.decimal} years
                </p>
              )}
            </div>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              {(personalInfo.description || "").split("\n\n")[0]}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <MagneticWrap>
                <Link
                  href="/projects"
                  data-cursor-label="View →"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                >
                  View Projects
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </MagneticWrap>
              <MagneticWrap>
                <a
                  href={personalInfo.resume}
                  data-cursor-label="Resume"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-accent/30 hover:text-foreground hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Resume
                  <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
                </a>
              </MagneticWrap>
            </div>

            <motion.div variants={fadeInUp} className="flex justify-center sm:justify-start">
              <SocialLinks />
            </motion.div>

            <StatsRow />
          </motion.div>

          <motion.div variants={scaleIn} className="lg:col-span-2 order-1 lg:order-2">
            <ProfileCard
              profile={profile ?? null}
              contributions={contributions ?? null}
            />
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
