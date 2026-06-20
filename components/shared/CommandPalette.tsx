"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Search, Home, Map, FolderOpen, FileText, Wrench, Terminal, User, Zap, Briefcase, GraduationCap, Github, Linkedin, Mail, Heart, ExternalLink } from "lucide-react";
import { useAllData } from "@/hooks/useData";
import type { SearchItem } from "@/lib/search-data";

import { useBackgroundState } from "@/components/providers/BackgroundStateProvider";

const ease = [0.16, 1, 0.3, 1] as const;

const searchIcons: Record<string, React.ReactNode> = {
  home: <Home size={14} />,
  map: <Map size={14} />,
  folder: <FolderOpen size={14} />,
  file: <FileText size={14} />,
  wrench: <Wrench size={14} />,
  terminal: <Terminal size={14} />,
  user: <User size={14} />,
  zap: <Zap size={14} />,
  briefcase: <Briefcase size={14} />,
  grad: <GraduationCap size={14} />,
  github: <Github size={14} />,
  linkedin: <Linkedin size={14} />,
  mail: <Mail size={14} />,
  heart: <Heart size={14} />,
  external: <ExternalLink size={14} />,
};

function fuzzyMatch(text: string, query: string): boolean {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  let qi = 0;
  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setTheme } = useTheme();
  const allData = useAllData();
  const { setSearchFocused } = useBackgroundState();

  useEffect(() => {
    setSearchFocused(open);
    return () => {
      setSearchFocused(false);
    };
  }, [open, setSearchFocused]);

  const searchData: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];
    const hero = allData.hero;
    const projects = allData.projects as any[] || [];
    const education = allData.education as any[] || [];
    const skills = allData.skills as any[] || [];
    const roadmap = allData.roadmap as any[] || [];

    items.push(
      { id: "page-home", title: "Home", description: "Portfolio overview — hero, about, experience", href: "/#hero", icon: "home", category: "Pages" },
      { id: "page-roadmap", title: "Roadmap", description: "Journey, experience, and timeline", href: "/roadmap", icon: "map", category: "Pages" },
      { id: "page-projects", title: "Projects", description: "Featured work and case studies", href: "/projects", icon: "folder", category: "Pages" },
      { id: "page-resume", title: "Resume", description: "Skills, education, and experience", href: "/resume", icon: "file", category: "Pages" },
      { id: "page-tools", title: "Tools", description: "Toolkit and setup", href: "/tools", icon: "wrench", category: "Pages" },
      { id: "page-cli", title: "CLI", description: "Interactive terminal", href: "/cli", icon: "terminal", category: "Pages" },
      { id: "sec-hero", title: "About Me", description: (hero && hero.name && hero.role) ? `${hero.name} — ${hero.role}` : "Full-Stack & AI Developer", href: "/#hero", icon: "user", category: "Sections" },
      { id: "sec-stack", title: "Tech Stack", description: "Languages, frameworks, tools, and core concepts", href: "/#stack", icon: "zap", category: "Sections" },
      { id: "sec-projects", title: "Featured Work", description: "Real-world projects with focus on performance", href: "/#projects", icon: "folder", category: "Sections" },
      { id: "sec-experience", title: "Experience", description: "Academic projects, club involvement, and hands-on work", href: "/#experience", icon: "briefcase", category: "Sections" },
      { id: "sec-education", title: "Education", description: `${education[0]?.institution || "VIT"} — CS, AI & ML`, href: "/#education", icon: "grad", category: "Sections" },
      { id: "sec-setup", title: "My Toolkit", description: "Editor, terminal, version control, and more", href: "/#setup", icon: "wrench", category: "Sections" },
      { id: "sec-github", title: "GitHub Activity", description: "Contributions heatmap, repos, and activity status", href: "/#github", icon: "github", category: "Sections" },
      { id: "sec-contact", title: "Get in Touch", description: "Let's talk — open to collaborations and internships", href: "/#contact", icon: "mail", category: "Sections" },
      { id: "sec-sponsor", title: "Support My Work", description: "Sponsor on GitHub", href: "/#sponsor", icon: "heart", category: "Sections" },
    );

    projects.forEach((p: any) => {
      if (p.name) {
        items.push({
          id: `proj-${p.slug || p.name.toLowerCase().replace(/\s+/g, '-')}`,
          title: p.name,
          description: p.description?.split(".")[0] || "",
          href: `/projects#${p.slug || ""}`,
          icon: "folder",
          category: "Projects",
        });
      }
    });

    education.forEach((e: any) => {
      if (e.institution) {
        items.push({
          id: `edu-${e.institution.toLowerCase().replace(/\s+/g, '-')}`,
          title: `${e.institution} — ${e.degree || e.program || ""}`,
          description: `${e.cgpa ? e.cgpa : ""}`,
          href: "/#education",
          icon: "grad",
          category: "Education",
        });
      }
    });

    skills.forEach((s: any) => {
      (s.items || []).forEach((skill: string) => {
        items.push({
          id: `skill-${skill.toLowerCase().replace(/\s+/g, '-')}`,
          title: skill,
          description: `${s.title} skill`,
          href: "/#stack",
          icon: "zap",
          category: "Skills",
        });
      });
    });

    items.push(
      { id: "ext-github", title: "GitHub Profile", description: (typeof hero?.github === 'string' && hero.github) ? `@${hero.github.split('/').pop()}` : "saad-affan12", href: hero?.github || "https://github.com/saad-affan12", icon: "github", category: "External" },
      { id: "ext-linkedin", title: "LinkedIn Profile", description: "Connect on LinkedIn", href: hero?.linkedin || "https://www.linkedin.com/in/saad-affan-566553319", icon: "linkedin", category: "External" },
      { id: "ext-email", title: "Send Email", description: hero?.email || "saadaffan129@gmail.com", href: `mailto:${hero?.email || ""}`, icon: "mail", category: "External" },
      { id: "ext-resume", title: "Download Resume", description: "View or download my resume", href: "/resume.pdf", icon: "file", category: "External" },
      { id: "cmd-dark", title: "Switch to Dark Mode", description: "Toggle portfolio appearance to dark mode", href: "#", icon: "zap", category: "Commands" },
      { id: "cmd-light", title: "Switch to Light Mode", description: "Toggle portfolio appearance to light mode", href: "#", icon: "zap", category: "Commands" },
      { id: "cmd-assistant", title: "Open AI Assistant", description: "Open floating interactive helper widget", href: "#", icon: "terminal", category: "Commands" }
    );

    return items;
  }, [allData]);

  const results = useMemo(() => {
    if (!query.trim()) return searchData.slice(0, 8);
    return searchData.filter(
      (item) =>
        fuzzyMatch(item.title, query) ||
        fuzzyMatch(item.description, query) ||
        fuzzyMatch(item.category, query)
    );
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const navigate = useCallback(
    (item: SearchItem) => {
      onClose();
      if (item.id === "cmd-dark") {
        setTheme("dark");
      } else if (item.id === "cmd-light") {
        setTheme("light");
      } else if (item.id === "cmd-assistant") {
        const btn = document.querySelector('[aria-label="AI Assistant"]') as HTMLButtonElement | null;
        if (btn) btn.click();
      } else if (item.href.startsWith("http") || item.href.startsWith("mailto")) {
        window.open(item.href, "_blank", "noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [onClose, router, setTheme]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      navigate(results[selectedIndex]);
    }
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const selected = el.children[selectedIndex] as HTMLElement | undefined;
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-start justify-center pt-[12vh] sm:pt-[15vh]"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.25, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90vw] max-w-[560px] rounded-2xl border border-border/60 bg-card/90 shadow-2xl backdrop-blur-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 h-12 sm:h-14 border-b border-border/40">
              <Search size={16} className="text-subtle shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, projects, skills..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle/50"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-subtle">
                <span>ESC</span>
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[360px] overflow-y-auto py-2 px-2 space-y-0.5">
              {results.length === 0 ? (
                <div className="py-8 text-center text-sm text-subtle/60">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                results.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150 ${
                      i === selectedIndex
                        ? "bg-accent/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                    }`}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-card text-accent/70">
                      {searchIcons[item.icon] || <Zap size={14} />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{item.title}</span>
                        <span className="shrink-0 rounded-full bg-muted/50 px-1.5 py-0.5 text-[9px] font-medium tracking-wider text-subtle/70 uppercase">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-subtle/60 truncate mt-0.5">{item.description}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
