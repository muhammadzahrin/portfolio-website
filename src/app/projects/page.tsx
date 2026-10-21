import React from 'react';
import type { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { ProjectShelf } from '@/components/projects/ProjectShelf';

export const metadata: Metadata = {
  title: 'Projects | Zahrin',
  description:
    'Projects portfolio of Zahrin - Shuttle Tracker, MillGPT, Workload Tracker, Expired (Pygame), and JavaScript Canvas Game.',
};

export default function ProjectsPage() {
  return (
    <div className="pb-10">
      {/* Exactly one single <h1> */}
      <PageHeader
        title="Projects"
        subtitle="Software engineering projects, enterprise tools, and game prototypes."
      />

      <Section id="projects-list" className="pt-0">
        <ProjectShelf projects={projectsData} />
      </Section>
    </div>
  );
}
