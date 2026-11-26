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
 * Console-style menu column: square tiles scroll past a fixed slot under the nav bar and
 * snap to it; the tile in the slot is the selected one. Its details sit beside the slot
 * and stay put, only their content changes. A tile scrolled past the slot peeks out from
 * under the nav bar, so it's clear there's more above.
 */
export function XmbColumn({ items }: { items: WorkExperience[] }) {
  const [active, setActive] = useState(0);
  const [smooth, setSmooth] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setSmooth(!matchMedia('(prefers-reduced-motion: reduce)').matches), []);

  // Distance between two tiles (sizes change with the screen width, so measured, not fixed)
  const step = () => {
    const [a, b] = tileRefs.current;
    return a && b ? b.offsetTop - a.offsetTop : 1;
  };

  const go = (i: number) => {
    i = Math.max(0, Math.min(items.length - 1, i));
    listRef.current?.scrollTo({ top: i * step(), behavior: smooth ? 'smooth' : 'auto' });
    setActive(i);
    return i;
  };

  const current = items[active];
  if (!current) return null;

  return (
    <div className="flex h-full">
      <ul
        ref={listRef}
        aria-label="Experience"
        className="xmb-column shrink-0 h-full overflow-y-auto"
        onScroll={(e) => setActive(Math.max(0, Math.min(items.length - 1, Math.round(e.currentTarget.scrollTop / step()))))}
        onKeyDown={(e) => {
          if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
          e.preventDefault();
          tileRefs.current[go(active + (e.key === 'ArrowDown' ? 1 : -1))]?.focus({ preventScroll: true });
        }}
      >
        {items.map((item, i) => (
          <li key={item._id} className={`xmb-item ${i < active ? 'xmb-above' : i > active ? 'xmb-below' : ''}`}>
            <button
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              type="button"
              aria-label={`${item.role}, ${item.organisation}`}
              aria-current={i === active}
              onClick={() => go(i)}
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
        {/* Room below the last tile so it can still reach the slot */}
        <li aria-hidden="true" className="xmb-end" />
      </ul>

      {/* Keyed: the details fade in fresh (and the panel scrolls back to the top) for each pick.
          One glass panel holds it all; long text scrolls inside it, never the page or the column. */}
      <div key={current._id} className="xmb-details xmb-fade flex-1 min-w-0 flex flex-col pl-1 sm:pl-2 pb-4">
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain rounded-2xl glass-surface border border-sky-400/20 p-4 sm:p-6">
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
  );
}
