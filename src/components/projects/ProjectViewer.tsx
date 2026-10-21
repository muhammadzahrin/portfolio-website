'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/data/types';
import { CoverArt } from './CoverArt';
import { ProjectManual } from './ProjectManual';

interface ProjectViewerProps {
  project: Project;
  onClose: () => void;
}

type TvPhase = 'insert' | 'static' | 'playing';

// Kept short so reopening cases never feels slow; click the TV to skip
const INSERT_MS = 500;
const STATIC_MS = 250;

/**
 * Opened game case: TV + console with the disc loading in (left / top on mobile)
 * and the game manual (right / below on mobile), over a darkened page.
 */
export function ProjectViewer({ project, onClose }: ProjectViewerProps) {
  const [phase, setPhase] = useState<TvPhase>('insert');
  const [isWide] = useState(() => window.matchMedia('(min-width: 768px)').matches);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Disc insert -> static -> video (skipped entirely for reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('playing');
      return;
    }
    const t1 = window.setTimeout(() => setPhase('static'), INSERT_MS);
    const t2 = window.setTimeout(() => setPhase('playing'), INSERT_MS + STATIC_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  // Esc to close, lock page scroll, pause the wave canvas while it's covered
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('portfolio:pause-bg', { detail: { paused: true } }));
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      window.dispatchEvent(new CustomEvent('portfolio:pause-bg', { detail: { paused: false } }));
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} game case`}
      className="viewer-backdrop fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden bg-[#01040a]/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="apple-press fixed top-3 right-3 z-10 w-10 h-10 rounded-full glass-surface border border-sky-400/30 text-slate-200 hover:text-white flex items-center justify-center text-xl"
      >
        ×
      </button>

      <div
        className="min-h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-4 py-16 lg:py-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* TV + console */}
        <div className="w-full max-w-sm md:max-w-md lg:max-w-none lg:w-[38vw] lg:max-w-[520px] shrink-0">
          <div className="crt-tv">
            <button
              type="button"
              onClick={() => setPhase('playing')}
              aria-label={phase === 'playing' ? `${project.title} preview` : 'Skip loading animation'}
              className="crt-screen block w-full cursor-default"
              tabIndex={phase === 'playing' ? -1 : 0}
            >
              {phase === 'insert' && (
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] tracking-[0.3em] text-sky-200/60">
                  LOADING…
                </span>
              )}
              {phase === 'static' && <span className="absolute inset-0 tv-static" />}
              {phase === 'playing' &&
                (project.assets?.video ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={project.assets.video}
                    poster={project.assets.videoPoster}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <span
                    className="absolute inset-0 flex flex-col items-center justify-center text-white"
                    style={{ background: `radial-gradient(circle at 50% 40%, ${project.spineColor}, #020409 75%)` }}
                  >
                    <span className="text-2xl sm:text-3xl font-black tracking-tight tv-attract">{project.title}</span>
                    <span className="mt-2 font-mono text-[10px] tracking-[0.25em] text-white/60">[ VIDEO PLACEHOLDER ]</span>
                  </span>
                ))}
              <span className="crt-scanlines" aria-hidden="true" />
            </button>
            <div className="flex items-center justify-between px-[4%] pt-[3%]">
              <span className="font-black tracking-[0.25em] text-[10px] text-slate-400">ZAHRIN</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <span className="w-4 h-4 rounded-full bg-slate-700 border border-slate-600" />
                <span className="w-4 h-4 rounded-full bg-slate-700 border border-slate-600" />
              </span>
            </div>
          </div>

          {/* Console: own design, PS2-era feel without real branding */}
          <div className="relative mx-auto mt-3 w-[78%]">
            {phase === 'insert' && (
              <div className="disc-insert absolute left-[18%] bottom-[55%] w-[34%] aspect-square" aria-hidden="true">
                <div className="disc w-full h-full text-[6px]">
                  <CoverArt project={project} />
                </div>
              </div>
            )}
            <div className="console-body">
              <span className="console-slot" />
              <span className="absolute right-[6%] top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${phase === 'insert' ? 'bg-amber-400' : 'bg-sky-400'} shadow-[0_0_6px_currentColor]`} />
              </span>
            </div>
          </div>
        </div>

        {/* Manual */}
        <div className={`${isWide ? 'manual-size-spread' : 'manual-size-single'} text-slate-100`}>
          <ProjectManual project={project} mode={isWide ? 'spread' : 'single'} />
        </div>
      </div>
    </div>
  );
}
