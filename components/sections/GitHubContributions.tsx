"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Github, ExternalLink, BookOpen } from "lucide-react";
import { fadeInUp, staggerContainer, cn } from "@/lib/utils";
import type { GitHubProfile, ContributionsResponse, ContributionDay } from "@/lib/github";

function useLevelColor(level: number, isLight: boolean): string {
  if (isLight) {
    const lightColors: Record<number, string> = {
      0: "bg-[#E8E8E8]",
      1: "bg-[#A5B4FC]",
      2: "bg-[#818CF8]",
      3: "bg-[#6366F1]",
      4: "bg-[#4F46E5]",
    };
    return lightColors[level] ?? lightColors[0];
  }
  const darkColors: Record<number, string> = {
    0: "bg-muted",
    1: "bg-[#312E81]/60",
    2: "bg-[#4338CA]/50",
    3: "bg-[#6366F1]/50",
    4: "bg-[#818CF8]/60",
  };
  return darkColors[level] ?? darkColors[0];
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function processYearlyData(contributions: ContributionDay[], year: string) {
  const yearData = contributions
    .filter((d) => d.date.startsWith(year))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (yearData.length === 0) return { weeks: [], total: 0, monthLabels: [] as { weekIndex: number; label: string }[] };

  const total = yearData.reduce((sum, d) => sum + d.count, 0);

  const weeks: (ContributionDay | null)[][] = [];
  const monthLabels: { weekIndex: number; label: string }[] = [];

  const firstDate = new Date(yearData[0].date);
  const startDayOfWeek = firstDate.getDay();

  let currentWeek: (ContributionDay | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push(null);
  }

  let lastMonth = -1;

  for (const day of yearData) {
    const date = new Date(day.date);
    const month = date.getMonth();

    if (month !== lastMonth && (currentWeek.length > 0 || weeks.length > 0)) {
      monthLabels.push({ weekIndex: weeks.length, label: months[month] });
      lastMonth = month;
    }

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return { weeks, total, monthLabels };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function GitHubContributions({
  profile,
  contributions,
}: {
  profile: GitHubProfile | null;
  contributions: ContributionsResponse | null;
}) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    date: string;
    count: number;
  }>({ visible: false, x: 0, y: 0, date: "", count: 0 });

  useEffect(() => { setMounted(true); }, []);

  const year = new Date().getFullYear().toString();
  const processed = contributions?.contributions
    ? processYearlyData(contributions.contributions, year)
    : null;
  const weeks = processed?.weeks ?? [];
  const total = processed?.total ?? 0;
  const monthLabels = processed?.monthLabels ?? [];
  const repos = profile?.public_repos ?? 0;

  const allContributions = contributions?.contributions ?? [];
  const activeDays = allContributions.filter((d) => d.count > 0).sort((a, b) => b.date.localeCompare(a.date));
  const lastActive = activeDays[0] ?? null;
  const daysSinceLastActive = lastActive && mounted
    ? Math.floor((Date.now() - new Date(lastActive.date).getTime()) / 86400000)
    : Infinity;

  let activityStatus: string;
  let pulseColor: string;
  if (daysSinceLastActive <= 7) {
    activityStatus = "Active Building";
    pulseColor = "bg-accent";
  } else if (daysSinceLastActive <= 30) {
    activityStatus = "Active";
    pulseColor = "bg-accent";
  } else if (daysSinceLastActive <= 90) {
    activityStatus = "Contributing";
    pulseColor = "bg-accent/60";
  } else {
    activityStatus = "Inactive";
    pulseColor = "bg-subtle";
  }

  return (
    <section id="github" className="py-24 relative">
      <div className="cinematic-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github size={16} className="text-foreground" />
              <h2 className="text-lg font-semibold text-foreground">GitHub Activity</h2>
            </div>
            <a
              href="https://github.com/saad-affan12"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View Profile
              <ExternalLink size={10} />
            </a>
          </motion.div>

          {weeks.length > 0 ? (
            <>
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-2">
                <div className="bg-card border border-border rounded-lg px-2 sm:px-4 py-3 text-center">
                  <div className="text-base sm:text-lg font-bold text-foreground">{total}</div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">Contributions</div>
                </div>
                <div className="bg-card border border-border rounded-lg px-2 sm:px-4 py-3 text-center">
                  <div className="text-base sm:text-lg font-bold text-foreground">{repos}</div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">Repositories</div>
                </div>
                <div className="bg-card border border-border rounded-lg px-2 sm:px-4 py-3 text-center flex items-center justify-center gap-2">
                  <span className="relative flex size-2">
                    <span className={`animate-ping absolute inline-flex size-full rounded-full ${pulseColor} opacity-75`} />
                    <span className={`relative inline-flex size-2 rounded-full ${pulseColor}`} />
                  </span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-foreground">{activityStatus}</div>
                    <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">Status</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-card border border-border rounded-xl p-4 sm:p-5 overflow-x-auto"
              >
                <div className="min-w-[760px]">
                  <div className="flex text-[10px] text-subtle ml-8 mb-1 h-4">
                    {monthLabels.map((m, i) => {
                      const nextWeekIndex = weeks.slice(m.weekIndex + 1).findIndex((w) => w[0] !== null);
                      const span = nextWeekIndex >= 0 ? nextWeekIndex + 1 : weeks.length - m.weekIndex;
                      const actualWidth = Math.max(span * 14, 20);
                      return (
                        <div
                          key={m.label + i}
                          style={{ width: `${actualWidth}px` }}
                          className="shrink-0"
                        >
                          {m.label}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-[2px]">
                    <div className="flex flex-col gap-[2px] mr-1 pt-0.5">
                      {["Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
                        <div key={i} className="h-[10px] flex items-center">
                          {day && <span className="text-[8px] text-subtle leading-none">{day}</span>}
                        </div>
                      ))}
                    </div>
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[2px]">
                        {week.map((day, di) => (
                          <div
                            key={`${wi}-${di}`}
                            className="relative"
                            onMouseEnter={(e) => {
                              if (day) {
                                const cell = e.currentTarget;
                                const cellRect = cell.getBoundingClientRect();
                                setTooltip({
                                  visible: true,
                                  x: cellRect.left + cellRect.width / 2,
                                  y: cellRect.top,
                                  date: day.date,
                                  count: day.count,
                                });
                              }
                            }}
                            onMouseLeave={() => setTooltip({ visible: false, x: 0, y: 0, date: "", count: 0 })}
                          >
                            {day ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (wi * 7 + di) * 0.0015 }}
                                                className={`size-[10px] rounded-[2px] ${useLevelColor(day.level, isLight)} transition-colors duration-200 hover:ring-1 hover:ring-accent/50 cursor-pointer`}
                              />
                            ) : (
                              <div className="size-[10px]" />
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-subtle">Less</span>
                      {[0, 1, 2, 3, 4].map((level) => (
                        <div key={level} className={`size-[10px] rounded-[2px] ${useLevelColor(level, isLight)}`} />
                      ))}
                      <span className="text-[10px] text-subtle">More</span>
                    </div>
                    <span className="text-[10px] text-subtle">{total} contributions in {year}</span>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div variants={fadeInUp} className="bg-card border border-border rounded-xl p-10 text-center">
              <div className="flex flex-col items-center gap-4">
                <Github size={32} className="text-subtle" />
                <p className="text-sm text-subtle">Unable to load contribution activity.</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {tooltip.visible && (
        <div
          className="fixed z-[100] pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, calc(-100% - 12px))" }}
        >
          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-2xl whitespace-nowrap">
            <p className="text-xs text-foreground font-medium">{formatDate(tooltip.date)}</p>
            <p className="text-[10px] text-accent">{tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}</p>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
        </div>
      )}
    </section>
  );
}
