import React from 'react';

interface PlaceholderImageProps {
  label: string;
  subLabel?: string;
  aspectRatio?: 'video' | 'square' | 'wide' | 'tall';
  className?: string;
  alt: string;
  theme?: 'sky' | 'cyan' | 'green' | 'dark';
}

/**
 * CSS/SVG generated placeholder visual.
 * Complies with requirement: no stock photos or copyrighted art.
 * Utilizes Frutiger Aero liquid highlights, water ripples, and glass reflections.
 */
export function PlaceholderImage({
  label,
  subLabel = '[CSS Gradient Placeholder Visual]',
  aspectRatio = 'video',
  className = '',
  alt,
  theme = 'sky',
}: PlaceholderImageProps) {
  const aspectClasses = {
    video: 'aspect-[16/9]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
    tall: 'aspect-[3/4]',
  };

  const themeGradients = {
    sky: 'from-sky-400/80 via-cyan-300/60 to-emerald-300/70 dark:from-sky-900/80 dark:via-cyan-950/70 dark:to-emerald-950/60',
    cyan: 'from-cyan-400/80 via-sky-300/60 to-blue-400/70 dark:from-cyan-900/80 dark:via-blue-950/70 dark:to-slate-900/70',
    green: 'from-emerald-400/70 via-teal-300/60 to-sky-300/70 dark:from-emerald-900/80 dark:via-teal-950/70 dark:to-slate-900/70',
    dark: 'from-slate-700/80 via-sky-900/60 to-slate-900/90 dark:from-slate-800/90 dark:via-sky-950/80 dark:to-black/90',
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-br ${themeGradients[theme]} ${aspectClasses[aspectRatio]} flex flex-col items-center justify-center p-4 text-center select-none shadow-inner border border-white/40 dark:border-white/10 ${className}`}
    >
      {/* Frutiger Aero glossy water reflection / bubble sheen */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Decorative subtle concentric rings */}
      <div
        className="absolute w-32 h-32 rounded-full border border-white/20 -top-6 -right-6 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute w-44 h-44 rounded-full border border-white/15 -bottom-10 -left-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Label content */}
      <div className="relative z-10 glass-surface px-4 py-2.5 rounded-xl border border-sky-400/25 max-w-[85%] shadow-sm backdrop-blur-md">
        <span className="block text-xs sm:text-sm font-semibold text-white tracking-tight">
          {label}
        </span>
        <span className="block text-[10px] sm:text-xs text-sky-200 mt-0.5">
          {subLabel}
        </span>
      </div>
    </div>
  );
}
