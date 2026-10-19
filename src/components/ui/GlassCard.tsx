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
        group/card relative
        glass-surface
        rounded-2xl
        overflow-hidden
        border border-sky-400/20
        ${interactive ? 'apple-press cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {/* GPU-Composited Hover Overlay: animates pure opacity to bypass backdrop-filter repaint */}
      {hoverEffect && (
        <div
          className="absolute inset-0 rounded-2xl bg-slate-800/40 border border-sky-400/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-75 ease-out pointer-events-none"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
