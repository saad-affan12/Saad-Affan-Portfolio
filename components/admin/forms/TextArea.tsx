"use client";

import { TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextArea({ label, error, className = '', ...props }: Props) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-400 tracking-wide uppercase">{label}</label>
      <textarea
        {...props}
        className={`w-full bg-[#0d0d14] border ${error ? 'border-red-500/50' : 'border-white/[0.08]'} rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-y min-h-[80px] ${className}`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
