'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { WorkExperience } from '@/data/types';

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

  const current = items[active];
  if (!current) return null;

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
            it only scrolls inside if a small screen can't fit the text. */}
        <div key={current._id} className="xmb-details xmb-fade flex-1 min-w-0 flex flex-col pl-1 sm:pl-2 pb-4">
          <div className="min-h-0 overflow-y-auto rounded-2xl glass-surface border border-sky-400/20 p-4 sm:p-6">
            <h2 className="xmb-title text-lg sm:text-2xl font-bold leading-tight text-white">{current.role}</h2>
            <p className="mt-1 text-sm sm:text-lg text-slate-200">{current.organisation}</p>
            <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-slate-400">
              {dateRange(current.startDate, current.endDate)}
              <span className="xmb-tag ml-2 align-[1px] tracking-[0.04em]">
                {current.kind === 'work' ? 'Work' : 'Leadership'}
              </span>
            </p>
            <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-slate-300">
              {current.bullets.map((bullet, i) => (
                <p key={i}>{withLinks(bullet)}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
