"use client";

import { motion } from "framer-motion";
import { useData } from "@/hooks/useData";
import type { GitHubProfile, ContributionsResponse } from "@/lib/github";

export default function ProfileCard({
  profile,
  contributions,
}: {
  profile: GitHubProfile | null;
  contributions: ContributionsResponse | null;
}) {
  const personalInfo = useData('hero', { name: '', initials: '', role: '', shortName: '', description: '', tagline: '', image: '', resume: '', github: '', linkedin: '', email: '', instagram: '', location: '', availability: '', birthDate: '', portfolio: '', repo: '' });
  const education = useData('education', []);
  const repos = profile?.public_repos ?? 9;
  const totalContributions = contributions?.total
    ? Object.values(contributions.total).reduce((a, b) => a + b, 0)
    : 172;
  const cgpa = education[0]?.cgpa ?? "8.11 CGPA";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="relative group mx-auto sm:mx-0 max-w-xs sm:max-w-none"
    >
      <div className="bg-card border border-border rounded-2xl p-6 text-center space-y-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]">
        <div className="mx-auto size-24 sm:size-28 rounded-full overflow-hidden ring-2 ring-accent/30">
          <img
            src={personalInfo.image}
            alt={personalInfo.name}
            className="size-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {personalInfo.shortName}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {personalInfo.role}
          </p>
        </div>

        <div className="flex justify-center gap-2">
          <div className="bg-muted rounded-lg px-3 py-2 text-center min-w-[72px]">
            <div className="text-sm font-bold text-foreground">
              {typeof cgpa === "string" ? cgpa.replace(" CGPA", "") : cgpa}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              CGPA
            </div>
          </div>
          <div className="bg-muted rounded-lg px-3 py-2 text-center min-w-[72px]">
            <motion.div
              className="text-sm font-bold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {repos}
            </motion.div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              Repos
            </div>
          </div>
          <div className="bg-muted rounded-lg px-3 py-2 text-center min-w-[72px]">
            <motion.div
              className="text-sm font-bold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {totalContributions}
            </motion.div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              Contribs
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
