import fs from 'fs';
import path from 'path';
import type { DataKey, DataValue, DataMap } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

export function readJson<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function readData<T extends DataKey>(key: T): DataValue<T> {
  const filename = `${key}.json`;
  return readJson<DataValue<T>>(filename);
}

export function readAllData(): DataMap {
  try {
    return {
      hero: readData('hero'),
      projects: readData('projects'),
      roadmap: readData('roadmap'),
      education: readData('education'),
      skills: readData('skills'),
      socials: readData('socials'),
      settings: readData('settings'),
      seo: readData('seo'),
      cli: readData('cli'),
    };
  } catch {
    return {
      hero: {} as DataValue<'hero'>,
      projects: [] as unknown as DataValue<'projects'>,
      roadmap: [] as unknown as DataValue<'roadmap'>,
      education: [] as unknown as DataValue<'education'>,
      skills: [] as unknown as DataValue<'skills'>,
      socials: {} as DataValue<'socials'>,
      settings: {} as DataValue<'settings'>,
      seo: {} as DataValue<'seo'>,
      cli: {} as DataValue<'cli'>,
    };
  }
}
