import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
}

/**
 * Reusable Section component enforcing Apple spacing and typographic hierarchy.
 */
export function Section({
  children,
  id,
  badge,
  title,
  subtitle,
  className = '',
  containerClassName = '',
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-6 sm:py-8 md:py-10 relative ${className}`}
      {...props}
    >
      <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {(badge || title || subtitle) && (
          <div className="mb-4 sm:mb-6 text-left">
            {badge && (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-500/15 text-sky-300 border border-sky-400/30 mb-2 shadow-sm">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1.5 text-sm sm:text-base text-slate-300 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
