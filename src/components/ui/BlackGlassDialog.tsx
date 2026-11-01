'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

interface BlackGlassDialogProps {
  label: string;
  onClose: () => void;
  /** Layout of the panel's contents */
  className?: string;
  children: React.ReactNode;
}

/**
 * Black glass panel over the page. On desktop, clicking outside the panel
 * closes it; on phones the panel fills the screen and has an X. Esc and the
 * browser/phone back button close it too.
 */
export function BlackGlassDialog({ label, onClose, className = '', children }: BlackGlassDialogProps) {
  const [isWide] = useState(() => window.matchMedia('(min-width: 768px)').matches);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const pushedHistory = useRef(false);

  // Back button closes the dialog instead of leaving the page: opening adds a
  // history entry, and every way of closing goes back through it.
  // (Tracked in a ref: Next's router rewrites history.state, so a flag there doesn't survive.)
  const requestClose = useCallback(() => {
    if (pushedHistory.current) {
      window.history.back();
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!pushedHistory.current) {
      window.history.pushState(window.history.state, '');
      pushedHistory.current = true;
    }
    const onPop = () => {
      pushedHistory.current = false;
      onClose();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [onClose]);

  // Esc to close; pause the wave canvas while open (attention is on the panel),
  // and switch off the page's own glass blurs so only the black glass panel blurs.
  // The page keeps its scrollbar and can still scroll behind the panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', onKey);
    window.dispatchEvent(new CustomEvent('portfolio:pause-bg', { detail: { paused: true } }));
    document.documentElement.classList.add('case-open');
    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      window.removeEventListener('keydown', onKey);
      window.dispatchEvent(new CustomEvent('portfolio:pause-bg', { detail: { paused: false } }));
      document.documentElement.classList.remove('case-open');
    };
  }, [requestClose]);

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center p-4 max-md:pt-[68px] outline-none"
      onClick={(e) => {
        // Phones: the panel fills the screen, so only the X closes it
        // (the Close button handles itself: closing twice would go back two pages)
        if (isWide && !(e.target as HTMLElement).closest('[data-keep-open], button')) requestClose();
      }}
    >
      {isWide ? (
        // Only visible when tabbed to, for keyboard and screen-reader users
        <button
          type="button"
          onClick={requestClose}
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-10 focus:px-4 focus:py-2 focus:rounded-full focus:bg-slate-900 focus:border focus:border-sky-400/40 focus:text-sm focus:text-white"
        >
          Close
        </button>
      ) : (
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="viewer-close fixed top-3 right-3 z-10 w-11 h-11 rounded-full flex items-center justify-center text-2xl leading-none text-white/80 bg-white/10 border border-white/15 active:bg-white/20"
        >
          ×
        </button>
      )}

      {/* The whole black glass panel (including its border area) keeps it open */}
      <div data-keep-open className={`viewer-spotlight ${className}`}>
        {children}
      </div>
    </div>
  );
}
