'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Memory, MemoryCategory } from '@/data/types';
import { FilterPills } from '@/components/ui/FilterPills';
import { BriefcaseIcon, GamepadIcon, GraduationCapIcon, SparklesIcon } from '@/components/ui/Icons';
import { DetailPanel } from './DetailPanel';

type Filter = 'all' | MemoryCategory;

const CATEGORY_LABELS: Record<MemoryCategory, string> = {
  education: 'Education',
  'hard-skill': 'Hard skills',
  'soft-skill': 'Soft skills',
  event: 'Events',
};

const TILES: Record<MemoryCategory, { color: string; Icon: typeof SparklesIcon }> = {
  education: { color: '#2f7fd6', Icon: GraduationCapIcon },
  'hard-skill': { color: '#1f9d8b', Icon: GamepadIcon },
  'soft-skill': { color: '#a0529e', Icon: SparklesIcon },
  event: { color: '#c8782a', Icon: BriefcaseIcon },
};

// Undated memories go last, whichever way the dates run
const byDate = (direction: 1 | -1) => (a: Memory, b: Memory) =>
  a.date && b.date ? direction * a.date.localeCompare(b.date) : Number(!a.date) - Number(!b.date);

// Type is the data's own order: education, skills, events
const SORTS: { id: string; label: string; compare?: (a: Memory, b: Memory) => number }[] = [
  { id: 'type', label: 'Type' },
  { id: 'name', label: 'Name', compare: (a, b) => a.title.localeCompare(b.title) },
  { id: 'newest', label: 'Newest', compare: byDate(-1) },
  { id: 'oldest', label: 'Oldest', compare: byDate(1) },
];

// How long the pressed memory shows before the detail panel starts fading in
const PRESS_MS = 180;

/** The memory's 2D image, or a generated tile until there is one. */
function MemoryArt({ memory }: { memory: Memory }) {
  if (memory.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={memory.image} alt="" className="memory-art w-full h-full object-contain" />;
  }
  const { color, Icon } = TILES[memory.category];
  return (
    <span className="memory-art memory-tile" style={{ '--tile': color } as React.CSSProperties}>
      <Icon className="w-[42%] h-[42%] text-white drop-shadow" />
    </span>
  );
}

function MemoryDetail({ memory, onClose }: { memory: Memory; onClose: () => void }) {
  return (
    <DetailPanel
      art={<MemoryArt memory={memory} />}
      eyebrow={CATEGORY_LABELS[memory.category]}
      title={memory.title}
      subtitle={memory.subtitle}
      onClose={onClose}
    >
      {memory.facts && (
        <dl className="space-y-2 text-sm">
          {memory.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs text-slate-400">{fact.label}</dt>
              <dd className="text-slate-100">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {memory.body.map((para) => (
        <p key={para} className="text-sm leading-relaxed text-slate-300">
          {para}
        </p>
      ))}

      {memory.photos && (
        <div className="memory-photos flex gap-2 overflow-x-auto snap-x">
          {memory.photos.map((photo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={photo}
              src={photo}
              alt={`${memory.title}, photo ${i + 1}`}
              loading="lazy"
              className="h-36 w-auto rounded-lg snap-start"
            />
          ))}
        </div>
      )}
    </DetailPanel>
  );
}

interface MemoryGridProps {
  memories: Memory[];
}

/**
 * Grid of tilted memories on a glass panel, after the PS2 memory card screen.
 * Desktop: hovering selects, and the selected name shows top right.
 * Phones have no hover, so every name sits under its memory and one tap opens it.
 */
export function MemoryGrid({ memories }: MemoryGridProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState('type');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [openMemory, setOpenMemory] = useState<Memory | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(openTimer.current), []);

  const filtered = filter === 'all' ? memories : memories.filter((m) => m.category === filter);
  const compare = SORTS.find((s) => s.id === sort)?.compare;
  const visible = compare ? [...filtered].sort(compare) : filtered;
  const selected = visible.find((m) => m._id === selectedId) ?? visible[0];

  const handleOpen = (memory: Memory, trigger: HTMLButtonElement) => {
    if (pressedId) return;
    triggerRef.current = trigger;
    setPressedId(memory._id);
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : PRESS_MS;
    openTimer.current = window.setTimeout(() => setOpenMemory(memory), delay);
  };

  const handleClose = useCallback(() => {
    setOpenMemory(null);
    setPressedId(null);
    // Return focus to the memory that was opened
    triggerRef.current?.focus();
  }, []);

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: memories.length },
    ...(Object.keys(CATEGORY_LABELS) as MemoryCategory[]).map((id) => ({
      id,
      label: CATEGORY_LABELS[id],
      count: memories.filter((m) => m.category === id).length,
    })),
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-slate-400">Sort by</span>
        <FilterPills label="Sort memories" filters={SORTS} value={sort} onChange={setSort} className="" />
      </div>
      <FilterPills label="Filter memories" filters={filters} value={filter} onChange={setFilter} />

      <div className="relative rounded-2xl glass-surface border border-sky-400/20 p-4 md:p-8">
        {/* Selected name: fixed height so the grid doesn't shift as it changes */}
        <div className="hidden md:block text-right h-16 mb-4">
          {selected && (
            <>
              <p className="memory-name text-2xl text-amber-200 truncate">{selected.title}</p>
              <p className="mt-1 text-sm text-slate-300 truncate">{selected.subtitle}</p>
            </>
          )}
        </div>

        <ul className="grid grid-cols-4 md:grid-cols-5 gap-x-3.5 gap-y-5 md:gap-x-14 md:gap-y-10">
          {visible.map((memory) => (
            <li key={memory._id}>
              <button
                type="button"
                onClick={(e) => handleOpen(memory, e.currentTarget)}
                onPointerEnter={() => setSelectedId(memory._id)}
                onFocus={() => setSelectedId(memory._id)}
                aria-label={`Open ${memory.title} (${memory.subtitle})`}
                className={`memory-item block w-full ${memory._id === selected?._id ? 'memory-selected' : ''} ${
                  memory._id === pressedId ? 'memory-pressed' : ''
                }`}
              >
                <span className="memory-icon">
                  <MemoryArt memory={memory} />
                </span>
                <span className="md:hidden mt-1.5 block text-center text-[11px] leading-tight text-slate-200">{memory.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openMemory && <MemoryDetail memory={openMemory} onClose={handleClose} />}
    </div>
  );
}
