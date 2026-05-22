"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import SectionHeading from "@/components/shared/SectionHeading";
import { stackCategories } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";

function SkillIcon({ name }: { name: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && theme !== "light";
  const themeParam = isDark ? "dark" : "light";
  const slug = name.toLowerCase().replace(/\s+/g, "").replace(/[.#]/g, "");
  const iconMap: Record<string, string> = {
    python: "python", java: "java", "c++": "cpp", c: "c",
    javascript: "javascript", typescript: "typescript",
    react: "react", nextjs: "nextjs", tailwindcss: "tailwindcss",
    html5: "html5", css3: "css3", framermotion: "framer",
    nodejs: "nodejs", expressjs: "express", restapis: "express",
    authentication: "auth0", flask: "flask",
    mongodb: "mongodb", mysql: "mysql", firebase: "firebase",
    scikitlearn: "scikitlearn", pandas: "pandas", numpy: "numpy",
    xgboost: "xgboost", aisystems: "tensorflow",
    git: "git", github: "github", docker: "docker",
    vscode: "vscode", postman: "postman", vercel: "vercel",
    dsa: "cpp", oop: "java", dbms: "mysql",
    operatingsystems: "linux", computerarchitecture: "raspberrypi",
    intelligentinterfaces: "react", performanceoptimization: "vercel",
    fullstacksystems: "nodejs", "aidrivenux": "tensorflow",
  };
  const iconSlug = iconMap[slug] || slug;
  return (
    <img
      src={`https://skillicons.dev/icons?i=${iconSlug}&theme=${themeParam}`}
      alt={name}
      className="size-4 sm:size-5"
      loading="lazy"
    />
  );
}

export default function Skills() {
  const categories = [
    { id: "all", title: "All" },
    ...stackCategories.map((c) => ({ id: c.id, title: c.title })),
  ];
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? stackCategories.flatMap((c) => c.items)
      : stackCategories.find((c) => c.id === activeCategory)?.items ?? [];

  return (
    <section id="stack" className="py-24 relative">
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
          className="mt-10 flex flex-nowrap sm:flex-wrap gap-2 justify-start sm:justify-center overflow-x-auto scrollbar-none pb-2"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 border ${
                activeCategory === cat.id
                  ? "bg-accent/10 border-accent/30 text-accent"
                  : "border-border text-muted-foreground hover:border-accent/30 hover:text-foreground"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={item}
              variants={fadeInUp}
              className="group flex items-center gap-1.5 sm:gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-white/8 hover:scale-105 hover:border-accent/30 cursor-default"
            >
              <SkillIcon name={item} />
              <span className="truncate">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
