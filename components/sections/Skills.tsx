"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { useData } from "@/hooks/useData";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import { SkillBrandIcon } from "@/components/shared/BrandIcons";

function getRowItems(items: string[], repeatThreshold = 12) {
  let result = [...items];
  if (result.length === 0) return [];
  while (result.length < repeatThreshold) {
    result = [...result, ...items];
  }
  return result;
}

function SkillPill({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 min-h-[58px] px-5 py-3 rounded-full bg-[rgba(10,10,12,0.95)] border border-white/[0.08] backdrop-blur-[10px] cursor-default shrink-0 w-fit transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(124,58,237,0.12)] will-change-transform">
      <SkillBrandIcon name={name} size={22} />
      <span className="text-[15px] font-medium text-white whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function Skills() {
  const stackCategories = useData('skills', []);
  const categories = [
    { id: "all", title: "All" },
    ...stackCategories.map((c) => ({ id: c.id, title: c.title })),
  ];
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? stackCategories.flatMap((c) => c.items)
      : stackCategories.find((c) => c.id === activeCategory)?.items ?? [];

  // Divide the skills into 4 rows for the marquee
  const row1 = getRowItems(filteredItems.filter((_, idx) => idx % 4 === 0));
  const row2 = getRowItems(filteredItems.filter((_, idx) => idx % 4 === 1));
  const row3 = getRowItems(filteredItems.filter((_, idx) => idx % 4 === 2));
  const row4 = getRowItems(filteredItems.filter((_, idx) => idx % 4 === 3));

  return (
    <section id="stack" className="py-20 relative">
      <div className="cinematic-container">
        <SectionHeading
          eyebrow="My Arsenal"
          title="Tools & Technologies"
          description="The technologies I work with to build scalable systems and intelligent interfaces."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-nowrap sm:flex-wrap gap-2 justify-start sm:justify-center overflow-x-auto scrollbar-none pb-2"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 border ${
                activeCategory === cat.id
                  ? "bg-white/10 border-white/20 text-white"
                  : "border-white/10 text-white/60 hover:border-white/20 hover:text-white/80"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </motion.div>

        {activeCategory === "all" ? (
          <div
            key="marquee"
            className="marquee-container mt-8 space-y-4 relative w-full overflow-hidden"
          >
            {/* Edge Gradients for Fading Effect */}
            <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Row 1: Moves Left */}
            {row1.length > 0 && (
              <div className="flex w-full overflow-hidden">
                <div className="flex gap-3 sm:gap-4 py-0.5 animate-marquee-left w-max">
                  {[...row1, ...row1].map((item, i) => (
                    <SkillPill key={`row1-${item}-${i}`} name={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Row 2: Moves Right */}
            {row2.length > 0 && (
              <div className="flex w-full overflow-hidden">
                <div className="flex gap-3 sm:gap-4 py-0.5 animate-marquee-right w-max">
                  {[...row2, ...row2].map((item, i) => (
                    <SkillPill key={`row2-${item}-${i}`} name={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Row 3: Moves Left */}
            {row3.length > 0 && (
              <div className="flex w-full overflow-hidden">
                <div className="flex gap-3 sm:gap-4 py-0.5 animate-marquee-left w-max">
                  {[...row3, ...row3].map((item, i) => (
                    <SkillPill key={`row3-${item}-${i}`} name={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Row 4: Moves Right */}
            {row4.length > 0 && (
              <div className="flex w-full overflow-hidden">
                <div className="flex gap-3 sm:gap-4 py-0.5 animate-marquee-right w-max">
                  {[...row4, ...row4].map((item, i) => (
                    <SkillPill key={`row4-${item}-${i}`} name={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            key="grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item}
                variants={fadeInUp}
                className="flex items-center gap-3 min-h-[58px] px-5 py-3 rounded-full bg-[rgba(10,10,12,0.95)] border border-white/[0.08] backdrop-blur-[10px] transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(124,58,237,0.12)] cursor-default w-fit"
              >
                <SkillBrandIcon name={item} size={22} />
                <span className="text-[15px] font-medium text-white truncate">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
