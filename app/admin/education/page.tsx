"use client";

import { useState, useEffect } from 'react';
import { useData, useRefreshData } from '@/hooks/useData';
import { TextInput } from '@/components/admin/forms/TextInput';
import { TextArea } from '@/components/admin/forms/TextArea';
import { TagInput } from '@/components/admin/forms/TagInput';
import { ImageUpload } from '@/components/admin/forms/ImageUpload';
import { SaveButton } from '@/components/admin/forms/SaveButton';
import { DragList } from '@/components/admin/forms/DragList';
import { Plus, Trash2 } from 'lucide-react';
import type { EducationItem } from '@/lib/types';

const empty: EducationItem = {
  institution: '', degree: '', program: '', period: '', cgpa: '',
  specialization: '', description: '', skills: [], logo: '',
};

export default function EducationEditor() {
  const education = useData('education', []);
  const refresh = useRefreshData();
  const [items, setItems] = useState<EducationItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editing, setEditing] = useState<EducationItem | null>(null);

  useEffect(() => {
    if (education.length) setItems([...education]);
  }, [education]);

  const handleSave = async () => {
    const res = await fetch('/api/data?key=education', {
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
    const newItems = [...items, { ...empty }];
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

  const updateEditing = <K extends keyof EducationItem>(key: K, value: EducationItem[K]) => {
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
          <h1 className="text-xl font-semibold text-gray-100">Education</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} entries</p>
        </div>
        <div className="flex items-center gap-2">
          <SaveButton onSave={handleSave} />
          <button onClick={addNew} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm hover:bg-indigo-500/20 transition-colors">
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      <DragList
        items={items}
        onReorder={setItems}
        keyExtractor={(item) => item.institution + (item.degree || item.program || '')}
        renderItem={(item, index) => (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {item.logo && <img src={item.logo} alt="" className="size-8 rounded object-contain shrink-0" />}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">{item.institution}</p>
                <p className="text-xs text-gray-500 truncate">{item.degree || item.program} · {item.period}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => startEdit(index)} className="text-xs text-indigo-400 hover:text-indigo-300">Edit</button>
              <button onClick={() => deleteItem(index)} className="text-xs text-red-400 hover:text-red-300"><Trash2 size={12} /></button>
            </div>
          </div>
        )}
      />

      {editing && editingIndex !== null && (
        <div className="rounded-xl border border-white/[0.06] bg-[#0d0d14] p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-200 border-b border-white/[0.06] pb-3">Editing: {editing.institution || 'New Entry'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput label="Institution" value={editing.institution} onChange={(e) => updateEditing('institution', e.target.value)} />
            <TextInput label="Degree" value={editing.degree || ''} onChange={(e) => updateEditing('degree', e.target.value)} />
            <TextInput label="Program" value={editing.program || ''} onChange={(e) => updateEditing('program', e.target.value)} />
            <TextInput label="Period" value={editing.period} onChange={(e) => updateEditing('period', e.target.value)} />
            <TextInput label="CGPA" value={editing.cgpa || ''} onChange={(e) => updateEditing('cgpa', e.target.value)} />
            <TextInput label="Specialization" value={editing.specialization || ''} onChange={(e) => updateEditing('specialization', e.target.value)} />
          </div>
          <TextArea label="Description" value={editing.description || ''} onChange={(e) => updateEditing('description', e.target.value)} rows={3} />
          <TagInput label="Skills" tags={editing.skills ?? []} onChange={(skills) => updateEditing('skills', skills)} />
          <ImageUpload label="Logo" value={editing.logo || null} onChange={(url) => updateEditing('logo', url)} />
        </div>
      )}
    </div>
  );
}
