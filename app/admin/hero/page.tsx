"use client";

import { useState, useEffect } from 'react';
import { useData, useRefreshData } from '@/hooks/useData';
import { TextInput } from '@/components/admin/forms/TextInput';
import { TextArea } from '@/components/admin/forms/TextArea';
import { ImageUpload } from '@/components/admin/forms/ImageUpload';
import { SaveButton } from '@/components/admin/forms/SaveButton';
import type { Hero } from '@/lib/types';

export default function HeroEditor() {
  const hero = useData('hero');
  const refresh = useRefreshData();
  const [form, setForm] = useState<Hero | null>(null);

  useEffect(() => {
    if (hero) setForm({ ...hero });
  }, [hero]);

  if (!form) return <div className="text-gray-500 text-sm">Loading...</div>;

  const handleSave = async () => {
    const res = await fetch('/api/data?key=hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('Failed to save');
    await refresh();
  };

  const update = <K extends keyof Hero>(key: K, value: Hero[K]) => {
    setForm(prev => ({ ...prev!, [key]: value }));
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-100">Hero Section</h1>
        <p className="text-sm text-gray-500 mt-1">Edit your personal information and hero content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput label="Name" value={form.name} onChange={(e) => update('name', e.target.value)} />
        <TextInput label="Short Name" value={form.shortName} onChange={(e) => update('shortName', e.target.value)} />
        <TextInput label="Initials" value={form.initials} onChange={(e) => update('initials', e.target.value)} />
        <TextInput label="Tagline" value={form.tagline} onChange={(e) => update('tagline', e.target.value)} />
        <TextInput label="Role" value={form.role} onChange={(e) => update('role', e.target.value)} className="sm:col-span-2" />
        <TextInput label="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
        <TextInput label="Location" value={form.location} onChange={(e) => update('location', e.target.value)} />
        <TextInput label="Birth Date" value={form.birthDate} onChange={(e) => update('birthDate', e.target.value)} />
        <TextInput label="GitHub URL" value={form.github} onChange={(e) => update('github', e.target.value)} className="sm:col-span-2" />
        <TextInput label="LinkedIn URL" value={form.linkedin} onChange={(e) => update('linkedin', e.target.value)} className="sm:col-span-2" />
        <TextInput label="Instagram URL" value={form.instagram} onChange={(e) => update('instagram', e.target.value)} className="sm:col-span-2" />
        <TextInput label="Portfolio URL" value={form.portfolio} onChange={(e) => update('portfolio', e.target.value)} className="sm:col-span-2" />
        <TextInput label="Repo URL" value={form.repo} onChange={(e) => update('repo', e.target.value)} className="sm:col-span-2" />
        <TextInput label="Resume URL" value={form.resume} onChange={(e) => update('resume', e.target.value)} />
        <TextInput label="Availability" value={form.availability} onChange={(e) => update('availability', e.target.value)} className="sm:col-span-2" />
      </div>

      <TextArea label="Description" value={form.description} onChange={(e) => update('description', e.target.value)} rows={6} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ImageUpload label="Profile Image" value={form.image} onChange={(url) => update('image', url)} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SaveButton onSave={handleSave} />
      </div>
    </div>
  );
}
