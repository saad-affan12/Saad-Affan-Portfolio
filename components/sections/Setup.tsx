"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Globe, GitBranch, Beaker, Container, Coffee } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { useData } from "@/hooks/useData";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  terminal: Terminal,
  globe: Globe,
  "git-branch": GitBranch,
  beaker: Beaker,
  container: Container,
  coffee: Coffee,
};

export default function Setup() {
  const settings = useData('settings');
  const setupCards = settings?.setupCards ?? [];
  return (
    <section id="setup" className="py-24 relative">
      <div className="cinematic-container">
        <SectionHeading
          eyebrow="Setup"
          title="My Toolkit"
          description="The tools and technologies powering my daily workflow."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {setupCards.map((card) => {
            const Icon = iconMap[card.icon] || Code2;
            return (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#7C3AED]/10 via-transparent to-[#A855F7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative glass-card glass-card-border-accent p-5 flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent group-hover:border-accent/20 group-hover:bg-accent/5 transition-all duration-300">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
                    <p className="text-xs text-subtle">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
