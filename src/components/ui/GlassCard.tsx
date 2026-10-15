import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  interactive?: boolean;
  as?: 'div' | 'article' | 'section';
}

/**
 * Reusable Frutiger Aero + Apple Design Glass Card.
 * Incorporates translucent backdrop blur, thin top highlight edge,
 * and high-contrast fallbacks for legacy/reduced-transparency environments.
 */
export function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  interactive = false,
  as: Component = 'div',
  ...props
}: GlassCardProps) {
  return (
    <Component
      className={`
        glass-surface
        rounded-2xl
        overflow-hidden
        border border-sky-400/20
        transition-colors
        duration-150
        ${hoverEffect ? 'hover:border-sky-400/45 hover:bg-slate-900/40' : ''}
        ${interactive ? 'apple-press cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
