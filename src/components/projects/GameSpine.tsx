'use client';

import React, { useState } from 'react';
import { Project } from '@/data/types';

interface GameSpineProps {
  project: Project;
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
  /** Small horizontal nudge so the mobile stack looks hand-placed. */
  stackOffset?: number;
}

/**
 * PS2-style case spine built from a shared template:
 * label band (black = game, silver = software) / middle panel / catalogue band.
 *
 * Mobile: the case lies flat (horizontal spine, part of a vertical stack).
 * Desktop (md+): the case stands upright on the shelf (vertical spine text).
 *
 * The frame and title render instantly as real text; the logo and any custom
 * spine art fade in over the top once they load, so slow connections still get
 * a complete-looking, usable shelf.
 */
export function GameSpine({ project, onOpen, stackOffset = 0 }: GameSpineProps) {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [artLoaded, setArtLoaded] = useState(false);
  const isGame = project.kind === 'game';
  const labelClass = isGame ? 'spine-label-game' : 'spine-label-software';

  // Warm the cover image so the manual is ready by the time it opens
  const preloadCover = () => {
    if (project.assets?.cover) {
      const img = new Image();
      img.src = project.assets.cover;
    }
  };

  return (
    <button
      type="button"
      onClick={(e) => onOpen(project, e.currentTarget)}
      onPointerEnter={preloadCover}
      onFocus={preloadCover}
      aria-label={`Open ${project.title} (${isGame ? 'game' : 'software'}, ${project.year})`}
      style={{ ['--stack-offset' as string]: `${stackOffset}px` }}
      className="game-spine group relative flex shrink-0 overflow-hidden rounded-[3px] text-left
        w-[calc(100%-16px)] max-w-md h-12 flex-row ml-[var(--stack-offset)]
        md:ml-0 md:w-12 md:max-w-none md:h-[300px] md:flex-col
        shadow-[0_2px_6px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)]
        transition-transform duration-150 ease-out
        md:hover:-translate-y-3 md:focus-visible:-translate-y-3
        active:scale-[0.99] focus-visible:outline-offset-4"
    >
      {/* Top band: my mark (in place of the console logo) */}
      <span className={`${labelClass} flex items-center justify-center shrink-0 w-12 h-full md:w-full md:h-12`}>
        <span className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black border border-current/40 bg-black/10">
          Z
        </span>
      </span>

      {/* Middle panel: colour + logo + title (or custom spine art) */}
      <span
        className="relative flex-1 flex items-center gap-2.5 px-3 min-w-0 md:min-h-0 md:flex-col md:px-0 md:py-3 text-white"
        style={{ background: `linear-gradient(180deg, rgba(255,255,255,0.14), transparent 40%, rgba(0,0,0,0.25)), ${project.spineColor}` }}
      >
        <span className="relative w-7 h-7 shrink-0 rounded-md bg-white/15 border border-white/25 flex items-center justify-center text-[10px] font-bold">
          <span className={logoLoaded ? 'opacity-0' : ''}>
            {project.title
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)}
          </span>
          {project.assets?.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.assets.logo}
              alt=""
              loading="lazy"
              onLoad={() => setLogoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-contain p-0.5 transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </span>
        <span className="font-bold text-sm tracking-tight truncate md:[writing-mode:vertical-rl] md:text-[15px] md:min-h-0 md:max-h-full">
          {project.title}
        </span>

        {project.assets?.spineArt && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.assets.spineArt}
            alt=""
            loading="lazy"
            onLoad={() => setArtLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${artLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </span>

      {/* Bottom band: catalogue code + year */}
      <span className={`${labelClass} flex items-center justify-center gap-2 shrink-0 px-3 font-mono text-[10px] leading-none md:flex-col md:px-0 md:h-[84px] md:gap-1.5`}>
        <span className="md:[writing-mode:vertical-rl]">{project.catalogCode}</span>
        <span className="opacity-70">{project.year}</span>
      </span>

      {/* Hover sheen */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
    </button>
  );
}
