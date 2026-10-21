'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Project } from '@/data/types';
import { CoverArt } from './CoverArt';
import { ProjectManual } from './ProjectManual';

interface ProjectViewerProps {
  project: Project;
  onClose: () => void;
}

type TvPhase = 'insert' | 'static' | 'playing';

// Slow enough to see the disc art, short enough not to annoy; click the TV to skip
const INSERT_MS = 1100;
const STATIC_MS = 250;

/**
 * Disc rising straight up into a slot. The clip box's top edge is the slot,
 * so the disc disappears into it. 2D, no spin: the art stays readable.
 */
function DiscInsert({ project, className }: { project: Project; className: string }) {
  return (
    <div className={`disc-clip ${className}`} aria-hidden="true">
      <div className="disc disc-slide w-full aspect-square text-[6px]">
        <CoverArt project={project} />
      </div>
    </div>
  );
}

/**
 * Opened game case: TV (+ console on desktop) with the disc loading in, and the
 * game manual, over a darkened page. Clicking anywhere except the TV or the
 * manual closes it, as do Esc and the browser/phone back button.
 */
export function ProjectViewer({ project, onClose }: ProjectViewerProps) {
  const [phase, setPhase] = useState<TvPhase>('insert');
  const [isWide] = useState(() => window.matchMedia('(min-width: 768px)').matches);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const pushedHistory = useRef(false);

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

  // Back button closes the case instead of leaving the page: opening adds a
  // history entry, and every way of closing goes back through it.
  // (Tracked in a ref: Next's router rewrites history.state, so a flag there doesn't survive.)
  const requestClose = useCallback(() => {
    if (pushedHistory.current) {
      window.history.back();
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!pushedHistory.current) {
      window.history.pushState(window.history.state, '');
      pushedHistory.current = true;
    }
    const onPop = () => {
      pushedHistory.current = false;
      onClose();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [onClose]);

  // Esc to close; pause the wave canvas while a case is open (attention is on the TV).
  // The page keeps its scrollbar and can still scroll behind the case.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', onKey);
    window.dispatchEvent(new CustomEvent('portfolio:pause-bg', { detail: { paused: true } }));
    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      window.removeEventListener('keydown', onKey);
      window.dispatchEvent(new CustomEvent('portfolio:pause-bg', { detail: { paused: false } }));
    };
  }, [requestClose]);

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} game case`}
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center p-4 outline-none"
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('[data-keep-open]')) requestClose();
      }}
    >
      {/* Only visible when tabbed to, for keyboard and screen-reader users */}
      <button
        type="button"
        onClick={requestClose}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-10 focus:px-4 focus:py-2 focus:rounded-full focus:bg-slate-900 focus:border focus:border-sky-400/40 focus:text-sm focus:text-white"
      >
        Close
      </button>

      <div className="viewer-spotlight flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12">
        {/* TV (+ console on desktop) */}
        {/* md:pb leaves room under the console for the disc rising into it */}
        <div data-keep-open className="viewer-tv shrink-0 md:pb-20">
          <div className="crt-tv relative">
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

            <div className="relative flex items-center justify-between px-[4%] pt-[3%]">
              <span className="font-black tracking-[0.25em] text-[10px] text-slate-400">ZAHRIN</span>
              {/* Mobile has no console, so the disc goes into a slot on the TV */}
              <span className="md:hidden absolute left-1/2 -translate-x-1/2 top-[55%] w-[34%] h-[3px] rounded bg-black shadow-[0_1px_0_rgba(255,255,255,0.08)]" />
              {phase === 'insert' && !isWide && (
                <DiscInsert project={project} className="md:hidden absolute z-20 left-1/2 -translate-x-1/2 top-[55%] w-[30%]" />
              )}
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <span className="w-4 h-4 rounded-full bg-slate-700 border border-slate-600" />
                <span className="w-4 h-4 rounded-full bg-slate-700 border border-slate-600" />
              </span>
            </div>
          </div>

          {/* Console (desktop only): own design, PS2-era feel without real branding */}
          <div className="hidden md:block relative mx-auto mt-3 w-[78%]">
            <div className="console-body">
              <span className="console-slot" />
              {phase === 'insert' && isWide && <DiscInsert project={project} className="absolute z-20 left-[21%] top-[38%] w-[28%]" />}
              <span className="absolute right-[6%] top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${phase === 'insert' ? 'bg-amber-400' : 'bg-sky-400'} shadow-[0_0_6px_currentColor]`} />
              </span>
            </div>
          </div>
        </div>

        {/* Manual */}
        <div className={`${isWide ? 'manual-size-spread' : 'manual-size-single'} text-slate-100 flex flex-col items-center gap-3`}>
          <ProjectManual project={project} mode={isWide ? 'spread' : 'single'} />
          <p className="text-[11px] text-slate-500">
            {isWide ? 'Click outside or press Esc to close' : 'Tap outside to close'}
          </p>
        </div>
      </div>
    </div>
  );
}
