"use client";

import { useState, useEffect } from 'react';
import { useData, useRefreshData } from '@/hooks/useData';
import { TextInput } from '@/components/admin/forms/TextInput';
import { TagInput } from '@/components/admin/forms/TagInput';
import { SaveButton } from '@/components/admin/forms/SaveButton';
import { Plus, Trash2 } from 'lucide-react';
import type { SkillCategory } from '@/lib/types';

export default function SkillsEditor() {
  const skills = useData('skills', []);
  const refresh = useRefreshData();
  const [categories, setCategories] = useState<SkillCategory[]>([]);

  useEffect(() => {
    if (skills.length) setCategories(skills.map(c => ({ ...c })));
  }, [skills]);

  const handleSave = async () => {
    const res = await fetch('/api/data?key=skills', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categories),
    });
    if (!res.ok) throw new Error('Failed to save');
    await refresh();
  };

  const addCategory = () => {
    const id = `cat-${Date.now()}`;
    setCategories([...categories, { id, title: '', items: [] }]);
  };

  const deleteCategory = (index: number) => {
    if (confirm('Delete this category?')) {
      setCategories(categories.filter((_, i) => i !== index));
    }
  };

  const updateCategory = (index: number, updates: Partial<SkillCategory>) => {
    const newCats = [...categories];
    newCats[index] = { ...newCats[index], ...updates };
    setCategories(newCats);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-100">Skills</h1>
          <p className="text-sm text-gray-500 mt-1">{categories.length} categories</p>
        </div>
        <div className="flex items-center gap-2">
          <SaveButton onSave={handleSave} />
          <button onClick={addCategory} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm hover:bg-indigo-500/20 transition-colors">
            <Plus size={14} /> Add Category
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((cat, index) => (
          <div key={cat.id || index} className="rounded-xl border border-white/[0.06] bg-[#0d0d14] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <TextInput
                label="Category Title"
                value={cat.title}
                onChange={(e) => updateCategory(index, { title: e.target.value })}
                className="max-w-xs"
              />
              <button onClick={() => deleteCategory(index)} className="text-red-400 hover:text-red-300 p-1">
                <Trash2 size={14} />
              </button>
            </div>
            <TagInput
              label="Skills"
              tags={cat.items ?? []}
              onChange={(items) => updateCategory(index, { items })}
              placeholder="Add skill..."
            />
          </div>
        ))}
      </div>
    </div>
  );
}
