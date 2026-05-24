"use client";

import { createContext, useEffect, useState, useRef, useCallback } from 'react';
import type { DataKey, DataValue, DataMap } from '@/lib/types';

interface DataContextValue {
  data: Partial<DataMap>;
  getData: <T extends DataKey>(key: T) => DataValue<T> | undefined;
  refreshData: () => Promise<void>;
}

export const DataContext = createContext<DataContextValue>({
  data: {},
  getData: () => undefined,
  refreshData: async () => {},
});

export function DataProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: Partial<DataMap>;
}) {
  const [data, setData] = useState<Partial<DataMap>>(initialData);
  const eventSourceRef = useRef<EventSource | null>(null);
  const dataRef = useRef(data);
  dataRef.current = data;

  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const all = await res.json();
        setData(prev => ({ ...prev, ...all }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    let es: EventSource | null = null;

    const connect = () => {
      const source = new EventSource('/api/data/sse');
      source.onmessage = (event) => {
        try {
          const { key, data: newData } = JSON.parse(event.data);
          setData(prev => ({ ...prev, [key]: newData }));
        } catch {}
      };
      source.onerror = () => {
        source.close();
        setTimeout(connect, 2000);
      };
      es = source;
    };

    connect();
    eventSourceRef.current = es;

    return () => {
      es?.close();
    };
  }, []);

  const getData = useCallback(<T extends DataKey>(key: T): DataValue<T> | undefined => {
    return dataRef.current[key] as DataValue<T> | undefined;
  }, []);

  return (
    <DataContext.Provider value={{ data, getData, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}
