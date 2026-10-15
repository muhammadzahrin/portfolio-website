import React from 'react';
import { Project } from '@/data/types';
import { GlassCard } from '@/components/ui/GlassCard';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { GlassButton } from '@/components/ui/GlassButton';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

/**
 * Isolated ProjectCard component.
 * Architecture Note: In a later phase, this will be replaced by 3D/stylized
 * physical game cases, so this component is kept modular, self-contained,
 * and decoupled from the page layout.
 */
export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const isPersonal = project.category === 'personal';

  return (
    <GlassCard as="article" className={`flex flex-col h-full ${className}`}>
      {/* Visual Placeholder Header */}
      <div className="p-3 pb-0">
        <PlaceholderImage
          label={project.title}
          subLabel={`[${project.category.toUpperCase()} PROJECT PREVIEW]`}
          aspectRatio="video"
          alt={`Visual placeholder for ${project.title}`}
          theme={isPersonal ? 'green' : 'sky'}
        />
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Category & Year Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              isPersonal
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                : 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30'
            }`}
          >
            {isPersonal ? 'Personal / Game Dev' : 'Work / Enterprise'}
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          {project.title}
        </h3>

        {/* One-Line Summary */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 flex-1">
          {project.oneLineSummary}
        </p>

        {/* Supervisor Approval Note Notice */}
        {project.supervisorApprovalNote && (
          <div className="mb-4 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 font-mono">
            {project.supervisorApprovalNote}
          </div>
        )}

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5 pt-1">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-900/40 text-slate-200 border border-sky-400/20 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/40 mt-auto">
          <GlassButton
            variant="secondary"
            size="sm"
            className="w-full justify-between"
            ariaLabel={`View placeholder details for ${project.title}`}
          >
            <span>[View Case Study Placeholder]</span>
            <span aria-hidden="true">→</span>
          </GlassButton>
        </div>
      </div>
    </GlassCard>
  );
}
