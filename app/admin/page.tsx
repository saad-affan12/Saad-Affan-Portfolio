"use client";

import { useData } from '@/hooks/useData';
import { LayoutDashboard, FolderKanban, Briefcase, GraduationCap, Wrench, Map, User } from 'lucide-react';
import Link from 'next/link';

const cards = [
  { label: 'Hero', href: '/admin/hero', icon: User, color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/20', key: 'hero' as const },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban, color: 'from-violet-500/20 to-violet-600/5', border: 'border-violet-500/20', key: 'projects' as const, count: true },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase, color: 'from-emerald-500/20 to-emerald-600/5', border: 'border-emerald-500/20', key: 'roadmap' as const },
  { label: 'Education', href: '/admin/education', icon: GraduationCap, color: 'from-amber-500/20 to-amber-600/5', border: 'border-amber-500/20', key: 'education' as const },
  { label: 'Skills', href: '/admin/skills', icon: Wrench, color: 'from-rose-500/20 to-rose-600/5', border: 'border-rose-500/20', key: 'skills' as const },
  { label: 'Roadmap', href: '/admin/roadmap', icon: Map, color: 'from-cyan-500/20 to-cyan-600/5', border: 'border-cyan-500/20', key: 'roadmap' as const },
];

export default function AdminDashboard() {
  const projects = useData('projects', []);
  const roadmap = useData('roadmap', []);
  const education = useData('education', []);
  const skills = useData('skills', []);

  const getCount = (key: string) => {
    if (key === 'projects') return projects.length;
    if (key === 'roadmap') return roadmap.length;
    if (key === 'education') return education.length;
    if (key === 'skills') return skills.length;
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const count = getCount(card.key);
          return (
            <Link
              key={card.href}
              href={card.href}
              className={`group relative overflow-hidden rounded-xl border ${card.border} bg-gradient-to-br ${card.color} p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Icon size={20} className="text-gray-400 group-hover:text-gray-200 transition-colors" />
                  <h3 className="text-sm font-medium text-gray-200">{card.label}</h3>
                </div>
                {count !== null && (
                  <span className="text-2xl font-bold text-gray-200/80">{count}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#0d0d14] p-5">
        <h2 className="text-sm font-semibold text-gray-200 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/projects" className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors">
            + Add Project
          </Link>
          <Link href="/admin/hero" className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
            Edit Hero
          </Link>
          <Link href="/admin/skills" className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
            Manage Skills
          </Link>
        </div>
      </div>
    </div>
  );
}
