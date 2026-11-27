'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Slide } from '@/components/home/Slideshow';
import { BlackGlassDialog } from './BlackGlassDialog';

interface GalleryViewerProps {
  slides: Slide[];
  /** The picture to open on */
  start: number;
  label: string;
  onClose: () => void;
}

function Picture({ slide, small = false }: { slide: Slide; small?: boolean }) {
  // Big picture: the whole photo, whatever its shape (bars fill the rest); thumbnails crop to fill
  // eslint-disable-next-line @next/next/no-img-element
  if (slide.image) return <img src={slide.image} alt="" className={`w-full h-full ${small ? 'object-cover' : 'object-contain'}`} />;
  // Placeholder: a solid block of colour with the caption in the middle
  return (
    <div
      className={`w-full h-full flex items-center justify-center text-center font-black tracking-tight text-white/90 ${small ? 'px-1 text-[10px] leading-tight' : 'px-16 text-2xl sm:text-4xl'}`}
      style={{ background: slide.color }}
    >
      {slide.caption}
    </div>
  );
}

// The whole height is clickable, but it only darkens while pressed, so it never sits over the photo
const ARROW =
  'absolute inset-y-0 w-10 sm:w-12 flex items-center justify-center text-white/80 hover:text-white active:bg-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400';

/**
 * Black glass picture viewer: a big picture with previous/next strips down each side (the whole
 * height is clickable), its caption in the corner, and a row of thumbnails below to pick from.
 */
export function GalleryViewer({ slides, start, label, onClose }: GalleryViewerProps) {
  const [index, setIndex] = useState(start);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const thumbEls = useRef<(HTMLButtonElement | null)[]>([]);
  const current = slides[index];
  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  // Keep the picked thumbnail in view
  useEffect(() => {
    thumbEls.current[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [index]);

  // Arrow keys flip through; scrolling must not move the page behind (on Experience it would switch
  // entries), except the thumbnail row, which a mouse wheel scrolls sideways
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + slides.length) % slides.length);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % slides.length);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const row = thumbsRef.current;
      if (row?.contains(e.target as Node)) row.scrollLeft += e.deltaX + e.deltaY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!thumbsRef.current?.contains(e.target as Node)) e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [slides.length]);

  if (!current) return null;

  return (
    <BlackGlassDialog label={label} onClose={onClose} centered className="viewer-fill">
      {/* 4:3 frame (most photos are 4:3), narrowed on short screens so it and the thumbnails fit */}
      <div className="w-[min(92vw,960px,calc((100dvh_-_13rem)*4/3))]">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black">
          <Picture slide={current} />
          {/* Same caption style as the slideshows; a shadow behind the letters keeps it readable on any photo */}
          {current.image && (
            <span className="absolute left-3 right-16 bottom-2.5 text-xs sm:text-sm leading-tight tracking-wide text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_0_8px_rgba(0,0,0,0.7)]">
              {current.caption}
            </span>
          )}
          {slides.length > 1 && (
            <>
              <button type="button" aria-label="Previous picture" onClick={() => go(index - 1)} className={`${ARROW} left-0`}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button type="button" aria-label="Next picture" onClick={() => go(index + 1)} className={`${ARROW} right-0`}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        <div ref={thumbsRef} className="mt-3 flex gap-2 overflow-x-auto overscroll-contain touch-pan-x pb-1">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              ref={(el) => {
                thumbEls.current[i] = el;
              }}
              type="button"
              aria-label={`Show ${slide.caption}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`shrink-0 w-24 sm:w-32 aspect-[4/3] rounded overflow-hidden border-2 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${i === index ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <Picture slide={slide} small />
            </button>
          ))}
        </div>
      </div>
    </BlackGlassDialog>
  );
}
