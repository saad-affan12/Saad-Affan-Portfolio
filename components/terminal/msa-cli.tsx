"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useData } from "@/hooks/useData";

interface Line {
  text: string;
  type: "command" | "output" | "system";
}

function formatTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
}

export default function MsaCli() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isLight = mounted && theme === "light";
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"auto" | "interactive">("auto");
  const [currentAuto, setCurrentAuto] = useState(0);
  const [typingCmd, setTypingCmd] = useState("");
  const [typingOutput, setTypingOutput] = useState<string[]>([]);
  const [charIndex, setCharIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const isProcessingRef = useRef(false);

  const hero = useData('hero');
  const projects = useData('projects', []);
  const skills = useData('skills', []);
  const education = useData('education', []);
  const roadmap = useData('roadmap', []);
  const socials = useData('socials');

  const initialAuto = [
    {
      cmd: "whoami",
      output: [
        hero?.name || "Saad Affan",
        "Full-Stack Engineer",
        "AI Systems Builder",
        `B.Sc Computer Science @ VIT`,
      ],
    },
    {
      cmd: "skills",
      output: (() => {
        const all = skills.flatMap((c) => c.items);
        const chunks: string[] = [];
        for (let i = 0; i < all.length; i += 4) {
          chunks.push(all.slice(i, i + 4).join("  "));
        }
        return chunks.length ? chunks : ["Python  Java  C++", "JavaScript  TypeScript"];
      })(),
    },
    {
      cmd: "projects",
      output: projects.length
        ? projects.map((p, i) => `${i + 1}. ${p.name}`)
        : ["1. Secure Vote System", "2. NeuroAdaptive UX"],
    },
    {
      cmd: "socials",
      output: [
        `GitHub:    ${socials?.github?.replace('https://', '') || 'github.com/saad-affan12'}`,
        `LinkedIn:  ${socials?.linkedin?.replace('https://', '') || 'linkedin.com/in/saad-affan-566553319'}`,
      ],
    },
  ];

  const COMMANDS: Record<string, { output: string[]; action?: "nav" }> = useMemo(() => {
    const allSkillsList = skills.flatMap((c) => c.items);

    const byCategory: Record<string, string[]> = {};
    for (const cat of skills) {
      byCategory[cat.title] = cat.items;
    }

    return {
      help: {
        output: [
          "Available commands:",
          "",
          "  about      Display profile information",
          "  skills     List technical skills",
          "  projects   Show featured projects",
          "  education  Show education background",
          "  experience Show work experience",
          "  socials    Display social links",
          "  resume     Open resume page",
          "  home       Go to homepage",
          "  clear      Clear terminal",
          "  help       Show this message",
        ],
      },
      about: {
        output: [
          hero?.name || "Saad Affan",
          hero?.role || "Full-Stack Engineer",
          hero?.location || "Vellore, India",
          hero?.email || "saadaffan129@gmail.com",
          "",
          hero?.description?.split("\n")[0] || "",
        ],
      },
      skills: {
        output: Object.entries(byCategory).flatMap(([title, items]) => [
          `${title}:`,
          `  ${items.join("  ")}`,
          "",
        ]).length
          ? Object.entries(byCategory).flatMap(([title, items]) => [
              `${title}:`,
              `  ${items.join("  ")}`,
              "",
            ])
          : [
              "Languages:",
              "  Python  Java  C++  C  JavaScript  TypeScript",
              "",
              "Frontend:",
              "  React  Next.js  Tailwind CSS  Framer Motion",
              "",
              "Backend:",
              "  Node.js  Express  Flask  REST APIs",
              "",
              "Database:",
              "  MongoDB  MySQL  Firebase",
              "",
              "AI / ML:",
              "  Scikit-learn  Pandas  NumPy  XGBoost",
              "",
              "Tools:",
              "  Git  Docker  VS Code  Postman  Vercel",
            ],
      },
      projects: {
        output: [
          "Featured Projects:",
          "",
          ...projects.flatMap((p, i) => [
            `${i + 1}. ${p.name}`,
            `   ${p.description?.split(".")[0] || ""}`,
            "",
          ]),
        ],
      },
      education: {
        output: education.length
          ? education.flatMap((e) => [
              e.institution,
              `  ${e.degree || e.program || ""}`,
              `  ${e.period}  ${e.cgpa ? `|  ${e.cgpa}` : ""}`,
              "",
            ])
          : [
              "Vellore Institute of Technology (VIT)",
              "  B.Sc Computer Science (AI & ML)",
              "  Jun 2024 - Nov 2026  |  8.11 CGPA",
              "",
              "Islamiah Boys Higher Secondary School",
              "  Higher Secondary - Mathematics & CS",
              "  Jun 2023 - Mar 2024",
            ],
      },
      experience: {
        output: roadmap
          .filter((r) => r.type !== "project")
          .flatMap((r) => [
            `${r.role} @ ${r.company}`,
            `  ${r.period}`,
            `  ${r.description?.split(".")[0] || ""}`,
            "",
          ]),
      },
      socials: {
        output: [
          `GitHub:    ${socials?.github?.replace('https://', '') || 'github.com/saad-affan12'}`,
          `LinkedIn:  ${socials?.linkedin?.replace('https://', '') || 'linkedin.com/in/saad-affan-566553319'}`,
          `Email:     ${hero?.email || socials?.email || 'saadaffan129@gmail.com'}`,
        ],
      },
    };
  }, [hero, projects, skills, education, roadmap, socials]);

  const NAV_COMMANDS: Record<string, string> = useMemo(() => ({
    resume: "/resume",
    home: "/",
    roadmap: "/roadmap",
    tools: "/tools",
  }), []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, typingCmd, typingOutput, showPrompt]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLines([{ text: "MSA Terminal v2.0 — Type 'help' for available commands", type: "system" }]);
      setPhase("auto");
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const autoEntries = initialAuto;
    if (phase !== "auto" || !autoEntries.length) return;
    if (currentAuto >= autoEntries.length) {
      setPhase("interactive");
      setShowPrompt(true);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    const entry = autoEntries[currentAuto];

    if (typingCmd.length < entry.cmd.length + 2) {
      const t = setTimeout(() => {
        const charPos = Math.max(0, typingCmd.length - 2);
        setTypingCmd(`$ ${entry.cmd.slice(0, charPos)}`);
      }, 40);
      return () => clearTimeout(t);
    }

    if (charIndex < entry.output.length) {
      const t = setTimeout(() => {
        setTypingOutput((prev) => [...prev, entry.output[charIndex]]);
        setCharIndex((c) => c + 1);
      }, 250);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLines((prev) => [
        ...prev,
        { text: `$ ${entry.cmd}`, type: "command" },
        ...entry.output.map((o) => ({ text: o, type: "output" as const })),
      ]);
      setTypingCmd("");
      setTypingOutput([]);
      setCharIndex(0);
      setCurrentAuto((c) => c + 1);
    }, 400);
    return () => clearTimeout(t);
  }, [phase, currentAuto, typingCmd, charIndex, initialAuto]);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();

      if (trimmed === "clear") {
        setLines([]);
        return;
      }

      if (NAV_COMMANDS[trimmed]) {
        router.push(NAV_COMMANDS[trimmed]);
        return;
      }

      const result = COMMANDS[trimmed];
      if (result) {
        setLines((prev) => [
          ...prev,
          { text: `$ ${trimmed}`, type: "command" },
          ...result.output.map((o) => ({ text: o, type: "output" as const })),
        ]);
      } else if (trimmed !== "") {
        setLines((prev) => [
          ...prev,
          { text: `$ ${trimmed}`, type: "command" },
          { text: `bash: ${trimmed}: command not found. Type 'help' for available commands.`, type: "output" },
        ]);
      }
    },
    [router, COMMANDS, NAV_COMMANDS]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    executeCommand(input);
    setInput("");
    setTimeout(() => {
      isProcessingRef.current = false;
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl"
    >
      <div
        className="rounded-xl border backdrop-blur-xl overflow-hidden"
        style={{
          background: 'var(--terminal-bg)',
          boxShadow: 'var(--terminal-shadow)',
          borderColor: isLight ? 'rgba(15, 23, 42, 0.15)' : 'rgba(51, 65, 85, 0.4)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div
          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 border-b"
          style={{
            background: 'var(--terminal-header-bg)',
            borderColor: isLight ? 'rgba(15, 23, 42, 0.1)' : 'rgba(51, 65, 85, 0.3)',
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <div className="size-2 sm:size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2 sm:size-2.5 rounded-full bg-[#febc2e]" />
            <div className="size-2 sm:size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center min-w-0">
            <span className="text-[9px] sm:text-[10px] font-medium tracking-wide truncate block" style={{ color: isLight ? 'rgba(71, 85, 105, 0.9)' : 'rgb(148, 163, 184)' }}>MSA Terminal</span>
          </div>
          <div className="text-[8px] sm:text-[9px] text-blue-400/60 font-mono tracking-wider shrink-0">ONLINE</div>
        </div>

        <div className="p-3 sm:p-5 md:p-6 font-mono text-[12px] sm:text-[13px] leading-relaxed min-h-[300px] sm:min-h-[400px] md:min-h-[480px] max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto">
          <div className="space-y-1.5">
            {lines.map((line, i) => (
              <div
                key={i}
                  className={
                    line.type === "command"
                      ? "text-blue-400"
                      : line.type === "system"
                        ? "text-slate-500 italic"
                        : "text-gray-300"
                  }
                >
                  {line.text.split("\n").map((t, j) => (
                  <div key={j}>{t}</div>
                ))}
              </div>
            ))}

            {typingCmd && (
              <div className="text-blue-400">
                {typingCmd}
                <span className="inline-block w-[6px] h-[14px] bg-blue-400 ml-[1px] animate-pulse align-middle" />
              </div>
            )}

            {typingOutput.map((line, i) => (
              <div key={`typing-${i}`} className="text-gray-200">
                {line}
              </div>
            ))}

            {showPrompt && (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-blue-400 shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono text-[13px] placeholder-slate-500"
                  placeholder="Type a command..."
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </form>
            )}
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </motion.div>
  );
}
