import React from 'react';
import type { Metadata } from 'next';
import { aboutData } from '@/data/about';
import { highlightsData } from '@/data/highlights';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Section } from '@/components/ui/Section';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import {
  GraduationCapIcon,
  SparklesIcon,
  GamepadIcon,
} from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'About | Zahrin',
  description:
    'About Zahrin - Diploma in IT at UniKL MIIT, intern at SD Guthrie Berhad, club founder, and indie game developer.',
};

export default function AboutPage() {
  return (
    <div className="pb-10">
      {/* Exactly one single <h1> via PageHeader */}
      <PageHeader
        title="About Me"
        subtitle="My background in IT, academic path at UniKL MIIT, technical skills, and reflections from my leadership and game dev journeys."
      />

      {/* 1. Bio & Overview */}
      <Section id="about-bio" className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Visual Profile Placeholder (CSS-generated, no stock photos) */}
          <div className="md:col-span-1">
            <GlassCard className="p-4 h-full flex flex-col justify-between">
              <PlaceholderImage
                label="Zahrin"
                subLabel="[Portrait Placeholder • Frutiger Sheen]"
                aspectRatio="square"
                alt="Portrait visual placeholder for Zahrin"
                theme="sky"
              />
              <div className="mt-4 p-3 rounded-xl bg-sky-500/10 border border-sky-400/20 text-xs text-sky-800 dark:text-sky-300">
                <span className="font-semibold block mb-0.5">Focus Areas:</span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  {aboutData.focusAreas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </div>

          {/* Bio Text */}
          <div className="md:col-span-2">
            <GlassCard className="p-6 sm:p-8 h-full flex flex-col justify-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {aboutData.headline}
              </h2>
              {aboutData.bioParagraphs.map((para, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* 2. Education */}
      <Section
        id="about-education"
        badge="Education"
        title="Academic Foundation"
        subtitle="Current studies and coursework at Universiti Kuala Lumpur."
      >
        <div className="space-y-4">
          {aboutData.education.map((edu) => (
            <GlassCard key={edu._id} className="p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold text-sm">
                  <GraduationCapIcon className="w-5 h-5" />
                  <span>{edu.qualification}</span>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {edu.dates}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {edu.institution}
              </h3>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5 mb-2">
                Status: {edu.status}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-mono bg-slate-900/40 p-3 rounded-xl border border-sky-400/20 backdrop-blur-sm">
                {edu.note}
              </p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* 3. Skills Section */}
      <Section
        id="about-skills"
        badge="Technical & Soft Skills"
        title="Skills & Tooling"
        subtitle="Grouped capabilities spanning software development, game loops, enterprise IT, and creative leadership."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {aboutData.skillCategories.map((category) => (
            <GlassCard key={category._id} className="p-6">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-sky-400" />
                <span>{category.categoryName}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/45 text-slate-200 border border-sky-400/20 shadow-sm backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* 4. Highlights Section (From LinkedIn Posts) */}
      <Section
        id="about-highlights"
        badge="Highlights & Reflections"
        title="Milestones & Key Learnings"
        subtitle="Short entries formatted as: Event, My Role, and What I Learnt."
      >
        <div className="space-y-6">
          {highlightsData.map((highlight) => (
            <GlassCard key={highlight._id} className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-sky-400/20">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400">
                    {highlight.sourceNote}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {highlight.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 self-start sm:self-auto">
                  {highlight.date}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-slate-900/40 border border-sky-400/20 backdrop-blur-sm">
                  <span className="font-semibold block text-slate-100 mb-1">
                    Event / Initiative:
                  </span>
                  <span className="text-slate-300">{highlight.event}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/40 border border-sky-400/20 backdrop-blur-sm">
                  <span className="font-semibold block text-slate-100 mb-1">
                    My Role:
                  </span>
                  <span className="text-slate-300">{highlight.role}</span>
                </div>

                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/25 backdrop-blur-sm">
                  <span className="font-semibold block text-sky-300 mb-1">
                    What I Learnt:
                  </span>
                  <span className="text-slate-300">{highlight.whatILearnt}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>
    </div>
  );
}
