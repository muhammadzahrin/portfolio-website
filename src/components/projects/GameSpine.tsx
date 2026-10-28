'use client';

import React from 'react';
import { Project } from '@/data/types';

interface GameSpineProps {
  project: Project;
  onActivate: (project: Project, trigger: HTMLButtonElement) => void;
  /** Mobile: pulled out of the stack by a first tap; a second tap opens it. */
  pulledOut?: boolean;
  /** Image URLs (spine art, client logos) the shelf has loaded and revealed together. */
  revealed?: Set<string>;
}

/**
 * PS2-style game case seen from the spine, locked to case proportions:
 * 15 mm x 190 mm black case, with the 15 x 184 mm spine inset 3 mm from each end.
 * (Real spec is 14 mm; 15 reads better on screen.)
 *
 * Spine layout, following the PS2 spine:
 *   label band: square brand logo + "Zahrin"  |  art panel: title, client logo slot, year
 * Label band: black for games, silver for software.
 * The art panel shows the title on the spine colour until custom spine art
 * is revealed over it. The client logo slot is always reserved (empty for
 * personal projects) so titles centre identically on every spine.
 *
 * Mobile: the case lies flat (horizontal) in a gapless stack, sized by width.
 * Desktop (md+): the case stands upright on the shelf, sized by height.
 */
export function GameSpine({ project, onActivate, pulledOut = false, revealed }: GameSpineProps) {
  const isGame = project.kind === 'game';
  const spineArt = project.assets?.spineArt;
  const clientLogo = project.assets?.clientLogo;
  const showArt = !!spineArt && !!revealed?.has(spineArt);
  const showLogo = !!clientLogo && !!revealed?.has(clientLogo);
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
      onClick={(e) => {
        preloadCover();
        onActivate(project, e.currentTarget);
      }}
      onPointerEnter={preloadCover}
      onFocus={preloadCover}
      aria-label={`Open ${project.title} (${isGame ? 'game' : 'software'}, ${project.year})`}
      className={`game-spine group relative shrink-0 md:rounded-[2px] bg-[#070708] text-left
        w-full aspect-[190/15]
        md:w-auto md:max-w-none md:h-[clamp(380px,68vh,520px)] md:aspect-[15/190]
        shadow-[0_2px_6px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.07)]
        transition-[transform,box-shadow] duration-200 ease-out
        motion-safe:md:hover:-translate-y-3 motion-safe:md:focus-visible:-translate-y-3
        focus-visible:outline-offset-4
        ${pulledOut ? 'spine-pulled translate-x-3 z-10' : ''}`}
    >
      {/* Spine: 184 of the case's 190 mm, leaving 3 mm of black case at each end */}
      <span className="spine-art absolute inset-y-0 inset-x-[1.58%] md:inset-x-0 md:inset-y-[1.58%] flex flex-row md:flex-col overflow-hidden">
        {/* Label band: brand logo square + name (where PS2 has its logo + "PlayStation 2") */}
        <span className={`${labelClass} spine-band flex flex-row md:flex-col items-center shrink-0`}>
          {/* Placeholder for my logo */}
          <span className="spine-mark shrink-0 rounded-[3px] flex items-center justify-center font-black bg-white text-slate-900 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]">
            Z
          </span>
          <span className="spine-brand md:[writing-mode:vertical-rl]">Zahrin</span>
        </span>

        {/* Art panel: title on the spine colour, or custom spine art */}
        <span
          className="spine-panel relative flex-1 min-w-0 md:min-h-0 flex flex-row md:flex-col items-center text-white"
          style={{ background: `linear-gradient(180deg, rgba(255,255,255,0.14), transparent 40%, rgba(0,0,0,0.25)), ${project.spineColor}` }}
        >
          <span className="spine-title flex-1 min-w-0 md:min-h-0 text-center font-bold tracking-tight truncate md:[writing-mode:vertical-rl]">
            {project.title}
          </span>
          {/* Client logo slot: always takes its space, empty for personal projects */}
          <span className="spine-client relative z-10 shrink-0 flex items-center justify-center">
            {showLogo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={clientLogo} alt="" aria-hidden="true" className="spine-art-reveal w-full h-full object-contain" />
            )}
          </span>
          <span className="spine-year relative z-10 shrink-0 font-mono opacity-80 md:[writing-mode:vertical-rl]">{project.year}</span>

          {/* Only mounted once the shelf has preloaded it, so it never downloads on data saver */}
          {showArt && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={spineArt} alt="" aria-hidden="true" className="spine-art-img spine-art-reveal object-cover" />
          )}
        </span>
      </span>

      {/* Hover sheen */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </button>
  );
}
