import { type ClassValue, clsx } from "clsx";
import type { Variants } from "framer-motion";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cinematicEase = [0.16, 1, 0.3, 1] as const;
export const smoothEase = [0.22, 1, 0.36, 1] as const;
export const springEase = { type: "spring", stiffness: 120, damping: 20, mass: 0.5 } as const;

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: cinematicEase },
  },
};

export const fadeInUpFast: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: cinematicEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: cinematicEase },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: cinematicEase },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: cinematicEase },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: cinematicEase },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -6,
    transition: { duration: 0.4, ease: cinematicEase },
  },
};

export const dockItem = {
  rest: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -4,
    transition: { duration: 0.3, ease: cinematicEase },
  },
  tap: { scale: 0.9 },
};

export const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
