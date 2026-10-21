import React from 'react';
import { Project } from '@/data/types';

interface CoverArtProps {
  project: Project;
  className?: string;
}

/**
 * Game case cover art. Uses the project's cover image when one exists,
 * otherwise generates a block-out cover from the spine colour and title.
 * Shared by the manual cover and the disc label.
 */
export function CoverArt({ project, className = '' }: CoverArtProps) {
  if (project.assets?.cover) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.assets.cover} alt="" className={`w-full h-full object-cover ${className}`} />;
  }

  const isGame = project.kind === 'game';

  return (
    <div className={`w-full h-full flex flex-col ${className}`} aria-hidden="true">
      <div className={`h-[9%] flex items-center px-[6%] ${isGame ? 'spine-label-game' : 'spine-label-software'}`}>
        <span className="font-black tracking-[0.2em] text-[0.7em]">ZAHRIN</span>
      </div>
      <div
        className="flex-1 flex flex-col items-center justify-center text-center p-[8%] text-white"
        style={{ background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18), transparent 55%), linear-gradient(160deg, ${project.spineColor}, #050608)` }}
      >
        <span className="font-black leading-tight text-[1.6em] tracking-tight drop-shadow">{project.title}</span>
        <span className="mt-[6%] text-[0.6em] uppercase tracking-[0.25em] opacity-70">[Cover art placeholder]</span>
      </div>
      <div className={`h-[7%] flex items-center justify-between px-[6%] text-[0.55em] font-mono ${isGame ? 'spine-label-game' : 'spine-label-software'}`}>
        <span>{project.catalogCode}</span>
        <span>{project.year}</span>
      </div>
    </div>
  );
}
