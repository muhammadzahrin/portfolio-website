import React from 'react';

/**
 * Frutiger Aero ambient background.
 * Uses pure CSS radial gradients and blurred ambient bubbles (sky blue, aqua, fresh green)
 * with zero external animation/3D dependencies.
 */
export function FrutigerBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Top sky blue aura */}
      <div className="absolute -top-[10%] left-[10%] w-[50vw] max-w-[600px] h-[50vw] max-h-[600px] rounded-full bg-gradient-to-br from-sky-300/40 via-cyan-200/30 to-transparent dark:from-sky-900/30 dark:via-cyan-950/20 blur-3xl opacity-80" />

      {/* Fresh nature green aura (bottom right) */}
      <div className="absolute top-[35%] -right-[10%] w-[45vw] max-w-[550px] h-[45vw] max-h-[550px] rounded-full bg-gradient-to-tl from-emerald-300/35 via-teal-200/25 to-transparent dark:from-emerald-950/25 dark:via-teal-950/20 blur-3xl opacity-70" />

      {/* Deep aqua aura (lower center) */}
      <div className="absolute -bottom-[10%] left-[20%] w-[55vw] max-w-[700px] h-[55vw] max-h-[700px] rounded-full bg-gradient-to-tr from-cyan-300/30 via-sky-200/20 to-transparent dark:from-sky-950/30 dark:via-cyan-900/15 blur-3xl opacity-75" />

      {/* Subtle organic floating water bubbles */}
      <div className="absolute top-[18%] left-[8%] w-28 h-28 rounded-full border border-sky-300/30 dark:border-sky-500/10 bg-white/20 dark:bg-white/5 backdrop-blur-[2px] shadow-inner opacity-60" />
      <div className="absolute top-[62%] right-[12%] w-36 h-36 rounded-full border border-emerald-300/30 dark:border-emerald-500/10 bg-white/15 dark:bg-white/5 backdrop-blur-[2px] shadow-inner opacity-50" />
      <div className="absolute bottom-[15%] left-[14%] w-20 h-20 rounded-full border border-cyan-300/30 dark:border-cyan-500/10 bg-white/25 dark:bg-white/5 backdrop-blur-[2px] opacity-40" />
    </div>
  );
}
