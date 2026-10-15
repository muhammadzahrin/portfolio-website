import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { aboutData } from '@/data/about';
import { workExperiences } from '@/data/experience';
import { projectsData } from '@/data/projects';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Section } from '@/components/ui/Section';
import {
  ArrowRightIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  GamepadIcon,
  MailIcon,
  SparklesIcon,
} from '@/components/ui/Icons';
import { ProjectCard } from '@/components/projects/ProjectCard';

export default function HomePage() {
  const latestExperience = workExperiences[0];
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <div className="pb-10">
      {/* Hero / Intro Section */}
      <section className="pt-4 sm:pt-8 pb-6 sm:pb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.1] mb-4">
            Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">{siteConfig.name}</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-6">
            {siteConfig.shortBioIntro}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <GlassButton href="/projects" variant="primary" size="md">
              <span>Explore Projects</span>
              <ArrowRightIcon className="w-4 h-4" />
            </GlassButton>
            <GlassButton href="/contact" variant="secondary" size="md">
              <span>Get in Touch</span>
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Table of Contents / Teaser Sections */}

      {/* 1. About Teaser */}
      <Section
        id="toc-about"
        badge="Section 01"
        title="About Me"
        subtitle="Background, academic studies at UniKL MIIT, key skills, and community highlights."
      >
        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-medium text-sm">
                <GraduationCapIcon className="w-4 h-4" />
                <span>UniKL MIIT Diploma Student & Club President</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {aboutData.headline}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 line-clamp-2">
                {aboutData.bioParagraphs[0]}
              </p>
              {/* Highlight Pill Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-400/20">
                  Performing Arts Founder
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-400/20">
                  Expired Game (Pygame)
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-400/20">
                  Malaysian Game Industry Enthusiast
                </span>
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <GlassButton href="/about" variant="secondary" size="md" className="w-full md:w-auto">
                <span>View Full Bio & Highlights</span>
                <ArrowRightIcon className="w-4 h-4" />
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* 2. Work Experience Teaser */}
      <Section
        id="toc-experience"
        badge="Section 02"
        title="Work Experience"
        subtitle="Professional role timeline and industry internship milestones."
      >
        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                <BriefcaseIcon className="w-4 h-4" />
                <span>Current Internship</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {latestExperience.role} at {latestExperience.organisation}
              </h3>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {latestExperience.startDate} — {latestExperience.endDate} • {latestExperience.location}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                [Placeholder: Practical internship experience focused on IT systems support and tooling.]
              </p>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 font-mono inline-block">
                {latestExperience.supervisorApprovalNote}
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <GlassButton href="/experience" variant="secondary" size="md" className="w-full md:w-auto">
                <span>View Experience Timeline</span>
                <ArrowRightIcon className="w-4 h-4" />
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* 3. Projects Teaser */}
      <Section
        id="toc-projects"
        badge="Section 03"
        title="Featured Projects"
        subtitle="A preview of software applications, campus tools, and game prototypes."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        <div className="text-center">
          <GlassButton href="/projects" variant="primary" size="md">
            <span>View All {projectsData.length} Projects</span>
            <ArrowRightIcon className="w-4 h-4" />
          </GlassButton>
        </div>
      </Section>

      {/* 4. Contact Teaser */}
      <Section
        id="toc-contact"
        badge="Section 04"
        title="Get in Touch"
        subtitle="Direct links to connect on LinkedIn, check GitHub repositories, or send an email."
      >
        <GlassCard className="p-6 sm:p-8 text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-sky-500/10 dark:bg-sky-400/20 text-sky-600 dark:text-sky-300 flex items-center justify-center mx-auto">
              <MailIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Let’s Connect
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Open to conversations regarding game development, software projects, or industry opportunities.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <GlassButton href="/contact" variant="primary" size="md">
                <span>Open Contact Page</span>
                <ArrowRightIcon className="w-4 h-4" />
              </GlassButton>
              <GlassButton
                href={siteConfig.socials.linkedin}
                external
                variant="secondary"
                size="md"
              >
                <span>LinkedIn Profile</span>
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </Section>
    </div>
  );
}
