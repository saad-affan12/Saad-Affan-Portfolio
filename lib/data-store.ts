import fs from 'fs';
import path from 'path';
import { DATA_FILES, type DataKey } from '@/lib/types';
import { supabaseAdmin } from '@/lib/supabase';
import { syncDataToGitHub, isGitHubConfigured } from '@/lib/github-sync';

const DATA_DIR = path.join(process.cwd(), 'data');

const memoryStore = new Map<string, unknown>();

function isVercel(): boolean {
  return !!process.env.VERCEL;
}

export async function readDataFile<T>(key: string): Promise<T | null> {
  if (memoryStore.has(key)) {
    return memoryStore.get(key) as T;
  }

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('portfolio_data')
        .select('data')
        .eq('key', key)
        .single();
      if (data && !error) {
        memoryStore.set(key, data.data);
        return data.data as T;
      }
    } catch {}
  }

  const filename = DATA_FILES[key as DataKey];
  if (!filename) return null;
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
      memoryStore.set(key, content);
      return content;
    }
  } catch {}
  return null;
}

export async function writeDataFile(key: string, data: unknown): Promise<{ success: boolean; githubSync: boolean }> {
  memoryStore.set(key, data);

  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('portfolio_data')
        .upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: 'key' });
      if (error) {
        console.error('Supabase write error:', error.message);
      }
    } catch (e) {
      console.error('Supabase write exception:', e);
    }
  }

  if (!isVercel()) {
    try {
      const filename = DATA_FILES[key as DataKey];
      if (!filename) return { success: false, githubSync: false };
      const filePath = path.join(DATA_DIR, filename);
      const tmpPath = filePath + '.tmp';
      fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tmpPath, filePath);
    } catch (e) {
      console.error('File write error:', e);
    }
  }

  const githubConfigured = isGitHubConfigured();
  if (githubConfigured) {
    syncDataToGitHub(key, data);
  }

  return { success: true, githubSync: githubConfigured };
}

export async function readAllDataFiles(): Promise<Record<string, unknown>> {
  const all: Record<string, unknown> = {};
  for (const key of Object.keys(DATA_FILES)) {
    const data = await readDataFile(key);
    if (data !== null) {
      all[key] = data;
    }
  }
  return all;
}
