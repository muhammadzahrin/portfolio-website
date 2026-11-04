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

// Shown on hover/focus with a mouse; always on touch screens, which can't hover
const ARROW =
  'absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-xl leading-none text-white bg-black/35 border border-white/15 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100';

/** Panel that cross-fades through slides every few seconds; the whole panel is a link. */
export function Slideshow({ slides, href, label, className = '', children }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Modulo: the slide list can change (Games/Software) while the index is past its end
  const count = Math.max(slides.length, 1);
  const shown = index % count;
  const current = slides[shown];
  const step = (by: number) => setIndex((shown + by + count) % count);

  // Restarts on every change, so a slide picked with the arrows gets its full 4s
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearTimeout(timer);
  }, [paused, slides.length, index]);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-700 ${i === shown ? 'opacity-100' : 'opacity-0'}`}
        >
          {slide.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={slide.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center p-6 text-center text-2xl sm:text-3xl font-black tracking-tight text-white/90"
              style={{ background: slide.color }}
            >
              {slide.caption}
            </div>
          )}
          {/* Inside the slide so it fades with its picture; a shadow behind the letters keeps it readable on any photo */}
          <span className="absolute left-3 right-20 bottom-2.5 truncate text-[11px] tracking-wide text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_0_8px_rgba(0,0,0,0.7)]">
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

      {slides.length > 1 && (
        <>
          <button type="button" aria-label="Previous" onClick={() => step(-1)} className={`${ARROW} left-2`}>
            ‹
          </button>
          <button type="button" aria-label="Next" onClick={() => step(1)} className={`${ARROW} right-2`}>
            ›
          </button>
          <span className="absolute right-3 bottom-3.5 z-10 flex gap-1.5" aria-hidden="true">
            {slides.map((slide, i) => (
              <span
                key={slide.id}
                className={`w-1.5 h-1.5 rounded-full shadow-[0_0_3px_rgba(0,0,0,0.8)] ${i === shown ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </span>
        </>
      )}

      {children && <div className="absolute top-2 right-2 z-10">{children}</div>}
    </div>
  );
}
