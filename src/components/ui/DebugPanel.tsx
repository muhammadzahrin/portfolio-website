'use client';

import React, { useEffect, useState, useRef } from 'react';

/**
 * Performance & Debug Control HUD
 * 
 * Allows real-time toggling of:
 * 1. Background Canvas & Ray Animation (to isolate canvas repainting impact)
 * 2. Glass Backdrop Blur (to isolate GPU Gaussian blur shader impact)
 * 
 * Features live FPS counter and persistent settings via localStorage.
 */
export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [bgAnimation, setBgAnimation] = useState(true);
  const [backdropBlur, setBackdropBlur] = useState(true);
  const [fps, setFps] = useState(60);
  const [frameTime, setFrameTime] = useState(16.6);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedBg = localStorage.getItem('portfolio-debug-bg');
    if (savedBg !== null) {
      setBgAnimation(savedBg === 'true');
    }

    const savedBlur = localStorage.getItem('portfolio-debug-blur');
    if (savedBlur !== null) {
      const isBlurOn = savedBlur === 'true';
      setBackdropBlur(isBlurOn);
      document.documentElement.classList.toggle('disable-backdrop-blur', !isBlurOn);
    }
  }, []);

  // Real-time FPS & frame-time measurement loop
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = (now: number) => {
      frameCount++;
      const delta = now - lastTime;

      if (delta >= 500) {
        const calculatedFps = Math.round((frameCount * 1000) / delta);
        setFps(calculatedFps);
        setFrameTime(Math.round((delta / frameCount) * 10) / 10);
        frameCount = 0;
        lastTime = now;
      }

      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  const toggleBgAnimation = () => {
    const nextState = !bgAnimation;
    setBgAnimation(nextState);
    localStorage.setItem('portfolio-debug-bg', String(nextState));
    window.dispatchEvent(
      new CustomEvent('portfolio:toggle-bg-animation', { detail: { enabled: nextState } })
    );
  };

  const toggleBackdropBlur = () => {
    const nextState = !backdropBlur;
    setBackdropBlur(nextState);
    localStorage.setItem('portfolio-debug-blur', String(nextState));
    document.documentElement.classList.toggle('disable-backdrop-blur', !nextState);
  };

  return (
    <aside aria-label="Performance Debug Tool" className="fixed bottom-4 left-4 z-[9999] select-none font-sans">
      {/* Minimized Trigger Pill */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open performance debug window"
          className="apple-press flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-sky-400/30 shadow-lg text-xs font-mono backdrop-blur-md"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              bgAnimation ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="font-semibold text-sky-400">⚡ Perf Debug</span>
          <span className="text-slate-400">({fps} FPS)</span>
        </button>
      )}

      {/* Expanded Debug Panel Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-2xl bg-slate-950/95 border border-sky-400/40 p-5 shadow-2xl backdrop-blur-xl text-slate-200 animate-in fade-in zoom-in-95 duration-100">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <h2 className="text-sm font-bold text-white tracking-tight">Performance & Debug HUD</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close debug window"
              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Real-time Hardware Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Current FPS</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className={`text-xl font-bold font-mono ${fps >= 55 ? 'text-emerald-400' : fps >= 28 ? 'text-sky-400' : 'text-amber-400'}`}>
                  {fps}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">FPS</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Frame Time</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-bold font-mono text-slate-200">
                  {frameTime}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">ms</span>
              </div>
            </div>
          </div>

          {/* Interactive Isolation Toggles */}
          <div className="space-y-3 mb-4">
            {/* 1. Background Animation Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span>Background Animation</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${bgAnimation ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-700 text-slate-400'}`}>
                    {bgAnimation ? 'ON (30fps)' : 'PAUSED'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Toggle canvas waves and ray drift
                </p>
              </div>

              <button
                type="button"
                onClick={toggleBgAnimation}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-100 ease-in-out focus:outline-none ${
                  bgAnimation ? 'bg-sky-500' : 'bg-slate-700'
                }`}
                role="switch"
                aria-checked={bgAnimation}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-100 ease-in-out ${
                    bgAnimation ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 2. Backdrop Blur Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span>Backdrop Glass Blur</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${backdropBlur ? 'bg-sky-500/15 text-sky-300' : 'bg-slate-700 text-slate-400'}`}>
                    {backdropBlur ? 'BLUR ON' : 'SOLID GLASS'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Toggle GPU Gaussian blur filters
                </p>
              </div>

              <button
                type="button"
                onClick={toggleBackdropBlur}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-100 ease-in-out focus:outline-none ${
                  backdropBlur ? 'bg-sky-500' : 'bg-slate-700'
                }`}
                role="switch"
                aria-checked={backdropBlur}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-100 ease-in-out ${
                    backdropBlur ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Diagnostic Guide Footer */}
          <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-400/20 text-[11px] text-sky-200/90 leading-relaxed font-sans">
            <span className="font-semibold text-sky-300 block mb-0.5">💡 Performance Tip:</span>
            Toggle <b className="text-white">Background Animation</b> or <b className="text-white">Backdrop Glass Blur</b> OFF to see which one impacts hover latency on your GPU.
          </div>
        </div>
      )}
    </aside>
  );
}
