import { DATA_FILES, type DataKey } from '@/lib/types';
import type { GitHubConfig, SyncResult } from '@/lib/types/github';
import { getCommitMessage } from '@/lib/types/github';
import { markSyncStarted, markSyncSuccess, markSyncError } from '@/lib/sync-status';

const RETRY_MAX = 3;
const RETRY_DELAYS = [0, 1000, 3000];

function getConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GIT_REPO_OWNER || 'saad-affan12';
  const repo = process.env.GIT_REPO_NAME || 'Saad-Affan-Portfolio';
  const branch = process.env.GIT_BRANCH || 'main';

  if (!token) {
    return null;
  }

  return { token, owner, repo, branch };
}

export function validateGitHubConfig(): string[] {
  const errors: string[] = [];
  if (!process.env.GITHUB_TOKEN) errors.push('GITHUB_TOKEN is not set');
  return errors;
}

export function isGitHubConfigured(): boolean {
  return !!process.env.GITHUB_TOKEN;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getFileSha(config: GitHubConfig, path: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${config.token}` },
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    const body = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${body}`);
  }
  const data = await res.json();
  return data.sha || null;
}

async function commitFile(
  config: GitHubConfig,
  path: string,
  content: string,
  message: string,
  sha: string | null
): Promise<{ sha: string }> {
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;
  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch: config.branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${errBody}`);
  }

  const data = await res.json();
  return { sha: data.content?.sha || data.commit?.sha || '' };
}

export async function syncDataToGitHub(key: string, data: unknown): Promise<SyncResult> {
  const config = getConfig();
  if (!config) {
    return { success: false, key, error: 'GitHub not configured (missing GITHUB_TOKEN)', attempt: 0 };
  }

  markSyncStarted();

  const filename = DATA_FILES[key as DataKey];
  if (!filename) {
    const err = `Unknown data key: ${key}`;
    markSyncError(err);
    return { success: false, key, error: err, attempt: 0 };
  }

  const filePath = `data/${filename}`;
  const content = JSON.stringify(data, null, 2);
  const message = getCommitMessage(key);

  let lastError: string | null = null;

  for (let attempt = 1; attempt <= RETRY_MAX; attempt++) {
    try {
      await delay(RETRY_DELAYS[attempt - 1] || 0);

      const sha = await getFileSha(config, filePath);
      const result = await commitFile(config, filePath, content, message, sha);

      markSyncSuccess(result.sha, message);
      return {
        success: true,
        key,
        commitSha: result.sha,
        commitMessage: message,
        attempt,
      };
    } catch (e) {
      lastError = e instanceof Error ? e.message : String(e);

      if (attempt < RETRY_MAX) {
        console.warn(`GitHub sync attempt ${attempt}/${RETRY_MAX} failed for ${key}: ${lastError}`);
      }
    }
  }

  markSyncError(lastError || 'Unknown error');
  return { success: false, key, error: lastError || 'Unknown error', attempt: RETRY_MAX };
}
