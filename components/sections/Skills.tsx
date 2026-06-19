"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import SectionHeading from "@/components/shared/SectionHeading";
import { useData } from "@/hooks/useData";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import { Terminal, Code2, Database, Shield, Cpu, Layers } from "lucide-react";

function SkillIcon({ name }: { name: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use "light" theme consistently for the skillicons so they look exactly the same in both modes
  // and to prevent dynamic src changes that cause browser-aborted request errors on mount.
  const themeParam = "light";
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
    fullstacksystems: "nodejs", aidrivenux: "tensorflow",
  };

  const iconSlug = iconMap[slug] || slug;
  const srcUrl = `https://skillicons.dev/icons?i=${iconSlug}&theme=${themeParam}`;

  // Reset error state when the image URL changes (in case of transient or cached fetch aborts)
  useEffect(() => {
    setError(false);
  }, [srcUrl]);

  const getFallbackIcon = () => {
    const s = iconSlug.toLowerCase();
    if (["python", "java", "cpp", "c", "javascript", "typescript", "rust", "go", "php", "ruby", "dsa", "oop"].includes(s)) {
      return <Code2 className="size-4 sm:size-5 text-accent" />;
    }
    if (["react", "nextjs", "tailwindcss", "html5", "css3", "framer", "vue", "angular", "intelligentinterfaces"].includes(s)) {
      return <Layers className="size-4 sm:size-5 text-purple-400" />;
    }
    if (["nodejs", "express", "flask", "django", "laravel", "cpu", "fullstacksystems", "scikitlearn", "pandas", "numpy", "xgboost", "aisystems", "aidrivenux"].includes(s)) {
      return <Cpu className="size-4 sm:size-5 text-emerald-400" />;
    }
    if (["mongodb", "mysql", "firebase", "postgresql", "sqlite", "dbms", "database"].includes(s)) {
      return <Database className="size-4 sm:size-5 text-blue-400" />;
    }
    if (["docker", "git", "github", "vscode", "postman", "vercel", "performanceoptimization", "operatingsystems", "computerarchitecture"].includes(s)) {
      return <Terminal className="size-4 sm:size-5 text-amber-400" />;
    }
    if (["auth0", "authentication", "jwt", "shield"].includes(s)) {
      return <Shield className="size-4 sm:size-5 text-rose-400" />;
    }
    return <Code2 className="size-4 sm:size-5 text-muted-foreground" />;
  };

  if (error) {
    return getFallbackIcon();
  }

  return (
    <img
      src={srcUrl}
      alt={name}
      className="size-4 sm:size-5 shrink-0 object-contain"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

function getRowItems(items: string[], repeatThreshold = 12) {
  let result = [...items];
  if (result.length === 0) return [];
  while (result.length < repeatThreshold) {
    result = [...result, ...items];
  }
  return result;
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

        {activeCategory === "all" ? (
          <div
            key="marquee"
            className="marquee-container mt-10 space-y-4 relative w-full overflow-hidden"
          >
            {/* Edge Gradients for Fading Effect */}
            <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Row 1: Moves Left */}
            {row1.length > 0 && (
              <div className="flex w-full overflow-hidden">
                <div className="flex gap-3 py-1.5 animate-marquee-left w-max">
                  {[...row1, ...row1].map((item, i) => (
                    <div
                      key={`row1-${item}-${i}`}
                      className="flex items-center gap-1.5 sm:gap-2 bg-black/[0.03] dark:bg-white/[0.04] border border-border rounded-lg px-3 py-2 text-[10px] sm:text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-black/[0.06] dark:hover:bg-white/10 hover:scale-105 hover:border-accent/30 cursor-default shrink-0"
                    >
                      <SkillIcon name={item} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Row 2: Moves Right */}
            {row2.length > 0 && (
              <div className="flex w-full overflow-hidden">
                <div className="flex gap-3 py-1.5 animate-marquee-right w-max">
                  {[...row2, ...row2].map((item, i) => (
                    <div
                      key={`row2-${item}-${i}`}
                      className="flex items-center gap-1.5 sm:gap-2 bg-black/[0.03] dark:bg-white/[0.04] border border-border rounded-lg px-3 py-2 text-[10px] sm:text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-black/[0.06] dark:hover:bg-white/10 hover:scale-105 hover:border-accent/30 cursor-default shrink-0"
                    >
                      <SkillIcon name={item} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Row 3: Moves Left */}
            {row3.length > 0 && (
              <div className="flex w-full overflow-hidden">
                <div className="flex gap-3 py-1.5 animate-marquee-left w-max">
                  {[...row3, ...row3].map((item, i) => (
                    <div
                      key={`row3-${item}-${i}`}
                      className="flex items-center gap-1.5 sm:gap-2 bg-black/[0.03] dark:bg-white/[0.04] border border-border rounded-lg px-3 py-2 text-[10px] sm:text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-black/[0.06] dark:hover:bg-white/10 hover:scale-105 hover:border-accent/30 cursor-default shrink-0"
                    >
                      <SkillIcon name={item} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Row 4: Moves Right */}
            {row4.length > 0 && (
              <div className="flex w-full overflow-hidden">
                <div className="flex gap-3 py-1.5 animate-marquee-right w-max">
                  {[...row4, ...row4].map((item, i) => (
                    <div
                      key={`row4-${item}-${i}`}
                      className="flex items-center gap-1.5 sm:gap-2 bg-black/[0.03] dark:bg-white/[0.04] border border-border rounded-lg px-3 py-2 text-[10px] sm:text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-black/[0.06] dark:hover:bg-white/10 hover:scale-105 hover:border-accent/30 cursor-default shrink-0"
                    >
                      <SkillIcon name={item} />
                      <span>{item}</span>
                    </div>
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
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item}
                variants={fadeInUp}
                className="group flex items-center gap-2 bg-black/[0.03] dark:bg-white/[0.04] border border-border rounded-lg px-3 py-2 text-[10px] sm:text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-black/[0.06] dark:hover:bg-white/10 hover:scale-105 hover:border-accent/30 cursor-default"
              >
                <SkillIcon name={item} />
                <span className="truncate">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
