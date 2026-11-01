import React from 'react';

interface FilterPillsProps<T extends string> {
  label: string;
  filters: { id: T; label: string; count: number }[];
  value: T;
  onChange: (id: T) => void;
}

export function FilterPills<T extends string>({ label, filters, value, onChange }: FilterPillsProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-1 mb-6 p-1.5 rounded-3xl glass-surface w-fit border border-white/10">
      {filters.map((f) => {
        const active = value === f.id;
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(f.id)}
            className={`apple-press px-4 py-1.5 rounded-full text-xs font-semibold border ${
              active
                ? 'bg-sky-500/20 text-sky-200 border-sky-400/30'
                : 'text-slate-300 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            {f.label} ({f.count})
          </button>
        );
      })}
    </div>
  );
}
