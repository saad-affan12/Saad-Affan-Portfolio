"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useData } from "@/hooks/useData";
import { fadeIn, staggerContainer, fadeInUp, cinematicEase } from "@/lib/utils";
import {
  GitHubIcon,
  LinkedInIcon,
  GmailIcon,
  InstagramIcon,
} from "@/components/shared/BrandIcons";

/* ───────────────────────────────────────────
   Connect links for column 3
   ─────────────────────────────────────────── */
interface ConnectLink {
  icon: React.FC<{ className?: string }>;
  label: string;
  href: string;
}

export default function Footer() {
  const personalInfo = useData("hero", {
    name: "",
    initials: "",
    shortName: "",
    role: "",
    tagline: "",
    description: "",
    email: "",
    location: "",
    birthDate: "",
    github: "",
    linkedin: "",
    instagram: "",
    portfolio: "",
    repo: "",
    resume: "",
    image: "",
    availability: "",
  });
  const settings = useData("settings");
  const footerLinks = settings?.footerLinks ?? { links: [], meta: [], contact: [] };

  /* Filter out Blog from nav links */
  const navLinks = (footerLinks.links || []).filter(
    (l: { label: string }) => l.label !== "Blog",
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const connectLinks: ConnectLink[] = [
    { icon: GitHubIcon, label: "GitHub", href: personalInfo.github },
    { icon: LinkedInIcon, label: "LinkedIn", href: personalInfo.linkedin },
    { icon: GmailIcon, label: "Email", href: `mailto:${personalInfo.email}` },
    { icon: InstagramIcon, label: "Instagram", href: personalInfo.instagram },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeIn}
      className="footer-bg border-t border-border/60 relative overflow-hidden"
    >
      {/* ── Subtle purple reflection overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent dark:via-purple-500/[0.03] to-transparent"
      />

      {/* ── Delicate glow dot in top-left corner ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-600/[0.03] blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        {/* ─── 4-Column Grid ─── */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* ================================
              COLUMN 1 — About
              ================================ */}
          <motion.div
            variants={fadeInUp}
            className="relative lg:border-r lg:border-white/[0.06] lg:pr-6"
          >
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {personalInfo.name || "Mohammed Saad Affan A"}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              AI Systems Builder &bull; Full Stack Developer &bull; Computer
              Science Student at VIT Vellore
            </p>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
              Currently building scalable systems, AI-powered products, and
              modern web applications.
            </p>

            {/* ── Status badge ── */}
            <div className="mt-4 flex items-center gap-1.5 rounded-full bg-emerald-500/[0.07] px-3 py-1 text-xs text-emerald-400/90 w-fit border border-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to Internships &amp; Opportunities
            </div>
          </motion.div>

          {/* ================================
              COLUMN 2 — Navigation
              ================================ */}
          <motion.div
            variants={fadeInUp}
            className="relative lg:border-r lg:border-white/[0.06] lg:pr-6"
          >
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-subtle">
              Navigation
            </h4>

            <nav className="mt-4 flex flex-col gap-2.5">
              {navLinks.map(
                (link: { label: string; href: string }) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group relative w-fit text-sm text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:text-foreground min-h-[36px] flex items-center"
                  >
                    {/* Hover underline accent */}
                    <span className="absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 rounded-full bg-purple-400/60 transition-all duration-200 group-hover:h-1 group-hover:w-1" />
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </motion.div>

          {/* ================================
              COLUMN 3 — Connect
              ================================ */}
          <motion.div
            variants={fadeInUp}
            className="relative lg:border-r lg:border-white/[0.06] lg:pr-6"
          >
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-subtle">
              Connect
            </h4>

            <div className="mt-4 flex flex-col gap-3">
              {connectLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noreferrer"}
                  className="group flex items-center gap-3 transition-all duration-300 hover:translate-x-0.5"
                >
                  {/* Icon container with glass effect */}
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 group-hover:text-purple-300 group-hover:shadow-[0_0_16px_rgba(139,92,246,0.15)]">
                    <Icon className="h-4 w-4" />
                  </span>

                  {/* Label */}
                  <span className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* ─── Bottom Bar ─── */}
        <div className="mt-10 border-t border-white/[0.06] pt-6 md:mt-12 md:pt-6">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
            {/* Left — Copyright */}
            <p className="text-xs text-muted-foreground/60">
              &copy; {year} Mohammed Saad Affan A
            </p>

            {/* Center — Tech stack */}
            <p className="text-xs text-muted-foreground/40">
              Built with
              <span className="mx-1 text-foreground/70">Next.js</span>
              &bull;
              <span className="mx-1 text-foreground/70">TypeScript</span>
              &bull;
              <span className="mx-1 text-foreground/70">Framer Motion</span>
            </p>

            {/* Right — Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.25, ease: cinematicEase }}
              className="group flex items-center gap-1.5 text-xs text-muted-foreground/60 transition-colors duration-200 hover:text-foreground min-h-[36px]"
              aria-label="Scroll to top"
            >
              Back to Top
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUp size={11} />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
