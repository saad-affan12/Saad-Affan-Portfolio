"use client";

import { useEffect, useState } from 'react';
import { Check, AlertCircle, X, Loader2 } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'loading';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export function ToastContainer({ toasts, onDismiss }: { toasts: ToastMessage[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 200);
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const icon = {
    success: <Check size={16} className="text-emerald-400" />,
    error: <AlertCircle size={16} className="text-red-400" />,
    info: <Loader2 size={16} className="text-indigo-400" />,
    loading: <Loader2 size={16} className="text-indigo-400 animate-spin" />,
  };

  const border = {
    success: 'border-emerald-500/20',
    error: 'border-red-500/20',
    info: 'border-indigo-500/20',
    loading: 'border-indigo-500/20',
  };

  const bg = {
    success: 'bg-emerald-500/10',
    error: 'bg-red-500/10',
    info: 'bg-indigo-500/10',
    loading: 'bg-indigo-500/10',
  };

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${border[toast.type]} ${bg[toast.type]} backdrop-blur-sm transition-all duration-200 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="mt-0.5 shrink-0">{icon[toast.type]}</div>
      <p className="text-sm text-gray-200 flex-1">{toast.message}</p>
      <button onClick={() => onDismiss(toast.id)} className="text-gray-500 hover:text-gray-300 shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}
