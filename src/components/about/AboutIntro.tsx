'use client';

import React, { useCallback, useRef, useState } from 'react';
import { aboutData } from '@/data/about';
import { GlassButton } from '@/components/ui/GlassButton';
import { DetailPanel } from './DetailPanel';

/** My photo, or a generated tile until there is one. */
function Portrait() {
  if (aboutData.portrait) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={aboutData.portrait} alt={aboutData.name} className="w-full h-full rounded-xl object-cover" />;
  }
  return (
    <span className="memory-art memory-tile text-6xl font-black text-white" style={{ '--tile': '#2f7fd6' } as React.CSSProperties}>
      {aboutData.name[0]}
    </span>
  );
}

/** Photo and the start of the bio; Read more opens all of it with the photo spinning. */
export function AboutIntro() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [first, second] = aboutData.bioParagraphs;

  const handleClose = useCallback(() => {
    setOpen(false);
    // Return focus to Read more
    wrapperRef.current?.querySelector('button')?.focus();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 rounded-2xl glass-surface border border-sky-400/20 p-4 md:p-8">
        <div className="about-portrait shrink-0">
          <Portrait />
        </div>

        <div ref={wrapperRef} className="min-w-0 flex-1 text-sm sm:text-base leading-relaxed text-slate-300">
          <p>{first}</p>
          <p className="about-fade mt-3">{second}</p>
          <GlassButton variant="secondary" size="sm" className="mt-2" onClick={() => setOpen(true)}>
            Read more
          </GlassButton>
        </div>
      </div>

      {/* Outside the glass: a blur on a parent would pin the full-screen panel to that parent */}
      {open && (
        <DetailPanel art={<Portrait />} eyebrow="About me" title={aboutData.name} subtitle={aboutData.headline} onClose={handleClose}>
          {aboutData.bioParagraphs.map((para) => (
            <p key={para} className="text-sm leading-relaxed text-slate-300">
              {para}
            </p>
          ))}
        </DetailPanel>
      )}
    </>
  );
}
