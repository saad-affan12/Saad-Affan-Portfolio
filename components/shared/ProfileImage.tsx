"use client";

import { motion } from "framer-motion";

export default function ProfileImage({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="relative"
    >
      <div className="relative size-24 sm:size-28 md:size-32 [perspective:800px] cursor-pointer group">
        <motion.div
          className="relative size-full transition-transform duration-700 [transform-style:preserve-3d]"
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 size-full rounded-full border-2 border-border overflow-hidden [backface-visibility:hidden]">
            <img
              src="/img/saad.png"
              alt="Mohammed Saad Affan A"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/5" />
          </div>
          <div className="absolute inset-0 size-full rounded-full border-2 border-accent/30 bg-card flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-2xl sm:text-3xl font-bold text-gradient-blue">MSA</span>
          </div>
        </motion.div>
        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-accent/10 to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      </div>
      <div className="absolute -inset-4 rounded-full bg-accent/5 blur-3xl opacity-50" />
    </motion.div>
  );
}
