"use client";

import { useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';

interface Props<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export function DragList<T>({ items, onReorder, renderItem, keyExtractor }: Props<T>) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setDragIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (dragItem.current === null || dragItem.current === index) return;
    const newItems = [...items];
    const draggedItem = newItems[dragItem.current];
    newItems.splice(dragItem.current, 1);
    newItems.splice(index, 0, draggedItem);
    dragItem.current = index;
    onReorder(newItems);
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    setDragIndex(null);
  };

  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <div
          key={keyExtractor(item)}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
          className={`flex items-center gap-2 bg-[#0d0d14] border border-white/[0.06] rounded-lg px-3 py-2 transition-all ${
            dragIndex === index ? 'opacity-50 border-indigo-500/30' : 'hover:border-white/[0.12]'
          }`}
        >
          <div className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 shrink-0">
            <GripVertical size={16} />
          </div>
          <div className="flex-1 min-w-0">{renderItem(item, index)}</div>
        </div>
      ))}
    </div>
  );
}
