"use client";

import { useState, useEffect } from 'react';
import { Upload, Trash2, Copy, Check } from 'lucide-react';

interface MediaFile {
  name: string;
  url: string;
  type: string;
}

export default function MediaEditor() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const loadFiles = () => {
    fetch('/api/data?key=hero')
      .then(() => {})
      .catch(() => {});
  };

  useEffect(() => { loadFiles(); }, []);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setFiles(prev => [...prev, { name: data.filename, url: data.url, type: file.type }]);
      }
    } catch {}
    setUploading(false);
  };

  const handleDelete = async (url: string) => {
    if (!confirm('Delete this file?')) return;
    try {
      await fetch(`/api/upload?url=${encodeURIComponent(url)}`, { method: 'DELETE' });
      setFiles(files.filter(f => f.url !== url));
    } catch {}
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleUpload(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-100">Media Manager</h1>
        <p className="text-sm text-gray-500 mt-1">Upload and manage images for your portfolio</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`w-full rounded-xl border-2 border-dashed p-8 text-center transition-all ${
          dragOver ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/[0.08] hover:border-white/[0.15]'
        }`}
      >
        <input
          type="file"
          id="media-upload"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files) Array.from(files).forEach(handleUpload);
          }}
          className="hidden"
        />
        <label htmlFor="media-upload" className="cursor-pointer flex flex-col items-center gap-2">
          {uploading ? (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="size-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              Uploading...
            </div>
          ) : (
            <>
              <Upload size={24} className="text-gray-500" />
              <span className="text-sm text-gray-400">Drop images here or click to upload</span>
              <span className="text-xs text-gray-600">PNG, JPG, WebP, SVG — max 10MB</span>
            </>
          )}
        </label>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.url} className="group relative rounded-xl border border-white/[0.06] overflow-hidden bg-[#0d0d14]">
              <div className="aspect-square">
                <img src={file.url} alt={file.name} className="size-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(file.url)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  title="Copy URL"
                >
                  {copied === file.url ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
                <button
                  onClick={() => handleDelete(file.url)}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
              <p className="text-[10px] text-gray-500 truncate px-2 py-1">{file.name}</p>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && !uploading && (
        <div className="text-center py-12 text-gray-600 text-sm">
          No files uploaded yet. Drop images above to get started.
        </div>
      )}
    </div>
  );
}
