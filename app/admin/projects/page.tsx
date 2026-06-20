"use client";

import { useState, useEffect } from 'react';
import { useData, useRefreshData } from '@/hooks/useData';
import { TextInput } from '@/components/admin/forms/TextInput';
import { TextArea } from '@/components/admin/forms/TextArea';
import { TagInput } from '@/components/admin/forms/TagInput';
import { Toggle } from '@/components/admin/forms/Toggle';
import { ImageUpload } from '@/components/admin/forms/ImageUpload';
import { SaveButton } from '@/components/admin/forms/SaveButton';
import { DragList } from '@/components/admin/forms/DragList';
import { Plus, Trash2, ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/lib/types';

const emptyProject: Project = {
  name: '', slug: '', date: '', description: '', tags: [], highlights: [],
  github: '', live: null, image: null, featured: false, status: 'draft', priority: 0,
  problem: '', solution: '', architectureDescription: '', architectureDiagram: '',
  challenges: '', learnings: '', screenshots: [], achievements: [], metrics: []
};

export default function ProjectsEditor() {
  const projects = useData('projects', []);
  const refresh = useRefreshData();
  const [items, setItems] = useState<Project[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editing, setEditing] = useState<Project | null>(null);

  useEffect(() => {
    if (projects.length) setItems([...projects]);
  }, [projects]);

  const handleSave = async () => {
    const res = await fetch('/api/data?key=projects', {
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
    const newItem = { ...emptyProject, priority: items.length + 1 };
    const newItems = [...items, newItem];
    setItems(newItems);
    startEdit(newItems.length - 1);
  };

  const deleteItem = (index: number) => {
    if (confirm('Delete this project?')) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      if (editingIndex === index) { setEditingIndex(null); setEditing(null); }
    }
  };

  const updateEditing = <K extends keyof Project>(key: K, value: Project[K]) => {
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
          <h1 className="text-xl font-semibold text-gray-100">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} projects</p>
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
        keyExtractor={(p) => p.slug || p.name}
        renderItem={(project, index) => (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {project.image && <img src={project.image} alt="" className="size-8 rounded object-cover shrink-0" />}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">{project.name || 'Untitled'}</p>
                <p className="text-xs text-gray-500 truncate">{project.tags?.slice(0, 3).join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {project.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Featured</span>}
              <button onClick={() => startEdit(index)} className="text-xs text-indigo-400 hover:text-indigo-300">Edit</button>
              <button onClick={() => deleteItem(index)} className="text-xs text-red-400 hover:text-red-300"><Trash2 size={12} /></button>
            </div>
          </div>
        )}
      />

      {editing && editingIndex !== null && (
        <div className="rounded-xl border border-white/[0.06] bg-[#0d0d14] p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-200 border-b border-white/[0.06] pb-3">Editing: {editing.name || 'New Project'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput label="Name" value={editing.name} onChange={(e) => updateEditing('name', e.target.value)} />
            <TextInput label="Slug" value={editing.slug} onChange={(e) => updateEditing('slug', e.target.value)} />
            <TextInput label="Date" value={editing.date} onChange={(e) => updateEditing('date', e.target.value)} />
            <TextInput label="Status" value={editing.status} onChange={(e) => updateEditing('status', e.target.value)} />
            <TextInput label="GitHub URL" value={editing.github} onChange={(e) => updateEditing('github', e.target.value)} className="sm:col-span-2" />
            <TextInput label="Live URL" value={editing.live || ''} onChange={(e) => updateEditing('live', e.target.value || null)} className="sm:col-span-2" />
          </div>
          <TextArea label="Description" value={editing.description} onChange={(e) => updateEditing('description', e.target.value)} rows={3} />
          
          <div className="border-t border-white/[0.04] pt-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case Study Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextArea label="The Problem" value={editing.problem || ''} onChange={(e) => updateEditing('problem', e.target.value)} rows={3} />
              <TextArea label="The Solution" value={editing.solution || ''} onChange={(e) => updateEditing('solution', e.target.value)} rows={3} />
              <TextArea label="Architecture Description" value={editing.architectureDescription || ''} onChange={(e) => updateEditing('architectureDescription', e.target.value)} rows={3} />
              <TextArea label="Architecture Diagram (Flowchart Text)" value={editing.architectureDiagram || ''} onChange={(e) => updateEditing('architectureDiagram', e.target.value)} rows={3} />
              <TextArea label="Technical Challenges" value={editing.challenges || ''} onChange={(e) => updateEditing('challenges', e.target.value)} rows={3} />
              <TextArea label="Key Learnings" value={editing.learnings || ''} onChange={(e) => updateEditing('learnings', e.target.value)} rows={3} />
            </div>
            <TagInput label="Key Metrics" tags={editing.metrics ?? []} onChange={(m) => updateEditing('metrics', m)} placeholder="Add metric..." />
            <TagInput label="Impact achievements" tags={editing.achievements ?? []} onChange={(a) => updateEditing('achievements', a)} placeholder="Add achievement..." />
          </div>

          <TagInput label="Tags" tags={editing.tags ?? []} onChange={(tags) => updateEditing('tags', tags)} />
          <TagInput label="Highlights" tags={editing.highlights ?? []} onChange={(h) => updateEditing('highlights', h)} placeholder="Add highlight..." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageUpload label="Image" value={editing.image} onChange={(url) => updateEditing('image', url)} />
            <div className="space-y-3">
              <Toggle label="Featured" checked={editing.featured} onChange={(v) => updateEditing('featured', v)} />
              <TextInput label="Priority" type="number" value={String(editing.priority)} onChange={(e) => updateEditing('priority', parseInt(e.target.value) || 0)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
