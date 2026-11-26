import React from 'react';
import type { Metadata } from 'next';
import { workExperiences } from '@/data/experience';
import { XmbColumn } from '@/components/experience/XmbColumn';

export const metadata: Metadata = {
  title: 'Experience | Zahrin',
  description: 'Work and leadership experience of Zahrin, Software Engineering Intern at SD Guthrie Berhad.',
};

export default function ExperiencePage() {
  return (
    // Desktop: fills the screen below the nav bar; only the column and the text box scroll
    <div className="xmb max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="sr-only">Experience</h1>
      <XmbColumn items={workExperiences} />
    </div>
  );
}
