"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Download, ChevronDown, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { GithubBrandIcon, LinkedinBrandIcon, EmailBrandIcon } from "@/components/shared/SocialLinks";
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

const HERO_FALLBACK = {
  name: '',
  initials: '',
  role: '',
  shortName: '',
  description: '',
  tagline: '',
  image: '',
  resume: '',
  github: '',
  linkedin: '',
  email: '',
  instagram: '',
  location: '',
  availability: 'Available',
  birthDate: '',
  portfolio: '',
  repo: ''
};

export default function Hero({
  profile,
  contributions,
}: {
  profile?: GitHubProfile | null;
  contributions?: ContributionsResponse | null;
}) {
  const personalInfo = useData('hero', HERO_FALLBACK);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";
  const [age, setAge] = useState({ years: 0, decimal: "000000000" });

  const [gitProfile, setGitProfile] = useState<GitHubProfile | null>(profile ?? null);
  const [gitContributions, setGitContributions] = useState<ContributionsResponse | null>(contributions ?? null);

  // 1. Mount and Fetch GitHub Stats (Runs once)
  useEffect(() => {
    setMounted(true);
    fetch("/api/github")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => {
        if (data.profile) setGitProfile(data.profile);
        if (data.contributions) setGitContributions(data.contributions);
      })
      .catch(() => {});
  }, []);

  // 2. Age Clock Tracker (Runs when birthDate is available)
  useEffect(() => {
    if (!personalInfo?.birthDate) return;
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
  }, [personalInfo.birthDate]);

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
            </div>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              {(personalInfo.description || "").split("\n\n")[0]}
            </p>

            {/* Action Cards Grid */}
            <motion.div 
              variants={fadeInUp} 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl"
            >
              {/* Card 1: View Projects */}
              <Link
                href="/projects"
                data-cursor-label="View Projects"
                className="group relative block rounded-xl overflow-hidden bg-white/[0.02] dark:bg-white/[0.01] border border-[#7C3AED]/12 p-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_0_24px_rgba(124,58,237,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent group-hover:border-accent/20 group-hover:bg-accent/5 transition-all duration-300">
                    <GithubBrandIcon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold text-foreground">View Projects</h3>
                      <ArrowUpRight size={12} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-normal">
                      Explore my work, open-source projects, and repository code.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Card 2: Resume */}
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="Download Resume"
                className="group relative block rounded-xl overflow-hidden bg-white/[0.02] dark:bg-white/[0.01] border border-[#7C3AED]/12 p-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_0_24px_rgba(124,58,237,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent group-hover:border-accent/20 group-hover:bg-accent/5 transition-all duration-300">
                    <FileText size={18} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold text-foreground">Resume</h3>
                      <Download size={12} className="text-muted-foreground group-hover:text-accent group-hover:translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-normal">
                      Download or view my technical resume and qualifications.
                    </p>
                  </div>
                </div>
              </a>

              {/* Card 3: LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="LinkedIn Profile"
                className="group relative block rounded-xl overflow-hidden bg-white/[0.02] dark:bg-white/[0.01] border border-[#7C3AED]/12 p-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_0_24px_rgba(124,58,237,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent group-hover:border-accent/20 group-hover:bg-accent/5 transition-all duration-300">
                    <LinkedinBrandIcon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold text-foreground">LinkedIn</h3>
                      <ArrowUpRight size={12} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-normal">
                      Connect with me professionally and check my career updates.
                    </p>
                  </div>
                </div>
              </a>

              {/* Card 4: Contact */}
              <a
                href={`mailto:${personalInfo.email}`}
                data-cursor-label="Send Email"
                className="group relative block rounded-xl overflow-hidden bg-white/[0.02] dark:bg-white/[0.01] border border-[#7C3AED]/12 p-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_0_24px_rgba(124,58,237,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent group-hover:border-accent/20 group-hover:bg-accent/5 transition-all duration-300">
                    <EmailBrandIcon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold text-foreground">Contact</h3>
                      <ArrowUpRight size={12} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-normal">
                      Send an email or message to discuss hiring or networking.
                    </p>
                  </div>
                </div>
              </a>
            </motion.div>

            <StatsRow />
          </motion.div>

          <motion.div variants={scaleIn} className="lg:col-span-2 order-1 lg:order-2">
            <ProfileCard
              profile={gitProfile}
              contributions={gitContributions}
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
