import type { SVGProps } from "react";
import type { IconType } from "react-icons";
import { Code2 } from "lucide-react";
import {
  Database,
  Terminal,
  Cpu,
  Shield,
  Link2,
  Layers,
  GitBranch,
  Box,
  Gauge,
  Sparkles,
  BrainCircuit,
  Activity,
} from "lucide-react";

// ── Official brand SVGs from Simple Icons (via react-icons/si) ──
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPython,
  SiOpenjdk,
  SiC,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiDocker,
  SiFirebase,
  SiTailwindcss,
  SiFramer,
  SiVercel,
  SiFigma,
  SiBootstrap,
  SiPhp,
  SiJson,
  SiGnubash,
  SiFlask,
  SiNumpy,
  SiScikitlearn,
  SiHtml5,
  SiCss,
  SiPandas,
  SiPostman,
} from "react-icons/si";

// ── Social icons (used by Footer & SocialLinks) ──────────

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function GitHubIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function LinkedInIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function GmailIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.691 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

export function InstagramIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

// ── Name normalization ────────────────────────────────────
function SiVisualstudiocode({ width = 24, height = 24 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="#007ACC" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 3L8 11l-3.5-2.5L3 10l3 2-3 2 1.5 1.5L8 13l8.5 8L21 19V5l-4.5-2z" />
    </svg>
  );
}

// ── Brand icon map: react-icons/si component imports ──────
const SI_ICONS: Record<string, IconType> = {
  "TypeScript":            SiTypescript,
  "JavaScript":            SiJavascript,
  "React":                 SiReact,
  "Next.js":               SiNextdotjs,
  "Node.js":               SiNodedotjs,
  "Express":               SiExpress,
  "MongoDB":               SiMongodb,
  "MySQL":                 SiMysql,
  "Python":                SiPython,
  "Java":                  SiOpenjdk,
  "C":                     SiC,
  "C++":                   SiCplusplus,
  "Git":                   SiGit,
  "GitHub":                SiGithub,
  "Docker":                SiDocker,
  "Firebase":              SiFirebase,
  "Tailwind CSS":          SiTailwindcss,
  "Framer Motion":         SiFramer,
  "Vercel":                SiVercel,
  "Figma":                 SiFigma,
  "Bootstrap":             SiBootstrap,
  "PHP":                   SiPhp,
  "JSON":                  SiJson,
  "Bash":                  SiGnubash,
  "Flask":                 SiFlask,
  "NumPy":                 SiNumpy,
  "Scikit-learn":          SiScikitlearn,
  "HTML5":                 SiHtml5,
  "CSS3":                  SiCss,
  "Pandas":                SiPandas,
  "Postman":               SiPostman,
};

// ── Brand icon colors ─────────────────────────────────────
const SI_COLORS: Record<string, string> = {
  "TypeScript":            "#3178C6",
  "JavaScript":            "#F7DF1E",
  "React":                 "#61DAFB",
  "Next.js":               "#ffffff",
  "Node.js":               "#339933",
  "Express":               "#ffffff",
  "MongoDB":               "#47A248",
  "MySQL":                 "#4479A1",
  "Python":                "#3776AB",
  "Java":                  "#007396",
  "C":                     "#A8B9CC",
  "C++":                   "#00599C",
  "Git":                   "#F05032",
  "GitHub":                "#ffffff",
  "Docker":                "#2496ED",
  "Firebase":              "#FFCA28",
  "Tailwind CSS":          "#06B6D4",
  "Framer Motion":         "#0055FF",
  "Vercel":                "#ffffff",
  "Figma":                 "#F24E1E",
  "Bootstrap":             "#7952B3",
  "PHP":                   "#777BB4",
  "JSON":                  "#ffffff",
  "Bash":                  "#4EAA25",
  "Flask":                 "#ffffff",
  "NumPy":                 "#013243",
  "Scikit-learn":          "#F7931E",
  "HTML5":                 "#E34F26",
  "CSS3":                  "#1572B6",
  "Pandas":                "#150458",
  "Postman":               "#FF6C37",
  "VS Code":               "#007ACC",
};

// ── Brand skills using Lucide (no Simple Icon available) ──
const LUCIDE_BRANDS: Record<string, IconType> = {
  "SQL":     Database,
  "XGBoost": Activity,
};

const LUCIDE_BRAND_COLORS: Record<string, string> = {
  "SQL":     "#E38C00",
  "XGBoost": "#EC1C24",
};

// ── Conceptual skills → Lucide icons ──────────────────────
const CONCEPTUAL_ICONS: Record<string, IconType> = {
  "DSA":                     GitBranch,
  "OOP":                     Box,
  "DBMS":                    Database,
  "Operating Systems":       Terminal,
  "Computer Architecture":   Cpu,
  "REST APIs":               Link2,
  "Authentication":          Shield,
  "AI Systems":              BrainCircuit,
  "Intelligent Interfaces":  Sparkles,
  "Performance Optimization": Gauge,
  "Full Stack Systems":      Layers,
  "AI-driven UX":            Sparkles,
};

// ── Name normalization ────────────────────────────────────
const NORMALIZE_MAP: Record<string, string> = {
  "typescript": "TypeScript",
  "javascript": "JavaScript",
  "react": "React",
  "next.js": "Next.js",
  "nextjs": "Next.js",
  "node.js": "Node.js",
  "nodejs": "Node.js",
  "express.js": "Express",
  "expressjs": "Express",
  "mongodb": "MongoDB",
  "mysql": "MySQL",
  "python": "Python",
  "java": "Java",
  "c++": "C++",
  "c": "C",
  "git": "Git",
  "github": "GitHub",
  "docker": "Docker",
  "firebase": "Firebase",
  "tailwind css": "Tailwind CSS",
  "tailwindcss": "Tailwind CSS",
  "framer motion": "Framer Motion",
  "framer": "Framer Motion",
  "vercel": "Vercel",
  "figma": "Figma",
  "bootstrap": "Bootstrap",
  "php": "PHP",
  "sql": "SQL",
  "json": "JSON",
  "bash": "Bash",
  "flask": "Flask",
  "numpy": "NumPy",
  "scikit-learn": "Scikit-learn",
  "scikitlearn": "Scikit-learn",
  "html5": "HTML5",
  "css3": "CSS3",
  "pandas": "Pandas",
  "xgboost": "XGBoost",
  "vs code": "VS Code",
  "vscode": "VS Code",
  "postman": "Postman",
  "dsa": "DSA",
  "oop": "OOP",
  "dbms": "DBMS",
  "operating systems": "Operating Systems",
  "operatingsystems": "Operating Systems",
  "computer architecture": "Computer Architecture",
  "computerarchitecture": "Computer Architecture",
  "rest apis": "REST APIs",
  "restapis": "REST APIs",
  "authentication": "Authentication",
  "ai systems": "AI Systems",
  "aisystems": "AI Systems",
  "intelligent interfaces": "Intelligent Interfaces",
  "intelligentinterfaces": "Intelligent Interfaces",
  "performance optimization": "Performance Optimization",
  "performanceoptimization": "Performance Optimization",
  "full stack systems": "Full Stack Systems",
  "fullstacksystems": "Full Stack Systems",
  "ai-driven ux": "AI-driven UX",
  "aidrivenux": "AI-driven UX",
};

// ── Render component with fallback ────────────────────────
export function SkillBrandIcon({ name, size = 22 }: { name: string; size?: number }) {
  const key = NORMALIZE_MAP[name.trim().toLowerCase()] || name.trim();

  // 1. Check react-icons/si brands
  const SiIcon = SI_ICONS[key];
  if (SiIcon) {
    return <SiIcon size={size} style={{ color: SI_COLORS[key] || "#ffffff" }} />;
  }

  // 2. VS Code (inline SVG — not in react-icons/si)
  if (key === "VS Code") {
    return <SiVisualstudiocode width={size} height={size} />;
  }

  // 3. Lucide brand fallback (SQL, XGBoost)
  const LucideBrand = LUCIDE_BRANDS[key];
  if (LucideBrand) {
    return <LucideBrand size={size} style={{ color: LUCIDE_BRAND_COLORS[key] || "#ffffff" }} />;
  }

  // 4. Lucide conceptual icons
  const LucideIcon = CONCEPTUAL_ICONS[key];
  if (LucideIcon) {
    return <LucideIcon size={size} style={{ color: "#94A3B8" }} />;
  }

  // 5. Fallback — generic code icon
  return <Code2 size={size} style={{ color: "#6B7280" }} />;
}
