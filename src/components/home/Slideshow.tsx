'use client';

import React, { useEffect, useRef, useState } from 'react';
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

const MOVE: KeyframeAnimationOptions = { duration: 600, easing: 'ease-in-out' };
const SWIPE_PX = 40;

/**
 * Panel that slides through pictures; the whole panel is a link. A timer bar along the bottom
 * empties, then the next picture slides in. Dots pick a picture; on phones you can swipe.
 */
export function Slideshow({ slides, href, label, className = '', children }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  // Only while the panel has keyboard focus
  const [paused, setPaused] = useState(false);
  // Bumped by the dots, so picking the picture already showing still restarts the timer
  const [picks, setPicks] = useState(0);
  // Reduced motion: no auto-advance or sliding (the global rule would also end the timer bar instantly)
  const [still, setStill] = useState(true);
  const slideEls = useRef<(HTMLDivElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  useEffect(() => setStill(matchMedia('(prefers-reduced-motion: reduce)').matches), []);

  // Modulo: the slide list can change (Games/Software) while the index is past its end
  const count = Math.max(slides.length, 1);
  const shown = index % count;
  const current = slides[shown];

  // dir 1: the new picture comes in from the right and the old one leaves to the left; -1 the reverse
  const go = (to: number, dir: number) => {
    to = (to + count) % count;
    if (to === shown) return;
    if (!still) {
      slideEls.current[to]?.animate([{ transform: `translateX(${dir * 100}%)` }, { transform: 'none' }], MOVE);
      slideEls.current[shown]?.animate([{ transform: 'none' }, { transform: `translateX(${-dir * 100}%)` }], MOVE);
    }
    setIndex(to);
  };

  return (
    <div
      className={`group relative rounded-2xl aero-panel touch-pan-y ${className}`}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        swiped.current = false;
      }}
      onTouchEnd={(e) => {
        if (!touch.current || slides.length < 2) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
        swiped.current = true;
        go(shown + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      }}
      // A swipe isn't a tap: don't follow the link
      onClickCapture={(e) => {
        if (!swiped.current) return;
        swiped.current = false;
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* The picture area, inset inside the glass frame; clips the slides as they move */}
      <div className="absolute inset-1.5 rounded-xl overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => {
              slideEls.current[i] = el;
            }}
            aria-hidden="true"
            className="absolute inset-0"
            // Waiting pictures sit just off to the right
            style={i === shown ? undefined : { transform: 'translateX(100%)' }}
          >
            {slide.image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.image} alt="" className="w-full h-full object-cover" />
                {/* Inside the slide so it moves with its picture; a shadow behind the letters keeps it readable on any photo */}
                {/* No truncate: its overflow clipping would cut the shadow off at the text box */}
                <span className="absolute left-3 right-20 bottom-2.5 text-[11px] leading-tight tracking-wide text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_0_8px_rgba(0,0,0,0.7)]">
                  {slide.caption}
                </span>
              </>
            ) : (
              // Placeholder: tinted glass (the colour at 30%) with the caption in the middle
              <div
                className="w-full h-full flex items-center justify-center px-14 py-6 text-center text-2xl sm:text-3xl font-black tracking-tight text-white/90"
                style={{ background: `${slide.color}4d` }}
              >
                {slide.caption}
              </div>
            )}
          </div>
        ))}

        {/* Restarts (key) on every new picture, including a Software/Games switch, and on a dot pick;
            moving on when it empties keeps the two in step */}
        {!still && slides.length > 1 && (
          <span
            key={`${current?.id}-${picks}`}
            className="slide-timer"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
            onAnimationEnd={() => go(shown + 1, 1)}
          />
        )}
      </div>

      <Link
        href={href}
        aria-label={`${label}: ${current?.caption ?? ''}`}
        className="absolute inset-0 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      />

      {slides.length > 1 && (
        <span className="absolute right-2 bottom-2.5 z-10 flex">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show ${slide.caption}`}
              aria-current={i === shown}
              onClick={() => {
                go(i, i > shown ? 1 : -1);
                setPicks((p) => p + 1);
              }}
              className="group/dot p-1"
            >
              <span
                className={`block w-2 h-2 rounded-full shadow-[0_0_3px_rgba(0,0,0,0.8)] ${i === shown ? 'bg-white' : 'bg-white/40 group-hover/dot:bg-white/80'}`}
              />
            </button>
          ))}
        </span>
      )}

      {children && <div className="absolute top-2 right-2 z-10">{children}</div>}
    </div>
  );
}
