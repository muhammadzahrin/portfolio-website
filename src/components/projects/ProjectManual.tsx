'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/data/types';
import { CoverArt } from './CoverArt';

interface ProjectManualProps {
  project: Project;
  /**
   * spread: desktop booklet. Starts closed and centred, opens into a 2-page spread.
   * single: mobile. One page at a time; pages flip away to the left.
   */
  mode: 'spread' | 'single';
}

const FLIP_MS = 600;

/** Inner page contents, in reading order. Padded to an even count so the back cover lands on a leaf's back. */
function buildInnerPages(project: Project): React.ReactNode[] {
  const pages: React.ReactNode[] = [
    <>
      <p className="manual-kicker">About</p>
      <h3 className="manual-title">{project.title}</h3>
      <p>{project.oneLineSummary}</p>
      <p className="mt-[0.8em] opacity-80">{project.placeholderDescription}</p>
    </>,
    <>
      <p className="manual-kicker">Credits</p>
      <dl className="space-y-[0.8em]">
        <div>
          <dt className="manual-label">Made for</dt>
          <dd>{project.manual.madeFor}</dd>
        </div>
        <div>
          <dt className="manual-label">Made under</dt>
          <dd>{project.manual.madeUnder}</dd>
        </div>
        <div>
          <dt className="manual-label">My role</dt>
          <dd>{project.manual.role}</dd>
        </div>
        <div>
          <dt className="manual-label">Released</dt>
          <dd>{project.year}</dd>
        </div>
      </dl>
    </>,
    <>
      <p className="manual-kicker">Built with</p>
      <ul className="flex flex-wrap gap-[0.4em]">
        {project.techTags.map((tag) => (
          <li key={tag} className="px-[0.6em] py-[0.2em] rounded bg-black/30 border border-white/20 text-[0.85em]">
            {tag}
          </li>
        ))}
      </ul>
    </>,
    <>
      <p className="manual-kicker">More info</p>
      <ul className="space-y-[0.5em]">
        {project.manual.links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-sky-300">
              {link.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-[1em] font-mono text-[0.75em] opacity-60">{project.catalogCode}</p>
    </>,
  ];

  if (pages.length % 2 === 1) {
    pages.push(<p className="manual-kicker">Notes</p>);
  }
  return pages;
}

function BackCover() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950 text-white">
      <span className="font-black tracking-[0.3em] text-[1.1em]">ZAHRIN</span>
      <span className="mt-[0.5em] text-[0.6em] uppercase tracking-[0.25em] opacity-60">[Back cover placeholder]</span>
    </div>
  );
}

/** Inner page with its half of the repeated spread background (odd pages = left half). */
function InnerPage({ children, pageNumber }: { children: React.ReactNode; pageNumber: number }) {
  const isLeft = pageNumber % 2 === 1;
  return (
    <div className={`manual-inner ${isLeft ? 'manual-inner-left' : 'manual-inner-right'}`}>
      <div className="relative z-10 flex flex-col h-full">{children}</div>
      <span className={`absolute bottom-[3%] text-[0.65em] opacity-60 ${isLeft ? 'left-[7%]' : 'right-[7%]'}`}>{pageNumber}</span>
    </div>
  );
}

function ArrowButton({ dir, hidden, onClick }: { dir: 'prev' | 'next'; hidden: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      aria-label={dir === 'prev' ? 'Previous page' : 'Next page'}
      className={`apple-press shrink-0 w-10 h-10 rounded-full glass-surface border border-sky-400/30 text-sky-200 flex items-center justify-center text-lg hover:text-white ${hidden ? 'invisible' : ''}`}
    >
      {dir === 'prev' ? '‹' : '›'}
    </button>
  );
}

/**
 * Game-manual booklet (4.5 x 7.125 page ratio).
 */
export function ProjectManual({ project, mode }: ProjectManualProps) {
  const inner = buildInnerPages(project);
  // Every page in order: cover, inner pages, back cover
  const pages: React.ReactNode[] = [
    <CoverArt key="cover" project={project} />,
    ...inner.map((content, i) => (
      <InnerPage key={i} pageNumber={i + 1}>
        {content}
      </InnerPage>
    )),
    <BackCover key="back" />,
  ];

  // Spread mode turns leaves (2 pages each); single mode turns pages
  const steps = mode === 'spread' ? pages.length / 2 : pages.length - 1;
  const [position, setPosition] = useState(0);
  const [animating, setAnimating] = useState<number | null>(null);
  const timer = useRef<number>();

  const go = (delta: 1 | -1) => {
    const next = position + delta;
    if (next < 0 || next > steps) return;
    // The leaf/page in motion is drawn on top until it lands
    setAnimating(delta === 1 ? position : next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAnimating(null), FLIP_MS);
    setPosition(next);
  };

  // Keyboard page turning
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const label = position === 0 ? 'Cover' : position === steps ? 'Back cover' : null;

  if (mode === 'single') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <ArrowButton dir="prev" hidden={position === 0} onClick={() => go(-1)} />
          <div className="manual-page relative [perspective:1600px]">
            {pages.map((page, i) => {
              const turned = i < position;
              return (
                <div
                  key={i}
                  aria-hidden={i !== position}
                  className="manual-leaf"
                  style={{
                    transform: turned ? 'rotateY(-180deg)' : 'none',
                    zIndex: animating === i ? 100 : pages.length - i,
                    visibility: turned && animating !== i ? 'hidden' : 'visible',
                  }}
                >
                  <div className="manual-face">{page}</div>
                </div>
              );
            })}
          </div>
          <ArrowButton dir="next" hidden={position === steps} onClick={() => go(1)} />
        </div>
        <p className="text-xs font-mono text-slate-400" aria-live="polite">
          {label ?? `Page ${position} / ${inner.length}`}
        </p>
      </div>
    );
  }

  // Spread: leaves stack on the right-hand page slot and rotate over to the left.
  // Closed at the front, the book shifts left half a page so the cover sits centred;
  // closed at the back, it shifts right so the back cover is centred.
  const shift = position === 0 ? -0.5 : position === steps ? 0.5 : 0;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-4">
        <ArrowButton dir="prev" hidden={position === 0} onClick={() => go(-1)} />
        <div className="manual-spread relative [perspective:2000px]">
          <div
            className="absolute inset-0 [transform-style:preserve-3d] transition-transform ease-out"
            style={{ transform: `translateX(calc(var(--pw) * ${shift}))`, transitionDuration: `${FLIP_MS}ms` }}
          >
            {Array.from({ length: steps }, (_, leaf) => {
              const turned = leaf < position;
              return (
                <div
                  key={leaf}
                  className="manual-leaf left-[var(--pw)]"
                  style={{
                    transform: turned ? 'rotateY(-180deg)' : 'none',
                    zIndex: animating === leaf ? 100 : turned ? leaf + 1 : steps - leaf,
                  }}
                >
                  <div className="manual-face" aria-hidden={!(leaf === position && !turned)}>
                    {pages[leaf * 2]}
                  </div>
                  <div className="manual-face manual-face-back" aria-hidden={!(turned && leaf === position - 1)}>
                    {pages[leaf * 2 + 1]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ArrowButton dir="next" hidden={position === steps} onClick={() => go(1)} />
      </div>
      <p className="text-xs font-mono text-slate-400" aria-live="polite">
        {label ?? `Pages ${position * 2 - 1}–${position * 2} / ${inner.length}`}
      </p>
    </div>
  );
}
