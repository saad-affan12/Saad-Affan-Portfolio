"use client";

import { useContext, useMemo } from 'react';
import { DataContext } from '@/components/providers/DataProvider';
import type { DataKey, DataValue } from '@/lib/types';

export function useData<T extends DataKey>(key: T, fallback?: DataValue<T>): DataValue<T> {
  const ctx = useContext(DataContext);
  return useMemo(() => {
    return (ctx.data[key] ?? fallback) as DataValue<T>;
  }, [ctx.data, key, fallback]);
}

export function useAllData() {
  const ctx = useContext(DataContext);
  return ctx.data;
}

export function useRefreshData() {
  const ctx = useContext(DataContext);
  return ctx.refreshData;
}
