"use client";

import { useState, useEffect } from 'react';
import { useData, useRefreshData } from '@/hooks/useData';
import { TextInput } from '@/components/admin/forms/TextInput';
import { TextArea } from '@/components/admin/forms/TextArea';
import { SaveButton } from '@/components/admin/forms/SaveButton';
import type { CLI } from '@/lib/types';

export default function CliEditor() {
  const cli = useData('cli');
  const refresh = useRefreshData();
  const [form, setForm] = useState<CLI>({ welcomeMessage: '', initialCommands: [], commandHelp: {} });

  useEffect(() => {
    if (cli) setForm({ ...cli });
  }, [cli]);

  const handleSave = async () => {
    const res = await fetch('/api/data?key=cli', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('Failed to save');
    await refresh();
  };

  const updateHelp = (cmd: string, desc: string) => {
    setForm(prev => ({ ...prev, commandHelp: { ...prev.commandHelp, [cmd]: desc } }));
  };

  const removeCommand = (cmd: string) => {
    const newHelp = { ...form.commandHelp };
    delete newHelp[cmd];
    setForm(prev => ({ ...prev, commandHelp: newHelp }));
  };

  const addCommand = () => {
    setForm(prev => ({ ...prev, commandHelp: { ...prev.commandHelp, '': '' } }));
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-100">CLI Configuration</h1>
        <p className="text-sm text-gray-500 mt-1">Configure the terminal messages and commands</p>
      </div>

      <TextInput
        label="Welcome Message"
        value={form.welcomeMessage}
        onChange={(e) => setForm(prev => ({ ...prev, welcomeMessage: e.target.value }))}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-400 tracking-wide uppercase">Commands</label>
          <button onClick={addCommand} className="text-xs text-indigo-400 hover:text-indigo-300">+ Add Command</button>
        </div>
        {Object.entries(form.commandHelp).map(([cmd, desc]) => (
          <div key={cmd} className="flex items-center gap-2">
            <TextInput
              label=""
              value={cmd}
              onChange={(e) => {
                const oldKey = cmd;
                const newHelp = { ...form.commandHelp };
                delete newHelp[oldKey];
                newHelp[e.target.value] = desc;
                setForm(prev => ({ ...prev, commandHelp: newHelp }));
              }}
              placeholder="Command name"
              className="flex-1"
            />
            <TextInput
              label=""
              value={desc}
              onChange={(e) => updateHelp(cmd, e.target.value)}
              placeholder="Description"
              className="flex-[2]"
            />
            <button onClick={() => removeCommand(cmd)} className="text-red-400 hover:text-red-300 p-1 shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        ))}
      </div>

      <SaveButton onSave={handleSave} />
    </div>
  );
}
