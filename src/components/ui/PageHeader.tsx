import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from './Icons';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

/**
 * Reusable PageHeader component ensuring exactly one single <h1> per page.
 * Applies Apple optical tracking (-0.03em) and tight leading.
 * Optimized with compact vertical padding to pull page content above the fold.
 */
export function PageHeader({
  title,
  subtitle,
  badge,
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`pt-3 pb-4 sm:pt-5 sm:pb-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {badge && (
        <div className="mb-2.5">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-500/15 text-sky-300 border border-sky-400/30 shadow-sm">
            {badge}
          </span>
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.15]">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
}
