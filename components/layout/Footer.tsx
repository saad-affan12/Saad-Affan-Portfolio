"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { personalInfo, footerLinks } from "@/lib/data";
import VisitorCount from "@/components/shared/VisitorCount";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/60 pb-12 pt-16">
      <div className="cinematic-container">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-foreground"
            >
              {personalInfo.initials}
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {personalInfo.shortName}
              <br />
              Full-Stack & AI Developer from India.
              <br />
              {personalInfo.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-subtle">
              Links
            </h3>
            <div className="flex flex-col gap-2.5">
              {footerLinks.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-subtle">
              Meta
            </h3>
            <div className="flex flex-col gap-2.5">
              {footerLinks.meta.map((item) => {
                const external = item.href.startsWith("http");
                if (external) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-subtle">
              Contact
            </h3>
            <div className="flex flex-col gap-2.5">
              {footerLinks.contact.map((item) => {
                const external = item.href.startsWith("http") || item.href.startsWith("mailto");
                if (external) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <p className="text-xs text-subtle">
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
              reserved.
            </p>
            <span className="text-xs text-subtle/20 hidden sm:inline">&middot;</span>
            <VisitorCount />
          </div>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-xs text-subtle transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp size={12} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
