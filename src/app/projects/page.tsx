import React from 'react';
import type { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects | Zahrin',
  description:
    'Projects portfolio of Zahrin - Shuttle Tracker, MillGPT, Workload Tracker, Expired (Pygame), and JavaScript Canvas Game.',
};

export default function ProjectsPage() {
  const personalProjects = projectsData.filter((p) => p.category === 'personal');
  const workProjects = projectsData.filter((p) => p.category === 'work');

  return (
    <div className="pb-10">
      {/* Exactly one single <h1> */}
      <PageHeader
        title="Projects"
        subtitle="Software engineering projects, enterprise tools, and game prototypes."
      />

      {/* Overview & Filter Pills Placeholder */}
      <Section id="projects-list" className="pt-0">
        {/* Placeholder Filter / Tab Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-full glass-surface w-fit border border-white/60 dark:border-white/10 shadow-glass-sm">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-800 dark:text-sky-200 border border-sky-400/30">
            All Projects ({projectsData.length})
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-xs text-slate-600 dark:text-slate-300">
            Work / Enterprise ({workProjects.length})
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-xs text-slate-600 dark:text-slate-300">
            Personal & Indie Game ({personalProjects.length})
          </span>
        </div>

        {/* Grid of Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {/* Shelf of Game Cases Phase 2 Architecture Notice */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl glass-surface border border-sky-300/40 dark:border-sky-800/40 text-center max-w-2xl mx-auto">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 mb-2">
            Architecture Ready for Phase 2
          </span>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            In the upcoming phase, this grid will transform into an interactive shelf of physical game cases with custom spine art and tilt physics, while preserving this exact data array.
          </p>
        </div>
      </Section>
    </div>
  );
}
