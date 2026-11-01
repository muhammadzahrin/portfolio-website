import React from 'react';
import type { Metadata } from 'next';
import { aboutData } from '@/data/about';
import { memoriesData } from '@/data/memories';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { AboutIntro } from '@/components/about/AboutIntro';
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
        <AboutIntro />
      </Section>

      <Section id="about-memories" className="pt-0 sm:pt-0 md:pt-0">
        <MemoryGrid memories={memoriesData} />
      </Section>
    </div>
  );
}
