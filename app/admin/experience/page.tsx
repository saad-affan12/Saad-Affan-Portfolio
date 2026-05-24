"use client";

import { useState, useEffect } from 'react';
import { useData, useRefreshData } from '@/hooks/useData';
import { TextInput } from '@/components/admin/forms/TextInput';
import { TextArea } from '@/components/admin/forms/TextArea';
import { TagInput } from '@/components/admin/forms/TagInput';
import { ImageUpload } from '@/components/admin/forms/ImageUpload';
import { SaveButton } from '@/components/admin/forms/SaveButton';
import { DragList } from '@/components/admin/forms/DragList';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import type { RoadmapItem } from '@/lib/types';

export default function ExperienceEditor() {
  const roadmap = useData('roadmap', []);
  const refresh = useRefreshData();
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editing, setEditing] = useState<RoadmapItem | null>(null);

  const experienceItems = items.filter((r) => r.type !== 'project');

  useEffect(() => {
    if (roadmap.length) setItems([...roadmap]);
  }, [roadmap]);

  const handleSave = async () => {
    const res = await fetch('/api/data?key=roadmap', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    });
    if (!res.ok) throw new Error('Failed to save');
    await refresh();
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditing({ ...items[index] });
  };

  const addNew = () => {
    const newItem: RoadmapItem = {
      role: '', company: '', type: 'Internship', period: '', badge: '',
      description: '', highlights: [],
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    startEdit(newItems.length - 1);
  };

  const deleteItem = (index: number) => {
    if (confirm('Delete this item?')) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      if (editingIndex === index) { setEditingIndex(null); setEditing(null); }
    }
  };

  const updateEditing = <K extends keyof RoadmapItem>(key: K, value: RoadmapItem[K]) => {
    if (!editing) return;
    const updated = { ...editing, [key]: value };
    setEditing(updated);
    const newItems = [...items];
    if (editingIndex !== null) newItems[editingIndex] = updated;
    setItems(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-100">Experience</h1>
          <p className="text-sm text-gray-500 mt-1">{experienceItems.length} experience entries</p>
        </div>
        <div className="flex items-center gap-2">
          <SaveButton onSave={handleSave} />
          <button onClick={addNew} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm hover:bg-indigo-500/20 transition-colors">
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      <DragList
        items={items.filter((r) => r.type !== 'project')}
        onReorder={(reordered) => {
          const projectItems = items.filter((r) => r.type === 'project');
          setItems([...reordered, ...projectItems]);
        }}
        keyExtractor={(item) => item.role + item.company}
        renderItem={(item, index) => (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {item.logo && <img src={item.logo} alt="" className="size-8 rounded object-contain shrink-0" />}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">{item.role}</p>
                <p className="text-xs text-gray-500 truncate">{item.company} · {item.period}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                  <Sparkles size={8} />{item.badge}
                </span>
              )}
              <button onClick={() => startEdit(index)} className="text-xs text-indigo-400 hover:text-indigo-300">Edit</button>
              <button onClick={() => deleteItem(index)} className="text-xs text-red-400 hover:text-red-300"><Trash2 size={12} /></button>
            </div>
          </div>
        )}
      />

      {editing && editingIndex !== null && (
        <div className="rounded-xl border border-white/[0.06] bg-[#0d0d14] p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-200 border-b border-white/[0.06] pb-3">Editing: {editing.role || 'New Entry'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput label="Role" value={editing.role} onChange={(e) => updateEditing('role', e.target.value)} />
            <TextInput label="Company" value={editing.company} onChange={(e) => updateEditing('company', e.target.value)} />
            <TextInput label="Type" value={editing.type} onChange={(e) => updateEditing('type', e.target.value)} />
            <TextInput label="Period" value={editing.period} onChange={(e) => updateEditing('period', e.target.value)} />
            <TextInput label="Badge" value={editing.badge || ''} onChange={(e) => updateEditing('badge', e.target.value)} />
          </div>
          <TextArea label="Description" value={editing.description} onChange={(e) => updateEditing('description', e.target.value)} rows={3} />
          <TagInput label="Highlights" tags={editing.highlights || []} onChange={(h) => updateEditing('highlights', h)} placeholder="Add highlight..." />
          <ImageUpload label="Logo" value={editing.logo || null} onChange={(url) => updateEditing('logo', url)} />
        </div>
      )}
    </div>
  );
}
