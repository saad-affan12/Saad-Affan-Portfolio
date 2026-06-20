"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({ eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  const words = title.split(" ");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className={cn("space-y-3", align === "center" && "text-center", className)}
    >
      {eyebrow && (
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="section-label inline-block"
        >
          {eyebrow}
        </motion.span>
      )}
      <h2 className={cn("text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-gradient flex flex-wrap gap-x-2", align === "center" ? "justify-center" : "justify-start")}>
        {words.map((word, idx) => (
          <span key={idx} className="relative inline-block overflow-hidden pb-1">
            <motion.span
              variants={{
                hidden: { y: "100%" },
                visible: {
                  y: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed mx-auto overflow-hidden">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="inline-block"
          >
            {description}
          </motion.span>
        </p>
      )}
    </motion.div>
  );
}
