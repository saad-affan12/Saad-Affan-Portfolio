"use client";

import { useState, useEffect } from 'react';
import { useData, useRefreshData } from '@/hooks/useData';
import { TextInput } from '@/components/admin/forms/TextInput';
import { TextArea } from '@/components/admin/forms/TextArea';
import { TagInput } from '@/components/admin/forms/TagInput';
import { SaveButton } from '@/components/admin/forms/SaveButton';
import type { SEO } from '@/lib/types';

export default function SeoEditor() {
  const seo = useData('seo');
  const refresh = useRefreshData();
  const [form, setForm] = useState<SEO>({
    title: '', description: '', keywords: [], author: '',
    ogTitle: '', ogDescription: '', twitterTitle: '', twitterDescription: '',
  });

  useEffect(() => {
    if (seo) setForm({ ...seo });
  }, [seo]);

  const handleSave = async () => {
    const res = await fetch('/api/data?key=seo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('Failed to save');
    await refresh();
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-100">SEO</h1>
        <p className="text-sm text-gray-500 mt-1">Edit meta tags and search engine optimization</p>
      </div>

      <TextInput label="Meta Title" value={form.title} onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))} />
      <TextArea label="Meta Description" value={form.description} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} rows={3} />
      <TagInput label="Keywords" tags={form.keywords} onChange={(keywords) => setForm(prev => ({ ...prev, keywords }))} />
      <TextInput label="Author" value={form.author} onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))} />

      <div className="border-t border-white/[0.06] pt-4 space-y-4">
        <h3 className="text-sm font-semibold text-gray-300">Open Graph</h3>
        <TextInput label="OG Title" value={form.ogTitle} onChange={(e) => setForm(prev => ({ ...prev, ogTitle: e.target.value }))} />
        <TextArea label="OG Description" value={form.ogDescription} onChange={(e) => setForm(prev => ({ ...prev, ogDescription: e.target.value }))} rows={2} />
      </div>

      <div className="border-t border-white/[0.06] pt-4 space-y-4">
        <h3 className="text-sm font-semibold text-gray-300">Twitter Card</h3>
        <TextInput label="Twitter Title" value={form.twitterTitle} onChange={(e) => setForm(prev => ({ ...prev, twitterTitle: e.target.value }))} />
        <TextArea label="Twitter Description" value={form.twitterDescription} onChange={(e) => setForm(prev => ({ ...prev, twitterDescription: e.target.value }))} rows={2} />
      </div>

      <SaveButton onSave={handleSave} />
    </div>
  );
}
