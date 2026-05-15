"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { personalInfo } from "@/lib/data";

const links = [
  { href: personalInfo.github, icon: Github, label: "GitHub" },
  { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
  { href: personalInfo.instagram, icon: Instagram, label: "Instagram" },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.08 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-accent/30 hover:text-accent hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10"
          aria-label={link.label}
        >
          <link.icon size={16} />
        </motion.a>
      ))}
    </div>
  );
}
