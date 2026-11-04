'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export interface Slide {
  id: string;
  caption: string;
  /** Photo or screenshot; without one a coloured placeholder with the caption is shown */
  image?: string;
  color: string;
}

interface SlideshowProps {
  slides: Slide[];
  /** Where clicking the panel goes */
  href: string;
  label: string;
  className?: string;
  /** Controls drawn over the panel's top-right corner (kept clickable above the link) */
  children?: React.ReactNode;
}

/** Panel that cross-fades through slides every few seconds; the whole panel is a link. */
export function Slideshow({ slides, href, label, className = '', children }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  // Modulo: the slide list can change (Games/Software) while the index is past its end
  const shown = index % Math.max(slides.length, 1);
  const current = slides[shown];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-700 ${i === shown ?'opacity-100' : 'opacity-0'}`}
        >
          {slide.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={slide.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center p-6 text-center text-2xl sm:text-3xl font-black tracking-tight text-white/90"
              style={{ background: `linear-gradient(135deg, ${slide.color}, #020617)` }}
            >
              {slide.caption}
            </div>
          )}
          {/* Inside the slide so it fades with its picture */}
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6 text-[11px] tracking-wide text-white/80">
            {slide.caption}
          </span>
        </div>
      ))}

      <Link
        href={href}
        aria-label={`${label}: ${current?.caption ?? ''}`}
        className="absolute inset-0 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      />

      {children && <div className="absolute top-2 right-2 z-10">{children}</div>}
    </div>
  );
}
