"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useData } from "@/hooks/useData";

export default function Footer() {
  const personalInfo = useData('hero', { name: '', initials: '', role: '', shortName: '', description: '', tagline: '', image: '', resume: '', github: '', linkedin: '', email: '', instagram: '', location: '', availability: '', birthDate: '', portfolio: '', repo: '' });
  const settings = useData('settings');
  const footerLinks = settings?.footerLinks ?? { links: [], meta: [], contact: [] };
  const [year, setYear] = useState(2026);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-bg border-t border-border/60 pb-4 pt-16">
      <div className="cinematic-container">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div className="space-y-3">
            <Link
              href="/"
              className="text-xl font-mono font-bold tracking-tight text-foreground"
            >
              {personalInfo.initials}
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              {personalInfo.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-subtle">
              Links
            </h3>
            <div className="flex flex-col gap-2.5">
              {(footerLinks.links || []).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground link-underline min-h-[44px] flex items-center"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com/saad-affan12/Saad-Affan-Portfolio"
                target="_blank"
                rel="noreferrer"
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground link-underline min-h-[44px] flex items-center"
              >
                Source Code
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-subtle">
              Contact
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground link-underline min-h-[44px] flex items-center"
              >
                Email
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground link-underline min-h-[44px] flex items-center"
              >
                LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground link-underline min-h-[44px] flex items-center"
              >
                GitHub
              </a>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground link-underline min-h-[44px] flex items-center"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 sm:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-xs text-subtle">
              &copy; {year} {personalInfo.name}. All rights reserved.
            </p>
            <span className="hidden sm:inline text-subtle/30 text-[10px]">&bull;</span>
            <p className="text-xs text-subtle/60">
              Based in India &middot; GMT+5:30
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-subtle">
              Made with Next.js &amp; <span className="text-red-500/80">&hearts;</span>
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to top
              <ArrowUp size={11} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
