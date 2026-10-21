'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Authentic PS3 XMB Dynamic Wave Background
 * 
 * Features:
 * - Static gradient background: #081927 at the top of the screen to #020711 in the middle.
 * - Authentic 3D-style PS3 ribbon waves with top/bottom boundaries, twisting mesh,
 *   and delicate internal luminous silk filament strings.
 * - Sparse bioluminescent bubbles strictly tethered to the wave currents.
 * - Hardware-accelerated, zero heavy blur-filters, locked 60+ FPS performance.
 */
export function PS3Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isPaused = false;
    let isAnimationEnabled = true;

    // Check saved debug preference
    const savedBgState = localStorage.getItem('portfolio-debug-bg');
    if (savedBgState !== null) {
      isAnimationEnabled = savedBgState === 'true';
    }

    const handleToggleBg = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      isAnimationEnabled = customEvent.detail.enabled;
    };

    window.addEventListener('portfolio:toggle-bg-animation', handleToggleBg);

    // Paused while something covers the page (e.g. an opened project case)
    let isCovered = false;
    const handlePauseBg = (e: Event) => {
      isCovered = (e as CustomEvent<{ paused: boolean }>).detail.paused;
    };
    window.addEventListener('portfolio:pause-bg', handlePauseBg);

    const isTouchDevice = () => {
      return (
        typeof window !== 'undefined' &&
        (window.matchMedia('(pointer: coarse)').matches ||
          navigator.maxTouchPoints > 0 ||
          'ontouchstart' in window)
      );
    };

    const getDimensions = () => {
      const w = container ? container.clientWidth : window.innerWidth;
      const h = container ? container.clientHeight : window.innerHeight;
      return { w: w || window.innerWidth, h: h || window.innerHeight };
    };

    let { w: width, h: height } = getDimensions();
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      if (!canvas) return;
      const { w: newWidth, h: newHeight } = getDimensions();

      // On mobile devices, scrolling causes Chrome/Safari to collapse/expand the address bar,
      // which triggers a window resize event where ONLY the height fluctuates by ~50-80px.
      // If width hasn't changed significantly on a touch device and height change is small (<150px),
      // do not resize canvas buffer or change wave coordinates. This stops the snappy jump!
      const widthChanged = Math.abs(newWidth - width) > 2;
      const heightJump = Math.abs(newHeight - height);

      if (isTouchDevice() && !widthChanged && heightJump < 150) {
        return;
      }

      width = canvas.width = newWidth;
      height = canvas.height = newHeight;
    };

    const handleOrientationChange = () => {
      // Allow mobile browser layout to settle before recalculating
      setTimeout(handleResize, 150);
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Primary & Secondary PS3 Ribbon Wave Parameters (centered vertically at 0.50)
    const ribbons = [
      {
        // Ribbon 1: Foreground Electric Aqua-Cyan & Emerald Silk Wave
        yRatio: 0.50,
        amp1: 52,
        amp2: 32,
        freq1: 0.0018,
        freq2: 0.0032,
        speed1: 0.0011,
        speed2: 0.0007,
        phase1: 0.2,
        phase2: 1.4,
        baseWidth: 55,
        twistFreq: 0.0022,
        twistSpeed: 0.0014,
        twistPhase: 0.5,
        fillGradient: ['rgba(34, 211, 238, 0.08)', 'rgba(52, 211, 153, 0.05)', 'transparent'],
        edgeGradients: [
          'rgba(34, 211, 238, 0.85)', // Top edge (bright cyan)
          'rgba(52, 211, 153, 0.80)', // Bottom edge (bright emerald)
        ],
        filamentAlpha: 0.28,
      },
      {
        // Ribbon 2: Background Harmonic Deep Sapphire & Electric Sky Ribbon
        yRatio: 0.50,
        amp1: 65,
        amp2: 28,
        freq1: 0.0014,
        freq2: 0.0026,
        speed1: 0.0009,
        speed2: 0.0008,
        phase1: 3.1,
        phase2: 2.2,
        baseWidth: 48,
        twistFreq: 0.0018,
        twistSpeed: 0.0011,
        twistPhase: 2.8,
        fillGradient: ['rgba(56, 189, 248, 0.06)', 'rgba(14, 165, 233, 0.04)', 'transparent'],
        edgeGradients: [
          'rgba(56, 189, 248, 0.75)', // Top edge (sky blue)
          'rgba(34, 211, 238, 0.65)', // Bottom edge (cyan)
        ],
        filamentAlpha: 0.22,
      },
    ];

    // Helper: calculate wave coordinates (midline, top boundary, bottom boundary) at given x and time
    const getWaveCoords = (x: number, t: number, r: typeof ribbons[0]) => {
      const sin1 = Math.sin(x * r.freq1 + t * r.speed1 + r.phase1);
      const cos1 = Math.cos(x * r.freq2 - t * r.speed2 + r.phase2);
      const mid = height * r.yRatio + sin1 * r.amp1 + cos1 * r.amp2;

      // Ribbon twist factor: varies width from pinched edge (flat) to broadside (open)
      const twist = Math.sin(x * r.twistFreq + t * r.twistSpeed + r.twistPhase);
      const halfWidth = r.baseWidth * (0.28 + 0.72 * (0.5 + 0.5 * twist));

      return {
        mid,
        top: mid - halfWidth,
        bottom: mid + halfWidth,
      };
    };

    // Sparse bioluminescent bubbles strictly scattered along the wave lines (8-10 bubbles total)
    const bubbleCount = width < 768 ? 7 : 10;
    const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
      x: Math.random() * width,
      ribbonIndex: i % 2,
      offsetY: (Math.random() - 0.5) * 36, // Hover within +/- 18px of the ribbon center
      speedX: Math.random() * 0.25 + 0.15,
      size: Math.random() * 1.4 + 1.0,
      alpha: Math.random() * 0.35 + 0.35,
      pulse: Math.random() * Math.PI * 2,
      color: i % 2 === 0 ? 'rgba(56, 189, 248,' : 'rgba(52, 211, 153,',
    }));

    let time = 0;
    const TARGET_FPS = 30;
    const fpsInterval = 1000 / TARGET_FPS; // 33.33ms per frame
    let lastFrameTime = performance.now();

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (isPaused || isCovered || !isAnimationEnabled) return;

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < fpsInterval) return;

      // Compensate for interval drift
      lastFrameTime = currentTime - (elapsed % fpsInterval);

      // Advance wave time (scaled for 30fps so wave motion speed remains identical)
      time += 2;
      ctx.clearRect(0, 0, width, height);

      const step = 14; // Ultra smooth curve evaluation step

      // Render each authentic 3D PS3 ribbon wave
      ribbons.forEach((ribbon) => {
        // 1. Fill translucent twisting silk ribbon mesh between top and bottom edges
        ctx.beginPath();
        for (let x = 0; x <= width + step; x += step) {
          const { top } = getWaveCoords(x, time, ribbon);
          if (x === 0) ctx.moveTo(x, top);
          else ctx.lineTo(x, top);
        }
        for (let x = width + step; x >= 0; x -= step) {
          const { bottom } = getWaveCoords(x, time, ribbon);
          ctx.lineTo(x, bottom);
        }
        ctx.closePath();

        const ribbonGrad = ctx.createLinearGradient(0, 0, width, 0);
        ribbonGrad.addColorStop(0, ribbon.fillGradient[0]);
        ribbonGrad.addColorStop(0.5, ribbon.fillGradient[1]);
        ribbonGrad.addColorStop(1, ribbon.fillGradient[2]);
        ctx.fillStyle = ribbonGrad;
        ctx.fill();

        // 2. Render contour silk filaments (5 parallel strings inside the ribbon)
        // u = 0.0 (top edge), 0.25, 0.5 (spine), 0.75, 1.0 (bottom edge)
        const filamentFractions = [0.0, 0.25, 0.5, 0.75, 1.0];

        filamentFractions.forEach((u) => {
          ctx.beginPath();
          for (let x = 0; x <= width + step; x += step) {
            const { top, bottom } = getWaveCoords(x, time, ribbon);
            const y = top + (bottom - top) * u;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          const strokeGrad = ctx.createLinearGradient(0, 0, width, 0);
          if (u === 0.0) {
            // Bright top boundary
            strokeGrad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
            strokeGrad.addColorStop(0.5, ribbon.edgeGradients[0]);
            strokeGrad.addColorStop(1, 'rgba(34, 211, 238, 0.15)');
            ctx.lineWidth = 1.8;
          } else if (u === 1.0) {
            // Bright bottom boundary
            strokeGrad.addColorStop(0, 'rgba(52, 211, 153, 0.2)');
            strokeGrad.addColorStop(0.5, ribbon.edgeGradients[1]);
            strokeGrad.addColorStop(1, 'rgba(16, 185, 129, 0.15)');
            ctx.lineWidth = 1.8;
          } else if (u === 0.5) {
            // Glowing center spine
            strokeGrad.addColorStop(0, 'transparent');
            strokeGrad.addColorStop(0.5, `rgba(186, 230, 253, ${ribbon.filamentAlpha * 1.4})`);
            strokeGrad.addColorStop(1, 'transparent');
            ctx.lineWidth = 1.2;
          } else {
            // Subtle contour silk threads
            strokeGrad.addColorStop(0, 'transparent');
            strokeGrad.addColorStop(0.5, `rgba(125, 211, 252, ${ribbon.filamentAlpha})`);
            strokeGrad.addColorStop(1, 'transparent');
            ctx.lineWidth = 0.8;
          }

          ctx.strokeStyle = strokeGrad;
          ctx.stroke();
        });
      });

      // 3. Render sparse bioluminescent bubbles drifting strictly near the lines
      bubbles.forEach((b) => {
        b.x += b.speedX * 1.8;
        b.pulse += 0.045;

        // Wrap around seamlessly
        if (b.x > width + 20) {
          b.x = -20;
          b.offsetY = (Math.random() - 0.5) * 36;
        }

        // Tethered directly to its assigned wave ribbon
        const currentRibbon = ribbons[b.ribbonIndex];
        const coords = getWaveCoords(b.x, time, currentRibbon);
        const y = coords.mid + b.offsetY + Math.sin(b.pulse) * 3;

        const currentAlpha = b.alpha * (0.6 + 0.4 * Math.sin(b.pulse));

        // Draw tiny micro-bubble core
        ctx.beginPath();
        ctx.arc(b.x, y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `${b.color} ${currentAlpha})`;
        ctx.fill();

        // Subtle ambient glow ring around bubble
        ctx.beginPath();
        ctx.arc(b.x, y, b.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${b.color} ${currentAlpha * 0.25})`;
        ctx.fill();
      });
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('portfolio:toggle-bg-animation', handleToggleBg);
      window.removeEventListener('portfolio:pause-bg', handlePauseBg);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="ps3-background-container pointer-events-none -z-10 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #081927 0%, #020711 50%, #020711 100%)',
      }}
      aria-hidden="true"
    >
      {/* 
        AUTHENTIC PS3 DYNAMIC RIBBON WAVES CANVAS
        Renders the twisting ribbon mesh, contour silk strings, and tethered bubbles.
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
