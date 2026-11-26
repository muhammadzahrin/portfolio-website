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
    // Narrower than other pages so each paragraph wraps to a few comfortable lines
    <div className="xmb max-w-2xl mx-auto px-3 sm:px-4">
      <h1 className="sr-only">Experience</h1>
      <XmbColumn items={workExperiences} />
    </div>
  );
}
