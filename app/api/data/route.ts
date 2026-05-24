import { NextRequest, NextResponse } from 'next/server';
import { DATA_FILES, type DataKey } from '@/lib/types';
import { readDataFile, readAllDataFiles, writeDataFile } from '@/lib/data-store';

function isValidKey(key: string): key is DataKey {
  return key in DATA_FILES;
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key') || request.nextUrl.searchParams.get('file')?.replace('.json', '');

  if (key) {
    if (!isValidKey(key)) {
      return NextResponse.json({ error: `Invalid data key: ${key}` }, { status: 400 });
    }
    const data = readDataFile<unknown>(key);
    if (data === null) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  }

  const all = readAllDataFiles();
  return NextResponse.json(all);
}

export async function PUT(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key') || request.nextUrl.searchParams.get('file')?.replace('.json', '');

  if (!key || !isValidKey(key)) {
    return NextResponse.json({ error: 'Valid data key is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    writeDataFile(key, body);
    return NextResponse.json({ success: true, key });
  } catch {
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
