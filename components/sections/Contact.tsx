"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="cinematic-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 to-violet-950 border border-white/[0.06]">
            <div className="dotted-grid pointer-events-none absolute inset-0 opacity-30" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

            <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 md:px-16">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <motion.div variants={fadeInUp} className="shrink-0 flex justify-center sm:justify-start">
                  <div className="size-16 sm:size-20 rounded-full overflow-hidden ring-2 ring-accent/30 border-2 border-white/[0.08]">
                    <img
                      src={personalInfo.image}
                      alt={personalInfo.name}
                      className="size-full object-cover"
                    />
                  </div>
                </motion.div>

                <div className="flex-1 text-center md:text-left space-y-4">
                  <motion.h2
                    variants={fadeInUp}
                    className="text-3xl sm:text-4xl font-bold tracking-tight text-white md:text-5xl"
                  >
                    Let&apos;s Build Something
                  </motion.h2>
                  <motion.p
                    variants={fadeInUp}
                    className="text-sm leading-relaxed text-zinc-400 md:text-base max-w-xl"
                  >
                    {personalInfo.availability}
                  </motion.p>
                  <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                    >
                      <Mail size={14} />
                      Send Email
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.12] px-5 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-white/[0.25] hover:text-white hover:bg-white/5 active:scale-[0.98]"
                    >
                      <Linkedin size={14} />
                      View LinkedIn
                      <ArrowUpRight size={12} />
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
