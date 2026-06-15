import type { SyncStatus } from '@/lib/types/github';

let currentStatus: SyncStatus = {
  lastSyncAt: null,
  lastCommitSha: null,
  lastCommitMessage: null,
  branch: process.env.GIT_BRANCH || 'main',
  status: 'idle',
  lastError: null,
};

export function getSyncStatus(): SyncStatus {
  return { ...currentStatus };
}

export function updateSyncStatus(update: Partial<SyncStatus>): void {
  currentStatus = { ...currentStatus, ...update };
}

export function markSyncStarted(): void {
  currentStatus = { ...currentStatus, status: 'syncing' };
}

export function markSyncSuccess(sha: string, message: string): void {
  currentStatus = {
    ...currentStatus,
    status: 'success',
    lastSyncAt: new Date().toISOString(),
    lastCommitSha: sha,
    lastCommitMessage: message,
    lastError: null,
  };
}

export function markSyncError(error: string): void {
  currentStatus = {
    ...currentStatus,
    status: 'error',
    lastError: error,
  };
}
