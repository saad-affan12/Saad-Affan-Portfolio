"use client";

import { useState, useRef, DragEvent } from 'react';
import { Upload, X, FileImage } from 'lucide-react';

interface Props {
  label: string;
  value: string | null;
  onChange: (url: string) => void;
  onDelete?: () => void;
}

export function ImageUpload({ label, value, onChange }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) onChange(data.url);
    } catch {}
    setUploading(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-400 tracking-wide uppercase">{label}</label>
      {value ? (
        <div className="relative group">
          <img src={value} alt={label} className="w-full h-32 object-cover rounded-lg border border-white/[0.08]" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Upload size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`w-full h-32 flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-all ${
            dragOver ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/[0.08] hover:border-white/[0.15] bg-[#0d0d14]'
          }`}
        >
          {uploading ? (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="size-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              Uploading...
            </div>
          ) : (
            <>
              <FileImage size={20} className="text-gray-500 mb-1" />
              <span className="text-xs text-gray-500">Drop image or click to upload</span>
            </>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
