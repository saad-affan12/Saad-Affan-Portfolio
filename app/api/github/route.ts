import { NextResponse } from 'next/server';
import { fetchGitHubProfile, fetchGitHubContributions } from '@/lib/github';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [profile, contributions] = await Promise.all([
      fetchGitHubProfile().catch(() => null),
      fetchGitHubContributions().catch(() => null),
    ]);
    return NextResponse.json({ profile, contributions });
  } catch (error) {
    return NextResponse.json({ profile: null, contributions: null }, { status: 500 });
  }
}
