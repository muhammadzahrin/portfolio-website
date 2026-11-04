'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';

const SEEN_KEY = 'intro-seen';

// Runs while the HTML is parsed, before the first paint: skip the splash for
// returning visitors (this tab) and reduced motion, so the page never flashes black
const HIDE_EARLY = `try{if(sessionStorage.getItem('${SEEN_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.getElementById('intro').hidden=true}catch(e){}`;

/**
 * Console-style boot splash, once per tab: my name fades in on black, then the
 * black fades away while the name flies into the "Hi, I'm ..." heading
 * (the element marked data-intro-target). Any click or key skips it.
 */
export function IntroSplash({ name }: { name: string }) {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Layout effect: on client-side navigation back to Home it must hide before paint
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const logo = overlay?.querySelector<HTMLElement>('.intro-logo');
    const backdrop = overlay?.querySelector<HTMLElement>('.intro-bg');
    const target = document.querySelector<HTMLElement>('[data-intro-target]');
    let seen = true;
    try {
      seen = !!sessionStorage.getItem(SEEN_KEY) || matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}
    if (!overlay || !logo || !backdrop || !target || overlay.hidden || seen) {
      setDone(true);
      return;
    }

    const running: Animation[] = [];
    let cancelled = false;
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      running.forEach((a) => a.cancel());
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {}
      setDone(true);
    };

    const play = async () => {
      // Wait (briefly) for the Emotion Engine font so the name doesn't swap fonts mid-fade
      await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 800))]);
      if (cancelled) return;

      const fadeIn = logo.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: 'ease-out', fill: 'forwards' });
      running.push(fadeIn);
      await fadeIn.finished;
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;

      const from = logo.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const scale = to.width / from.width;
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      const timing: KeyframeAnimationOptions = { duration: 800, easing: 'cubic-bezier(0.6, 0, 0.2, 1)', fill: 'forwards' };

      running.push(
        backdrop.animate([{ opacity: 1 }, { opacity: 0 }], timing),
        // The two fonts differ, so the name cross-fades into the heading as it lands
        logo.animate(
          [
            { transform: 'none', opacity: 1 },
            { opacity: 1, offset: 0.6 },
            { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0 },
          ],
          timing,
        ),
        target.animate([{ opacity: 0 }, { opacity: 0, offset: 0.6 }, { opacity: 1 }], timing),
      );
      await Promise.all(running.map((a) => a.finished));
      finish();
    };

    play().catch(finish);
    window.addEventListener('pointerdown', finish);
    window.addEventListener('keydown', finish);
    return () => {
      // Strict mode / unmount: stop without marking the intro as seen
      cancelled = true;
      running.forEach((a) => a.cancel());
      window.removeEventListener('pointerdown', finish);
      window.removeEventListener('keydown', finish);
    };
  }, []);

  if (done) return null;

  return (
    <>
      {/* suppressHydrationWarning: the inline script may set `hidden` before React hydrates */}
      <div ref={overlayRef} id="intro" className="intro" aria-hidden="true" suppressHydrationWarning>
        <div className="intro-bg" />
        <span className="intro-logo">{name}</span>
      </div>
      <script dangerouslySetInnerHTML={{ __html: HIDE_EARLY }} />
      <noscript>
        <style>{'.intro{display:none}'}</style>
      </noscript>
    </>
  );
}
