"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import MagneticButton from "@/components/effects/MagneticButton";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 dotted-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#3b82f6]/[0.02] to-transparent" />

      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-2xl backdrop-blur-xl">
            <div className="radial-spotlight pointer-events-none absolute inset-0" />
            <div className="dotted-grid-sm pointer-events-none absolute inset-0 opacity-50" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent/5 blur-[120px]" />

            <div className="relative z-10 space-y-8 px-6 py-16 sm:px-8 sm:py-20 md:px-16 flex flex-col items-center text-center">
              <motion.span variants={fadeInUp} className="section-label justify-center">
                GET IN TOUCH
              </motion.span>

              <motion.h2
                variants={fadeInUp}
                className="mx-auto max-w-3xl text-3xl sm:text-4xl font-bold tracking-tight text-gradient md:text-5xl xl:text-6xl"
              >
                I&apos;d love to hear from you.
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                Open to collaborations, internships, and intelligent software projects.
              </motion.p>

              <motion.div variants={fadeInUp} className="pt-4">
                <MagneticButton>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="group relative inline-flex items-center gap-3 rounded-full border border-border/80 bg-card/80 px-6 py-3.5 pr-7 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-accent/40 hover:bg-card hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] active:scale-[0.98]"
                  >
                    <span className="relative size-9 shrink-0 overflow-hidden rounded-full border border-border ring-1 ring-foreground/5">
                      <img
                        src="/img/saad.png"
                        alt=""
                        className="size-full object-cover"
                      />
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      Let&apos;s Talk
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
