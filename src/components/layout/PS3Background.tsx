'use client';

import React, { useEffect, useRef } from 'react';

/**
 * PS3 Dynamic Harmonic Wave Background + Multi-Point Breathing Vignettes
 * Ultra-optimized 60fps canvas engine:
 * - 0 network data usage (100% client-side math)
 * - Zero software shadowBlur convolutions (eliminates GPU bottlenecks)
 * - Hardware-accelerated CSS breathing vignettes in vibrant emerald green and dark blue
 * - Automatic pause when tab is inactive for zero battery drain
 */
export function PS3Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isPaused = false;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Subtle floating PS3 ambient dust motes (lightweight, no shadowBlur)
    const isMobile = width < 768;
    const particleCount = isMobile ? 14 : 24;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.35 - 0.1,
      alpha: Math.random() * 0.4 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    // 4 overlapping PS3 harmonic ribbon lines
    const ribbons = [
      {
        yOffsetRatio: 0.48,
        amplitude1: 45,
        amplitude2: 30,
        frequency1: 0.002,
        frequency2: 0.0035,
        speed: 0.0008,
        phase: 0,
        lineWidth: 2.2,
        strokeGradient: ['rgba(34, 211, 238, 0.7)', 'rgba(52, 211, 153, 0.65)', 'rgba(56, 189, 248, 0.2)'],
        fillGradient: ['rgba(6, 182, 212, 0.06)', 'rgba(16, 185, 129, 0.04)', 'transparent'],
      },
      {
        yOffsetRatio: 0.55,
        amplitude1: 55,
        amplitude2: 35,
        frequency1: 0.0016,
        frequency2: 0.0026,
        speed: 0.001,
        phase: 1.8,
        lineWidth: 2.0,
        strokeGradient: ['rgba(52, 211, 153, 0.75)', 'rgba(34, 211, 238, 0.65)', 'rgba(14, 165, 233, 0.25)'],
        fillGradient: ['rgba(16, 185, 129, 0.06)', 'rgba(6, 182, 212, 0.03)', 'transparent'],
      },
      {
        yOffsetRatio: 0.42,
        amplitude1: 40,
        amplitude2: 40,
        frequency1: 0.0024,
        frequency2: 0.0018,
        speed: 0.0007,
        phase: 3.4,
        lineWidth: 1.8,
        strokeGradient: ['rgba(56, 189, 248, 0.6)', 'rgba(110, 231, 183, 0.55)', 'rgba(34, 211, 238, 0.2)'],
        fillGradient: ['rgba(34, 211, 238, 0.05)', 'rgba(52, 211, 153, 0.03)', 'transparent'],
      },
      {
        yOffsetRatio: 0.62,
        amplitude1: 60,
        amplitude2: 25,
        frequency1: 0.0014,
        frequency2: 0.0028,
        speed: 0.0009,
        phase: 4.8,
        lineWidth: 2.4,
        strokeGradient: ['rgba(16, 185, 129, 0.7)', 'rgba(14, 165, 233, 0.65)', 'rgba(5, 150, 105, 0.25)'],
        fillGradient: ['rgba(16, 185, 129, 0.05)', 'rgba(14, 165, 233, 0.03)', 'transparent'],
      },
    ];

    let time = 0;

    const render = () => {
      if (!isPaused) {
        time += 1;
        ctx.clearRect(0, 0, width, height);

        // Render fluid PS3 ribbon waves
        ribbons.forEach((ribbon) => {
          const baseHeight = height * ribbon.yOffsetRatio;
          const currentPhase = time * ribbon.speed + ribbon.phase;

          // Step of 16px is butter smooth on 60Hz and 120Hz displays with 1/2 CPU cost
          const step = 16;

          // Fill subtle atmospheric translucent ribbon
          ctx.beginPath();
          ctx.moveTo(0, height);
          ctx.lineTo(0, baseHeight);
          for (let x = 0; x <= width + step; x += step) {
            const sin1 = Math.sin(x * ribbon.frequency1 + currentPhase);
            const sin2 = Math.cos(x * ribbon.frequency2 - currentPhase * 0.7);
            const y = baseHeight + sin1 * ribbon.amplitude1 + sin2 * ribbon.amplitude2;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.closePath();

          const fillGrad = ctx.createLinearGradient(0, baseHeight - 60, width, height);
          fillGrad.addColorStop(0, ribbon.fillGradient[0]);
          fillGrad.addColorStop(0.5, ribbon.fillGradient[1]);
          fillGrad.addColorStop(1, ribbon.fillGradient[2]);
          ctx.fillStyle = fillGrad;
          ctx.fill();

          // Stroke crisp luminous wave line
          ctx.beginPath();
          for (let x = 0; x <= width + step; x += step) {
            const sin1 = Math.sin(x * ribbon.frequency1 + currentPhase);
            const sin2 = Math.cos(x * ribbon.frequency2 - currentPhase * 0.7);
            const y = baseHeight + sin1 * ribbon.amplitude1 + sin2 * ribbon.amplitude2;
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          const strokeGrad = ctx.createLinearGradient(0, 0, width, 0);
          strokeGrad.addColorStop(0, ribbon.strokeGradient[0]);
          strokeGrad.addColorStop(0.5, ribbon.strokeGradient[1]);
          strokeGrad.addColorStop(1, ribbon.strokeGradient[2]);
          ctx.strokeStyle = strokeGrad;
          ctx.lineWidth = ribbon.lineWidth;
          ctx.stroke();
        });

        // Render ambient floating sparkles (zero shadowBlur for silky 60fps)
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          p.pulse += 0.02;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(186, 230, 253, ${currentAlpha})`;
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#020712]"
      aria-hidden="true"
    >
      {/* 
        MULTI-POINT VIVID BREATHING VIGNETTES
        Hardware accelerated with pure CSS keyframes in globals.css
      */}

      {/* 1. Top-Left: Deep Oceanic Sapphire Blue & Cyan Pulse */}
      <div
        className="absolute -top-[12%] -left-[10%] w-[55vw] max-w-[750px] h-[55vw] max-h-[750px] rounded-full bg-gradient-to-br from-sky-500/35 via-cyan-600/25 to-transparent blur-[70px] animate-vignette-1"
      />

      {/* 2. Top-Right: Vibrant Emerald Green Pulse */}
      <div
        className="absolute -top-[10%] -right-[8%] w-[50vw] max-w-[700px] h-[50vw] max-h-[700px] rounded-full bg-gradient-to-bl from-emerald-500/40 via-teal-600/25 to-transparent blur-[75px] animate-vignette-2"
      />

      {/* 3. Center-Left: Electric Teal & Emerald Glow */}
      <div
        className="absolute top-[32%] -left-[10%] w-[45vw] max-w-[600px] h-[45vw] max-h-[600px] rounded-full bg-gradient-to-r from-teal-400/30 via-emerald-500/25 to-transparent blur-[65px] animate-vignette-3"
      />

      {/* 4. Bottom-Right: Deep Royal Blue & Cyan Pulse */}
      <div
        className="absolute -bottom-[15%] -right-[12%] w-[60vw] max-w-[800px] h-[60vw] max-h-[800px] rounded-full bg-gradient-to-tl from-sky-600/35 via-blue-800/30 to-transparent blur-[85px] animate-vignette-1"
      />

      {/* 5. Bottom-Left: Lush Emerald Green Pulse */}
      <div
        className="absolute bottom-[2%] left-[18%] w-[45vw] max-w-[600px] h-[45vw] max-h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/30 via-cyan-500/20 to-transparent blur-[70px] animate-vignette-2"
      />

      {/* 6. Ever-moving PS3 Dynamic Ribbon Waves Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* 7. Subtle edge vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(2,7,18,0.55)_100%)] pointer-events-none"
      />
    </div>
  );
}
