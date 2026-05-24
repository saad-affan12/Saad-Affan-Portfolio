"use client";

import { useState } from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';

interface Props {
  onSave: () => Promise<void>;
  label?: string;
}

export function SaveButton({ onSave, label = 'Save Changes' }: Props) {
  const [state, setState] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleClick = async () => {
    setState('saving');
    try {
      await onSave();
      setState('success');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 3000);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={state === 'saving'}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        state === 'success'
          ? 'bg-emerald-500 text-white'
          : state === 'error'
          ? 'bg-red-500 text-white'
          : 'bg-indigo-500 text-white hover:bg-indigo-400 active:scale-[0.98]'
      } disabled:opacity-70`}
    >
      {state === 'saving' && <Loader2 size={14} className="animate-spin" />}
      {state === 'success' && <Check size={14} />}
      {state === 'error' && <AlertCircle size={14} />}
      {state === 'saving' ? 'Saving...' : state === 'success' ? 'Saved!' : state === 'error' ? 'Error' : label}
    </button>
  );
}
