"use client";

import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface Props {
  label: string;
  tags?: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ label, tags = [], onChange, placeholder = 'Add tag...' }: Props) {
  const [input, setInput] = useState('');

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter(t => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-400 tracking-wide uppercase">{label}</label>
      <div className="w-full bg-[#0d0d14] border border-white/[0.08] rounded-lg px-3 py-2 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 bg-indigo-500/10 text-indigo-400 text-xs px-2 py-0.5 rounded-md border border-indigo-500/20">
              {tag}
              <button onClick={() => removeTag(tag)} className="hover:text-indigo-200">
                <X size={10} />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => input && addTag(input)}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[80px] bg-transparent text-sm text-gray-100 placeholder-gray-600 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
