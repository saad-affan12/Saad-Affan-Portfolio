"use client";

import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { sponsorInfo } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

export default function Sponsor() {
  return (
    <section id="sponsor" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ec4899]/[0.03] to-transparent" />
      </div>
      <div className="cinematic-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="group relative"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#ec4899]/20 via-[#3b82f6]/10 to-[#8b5cf6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
          <div className="relative glass-panel-strong p-8 sm:p-12 md:p-16 text-center space-y-6 sm:space-y-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#ec4899]/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#3b82f6]/10 to-transparent rounded-tr-full" />

            <motion.div variants={fadeInUp} className="relative space-y-4">
              <SectionHeading
                title={sponsorInfo.title}
                description={sponsorInfo.description}
                align="center"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <a
                href={sponsorInfo.buttonHref}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ec4899] to-[#db2777] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:scale-[1.02]"
              >
                <Heart size={16} className="group-hover/btn:scale-110 transition-transform" />
                {sponsorInfo.buttonLabel}
                <ExternalLink size={14} />
              </a>
            </motion.div>

            <motion.p variants={fadeInUp} className="relative text-xs text-muted-foreground">
              Your support helps me build more open-source projects.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
