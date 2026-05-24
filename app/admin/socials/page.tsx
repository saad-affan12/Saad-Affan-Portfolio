"use client";

import { useState, useEffect } from 'react';
import { useData, useRefreshData } from '@/hooks/useData';
import { TextInput } from '@/components/admin/forms/TextInput';
import { SaveButton } from '@/components/admin/forms/SaveButton';
import type { Socials } from '@/lib/types';

export default function SocialsEditor() {
  const socials = useData('socials');
  const refresh = useRefreshData();
  const [form, setForm] = useState<Socials>({ github: '', linkedin: '', instagram: '', email: '' });

  useEffect(() => {
    if (socials) setForm({ ...socials });
  }, [socials]);

  const handleSave = async () => {
    const res = await fetch('/api/data?key=socials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('Failed to save');
    await refresh();
  };

  const update = (key: keyof Socials, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-100">Social Links</h1>
        <p className="text-sm text-gray-500 mt-1">Edit your social media profiles</p>
      </div>

      <div className="space-y-4">
        <TextInput label="GitHub URL" value={form.github} onChange={(e) => update('github', e.target.value)} />
        <TextInput label="LinkedIn URL" value={form.linkedin} onChange={(e) => update('linkedin', e.target.value)} />
        <TextInput label="Instagram URL" value={form.instagram} onChange={(e) => update('instagram', e.target.value)} />
        <TextInput label="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
      </div>

      <SaveButton onSave={handleSave} />
    </div>
  );
}
