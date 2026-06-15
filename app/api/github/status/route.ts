import { NextResponse } from 'next/server';
import { getSyncStatus } from '@/lib/sync-status';
import { isGitHubConfigured, validateGitHubConfig } from '@/lib/github-sync';

export const dynamic = 'force-dynamic';

export async function GET() {
  const status = getSyncStatus();
  const configErrors = validateGitHubConfig();

  return NextResponse.json({
    ...status,
    configured: isGitHubConfigured(),
    configErrors: configErrors.length > 0 ? configErrors : undefined,
  });
}
