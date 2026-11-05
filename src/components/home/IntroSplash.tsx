'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';

const SEEN_KEY = 'intro-seen';

// Runs while the HTML is parsed, before the first paint: skip the splash for
// returning visitors (this tab) and reduced motion, so the page never flashes black
const HIDE_EARLY = `try{if(sessionStorage.getItem('${SEEN_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.getElementById('intro').hidden=true}catch(e){}`;

const GLOW = 'drop-shadow(0 0 24px rgba(56, 189, 248, 0.55))';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Console-style boot splash, once per tab: the page starts covered in black, my name
 * fades in big in the middle, flies into its place in the Home title, then the page
 * opens up around it in a soft-edged circle. The name is the real heading (marked
 * data-intro-target) lifted above the black, so there is no copy to swap out at the end.
 * Any click or key skips it.
 */
export function IntroSplash() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Layout effect: on client-side navigation back to Home it must hide before paint
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const backdrop = overlay?.querySelector<HTMLElement>('.intro-bg');
    const name = document.querySelector<HTMLElement>('[data-intro-target]');
    let seen = true;
    try {
      seen = !!sessionStorage.getItem(SEEN_KEY) || matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}
    if (!overlay || !backdrop || !name || overlay.hidden || seen) {
      setDone(true);
      return;
    }

    const running: Animation[] = [];
    let cancelled = false;
    const run = (a: Animation) => {
      running.push(a);
      return a.finished;
    };
    // Back to how the heading normally looks
    const reset = () => {
      running.forEach((a) => a.cancel());
      running.length = 0;
      name.style.zIndex = name.style.opacity = name.style.transform = name.style.filter = '';
    };
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      // Hide first: cancelling resets the backdrop to solid black, which would flash for a frame
      overlay.hidden = true;
      reset();
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {}
      setDone(true);
    };

    // Above the black, and invisible until it fades in
    name.style.zIndex = '201';
    name.style.opacity = '0';

    const play = async () => {
      // Wait (briefly) for the Emotion Engine font so the name doesn't swap fonts mid-fade
      await Promise.race([document.fonts.ready, wait(800)]);
      if (cancelled) return;

      // Measured where it belongs, then moved to the middle of the screen and scaled up with a transform
      const at = name.getBoundingClientRect();
      const cx = at.left + at.width / 2;
      const cy = at.top + at.height / 2;
      const scale = Math.min(120, Math.max(48, innerWidth * 0.12)) / parseFloat(getComputedStyle(name).fontSize);
      const start = `translate(${innerWidth / 2 - cx}px, ${innerHeight / 2 - cy}px) scale(${scale})`;
      name.style.transform = start;

      // Comes into focus out of a wide blur, keeping the blue glow behind it, then holds for a second
      await run(
        name.animate(
          [
            { opacity: 0, filter: `blur(40px) ${GLOW}` },
            { opacity: 1, filter: `blur(0px) ${GLOW}` },
          ],
          { duration: 1500, easing: 'ease-out', fill: 'forwards' },
        ),
      );
      await wait(1000);
      if (cancelled) return;

      await run(
        name.animate(
          [
            { transform: start, filter: `blur(0px) ${GLOW}` },
            { transform: 'none', filter: 'blur(0px) drop-shadow(0 0 0 rgba(56, 189, 248, 0))' },
          ],
          { duration: 750, easing: 'cubic-bezier(0.6, 0, 0.2, 1)', fill: 'forwards' },
        ),
      );
      if (cancelled) return;
      // Settle into its normal rendering while still on black, so nothing changes when the black goes
      reset();
      name.style.zIndex = '201';

      // Open the black outward from the name: a feathered hole that grows past the farthest corner
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
      reset();
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
      </div>
      <script dangerouslySetInnerHTML={{ __html: HIDE_EARLY }} />
      <noscript>
        <style>{'.intro{display:none}'}</style>
      </noscript>
    </>
  );
}
