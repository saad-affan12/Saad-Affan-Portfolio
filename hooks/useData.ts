"use client";

import { useContext, useMemo } from 'react';
import { DataContext } from '@/components/providers/DataProvider';
import type { DataKey, DataValue } from '@/lib/types';

const DEFAULTS: Record<string, any> = {
  hero: {
    name: '',
    shortName: '',
    initials: '',
    tagline: '',
    role: '',
    description: '',
    email: '',
    location: '',
    birthDate: '',
    github: '',
    linkedin: '',
    instagram: '',
    portfolio: '',
    repo: '',
    resume: '',
    image: '',
    availability: 'Available',
  },
  projects: [],
  roadmap: [],
  education: [],
  skills: [],
  blog: [],
  changelog: [],
  socials: {
    github: '',
    linkedin: '',
    instagram: '',
    email: '',
  },
  settings: {
    setupCards: [],
    footerLinks: { links: [], meta: [], contact: [] },
    topNavLinks: [],
    dockLinks: [],
    sponsorInfo: { title: '', description: '', buttonLabel: '', buttonHref: '' }
  },
  seo: {
    title: '',
    description: '',
    keywords: [],
    author: '',
    ogTitle: '',
    ogDescription: '',
    twitterTitle: '',
    twitterDescription: ''
  },
  cli: {
    welcomeMessage: '',
    initialCommands: [],
    commandHelp: {}
  }
};

export function useData<T extends DataKey>(key: T, fallback?: DataValue<T>): DataValue<T> {
  const ctx = useContext(DataContext);
  return useMemo(() => {
    const val = ctx?.data?.[key];
    const defaultVal = fallback !== undefined ? fallback : DEFAULTS[key];

    if (val === undefined || val === null) {
      return defaultVal as DataValue<T>;
    }

    if (Array.isArray(defaultVal)) {
      return (Array.isArray(val) ? val : defaultVal) as DataValue<T>;
    }

    if (typeof defaultVal === 'object' && defaultVal !== null && typeof val === 'object' && val !== null) {
      return { ...defaultVal, ...val } as DataValue<T>;
    }

    return val as DataValue<T>;
  }, [ctx?.data, key, fallback]);
}

export function useAllData() {
  const ctx = useContext(DataContext);
  return ctx?.data || {};
}

export function useRefreshData() {
  const ctx = useContext(DataContext);
  return ctx?.refreshData || (async () => {});
}
