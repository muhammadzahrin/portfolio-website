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
  !end ? `${formatDate(start)} – Present` : start === end ? formatDate(start) : `${formatDate(start)} – ${formatDate(end)}`;

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
 * On phones the column becomes a sideways row under the nav bar and the page scrolls instead.
 */
export function XmbColumn({ items }: { items: WorkExperience[] }) {
  const [active, setActive] = useState(0);
  const [smooth, setSmooth] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setSmooth(!matchMedia('(prefers-reduced-motion: reduce)').matches), []);

  // Phones get a sideways row instead of the column (matches the CSS breakpoint)
  const isRow = () => matchMedia('(max-width: 639px)').matches;

  // Distance between two tiles (sizes change with the screen width, so measured, not fixed)
  const step = () => {
    const [a, b] = tileRefs.current;
    if (!a || !b) return 1;
    return isRow() ? b.offsetLeft - a.offsetLeft : b.offsetTop - a.offsetTop;
  };

  const pick = (i: number) => {
    i = Math.max(0, Math.min(items.length - 1, i));
    if (i === active) return;
    setActive(i);
    // Phones: the page may be scrolled down a long entry; start the new one from its top
    if (isRow() && window.scrollY > 0) window.scrollTo({ top: 0 });
  };

  const go = (i: number) => {
    i = Math.max(0, Math.min(items.length - 1, i));
    const behavior = smooth ? 'smooth' : 'auto';
    listRef.current?.scrollTo(isRow() ? { left: i * step(), behavior } : { top: i * step(), behavior });
    pick(i);
    return i;
  };

  const current = items[active];
  if (!current) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:h-full">
      <ul
        ref={listRef}
        aria-label="Experience"
        className="xmb-column shrink-0"
        onScroll={(e) => pick(Math.round((isRow() ? e.currentTarget.scrollLeft : e.currentTarget.scrollTop) / step()))}
        onKeyDown={(e) => {
          const move = ({ ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 } as Record<string, number>)[e.key];
          if (!move) return;
          e.preventDefault();
          tileRefs.current[go(active + move)]?.focus({ preventScroll: true });
        }}
      >
        {items.map((item, i) => (
          <li key={item._id} className="xmb-item">
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

      {/* Keyed: the details fade in fresh (and the text box scrolls back to the top) for each pick */}
      <div key={current._id} className="xmb-details xmb-fade flex-1 min-w-0 flex flex-col sm:pl-6 pb-4">
        <h2 className="xmb-title text-lg sm:text-3xl font-semibold leading-tight text-white">{current.role}</h2>
        <p className="mt-0.5 text-sm sm:text-lg text-slate-200">{current.organisation}</p>
        <p className="mt-0.5 text-xs sm:text-sm text-slate-400">
          {dateRange(current.startDate, current.endDate)}
          <span className="xmb-tag ml-2 align-[1px]">
            {current.kind === 'work' ? 'Work' : 'Leadership'}
          </span>
        </p>

        {/* Desktop: long text scrolls inside the box, never the page or the column. Phones: the page scrolls */}
        <div className="mt-3 flex-1 min-h-0 sm:overflow-y-auto sm:overscroll-contain rounded-2xl glass-surface border border-sky-400/20 p-4 sm:p-6">
          <p className="text-xs text-slate-400 mb-3">{current.location}</p>
          <ul className="space-y-2.5 text-sm sm:text-base text-slate-200">
            {current.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" aria-hidden="true" />
                <span>{withLinks(bullet)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
