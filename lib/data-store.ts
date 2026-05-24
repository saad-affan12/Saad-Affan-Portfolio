import fs from 'fs';
import path from 'path';
import { DATA_FILES, type DataKey } from '@/lib/types';

const DATA_DIR = path.join(process.cwd(), 'data');

const memoryStore = new Map<string, unknown>();

function isVercel(): boolean {
  return !!process.env.VERCEL;
}

export function readDataFile<T>(key: string): T | null {
  if (memoryStore.has(key)) {
    return memoryStore.get(key) as T;
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

export function writeDataFile(key: string, data: unknown): boolean {
  memoryStore.set(key, data);
  if (isVercel()) return true;
  try {
    const filename = DATA_FILES[key as DataKey];
    if (!filename) return false;
    const filePath = path.join(DATA_DIR, filename);
    const tmpPath = filePath + '.tmp';
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpPath, filePath);
    return true;
  } catch {
    return true;
  }
}

export function readAllDataFiles(): Record<string, unknown> {
  const all: Record<string, unknown> = {};
  for (const key of Object.keys(DATA_FILES)) {
    const data = readDataFile(key);
    if (data !== null) {
      all[key] = data;
    }
  }
  return all;
}
