"use client";

import { useState, useEffect } from 'react';
import { useData, useRefreshData } from '@/hooks/useData';
import { TextInput } from '@/components/admin/forms/TextInput';
import { TextArea } from '@/components/admin/forms/TextArea';
import { TagInput } from '@/components/admin/forms/TagInput';
import { SaveButton } from '@/components/admin/forms/SaveButton';
import { DragList } from '@/components/admin/forms/DragList';
import { Plus, Trash2 } from 'lucide-react';
import type { Settings, NavLink, DockLink, SetupCard } from '@/lib/types';

export default function SettingsEditor() {
  const settings = useData('settings');
  const refresh = useRefreshData();
  const [form, setForm] = useState<Settings | null>(null);

  useEffect(() => {
    if (settings) setForm(JSON.parse(JSON.stringify(settings)));
  }, [settings]);

  const handleSave = async () => {
    if (!form) return;
    const res = await fetch('/api/data?key=settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('Failed to save');
    await refresh();
  };

  if (!form) return <div className="text-gray-500 text-sm">Loading...</div>;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-gray-100">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage navigation, footer, dock, and toolkit</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-300 border-b border-white/[0.06] pb-2">Setup Cards (Toolkit)</h2>
        {form.setupCards.map((card, i) => (
          <div key={i} className="flex items-start gap-3 bg-[#0d0d14] border border-white/[0.06] rounded-lg p-3">
            <div className="flex-1 space-y-2">
              <TextInput label="Title" value={card.title} onChange={(e) => {
                const newCards = [...form.setupCards];
                newCards[i] = { ...newCards[i], title: e.target.value };
                setForm({ ...form, setupCards: newCards });
              }} />
              <div className="grid grid-cols-2 gap-2">
                <TextInput label="Description" value={card.description} onChange={(e) => {
                  const newCards = [...form.setupCards];
                  newCards[i] = { ...newCards[i], description: e.target.value };
                  setForm({ ...form, setupCards: newCards });
                }} />
                <TextInput label="Icon" value={card.icon} onChange={(e) => {
                  const newCards = [...form.setupCards];
                  newCards[i] = { ...newCards[i], icon: e.target.value };
                  setForm({ ...form, setupCards: newCards });
                }} />
              </div>
            </div>
            <button onClick={() => {
              setForm({ ...form, setupCards: form.setupCards.filter((_, j) => j !== i) });
            }} className="text-red-400 hover:text-red-300 mt-6"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={() => {
          setForm({ ...form, setupCards: [...form.setupCards, { title: '', description: '', icon: 'code' }] });
        }} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><Plus size={12} /> Add Card</button>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-300 border-b border-white/[0.06] pb-2">Top Navigation Links</h2>
        {form.topNavLinks.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <TextInput label="Label" value={link.label} onChange={(e) => {
              const newLinks = [...form.topNavLinks];
              newLinks[i] = { ...newLinks[i], label: e.target.value };
              setForm({ ...form, topNavLinks: newLinks });
            }} />
            <TextInput label="Href" value={link.href} onChange={(e) => {
              const newLinks = [...form.topNavLinks];
              newLinks[i] = { ...newLinks[i], href: e.target.value };
              setForm({ ...form, topNavLinks: newLinks });
            }} />
            <button onClick={() => {
              setForm({ ...form, topNavLinks: form.topNavLinks.filter((_, j) => j !== i) });
            }} className="text-red-400 hover:text-red-300 mt-5"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={() => {
          setForm({ ...form, topNavLinks: [...form.topNavLinks, { label: '', href: '/' }] });
        }} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><Plus size={12} /> Add Link</button>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-300 border-b border-white/[0.06] pb-2">Dock Links</h2>
        {form.dockLinks.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <TextInput label="Label" value={link.label} onChange={(e) => {
              const newLinks = [...form.dockLinks];
              newLinks[i] = { ...newLinks[i], label: e.target.value };
              setForm({ ...form, dockLinks: newLinks });
            }} />
            <TextInput label="Href" value={link.href} onChange={(e) => {
              const newLinks = [...form.dockLinks];
              newLinks[i] = { ...newLinks[i], href: e.target.value };
              setForm({ ...form, dockLinks: newLinks });
            }} />
            <TextInput label="Icon" value={link.icon} onChange={(e) => {
              const newLinks = [...form.dockLinks];
              newLinks[i] = { ...newLinks[i], icon: e.target.value };
              setForm({ ...form, dockLinks: newLinks });
            }} />
            <button onClick={() => {
              setForm({ ...form, dockLinks: form.dockLinks.filter((_, j) => j !== i) });
            }} className="text-red-400 hover:text-red-300 mt-5"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={() => {
          setForm({ ...form, dockLinks: [...form.dockLinks, { label: '', href: '/', icon: 'home' }] });
        }} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><Plus size={12} /> Add Link</button>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-300 border-b border-white/[0.06] pb-2">Sponsor Info</h2>
        <TextInput label="Sponsor Title" value={form.sponsorInfo.title} onChange={(e) => {
          setForm({ ...form, sponsorInfo: { ...form.sponsorInfo, title: e.target.value } });
        }} />
        <TextInput label="Sponsor Description" value={form.sponsorInfo.description} onChange={(e) => {
          setForm({ ...form, sponsorInfo: { ...form.sponsorInfo, description: e.target.value } });
        }} />
        <TextInput label="Button Label" value={form.sponsorInfo.buttonLabel} onChange={(e) => {
          setForm({ ...form, sponsorInfo: { ...form.sponsorInfo, buttonLabel: e.target.value } });
        }} />
        <TextInput label="Button URL" value={form.sponsorInfo.buttonHref} onChange={(e) => {
          setForm({ ...form, sponsorInfo: { ...form.sponsorInfo, buttonHref: e.target.value } });
        }} />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-300 border-b border-white/[0.06] pb-2">Footer Links</h2>
        {form.footerLinks.links.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <TextInput label="Label" value={link.label} onChange={(e) => {
              const newLinks = [...form.footerLinks.links];
              newLinks[i] = { ...newLinks[i], label: e.target.value };
              setForm({ ...form, footerLinks: { ...form.footerLinks, links: newLinks } });
            }} />
            <TextInput label="Href" value={link.href} onChange={(e) => {
              const newLinks = [...form.footerLinks.links];
              newLinks[i] = { ...newLinks[i], href: e.target.value };
              setForm({ ...form, footerLinks: { ...form.footerLinks, links: newLinks } });
            }} />
            <button onClick={() => {
              const newLinks = form.footerLinks.links.filter((_, j) => j !== i);
              setForm({ ...form, footerLinks: { ...form.footerLinks, links: newLinks } });
            }} className="text-red-400 hover:text-red-300 mt-5"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={() => {
          const newLinks = [...form.footerLinks.links, { label: '', href: '/' }];
          setForm({ ...form, footerLinks: { ...form.footerLinks, links: newLinks } });
        }} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><Plus size={12} /> Add Link</button>
      </section>

      <SaveButton onSave={handleSave} />
    </div>
  );
}
