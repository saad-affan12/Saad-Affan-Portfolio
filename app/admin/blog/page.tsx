"use client";

import { useState, useEffect } from 'react';
import { useData, useRefreshData } from '@/hooks/useData';
import { TextInput } from '@/components/admin/forms/TextInput';
import { TextArea } from '@/components/admin/forms/TextArea';
import { TagInput } from '@/components/admin/forms/TagInput';
import { SaveButton } from '@/components/admin/forms/SaveButton';
import { DragList } from '@/components/admin/forms/DragList';
import { Toggle } from '@/components/admin/forms/Toggle';
import { Plus, Trash2 } from 'lucide-react';
import type { BlogPost } from '@/lib/types';

const empty: BlogPost = {
  title: '', slug: '', date: '', description: '', readTime: '', tags: [], content: '', published: true
};

export default function BlogEditor() {
  const blog = useData('blog', []);
  const refresh = useRefreshData();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (blog.length) setItems([...blog]);
  }, [blog]);

  const handleSave = async () => {
    const res = await fetch('/api/data?key=blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    });
    if (!res.ok) throw new Error('Failed to save');
    await refresh();
  };

  const startEdit = (realIndex: number) => {
    setEditingIndex(realIndex);
    setEditing({ ...items[realIndex] });
  };

  const addNew = () => {
    const newItems = [...items, { ...empty }];
    setItems(newItems);
    startEdit(newItems.length - 1);
  };

  const deleteItem = (realIndex: number) => {
    if (confirm('Delete this article?')) {
      const newItems = items.filter((_, i) => i !== realIndex);
      setItems(newItems);
      if (editingIndex === realIndex) { setEditingIndex(null); setEditing(null); }
    }
  };

  const updateEditing = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => {
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
          <h1 className="text-xl font-semibold text-gray-100">Tech Blog</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} articles</p>
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
        keyExtractor={(item) => item.slug || item.title}
        renderItem={(item, index) => (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">{item.title || 'Untitled'}</p>
                <p className="text-xs text-gray-500 truncate">{item.date} · {item.readTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {item.published ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Published</span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-500/10 text-gray-400 border border-gray-500/20">Draft</span>
              )}
              <button onClick={() => startEdit(index)} className="text-xs text-indigo-400 hover:text-indigo-300">Edit</button>
              <button onClick={() => deleteItem(index)} className="text-xs text-red-400 hover:text-red-300"><Trash2 size={12} /></button>
            </div>
          </div>
        )}
      />

      {editing && editingIndex !== null && (
        <div className="rounded-xl border border-white/[0.06] bg-[#0d0d14] p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-200 border-b border-white/[0.06] pb-3">Editing: {editing.title || 'New Article'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput label="Title" value={editing.title} onChange={(e) => updateEditing('title', e.target.value)} />
            <TextInput label="Slug" value={editing.slug} onChange={(e) => updateEditing('slug', e.target.value)} />
            <TextInput label="Date" value={editing.date} onChange={(e) => updateEditing('date', e.target.value)} />
            <TextInput label="Read Time" value={editing.readTime} onChange={(e) => updateEditing('readTime', e.target.value)} />
          </div>
          <TextArea label="Description" value={editing.description} onChange={(e) => updateEditing('description', e.target.value)} rows={2} />
          <TextArea label="Full Markdown Content" value={editing.content} onChange={(e) => updateEditing('content', e.target.value)} rows={10} />
          <TagInput label="Tags" tags={editing.tags || []} onChange={(t) => updateEditing('tags', t)} />
          <Toggle label="Published" checked={editing.published} onChange={(v) => updateEditing('published', v)} />
        </div>
      )}
    </div>
  );
}
