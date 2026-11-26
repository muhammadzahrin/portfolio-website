'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { WorkExperience } from '@/data/types';
import { Slideshow } from '@/components/home/Slideshow';
import { GalleryViewer } from '@/components/ui/GalleryViewer';
import { BlackGlassDialog } from '@/components/ui/BlackGlassDialog';

const PLACEHOLDER_COLORS = ['#2f7fd6', '#2a9d8f', '#8e5bd6', '#d6862f'];

// 'YYYY-MM' → 'MM/YYYY'; a bare year stays as it is
const formatDate = (d: string) => {
  const [y, m] = d.split('-');
  return m ? `${m}/${y}` : y;
};

const dateRange = (start: string, end?: string) =>
  !end ? (
    <>
      {formatDate(start)} – <span className="text-emerald-400">Present</span>
    </>
  ) : start === end ? (
    formatDate(start)
  ) : (
    `${formatDate(start)} – ${formatDate(end)}`
  );

// [label](href) in a bullet becomes a link; split's two capture groups make the parts run text, label, href, text…
function withLinks(text: string) {
  const parts = text.split(/\[([^\]]+)\]\(([^)\s]+)\)/);
  return parts.map((part, i) =>
    i % 3 === 0 ? (
      part
    ) : i % 3 === 1 ? (
      <Link key={i} href={parts[i + 1]} className="text-sky-300 underline underline-offset-2 hover:text-white">
        {part}
      </Link>
    ) : null,
  );
}

/**
 * Console-style menu column. The page itself scrolls through the entries: the menu stays
 * pinned under the nav bar while a tall track scrolls past, and each stop on the track
 * (snapped to, one per entry) selects the next tile. After the last entry the menu lets go
 * and the footer scrolls in. A tile moved past the slot peeks out from under the nav bar.
 */
export function XmbColumn({ items }: { items: WorkExperience[] }) {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const stage = stageRef.current;
      const [a, b] = stopRefs.current;
      if (!stage || !a || !b) return;
      // How far the pinned menu has travelled down the track, in stops
      const moved = stage.getBoundingClientRect().top - stage.parentElement!.getBoundingClientRect().top;
      const travelled = moved / (b.offsetTop - a.offsetTop);
      setActive(Math.max(0, Math.min(items.length - 1, Math.round(travelled))));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items.length]);

  // The gallery picture opened in the big viewer
  const [viewing, setViewing] = useState<number | null>(null);
  // Text cut off because the screen is too short, and whether it's open in full
  const [clipped, setClipped] = useState(false);
  const [reading, setReading] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;
    const check = () => setClipped(text.scrollHeight > text.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(text);
    return () => observer.disconnect();
  }, [active]);

  const current = items[active];
  if (!current) return null;

  const slides = (current.gallery ?? []).map((g, i) => ({
    id: `${current._id}-${i}`,
    caption: g.caption,
    image: g.image,
    color: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length],
  }));

  return (
    <div className="xmb-track" style={{ '--count': items.length } as React.CSSProperties}>
      {items.map((item, i) => (
        <div
          key={item._id}
          ref={(el) => {
            stopRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="xmb-stop"
          style={{ top: `calc(${i} * var(--step))` }}
        />
      ))}

      <div ref={stageRef} className="xmb-stage flex">
        <ul
          aria-label="Experience"
          className="xmb-column shrink-0"
          style={{ transform: `translateY(calc(${-active} * (var(--tile) + var(--gap))))` }}
        >
          {items.map((item, i) => (
            <li key={item._id} className={`xmb-item ${i < active ? 'xmb-above' : i > active ? 'xmb-below' : ''}`}>
              <button
                type="button"
                aria-label={`${item.role}, ${item.organisation}`}
                aria-current={i === active}
                onClick={() => stopRefs.current[i]?.scrollIntoView()}
                className="xmb-tile focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
              >
                {item.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.logo} alt="" className="w-3/4 h-3/4 object-contain" />
                ) : (
                  item.organisation.split(' ').map((w) => w[0]).join('').slice(0, 2)
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Keyed: the details fade in fresh for each pick. The panel ends below its last line;
            on a screen too short for the text, the text is cut off with a Read more. */}
        <div key={current._id} className="xmb-details xmb-fade flex-1 min-w-0 flex flex-col pl-1 sm:pl-2 pb-4">
          <div className="min-h-0 flex flex-col overflow-hidden rounded-2xl glass-surface border border-sky-400/20 p-4 sm:p-6">
            <Heading item={current} pulse />
            {slides.length > 0 && (
              <Slideshow
                slides={slides}
                label={`${current.organisation} photos`}
                onOpen={setViewing}
                className="mt-4 shrink-0 aspect-[2/1]"
              />
            )}
            <div
              ref={textRef}
              className={`mt-4 min-h-0 overflow-hidden ${clipped ? '[mask-image:linear-gradient(to_bottom,black_70%,transparent)]' : ''}`}
            >
              <Paragraphs item={current} />
            </div>
            {clipped && (
              <button
                type="button"
                onClick={() => setReading(true)}
                // Right side: the Perf Debug pill sits over the bottom-left corner
                className="mt-2 self-end text-sm font-semibold text-sky-300 underline underline-offset-2 hover:text-white"
              >
                Read more
              </button>
            )}
          </div>
        </div>
      </div>

      {viewing !== null && (
        <GalleryViewer slides={slides} start={viewing} label={`${current.organisation} photos`} onClose={() => setViewing(null)} />
      )}
      {reading && <FullText item={current} onClose={() => setReading(false)} />}
    </div>
  );
}

function Heading({ item, pulse = false }: { item: WorkExperience; pulse?: boolean }) {
  return (
    <>
      <h2 className={`${pulse ? 'xmb-title ' : ''}text-lg sm:text-2xl font-bold leading-tight text-white`}>{item.role}</h2>
      <p className="mt-1 text-sm sm:text-lg text-slate-200">{item.organisation}</p>
      <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-slate-400">
        {dateRange(item.startDate, item.endDate)}
        <span className="xmb-tag ml-2 align-[1px] tracking-[0.04em]">{item.kind === 'work' ? 'Work' : 'Leadership'}</span>
      </p>
    </>
  );
}

function Paragraphs({ item }: { item: WorkExperience }) {
  return (
    <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-300">
      {item.bullets.map((bullet, i) => (
        <p key={i}>{withLinks(bullet)}</p>
      ))}
    </div>
  );
}

/** The whole entry on the black glass, for screens too short to show it in the panel */
function FullText({ item, onClose }: { item: WorkExperience; onClose: () => void }) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Scrolling must not move the page behind (it would switch entries), except inside the text if it's long
  useEffect(() => {
    const block = (e: Event) => {
      const box = boxRef.current;
      if (!(box?.contains(e.target as Node) && box.scrollHeight > box.clientHeight)) e.preventDefault();
    };
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    return () => {
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
    };
  }, []);

  return (
    <BlackGlassDialog label={item.role} onClose={onClose} centered>
      <div ref={boxRef} className="w-[min(88vw,36rem)] max-h-[75dvh] overflow-y-auto overscroll-contain">
        <Heading item={item} />
        <div className="mt-4">
          <Paragraphs item={item} />
        </div>
      </div>
    </BlackGlassDialog>
  );
}
