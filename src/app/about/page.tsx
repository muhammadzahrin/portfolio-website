import React from 'react';
import type { Metadata } from 'next';
import { aboutData } from '@/data/about';
import { memoriesData } from '@/data/memories';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { MemoryGrid } from '@/components/about/MemoryGrid';

export const metadata: Metadata = {
  title: 'About | Zahrin',
  description:
    'About Zahrin - Diploma in IT at UniKL MIIT, intern at SD Guthrie Berhad, club founder, and indie game developer.',
};

export default function AboutPage() {
  return (
    <div className="pb-10">
      {/* Exactly one single <h1> via PageHeader */}
      <PageHeader title="About Me" subtitle={aboutData.headline} />

      <Section id="about-bio" className="pt-0 sm:pt-0 md:pt-0">
        <div className="max-w-3xl space-y-3 text-sm sm:text-base leading-relaxed text-slate-300">
          {aboutData.bioParagraphs.map((para) => (
            <p key={para}>{para}</p>
          ))}
          <p className="text-xs sm:text-sm text-slate-400">Focus areas: {aboutData.focusAreas.join(' · ')}</p>
        </div>
      </Section>

      <Section id="about-memories" className="pt-0 sm:pt-0 md:pt-0">
        <MemoryGrid memories={memoriesData} />
      </Section>
    </div>
  );
}
