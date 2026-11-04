'use client';

import React, { useState } from 'react';
import { projectsData } from '@/data/projects';
import { FilterPills } from '@/components/ui/FilterPills';
import { Slideshow } from './Slideshow';

const KINDS = [
  { id: 'software', label: 'Software' },
  { id: 'game', label: 'Games' },
] as const;

/** One 16:9 panel of project highlights; the pills swap between games and software. */
export function HomeProjects() {
  const [kind, setKind] = useState<'game' | 'software'>('software');
  const slides = projectsData
    .filter((p) => p.kind === kind)
    .map((p) => ({ id: p._id, caption: p.title, image: p.assets?.videoPoster, color: p.spineColor }));

  return (
    <Slideshow slides={slides} href="/projects" label="Projects" className="aspect-video">
      <FilterPills label="Show projects" filters={[...KINDS]} value={kind} onChange={setKind} className="!p-1" />
    </Slideshow>
  );
}
