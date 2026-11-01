'use client';

import React, { useEffect, useRef } from 'react';
import { BlackGlassDialog } from '@/components/ui/BlackGlassDialog';

interface DetailPanelProps {
  art: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
  onClose: () => void;
  /** Goes in the box that scrolls on its own */
  children: React.ReactNode;
}

/** Black glass panel: spinning image, a fixed title, and a text box that scrolls by itself. */
export function DetailPanel({ art, eyebrow, title, subtitle, onClose, children }: DetailPanelProps) {
  const textRef = useRef<HTMLDivElement | null>(null);

  // Only the text scrolls: wheel and touch scrolling elsewhere must not move the page behind
  useEffect(() => {
    const blockPageScroll = (e: Event) => {
      const text = textRef.current;
      const target = e.target as Element;
      const canScroll = text?.contains(target) && (text.scrollHeight > text.clientHeight || target.closest('.memory-photos'));
      if (!canScroll) e.preventDefault();
    };
    window.addEventListener('wheel', blockPageScroll, { passive: false });
    window.addEventListener('touchmove', blockPageScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', blockPageScroll);
      window.removeEventListener('touchmove', blockPageScroll);
    };
  }, []);

  return (
    <BlackGlassDialog label={title} onClose={onClose}>
      <div className="memory-detail">
        <div className="memory-stage">
          <div className="memory-spin">{art}</div>
        </div>

        <div className="memory-info">
          <div className="shrink-0 text-center">
            <p className="text-[11px] font-mono uppercase tracking-wider text-sky-300">{eyebrow}</p>
            <h2 className="memory-name mt-1 text-xl sm:text-2xl text-amber-200">{title}</h2>
            <p className="mt-0.5 text-sm text-slate-200">{subtitle}</p>
          </div>

          <div
            ref={textRef}
            tabIndex={0}
            role="region"
            aria-label={`About ${title}`}
            className="memory-text mt-4 space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            {children}
          </div>
        </div>
      </div>
    </BlackGlassDialog>
  );
}
