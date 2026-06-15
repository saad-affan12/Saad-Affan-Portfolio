export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

export interface GitHubFile {
  path: string;
  sha: string;
  content: string;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  date: string;
}

export interface SyncResult {
  success: boolean;
  key: string;
  commitSha?: string;
  commitMessage?: string;
  error?: string;
  attempt: number;
}

export interface SyncStatus {
  lastSyncAt: string | null;
  lastCommitSha: string | null;
  lastCommitMessage: string | null;
  branch: string;
  status: 'idle' | 'syncing' | 'success' | 'error';
  lastError: string | null;
}

export const COMMIT_MESSAGES: Record<string, string> = {
  hero: 'update: hero section content',
  projects: 'update: projects data',
  roadmap: 'update: experience section',
  education: 'update: education section',
  skills: 'update: skills data',
  socials: 'update: social links',
  settings: 'update: portfolio settings',
  seo: 'update: SEO metadata',
  cli: 'update: CLI configuration',
};

export function getCommitMessage(key: string): string {
  return COMMIT_MESSAGES[key] || `update: ${key} data`;
}
