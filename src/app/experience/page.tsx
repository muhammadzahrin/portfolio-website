import React from 'react';
import type { Metadata } from 'next';
import { workExperiences } from '@/data/experience';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Section } from '@/components/ui/Section';
import { BriefcaseIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Work Experience | Zahrin',
  description:
    'Work experience timeline of Zahrin - IT Intern at SD Guthrie Berhad.',
};

export default function ExperiencePage() {
  return (
    <div className="pb-10">
      {/* Exactly one single <h1> */}
      <PageHeader
        title="Work Experience"
        subtitle="Professional roles and technical internships."
      />

      <Section id="experience-timeline" className="pt-0">
        <div className="relative pl-6 sm:pl-8 border-l-2 border-sky-300/50 dark:border-sky-700/50 ml-2 sm:ml-4 space-y-8">
          {workExperiences.map((exp) => (
            <div key={exp._id} className="relative">
              {/* Timeline Node Dot */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-sky-500 border-4 border-white dark:border-slate-900 shadow-sm"
                aria-hidden="true"
              />

              <GlassCard as="article" className="p-6 sm:p-8">
                {/* Header: Role & Organisation */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                        <BriefcaseIcon className="w-3.5 h-3.5" />
                        {exp.isCurrent ? 'Current Role' : 'Past Role'}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {exp.location}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {exp.role}
                    </h2>
                    <p className="text-base font-medium text-sky-700 dark:text-sky-300">
                      {exp.organisation}
                    </p>
                  </div>

                  <div className="self-start sm:self-auto">
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-mono font-medium bg-sky-950/30 text-slate-200 border border-sky-400/20">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                </div>

                {/* Supervisor Approval Note Banner */}
                <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 font-mono">
                  <span className="font-bold mr-1">Notice:</span>
                  {exp.supervisorApprovalNote}
                </div>

                {/* Bullets (2 or 3 placeholders) */}
                <div className="space-y-2.5">
                  <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 block mb-1">
                    Responsibilities & Tasks [Placeholders]:
                  </span>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
