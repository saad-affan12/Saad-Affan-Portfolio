"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, User, FolderKanban, Briefcase, GraduationCap,
  Map, Wrench, Link2, Image as ImageIcon, Terminal, Search,
  Settings, Menu, X, ChevronLeft, ExternalLink, LogOut, BookOpen, History
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/hero', label: 'Hero', icon: User },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/roadmap', label: 'Roadmap', icon: Map },
  { href: '/admin/skills', label: 'Skills', icon: Wrench },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/socials', label: 'Social Links', icon: Link2 },
  { href: '/admin/media', label: 'Media', icon: ImageIcon },
  { href: '/admin/cli', label: 'CLI', icon: Terminal },
  { href: '/admin/seo', label: 'SEO', icon: Search },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-[#0d0d14] border-r border-white/[0.06] transition-all duration-300 ${
          sidebarOpen ? 'w-60' : 'w-0 lg:w-16'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className={`flex items-center h-14 px-4 border-b border-white/[0.06] ${!sidebarOpen && 'lg:justify-center lg:px-0'}`}>
          {sidebarOpen && (
            <Link href="/admin" className="text-sm font-bold tracking-tight">
              <span className="text-indigo-400">CMS</span>
              <span className="text-gray-400 ml-1">Portal</span>
            </Link>
          )}
          <button
            onClick={() => { setSidebarOpen(!sidebarOpen); setMobileOpen(false); }}
            className={`text-gray-500 hover:text-gray-200 transition-colors ${sidebarOpen ? 'ml-auto' : 'mx-auto'}`}
          >
            <ChevronLeft size={16} className={`transition-transform ${!sidebarOpen && 'rotate-180'}`} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  active
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] border border-transparent'
                } ${!sidebarOpen && 'lg:justify-center lg:px-2'}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={`border-t border-white/[0.06] p-3 ${!sidebarOpen && 'lg:flex lg:justify-center'}`}>
          {sidebarOpen && (
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              <ExternalLink size={12} />
              View Portfolio
            </a>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-white/[0.06] flex items-center px-4 gap-3 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-gray-400 hover:text-gray-200"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/admin" className="text-gray-500 hover:text-gray-300">CMS</Link>
            {pathname !== '/admin' && (
              <>
                <span className="text-gray-600">/</span>
                <span className="text-gray-200 capitalize">
                  {pathname.split('/').pop()?.replace(/-/g, ' ')}
                </span>
              </>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors"
              title="Sign out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-400 transition-colors"
            >
              <ExternalLink size={12} />
              <span className="hidden sm:inline">Portfolio</span>
            </a>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
