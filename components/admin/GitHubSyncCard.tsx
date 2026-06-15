"use client";

import { useState, useEffect, useCallback } from 'react';
import { GitBranch, GitCommit, Clock, RefreshCw, Check, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import type { SyncStatus } from '@/lib/types/github';

export function GitHubSyncCard() {
  const [status, setStatus] = useState<SyncStatus & { configured?: boolean; configErrors?: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/github/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const handleSyncNow = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/github/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = await res.json();
      await fetchStatus();
    } catch {
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#0d0d14] p-5">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 size={14} className="animate-spin" />
          Loading sync status...
        </div>
      </div>
    );
  }

  const notConfigured = status && !status.configured;
  const statusIcon = notConfigured ? 'off' : status?.status === 'error' ? 'error' : status?.status === 'syncing' || syncing ? 'syncing' : 'ok';

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0d0d14] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch size={16} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-200">GitHub Sync</h2>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${
          statusIcon === 'ok' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          : statusIcon === 'syncing' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
          : statusIcon === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20'
          : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }`}>
          {statusIcon === 'ok' ? 'Connected' : statusIcon === 'syncing' ? 'Syncing...' : statusIcon === 'error' ? 'Error' : 'Disconnected'}
        </span>
      </div>

      {notConfigured && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <AlertCircle size={14} className="text-amber-400 mt-0.5 shrink-0" />
          <div className="text-xs text-amber-300 space-y-1">
            <p>GitHub sync is not configured.</p>
            <p>Set the <code className="text-amber-200">GITHUB_TOKEN</code> environment variable to enable auto-sync.</p>
          </div>
        </div>
      )}

      {status?.configErrors && status.configErrors.length > 0 && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
          <div className="text-xs text-red-300">
            {status.configErrors.map((err, i) => <p key={i}>{err}</p>)}
          </div>
        </div>
      )}

      {status && !notConfigured && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <GitBranch size={12} />
            <span>Branch: <span className="text-gray-200">{status.branch}</span></span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <RefreshCw size={12} />
            <span>Status: <span className="text-gray-200 capitalize">{status.status}</span></span>
          </div>
          {status.lastSyncAt && (
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={12} />
              <span>Last sync: <span className="text-gray-200">{formatTime(status.lastSyncAt)}</span></span>
            </div>
          )}
          {status.lastCommitSha && (
            <div className="flex items-center gap-2 text-gray-400">
              <GitCommit size={12} />
              <span>Commit: <span className="text-gray-200 font-mono">{status.lastCommitSha.slice(0, 7)}</span></span>
            </div>
          )}
        </div>
      )}

      {status?.lastError && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
          <p className="text-xs text-red-300">{status.lastError}</p>
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleSyncNow}
          disabled={syncing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors disabled:opacity-50"
        >
          {syncing ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
          {syncing ? 'Syncing...' : 'Sync Now'}
        </button>
        <a
          href="https://github.com/saad-affan12/Saad-Affan-Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 border border-white/[0.06] hover:text-gray-200 hover:border-white/20 transition-colors"
        >
          <ExternalLink size={12} />
          View on GitHub
        </a>
      </div>
    </div>
  );
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return 'just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return date.toLocaleDateString();
}
