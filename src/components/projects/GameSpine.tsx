'use client';

import React, { useState } from 'react';
import { Project } from '@/data/types';

interface GameSpineProps {
  project: Project;
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
}

/**
 * PS2-style game case seen from the spine, locked to case proportions:
 * 15 mm x 190 mm black case, with the 15 x 184 mm spine art inset 3 mm from each end.
 * (Real spec is 14 mm; 15 reads better on screen.)
 *
 * Spine art template: label band (black = game, silver = software) / colour panel
 * with logo + title / year band. Custom spine art (games) covers the whole art area.
 *
 * Mobile: the case lies flat (horizontal), sized by width.
 * Desktop (md+): the case stands upright on the shelf, sized by height.
 *
 * Frame and title render instantly as real text; the logo and custom spine art
 * fade in once loaded, so slow connections still get a complete-looking shelf.
 */
export function GameSpine({ project, onOpen }: GameSpineProps) {
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
      className="game-spine group relative shrink-0 rounded-[2px] bg-[#070708]
        w-full max-w-[420px] aspect-[190/15]
        md:w-auto md:max-w-none md:h-[clamp(300px,52vh,400px)] md:aspect-[15/190]
        shadow-[0_2px_6px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.07)]
        transition-transform duration-200 ease-out
        motion-safe:md:hover:-translate-y-3 motion-safe:md:focus-visible:-translate-y-3
        focus-visible:outline-offset-4
        before:absolute before:-inset-y-1 before:inset-x-0 before:content-['']"
    >
      {/* Spine art area: 184 of the case's 190 mm, leaving 3 mm of black case at each end */}
      <span className="spine-art absolute inset-y-0 inset-x-[1.58%] md:inset-x-0 md:inset-y-[1.58%] flex flex-row md:flex-col overflow-hidden">
        {/* Label band: my mark (in place of a console logo) */}
        <span className={`${labelClass} spine-band flex items-center justify-center shrink-0`}>
          <span className="spine-mark rounded-full flex items-center justify-center font-black border border-current/40 bg-black/10">Z</span>
        </span>

        {/* Colour panel: logo + title */}
        <span
          className="relative flex-1 min-w-0 md:min-h-0 flex flex-row md:flex-col items-center spine-panel text-white"
          style={{ background: `linear-gradient(180deg, rgba(255,255,255,0.14), transparent 40%, rgba(0,0,0,0.25)), ${project.spineColor}` }}
        >
          <span className="spine-logo relative shrink-0 rounded-[3px] bg-white/15 border border-white/25 flex items-center justify-center font-bold">
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
                className={`absolute inset-0 w-full h-full object-contain p-px transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </span>
          <span className="spine-title font-bold tracking-tight truncate min-w-0 md:min-h-0 md:[writing-mode:vertical-rl]">
            {project.title}
          </span>
        </span>

        {/* Year band */}
        <span className={`${labelClass} spine-year flex items-center justify-center shrink-0 font-mono`}>
          <span className="md:[writing-mode:vertical-rl]">{project.year}</span>
        </span>

        {project.assets?.spineArt && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.assets.spineArt}
            alt=""
            loading="lazy"
            onLoad={() => setArtLoaded(true)}
            className={`spine-art-img object-cover transition-opacity duration-300 ${artLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </span>

      {/* Hover sheen */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </button>
  );
}
