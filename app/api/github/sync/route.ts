import { NextRequest, NextResponse } from 'next/server';
import { readDataFile } from '@/lib/data-store';
import { syncDataToGitHub, isGitHubConfigured, validateGitHubConfig } from '@/lib/github-sync';
import { DATA_FILES, type DataKey } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const configErrors = validateGitHubConfig();
  if (configErrors.length > 0) {
    return NextResponse.json({ error: 'GitHub not configured', details: configErrors }, { status: 400 });
  }

  let key: string | null = null;

  try {
    const body = await request.json();
    key = body.key || null;
  } catch {}

  if (key) {
    if (!(key in DATA_FILES)) {
      return NextResponse.json({ error: `Invalid data key: ${key}` }, { status: 400 });
    }
    const data = await readDataFile<unknown>(key);
    if (data === null) {
      return NextResponse.json({ error: `No data found for key: ${key}` }, { status: 404 });
    }
    const result = await syncDataToGitHub(key, data);
    return NextResponse.json(result);
  }

  const results = [];
  const keys = Object.keys(DATA_FILES) as DataKey[];
  for (const k of keys) {
    const data = await readDataFile<unknown>(k);
    if (data !== null) {
      const result = await syncDataToGitHub(k, data);
      results.push(result);
    }
  }

  return NextResponse.json({ results, total: results.length, success: results.every((r) => r.success) });
}
