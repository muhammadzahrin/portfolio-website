'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Project } from '@/data/types';
import { GameSpine } from './GameSpine';
import { ProjectViewer } from './ProjectViewer';

type Filter = 'all' | 'game' | 'software';

// Hand-placed look for the mobile stack (px nudges, cycled)
const STACK_OFFSETS = [0, 12, 4, 16, 6, 10, 2];

interface ProjectShelfProps {
  projects: Project[];
}

/**
 * Shelf of PS2-style game cases. Games and software share one shelf;
 * the filter narrows it to either. Opening a case shows the TV + manual viewer.
 */
export function ProjectShelf({ projects }: ProjectShelfProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visible = filter === 'all' ? projects : projects.filter((p) => p.kind === filter);
  const counts = {
    all: projects.length,
    game: projects.filter((p) => p.kind === 'game').length,
    software: projects.filter((p) => p.kind === 'software').length,
  };

  const handleOpen = useCallback((project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpenProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setOpenProject(null);
    // Return focus to the case that was opened
    triggerRef.current?.focus();
  }, []);

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'game', label: 'Games' },
    { id: 'software', label: 'Software' },
  ];

  return (
    <div>
      {/* Filter */}
      <div role="group" aria-label="Filter projects" className="flex flex-wrap items-center gap-1 mb-6 p-1.5 rounded-full glass-surface w-fit border border-white/10">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`apple-press px-4 py-1.5 rounded-full text-xs font-semibold border ${
                active
                  ? 'bg-sky-500/20 text-sky-200 border-sky-400/30'
                  : 'text-slate-300 border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              {f.label} ({counts[f.id]})
            </button>
          );
        })}
      </div>

      {/* Shelf: vertical stack on mobile, upright row on desktop */}
      <div className="relative rounded-2xl glass-surface border border-sky-400/20 px-4 pt-6 pb-0 md:px-8 md:pt-10">
        <ul className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-end md:gap-1 min-h-[60px] md:min-h-[300px]">
          {visible.map((project, i) => (
            <li key={project._id} className="md:contents">
              <GameSpine project={project} onOpen={handleOpen} stackOffset={STACK_OFFSETS[i % STACK_OFFSETS.length]} />
            </li>
          ))}
        </ul>
        {/* Shelf plank */}
        <div className="mt-1.5 md:mt-0 -mx-4 md:-mx-8 h-3 rounded-b-2xl bg-gradient-to-b from-sky-300/25 via-sky-900/40 to-slate-950/60 border-t border-sky-300/40" aria-hidden="true" />
      </div>

      <p className="mt-3 text-xs text-slate-400">
        <span className="hidden md:inline">Hover a case to pull it out, click to open.</span>
        <span className="md:hidden">Tap a case to open it.</span>
      </p>

      {openProject && <ProjectViewer project={openProject} onClose={handleClose} />}
    </div>
  );
}
