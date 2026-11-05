'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';

const SEEN_KEY = 'intro-seen';

// Runs while the HTML is parsed, before the first paint: skip the splash for
// returning visitors (this tab) and reduced motion, so the page never flashes black
const HIDE_EARLY = `try{if(sessionStorage.getItem('${SEEN_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.getElementById('intro').hidden=true}catch(e){}`;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Console-style boot splash, once per tab: my name fades in on black, flies into
 * its place in the Home title (the element marked data-intro-target,
 * styled the same via .intro-name so the hand-over is invisible), then the page
 * opens up around it in a soft-edged circle. Any click or key skips it.
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
    const run = (a: Animation) => {
      running.push(a);
      return a.finished;
    };

    const play = async () => {
      // Wait (briefly) for the Emotion Engine font so the name doesn't swap fonts mid-fade
      await Promise.race([document.fonts.ready, wait(800)]);
      if (cancelled) return;

      await run(logo.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: 'ease-out', fill: 'forwards' }));
      await wait(250);
      if (cancelled) return;

      // Same font and colour as the heading, so scaling it onto the heading lines the letters up
      const from = logo.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const scale = to.width / from.width;
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      await run(
        logo.animate(
          [
            { transform: 'none' },
            { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, filter: 'drop-shadow(0 0 0 rgba(56, 189, 248, 0))' },
          ],
          { duration: 750, easing: 'cubic-bezier(0.6, 0, 0.2, 1)', fill: 'forwards' },
        ),
      );
      if (cancelled) return;

      // Open the black outward from the name: a feathered hole that grows past the farthest corner
      const cx = to.left + to.width / 2;
      const cy = to.top + to.height / 2;
      // + the soft edge's width (480px in .intro-bg), so the edge has fully passed the corners
      const reach = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + 480;
      backdrop.style.setProperty('--intro-x', `${cx}px`);
      backdrop.style.setProperty('--intro-y', `${cy}px`);
      const reveal: KeyframeAnimationOptions = { duration: 900, easing: 'linear', fill: 'forwards' };
      await Promise.all([
        run(backdrop.animate([{ '--intro-r': '0px' }, { '--intro-r': `${reach}px` }], reveal)),
        // Browsers without animatable custom properties still get a fade
        run(backdrop.animate([{ opacity: 1 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }], reveal)),
      ]);
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
        <span className="intro-logo intro-name">{name}</span>
      </div>
      <script dangerouslySetInnerHTML={{ __html: HIDE_EARLY }} />
      <noscript>
        <style>{'.intro{display:none}'}</style>
      </noscript>
    </>
  );
}
