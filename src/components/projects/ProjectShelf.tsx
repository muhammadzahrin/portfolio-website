'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Project } from '@/data/types';
import { GameSpine } from './GameSpine';
import { ProjectViewer } from './ProjectViewer';

type Filter = 'all' | 'game' | 'software';

interface ProjectShelfProps {
  projects: Project[];
}

/**
 * Shelf of PS2-style game cases. Games and software share one shelf;
 * the filter narrows it to either. Opening a case shows the TV + manual viewer.
 *
 * Mobile stack: the cases are thin and gapless, so a first tap pulls a case out
 * and a second tap opens it; a mis-tap never opens the wrong project.
 */
export function ProjectShelf({ projects }: ProjectShelfProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [pulledOutId, setPulledOutId] = useState<string | null>(null);
  const [isStack, setIsStack] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsStack(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const visible = filter === 'all' ? projects : projects.filter((p) => p.kind === filter);
  const counts = {
    all: projects.length,
    game: projects.filter((p) => p.kind === 'game').length,
    software: projects.filter((p) => p.kind === 'software').length,
  };

  const handleActivate = useCallback(
    (project: Project, trigger: HTMLButtonElement) => {
      if (isStack && pulledOutId !== project._id) {
        setPulledOutId(project._id);
        return;
      }
      triggerRef.current = trigger;
      setOpenProject(project);
    },
    [isStack, pulledOutId]
  );

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
              onClick={() => {
                setFilter(f.id);
                setPulledOutId(null);
              }}
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
        <ul className="flex flex-col md:flex-row md:flex-wrap md:items-end md:gap-0.5 min-h-[30px] md:min-h-[380px]">
          {visible.map((project) => (
            <li key={project._id} className="flex md:contents">
              <GameSpine project={project} onActivate={handleActivate} pulledOut={isStack && pulledOutId === project._id} />
            </li>
          ))}
        </ul>
        {/* Shelf plank */}
        <div className="mt-1.5 md:mt-0 -mx-4 md:-mx-8 h-3 rounded-b-2xl bg-gradient-to-b from-sky-300/25 via-sky-900/40 to-slate-950/60 border-t border-sky-300/40" aria-hidden="true" />
      </div>

      <p className="mt-3 text-xs text-slate-400">
        <span className="hidden md:inline">Hover a case to pull it out, click to open.</span>
        <span className="md:hidden">Tap a case to pull it out, tap again to open.</span>
      </p>

      {openProject && <ProjectViewer project={openProject} onClose={handleClose} />}
    </div>
  );
}
