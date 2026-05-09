"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { stackCategories } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";

function SkillIcon({ name }: { name: string }) {
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
      src={`https://skillicons.dev/icons?i=${iconSlug}&theme=dark`}
      alt={name}
      className="size-4"
      loading="lazy"
    />
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Skills() {
  return (
    <section id="stack" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#3b82f6]/[0.02] via-transparent to-transparent pointer-events-none" />
      <div className="cinematic-container">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools & Technologies"
          description="The technologies I work with to build scalable systems and intelligent interfaces."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {stackCategories.map((category, index) => (
            <motion.div
              key={category.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative glass-card p-5 space-y-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#3b82f6]/[0.03] to-transparent rounded-bl-full" />
                <div className="flex items-center gap-3 relative">
                  <span className="glow-dot" />
                  <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 relative">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-accent/20 hover:text-foreground hover:bg-accent/5 hover:shadow-[0_0_20px_rgba(59,130,246,0.06)]"
                    >
                      <SkillIcon name={item} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
