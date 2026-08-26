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
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);

    // Client-side file type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setError('File type not allowed. Please upload JPG, PNG, GIF, WebP, or SVG.');
      setUploading(false);
      return;
    }

    // Client-side file size validation (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File too large. Maximum allowed size is 10MB.');
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Upload failed');
      }
      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        throw new Error('Upload failed: missing response URL');
      }
    } catch (err: any) {
      setError(err.message || 'Connection error during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
    e.target.value = ''; // Reset input value so same file can be uploaded again
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-400 tracking-wide uppercase">{label}</label>
      {value ? (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          className={`relative group rounded-lg overflow-hidden border border-white/[0.08] ${
            uploading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <img src={value} alt={label} className="w-full h-32 object-cover" />
          {uploading ? (
            <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center gap-2 text-gray-400 text-sm">
              <div className="size-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              Uploading...
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors pointer-events-none">
                <Upload size={16} className="text-white" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
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
      {error && (
        <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
